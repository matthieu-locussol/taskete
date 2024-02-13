import { makeAutoObservable } from 'mobx';
import { z } from 'zod';
import { CreateTagResults } from '../pages/api/createTag';
import { Store } from './Store';

export const zTag = z.object({
   id: z.number(),
   name: z.string(),
});

export type Tag = z.infer<typeof zTag>;

export class TagStore {
   private _store: Store;

   public oldTags: Tag[] = [];

   public tags: Tag[] = [];

   public tagNameField = '';

   public openTagsDialog = false;

   public errorMessage = '';

   public loading = false;

   public initialized = false;

   constructor(store: Store) {
      makeAutoObservable(this);

      this._store = store;
   }

   initializeTags(tags: Tag[]) {
      this.tags = [...tags];
      this.oldTags = [...tags];
      this.initialized = true;
   }

   addTag() {
      this.setLoading(true);

      if (this.tagNameField.trim().length === 0) {
         this.errorMessage = 'Tag name cannot be empty!';
         this.setLoading(false);
         return;
      }

      if (this.tags.some((t) => t.name === this.tagNameField)) {
         this.errorMessage = `Tag "${this.tagNameField}" already exists!`;
         this.setLoading(false);
         return;
      }

      this.errorMessage = '';

      fetch(`/api/createTag?sub=${this._store.settingsStore.userId}&name=${this.tagNameField}`)
         .then((res) => res.json())
         .then((data: CreateTagResults) => {
            this.tags.push(data.tag);
         })
         .catch((error) => {
            this.errorMessage = error?.message || 'An error occurred while creating the tag.';
         })
         .finally(() => {
            this.tagNameField = '';
            this.setLoading(false);
         });
   }

   removeTag({ id, name }: Tag) {
      // Optimistic update
      this.tags = this.tags.filter((tag) => tag.id !== id);

      fetch(`/api/deleteTag?id=${id}&sub=${this._store.settingsStore.userId}&name=${name}`)
         .then((res) => res.json())
         .then((_data: CreateTagResults) => {
            // Do nothing
         })
         .catch((error) => {
            this.reset();
            this.errorMessage = error?.message || 'An error occurred while deleting the tag.';
         })
         .finally(() => {
            this.tagNameField = '';
         });
   }

   setTagNameField(value: string) {
      this.tagNameField = value;
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

   setLoading(loading: boolean) {
      this.loading = loading;
   }
}
