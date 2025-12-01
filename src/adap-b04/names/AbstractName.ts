import { DEFAULT_DELIMITER } from "../common/Printable";
import { Name } from "./Name";
import { IllegalArgumentException } from "../common/IllegalArgumentException";
import { InvalidStateException } from "../common/InvalidStateException";
import { MethodFailedException } from "../common/MethodFailedException";



export abstract class AbstractName implements Name {

    protected delimiter: string = DEFAULT_DELIMITER;

    constructor(delimiter: string = DEFAULT_DELIMITER) {
        IllegalArgumentException.assertCondition(
            typeof delimiter === "string" && delimiter.length > 0,
            "Delimiter must be a non-empty string."
        );
        this.delimiter = delimiter;

        this.checkInvariant();
    }

    // ------------------------------------------------------------
    // Contract-Hilfsmethoden
    // ------------------------------------------------------------

    protected require(cond: boolean, msg: string = ""): void {
        IllegalArgumentException.assertCondition(cond, msg);
    }

    protected ensure(cond: boolean, msg: string = ""): void {
        MethodFailedException.assertCondition(cond, msg);
    }

    protected invariant(cond: boolean, msg: string = ""): void {
        InvalidStateException.assertCondition(cond, msg);
    }

    protected checkIndex(i: number): void {
        this.require(
            Number.isInteger(i) && i >= 0 && i < this.getNoComponents(),
            "Index out of bounds."
        );
    }

    protected checkComponent(c: string): void {
        this.require(typeof c === "string", "Component must be a string.");
        this.require(!c.includes(this.delimiter), "Component must not contain delimiter.");
    }

    protected checkInvariant(): void {
        this.invariant(this.getNoComponents() >= 0, "Invalid number of components.");
    }

    // ------------------------------------------------------------
    // Öffentliche API – mutation IST erlaubt in B04
    // ------------------------------------------------------------

    public abstract getNoComponents(): number;

    public abstract getComponent(i: number): string;

    public abstract setComponent(i: number, c: string): void;

    public abstract insert(i: number, c: string): void;

    public abstract append(c: string): void;

    public abstract remove(i: number): void;

    public abstract asDataString(): string;

    public abstract clone(): Name;

    // ------------------------------------------------------------
    // Convenience API
    // ------------------------------------------------------------

    public asString(): string {
        return this.asDataString();
    }

    public toString(): string {
        return this.asDataString();
    }

    public isEqual(other: Name): boolean {
        if (other == null) return false;
        return this.asDataString() === other.asDataString();
    }

    public getHashCode(): number {
        return this.asDataString().length;
    }

    public isEmpty(): boolean {
        return this.getNoComponents() === 0;
    }

    public getDelimiterCharacter(): string {
        return this.delimiter;
    }

    /**
     * concat IST IN B04 ERLAUBT zu mutieren.
     */
    public concat(other: Name): void {
        this.require(other !== null, "Other name must not be null.");

        const before = this.getNoComponents();

        for (let i = 0; i < other.getNoComponents(); i++) {
            this.append(other.getComponent(i));
        }

        this.ensure(
            this.getNoComponents() === before + other.getNoComponents(),
            "Postcondition of concat failed."
        );

        this.checkInvariant();
    }
}
