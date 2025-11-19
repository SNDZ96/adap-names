import { describe, it, expect } from "vitest";
import { StringName } from "../../../src/adap-b04/names/StringName";
import { StringArrayName } from "../../../src/adap-b04/names/StringArrayName";

import { IllegalArgumentException } from "../../../src/adap-b04/common/IllegalArgumentException";
import { InvalidStateException } from "../../../src/adap-b04/common/InvalidStateException";
import { MethodFailedException } from "../../../src/adap-b04/common/MethodFailedException";

describe("Design by Contract (B04)", () => {

    // --- Preconditions ------------------------------------------------------

    it("should throw IllegalArgumentException for invalid index", () => {
        const n = new StringName("a.b", ".");
        expect(() => n.getComponent(5)).toThrow(IllegalArgumentException);
    });

    it("should throw IllegalArgumentException when component contains delimiter", () => {
        const n = new StringName("a.b", ".");
        expect(() => n.append("c.d")).toThrow(IllegalArgumentException);
    });

    // --- Invariants ---------------------------------------------------------

    it("should throw InvalidStateException when part contains delimiter", () => {
        expect(() => new StringArrayName(["a", "b.c"], "."))
            .toThrow(InvalidStateException);
    });

    it("should throw InvalidStateException for non-string part", () => {
        expect(() => new StringArrayName(["a", 5 as any], "."))
            .toThrow(InvalidStateException);
    });

    // --- Postconditions -----------------------------------------------------

    it("should enforce postcondition for append() (length increases)", () => {
        const n = new StringName("a.b", ".");
        const before = n.getNoComponents();
        n.append("x");
        expect(n.getNoComponents()).toBe(before + 1);
    });

    it("should detect broken postcondition (simulate failure)", () => {
        const n = new StringName("a.b", ".");

        // Sabotieren der internen setParts-Methode
        (n as any).setParts = () => {};

        expect(() => n.append("x"))
            .toThrow(MethodFailedException);
    });

});
