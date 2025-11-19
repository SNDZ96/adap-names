import { AbstractName } from "./AbstractName";

// Name wird hier als ein String abgelegt.
// Teile werden über split und join bearbeitet.

export class StringName extends AbstractName {

    private value: string = "";

    constructor(source: string = "", delimiter: string = ".") {
        super(delimiter);
        this.value = source;
    }

    private toParts(): string[] {
        return this.value.length === 0 ? [] : this.value.split(this.delimiter);
    }

    private fromParts(parts: string[]): void {
        this.value = parts.join(this.delimiter);
    }

    // Primitive Methoden

    protected doGetNoComponents(): number {
        return this.toParts().length;
    }

    protected doGetComponent(i: number): string {
        return this.toParts()[i];
    }

    protected doSetComponent(i: number, c: string): void {
        const p = this.toParts();
        p[i] = c;
        this.fromParts(p);
    }

    protected doInsert(i: number, c: string): void {
        const p = this.toParts();
        p.splice(i, 0, c);
        this.fromParts(p);
    }

    protected doAppend(c: string): void {
        const p = this.toParts();
        p.push(c);
        this.fromParts(p);
    }

    protected doRemove(i: number): void {
        const p = this.toParts();
        p.splice(i, 1);
        this.fromParts(p);
    }

    public clone(): StringName {
        return new StringName(this.value, this.delimiter);
    }
}
