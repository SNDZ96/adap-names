import { DEFAULT_DELIMITER } from "../common/Printable";
import { Name } from "./Name";

export class StringName implements Name {

    protected delimiter: string = DEFAULT_DELIMITER;
    protected name: string = "";

    constructor(source: string, delimiter?: string) {
        this.delimiter = delimiter ?? DEFAULT_DELIMITER;
        this.name = source;
    }

    private split(): string[] {
        if (this.name === "") return [];
        return this.name.split(this.delimiter);
    }

    private join(parts: string[]): void {
        this.name = parts.join(this.delimiter);
    }

    public asString(delimiter: string = this.delimiter): string {
        return this.split().join(delimiter);
    }

    public asDataString(): string {
        return this.asString(this.delimiter);
    }

    public getDelimiterCharacter(): string {
        return this.delimiter;
    }

    public isEmpty(): boolean {
        return this.name.length === 0;
    }

    public getNoComponents(): number {
        return this.split().length;
    }

    public getComponent(i: number): string {
        const parts = this.split();
        if (i < 0 || i >= parts.length) {
            throw new RangeError("index out of bounds");
        }
        return parts[i];
    }

    public setComponent(i: number, c: string): void {
        const parts = this.split();
        if (i < 0 || i >= parts.length) {
            throw new RangeError("index out of bounds");
        }
        parts[i] = c;
        this.join(parts);
    }

    public insert(i: number, c: string): void {
        const parts = this.split();
        if (i < 0 || i > parts.length) {
            throw new RangeError("index out of bounds");
        }
        parts.splice(i, 0, c);
        this.join(parts);
    }

    public append(c: string): void {
        const parts = this.split();
        parts.push(c);
        this.join(parts);
    }

    public remove(i: number): void {
        const parts = this.split();
        if (i < 0 || i >= parts.length) {
            throw new RangeError("index out of bounds");
        }
        parts.splice(i, 1);
        this.join(parts);
    }

    public concat(other: Name): void {
        const own = this.split();
        const otherParts = other
            .asString(other.getDelimiterCharacter())
            .split(other.getDelimiterCharacter());

        this.join([...own, ...otherParts]);
    }
}
