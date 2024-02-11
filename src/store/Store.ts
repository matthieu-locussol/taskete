import { makeAutoObservable } from 'mobx';
import { SettingsStore } from './SettingsStore';

export class Store {
   settingsStore: SettingsStore;

   constructor() {
      makeAutoObservable(this);

      this.settingsStore = new SettingsStore();
   }
}
