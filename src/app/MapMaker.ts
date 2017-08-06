export default class MapMaker {
	static readonly TEXT_Y = 5700;
	static readonly CENTERMAP_Y = 2400;
	static readonly FONT_STYLE = '900px AdLib';
	static readonly TEXT_SHADOW_OPACITY = .6;
	static readonly TRIANGLE_OPACITY = .3;
	static readonly SHADOW_OFFSET = 24;

	static getCanv(width : number, height : number) {
		var canv : HTMLCanvasElement = document.createElement('canvas');
		canv.width = width;
		canv.height = height;
		return canv;
	}

	static drawCanv(rootImage: HTMLCanvasElement,
					startX:number, startY:number, width:number, height: number) {

		var canvasDel : HTMLCanvasElement = MapMaker.getCanv(width, height);
		var g : CanvasRenderingContext2D = canvasDel.getContext('2d');
		g.drawImage(rootImage, 
					startX, startY, width, height, 
					0, 0, width, height);

		return canvasDel;
	}


	static quarterImage(rootImage: HTMLCanvasElement) {
		var width = Math.round(rootImage.width / 2);
		var height = Math.round(rootImage.height / 2);

		var upLeft = MapMaker.drawCanv(rootImage,0,0,width,height);
		var upRight = MapMaker.drawCanv(rootImage,width,0,width,height);
		var downLeft = MapMaker.drawCanv(rootImage,0,height,width,height);
		var downRight = MapMaker.drawCanv(rootImage,width,height,width,height);
		return [upLeft,upRight,downLeft,downRight];
	}
	
	static createImage(countryName:string, 
						countryWidth: number, countryHeight:number,
						countryX:number, countryY:number, 
                        mapImg:HTMLImageElement, countryImg : HTMLImageElement) {

        // TODO set size to size of map img and obtain 2d context
        var canvas : HTMLCanvasElement = document.createElement('canvas');
        canvas.width = mapImg.naturalWidth;
        canvas.height = mapImg.naturalHeight;

        var g = canvas.getContext('2d');

        // draw map
        g.drawImage(mapImg, 0, 0);

        //font
        g.font = MapMaker.FONT_STYLE;
        

		//get string info
		var xOffset = ((mapImg.naturalWidth - g.measureText(countryName).width)/ 2);
		var yOffset = MapMaker.TEXT_Y;
		var shadowWidth = MapMaker.SHADOW_OFFSET;
		
		//draw shadow

		var newNum = Math.round(255 * (1 - MapMaker.TEXT_SHADOW_OPACITY));
		g.fillStyle = `rgb(${newNum},${newNum},${newNum})`; 

        g.fillText(countryName, xOffset + shadowWidth, yOffset + shadowWidth);
		
		//draw rest of text
		g.fillStyle = "black";
		g.fillText(countryName, xOffset, yOffset);
		
        //draw triangle
		g.fillStyle = `rgba(0,0,0,${MapMaker.TRIANGLE_OPACITY})`;

		//triangle buffer for triangle
		var buffer = 360;

		var mapWidth = mapImg.naturalWidth;

		//map points
		var mapX = (countryX < mapWidth / 2) ? countryX + buffer + countryWidth : countryX - buffer;
		var mapX2 = (countryX < mapWidth / 2) ? countryX + buffer : countryX - (buffer + countryWidth);
		
		var mapY = (countryY < MapMaker.CENTERMAP_Y) ? countryY + buffer : countryY - (buffer + countryHeight);
		var mapY2 = (countryY < MapMaker.CENTERMAP_Y) ? countryY + buffer + countryHeight : countryY - buffer;

		//triangle points
		var x1 = (Math.abs(countryX - mapX) > Math.abs(countryX - mapX2)) ? mapX : mapX2;
		var y1 = (Math.abs(countryY - mapY) < Math.abs(countryY - mapY2)) ? mapY : mapY2;
		
		var x2 = (Math.abs(countryX - mapX) < Math.abs(countryX - mapX2)) ? mapX : mapX2;
		var y2 = (Math.abs(countryY - mapY) > Math.abs(countryY - mapY2)) ? mapY : mapY2;
        
        g.beginPath();
		g.moveTo(countryX, countryY);
		g.lineTo(x1, y1);
        g.lineTo(x2, y2);
        g.lineTo(countryX, countryY);
        g.closePath();
		g.fill();

		//ensure white background behind image
		g.fillStyle = `rgba(255,255,255,1)`;
		g.fillRect(Math.min(mapX, mapX2), Math.min(mapY, mapY2), Math.abs(mapX - mapX2), Math.abs(mapY - mapY2));
		
		console.log(countryWidth, countryHeight, countryX, countryY, mapX, mapX2, mapY, mapY2);

        //write image
		g.drawImage(countryImg, Math.min(mapX, mapX2), Math.min(mapY, mapY2), countryWidth, countryHeight);
		
		return canvas;
	}
}