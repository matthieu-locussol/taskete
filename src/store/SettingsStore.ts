import { UserProfile } from '@auth0/nextjs-auth0/client';
import { makeAutoObservable } from 'mobx';
import { z } from 'zod';
import { constructZodLiteralUnionType } from '../utils/zod';
import { Store } from './Store';

export const colors = ['red', 'cyan', 'blue', 'yellow', 'purple', 'green', 'gray'] as const;

const zColor = constructZodLiteralUnionType(colors.map((color) => z.literal(color)));

export type Color = z.infer<typeof zColor>;

const zSettingsState = z.object({
   workingColor: zColor,
   breakColor: zColor,
   freemodeColor: zColor,
   workingSeconds: z.number(),
   breakSeconds: z.number(),
   areCompletedTasksVisible: z.boolean(),
});

export type SettingsState = z.infer<typeof zSettingsState>;

export class SettingsStore {
   private _store: Store;

   public workingColor: Color = 'green';

   public breakColor: Color = 'red';

   public freemodeColor: Color = 'blue';

   public workingSeconds: number = 25 * 60;

   public breakSeconds: number = 5 * 60;

   public openLogoutDialog = false;

   public userId: UserProfile['sub'] | null = null;

   public openSettingsDialog = false;

   public openStatisticsDialog = false;

   public areCompletedTasksVisible = true;

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

   setOpenSettingsDialog(open: boolean) {
      this.openSettingsDialog = open;
      this._store.pomodoroStore.pause();

      if (!open) {
         this.saveSettings();
      }
   }

   setBreakColor(breakColor: Color) {
      this.breakColor = breakColor;
   }

   setFreemodeColor(freemodeColor: Color) {
      this.freemodeColor = freemodeColor;
   }

   setOpenStatisticsDialog(open: boolean) {
      this.openStatisticsDialog = open;
      this._store.pomodoroStore.pause();
   }

   private saveSettings() {
      const state: SettingsState = {
         workingColor: this.workingColor,
         breakColor: this.breakColor,
         freemodeColor: this.freemodeColor,
         workingSeconds: this.workingSeconds,
         breakSeconds: this.breakSeconds,
         areCompletedTasksVisible: this.areCompletedTasksVisible,
      };

      localStorage.setItem('settings', JSON.stringify(state));
   }

   loadSettings() {
      const settings = localStorage.getItem('settings');

      try {
         const settingsState = settings
            ? zSettingsState.parse(JSON.parse(settings))
            : this.getInitialSettings();

         if (settingsState !== null) {
            this.workingColor = settingsState.workingColor;
            this.breakColor = settingsState.breakColor;
            this.freemodeColor = settingsState.freemodeColor;
            this.workingSeconds = settingsState.workingSeconds;
            this.breakSeconds = settingsState.breakSeconds;
            this.areCompletedTasksVisible = settingsState.areCompletedTasksVisible;
         }
      } catch (error) {
         const settingsState = this.getInitialSettings();

         this.workingColor = settingsState.workingColor;
         this.breakColor = settingsState.breakColor;
         this.freemodeColor = settingsState.freemodeColor;
         this.workingSeconds = settingsState.workingSeconds;
         this.breakSeconds = settingsState.breakSeconds;
         this.areCompletedTasksVisible = settingsState.areCompletedTasksVisible;
      }
   }

   private getInitialSettings(): SettingsState {
      return {
         workingColor: 'green',
         breakColor: 'red',
         freemodeColor: 'blue',
         workingSeconds: 25 * 60,
         breakSeconds: 5 * 60,
         areCompletedTasksVisible: true,
      };
   }

   toggleAreCompletedTasksVisible() {
      this.areCompletedTasksVisible = !this.areCompletedTasksVisible;
      this._store.settingsStore.saveSettings();
   }
}
