import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';

// Entrance animations only hide content once the app is running, so a failed script never hides the page.
document.documentElement.classList.add('js-motion');

bootstrapApplication(App, appConfig).catch((err) => {
  document.documentElement.classList.remove('js-motion');
  console.error(err);
});
