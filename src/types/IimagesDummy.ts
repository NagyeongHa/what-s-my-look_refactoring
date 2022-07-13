export interface IimageDummy {
  count: number;
  id: number;
  name: string;
  src: string;
  temperature: number;
  likes?: {
    user: string;
    uuid: string;
  };
}
