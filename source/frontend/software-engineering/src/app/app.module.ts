import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule, MatFormFieldModule,
          MatInputModule, MatButtonModule,
          MatIconModule, MatListModule, MatGridListModule,
          MatCheckboxModule, MatOptionModule,
          MatSelectModule, MatSliderModule } from '@angular/material';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatGridListModule,
    MatCheckboxModule,
    MatOptionModule,
    MatSelectModule,
    MatSliderModule,
    MatIconModule,

    FormsModule,
    ReactiveFormsModule,

    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
