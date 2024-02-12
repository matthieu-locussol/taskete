import { makeAutoObservable } from 'mobx';
import { z } from 'zod';
import { Store } from './Store';

const zTask = z.object({
   id: z.number(),
   title: z.string(),
   completed: z.boolean(),
   seconds: z.number().nullable(),
});

export type Task = z.infer<typeof zTask>;

export class TaskStore {
   // @ts-expect-error
   private _store: Store;

   public currentTask: Task | undefined = undefined;

   public tasks: Task[] = [
      {
         id: 1,
         title: 'Task 1',
         completed: false,
         seconds: 0,
      },
      {
         id: 2,
         title: 'Task 2',
         completed: false,
         seconds: 0,
      },
      {
         id: 3,
         title: 'Task 3',
         completed: false,
         seconds: 0,
      },
   ];

   public showFireworks = false;

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
      }

      if (!this.tasks.some((task) => !task.completed)) {
         this.showFireworks = true;

         setTimeout(() => {
            this.showFireworks = false;
         }, 1500);
      }
   }

   setCurrentTask(task: Task) {
      this.currentTask = task;
   }
}
