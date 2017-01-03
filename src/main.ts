import * as $ from 'jquery';
import { Grid } from './game/grid'
import { Background } from './game/background';

$(function(){

    let grid: Grid,
        background: Background,
        container: HTMLDivElement;

    container = <HTMLDivElement> $('<div/>').appendTo('body')[0];

    grid = new Grid(10, 10, 10, 10);
    background = new Background(grid);
    background.createCanvas(container);

});
