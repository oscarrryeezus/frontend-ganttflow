import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppComponent } from './app.component';


@NgModule({
  declarations: [

  ],
  imports: [
    BrowserModule,

  ],
  providers: [

    provideClientHydration()
  ],

})
export class AppModule { }
