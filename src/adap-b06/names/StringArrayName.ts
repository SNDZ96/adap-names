import { AbstractName } from "./AbstractName";
import { Name } from "./Name";

export class StringArrayName extends AbstractName {

    protected readonly components: readonly string[];

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

    public setComponent(i: number, c: string): Name {
        const copy = [...this.components];
        copy[i] = c;
        return new StringArrayName(copy, this.delimiter);
    }

    public insert(i: number, c: string): Name {
        const copy = [...this.components];
        copy.splice(i, 0, c);
        return new StringArrayName(copy, this.delimiter);
    }

    public append(c: string): Name {
        return new StringArrayName([...this.components, c], this.delimiter);
    }

    public remove(i: number): Name {
        const copy = [...this.components];
        copy.splice(i, 1);
        return new StringArrayName(copy, this.delimiter);
    }
}
