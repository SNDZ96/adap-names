import { DEFAULT_DELIMITER } from "../common/Printable";
import { Name } from "./Name";

export abstract class AbstractName implements Name {

    protected readonly delimiter: string = DEFAULT_DELIMITER;

    constructor(delimiter: string = DEFAULT_DELIMITER) {
        this.delimiter = delimiter;
    }

    public abstract clone(): Name;

    public abstract getNoComponents(): number;
    public abstract getComponent(i: number): string;

    public abstract setComponent(i: number, c: string): Name;
    public abstract insert(i: number, c: string): Name;
    public abstract append(c: string): Name;
    public abstract remove(i: number): Name;

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
        if (other == null) return false;
        return this.asDataString() === other.asDataString();
    }

    public getHashCode(): number {
        return this.asDataString().length;
    }

    public concat(other: Name): Name {
        let result: Name = this;
        for (let i = 0; i < other.getNoComponents(); i++) {
            result = result.append(other.getComponent(i));
        }
        return result;
    }
}
