import { HttpInterceptorFn, HttpRequest, HttpHandlerFn, HttpEvent } from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable, finalize } from 'rxjs';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class LoadingService {
  public loading$ = new BehaviorSubject<boolean>(false);
  private count = 0;

  start() {
    this.count++;
    this.loading$.next(true);
  }

  stop() {
    this.count = Math.max(0, this.count - 1);
    if (this.count === 0) this.loading$.next(false);
  }
}

export const loadingInterceptor: HttpInterceptorFn =
  (req: HttpRequest<any>, next: HttpHandlerFn): Observable<HttpEvent<any>> => {
    const loader = inject(LoadingService);
    loader.start();

    return next(req).pipe(
      finalize(() => loader.stop())
    );
  };
