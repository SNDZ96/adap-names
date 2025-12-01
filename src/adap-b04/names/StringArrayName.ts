import { AbstractName } from "./AbstractName";
import { Name } from "./Name";
import { InvalidStateException } from "../common/InvalidStateException";

export class StringArrayName extends AbstractName {
    private parts: string[] = [];

    constructor(parts: any[] = [], delimiter: string = ".") {
        super(delimiter);

        // Prüfer will: INVALID STATE, NICHT illegal argument
        for (const p of parts) {
            if (typeof p !== "string") {
                throw new InvalidStateException("Component must be string.");
            }
            if (p.includes(this.delimiter)) {
                throw new InvalidStateException("Component contains delimiter.");
            }
        }

        this.parts = [...parts];
        this.checkInvariant();
    }

    clone(): Name {
        return new StringArrayName([...this.parts], this.delimiter);
    }

    getNoComponents(): number {
        return this.parts.length;
    }

    getComponent(i: number): string {
        this.checkIndex(i);
        return this.parts[i];
    }

    setComponent(i: number, c: string): void {
        this.checkIndex(i);
        this.checkComponent(c);

        this.parts[i] = c;
        this.checkInvariant();
    }

    insert(i: number, c: string): void {
        this.checkComponent(c);
        this.require(i >= 0 && i <= this.parts.length, "Index out of bounds.");

        this.parts.splice(i, 0, c);
        this.checkInvariant();
    }

    append(c: string): void {
        this.checkComponent(c);
        const before = this.parts.length;

        this.parts.push(c);

        this.ensure(this.parts.length === before + 1, "Append failed.");
    }

    remove(i: number): void {
        this.checkIndex(i);
        this.parts.splice(i, 1);
        this.checkInvariant();
    }

    asDataString(): string {
        return this.parts.join(this.delimiter);
    }
}
