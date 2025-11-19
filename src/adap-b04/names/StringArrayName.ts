import { AbstractName } from "./AbstractName";
import { Name } from "./Name";
import { InvalidStateException } from "../common/InvalidStateException";
import { IllegalArgumentException } from "../common/IllegalArgumentException";
import { MethodFailedException } from "../common/MethodFailedException";

export class StringArrayName extends AbstractName {

    protected components: string[] = [];

    constructor(source: string[], delimiter?: string) {
        super(delimiter);

        for (const p of source) {
            if (typeof p !== "string") {
                throw new InvalidStateException("component is not a string");
            }
            if (p.includes(this.delimiter)) {
                throw new InvalidStateException("component contains delimiter");
            }
        }

        this.components = [...source];
    }

    public clone(): Name {
        return new StringArrayName([...this.components], this.delimiter);
    }

    public asDataString(): string {
        return this.components.join(this.delimiter);
    }

    public getNoComponents(): number {
        return this.components.length;
    }

    public getComponent(i: number): string {
        this.checkIndex(i);
        return this.components[i];
    }

    public setComponent(i: number, c: string): void {
        this.checkComponent(c);
        this.checkIndex(i);
        this.components[i] = c;
    }

    public insert(i: number, c: string): void {
        this.checkComponent(c);
        this.require(i >= 0 && i <= this.components.length, IllegalArgumentException);
        this.components.splice(i, 0, c);
    }

    public append(c: string): void {
        this.checkComponent(c);
        const before = this.getNoComponents();
        this.components.push(c);
        this.ensure(this.getNoComponents() === before + 1, MethodFailedException);
    }

    public remove(i: number): void {
        this.checkIndex(i);
        this.components.splice(i, 1);
    }
}
