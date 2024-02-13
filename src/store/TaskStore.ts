import { makeAutoObservable, runInAction } from 'mobx';
import { z } from 'zod';
import { CreateTaskResults } from '../pages/api/createTask';
import { Store } from './Store';
import { Tag, zTag } from './TagStore';

const zTask = z.object({
   id: z.number(),
   title: z.string(),
   completed: z.boolean(),
   tags: z.array(zTag),
   date: z.string(),
});

export type Task = z.infer<typeof zTask>;

export class TaskStore {
   private _store: Store;

   public currentTask: Task | undefined = undefined;

   public tasks: Task[] = [];

   public showFireworks = false;

   public openNewTaskDialog = false;

   public taskNameField = '';

   public taskTagsField: Tag[] = [];

   public initialized = false;

   public loading = false;

   public errorMessage = '';

   public dirty = false;

   public areCompletedTasksVisible = true;

   constructor(store: Store) {
      makeAutoObservable(this);

      this._store = store;
   }

   initializeTasks(tasks: Task[]) {
      this.tasks = [...tasks];
      this.initialized = true;
   }

   addTask() {
      this.setLoading(true);

      if (this.taskNameField.trim().length === 0) {
         this.errorMessage = 'Task name cannot be empty!';
         this.setLoading(false);
         return;
      }

      if (this.tasks.some((t) => t.title === this.taskNameField)) {
         this.errorMessage = `Task "${this.taskNameField}" already exists!`;
         this.setLoading(false);
         return;
      }

      if (this.taskTagsField.length === 0) {
         this.errorMessage = 'Task must have at least one tag!';
         this.setLoading(false);
         return;
      }

      this.errorMessage = '';

      fetch(
         `/api/createTask?sub=${this._store.settingsStore.userId}&name=${
            this.taskNameField
         }&tags=${this.taskTagsField.map((t) => JSON.stringify(t)).join('#;#')}`,
      )
         .then((res) => res.json())
         .then((data: CreateTaskResults) => {
            runInAction(() => {
               this.tasks = [data.task, ...this.tasks];
               this.setOpenNewTaskDialog(false);
            });
         })
         .catch((error) => {
            runInAction(() => {
               this.errorMessage = error?.message || 'An error occurred while creating the tag.';
            });
         })
         .finally(() => {
            runInAction(() => {
               this.setTaskNameField('');
               this.setTaskTagsField([]);
               this.setLoading(false);
            });
         });
   }

   removeTask(taskId: number) {
      this.tasks = this.tasks.filter(({ id }) => id !== taskId);
   }

   toggleCompletion(taskId: number) {
      const task = this.tasks.find(({ id }) => id === taskId);

      if (task) {
         // Optimistic update
         task.completed = !task.completed;
         let secondsSpent = 0;

         if (this.currentTask && this.currentTask.id === task.id && task.completed) {
            secondsSpent = this._store.pomodoroStore.elapsedSeconds;
            this._store.pomodoroStore.setElapsedSeconds(0);
            this._store.pomodoroStore.pause();
         }

         fetch(
            `/api/completeTask?sub=${this._store.settingsStore.userId}&id=${task.id}&completed=${task.completed}&seconds=${secondsSpent}`,
         )
            .then((res) => res.json())
            .then((data: { task: Task }) => {
               runInAction(() => {
                  const index = this.tasks.findIndex(({ id }) => id === data.task.id);
                  this.tasks[index] = data.task;
               });
            })
            .catch((error) => {
               console.error('An error occurred while updating the task.', error);
            });
      }

      if (!this.tasks.some((task) => !task.completed)) {
         this.showFireworks = true;

         setTimeout(() => {
            runInAction(() => {
               this.showFireworks = false;
            });
         }, 2000);
      }

      this.dirty = true;
   }

   setCurrentTask(task: Task) {
      if (this.currentTask && this.currentTask.id === task.id) {
         this.currentTask = undefined;
      } else {
         this.currentTask = task;
      }
   }

   setOpenNewTaskDialog(open: boolean) {
      this.openNewTaskDialog = open;
   }

   setTaskNameField(value: string) {
      this.taskNameField = value;
   }

   setTaskTagsField(value: Tag[]) {
      this.taskTagsField = value;
   }

   get canAddTask() {
      return this.taskNameField.length > 0 && this.taskTagsField.length > 0;
   }

   setLoading(loading: boolean) {
      this.loading = loading;
   }

   get isErrored() {
      return this.errorMessage.length > 0;
   }

   get orderedTasksByDate() {
      if (this.dirty) {
         runInAction(() => {
            this.dirty = false;
         });
      }

      return [...this.tasks]
         .sort((a, b) => {
            return (
               new Date().getTime() -
               new Date(a.date).getTime() -
               (new Date().getTime() - new Date(b.date).getTime())
            );
         })
         .sort((a, b) => {
            return a.completed === b.completed ? 0 : a.completed ? 1 : -1;
         })
         .sort((a, b) => {
            return a.id === this.currentTask?.id ? -1 : b.id === this.currentTask?.id ? 1 : 0;
         })
         .filter((task) => (this.areCompletedTasksVisible ? true : !task.completed));
   }

   toggleAreCompletedTasksVisible() {
      this.areCompletedTasksVisible = !this.areCompletedTasksVisible;
   }

   get completedTasksCount() {
      return this.tasks.filter((task) => task.completed).length;
   }
}
