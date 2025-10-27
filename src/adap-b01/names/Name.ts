export const DEFAULT_DELIMITER: string = '.';
export const ESCAPE_CHARACTER = '\\';

/**
 * ADAP B01 – Name Implementation
 * Author: Sauan Derbaz
 * FAU Email: sauan.mahmud@fau.de
 * 
 * Diese Klasse repräsentiert einen Namen, der aus mehreren Komponenten besteht,
 * die durch ein Delimiter-Zeichen getrennt sind.
 * Sonderzeichen (Delimiter oder Escape-Zeichen) werden intern maskiert,
 * um eine eindeutige, maschinenlesbare Struktur zu gewährleisten.
 */
export class Name {

    /** Aktuell verwendetes Trennzeichen zwischen Komponenten */
    private delimiter: string = DEFAULT_DELIMITER;

    /** Die (maskierten) Komponenten des Namens */
    private components: string[] = [];

    /**
     * Entfernt Maskierungen innerhalb einer Komponente.
     * Beispiel: "Oh\\.\.\." → "Oh..."
     */
    // @methodtype helper-method
    private static unmask(comp: string, delim: string): string {
        const escDelim = ESCAPE_CHARACTER + delim;
        return comp
            .replaceAll(escDelim, delim)
            .replaceAll(ESCAPE_CHARACTER + ESCAPE_CHARACTER, ESCAPE_CHARACTER);
    }

    /**
     * Maskiert Sonderzeichen (Delimiter oder Escape) innerhalb einer Komponente,
     * damit sie sicher gespeichert werden kann.
     */
    // @methodtype helper-method
    private static mask(raw: string, delim: string): string {
        let s = raw.replaceAll(ESCAPE_CHARACTER, ESCAPE_CHARACTER + ESCAPE_CHARACTER);
        if (delim) {
            s = s.replaceAll(delim, ESCAPE_CHARACTER + delim);
        }
        return s;
    }

    /**
     * Konstruktor – erzeugt ein neues Name-Objekt aus maskierten Komponenten.
     * Optional kann ein anderes Delimiter-Zeichen angegeben werden.
     */
    // @methodtype initialize-method
    constructor(other: string[], delimiter?: string) {
        if (!Array.isArray(other)) {
            throw new Error("other must be a masked string[]");
        }
        this.delimiter = delimiter ?? DEFAULT_DELIMITER;
        this.components = [...other];
    }

    /**
     * Gibt eine menschenlesbare Version des Namens zurück.
     * Entfernt Maskierungen und verbindet die Komponenten mit dem gewünschten Delimiter.
     */
    // @methodtype conversion-method
    public asString(delimiter: string = this.delimiter): string {
        const raw = this.components.map(c => Name.unmask(c, this.delimiter));
        return raw.join(delimiter);
    }

    /**
     * Gibt eine maschinenlesbare Version des Namens zurück,
     * bei der alle Sonderzeichen korrekt maskiert sind.
     * Diese Darstellung kann wieder in ein Name-Objekt eingelesen werden.
     */
    // @methodtype conversion-method
    public asDataString(): string {
        const raw = this.components.map(c => Name.unmask(c, this.delimiter));
        const remasked = raw.map(c => Name.mask(c, DEFAULT_DELIMITER));
        return remasked.join(DEFAULT_DELIMITER);
    }

    /**
     * Liefert die Komponente an Index i (maskiert zurückgegeben).
     * Wirft eine Fehlermeldung, wenn der Index außerhalb des gültigen Bereichs liegt.
     */
    // @methodtype get-method
    public getComponent(i: number): string {
        if (i < 0 || i >= this.components.length) {
            throw new RangeError("index out of bounds");
        }
        return this.components[i];
    }

    /**
     * Setzt eine neue maskierte Komponente an Position i.
     * Wirft eine Fehlermeldung bei ungültigem Index.
     */
    // @methodtype set-method
    public setComponent(i: number, c: string): void {
        if (i < 0 || i >= this.components.length) {
            throw new RangeError("index out of bounds");
        }
        this.components[i] = c;
    }

    /**
     * Gibt die Anzahl der vorhandenen Komponenten im Namen zurück.
     */
    // @methodtype get-method
    public getNoComponents(): number {
        return this.components.length;
    }

    /**
     * Fügt eine neue maskierte Komponente an einer bestimmten Position ein.
     * Nachfolgende Komponenten werden nach hinten verschoben.
     */
    // @methodtype command-method
    public insert(i: number, c: string): void {
        if (i < 0 || i > this.components.length) {
            throw new RangeError("index out of bounds");
        }
        this.components.splice(i, 0, c);
    }

    /**
     * Hängt eine neue maskierte Komponente am Ende des Namens an.
     */
    // @methodtype command-method
    public append(c: string): void {
        this.components.push(c);
    }

    /**
     * Entfernt die Komponente an Index i.
     * Wirft eine Fehlermeldung, falls der Index ungültig ist.
     */
    // @methodtype command-method
    public remove(i: number): void {
        if (i < 0 || i >= this.components.length) {
            throw new RangeError("index out of bounds");
        }
        this.components.splice(i, 1);
    }
}
