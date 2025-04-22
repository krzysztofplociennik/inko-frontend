import { Component, OnInit, ViewEncapsulation, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { ThemeService } from '../services/theme.service';
import { AuthService } from '../auth/auth.service';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { getBaseUrl } from '../utils/urlUtils';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  encapsulation: ViewEncapsulation.Emulated,
})
export class HeaderComponent implements OnInit, AfterViewInit {
  search_articles: string | any[] | null | undefined = 'search';
  articles: string | any[] | null | undefined = 'articles';

  isLoggedIn: boolean;

  @ViewChild('banner') bannerImg!: ElementRef<HTMLImageElement>;

  constructor(
    private themeService: ThemeService,
    private authService: AuthService,
    private messageService: MessageService,
    private router: Router,
  ) {
    this.isLoggedIn = false;
  }

  ngOnInit(): void {
    this.authService.loginState$.subscribe((state) => {
      this.isLoggedIn = state;
    });
  }

  ngAfterViewInit(): void {
    this.loadBannerImage();
  }

  toggleTheme(): void {
    this.themeService.toggleDarkMode();
  }

  isDarkMode(): boolean {
    return this.themeService.isDarkMode();
  }

  login() {
    this.isLoggedIn = true;
    console.log('isLoggedIn: ' + this.isLoggedIn);
  }

  logout() {
    this.authService.clearToken();
    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'You have been successfully logged out!' });
    this.router.navigate(['/']);
  }

  loadBannerImage() {
    const bannerElement = this.bannerImg.nativeElement;
    let imagePath = '';

    switch (getBaseUrl()) {
      case 'http://localhost:8080': 
        imagePath = '../../../assets/graphics/banner/dev.png';
        break;
      case 'demo': 
        imagePath = '../../../assets/graphics/banner/demo.png';
        break;
      default: imagePath = '';
    }
    bannerElement.src = imagePath;
  }
}