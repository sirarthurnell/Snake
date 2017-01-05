import * as $ from 'jquery';
import { Grid } from './game/grid';
import { Game } from './game/game';
import { GameScreen } from './game/gameScreen';

$(function(){

    let grid: Grid,
        game: Game,
        gameScreen: GameScreen,
        container: HTMLDivElement;

    container = <HTMLDivElement> $('<div/>').appendTo('body')[0];

    grid = new Grid(10, 10, 10, 10);
    game = new Game(grid);
    game.createCanvas(container);

    gameScreen = new GameScreen(game);
    gameScreen.setEndOfGameHandler(game.end.bind(game));
    gameScreen.init(game);
    game.setScreen(gameScreen);

    game.startUpdating();
});
