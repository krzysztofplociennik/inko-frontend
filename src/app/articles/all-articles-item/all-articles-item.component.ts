import { Component, Input } from '@angular/core';
import { AllArticlesItem } from '../articles-service/all-articles-item';
import { DateUtils } from 'src/app/shared/utils/dateUtils';
import { StringUtils } from 'src/app/shared/utils/stringUtils';

@Component({
  selector: 'app-all-articles-item',
  templateUrl: './all-articles-item.component.html',
  styleUrl: './all-articles-item.component.css'
})
export class AllArticlesItemComponent {

  @Input() article: AllArticlesItem | undefined;
  @Input() isHovered: boolean = false;

  getCurrentStyle(): { [klass: string]: any; } {
    return {
      'height': '200px',
      'background': this.getBackgroundColor(),
    };
  }

  getBackgroundColor(): string { 
    return this.isHovered? '#e6eef5' : 'white';
  }

  getFormattedType(): string {
    return this.article?.type ? StringUtils.loseCaps(this.article.type) : 'Unknown Type';
  }

  getFormattedDate(): string {
    if (this.article?.creationDate) {
      const date = new Date(this.article.creationDate);
      return isNaN(date.getTime()) ? 'Invalid Date' : DateUtils.formatDate(date);
    }
    return 'Unknown Date';
  }

}
