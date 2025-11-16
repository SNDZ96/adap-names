import { AbstractName } from "./AbstractName";

/**
 * Diese Klasse speichert einen Namen direkt als Array.
 * Beispiel: ["a", "b", "c"]
 *
 * Durch die Vererbung von AbstractName müssen wir nur zwei Methoden
 * implementieren: getParts() und setParts().
 */
export class StringArrayName extends AbstractName {

    /** Der Name direkt als Array von Strings. */
    protected parts: string[] = [];

    constructor(parts: string[] = [], delimiter?: string) {
        super(delimiter);
        this.parts = [...parts]; // Kopie zur Sicherheit
    }

    /**
     * Gibt die gespeicherten Komponenten zurück.
     */
    protected getParts(): string[] {
        return [...this.parts]; // Kopie, damit nichts „von außen“ manipuliert wird
    }

    /**
     * Speichert neue Komponenten zurück.
     */
    protected setParts(parts: string[]): void {
        this.parts = [...parts];
    }

    /**
     * Klont dieses Objekt.
     */
    public clone(): StringArrayName {
        return new StringArrayName(this.parts, this.delimiter);
    }
}
