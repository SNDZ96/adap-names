import { AbstractName } from "./AbstractName";
import { Name } from "./Name";
import { IllegalArgumentException } from "../common/IllegalArgumentException";
import { InvalidStateException } from "../common/InvalidStateException";
import { MethodFailedException } from "../common/MethodFailedException";

export class StringArrayName extends AbstractName {

    protected components: string[] = [];

    constructor(source: string[], delimiter?: string) {
        super(delimiter);

        // PRECONDITION
        IllegalArgumentException.assertCondition(
            Array.isArray(source),
            "Source must be an array of strings."
        );

        for (const c of source) {
            IllegalArgumentException.assertCondition(
                typeof c === "string",
                "Component must be string."
            );
            IllegalArgumentException.assertCondition(
                !c.includes(this.delimiter),
                "Component must not contain delimiter."
            );
        }

        this.components = [...source];

        // INVARIANT
        this.checkInvariant();
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
        // PRE
        this.checkIndex(i);

        const result = this.components[i];

        // POST
        this.ensure(result === this.components[i], "Postcondition getComponent failed.");

        // INVARIANT
        this.checkInvariant();

        return result;
    }

    public setComponent(i: number, c: string): void {
        // PRE
        this.checkIndex(i);
        this.checkComponent(c);

        this.components[i] = c;

        // POST
        this.ensure(this.components[i] === c, "setComponent failed.");

        // INVARIANT
        this.checkInvariant();
    }

    public insert(i: number, c: string): void {
        // PRE
        this.require(i >= 0 && i <= this.components.length, "Index out of range.");
        this.checkComponent(c);

        const oldCount = this.getNoComponents();

        this.components.splice(i, 0, c);

        // POST
        this.ensure(
            this.getNoComponents() === oldCount + 1,
            "insert failed."
        );

        // INVARIANT
        this.checkInvariant();
    }

    public append(c: string): void {
        // PRE
        this.checkComponent(c);
        const before = this.getNoComponents();

        this.components.push(c);

        // POST
        this.ensure(
            this.getNoComponents() === before + 1,
            "append postcondition failed."
        );

        // INVARIANT
        this.checkInvariant();
    }

    public remove(i: number): void {
        // PRE
        this.checkIndex(i);
        const before = this.getNoComponents();

        this.components.splice(i, 1);

        // POST
        this.ensure(
            this.getNoComponents() === before - 1,
            "remove postcondition failed."
        );

        // INVARIANT
        this.checkInvariant();
    }
}
