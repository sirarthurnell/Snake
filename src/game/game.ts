import * as $ from 'jquery';
import { Grid } from './grid';
import { Screen } from './screen';

export class Game {

    private _$canvas: JQuery;
    private _$container: JQuery;
    private _screen: Screen;
    private _updateHandler = this.update.bind(this);
    private _currentFPS = 1;

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
        if (this._screen !== null) {
            this._screen.onScreenUnsetted();
        }

        this._screen = screen;
        this._screen.onScreenSetted();
    }

    incrementFPS(): void {
        this._currentFPS++;
        createjs.Ticker.setFPS(this._currentFPS);
    }

    startUpdating(): void {
        createjs.Ticker.setFPS(this._currentFPS);
        createjs.Ticker.addEventListener('tick', this._updateHandler);
    }

    end(): void {
        createjs.Ticker.removeEventListener('tick', this._updateHandler);
        console.log('Game Over');
    }

    private update(): void {
        this._screen.update();
    }

}
