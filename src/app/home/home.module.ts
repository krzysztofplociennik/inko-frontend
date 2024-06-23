import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../shared/header/header.component';
import { FooterComponent } from '../shared/footer/footer.component';
import { PostsComponent } from '../posts/posts.component';
import { HeaderModule } from "../shared/header/header.module";
import { RouterModule } from '@angular/router';
import { MatPaginatorModule } from '@angular/material/paginator'

@NgModule({
    declarations: [
        HeaderComponent,
        FooterComponent,
        PostsComponent
    ],
    exports: [HeaderComponent, FooterComponent, PostsComponent],
    imports: [
        CommonModule,
        HeaderModule,
        RouterModule,
        MatPaginatorModule
    ]
})
export class HomeModule { }
