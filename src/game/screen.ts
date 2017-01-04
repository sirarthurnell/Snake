import { Game } from './game';
import { IGameElement } from './iGameElement';

export class Screen {

    private _gameElements: IGameElement[] = [];
    private _stage: createjs.Stage;

    private _game: Game;
    get game(): Game {
        return this._game;
    }

    screenSetted(game: Game) {
        this._game = game;
        this._stage = new createjs.Stage(this._game.id);
    }

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
        this._gameElements.forEach(element => {
            element.update(this._stage);
        });

        this._stage.update();
    }

}