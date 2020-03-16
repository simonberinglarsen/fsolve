import { Algorithm } from "./algorithm.mjs";

export class PllStrategy {
    constructor(cube, store) {
        this.cube = cube;
        this.store = store;
        this.allAlgs = new Algorithm().getPllAlgs();
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
        if (!s1) {
            return 0;
        }
        const same = (a, b, c) => (f[a] === f[b]) && (f[a] === f[c]) && (f[b] === f[c]);
        const s2 = same(9, 10, 11) && same(12, 13, 14) && same(15, 16, 17) && same(18, 19, 20);
        return s2 ? 1 : 0;
    }

    auf() {
        const f = this.cube.edgeFaces;
        return (f[13] === f[25]) ? `` : 
            (f[13] === f[22]) ? `U` : 
            (f[13] === f[31]) ? `U2` : `U'`;
    }

    yellowTop() {
        const undoAll = [...this.cube.edgeFaces];
        for (var x = 0; x < this.allAlgs.length; x++) {
            const a = this.allAlgs[x];
            this.cube.doMoves(a);
            if(this.score() !== 1) {
                this.cube.edgeFaces = [...undoAll];
                continue;
            }
            const auf = `${a} ${this.auf()}`;
            this.cube.edgeFaces = [...undoAll];
            return auf;
        }
        throw Error('unable to solve Pll');
    }

    execute() {
        let bestSolve = new Algorithm(this.yellowTop())
            .reduceCancelMoves()
            .result();
        
        return bestSolve;
    }
}
