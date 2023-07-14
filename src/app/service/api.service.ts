import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}
  get(url: string, options?: any): Promise<any> {
    return lastValueFrom(this.http.get(url, options));
  }

  post(url: string, body: any, options?: any): Promise<any> {
    return lastValueFrom(this.http.post(url, body, options));
  }
}
