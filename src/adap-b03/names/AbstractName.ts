// Abstrakte Klasse für Namen, die aus mehreren Komponenten bestehen.
// Die öffentliche API wird hier umgesetzt, die konkreten Datenstrukturen
// kommen aus den Unterklassen.

export abstract class AbstractName {

    protected delimiter: string;

    constructor(delimiter: string = ".") {
        this.delimiter = delimiter;
    }

    // Öffentliche Methoden, die auf den do*-Methoden basieren

    public getNoComponents(): number {
        return this.doGetNoComponents();
    }

    public getComponent(i: number): string {
        return this.doGetComponent(i);
    }

    public setComponent(i: number, c: string): void {
        this.doSetComponent(i, c);
    }

    public insert(i: number, c: string): void {
        this.doInsert(i, c);
    }

    public append(c: string): void {
        this.doAppend(c);
    }

    public remove(i: number): void {
        this.doRemove(i);
    }

    public asString(): string {
        const parts: string[] = [];
        for (let i = 0; i < this.getNoComponents(); i++) {
            parts.push(this.getComponent(i));
        }
        return parts.join(this.delimiter);
    }

    public abstract clone(): AbstractName;

    // Primitive Methoden, die jede Unterklasse liefern muss

    protected abstract doGetNoComponents(): number;
    protected abstract doGetComponent(i: number): string;
    protected abstract doSetComponent(i: number, c: string): void;
    protected abstract doInsert(i: number, c: string): void;
    protected abstract doAppend(c: string): void;
    protected abstract doRemove(i: number): void;
}
