import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ShortenerService } from './services/shortener.service';
import { urlValidator } from './validators/url.validators';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Clipboard } from '@angular/cdk/clipboard';
import { LoadingService } from './interceptors/loading.interceptor';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,

    MatTabsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatIconModule,
    MatToolbarModule,
    MatCardModule,
    MatTabsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatProgressBarModule,
    MatIconModule,
    MatSnackBarModule,
    MatDividerModule,
  ],
  templateUrl: './app.html',
  styleUrls: ['./app.scss'],
})
export class App {
  private svc = inject(ShortenerService);
  private snackbar = inject(MatSnackBar);
  private clipboard = inject(Clipboard);
  loadingSvc = inject(LoadingService);

  encodeForm = new FormGroup({
    url: new FormControl('', { nonNullable: true, validators: [urlValidator] })
  });

  decodeForm = new FormGroup({
    url: new FormControl('', { nonNullable: true, validators: [urlValidator] })
  });

  encodeResult: string | null = null;
  decodeResult: string | null = null;

  constructor() {}

  onEncode() {
    if (this.encodeForm.invalid) {
      this.snackbar.open('Please enter a valid URL to encode', 'OK', { duration: 3000 });
      return;
    }
    const url = this.encodeForm.value.url!.trim();
    this.svc.encode(url).subscribe({
      next: (res: any) => {
        this.encodeResult = res.url || res.data?.url || JSON.stringify(res.data.url);
        this.snackbar.open('Encoded successfully', 'OK', { duration: 2000 });
      },
      error: (err: any) => {
        this.snackbar.open(`Encode failed: ${err?.message || err}`, 'OK', { duration: 4000 });
      }
    });
  }

  onDecode() {
    if (this.decodeForm.invalid) {
      this.snackbar.open('Please enter a valid short URL to decode', 'OK', { duration: 3000 });
      return;
    }
    const url = this.decodeForm.value.url!.trim();
    this.svc.decode(url).subscribe({
      next: (res: any) => {
        this.decodeResult = res.url || res.data?.url || JSON.stringify(res);
        this.snackbar.open('Decoded successfully', 'OK', { duration: 2000 });
      },
      error: (err: any) => {
        this.snackbar.open(`Decode failed: ${err?.message || err}`, 'OK', { duration: 4000 });
      }
    });
  }

  copy(text?: string) {
    if (!text) return;
    this.clipboard.copy(text);
    this.snackbar.open('Copied to clipboard', '', { duration: 1200 });
  }
}
