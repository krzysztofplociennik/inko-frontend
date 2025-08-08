import { Component, OnInit } from '@angular/core';
import { CreateArticleService } from './service/create-article.service';
import { ArticleType } from './article';
import { MessageService } from 'primeng/api';
import { ArticleReadService } from '../shared/services/article-read.service';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../shared/header/header.component';
import { FooterComponent } from '../shared/footer/footer.component';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { DropdownModule } from 'primeng/dropdown';
import { ChipsModule } from 'primeng/chips';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { EditorModule } from 'primeng/editor';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-new-article',
    templateUrl: './new-article.component.html',
    styleUrls: ['./new-article.component.css'],
    imports: [
      CommonModule,
      HeaderComponent,
      FooterComponent,
      ProgressSpinnerModule,
      DropdownModule,
      ChipsModule,
      ButtonModule,
      InputTextModule,
      EditorModule,
      FormsModule,
    ]
})
export class NewArticleComponent implements OnInit {
  articleTypes: ArticleType[] = [];
  selectedType: ArticleType = { name: '' };
  articleTitle: string = '';
  tags: string[] = [];
  content = '';

  shouldSpinnerWork = false;

  constructor(
    public createArticleService: CreateArticleService,
    private articleService: ArticleReadService,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {

    this.articleService.fetchArticleTypes().subscribe(
      (response: ArticleType[]) => {
        this.articleTypes = response;
      } 
    )
  }

  async createArticle() {
    this.shouldSpinnerWork = true;
    try {
      await this.callCreateArticle();
    } catch (error) {
      console.log('Error while creating the article: ' + error);
    } finally {
      this.shouldSpinnerWork = false;
    }
  }

  async callCreateArticle() {
    const type: string = this.selectedType.name;

    this.createArticleService.create(this.articleTitle, type, this.tags, this.content).subscribe({
      next: () => {
        this.messageService.add({severity:'success', summary:'Success', detail:'The article has been successfully saved!'});
        this.clearInputs();
        this.scheduleMessageClear();
      },
      error: (err) => {
        this.messageService.add({severity:'error', summary:'Error', detail:'There was an error! Try again.'});
        console.error('Error creating article:', err);
      }
    });
  }

  clearInputs(): void {
    this.articleTitle = '';
    this.selectedType = {} as ArticleType;
    this.tags = [];
    this.content = '';
  }

  private scheduleMessageClear(): void {
    setTimeout(() => {
      this.messageService.clear();
    }, 5000);
  }

  public areArticleTypesPopulated(): boolean {
      return this.articleTypes.length > 0;
  }
}