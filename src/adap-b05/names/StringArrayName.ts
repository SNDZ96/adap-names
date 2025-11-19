import { Name } from "./Name";
import { AbstractName } from "./AbstractName";

export class StringArrayName extends AbstractName {

    protected components: string[] = [];

    constructor(source: string[], delimiter?: string) {
        super(delimiter);
        this.components = [...(source ?? [])];
    }

    public clone(): Name {
        return new StringArrayName([...this.components], this.delimiter);
    }

    public getNoComponents(): number {
        return this.components.length;
    }

    public getComponent(i: number): string {
        return this.components[i];
    }

    public setComponent(i: number, c: string): void {
        const copy = [...this.components];
        copy[i] = c;
        this.components = copy;
    }

    public insert(i: number, c: string): void {
        const copy = [...this.components];
        copy.splice(i, 0, c);
        this.components = copy;
    }

    public append(c: string): void {
        this.components = [...this.components, c];
    }

    public remove(i: number): void {
        const copy = [...this.components];
        copy.splice(i, 1);
        this.components = copy;
    }
}
