import { Component, Input } from '@angular/core';
import { AllArticlesItem } from './articles-service/all-articles-item';
import { ArticlesService } from './articles-service/articles.service';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css']
})
export class ArticlesComponent {

  articlesResults: AllArticlesItem[] = [];

  hoveredIndex: number|null = null;
  @Input() isHovered: boolean = false;

  constructor(public articlesService: ArticlesService) {
    this.getAllArticles();
  }

  getAllArticles() {
    this.articlesService.getAllArticles().subscribe(
      (response: AllArticlesItem[]) => {
        this.articlesResults = response;
      });
  }

  mouseEnter(index: number) {
    this.hoveredIndex = index;
  }  

  mouseLeave(index: number) {
    this.hoveredIndex = null;
  }

}
