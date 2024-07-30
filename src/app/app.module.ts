import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AboutComponent } from './about/about.component';
import { PageNotFoundComponent } from './shared/page-not-found/page-not-found.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ArticlesComponent } from './articles/articles.component';
import { SearchArticlesComponent } from './search-articles/search-articles.component';
import { NewArticleComponent } from './new-article/new-article.component';
import { FooterComponent } from './shared/footer/footer.component';
import { HeaderComponent } from './shared/header/header.component';
import { HeaderModule } from './shared/header/header.module';
import { NgxSimpleTextEditorModule } from 'ngx-simple-text-editor';
import { FloatLabelModule } from 'primeng/floatlabel';
import { DropdownModule } from 'primeng/dropdown';
import { EditorModule } from 'primeng/editor';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { ChipsModule } from 'primeng/chips';
import { ResultItemComponent } from "./search-articles/search-result-item/search-result-item.component";
import { CardModule } from 'primeng/card';
import { ArticleDetailsComponent } from './articles/article-details/article-details.component';

@NgModule({
    declarations: [
        AppComponent,
        AboutComponent,
        PageNotFoundComponent,
        ArticlesComponent,
        SearchArticlesComponent,
        NewArticleComponent,
        HeaderComponent,
        FooterComponent,
        ResultItemComponent,
        ArticleDetailsComponent,
    ],
    exports: [
        HeaderComponent, 
        FooterComponent
    ],
    providers: [],
    bootstrap: [AppComponent],
    imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    HeaderModule,
    NgxSimpleTextEditorModule,
    FloatLabelModule,
    DropdownModule,
    EditorModule,
    InputTextModule,
    ButtonModule,
    ChipsModule,
    CardModule,
]
})
export class AppModule { }
