import { Component, Input } from '@angular/core';
import { ArticleSearch } from './article-result';

@Component({
  selector: 'app-result-item',
  templateUrl: './search-result-item.component.html',
  styleUrl: './search-result-item.component.css',
})
export class ResultItemComponent {

  @Input() article: ArticleSearch | undefined;
  @Input() isHovered: boolean = false;

  currentStyle: { [klass: string]: any; } | undefined;

  getCurrentStyle(): { [klass: string]: any; } {
    
    if(this.isHovered) {
      return {
        'background':'#e6eef5'
      };
    }
    return {
      'background':'white'
    };
  }

}
