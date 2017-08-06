import { Component } from '@angular/core';

@Component({
    //imports: [MdButtonModule],
    selector: 'loadingdialog',
    template: `
      <h1 class="mat-card-title robototext">Error!</h1>
      <span class="mat-card-subtitle robototext">Please provide a country image before processing</span>
    `
})
export class ErrorDialogComponent {}
