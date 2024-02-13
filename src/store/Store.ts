import { makeAutoObservable } from 'mobx';
import { PomodoroStore } from './PomodoroStore';
import { SettingsStore } from './SettingsStore';
import { TagStore } from './TagStore';
import { TaskStore } from './TaskStore';

export class Store {
   pomodoroStore: PomodoroStore;

   settingsStore: SettingsStore;

   tagStore: TagStore;

   taskStore: TaskStore;

   constructor() {
      makeAutoObservable(this);

      this.pomodoroStore = new PomodoroStore(this);
      this.settingsStore = new SettingsStore(this);
      this.tagStore = new TagStore();
      this.taskStore = new TaskStore(this);
   }
}
