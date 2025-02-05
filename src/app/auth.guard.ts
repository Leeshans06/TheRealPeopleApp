import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const AuthGuard: CanActivateFn = () => {
  const router = inject(Router);
  let user = null;

  // Check if running in the browser and localStorage is available
  if (typeof window !== 'undefined' && window.localStorage) {
    user = localStorage.getItem('user');
  }

  // If no user is found, redirect to the login page
  if (!user) {
    router.navigate(['/login-persons']); // ✅ Redirect to login page
    return false;
  }

  return true;
};