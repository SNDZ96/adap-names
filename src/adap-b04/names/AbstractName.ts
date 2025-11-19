import { DEFAULT_DELIMITER } from "../common/Printable";
import { Name } from "./Name";
import { IllegalArgumentException } from "../common/IllegalArgumentException";
import { InvalidStateException } from "../common/InvalidStateException";
import { MethodFailedException } from "../common/MethodFailedException";

export abstract class AbstractName implements Name {

    protected delimiter: string = DEFAULT_DELIMITER;

    constructor(delimiter: string = DEFAULT_DELIMITER) {
        this.delimiter = delimiter;
    }

    // Helper ---------------------

    protected require(cond: boolean, Exc: any) {
        if (!cond) throw new Exc();
    }

    protected ensure(cond: boolean, Exc: any) {
        if (!cond) throw new Exc();
    }

    protected checkIndex(i: number) {
        this.require(i >= 0 && i < this.getNoComponents(), IllegalArgumentException);
    }

    protected checkComponent(c: string) {
        this.require(typeof c === "string", IllegalArgumentException);
        this.require(!c.includes(this.delimiter), IllegalArgumentException);
    }

    // Interface basics --------------

    abstract getNoComponents(): number;
    abstract getComponent(i: number): string;
    abstract setComponent(i: number, c: string): void;
    abstract insert(i: number, c: string): void;
    abstract append(c: string): void;
    abstract remove(i: number): void;

    public abstract clone(): Name;

    public asString(delimiter: string = this.delimiter): string {
        return this.asDataString();
    }

    public abstract asDataString(): string;

    public toString(): string {
        return this.asDataString();
    }

    public isEqual(other: Name): boolean {
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

    public concat(other: Name): void {
        for (let i = 0; i < other.getNoComponents(); i++) {
            this.append(other.getComponent(i));
        }
    }
}
