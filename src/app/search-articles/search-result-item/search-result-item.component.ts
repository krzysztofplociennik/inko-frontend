import { Component, Input } from '@angular/core';
import { ArticleSearch } from './article-result';
import { DateUtils } from 'src/app/shared/utils/dateUtils';
import { CardModule } from 'primeng/card';
import { ChipModule } from 'primeng/chip';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-result-item',
    templateUrl: './search-result-item.component.html',
    styleUrl: './search-result-item.component.css',
    imports: [
      CommonModule,
      CardModule,
      ChipModule,
    ]
})
export class ResultItemComponent {

  @Input() article: ArticleSearch | undefined;

  currentStyle: { [klass: string]: any; } | undefined;

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
    return 'Not yet updated';
  }

}
