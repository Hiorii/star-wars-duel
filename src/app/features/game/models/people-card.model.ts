import { GenderEnum } from './gender.enum';

export interface PeopleCardModel {
  properties: {
    height: string;
    mass: string;
    hair_color: string;
    skin_color: string;
    eye_color: string;
    birth_year: string;
    gender: GenderEnum;
    created: Date;
    edited: Date;
    name: string;
    homeworld: string;
    url: string;
  };
  description: string;
  _id: string;
  uid: string;
  __v: number;
}
