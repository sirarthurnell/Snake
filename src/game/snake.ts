import { Screen } from './screen';
import { IGameElement } from './iGameElement';
import { Tile } from './tile';

export class Snake implements IGameElement {
    private readonly defaultBodyLength: number = 3;
    private _screen: Screen;
    private _body: Tile[] = null;
    private _recentlyEated: Tile[] = [];

    color = 'yellow';
    positionX: number = this.defaultBodyLength;
    positionY: number = 1;

    addToScreen(screen: Screen): void {
        this._screen = screen;
    }

    removeFromScreen(stage: createjs.Stage): void {
        if (this._body != null) {
            this.removeBody(stage);
        }
    }

    private removeBody(stage: createjs.Stage): void {
        for (let i = this._body.length - 1; i > -1; i--) {
            let tile = this._body[i];
            tile.removeFromScreen(stage);
        }
    }

    isSelfCollided(): boolean {
        if (this._body !== null) {

            let head = this.getHead();
            for (let i = this._body.length - 2; i > -1; i--) {

                let partOfBody = this._body[i],
                    sameX = head.positionX === partOfBody.positionX,
                    sameY = head.positionY === partOfBody.positionY;

                if (sameX && sameY) {
                    return true;
                }

            }

        }

        return false;
    }

    update(stage: createjs.Stage): void {
        if (this._body === null) {
            this.createDefaultBody(stage);
        }

        this.updateBodyPosition();
        this.updateBodyColor();
        this._body.forEach(tile => tile.update(stage));
    }

    private updateBodyColor(): void {
        this._body.forEach(tile => tile.color = this.color);
    }

    private updateBodyPosition(): void {
        let head = this.getHead(),
            lastX = 0,
            lastY = 0,
            newX = this.positionX,
            newY = this.positionY,
            currentTile: Tile = null;

        for (let i = this._body.length - 1; i > -1; i--) {
            currentTile = this._body[i];

            lastX = currentTile.positionX;
            lastY = currentTile.positionY;

            currentTile.positionX = newX;
            currentTile.positionY = newY;

            newX = lastX;
            newY = lastY;
        }
    }

    private getHead(): Tile {
        return this._body[this._body.length - 1];
    }

    private createDefaultBody(stage: createjs.Stage): void {
        this._body = [];

        for (let i = 1; i <= this.defaultBodyLength; i++) {
            let newTile = new Tile();
            this._screen.addGameElement(newTile);
            newTile.positionX = i;
            newTile.positionY = this.positionY;
            newTile.color = this.color;
            this._body.push(newTile);
        }
    }

    grow(): void {
        let newTail = new Tile(),
            oldTail = this._body[0];

        newTail.positionX = oldTail.positionX;
        newTail.positionY = oldTail.positionY;
        newTail.color = this.color;

        this._screen.addGameElement(newTail);
        this._body.unshift(newTail);
    }

}
