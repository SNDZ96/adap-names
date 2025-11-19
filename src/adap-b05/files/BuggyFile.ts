import { File } from "./File";
import { Directory } from "./Directory";

export class BuggyFile extends File {

    constructor(baseName: string, parent: Directory) {
        super(baseName, parent);
    }

    /**
     * Fault injection for homework.
     * Rückgabe ist immer "", damit ein kaputter Zustand entsteht.
     */
    protected doGetBaseName(): string {
        // absichtlich fehlerhaft: überschreibt den Namen immer mit ""
        this.baseName = "";
        return super.doGetBaseName();
    }
}
