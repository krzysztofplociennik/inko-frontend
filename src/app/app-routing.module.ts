import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { PageNotFoundComponent } from './shared/page-not-found/page-not-found.component';
import { ArticlesComponent } from './articles/articles.component';
import { SearchArticlesComponent } from './search-articles/search-articles.component';
import { NewArticleComponent } from './new-article/new-article.component';

const routes: Routes = [
  { path: 'search-articles', component: SearchArticlesComponent },
  { path: 'articles', component: ArticlesComponent },
  { path: 'new-article', component: NewArticleComponent },
  { path: 'about', component: AboutComponent },
  { path: 'home', component: HomeComponent },
  { path: '', redirectTo: '/search-articles', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
