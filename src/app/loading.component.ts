import { Component } from '@angular/core';
import {MdCardModule, MdDialog} from '@angular/material';

@Component({
    //imports: [MdButtonModule],
    selector: 'loadingdialog',
    template: `
      <h1 class="mat-card-title robototext">Processing the image</h1>
      <span class="mat-card-subtitle robototext">This might take a few minutes...</span>
    `
})
export class LoadingDialogComponent {}
