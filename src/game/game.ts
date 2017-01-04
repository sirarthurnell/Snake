import * as $ from 'jquery';
import { Grid } from './grid';
import { Screen } from './screen';

export class Game {

    private _$canvas: JQuery;
    private _$container: JQuery;
    private _screen: Screen;

    private _id: string;
    get id(): string {
        return this._id;
    }

    private _grid: Grid;
    get grid(): Grid {
        return this._grid;
    }

    constructor(grid: Grid) {
        this._grid = grid;
        this._id = 'snakeCanvas';
        this._screen = null;
    }

    createCanvas(container: HTMLDivElement) {
        this._$container = $(container);
        this._$canvas = $(`<canvas id="${this.id}" width="${this._grid.widthInPixels}" height="${this._grid.heightInPixels}" />`);
        this._$canvas
            .css('background-color', 'green')
            .appendTo($(container));
    }

    setScreen(screen: Screen) {
        this._screen = screen;
    }

    startUpdating(): void {
        createjs.Ticker.setFPS(1);
        createjs.Ticker.addEventListener('tick', this.update.bind(this));
    }

    private update(): void {
        this._screen.update();
    }

}
