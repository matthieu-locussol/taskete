import { makeAutoObservable } from 'mobx';
import { z } from 'zod';
import { Store } from './Store';

const zColor = z.union([
   z.literal('red'),
   z.literal('cyan'),
   z.literal('blue'),
   z.literal('yellow'),
   z.literal('purple'),
   z.literal('green'),
   z.literal('gray'),
]);

export type Color = z.infer<typeof zColor>;

export class SettingsStore {
   private _store: Store;

   public workingColor: Color = 'green';

   public shortBreakColor: Color = 'red';

   public longBreakColor: Color = 'blue';

   public workingSeconds: number = 25 * 60;

   public shortBreakSeconds: number = 5 * 60;

   public longBreakSeconds: number = 15 * 60;

   constructor(store: Store) {
      makeAutoObservable(this);

      this._store = store;
   }

   setWorkingColor(workingColor: Color) {
      this.workingColor = workingColor;
   }

   setWorkingSeconds(workingSeconds: number) {
      this.workingSeconds = workingSeconds;
   }

   setShortBreakSeconds(shortBreakSeconds: number) {
      this.shortBreakSeconds = shortBreakSeconds;
   }

   setLongBreakSeconds(longBreakSeconds: number) {
      this.longBreakSeconds = longBreakSeconds;
   }

   get currentColor() {
      return {
         working: this.workingColor,
         shortBreak: this.shortBreakColor,
         longBreak: this.longBreakColor,
      }[this._store.pomodoroStore.state];
   }
}
