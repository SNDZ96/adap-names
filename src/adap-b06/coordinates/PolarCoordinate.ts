import { AbstractCoordinate } from "./AbstractCoordinate";
import { Coordinate } from "./Coordinate";

export class PolarCoordinate extends AbstractCoordinate {

    constructor(r: number, phi: number) {
        super(r * Math.cos(phi), r * Math.sin(phi));
    }

    public doSetXY(x: number, y: number): Coordinate {
        return new PolarCoordinate(
            Math.sqrt(x * x + y * y),
            Math.atan2(y, x)
        );
    }

    public clone(): Coordinate {
        return new PolarCoordinate(this.getR(), this.getPhi());
    }
}
