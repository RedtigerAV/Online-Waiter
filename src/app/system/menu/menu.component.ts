import { Component, OnDestroy, OnInit } from '@angular/core';
import { CategoryService } from '../../shared/category.service';
import { Category } from '../../models/category.model';
import { Subject } from 'rxjs/index';
import { switchMap, takeUntil, tap } from 'rxjs/internal/operators';
import { DishService } from '../../shared/dish.service';
import { Dish } from '../../models/dish.model';

@Component({
  selector: 'menu',
  templateUrl: './menu.template.html',
  styleUrls: ['./menu.style.less']
})
export class MenuComponent implements OnInit, OnDestroy {
  categories: Category[] = [];
  dishes: Dish[] = [];
  selectedCategory: Category;

  private destroy$ = new Subject();

  constructor(private categoryService: CategoryService,
              private dishService: DishService) {
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
        this.dishes = res;
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
  }

  onSelectCategory(category: Category) {
    this.selectedCategory = category;
  }
}
