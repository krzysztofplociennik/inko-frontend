import { Component, OnInit } from '@angular/core';
import { CreateArticleService } from './service/create-article.service';
import { ArticleType } from './article';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-new-article',
  templateUrl: './new-article.component.html',
  styleUrls: ['./new-article.component.css'],
  // providers: [MessageService]
})
export class NewArticleComponent implements OnInit {
  articleTypes: ArticleType[] | undefined;
  articleTitle: string = '';
  selectedType!: ArticleType;
  tags: string[] = [];
  content = '';

  constructor(
    public service: CreateArticleService,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.articleTypes = [
      { code: '1', name: 'Programming' },
      { code: '2', name: 'Tools' },
      { code: '3', name: 'OS' },
    ];
  }

  createArticle() {
    const type: string = this.selectedType?.name;
    this.service.create(this.articleTitle, type, this.tags, this.content).subscribe({
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
}