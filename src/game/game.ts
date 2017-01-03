import * as $ from 'jquery';
import { Grid } from './grid';
import { IGameElement } from './iGameElement';

export class Game {

    private _$canvas: JQuery;
    private _$container: JQuery;
    private _gameElements: IGameElement[];
    private _stage: createjs.Stage;

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
        this._gameElements = [];
    }

    createCanvas(container: HTMLDivElement) {
        this._$container = $(container);
        this._$canvas = $(`<canvas id="${this.id}" width="${this._grid.widthInPixels}" height="${this._grid.heightInPixels}" />`);
        this._$canvas
            .css('background-color', 'green')
            .appendTo($(container));

        this._stage = new createjs.Stage(this._id);
    }

    addGameElement(gameElement: IGameElement) {
        this._gameElements.push(gameElement);
        gameElement.addToGame(this);
    }

    removeGameElement(gameElement: IGameElement) {
        let index = this._gameElements.indexOf(gameElement);
        if (index > -1) {
            gameElement.removeFromGame(this._stage);
            this._gameElements.splice(index, 1);
        }
    }

    update(): void {
        this._gameElements.forEach(element => {
            element.update(this._stage);
        });

        this._stage.update();
    }

}
