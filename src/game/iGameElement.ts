import { Screen } from './screen';

export interface IGameElement {
    update(stage: createjs.Stage): void;
    addToScreen(screen: Screen): void;
    removeFromScreen(stage: createjs.Stage): void;
}
