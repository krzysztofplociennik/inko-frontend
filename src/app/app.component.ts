import { Component, OnInit } from '@angular/core';
import { KeepAliveService } from './shared/services/keep-alive.service';
import { DevelopmentContextUtils } from './shared/utils/developmentContextUtils';
import { RouterOutlet } from '@angular/router';
import { ToastModule } from 'primeng/toast';
import { HttpClient } from '@angular/common/http';
import { MessageService } from 'primeng/api';
import { AuthInterceptor } from './shared/auth/auth.interceptor';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [
    RouterOutlet,
    ToastModule,
  ],
  providers: [
    MessageService,
    AuthInterceptor,
    HttpClient,
  ],
  standalone: true,
})

export class AppComponent implements OnInit {

  constructor(
    private keepAliveService: KeepAliveService
  ) { }

  async ngOnInit(): Promise<void> {
    if (DevelopmentContextUtils.isDemo()) {
      this.keepAliveService.startPinging();
    }
  }
}
