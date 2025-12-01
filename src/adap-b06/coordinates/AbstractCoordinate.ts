import { Coordinate } from "./Coordinate";

export abstract class AbstractCoordinate implements Coordinate {

    protected readonly x: number;
    protected readonly y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    // ------------- Cartesian getters -------------
    public getX(): number {
        return this.x;
    }

    public getY(): number {
        return this.y;
    }

    // ------------- Polar getters -------------
    public getR(): number {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }

    public getPhi(): number {
        return Math.atan2(this.y, this.x);
    }

    // ------------- Immutable setters -------------
    public setX(x: number): Coordinate {
        return this.doSetXY(x, this.y);
    }

    public setY(y: number): Coordinate {
        return this.doSetXY(this.x, y);
    }

    public setR(r: number): Coordinate {
        const phi = this.getPhi();
        return this.doSetXY(r * Math.cos(phi), r * Math.sin(phi));
    }

    public setPhi(phi: number): Coordinate {
        const r = this.getR();
        return this.doSetXY(r * Math.cos(phi), r * Math.sin(phi));
    }

    public abstract doSetXY(x: number, y: number): Coordinate;

    // ------------- Value semantics -------------
    public isEqual(other: Coordinate): boolean {
        return this.x === other.getX() && this.y === other.getY();
    }

    public getHashCode(): number {
        return Math.abs(this.x * 31 + this.y);
    }

    public asString(): string {
        return `(${this.x}, ${this.y})`;
    }

    public abstract clone(): Coordinate;
}
