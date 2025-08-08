import { Component, ViewEncapsulation } from '@angular/core';
import { ButtonModule } from 'primeng/button';

@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.css'],
    encapsulation: ViewEncapsulation.Emulated,
    imports: [
        ButtonModule
    ]
})
export class FooterComponent {}
