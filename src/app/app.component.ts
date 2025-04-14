import { Component } from '@angular/core';
import { KeepAliveService } from './shared/services/keep-alive.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent { 

  constructor(
    private keepAliveService: KeepAliveService
  ) {
    this.keepAliveService.startKeepAlive();
  }
}
