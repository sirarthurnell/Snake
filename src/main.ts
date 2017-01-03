import * as $ from 'jquery';
import { Grid } from './game/grid';
import { Game } from './game/game';
import { Background } from './game/background';
import { Tile } from './game/tile';

$(function(){

    let grid: Grid,
        game: Game,
        background: Background,
        tile: Tile,
        container: HTMLDivElement;

    container = <HTMLDivElement> $('<div/>').appendTo('body')[0];

    grid = new Grid(10, 10, 10, 10);
    game = new Game(grid);
    game.createCanvas(container);

    background = new Background();
    game.addGameElement(background);
    tile = new Tile();
    game.addGameElement(tile);
    tile.positionX = 3;
    tile.positionY = 3;

    game.update();
});
