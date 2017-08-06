import { Component, ViewChild, ElementRef } from '@angular/core';
import { NgIf } from '@angular/common';
import MapMaker from './MapMaker';
import {ImageDownloadComponent} from './imagedownload.component';
import {ImageViewerComponent} from './imageviewer.component';
import {ImageUploadComponent} from './imageupload.component';
import {LoadingDialogComponent} from './loading.component';
import {ErrorDialogComponent} from './error.component';
import {MdCardModule, MdInputModule} from '@angular/material';
import {MdDialog} from '@angular/material';

@Component({
  selector: 'app-root',
  template: `
    <h1 style="font-family: AdLib;">Map Creator</h1>
    <md-card class="marginv10">
      <md-card-title>1) Upload Map of Country</md-card-title>
      <md-card-subtitle>A good place to look would be at the <a href="http://www.lib.utexas.edu/maps/">University of Texas.</a></md-card-subtitle>
      <md-card-content>
        <image-upload #imageupload></image-upload>
      </md-card-content>
    </md-card>

    <md-card class="marginv10">
      <md-card-title>2) Title for Country</md-card-title>
      <md-card-subtitle>This will be the name of the country underneath the map of the planet.</md-card-subtitle>
      <md-card-content>
        <md-input-container>
            <input mdInput #countryinput type="text" placeholder="Enter Country Name Here" size="30"/>
        </md-input-container>
      </md-card-content>
    </md-card>

    <md-card class="marginv10">
      <md-card-title>3) Place the Target</md-card-title>
      <md-card-subtitle>Place the center of target in the center of the country</md-card-subtitle>
      <md-card-content>
        <image-viewer 
          #imageviewer
          imagesrc="{{imgsrc}}" 
          coordMult=10
          imgWidth=960 
          imgHeight=600 
          viewPortWidth=600 
          viewPortHeight=400>
        </image-viewer>
      </md-card-content>
    </md-card>

    <md-card class="marginv10">
      <md-card-title>4) Press Button and Create Images</md-card-title>
      <md-card-subtitle>When you are done with the previous 3 steps, press this button to process</md-card-subtitle>
      <md-card-content>
        <button md-raised-button (click)="process()">Process</button>
      </md-card-content>
    </md-card>

    <md-card class="marginv10" *ngIf="imgsloaded">
      <md-card-title>5) Download Images</md-card-title>
      <md-card-subtitle>Press the buttons to download the images</md-card-subtitle>
      <md-card-content>
        <div class="marginv20"><image-download imagesrc="{{img1}}" imagename="{{downloadname + '1.png'}}" maxwidth=500></image-download></div>
        <div class="marginv20"><image-download imagesrc="{{img2}}" imagename="{{downloadname + '2.png'}}" maxwidth=500></image-download></div>
        <div class="marginv20"><image-download imagesrc="{{img3}}" imagename="{{downloadname + '3.png'}}" maxwidth=500></image-download></div>
        <div class="marginv20"><image-download imagesrc="{{img4}}" imagename="{{downloadname + '4.png'}}" maxwidth=500></image-download></div>
      </md-card-content>
    </md-card>
  `
})
export class AppComponent {
  static readonly MAP_LOC = "assets/map.png";
  img1 = "";
  img2 = "";
  img3 = "";
  img4 = "";
  downloadname = "";
  imgsloaded = false;

  imgsrc = "assets/map.png";
  imgname="the map";
  showdownload = false;

  @ViewChild('imageviewer') imgView:ImageViewerComponent;
  @ViewChild('imageupload') imgUpload:ImageUploadComponent;
  @ViewChild('countryinput') countryinput: ElementRef;


  constructor(public dialog: MdDialog) {}

  process() {
    var isCountry = this.imgUpload.isimg;

    if (!isCountry) {
        this.dialog.open(ErrorDialogComponent);
        return;
    }

    var img = this.imgUpload.imgdataurl;
    var text = this.countryinput.nativeElement.value;
    var targetX = this.imgView.centerX;
    var targetY = this.imgView.centerY;
    var countrywidth = this.imgUpload.resizewidth;
    var countryheight = this.imgUpload.resizeheight;

    var createImage = () => {
      setTimeout(() => {
        AppComponent.createImages(img, text, countrywidth, countryheight, targetX, targetY, (imgs) => {
          this.downloadname = text;
          this.img1 = imgs[0].toDataURL();
          this.img2 = imgs[1].toDataURL();
          this.img3 = imgs[2].toDataURL();
          this.img4 = imgs[3].toDataURL();
          this.imgsloaded = true;
          this.dialog.closeAll();
          // clear out observers
          (<any> this.dialog.afterOpen).source.observers = [];
        });
      },
      500);
    };

    this.dialog.afterOpen.subscribe(createImage);
    
    this.dialog.open(LoadingDialogComponent, {
      disableClose: true
    });
  }


  static createImages(countryurl: string, countryname: string, countrywidth: number, countryheight: number, x: number, y: number, callback) {
    var mapimg = new Image();
    mapimg.onload = function () {
        var countryimg = new Image();
        countryimg.onload = function () {
          var newimg = MapMaker.createImage(countryname, countrywidth, countryheight, x, y, mapimg, countryimg);
          var retimgs = MapMaker.quarterImage(newimg);
          callback(retimgs);
        }
        countryimg.src = countryurl;
    }
    mapimg.src = AppComponent.MAP_LOC;
  }
}
