import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  home: string|any[]|null|undefined = 'home';
  articles: string|any[]|null|undefined = 'articles';
  about: string|any[]|null|undefined = 'about';
}
