import * as $ from 'jquery';
import { Grid } from './game/grid';
import { Game } from './game/game';
import { Background } from './game/background';

$(function(){

    let grid: Grid,
        game: Game,
        background: Background,
        container: HTMLDivElement;

    container = <HTMLDivElement> $('<div/>').appendTo('body')[0];

    grid = new Grid(10, 10, 10, 10);
    game = new Game(grid);
    game.createCanvas(container);
    background = new Background();
    game.addGameElement(background);
    game.update();
});
