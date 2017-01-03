import { Game } from './game';

export interface IGameElement {
    update(stage: createjs.Stage): void;
    addToGame(game: Game): void;
    removeFromGame(stage: createjs.Stage): void;
}
