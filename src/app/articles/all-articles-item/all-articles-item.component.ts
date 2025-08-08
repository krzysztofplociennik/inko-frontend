import { Component, Input } from '@angular/core';
import { AllArticlesItem } from '../articles-service/all-articles-item';
import { DateUtils } from 'src/app/shared/utils/dateUtils';
import { StringUtils } from 'src/app/shared/utils/stringUtils';
import { CardModule } from 'primeng/card';
import { ChipModule } from 'primeng/chip';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-all-articles-item',
    templateUrl: './all-articles-item.component.html',
    styleUrl: './all-articles-item.component.css',
    imports: [
      CardModule,
      ChipModule,
      CommonModule,
    ]
})
export class AllArticlesItemComponent {

  @Input() 
  article: AllArticlesItem | undefined;

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

  getFormattedMofificationDate(): string {
    if (this.article?.modificationDate) {
      const date = new Date(this.article.modificationDate);
      return isNaN(date.getTime()) ? 'Invalid Date' : DateUtils.formatDate(date);
    }
    return 'Not yet modified';
  }

}
