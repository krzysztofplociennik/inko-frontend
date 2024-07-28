import { Component, Input } from '@angular/core';
import { ArticleSearch } from './article-result';

@Component({
  selector: 'app-result-item',
  templateUrl: './search-result-item.component.html',
  styleUrl: './search-result-item.component.css',
})
export class ResultItemComponent {

  @Input() article: ArticleSearch | undefined;

  currentStyle: { [klass: string]: any; }|null|undefined;

}
