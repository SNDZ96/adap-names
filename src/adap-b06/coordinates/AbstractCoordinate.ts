import { Coordinate } from "./Coordinate";

export abstract class AbstractCoordinate implements Coordinate {

    protected readonly x: number;
    protected readonly y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    public getX(): number {
        return this.x;
    }

    public getY(): number {
        return this.y;
    }

    // ----- Immutable Setters -----

    public setX(x: number): Coordinate {
        return this.doSetXY(x, this.y);
    }

    public setY(y: number): Coordinate {
        return this.doSetXY(this.x, y);
    }

    public abstract doSetXY(x: number, y: number): Coordinate;

    // ----- Value Equality -----

    public isEqual(other: Coordinate): boolean {
        return this.x === other.getX() && this.y === other.getY();
    }

    public getHashCode(): number {
        return Math.abs(this.x * 31 + this.y);
    }

    public asString(): string {
        return `(${this.x},${this.y})`;
    }
}
