import { Algorithm } from "./algorithm.mjs";

export class OllStrategy {
    constructor(cube, store) {
        this.cube = cube;
        this.store = store;
        this.allAlgs = new Algorithm().getOllAlgs();
    }

    score() {
        const f = this.cube.edgeFaces;
        const s1 =
            f[0] === 0 &&
            f[1] === 0 &&
            f[2] === 0 &&
            f[3] === 0 &&
            f[4] === 0 &&
            f[5] === 0 &&
            f[6] === 0 &&
            f[7] === 0 &&
            f[8] === 0;
        return s1 ? 1: 0;
    }

    yellowTop() {
        const undoAll = [...this.cube.edgeFaces];
        for (var x = 0; x < this.allAlgs.length; x++) {
            const a = this.allAlgs[x];
            this.cube.doMoves(a);
            const solved = this.score() === 1;
            this.cube.edgeFaces = [...undoAll];
            if (solved) {
                return a;
            }
        }
        throw Error('unable to solve OLL');
    }

    execute() {
        let bestSolve = new Algorithm(this.yellowTop())
            .reduceCancelMoves()
            .result();
        return bestSolve;
    }
}
