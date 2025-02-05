import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';  // ✅ Import Routes from '@angular/router'
import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';  // ✅ Import routes correctly
import { provideHttpClient} from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

bootstrapApplication(AppComponent, {
  providers: [provideRouter(routes),provideHttpClient(), provideAnimationsAsync()]  // ✅ Use routes correctly
});