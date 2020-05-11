import { UserService } from './../services/user.service';
import { ArticleService } from './../services/article.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Article } from '../interfaces/article';
import { MatSnackBar } from '@angular/material/snack-bar';

const algoliasearch = require('algoliasearch/lite');

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

  searchParams = {
    hitsPerPage: 4,
  };

  likedArticleIds: string[];

  staticState: {
    [key: string]: {
      count: number;
      isLiked: boolean;
    };
  } = {};

  constructor(
    private articleService: ArticleService,
    private snackBar: MatSnackBar,
    private userService: UserService
  ) {
    this.userService.getLikedArticleIds('AAA').then((articleIds) => {
      this.likedArticleIds = articleIds;
    });
  }

  ngOnInit(): void {}

  check() {
    console.log('hit');
  }

  like(id: string, likeCount: number) {
    const count: number = this.staticState[id]
      ? ++this.staticState[id].count
      : ++likeCount;

    this.staticState[id] = {
      count,
      isLiked: true,
    };

    this.articleService.likeArticle(id).then(() => {
      this.snackBar.open('いいねしました', null, {
        duration: 2000,
      });
    });
  }

  unLike(id: string, likeCount: number) {
    const count = this.staticState[id]
      ? --this.staticState[id].count
      : --likeCount;

    console.log(count);

    this.staticState[id] = {
      count,
      isLiked: false,
    };

    this.articleService.unLikeArticle(id).then(() => {
      this.snackBar.open('いいね解除しました', null, {
        duration: 2000,
      });
    });
  }

  isLiked(id: string): boolean {
    if (this.staticState[id]) {
      return this.staticState[id].isLiked;
    } else {
      return this.likedArticleIds?.includes(id);
    }
  }
}
