import * as $ from 'jquery';
import { Screen } from './screen';
import { Background } from './background';
import { Tile } from './tile';
import { BetterSnake, Direction } from './betterSnake';

enum KeyPressedCode {
    Left = 37,
    Right = 39,
    Down = 40,
    Up = 38
}

export class GameScreen extends Screen {
    private _background: Background;
    private _food: Tile;
    private _snake: BetterSnake;
    private _keyPressedHandler = this.keyPressed.bind(this);
    private _endOfGameHandler: Function = null;
    private _snakeDirection: Direction = Direction.Right;

    onScreenSetted(): void {
        $(document).on('keydown', this._keyPressedHandler);
    }

    onScreenUnsetted(): void {
        $(document).off('keydown', this._keyPressedHandler);
    }

    private keyPressed(event: KeyboardEvent) {
        switch (event.keyCode) {

            case KeyPressedCode.Left:
                this._snakeDirection = Direction.Left;
                break;

            case KeyPressedCode.Right:
                this._snakeDirection = Direction.Right;
                break;

            case KeyPressedCode.Up:
                this._snakeDirection = Direction.Up;
                break;

            case KeyPressedCode.Down:
                this._snakeDirection = Direction.Down;
                break;

        }
    }

    performCalculations(): boolean {
        if (this.isEatingFood()) {
            this._snake.grow();
            this.changeFoodLocation();
            this.game.incrementFPS();
        }

        return this.updateSnakePosition();
    }

    private changeFoodLocation(): void {
        let newX = Math.floor((Math.random() * this.game.grid.widthInTiles - 1) + 0),
            newY = Math.floor((Math.random() * this.game.grid.heightInTiles - 1) + 0);

        this._food.positionX = newX;
        this._food.positionY = newY;
    }

    private updateSnakePosition(): boolean {
        this._snake.avanceOne(this._snakeDirection);
        if (this.isCollided()) {
            this.endOfGame();
            return false;
        } else {
            return true;
        }
    }

    private isCollided(): boolean {
        return this.isCollidedWithWalls() || this._snake.isSelfCollided();
    }

    private isCollidedWithWalls(): boolean {
        let collidedX = this._snake.positionX === this.game.grid.widthInTiles || this._snake.positionX === -1,
            collidedY = this._snake.positionY === this.game.grid.heightInTiles || this._snake.positionY === -1;

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

        this._snake = new BetterSnake();
        this._snake.createDefaultBody();
        this._snake.setColor('cyan');
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
