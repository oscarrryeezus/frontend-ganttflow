import { ApplicationConfig } from '@angular/core';
import { routes } from './app-routing.module'; // Update this line
import { provideRouter } from '@angular/router';
import { provideClientHydration } from '@angular/platform-browser';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideClientHydration()]
};
