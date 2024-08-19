import { Component, OnInit } from '@angular/core';
import { CreateArticleService } from './service/create-article.service';
import { ArticleType } from './article';
import { Message } from 'primeng/api';
import { MessagesModule } from 'primeng/messages';

@Component({
  selector: 'app-new-article',
  templateUrl: './new-article.component.html',
  styleUrls: ['./new-article.component.css'],
})
export class NewArticleComponent implements OnInit {

  articleTypes: ArticleType[] | undefined;
  articleTitle: string = '';
  selectedType!: ArticleType;
  tags!: string[];
  content = '';
  messages: Message[] = [];

  constructor(public service: CreateArticleService) { }

  ngOnInit(): void {

    this.messages = [];

    this.articleTypes = [
      { code: '1', name: 'Programming' },
      { code: '2', name: 'Tools' },
      { code: '3', name: 'OS' },
    ];
  }

  createArticle() {

    const type: string = this.selectedType?.name
    const tags: string[] = this.tags;

    // this.service.create(this.articleTitle, type, tags, this.content).subscribe(
    //   (response: string) => {

    //     console.log('response: ' + response);
    //   }
    // );

    this.service.create(this.articleTitle, type, tags, this.content).subscribe({
      next: () => {
        this.messages = [
          { severity: 'success', summary: 'The article has been successfully saved!' },
        ];
      },
      error: err => {
        this.messages = [
          { severity: 'error', summary: 'There was en error! Try again.' },
        ];
        console.error('An error occurred', err);
      },
      complete: () => {
        this.clearMessages();
      }
    })

    this.clearInputs();
    this.clearMessages();
  }

  reloadPage(): void {
    window.location.reload();
  }

  clearInputs(): void {
    this.articleTitle = '';
    this.tags = [];
    this.content = '';
  }

  clearMessages(): void {
    this.delay(5000);
    this.messages = [];
  }

  async delay(ms: number) {
    await new Promise<void>(resolve => setTimeout(() => resolve(), ms)).then(() => console.log("fired"));
  }

}
