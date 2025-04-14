import { Injectable } from '@angular/core';
import { getBaseUrl } from '../utils/urlUtils';
import { HttpClient } from '@angular/common/http';
import { SleepUtils } from '../utils/sleepUtils';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class KeepAliveService {

  baseUrl: string;
  private readonly workingHoursStart = 8;
  private readonly workingHoursEnd = 20;

  constructor(
    private http: HttpClient,
  ) {
    this.baseUrl = getBaseUrl();
  }

  async startPinging() {
    while (this.shouldBePinged()) {
      try {
        const response = await lastValueFrom(this.callBackend());
        console.log(response);
      } catch (error) {
        console.error('Error while trying to keep alive the backend:', error);
      }
      await SleepUtils.sleepInMinutes(14);
    }
  }

  shouldBePinged(): boolean {
    const current = new Date();
    const isWorkingHours = current.getHours() > this.workingHoursStart && current.getHours() < this.workingHoursEnd;
    return isWorkingHours;
  }

  private callBackend() {
    const url = this.baseUrl + '/keep-alive';
    return this.http.get(
      url,
      {
        responseType: 'text' as const
      }
    );
  }
}