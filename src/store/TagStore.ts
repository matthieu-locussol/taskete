import { makeAutoObservable } from 'mobx';
import { z } from 'zod';

export const zTag = z.object({
   id: z.number(),
   name: z.string(),
});

export type Tag = z.infer<typeof zTag>;

export class TagStore {
   public oldTags: Tag[] = [];

   public tags: Tag[] = [];

   public tagNameField = '';

   public openTagsDialog = false;

   public errorMessage = '';

   constructor() {
      makeAutoObservable(this);
   }

   initializeTags(tags: Tag[]) {
      this.tags = [...tags];
      this.oldTags = [...tags];
   }

   addTag() {
      if (this.tagNameField.trim().length === 0) {
         this.errorMessage = 'Tag name cannot be empty!';
         return;
      }

      if (this.tags.some((t) => t.name === this.tagNameField)) {
         this.errorMessage = `Tag "${this.tagNameField}" already exists!`;
         return;
      }

      this.errorMessage = '';

      this.tags.push({
         id: -1,
         name: this.tagNameField,
      });

      this.tagNameField = '';
   }

   removeTag({ id, name }: Tag) {
      if (id !== -1) {
         this.tags = this.tags.filter((tag) => tag.id !== id);
      } else {
         this.tags = this.tags.filter((tag) => tag.name !== name);
      }
   }

   editTag(tagId: number, newName: string) {
      const tag = this.tags.find((t) => t.id === tagId);

      if (tag) {
         tag.name = newName;
      }
   }

   saveTags() {
      // Save tags to Database
      this.oldTags = [...this.tags];
   }

   setTagNameField(value: string) {
      this.tagNameField = value;
   }

   get tagsToCreate() {
      return this.tags.filter((t) => t.id === -1);
   }

   get tagsToDelete() {
      return this.oldTags.filter((t) => !this.tags.includes(t));
   }

   get tagsToUpdate() {
      return this.tags.filter((t) => {
         const oldTag = this.oldTags.find((ot) => ot.id === t.id);
         return oldTag && oldTag.name !== t.name;
      });
   }

   get hasChanges() {
      return (
         this.tagsToCreate.length > 0 ||
         this.tagsToDelete.length > 0 ||
         this.tagsToUpdate.length > 0
      );
   }

   get canAddTag() {
      return this.tagNameField.trim().length > 0;
   }

   reset() {
      this.tags = [...this.oldTags];
   }

   setOpenTagsDialog(open: boolean) {
      this.openTagsDialog = open;
      this.errorMessage = '';
   }

   get isErrored() {
      return this.errorMessage.length > 0;
   }
}
