import { AbstractName } from "./AbstractName";

// Name wird hier als Array gespeichert.
// Die Arbeit machen die do*-Methoden.

export class StringArrayName extends AbstractName {

    private parts: string[] = [];

    constructor(source: string[] = [], delimiter: string = ".") {
        super(delimiter);
        this.parts = [...source];
    }

    // Primitive Methoden

    protected doGetNoComponents(): number {
        return this.parts.length;
    }

    protected doGetComponent(i: number): string {
        return this.parts[i];
    }

    protected doSetComponent(i: number, c: string): void {
        this.parts[i] = c;
    }

    protected doInsert(i: number, c: string): void {
        this.parts.splice(i, 0, c);
    }

    protected doAppend(c: string): void {
        this.parts.push(c);
    }

    protected doRemove(i: number): void {
        this.parts.splice(i, 1);
    }

    public clone(): StringArrayName {
        return new StringArrayName([...this.parts], this.delimiter);
    }
}
