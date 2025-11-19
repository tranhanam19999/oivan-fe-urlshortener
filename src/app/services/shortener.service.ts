import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { catchError, map, throwError } from 'rxjs';

interface ApiResp {
  // adapt to your API response shape
  success?: boolean;
  short?: string;
  url?: string;
  message?: string;
  [k: string]: any;
}

@Injectable({
  providedIn: 'root',
})
export class ShortenerService {
  private base = environment.apiBase;

  constructor(private http: HttpClient) {}

  encode(url: string) {
    return this.http.post<ApiResp>(`${this.base}/url-shortener/encode`, { url })
      .pipe(
        map(r => r),
        catchError(this._handleError)
      );
  }

  decode(url: string) {
    return this.http.post<ApiResp>(`${this.base}/url-shortener/decode`, { url })
      .pipe(
        map(r => r),
        catchError(this._handleError)
      );
  }

  private _handleError(error: HttpErrorResponse) {
    const msg = error.error?.message || error.message || 'Unknown error';
    return throwError(() => ({ message: msg, status: error.status }));
  }
}
