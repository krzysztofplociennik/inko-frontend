import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostsComponent } from '../posts/posts.component';
import { HeaderModule } from "../shared/header/header.module";
import { RouterModule } from '@angular/router';

@NgModule({
    declarations: [
        PostsComponent
    ],
    exports: [
        PostsComponent
    ],
    imports: [
        CommonModule,
        HeaderModule,
        RouterModule,
    ]
})
export class HomeModule { }
