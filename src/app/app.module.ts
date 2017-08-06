import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule }   from '@angular/forms';

import { AppComponent } from './app.component';
import {ImageDownloadComponent} from './imagedownload.component';
import {ImageViewerComponent} from './imageviewer.component';
import {ImageUploadComponent} from './imageupload.component';
import {LoadingDialogComponent} from './loading.component';
import {ErrorDialogComponent} from './error.component';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MdButtonModule, MdInputModule, MdCheckboxModule, MdCardModule, MdProgressSpinnerModule, MdDialogModule} from '@angular/material';

@NgModule({
  declarations: [
    AppComponent,
    ImageDownloadComponent,
    ImageViewerComponent,
    ImageUploadComponent,
    LoadingDialogComponent,
    ErrorDialogComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MdCardModule,
    MdButtonModule,
    MdInputModule,
    MdProgressSpinnerModule,
    MdDialogModule,
    MdCheckboxModule
  ],
  entryComponents: [LoadingDialogComponent, ErrorDialogComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
