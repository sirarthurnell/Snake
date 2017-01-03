import { Game } from './game';
import { Grid } from './grid';
import { IGameElement } from './iGameElement';

export class Background implements IGameElement {

    private _gridShape: createjs.Shape;
    private _grid: Grid;
    private _game: Game;

    addToGame(game: Game): void {
        this._game = game;
        this._grid = game.grid;
    }

    removeFromGame(stage: createjs.Stage): void {
        if (this._gridShape != null) {
            stage.removeChild(this._gridShape);
        }
    }

    update(stage: createjs.Stage): void {
        this.drawGrid(stage);
    }

    drawGrid(stage: createjs.Stage): void {
        if (this._gridShape != null) {

            return;

        } else {

            let gridShape = new createjs.Shape(),
                g = gridShape.graphics,
                i = 0;

            g
                .moveTo(0, 0)
                .setStrokeStyle(1)
                .beginStroke('white');

            for (i = 0; i < this._grid.heightInTiles; i++) {
                let rowCoordinate = i * this._grid.tileSizeY;
                g
                    .moveTo(0, rowCoordinate)
                    .lineTo(this._grid.widthInPixels, rowCoordinate);
            }

            for (i = 0; i < this._grid.widthInTiles; i++) {
                let columnCoordinate = i * this._grid.tileSizeX;
                g
                    .moveTo(columnCoordinate, 0)
                    .lineTo(columnCoordinate, this._grid.heightInPixels);
            }

            g.endStroke();
            this._gridShape = gridShape;
            stage.addChild(this._gridShape);

        }
    }

}
