import { Component, Input } from '@angular/core';
import { AllArticlesItem } from '../articles-service/all-articles-item';

@Component({
  selector: 'app-all-articles-item',
  templateUrl: './all-articles-item.component.html',
  styleUrl: './all-articles-item.component.css'
})
export class AllArticlesItemComponent {

  @Input() article: AllArticlesItem | undefined;
  @Input() isHovered: boolean = false;

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
