import { IimageItemProperty } from './IimageItemProperty';

export interface IImageDataProperty extends IimageItemProperty {
  count?: number;
  name?: string;
  temperature?: number;
  user?: string;
  uuid?: string | null;
  likes?: { [key: string]: { user: string; uuid: string } };
  images: Partial<IimageItemProperty>;
}
