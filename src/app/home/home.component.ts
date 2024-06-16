import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {

    home: string|any[]|null|undefined = 'home';
    about: string|any[]|null|undefined = 'about';

}

