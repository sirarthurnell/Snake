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

    update(stage: createjs.Stage): void {
        if (this._body === null) {
            this.createDefaultBody(stage);
        }

        this.updateBodyPosition();
        this.updateBodyColor();
        this.updateBodyLength();
        this._body.forEach(tile => tile.update(stage));
    }

    private updateBodyLength(): void {
        if (this._recentlyEated.length > 0) {

            while (this._recentlyEated.length > 0) {
                let recentTile = this._recentlyEated.pop();
                this._body.unshift(recentTile);
            }

        }
    }

    private updateBodyColor(): void {
        this._body.forEach(tile => tile.color = this.color);
    }

    private updateBodyPosition(): void {
        let head = this.getHead(),
            sameX = head.positionX === this.positionX,
            sameY = head.positionY === this.positionY,
            lastX = 0,
            lastY = 0,
            newX = this.positionX,
            newY = this.positionY,
            currentTile: Tile = null;

        if (!(sameX && sameY)) {

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

    eat(tile: Tile): void {
        let newHead = new Tile();

        newHead.positionX = tile.positionX;
        newHead.positionY = tile.positionY;
        newHead.color = this.color;

        this._recentlyEated.push(newHead);
    }

}
