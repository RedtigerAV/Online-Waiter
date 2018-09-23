import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { CategoryService } from '../../shared/category.service';
import { Category } from '../../models/category.model';
import { Subject } from 'rxjs/index';
import { takeUntil } from 'rxjs/internal/operators';

@Component({
  selector: 'menu',
  templateUrl: './menu.template.html',
  styleUrls: ['./menu.style.less']
})
export class MenuComponent implements OnInit, OnDestroy {
  @Output() selectCategory = new EventEmitter<Category>();
  categories: Category[] = [];
  selectedCategory: Category;

  private destroy$ = new Subject();

  constructor(private categoryService: CategoryService) {
  }

  ngOnInit() {
    this.categoryService.getCategories()
      .pipe(
        takeUntil(this.destroy$)
      )
      .subscribe(res => {
        this.categories = res;
        this.selectedCategory = this.categories[0];
        this.selectCategory.emit(this.selectedCategory);
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
  }

  onSelectCategory(category: Category) {
    this.selectedCategory = category;
    this.selectCategory.emit(this.selectedCategory);
  }
}
