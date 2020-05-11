import { UserService } from './../services/user.service';
import { ArticleService } from './../services/article.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Article } from '../interfaces/article';
import { MatSnackBar } from '@angular/material/snack-bar';

// const algoliasearch = require('algoliasearch/lite');

import * as algoliasearch from 'algoliasearch/lite';
import { QueryParameters } from 'algoliasearch';

const searchClient = algoliasearch(
  'MNGF6MV1S0',
  '499df9f245ff51aff4201dc64ae2ae71'
);

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.scss'],
})
export class ArticleListComponent implements OnInit {
  articles$: Observable<Article[]> = this.articleService.getArticles();
  config = {
    indexName: 'articles',
    searchClient,
  };

  saerchSetting: QueryParameters = {
    query: '',
    page: 0,
    hitsPerPage: 3,
  };

  searchParams = {
    hitsPerPage: 4,
  };

  index = searchClient.initIndex('articles');

  likedArticleIds: string[];

  likeState = {};

  list: Article[];

  constructor(
    private articleService: ArticleService,
    private snackBar: MatSnackBar,
    private userService: UserService
  ) {
    this.userService.getLikedArticleIds('AAA').then((articleIds) => {
      this.likedArticleIds = articleIds;
    });

    this.index.search(this.saerchSetting).then((result) => {
      this.list = result.hits;
    });
  }

  ngOnInit(): void {}

  check() {
    console.log('hit');
  }

  like(id: string) {
    const index = this.list.findIndex((list) => list.id === id);
    this.list[index].likeCount++;
    this.likeState[id] = {
      isLiked: true,
    };

    this.articleService.likeArticle(id).then(() => {
      this.snackBar.open('いいねしました', null, {
        duration: 2000,
      });
    });
  }

  unLike(id: string) {
    const index = this.list.findIndex((list) => list.id === id);
    this.list[index].likeCount--;
    this.likeState[id] = {
      isLiked: false,
    };

    this.articleService.unLikeArticle(id).then(() => {
      this.snackBar.open('いいね解除しました', null, {
        duration: 2000,
      });
    });
  }

  isLiked(id: string): boolean {
    if (this.likeState[id]) {
      return this.likeState[id].isLiked;
    } else {
      return this.likedArticleIds?.includes(id);
    }
  }

  moreSearch() {
    this.saerchSetting.page++;
    this.index.search(this.saerchSetting).then((result) => {
      this.list = this.list.concat(result.hits);
    });
  }
}
