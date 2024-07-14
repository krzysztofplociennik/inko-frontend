import { Component } from '@angular/core';

@Component({
  selector: 'app-search-articles',
  templateUrl: './search-articles.component.html',
  styleUrls: ['./search-articles.component.css']
})
export class SearchArticlesComponent {

  searchPhrase: string | undefined;

  searchForArticles(arg0: string | undefined) {
    throw new Error('Method not implemented.');
  }

}
