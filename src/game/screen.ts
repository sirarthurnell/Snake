import { Game } from './game';
import { IGameElement } from './iGameElement';

export abstract class Screen {

    private _gameElements: IGameElement[] = [];
    private _stage: createjs.Stage;

    private _game: Game;
    get game(): Game {
        return this._game;
    }

    constructor(game: Game) {
        this._game = game;
        this._stage = new createjs.Stage(this._game.id);
    }

    abstract onScreenSetted(): void;
    abstract onScreenUnsetted(): void;
    abstract performCalculations(): void;

    addGameElement(gameElement: IGameElement) {
        this._gameElements.push(gameElement);
        gameElement.addToScreen(this);
    }

    removeGameElement(gameElement: IGameElement) {
        let index = this._gameElements.indexOf(gameElement);
        if (index > -1) {
            gameElement.removeFromScreen(this._stage);
            this._gameElements.splice(index, 1);
        }
    }

    update(): void {
        this.performCalculations();

        this._gameElements.forEach(element => {
            element.update(this._stage);
        });

        this._stage.update();
    }

}
