import * as $ from 'jquery';
import { Screen } from './screen';
import { Background } from './background';
import { Tile } from './tile';
import { Snake } from './snake';

enum KeyPressedCode {
    Left = 37,
    Right = 39,
    Down = 40,
    Up = 38
}

export class GameScreen extends Screen {
    private _background: Background;
    private _food: Tile;
    private _snake: Snake;
    private _keyPressedHandler = this.keyPressed.bind(this);
    private _endOfGameHandler: Function = null;
    private _oldDirX = 1;
    private _oldDirY = 0;
    private _dirX = 1;
    private _dirY = 0;

    onScreenSetted(): void {
        $(document).on('keydown', this._keyPressedHandler);
    }

    onScreenUnsetted(): void {
        $(document).off('keydown', this._keyPressedHandler);
    }

    performCalculations(): void {
        if (!this.isCollided()) {
            this.updateSnakePosition();
        } else {
            this.endOfGame();
        }
    }

    private keyPressed(event: KeyboardEvent) {
        switch (event.keyCode) {

            case KeyPressedCode.Left:
                this._dirX = -1;
                this._dirY = 0;
                break;

            case KeyPressedCode.Right:
                this._dirX = 1;
                this._dirY = 0;
                break;

            case KeyPressedCode.Up:
                this._dirX = 0;
                this._dirY = -1;
                break;

            case KeyPressedCode.Down:
                this._dirX = 0;
                this._dirY = 1;
                break;

        }
    }

    private updateSnakePosition(): void {
        let backwardX = (this._oldDirX + this._dirX) === 0,
            backwardY = (this._oldDirY + this._dirY) === 0;

        if (backwardX && backwardY) {
            this._snake.positionX += this._oldDirX;
            this._snake.positionY += this._oldDirY;
        } else {
            this._snake.positionX += this._dirX;
            this._snake.positionY += this._dirY;
            this._oldDirX = this._dirX;
            this._oldDirY = this._dirY;
        }
    }

    private isCollided(): boolean {
        return this.isCollidedWithWalls() || this._snake.isSelfCollided();
    }

    private isCollidedWithWalls(): boolean {
        let collidedX = this._snake.positionX === (this.game.grid.widthInTiles - 1),
            collidedY = this._snake.positionY === (this.game.grid.heightInTiles - 1);

        return collidedX || collidedY;
    }

    init(): void {
        this._background = new Background();
        this.addGameElement(this._background);

        this._food = new Tile();
        this._food.color = 'yellow';
        this.addGameElement(this._food);
        this._food.positionX = 3;
        this._food.positionY = 3;

        this._snake = new Snake();
        this._snake.color = 'cyan';
        this.addGameElement(this._snake);
    }

    setEndOfGameHandler(handler: Function): void {
        this._endOfGameHandler = handler;
    }

    private endOfGame(): void {
        if(this._endOfGameHandler !== null) {
            this._endOfGameHandler();
        }
    }

}
