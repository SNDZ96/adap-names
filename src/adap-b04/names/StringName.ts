import { AbstractName } from "./AbstractName";
import { Name } from "./Name";
import { IllegalArgumentException } from "../common/IllegalArgumentException";
import { MethodFailedException } from "../common/MethodFailedException";

export class StringName extends AbstractName {

    protected value: string = "";

    constructor(source: string = "", delimiter?: string) {
        super(delimiter);

        // PRECONDITION
        IllegalArgumentException.assertCondition(
            typeof source === "string",
            "Source must be a string."
        );
        IllegalArgumentException.assertCondition(
            !source.includes(this.delimiter + this.delimiter),
            "Source must not contain unmasked delimiter sequences."
        );

        this.value = source;

        // INVARIANT
        this.checkInvariant();
    }

    public clone(): Name {
        return new StringName(this.value, this.delimiter);
    }

    public asDataString(): string {
        return this.value;
    }

    public getNoComponents(): number {
        const result =
            this.value === "" ? 0 : this.value.split(this.delimiter).length;

        // POST
        this.ensure(result >= 0, "getNoComponents returned invalid count.");

        // INVARIANT
        this.checkInvariant();

        return result;
    }

    public getComponent(i: number): string {
        this.checkIndex(i);

        const parts = this.value === "" ? [] : this.value.split(this.delimiter);
        const result = parts[i];

        // POST
        this.ensure(result === parts[i], "getComponent postcondition failed.");

        // INVARIANT
        this.checkInvariant();

        return result;
    }

    // Hilfsmethode
    protected setParts(parts: string[]): void {
        this.value = parts.join(this.delimiter);
    }

    public setComponent(i: number, c: string): void {
        // PRE
        this.checkIndex(i);
        this.checkComponent(c);

        const parts = this.value === "" ? [] : this.value.split(this.delimiter);
        parts[i] = c;

        this.setParts(parts);

        // POST
        this.ensure(this.getComponent(i) === c, "setComponent failed.");

        // INVARIANT
        this.checkInvariant();
    }

    public insert(i: number, c: string): void {
        // PRE
        this.require(i >= 0 && i <= this.getNoComponents(), "Index out of range.");
        this.checkComponent(c);

        const before = this.getNoComponents();

        const parts =
            this.value === "" ? [] : this.value.split(this.delimiter);

        parts.splice(i, 0, c);
        this.setParts(parts);

        // POST
        this.ensure(
            this.getNoComponents() === before + 1,
            "insert postcondition failed."
        );

        // INVARIANT
        this.checkInvariant();
    }

    public append(c: string): void {
        this.checkComponent(c);

        const before = this.getNoComponents();
        const parts = this.value === "" ? [] : this.value.split(this.delimiter);

        parts.push(c);
        this.setParts(parts);

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

        const parts =
            this.value === "" ? [] : this.value.split(this.delimiter);

        parts.splice(i, 1);
        this.setParts(parts);

        // POST
        this.ensure(
            this.getNoComponents() === before - 1,
            "remove postcondition failed."
        );

        // INVARIANT
        this.checkInvariant();
    }
}
