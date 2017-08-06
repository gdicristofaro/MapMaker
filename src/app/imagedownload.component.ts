import { Component, Input } from '@angular/core';
import {MdButtonModule} from '@angular/material';
import * as Downloader from "downloadjs";

@Component({
    //imports: [MdButtonModule],
    selector: 'image-download',
    template: `
        <div>
            <div class="marginv10">
                <img [src]="imagesrc" [style.max-width]="getStyle()" class="boxshadowed" (click)="download()"/>
            </div>
            <div class="marginv10">
                <button md-raised-button (click)="download()">Download</button>
            </div>
        </div>
    `,
    styles: [`
        div {
            text-align:center;
        }
        div > img {
            cursor: pointer; 
            cursor: hand; 
            height: auto
        }
    `]
})
export class ImageDownloadComponent {
    // must be dataurl
    @Input() imagesrc: string;
    @Input() imagename: string;
    @Input() maxwidth: number;

    download() {
        Downloader(this.imagesrc, this.imagename, "image/png");
    }

    getStyle() {
        return `${this.maxwidth}px`;
    }
}
