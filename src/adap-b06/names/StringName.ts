import { AbstractName } from "./AbstractName";
import { Name } from "./Name";

export class StringName extends AbstractName {

    protected readonly value: string;

    constructor(source: string = "", delimiter?: string) {
        super(delimiter);
        this.value = source;
    }

    public clone(): Name {
        return new StringName(this.value, this.delimiter);
    }

    public getNoComponents(): number {
        if (this.value === "") return 0;
        return this.value.split(this.delimiter).length;
    }

    public getComponent(i: number): string {
        const parts = this.value === "" ? [] : this.value.split(this.delimiter);
        return parts[i];
    }

    protected fromParts(parts: string[]): Name {
        return new StringName(parts.join(this.delimiter), this.delimiter);
    }

    public setComponent(i: number, c: string): Name {
        const parts = this.value === "" ? [] : this.value.split(this.delimiter);
        parts[i] = c;
        return this.fromParts(parts);
    }

    public insert(i: number, c: string): Name {
        const parts = this.value === "" ? [] : this.value.split(this.delimiter);
        parts.splice(i, 0, c);
        return this.fromParts(parts);
    }

    public append(c: string): Name {
        const parts = this.value === "" ? [] : this.value.split(this.delimiter);
        parts.push(c);
        return this.fromParts(parts);
    }

    public remove(i: number): Name {
        const parts = this.value === "" ? [] : this.value.split(this.delimiter);
        parts.splice(i, 1);
        return this.fromParts(parts);
    }
}
