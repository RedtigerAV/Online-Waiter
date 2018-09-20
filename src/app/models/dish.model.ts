import { IProduct } from './product.model';

export class Dish {
  public id: number;
  public name: string;
  public description: string;
  public products: IProduct[];
  public calories: number;
  public sum: number;
  public isAvailable: boolean;
  public photo: string;
  public amount: number;
  public comment: string;
}
