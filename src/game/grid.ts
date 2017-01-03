import { GridPosition } from './gridPosition';

export class Grid {

    private _widthInTiles: number;
    get widthInTiles() {
        return this._widthInTiles;
    }

    private _heightInTiles: number;
    get heightInTiles() {
        return this._heightInTiles;
    }

    private _tileSizeX: number;
    get tileSizeX() {
        return this._tileSizeX;
    }

    private _tileSizeY: number;
    get tileSizeY() {
        return this._tileSizeY;
    }

    private _widthInPixels: number;
    get widthInPixels() {
        return this._widthInPixels;
    }

    private _heightInPixels: number;
    get heightInPixels() {
        return this._heightInPixels;
    }

    constructor(tileSizeX: number, tileSizeY: number, widthInTiles: number, heightInTiles: number) {
        this._tileSizeX = tileSizeX;
        this._tileSizeY = tileSizeY;
        this._widthInTiles = widthInTiles;
        this._heightInTiles = heightInTiles;

        this.calculatePixelDimensions();
    }

    private calculatePixelDimensions(): void {
        this._widthInPixels = this._widthInTiles * this._tileSizeX;
        this._heightInPixels = this._heightInTiles * this._tileSizeY;
    }

    getPosition(x: number, y: number): GridPosition {
        let xNotInBounds = x < 0 || this._widthInTiles < x,
            yNotInBounds = y < 0 || this._heightInTiles < y;

        if(xNotInBounds || yNotInBounds) {
            throw new Error("Grid coordinates not inside grid.");
        } else {
            let position: GridPosition;
            position = new GridPosition(x, y, x * this._tileSizeX, y * this._tileSizeY);
            return position;
        }
    }

}
