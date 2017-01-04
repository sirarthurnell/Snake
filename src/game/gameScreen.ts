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

    performCalculations(): boolean {
        if (this.isEatingFood()) {
            this._snake.grow();
            this.changeFoodLocation();
        }

        return this.updateSnakePosition();
    }

    private changeFoodLocation(): void {
        let newX = Math.floor((Math.random() * 9) + 0),
            newY = Math.floor((Math.random() * 9) + 0);

        this._food.positionX = newX;
        this._food.positionY = newY;
    }

    private updateSnakePosition(): boolean {
        let backwardX = (this._oldDirX + this._dirX) === 0,
            backwardY = (this._oldDirY + this._dirY) === 0,
            futureX = this._snake.positionX,
            futureY = this._snake.positionY;

        if (backwardX && backwardY) {
            futureX += this._oldDirX;
            futureY += this._oldDirY;
        } else {
            futureX += this._dirX;
            futureY += this._dirY;
            this._oldDirX = this._dirX;
            this._oldDirY = this._dirY;
        }

        if (this.isCollided(futureX, futureY)) {
            this.endOfGame();
            return false;
        } else {
            this._snake.positionX = futureX;
            this._snake.positionY = futureY;
            return true;
        }
    }

    private isCollided(futureX: number, futureY: number): boolean {
        return this.wouldCollideWithWalls(futureX, futureY) || this._snake.isSelfCollided();
    }

    private wouldCollideWithWalls(futureX: number, futureY: number): boolean {
        let collidedX = futureX === this.game.grid.widthInTiles || futureX === -1,
            collidedY = futureY === this.game.grid.heightInTiles || futureY === -1;

        return collidedX || collidedY;
    }

    private isEatingFood(): boolean {
        let sameX = this._food.positionX === this._snake.positionX,
            sameY = this._food.positionY === this._snake.positionY;

        return sameX && sameY;
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
        if (this._endOfGameHandler !== null) {
            this._endOfGameHandler();
        }
    }

}
