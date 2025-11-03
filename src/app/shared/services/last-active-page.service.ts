import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LastActivePageService {

  lastUrl: string = '/search-articles';

  constructor() { }

  updateLastActiveUrl(url: string) {
    this.lastUrl = url;
  }

  getLastActiveUrl() {
    return this.lastUrl;
  }
}
