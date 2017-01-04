import { Screen } from './screen';
import { Background } from './background';
import { Tile } from './tile';
import { Snake } from './snake';

export class GameScreen extends Screen {
    private _background: Background;
    private _food: Tile;
    private _snake: Snake;

    createScreen(): void {
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
