import { Game } from './game';
import { Grid } from './grid';
import { Screen } from './screen';
import { IGameElement } from './iGameElement';

export class Tile implements IGameElement {
    private _tileShape: createjs.Shape = null;
    private _grid: Grid;
    private _game: Game;
    private _fillCommand: any;

    color = 'yellow';
    positionX: number = 0;
    positionY: number = 0;

    addToScreen(screen: Screen): void {
        this._game = screen.game;
        this._grid = this._game.grid;
    }

    removeFromScreen(stage: createjs.Stage): void {
        if (this._tileShape != null) {
            stage.removeChild(this._tileShape);
            this._tileShape = null;
        }
    }

    update(stage: createjs.Stage): void {
        if (this._tileShape === null) {
            this.draw(stage);
        }

        let gridPosition = this._grid.getPosition(this.positionX, this.positionY);
        this._tileShape.x = gridPosition.pixelPositionX;
        this._tileShape.y = gridPosition.pixelPositionY;
        this._fillCommand.style = this.color;
    }

    private draw(stage: createjs.Stage): void {
        let tileShape = new createjs.Shape(),
            g = tileShape.graphics,
            gridPosition = this._grid.getPosition(this.positionX, this.positionY),
            x = gridPosition.pixelPositionX,
            y = gridPosition.pixelPositionY,
            width = this._grid.tileSizeX,
            height = this._grid.tileSizeY;

        this._fillCommand = g.beginFill(this.color).command;
        g.drawRect(0, 0, width, height);

        tileShape.x = x;
        tileShape.y = y;

        this._tileShape = tileShape;
        stage.addChild(this._tileShape);
    }
}
