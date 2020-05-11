import { MatSnackBarModule } from '@angular/material/snack-bar';
import { NgAisModule } from 'angular-instantsearch';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ArticleListRoutingModule } from './article-list-routing.module';
import { ArticleListComponent } from './article-list.component';
import { VisibleDirective } from './visible.directive';

@NgModule({
  declarations: [ArticleListComponent, VisibleDirective],
  imports: [
    CommonModule,
    ArticleListRoutingModule,
    NgAisModule,
    MatSnackBarModule,
  ],
})
export class ArticleListModule {}
