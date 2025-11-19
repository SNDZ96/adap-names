import { AbstractName } from "./AbstractName";
import { Name } from "./Name";
import { MethodFailedException } from "../common/MethodFailedException";
import { IllegalArgumentException } from "../common/IllegalArgumentException";

export class StringName extends AbstractName {

    protected value: string = "";

    constructor(source: string = "", delimiter?: string) {
        super(delimiter);
        this.value = source;
    }

    public clone(): Name {
        return new StringName(this.value, this.delimiter);
    }

    public asDataString(): string {
        return this.value;
    }

    public getNoComponents(): number {
        if (this.value === "") return 0;
        return this.value.split(this.delimiter).length;
    }

    public getComponent(i: number): string {
        this.checkIndex(i);
        return this.value.split(this.delimiter)[i];
    }

    // -------------------------
    // Neue Hilfsmethode (B04)
    // -------------------------
    protected setParts(parts: string[]): void {
        this.value = parts.join(this.delimiter);
    }

    public setComponent(i: number, c: string): void {
        this.checkComponent(c);

        const parts = this.value === "" ? [] : this.value.split(this.delimiter);
        this.checkIndex(i);

        parts[i] = c;
        this.setParts(parts);
    }

    public insert(i: number, c: string): void {
        this.checkComponent(c);

        const parts = this.value === "" ? [] : this.value.split(this.delimiter);
        this.require(i >= 0 && i <= parts.length, IllegalArgumentException);

        parts.splice(i, 0, c);
        this.setParts(parts);
    }

    public append(c: string): void {
        this.checkComponent(c);
        const before = this.getNoComponents();

        const parts = this.value === "" ? [] : this.value.split(this.delimiter);

        parts.push(c);

        // kritischer Punkt: hier wollen wir Sabotage bemerken
        this.setParts(parts);

        this.ensure(this.getNoComponents() === before + 1, MethodFailedException);
    }

    public remove(i: number): void {
        this.checkIndex(i);

        const parts = this.value.split(this.delimiter);
        parts.splice(i, 1);
        this.setParts(parts);
    }
}
