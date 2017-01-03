import { Game } from './game';
import { Grid } from './grid';
import { GridPosition } from './gridPosition';
import { IGameElement } from './iGameElement';

export class Tile {
    private _tileShape: createjs.Shape = null;
    private _grid: Grid;
    private _game: Game;

    private _positionX: number = 0;
    get positionX(): number {
        return this._positionX;
    }
    set positionX(x: number) {
        this._positionX = x;
    }

    private _positionY: number = 0;
    get positionY(): number {
        return this._positionY;
    }
    set positionY(y: number) {
        this._positionY = y;
    }

    addToGame(game: Game): void {
        this._game = game;
        this._grid = game.grid;
    }

    removeFromGame(stage: createjs.Stage): void {
        if (this._tileShape != null) {
            stage.removeChild(this._tileShape);
            this._tileShape = null;
        }
    }

    update(stage: createjs.Stage): void {
        if (this._tileShape === null) {
            this.draw(stage);
        }

        let gridPosition = this._grid.getPosition(this._positionX, this._positionY);
        console.log(gridPosition);
        this._tileShape.x = gridPosition.pixelPositionX;
        this._tileShape.y = gridPosition.pixelPositionY;
    }

    private draw(stage: createjs.Stage): void {
        let tileShape = new createjs.Shape(),
            g = tileShape.graphics,
            gridPosition = this._grid.getPosition(this._positionX, this._positionY),
            x = gridPosition.pixelPositionX,
            y = gridPosition.pixelPositionY,
            width = this._grid.tileSizeX,
            height = this._grid.tileSizeY;

        g
            .beginFill("yellow")
            .drawRect(0, 0, width, height);

        tileShape.x = x;
        tileShape.y = y;
        
        this._tileShape = tileShape;
        stage.addChild(this._tileShape);

        console.log(this._tileShape);
    }
}