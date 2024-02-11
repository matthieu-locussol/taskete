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
   private _store: Store;

   public tasks: Task[] = [];

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
}