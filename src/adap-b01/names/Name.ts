export const DEFAULT_DELIMITER: string = '.';
export const ESCAPE_CHARACTER = '\\';

/**
 * ADAP B01 – Name Implementation
 * Author: Sauan Derbaz
 * FAU Email: sauan.mahmud@fau.de
 */
export class Name {

    private delimiter: string = DEFAULT_DELIMITER;
    private components: string[] = [];

    private static unmask(comp: string, delim: string): string {
        const escDelim = ESCAPE_CHARACTER + delim;
        return comp
            .replaceAll(escDelim, delim)
            .replaceAll(ESCAPE_CHARACTER + ESCAPE_CHARACTER, ESCAPE_CHARACTER);
    }

    private static mask(raw: string, delim: string): string {
        let s = raw.replaceAll(ESCAPE_CHARACTER, ESCAPE_CHARACTER + ESCAPE_CHARACTER);
        if (delim) {
            s = s.replaceAll(delim, ESCAPE_CHARACTER + delim);
        }
        return s;
    }

    // @methodtype initialize-method
    constructor(other: string[], delimiter?: string) {
        if (!Array.isArray(other)) {
            throw new Error("other must be a masked string[]");
        }
        this.delimiter = delimiter ?? DEFAULT_DELIMITER;
        this.components = [...other];
    }

    // @methodtype conversion-method
    public asString(delimiter: string = this.delimiter): string {
        const raw = this.components.map(c => Name.unmask(c, this.delimiter));
        return raw.join(delimiter);
    }

    // @methodtype conversion-method
    public asDataString(): string {
        const raw = this.components.map(c => Name.unmask(c, this.delimiter));
        const remasked = raw.map(c => Name.mask(c, DEFAULT_DELIMITER));
        return remasked.join(DEFAULT_DELIMITER);
    }

    // @methodtype get-method
    public getComponent(i: number): string {
        if (i < 0 || i >= this.components.length) {
            throw new RangeError("index out of bounds");
        }
        return this.components[i];
    }

    // @methodtype set-method
    public setComponent(i: number, c: string): void {
        if (i < 0 || i >= this.components.length) {
            throw new RangeError("index out of bounds");
        }
        this.components[i] = c;
    }

    // @methodtype get-method
    public getNoComponents(): number {
        return this.components.length;
    }

    // @methodtype command-method
    public insert(i: number, c: string): void {
        if (i < 0 || i > this.components.length) {
            throw new RangeError("index out of bounds");
        }
        this.components.splice(i, 0, c);
    }

    // @methodtype command-method
    public append(c: string): void {
        this.components.push(c);
    }

    // @methodtype command-method
    public remove(i: number): void {
        if (i < 0 || i >= this.components.length) {
            throw new RangeError("index out of bounds");
        }
        this.components.splice(i, 1);
    }
}
