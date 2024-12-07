import { Component, ViewEncapsulation } from '@angular/core';
import { ThemeService } from '../services/theme.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  encapsulation: ViewEncapsulation.Emulated,
})
export class HeaderComponent {
  search_articles: string | any[] | null | undefined = 'search';
  home: string | any[] | null | undefined = 'home';
  articles: string | any[] | null | undefined = 'articles';
  about: string | any[] | null | undefined = 'about';

  constructor(private themeService: ThemeService) {}

  toggleTheme(): void {
    this.themeService.toggleDarkMode();
  }

  isDarkMode(): boolean {
    return this.themeService.isDarkMode();
  }
}