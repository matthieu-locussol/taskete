import { makeAutoObservable } from 'mobx';
import { PomodoroStore } from './PomodoroStore';
import { SettingsStore } from './SettingsStore';

export class Store {
   pomodoroStore: PomodoroStore;

   settingsStore: SettingsStore;

   constructor() {
      makeAutoObservable(this);

      this.pomodoroStore = new PomodoroStore(this);
      this.settingsStore = new SettingsStore(this);
   }
}
