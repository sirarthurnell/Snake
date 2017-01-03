import * as $ from 'jquery';
import { Grid } from './grid';

export class Background {

    private $canvas: JQuery;
    private $container: JQuery;
    grid: Grid;

    constructor(grid: Grid) {
        this.grid = grid;
    }

    public createCanvas(container: HTMLDivElement) {
        this.$container = $(container);
        this.$canvas = $(`<canvas width="${this.grid.widthInPixels}" height="${this.grid.heightInPixels}" />`);
        this.$canvas
            .css('background-color', 'green')
            .appendTo($(container));
    }

    public drawGrid(): void {

    }

}
