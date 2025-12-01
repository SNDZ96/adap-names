import { Equality } from "../common/Equality";
import { Printable } from "../common/Printable";
import { Cloneable } from "../common/Cloneable";

export interface Coordinate extends Equality, Printable, Cloneable {

    getX(): number;
    getY(): number;

    setX(x: number): Coordinate;
    setY(y: number): Coordinate;

    // --- Required for Polar Coordinates ---
    getR(): number;
    getPhi(): number;

    setR(r: number): Coordinate;
    setPhi(phi: number): Coordinate;

}
