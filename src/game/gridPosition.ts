export class GridPosition {
    private _gridPositionX: number;
    get gridPositionX(): number {
        return this._gridPositionX;
    }

    private _gridPositionY: number;
    get gridPositionY(): number {
        return this._gridPositionY;
    }

    private _pixelPositionX: number;
    get pixelPositionX(): number {
        return this._pixelPositionX;
    }

    private _pixelPositionY: number;
    get pixelPositionY(): number {
        return this._pixelPositionY;
    }

    constructor(gridPositionX: number, gridPositionY: number, pixelPositionX: number, pixelPostionY: number) {
        this._gridPositionX = gridPositionX;
        this._gridPositionY = gridPositionY;
        this._pixelPositionX = pixelPositionX;
        this._pixelPositionY = pixelPostionY;
    }
}