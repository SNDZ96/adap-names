import { AbstractCoordinate } from "./AbstractCoordinate";
import { Coordinate } from "./Coordinate";

export class CartesianCoordinate extends AbstractCoordinate {

    constructor(x: number, y: number) {
        super(x, y);
    }

    public doSetXY(x: number, y: number): Coordinate {
        return new CartesianCoordinate(x, y);
    }

    public clone(): Coordinate {
        return new CartesianCoordinate(this.x, this.y);
    }
}
