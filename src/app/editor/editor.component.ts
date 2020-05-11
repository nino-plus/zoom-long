import { ArticleService } from './../services/article.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss'],
})
export class EditorComponent implements OnInit {
  form: FormGroup = this.fb.group({
    title: ['', [Validators.required]],
    body: ['', [Validators.required]],
    public: [true],
  });

  constructor(
    private fb: FormBuilder,
    private articleService: ArticleService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {}

  submit() {
    console.log('check');
    this.articleService
      .createArticle(this.form.value)
      .then(() => {
        this.snackBar.open('記事を作成しました', null, {
          duration: 2000,
        });
      })
      .catch(() => {
        this.snackBar.open('記事を作成が失敗しました', null, {
          duration: 2000,
        });
      });
  }
}
