import { makeAutoObservable, runInAction } from 'mobx';
import { z } from 'zod';
import { Store } from './Store';

const zPomodoroState = z.union([z.literal('working'), z.literal('break'), z.literal('freemode')]);

export type PomodoroState = z.infer<typeof zPomodoroState>;

const zSecondsType = z.union([z.literal('seconds'), z.literal('minutes'), z.literal('hours')]);

export type SecondsType = z.infer<typeof zSecondsType>;

export class PomodoroStore {
   private _store: Store;

   private _intervalId: number | null = null;

   public state: PomodoroState = 'working';

   public elapsedSeconds: number = 0;

   public endAudio: HTMLAudioElement | null = null;

   constructor(store: Store) {
      makeAutoObservable(this);

      this._store = store;
   }

   get maxSeconds() {
      return {
         working: this._store.settingsStore.workingSeconds,
         break: this._store.settingsStore.breakSeconds,
         freemode: -1,
      }[this.state];
   }

   get remainingSecondsStr() {
      const remainingSeconds = this.remainingSeconds;

      const hours = Math.floor(remainingSeconds / 3600);
      const minutes = Math.floor((remainingSeconds % 3600) / 60);
      const seconds = remainingSeconds % 60;

      const hoursStr = hours.toString().padStart(2, '0');
      const minutesStr = minutes.toString().padStart(2, '0');
      const secondsStr = seconds.toString().padStart(2, '0');

      if (hours > 0) {
         return `${hoursStr}:${minutesStr}:${secondsStr}`;
      }

      if (minutes > 0) {
         return `${minutesStr}:${secondsStr}`;
      }

      return secondsStr;
   }

   get secondsType(): SecondsType {
      if (this.remainingSeconds < 60) {
         return 'seconds';
      }

      if (this.remainingSeconds < 3600) {
         return 'minutes';
      }

      return 'hours';
   }

   get remainingSeconds() {
      return this.state === 'freemode'
         ? this.elapsedSeconds
         : this.maxSeconds - this.elapsedSeconds;
   }

   get remainingSecondsRatio() {
      return this.state === 'freemode' ? 0 : this.elapsedSeconds / this.maxSeconds;
   }

   get titleSuffix() {
      return {
         working: 'Working time',
         break: 'Break time',
         freemode: 'Freemode',
      }[this.state];
   }

   get title() {
      return `${this.remainingSecondsStr} | ${this.titleSuffix}`;
   }

   get paused() {
      return this._intervalId === null;
   }

   setState(state: PomodoroState) {
      this.state = state;

      this.reset();
   }

   setElapsedSeconds(seconds: number) {
      this.elapsedSeconds = seconds;
   }

   start() {
      if (this.elapsedSeconds < this.maxSeconds) {
         this.elapsedSeconds += 1;
      }

      if (this.state === 'freemode') {
         this.startFreeMode();
         return;
      }

      const intervalId = window.setInterval(() => {
         if (this.elapsedSeconds < this.maxSeconds) {
            runInAction(() => {
               this.elapsedSeconds += 1;
            });
         } else {
            window.clearInterval(intervalId);

            if (this.endAudio !== null) {
               this.endAudio.currentTime = 0;
               this.endAudio.play();
            }

            if (this.state === 'working') {
               this._store.taskStore.saveCurrentTaskCompletion();
               this.setState('break');
            } else if (this.state === 'break') {
               this.setState('working');
            }
         }
      }, 1000);

      this._intervalId = intervalId;
   }

   startFreeMode() {
      const intervalId = window.setInterval(() => {
         runInAction(() => {
            this.elapsedSeconds += 1;
         });
      }, 1000);

      this._intervalId = intervalId;
   }

   pause() {
      if (this._intervalId !== null) {
         window.clearInterval(this._intervalId);
      }

      this._intervalId = null;
   }

   reset() {
      this.elapsedSeconds = 0;
      this.pause();
   }

   setEndAudio(audio: HTMLAudioElement) {
      this.endAudio = audio;
      this.endAudio.volume = 0.5;
   }
}
