import { Component, Input } from '@angular/core';
import {MdButtonModule, MdInputModule, MdCheckboxModule} from '@angular/material';
import * as $ from 'jquery';






/*
        <input id="fileInput" name="file" type="file" (change)="fileChange($event)" style="visibility:none;"/>
        <button md-raised-button (click)="proxyEvent($vent)"> Choose Files </button>
*/




@Component({
    //imports: [MdButtonModule],
    selector: 'image-upload',
    template: `
        <input id="fileInput" type="file" (change)=upload($event) style="display:none;"/>
        <button md-raised-button (click)="proxy($event)">
            <label>Upload Country Image</label>
        </button>
        <img *ngIf="isimg" [src]="imgdataurl" style="max-width: 200px; max-height: 200px; display: block;" class="boxshadowed marginv20" />
        <div *ngIf="isimg">
            <div class="marginv10">
                <span style="display:block;">Original dimensions are {{imgwidth}} x {{imgheight}}</span>
            </div>
            <div class="marginv10">
                <md-checkbox [checked]="constrainProportions" (change)="setProportional($event)">Constrain Proportions</md-checkbox>
            </div>
            <div class="marginv10">
                <span>Press enter to register new width or height value</span>
            </div>
            <div class="marginv10">
                <div style="display: inline-block;">
                    <md-input-container>
                        <input mdInput placeholder="width" type="number" size=10 (keyup)="setWidth($event)" [value]="resizewidth"/>
                    </md-input-container>
                </div>
                <div style="display: inline-block;">
                    <md-input-container>
                        <input mdInput placeholder="height" type="number" size=10 (keyup)="setHeight($event)" [value]="resizeheight"/>
                    </md-input-container>
                </div>
            </div>
        </div>
    `,
    styles: []
})
export class ImageUploadComponent {
    isimg : boolean = false;
    imgdataurl : string;
    imgwidth : number;
    imgheight : number;
    resizewidth : number;
    resizeheight : number;
    constrainProportions: boolean = true;

    setProportional(e) {
        this.constrainProportions = e.checked;
    }

    setWidth(e) {
        this.resizewidth = parseInt(e.target.value, 10);
        if (isNaN(this.resizewidth))
            this.resizewidth = 0;

        if (this.constrainProportions)
            this.resizeheight = Math.round(this.resizewidth * this.imgheight / this.imgwidth); 
    }

    setHeight(e) {
        this.resizeheight = parseInt(e.target.value, 10);
        if (isNaN(this.resizewidth))
            this.resizewidth = 0;

        if (this.constrainProportions)
            this.resizewidth = Math.round(this.resizeheight * this.imgwidth / this.imgheight);
    }


    proxy(event) {
        $("#fileInput").click();
    }

    upload(event) {
        var file = event.target.files[0];
        var reader  = new FileReader();

        reader.addEventListener(
            "load", 
            () => { 
                var imageload = new Image(); 

                imageload.onload = () => {

                    this.imgwidth = this.resizewidth = imageload.width;
                    this.imgheight = this.resizeheight = imageload.height;
                };

                this.imgdataurl = reader.result; 
                this.isimg = true; 
                imageload.src = this.imgdataurl;
            },
            false);

        if (file) {
            reader.readAsDataURL(file);
        }
    }
}