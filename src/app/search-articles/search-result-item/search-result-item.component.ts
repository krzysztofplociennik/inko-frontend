import { Component, Input } from '@angular/core';
import { ArticleSearch } from './article-result';
import { DateUtils } from 'src/app/shared/utils/dateUtils';

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
    return {
      'height': '120px',
      'background': this.getBackgroundColor(),
    };
  }

  getBackgroundColor(): string { 
    return this.isHovered? '#e6eef5' : 'white';
  }

  getFormattedDate(): string {
    if (this.article?.creationDate) {
      const date = new Date(this.article.creationDate);
      return isNaN(date.getTime()) ? 'Invalid Date' : DateUtils.formatDate(date);
    }
    return 'Unknown Date';
  }

  getFormattedMofificationDate(): string {
    if (this.article?.modificationDate) {
      const date = new Date(this.article.modificationDate);
      return isNaN(date.getTime()) ? 'Invalid Date' : DateUtils.formatDate(date);
    }
    return 'Unknown Date';
  }

}
