import { makeAutoObservable, runInAction } from 'mobx';
import { z } from 'zod';
import { Store } from './Store';

const zTask = z.object({
   id: z.number(),
   title: z.string(),
   completed: z.boolean(),
});

export type Task = z.infer<typeof zTask>;

export class TaskStore {
   private _store: Store;

   public currentTask: Task | undefined = undefined;

   public tasks: Task[] = [
      {
         id: 1,
         title: 'Task 1',
         completed: false,
      },
      {
         id: 2,
         title: 'Task 2',
         completed: false,
      },
      {
         id: 3,
         title: 'Task 3',
         completed: false,
      },
   ];

   public showFireworks = false;

   public openNewTaskDialog = false;

   constructor(store: Store) {
      makeAutoObservable(this);

      this._store = store;
   }

   addTask(task: Task) {
      this.tasks.push(task);
   }

   removeTask(taskId: number) {
      this.tasks = this.tasks.filter(({ id }) => id !== taskId);
   }

   toggleCompletion(taskId: number) {
      const task = this.tasks.find(({ id }) => id === taskId);

      if (task) {
         task.completed = !task.completed;

         if (this.currentTask && this.currentTask.id === task.id && task.completed) {
            this._store.pomodoroStore.setElapsedSeconds(0);
            this._store.pomodoroStore.pause();
         }
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
}
