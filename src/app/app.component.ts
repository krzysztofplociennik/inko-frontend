import { Component, OnInit } from '@angular/core';
import { KeepAliveService } from './shared/services/keep-alive.service';
import { DevelopmentContextUtils } from './shared/utils/developmentContextUtils';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    standalone: false
})

export class AppComponent implements OnInit{ 

  constructor(
    private keepAliveService: KeepAliveService
  ) {}

  async ngOnInit(): Promise<void> {
    if (DevelopmentContextUtils.isDemo()) {
      this.keepAliveService.startPinging();
    }
  }
}
