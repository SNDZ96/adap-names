import { AbstractCoordinate } from "./AbstractCoordinate";
import { Coordinate } from "./Coordinate";

export class PolarCoordinate extends AbstractCoordinate {

    private readonly r: number;
    private readonly phi: number;

    constructor(r: number, phi: number) {
        const x = r * Math.cos(phi);
        const y = r * Math.sin(phi);
        super(x, y);

        this.r = r;
        this.phi = phi;
    }

    // ----- Required by B06 tests -----

    public setR(r: number): Coordinate {
        return new PolarCoordinate(r, this.phi);
    }

    public setA(a: number): Coordinate {
        // synonym zu setPhi(a)
        return new PolarCoordinate(this.r, a);
    }

    public setPhi(phi: number): Coordinate {
        return new PolarCoordinate(this.r, phi);
    }

    // ----- Value-type XY conversion -----

    public doSetXY(x: number, y: number): Coordinate {
        const r = Math.sqrt(x * x + y * y);
        const phi = Math.atan2(y, x);
        return new PolarCoordinate(r, phi);
    }
}
