import { DEFAULT_DELIMITER } from "../common/Printable";
import { Name } from "./Name";
import { IllegalArgumentException } from "../common/IllegalArgumentException";
import { InvalidStateException } from "../common/InvalidStateException";
import { MethodFailedException } from "../common/MethodFailedException";

export abstract class AbstractName implements Name {
    protected delimiter: string = DEFAULT_DELIMITER;

    constructor(delimiter: string = DEFAULT_DELIMITER) {
        if (typeof delimiter !== "string" || delimiter.length === 0) {
            throw new IllegalArgumentException("Delimiter must be non-empty string.");
        }

        this.delimiter = delimiter;

        // ❌ NICHT hier checkInvariant()
        // Die Subklassen rufen checkInvariant() nach ihrer eigenen Initialisierung auf.
    }

    protected require(cond: boolean, msg: string = ""): void {
        if (!cond) throw new IllegalArgumentException(msg);
    }

    protected ensure(cond: boolean, msg: string = ""): void {
        if (!cond) throw new MethodFailedException(msg);
    }

    protected invariant(cond: boolean, msg: string = ""): void {
        if (!cond) throw new InvalidStateException(msg);
    }

    protected checkIndex(i: number): void {
        this.require(
            Number.isInteger(i) && i >= 0 && i < this.getNoComponents(),
            "Index out of bounds."
        );
    }

    protected checkComponent(c: string): void {
        this.require(typeof c === "string", "Component must be string.");
        this.require(!c.includes(this.delimiter), "Component contains delimiter.");
    }

    protected checkInvariant(): void {
        this.invariant(this.getNoComponents() >= 0, "Invalid internal state.");
    }

    abstract clone(): Name;
    abstract getNoComponents(): number;
    abstract getComponent(i: number): string;
    abstract setComponent(i: number, c: string): void;
    abstract insert(i: number, c: string): void;
    abstract append(c: string): void;
    abstract remove(i: number): void;
    abstract asDataString(): string;

    isEmpty(): boolean {
        return this.getNoComponents() === 0;
    }

    isEqual(other: Name): boolean {
        return other != null && this.asDataString() === other.asDataString();
    }

    getDelimiterCharacter(): string {
        return this.delimiter;
    }

    concat(other: Name): void {
        this.require(other != null);
        const old = this.getNoComponents();

        for (let i = 0; i < other.getNoComponents(); i++) {
            this.append(other.getComponent(i));
        }

        this.ensure(
            this.getNoComponents() === old + other.getNoComponents(),
            "Concat failed."
        );
    }

    toString(): string {
        return this.asDataString();
    }
}
