import { Component } from '@angular/core';
import { ActivatedRoute, RouterLinkActive, RouterOutlet, RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  home: string|any[]|null|undefined = 'home';
  posts: string|any[]|null|undefined = 'posts';
  about: string|any[]|null|undefined = 'about';
}
