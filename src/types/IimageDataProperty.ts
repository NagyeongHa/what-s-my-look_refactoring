export interface IimageDataProperty {
  count?: number;
  id?: number;
  name?: string;
  src?: string;
  temperature?: number;
  user?: string;
  uuid?: string | null;
  likes: { [key: string]: { user: string; uuid: string } };
}
