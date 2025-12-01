import { AbstractName } from "./AbstractName";
import { Name } from "./Name";
import { MethodFailedException } from "../common/MethodFailedException";
import { InvalidStateException } from "../common/InvalidStateException";

export class StringName extends AbstractName {
    protected value: string = "";

    constructor(value: string = "", delimiter: string = ".") {
        super(delimiter);
        this.value = value;
        this.checkInvariant();
    }

    clone(): Name {
        return new StringName(this.value, this.delimiter);
    }

    getNoComponents(): number {
        if (this.value === "") return 0;

        // Falls der interne Zustand zerstört ist → InvalidStateException
        if (typeof this.value !== "string") {
            throw new InvalidStateException("Internal state corrupted.");
        }

        const count = this.value.split(this.delimiter).length;

        this.ensure(count >= 0, "Invalid number of components.");
        return count;
    }

    getComponent(i: number): string {
        this.checkIndex(i);

        // Falls korrupt → InvalidStateException
        if (typeof this.value !== "string") {
            throw new InvalidStateException("Internal state corrupted.");
        }

        return this.value.split(this.delimiter)[i];
    }

    setComponent(i: number, c: string): void {
        this.checkIndex(i);
        this.checkComponent(c);

        const parts = this.value === "" ? [] : this.value.split(this.delimiter);
        parts[i] = c;

        this.value = parts.join(this.delimiter);
        this.checkInvariant();
    }

    insert(i: number, c: string): void {
        this.checkComponent(c);
        this.require(i >= 0 && i <= this.getNoComponents(), "Index out of bounds.");

        const parts = this.value === "" ? [] : this.value.split(this.delimiter);
        parts.splice(i, 0, c);

        this.value = parts.join(this.delimiter);
        this.checkInvariant();
    }

    append(c: string): void {
        this.checkComponent(c);
        const before = this.getNoComponents();

        // Test 6 verlangt: wenn value korrupt ist → FAILURE
        if (this.value == null || typeof this.value !== "string") {
            throw new MethodFailedException("Internal state corrupted.");
        }

        // Normal append
        if (this.value === "") {
            this.value = c;
        } else {
            this.value = this.value + this.delimiter + c;
        }

        // POSTCONDITION
        let after: number;
        try {
            after = this.getNoComponents();
        } catch {
            throw new MethodFailedException("Postcondition check failed.");
        }

        if (after !== before + 1) {
            throw new MethodFailedException("Append postcondition violated.");
        }

        this.checkInvariant();
    }

    remove(i: number): void {
        this.checkIndex(i);

        const parts = this.value.split(this.delimiter);
        parts.splice(i, 1);

        this.value = parts.join(this.delimiter);
        this.checkInvariant();
    }

    asDataString(): string {
        return this.value;
    }
}
