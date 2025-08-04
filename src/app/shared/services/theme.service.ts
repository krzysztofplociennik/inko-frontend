import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';
import { updatePreset } from '@primeuix/themes';

export interface ThemeConfig {
  dark: boolean;
  primaryColor?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private readonly STORAGE_KEY = 'app-theme-config';
  private readonly DARK_SCHEME_PREFERRED = '(prefers-color-scheme: dark)';
  private readonly BACKGROUND_COLOR_VARIABLE = '--app-bg-color';
  private readonly TEXT_COLOR_VARIABLE = '--app-text-color';
  private readonly CONTENT_OUTLINE_COLOR_VARIABLE = '--app-co-color';
  private readonly APP_DARK = 'app-dark';

  private themeSubject = new BehaviorSubject<ThemeConfig>({ dark: false });
  
  public theme$: Observable<ThemeConfig> = this.themeSubject.asObservable();

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.initializeTheme();
  }

  private initializeTheme(): void {
    if (isPlatformBrowser(this.platformId)) {
      const savedTheme = this.loadThemeFromStorage();
      const systemPrefersDark = window.matchMedia(this.DARK_SCHEME_PREFERRED).matches;
      
      const initialTheme: ThemeConfig = {
        dark: savedTheme?.dark ?? systemPrefersDark,
        primaryColor: savedTheme?.primaryColor
      };

      this.applyTheme(initialTheme);

      window.matchMedia(this.DARK_SCHEME_PREFERRED)
        .addEventListener('change', (e) => {
          if (!this.hasUserPreference()) {
            this.applyTheme({ ...this.currentTheme, dark: e.matches });
          }
        });
    }
  }

  private loadThemeFromStorage(): ThemeConfig | null {
    if (!isPlatformBrowser(this.platformId)) return null;
    
    try {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  }

  private saveThemeToStorage(theme: ThemeConfig): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(theme));
    }
  }

  private hasUserPreference(): boolean {
    return isPlatformBrowser(this.platformId) && 
           localStorage.getItem(this.STORAGE_KEY) !== null;
  }

  private get currentTheme(): ThemeConfig {
    return this.themeSubject.value;
  }

  private applyTheme(theme: ThemeConfig): void {
    if (!isPlatformBrowser(this.platformId)) return;

    const htmlElement = document.querySelector('html')!;
    
    if (theme.dark) {
      htmlElement.classList.add(this.APP_DARK);
      document.documentElement.style.setProperty(this.BACKGROUND_COLOR_VARIABLE, '#000000ff');
      document.documentElement.style.setProperty(this.TEXT_COLOR_VARIABLE, '#ffffff');
      document.documentElement.style.setProperty(this.CONTENT_OUTLINE_COLOR_VARIABLE, '#1f1f1f');
    } else {
      htmlElement.classList.remove(this.APP_DARK);
      document.documentElement.style.setProperty(this.BACKGROUND_COLOR_VARIABLE, '#E8F0FE');
      document.documentElement.style.setProperty(this.TEXT_COLOR_VARIABLE, '#000000');
      document.documentElement.style.setProperty(this.CONTENT_OUTLINE_COLOR_VARIABLE, '#F5F5F5');
    }

    if (theme.primaryColor) {
      updatePreset({
        semantic: {
          primary: this.generatePrimaryColor(theme.primaryColor)
        }
      });
    }

    this.themeSubject.next(theme);
    this.saveThemeToStorage(theme);
  }

  private generatePrimaryColor(color: string) {
    return {
      500: color,
    };
  }

  toggleDarkMode(): void {
    const newTheme = { ...this.currentTheme, dark: !this.currentTheme.dark };
    this.applyTheme(newTheme);
  }

  setDarkMode(dark: boolean): void {
    if (this.currentTheme.dark !== dark) {
      const newTheme = { ...this.currentTheme, dark };
      this.applyTheme(newTheme);
    }
  }

  setPrimaryColor(color: string): void {
    const newTheme = { ...this.currentTheme, primaryColor: color };
    this.applyTheme(newTheme);
  }

  isDarkMode(): boolean {
    return this.currentTheme.dark;
  }

  getCurrentTheme(): ThemeConfig {
    return this.currentTheme;
  }

  resetToSystemPreference(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem(this.STORAGE_KEY);
      const systemPrefersDark = window.matchMedia(this.DARK_SCHEME_PREFERRED).matches;
      this.applyTheme({ dark: systemPrefersDark });
    }
  }
}