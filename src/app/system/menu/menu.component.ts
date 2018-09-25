import { Component, OnDestroy, OnInit } from '@angular/core';
import { CategoryService } from '../../shared/category.service';
import { Category } from '../../models/category.model';
import { Subject } from 'rxjs/internal/Subject';
import { DishService } from '../../shared/dish.service';
import { Dish } from '../../models/dish.model';
import { switchMap } from 'rxjs/operators';
import { takeUntil, tap } from 'rxjs/internal/operators';
import { OrderService } from '../../shared/order.service';
import { UserService } from '../../shared/user.service';

@Component({
  selector: 'menu',
  templateUrl: './menu.template.html',
  styleUrls: ['./menu.style.less']
})
export class MenuComponent implements OnInit, OnDestroy {
  categories: Category[] = [];
  dishes: Dish[] = [];
  selectedCategory: Category;
  scrollTop = 0;

  private destroy$ = new Subject();

  constructor(private categoryService: CategoryService,
              private dishService: DishService,
              private orderService: OrderService,
              private userService: UserService) {
  }

  ngOnInit() {
    this.categoryService.getCategories()
      .pipe(
        tap(res => {
          this.categories = res;
          this.selectedCategory = this.categories[0];
        }),
        switchMap(() => this.dishService.getDishes()),
        takeUntil(this.destroy$)
      )
      .subscribe(res => {
        this.dishes = res.filter(dish => dish.isAvailable || this.isAdmin());

        if (!!this.orderService.userOrder && !!this.orderService.userOrder.dishes) {
          const dishesFromOrder = this.orderService.userOrder.dishes;

          for (let i = 0; i < this.dishes.length; i++) {
            for (let j = 0; j < dishesFromOrder.length; j++) {
              if (this.dishes[i].id === dishesFromOrder[j].id) {
                this.dishes[i] = dishesFromOrder[j];
              }
            }
          }
        }
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
  }

  onSelectCategory(category: Category) {
    this.selectedCategory = category;
  }

  isDishVisible(dish: Dish): boolean {
    return (dish.isAvailable || this.isAdmin()) && dish.categoryId === this.selectedCategory.id;
  }

  onDishRemove(dish: Dish) {
    if (dish.amount > 0) {
      dish.amount--;
    }

    this.orderService.updateUserOrder(this.dishes);
  }

  onDishAdd(dish: Dish) {
    dish.amount++;

    this.orderService.updateUserOrder(this.dishes);
  }

  onAddComment(dish: Dish, comment: string) {
    dish.comment = comment;
    this.orderService.updateUserOrder(this.dishes);
  }

  hideDish(dish: Dish) {
    this.dishService.hideDish(dish);
  }

  returnDish(dish: Dish) {
    this.dishService.returnDish(dish);
  }

  onScroll({srcElement}: Event) {
    this.scrollTop = srcElement.scrollTop;
  }

  isAdmin() {
    return this.userService.isAdmin();
  }
}
