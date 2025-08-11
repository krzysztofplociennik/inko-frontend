import { Component, OnInit, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ArticlesService } from '../articles-service/articles.service';
import { ArticleDetails } from './article-details';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ArticleType } from 'src/app/new-article/article';
import { ArticleReadService } from 'src/app/shared/services/article-read.service';
import { AuthService } from 'src/app/shared/auth/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from 'src/app/shared/header/header.component';
import { FooterComponent } from 'src/app/shared/footer/footer.component';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { ChipModule } from 'primeng/chip';
import { ChipsModule } from 'primeng/chips';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { InputTextModule } from 'primeng/inputtext';
import { EditorModule } from 'primeng/editor';
import { FloatLabelModule } from 'primeng/floatlabel';
import { HighlightModule, HIGHLIGHT_OPTIONS } from 'ngx-highlightjs';

@Component({
    selector: 'app-article-details',
    templateUrl: './article-details.component.html',
    styleUrl: './article-details.component.css',
    providers: [
      ConfirmationService,
      AuthService,
      {
        provide: HIGHLIGHT_OPTIONS,
        useValue: {
          coreLibraryLoader: () => import('highlight.js/lib/core'),
          languages: {
            bash: () => import('highlight.js/lib/languages/bash'),
            plaintext: () => import('highlight.js/lib/languages/plaintext'),
            javascript: () => import('highlight.js/lib/languages/javascript'),
            typescript: () => import('highlight.js/lib/languages/typescript'),
            json: () => import('highlight.js/lib/languages/json'),
            xml: () => import('highlight.js/lib/languages/xml'),
            css: () => import('highlight.js/lib/languages/css'),
            shell: () => import('highlight.js/lib/languages/shell'),
          }
        }
      }
    ],
    imports: [
      CommonModule,
      FormsModule,
      HeaderComponent,
      FooterComponent,
      ConfirmDialogModule,
      ButtonModule,
      DropdownModule,
      ChipModule,
      ChipsModule,
      ProgressSpinnerModule, 
      InputTextModule,
      EditorModule,
      FloatLabelModule,
      HighlightModule,
    ],
})
export class ArticleDetailsComponent implements OnInit, AfterViewInit {
  @ViewChild('contentContainer', { static: false }) contentContainer!: ElementRef;

  articleID: string = '';
  article: ArticleDetails | null = null;
  isEditMode: boolean = false;
  editedArticle: ArticleDetails = {
    title: '',
    content: '',
    tags: [],
    id: '',
    type: '',
    creationDate: new Date(),
    modificationDate: new Date()
  };

  articleTypes: ArticleType[] = [];
  selectedType: ArticleType = { name: this.editedArticle.type };

