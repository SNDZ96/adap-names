import { Node } from "./Node";

export class Directory extends Node {

    protected childNodes: Set<Node> = new Set<Node>();

    constructor(bn: string, pn: Directory) {
        super(bn, pn);
    }

    public hasChildNode(cn: Node): boolean {
        return this.childNodes.has(cn);
    }

    public addChildNode(cn: Node): void {
        this.childNodes.add(cn);
    }

    public removeChildNode(cn: Node): void {
        this.childNodes.delete(cn);
    }

    public findNodes(bn: string): Set<Node> {
        const results = new Set<Node>();

        if (this.getBaseName() === bn) {
            results.add(this);
        }

        for (const child of this.childNodes) {
            if (child.getBaseName() === bn) {
                results.add(child);
            }

            const sub = child.findNodes(bn);
            for (const m of sub) {
                results.add(m);
            }
        }

        return results;
    }
}
