import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ActivatedRoute, RouterLinkActive, RouterOutlet, RouterLink } from '@angular/router';

@Component({
  selector: 'app-header-button',
  templateUrl: './header-button.component.html',
  styleUrls: ['./header-button.component.css']
})
export class HeaderButtonComponent {
  @Input() label: string = 'Button';
  @Input() buttonClass: string = '';
  @Output() onClick: EventEmitter<void> = new EventEmitter<void>();

  handleButtonClick() {
    console.log('Button clicked!');
  }
  
}
