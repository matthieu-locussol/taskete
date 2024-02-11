import { makeAutoObservable } from 'mobx';
import { PomodoroStore } from './PomodoroStore';
import { SettingsStore } from './SettingsStore';
import { TaskStore } from './TaskStore';

export class Store {
   pomodoroStore: PomodoroStore;

   settingsStore: SettingsStore;

   taskStore: TaskStore;

   constructor() {
      makeAutoObservable(this);

      this.pomodoroStore = new PomodoroStore(this);
      this.settingsStore = new SettingsStore(this);
      this.taskStore = new TaskStore(this);
   }
}
