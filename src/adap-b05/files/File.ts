import { Node } from "./Node";
import { Directory } from "./Directory";
import { MethodFailedException } from "../common/MethodFailedException";

enum FileState {
    OPEN,
    CLOSED,
    DELETED
};

export class File extends Node {

    protected state: FileState = FileState.CLOSED;

    constructor(baseName: string, parent: Directory) {
        super(baseName, parent);
    }

    public open(): void {
        if (this.state === FileState.DELETED) {
            throw new MethodFailedException("Cannot open deleted file.");
        }
        this.state = FileState.OPEN;
    }

    public close(): void {
        if (this.state === FileState.DELETED) {
            throw new MethodFailedException("Cannot close deleted file.");
        }
        this.state = FileState.CLOSED;
    }

    public read(noBytes: number): Int8Array {
        if (this.state !== FileState.OPEN) {
            throw new MethodFailedException("File must be open before reading.");
        }
        
        const result = new Int8Array(noBytes);

        for (let i = 0; i < noBytes; i++) {
            try {
                result[i] = this.readNextByte();
            } catch (ex) {
                if (ex instanceof MethodFailedException) {
                    // B05 expects: fill failed reads with -1
                    result[i] = -1;
                } else {
                    throw ex;
                }
            }
        }

        return result;
    }

    protected readNextByte(): number {
        // minimal version for B05 – always succeeds returning dummy data
        // B06 will override this
        return 1;
    }

    protected doGetFileState(): FileState {
        return this.state;
    }
}
