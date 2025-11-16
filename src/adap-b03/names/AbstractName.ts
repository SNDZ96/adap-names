/**
 * Abstrakte Oberklasse für verschiedene Namens-Repräsentationen.
 * Diese Klasse nimmt alles auf, was unabhängig von der eigentlichen
 * Speicherform (String oder Array) funktioniert.
 *
 * Die Subklassen müssen nur zwei Dinge implementieren:
 *  - getParts(): string[]  -> liefert die Namensbestandteile
 *  - setParts(parts): void -> speichert die Bestandteile wieder zurück
 *
 * Dadurch entsteht ein enger, klarer Vererbungsbereich (narrow interface),
 * wie im Homework gefordert.
 */
export abstract class AbstractName {

    /**
     * Der Trenner zwischen den einzelnen Namensbestandteilen,
     * z. B. "." für "a.b.c".
     */
    protected delimiter: string;

    constructor(delimiter: string = ".") {
        this.delimiter = delimiter;
    }

    /**
     * Subklassen müssen diese Methode implementieren.
     * Sie gibt alle Komponenten des Namens als Array zurück.
     */
    protected abstract getParts(): string[];

    /**
     * Subklassen müssen diese Methode implementieren.
     * Sie speichert ein Array von Komponenten in die konkrete Repräsentation.
     */
    protected abstract setParts(parts: string[]): void;

    /**
     * Hilfsmethode zum Überprüfen von Indexgrenzen.
     * Damit jede Subklasse saubere Fehler wirft und sich gleich verhält.
     */
    protected checkIndex(i: number, max: number): void {
        if (i < 0 || i > max) {
            throw new RangeError("index out of bounds");
        }
    }

    /**
     * Prüft, ob der Name leer ist.
     * Überprüft einfach die Anzahl an Komponenten.
     */
    public isEmpty(): boolean {
        return this.getParts().length === 0;
    }

    /**
     * Gibt die Anzahl der Komponenten zurück.
     */
    public getNoComponents(): number {
        return this.getParts().length;
    }

    /**
     * Gibt die i-te Komponente zurück.
     */
    public getComponent(i: number): string {
        const parts = this.getParts();
        this.checkIndex(i, parts.length - 1);
        return parts[i];
    }

    /**
     * Ersetzt die i-te Komponente durch einen neuen Wert.
     */
    public setComponent(i: number, c: string): void {
        const parts = this.getParts();
        this.checkIndex(i, parts.length - 1);
        parts[i] = c;
        this.setParts(parts);
    }

    /**
     * Fügt eine neue Komponente an Position i ein.
     */
    public insert(i: number, c: string): void {
        const parts = this.getParts();
        this.checkIndex(i, parts.length); // hier darf i == length sein
        parts.splice(i, 0, c);
        this.setParts(parts);
    }

    /**
     * Hängt eine neue Komponente hinten an.
     */
    public append(c: string): void {
        const parts = this.getParts();
        parts.push(c);
        this.setParts(parts);
    }

    /**
     * Entfernt die Komponente an Index i.
     */
    public remove(i: number): void {
        const parts = this.getParts();
        this.checkIndex(i, parts.length - 1);
        parts.splice(i, 1);
        this.setParts(parts);
    }

    /**
     * Gibt den Namen als vollständig zusammengesetzten String zurück.
     * Subklassen müssen nur getParts() liefern – hier wird zusammengebaut.
     */
    public asString(del: string = this.delimiter): string {
        return this.getParts().join(del);
    }

    /**
     * Jede konkrete Subklasse muss angeben, wie sie kopiert wird.
     */
    public abstract clone(): AbstractName;
}