  isLoggedIn: boolean = false;
  shouldSpinnerWork: boolean = false;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private articleService: ArticlesService,
    private articleReadService: ArticleReadService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private authService: AuthService,
  ) {}

  async ngOnInit(): Promise<void> {
    this.shouldSpinnerWork = true;
  
    try {
      this.articleID = this.activatedRoute.snapshot.url[1].path;
  
      this.loadLoginState();
  
      await Promise.all([
        this.loadTypes(),
        this.loadArticleDetails()
      ]);
    } catch (error) {
      console.log('Error while loading the article\'s details');
    } finally {
      this.shouldSpinnerWork = false;
    }
  }

  ngAfterViewInit(): void {
    if (!this.isEditMode) {
      this.enhanceCodeBlocks();
    }
  }

  get processedContent(): string {
    if (!this.article?.content) return '';
    
    // Process the content to enhance code blocks
    return this.article.content.replace(
      /<pre data-language="([^"]*)">([\s\S]*?)<\/pre>/g,
      (match, lang, code) => {
        const language = lang || 'plaintext';
        const cleanCode = this.decodeHtmlEntities(code.trim());
        const escapedCode = this.escapeHtml(cleanCode);
        
        return `<div class="code-block-container" data-language="${language}">
                  <pre><code class="hljs language-${language}">${escapedCode}</code></pre>
                  <button class="copy-button" onclick="window.copyCodeToClipboard(this, \`${cleanCode.replace(/`/g, '\\`').replace(/\$/g, '\\$')}\`)">
                    <i class="pi pi-copy"></i>
                  </button>
                </div>`;
      }
    );
  }

  private enhanceCodeBlocks(): void {
    // Add global copy function
    (window as any).copyCodeToClipboard = (button: HTMLElement, code: string) => {
      navigator.clipboard.writeText(code).then(() => {
        this.messageService.add({
          severity: 'success',
          summary: 'Copied!',
          detail: 'Code copied to clipboard',
          life: 2000
        });
        
        // Visual feedback
        const icon = button.querySelector('i');
        if (icon) {
          const originalClass = icon.className;
          icon.className = 'pi pi-check';
          setTimeout(() => {
            icon.className = originalClass;
          }, 1000);
        }
      }).catch(err => {
        console.error('Failed to copy text: ', err);
        this.messageService.add({
          severity: 'error',
          summary: 'Copy Failed',
          detail: 'Failed to copy code to clipboard',
          life: 2000
        });
      });
    };

    // Apply syntax highlighting after DOM update
    setTimeout(() => {
      if (this.contentContainer?.nativeElement) {
        const codeBlocks = this.contentContainer.nativeElement.querySelectorAll('pre code');
        codeBlocks.forEach((block: HTMLElement) => {
          // Manually trigger highlight.js if needed
          if (typeof (window as any).hljs !== 'undefined') {
            (window as any).hljs.highlightElement(block);
          }
        });
      }
    }, 100);
  }

  private decodeHtmlEntities(text: string): string {
    const textarea = document.createElement('textarea');
    textarea.innerHTML = text;
    return textarea.value;
  }

  private escapeHtml(text: string): string {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  private async loadTypes(): Promise<void> {
    return new Promise(
      (resolve) => {
        this.articleReadService.fetchArticleTypes().subscribe(
          (response: ArticleType[]) => {
            this.articleTypes = response;
            resolve();
          },
        )
      }
    )
  }
  
  private loadLoginState() {
    this.authService.loginState$.subscribe((state) => {
      this.isLoggedIn = state;
    });
  }

  private async loadArticleDetails(): Promise<void> {
    return new Promise((resolve) => {
      this.articleService.getArticleDetails(this.articleID).subscribe(response => {
        this.article = response;
        this.editedArticle = { ...response };
        resolve();
      });
    });
  }

  enableEditMode(): void {
    this.isEditMode = true;
    this.editedArticle = { ...this.article! };
  }

  cancelEdit(): void {
    this.confirmationService.confirm({
      message: 'Are you sure you want to cancel? All changes will be lost.',
      header: 'Cancel Confirmation',
      icon: 'pi pi-exclamation-triangle',
      acceptIcon: "none",
      rejectIcon: "none",
      rejectButtonStyleClass: "p-button-text",
      accept: () => {
        this.isEditMode = false;
        this.editedArticle = { ...this.article! };
      }
    });
  }

  updateArticle(): void {
    this.confirmationService.confirm({
      message: 'Are you sure you want to save these changes?',
      header: 'Save Confirmation',
      icon: 'pi pi-exclamation-triangle',
      acceptIcon: "none",
      rejectIcon: "none",
      rejectButtonStyleClass: "p-button-text",
      accept: async () => {
        this.shouldSpinnerWork = true;
  
        this.articleService.updateArticle(this.editedArticle).subscribe({
          next: (response) => {
            this.article = response;
            this.isEditMode = false;
            this.messageService.add({ 
              severity: 'success', 
              summary: 'Updated!', 
              detail: 'Article updated successfully!',
              life: 3000 
            });
            this.shouldSpinnerWork = false;
            // Re-enhance code blocks after update
            setTimeout(() => this.enhanceCodeBlocks(), 100);
          },
          error: (error) => {
            console.error('Error updating article', error);
            this.messageService.add({ 
              severity: 'error', 
              summary: 'Error!', 
              detail: 'Failed to update article.',
              life: 3000 
            });
            this.shouldSpinnerWork = false;
          }
        });
      }
    });
  }  

  deleteArticle(): void {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to proceed?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      acceptIcon: "none",
      rejectIcon: "none",
      rejectButtonStyleClass: "p-button-text",
      accept: () => {
        this.articleService.deleteArticle(this.articleID).subscribe({
          next: () => {
            this.messageService.add({ severity: 'success', summary: 'Deleted!', detail: 'The article has been deleted!', life: 3000 });
            this.router.navigate(['/articles']);
          },
          error: (e) => {
            console.error('Error deleting article', e);
            this.messageService.add({ severity: 'error', summary: 'Error!', detail: 'There was an error during deleting the article.', life: 3000 });
          }
        });
      },
    });
  }

  areArticleTypesPopulated(): boolean {
    return this.articleTypes.length > 0;
  }
}