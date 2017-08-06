import { Component, Input, OnInit } from '@angular/core';
import {MdButtonModule, MdInputModule} from '@angular/material';

@Component({
    selector: 'image-viewer',
    template: `
        <div
            [style.width]="px(viewPortWidth)"
            [style.height]="px(viewPortHeight)"
            [style.overflow]="'hidden'"
            [style.position]="'relative'"
            class="boxshadowed"
        >
            <img
                (mousedown)="dragStart($event)"
                (mousemove)="drag($event)"
                (mouseup)="dragEnd($event)"
                (mouseout)="dragEnd($event)"
                [src]="imagesrc" 
                [style.position]="'relative'"
                [style.width]="px(imgWidth * zoom)"
                [style.height]="px(imgHeight * zoom)"
                [style.left]="getBounded(_centerX, zoom, imgWidth, viewPortWidth)"
                [style.top]="getBounded(_centerY, zoom, imgHeight, viewPortHeight)"
            />
            <img
                [src]="'assets/target.png'" 
                [style.position]="'absolute'"
                [style.width]="px(100)"
                [style.height]="px(100)"
                [style.left]="px(viewPortWidth / 2 - 50)"
                [style.top]="px(viewPortHeight / 2 - 50)"
                [style.zindex]=9999
                [style.pointer-events]="'none'"
            />
        </div>
        <div class="marginv10">
            <div style="display: inline-block">
                <button md-raised-button (click)="resetzoom()">Set Zoom to 100%</button>
            </div>
            <div style="display: inline-block">
                <button md-raised-button (click)="zoomin()">+</button>
            </div>
            <div style="display: inline-block">
                <button md-raised-button (click)="zoomout()">-</button>
            </div>
        </div>
        <div>
            <div style="display: inline-block">
                <span>Zoom: </span>
            </div>
            <div style="display: inline-block">
                <md-input-container>
                    <input mdInput type="number" #zoomval [value]=zoom (keyup.enter)="onInputEnter(zoomval.value)"/>
                </md-input-container>
            </div>
        </div>
        <div>
            <span>Center Point is at ({{centerX}}, {{centerY}})</span>
        </div>
    `
})
export class ImageViewerComponent implements OnInit {
    // must be dataurl

    @Input() viewPortWidth: number;
    @Input() viewPortHeight: number;
    @Input() imgWidth: number;
    @Input() imgHeight: number;
    @Input() imagesrc: string;
    @Input() coordMult: number;

    _zoom: number = 1;

    // negates the center X
    _centerX: number = 0;
    _centerY: number = 0;

    get centerX(): number { return -1 * this._centerX * this.coordMult; }
    get centerY(): number { return -1 * this._centerY * this.coordMult; }

    ngOnInit() {
        this._centerX = -this.imgWidth / 2;
        this._centerY = -this.imgHeight / 2;
    }

    getBounded(center : number, zoom: number, imageVal : number, viewportVal : number) {
        
        var val = center * zoom + viewportVal / 2;
        //val = Math.max(viewportVal - zoom * imageVal, val);
        //val = Math.min(0, val);
        return `${val}px`;
    }

    get zoom() {
        return this._zoom;
    }

    set zoom(theval:number) {
        if (theval === null || theval === undefined)
            theval = 1;

        this._zoom = theval;
    } 

    px(val: number) {
        return `${val}px`;
    }

    zoomin() {
        this.zoom *= 2;
    }

    zoomout() {
        this.zoom /= 2;
    }

    resetzoom() {
        this.zoom = 1;
    }

    onInputEnter(v) {
        this.zoom = v;
    }


    offsetX : number = 0;
    offsetY : number = 0;
    dragging : boolean = false;

    
    dragStart(event : DragEvent) {
        this.dragging = true;
        var style = window.getComputedStyle(<Element> event.target, null);
        this.offsetX = event.clientX - this._centerX * this.zoom;
        this.offsetY = event.clientY - this._centerY * this.zoom;
        event.preventDefault(); 
        return false;
    } 

    drag(event : DragEvent) {
        if (!this.dragging)
            return true;
        
        this._centerX = (event.clientX - this.offsetX) / this.zoom;
        this._centerY = (event.clientY - this.offsetY) / this.zoom;

        event.preventDefault(); 
        return false; 
    }

    dragEnd(event : DragEvent) {
        this.dragging = false;
        return true;
    }
}