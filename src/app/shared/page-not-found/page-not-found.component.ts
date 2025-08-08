import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
    selector: 'app-page-not-found',
    templateUrl: './page-not-found.component.html',
    styleUrls: ['./page-not-found.component.css'],
    imports: [
        HeaderComponent,
        FooterComponent,
    ]
})
export class PageNotFoundComponent {

}
