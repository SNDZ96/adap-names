export interface Coordinate {
    getX(): number;
    getY(): number;

    setX(x: number): Coordinate;
    setY(y: number): Coordinate;

    isEqual(other: Coordinate): boolean;
    getHashCode(): number;

    asString(): string;
}
