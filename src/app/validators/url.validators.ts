import { AbstractControl, ValidationErrors } from '@angular/forms';

export function urlValidator(control: AbstractControl): ValidationErrors | null {
  const val = (control.value ?? '').toString().trim();
  if (!val) {
    return { required: true };
  }

  // Allow: http(s) and also allow schemes-less URLs by adding https if needed?
  try {
    // If user didn't include scheme, try to validate after adding https://
    let parsed;
    try {
      parsed = new URL(val);
    } catch {
      parsed = new URL('https://' + val); // attempt
    }

    if (!['http:', 'https:'].includes(parsed.protocol)) {
      return { invalidScheme: true };
    }

    // Basic host check
    if (!parsed.hostname) {
      return { invalidUrl: true };
    }
    return null;
  } catch (e) {
    return { invalidUrl: true };
  }
}
