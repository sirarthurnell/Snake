import { Screen } from './screen';
import { IGameElement } from './iGameElement';
import { Tile } from './tile';

export enum Direction {
    None,
    Left,
    Right,
    Up,
    Down
}

export class BetterSnake implements IGameElement {
    private readonly defaultBodyLength: number = 3;
    private _screen: Screen;
    private _body: Tile[] = null;
    private _color = 'yellow';
    private _currentDirection = Direction.None;

    addToScreen(screen: Screen): void {
        this._screen = screen;
        this._body.forEach((tile) => this._screen.addGameElement(tile));
    }

    removeFromScreen(stage: createjs.Stage): void {
        if (this._body != null) {
            this.removeBody(stage);
        }
    }

    private removeBody(stage: createjs.Stage): void {
        this._body.forEach((tile) => tile.removeFromScreen(stage));
    }

    update(stage: createjs.Stage): void {
        this.updateTiles(stage);
    }

    private updateTiles(stage: createjs.Stage): void {
        this._body.forEach(tile => tile.update(stage));
    }

    setColor(color: string): void {
        this._body.forEach((tile) => tile.color = color);
        this._color = color;
    }

    avanceOne(direction: Direction): void {
        if (!this.checkBackwardDirection(direction)) {
            switch (direction) {
                case Direction.Down:
                    this.updateBodyPosition(this.positionX, this.positionY + 1);
                    break;
                case Direction.Up:
                    this.updateBodyPosition(this.positionX, this.positionY - 1);
                    break;
                case Direction.Left:
                    this.updateBodyPosition(this.positionX - 1, this.positionY);
                    break;
                case Direction.Right:
                    this.updateBodyPosition(this.positionX + 1, this.positionY);
                    break;
            }

            this._currentDirection = direction;
        }
    }

    private checkBackwardDirection(direction: Direction): boolean {
        let backwardX: boolean,
            backwardY: boolean,
            backward: boolean;

        backwardX =
            ((this._currentDirection === Direction.Left) && (direction === Direction.Right)) ||
            ((this._currentDirection === Direction.Right) && (direction === Direction.Left));

        backwardX =
            ((this._currentDirection === Direction.Up) && (direction === Direction.Down)) ||
            ((this._currentDirection === Direction.Down) && (direction === Direction.Up));

        backward = backwardX || backwardY;
        return backward;
    }

    private updateBodyPosition(newX: number, newY: number): void {
        let lastX = 0,
            lastY = 0,
            currentTile: Tile = null;

        for (let i = 0; i < this.getLength(); i++) {
            currentTile = this._body[i];

            lastX = currentTile.positionX;
            lastY = currentTile.positionY;

            currentTile.positionX = newX;
            currentTile.positionY = newY;

            newX = lastX;
            newY = lastY;
        }
    }

    createDefaultBody(): void {
        this._body = [];

        for (let i = this.defaultBodyLength; i > 0; i--) {
            let newTile = new Tile();

            newTile.positionX = i;
            newTile.positionY = 1;
            newTile.color = this._color;
            this._body.push(newTile);
        }
    }

    grow(): void {
        let newLastTile = new Tile(),
            oldLastTile = this.getLastTile();

        newLastTile.positionX = oldLastTile.positionX;
        newLastTile.positionY = oldLastTile.positionY;
        newLastTile.color = this._color;

        this._screen.addGameElement(newLastTile);
        this._body.push(newLastTile);
    }

    isSelfCollided(): boolean {
        if (this.isInitialized()) {
            let head = this.getHead(),
                skipHead = 1;

            for (let i = skipHead; i < this.getLength(); i++) {
                let partOfBody = this._body[i];
                if (partOfBody.isInTheSamePositionOf(head)) {
                    return true;
                }
            }
        }
        return false;
    }

    private isInitialized(): boolean {
        return this._body !== null;
    }

    get positionX(): number {
        return this.getHead().positionX;
    }

    get positionY(): number {
        return this.getHead().positionY;
    }

    private getHead(): Tile {
        return this._body[0];
    }

    private getLength(): number {
        return this._body.length;
    }

    private getLastTile(): Tile {
        return this._body[this.getLastTileIndex()];
    }

    private getLastTileIndex(): number {
        return this._body.length - 1;
    }

}
