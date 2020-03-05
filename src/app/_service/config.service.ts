import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  constructor() {
    console.log('config', window['__env']);
  }

  public getUrlApi() {
    return window['__env']['URL_API'] || window.location.origin;
  }

  public getAppTimout() {
    return window['__env']['APPLICATION_TIMEOUT'] || 3600;
  }

  public getVersion() {
    return window['__env']['VERSION_SUIPI'] || '7.0.3';
  }
}
