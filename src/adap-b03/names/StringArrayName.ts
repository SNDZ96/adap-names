import { AbstractName } from "./AbstractName";

/**
 * Diese Klasse speichert einen Namen als einzelnen String.
 * Beispiel: "a.b.c"
 * 
 * Die Logik für Komponentenbearbeitung kommt aus AbstractName.
 * Diese Klasse muss nur wissen:
 *  - wie man einen String in parts zerlegt
 *  - wie man parts wieder zu einem String zusammenfügt
 */
export class StringName extends AbstractName {

    /** Der komplette Name als ein einzelner String. */
    protected value: string = "";

    constructor(source: string = "", delimiter?: string) {
        super(delimiter);
        this.value = source;
    }

    /**
     * Zerlegt den String in seine Komponenten.
     * Wenn der Name leer ist, geben wir ein leeres Array zurück.
     */
    protected getParts(): string[] {
        if (this.value === "") return [];
        return this.value.split(this.delimiter);
    }

    /**
     * Fügt die Komponenten wieder zu einem String zusammen.
     */
    protected setParts(parts: string[]): void {
        this.value = parts.join(this.delimiter);
    }

    /**
     * Klont dieses Objekt.
     * Wichtig für das Homework: Rückgabetyp bleibt StringName.
     */
    public clone(): StringName {
        return new StringName(this.value, this.delimiter);
    }
}
