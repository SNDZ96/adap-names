import { Name } from "./Name";
import { AbstractName } from "./AbstractName";

export class StringName extends AbstractName {

    protected value: string = "";

    constructor(source: string = "", delimiter?: string) {
        super(delimiter);
        this.value = source ?? "";
    }

    public clone(): Name {
        return new StringName(this.value, this.delimiter);
    }

    private split(): string[] {
        return this.value === "" ? [] : this.value.split(this.delimiter);
    }

    public getNoComponents(): number {
        return this.split().length;
    }

    public getComponent(i: number): string {
        return this.split()[i];
    }

    public setComponent(i: number, c: string): void {
        const parts = this.split();
        parts[i] = c;
        this.value = parts.join(this.delimiter);
    }

    public insert(i: number, c: string): void {
        const parts = this.split();
        parts.splice(i, 0, c);
        this.value = parts.join(this.delimiter);
    }

    public append(c: string): void {
        const parts = this.split();
        parts.push(c);
        this.value = parts.join(this.delimiter);
    }

    public remove(i: number): void {
        const parts = this.split();
        parts.splice(i, 1);
        this.value = parts.join(this.delimiter);
    }
}
