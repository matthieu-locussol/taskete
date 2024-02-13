import { UserProfile } from '@auth0/nextjs-auth0/client';
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

   public breakColor: Color = 'red';

   public freemodeColor: Color = 'blue';

   public workingSeconds: number = 25 * 60;

   public breakSeconds: number = 5 * 60;

   public openLogoutDialog = false;

   public userId: UserProfile['sub'] | null = null;

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

   setBreakSeconds(breakSeconds: number) {
      this.breakSeconds = breakSeconds;
   }

   get currentColor() {
      return {
         working: this.workingColor,
         break: this.breakColor,
         freemode: this.freemodeColor,
      }[this._store.pomodoroStore.state];
   }

   setOpenLogoutDialog(open: boolean) {
      this.openLogoutDialog = open;
   }

   setUserId(userId: UserProfile['sub'] | null) {
      this.userId = userId;
   }
}
