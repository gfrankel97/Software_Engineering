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
          MatSelectModule, MatSliderModule,
          MatDialogModule } from '@angular/material';

import { RecipeDialogComponent } from './components/recipe-dialog/recipe-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    RecipeDialogComponent
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
    MatDialogModule,

    FormsModule, 
    ReactiveFormsModule,

    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  entryComponents: [
    RecipeDialogComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
