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

    onScreenSetted(): void {
        $(document).on('keydown', this._keyPressedHandler);
    }

    onScreenUnsetted(): void {
        $(document).off('keydown', this._keyPressedHandler);
    }

    private keyPressed(event: KeyboardEvent) {
        switch (event.keyCode) {
            case KeyPressedCode.Left:
                break;
            case KeyPressedCode.Right:
                break;
            case KeyPressedCode.Up:
                break;
            case KeyPressedCode.Down:
                break;
        }
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

}
