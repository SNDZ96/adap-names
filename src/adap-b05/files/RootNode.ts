import { Name } from "../names/Name";
import { StringName } from "../names/StringName";
import { Directory } from "./Directory";

export class RootNode extends Directory {

    constructor() {
        super("", null as any);
    }

    protected initialize(pn: Directory): void {
        this.parentNode = this;
    }

    public getFullName(): Name {
        return new StringName("", "/");
    }

    public move(to: Directory): void {
        // RootNode bleibt fix
    }

    protected doSetBaseName(bn: string): void {
        // Root hat keinen Namen
    }
}
