import { Dish } from './dish.model';

export class Category {
  public id: number;
  public name: string;
  public dishes: Dish[];
  public photo: string;
}
