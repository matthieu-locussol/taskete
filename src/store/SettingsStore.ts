import { makeAutoObservable } from 'mobx';
import { z } from 'zod';

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
   color: Color = 'green';

   constructor() {
      makeAutoObservable(this);
   }

   setColor(color: Color) {
      this.color = color;
   }
}
