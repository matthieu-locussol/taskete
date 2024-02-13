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
            this.tasks = [data.task, ...this.tasks];
            this.setOpenNewTaskDialog(false);
         })
         .catch((error) => {
            this.errorMessage = error?.message || 'An error occurred while creating the tag.';
         })
         .finally(() => {
            this.setTaskNameField('');
            this.setTaskTagsField([]);
            this.setLoading(false);
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

         if (this.currentTask && this.currentTask.id === task.id && task.completed) {
            this._store.pomodoroStore.setElapsedSeconds(0);
            this._store.pomodoroStore.pause();
         }

         fetch(
            `/api/completeTask?sub=${this._store.settingsStore.userId}&id=${task.id}&completed=${task.completed}`,
         )
            .then((res) => res.json())
            .then((data: { task: Task }) => {
               const index = this.tasks.findIndex(({ id }) => id === data.task.id);
               this.tasks[index] = data.task;
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
      return [...this.tasks].sort((a, b) => {
         return (
            new Date().getTime() -
            new Date(a.date).getTime() -
            (new Date().getTime() - new Date(b.date).getTime())
         );
      });
   }
}
