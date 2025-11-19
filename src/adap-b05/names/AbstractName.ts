import { DEFAULT_DELIMITER } from "../common/Printable";
import { Name } from "./Name";

export abstract class AbstractName implements Name {

    protected delimiter: string = DEFAULT_DELIMITER;

    constructor(delimiter: string = DEFAULT_DELIMITER) {
        this.delimiter = delimiter;
    }

    public abstract clone(): Name;

    public abstract getNoComponents(): number;
    public abstract getComponent(i: number): string;
    public abstract setComponent(i: number, c: string): void;
    public abstract insert(i: number, c: string): void;
    public abstract append(c: string): void;
    public abstract remove(i: number): void;

    public isEmpty(): boolean {
        return this.getNoComponents() === 0;
    }

    public getDelimiterCharacter(): string {
        return this.delimiter;
    }

    public asString(delimiter: string = this.delimiter): string {
        const parts: string[] = [];
        for (let i = 0; i < this.getNoComponents(); i++) {
            parts.push(this.getComponent(i));
        }
        return parts.join(delimiter);
    }

    public asDataString(): string {
        return this.asString(this.delimiter);
    }

    public toString(): string {
        return this.asDataString();
    }

    public isEqual(other: Name): boolean {
        return this.asDataString() === other.asDataString();
    }

    public getHashCode(): number {
        return this.asDataString().length;
    }

    public concat(other: Name): void {
        for (let i = 0; i < other.getNoComponents(); i++) {
            this.append(other.getComponent(i));
        }
    }
}
