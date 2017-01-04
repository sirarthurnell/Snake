import * as $ from 'jquery';
import { Grid } from './game/grid';
import { Game } from './game/game';
import { GameScreen } from './game/gameScreen';
import { Background } from './game/background';
import { Tile } from './game/tile';
import { Snake } from './game/snake';

$(function(){

    let grid: Grid,
        game: Game,
        gameScreen: GameScreen,
        background: Background,
        tile: Tile,
        snake: Snake,
        container: HTMLDivElement;

    container = <HTMLDivElement> $('<div/>').appendTo('body')[0];

    grid = new Grid(10, 10, 10, 10);

    game = new Game(grid);
    game.createCanvas(container);

    gameScreen = new GameScreen();
    game.setScreen(gameScreen);

    background = new Background();
    gameScreen.addGameElement(background);

    tile = new Tile();
    tile.color = 'yellow';
    gameScreen.addGameElement(tile);
    tile.positionX = 3;
    tile.positionY = 3;

    snake = new Snake();
    snake.color = 'cyan';
    gameScreen.addGameElement(snake);

    game.update();
});
