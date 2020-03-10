import { Algorithm } from "./algorithm.mjs";

export class CFOPCross {
    constructor(cube, store) {
        this.cube = cube;
        this.store = store;
        this.allCrossAlgs = new Algorithm().getCrossAlgs();
    }

    score() {
        const [r, g, o, b] = [4, 1, 2, 3];
        const f = this.cube.edgeFaces;
        const s1 =
            (f[46] === 5 && f[37] === r)
            + (f[50] === 5 && f[40] === g)
            + (f[52] === 5 && f[43] === o)
            + (f[48] === 5 && f[34] === b);
        const s2 =
            (f[46] === 5 && f[37] === g)
            + (f[50] === 5 && f[40] === o)
            + (f[52] === 5 && f[43] === b)
            + (f[48] === 5 && f[34] === r);
        const s3 =
            (f[46] === 5 && f[37] === o)
            + (f[50] === 5 && f[40] === b)
            + (f[52] === 5 && f[43] === r)
            + (f[48] === 5 && f[34] === g);
        const s4 =
            (f[46] === 5 && f[37] === b)
            + (f[50] === 5 && f[40] === r)
            + (f[52] === 5 && f[43] === g)
            + (f[48] === 5 && f[34] === o);
        return Math.max(s1, s2, s3, s4);
    }

    adjustDownFace() {
        const f = this.cube.edgeFaces;
        if (f[37] === f[25]) return '';
        if (f[37] === f[28]) return ' D';
        if (f[37] === f[31]) return ' D2';
        return ` D'`;
    }

    solveAllEdges(currentAlg, solves) {
        const currentScore = this.score();
        if (currentScore === 4) {
            solves.push(currentAlg);
            return;
        }
        const undoAll = [...this.cube.edgeFaces];
        this.allCrossAlgs.forEach(a => {
            this.cube.doMoves(a);
            if (this.score() > currentScore) {
                this.solveAllEdges(`${currentAlg} ${a}`, solves);
            }
            this.cube.edgeFaces = [...undoAll];
        });
    }

    shortestSolve() {
        const solves = [];
        this.solveAllEdges('', solves);
        const first = solves
            .map(s => {
                const solve = new Algorithm(s)
                    .reduceCancelMoves()
                    .reduceYRotations()
                    .result();
                const length = solve.split(' ').length;
                return {
                    length: length,
                    solve: solve
                }
            })
            .sort((a, b) => a.length - b.length)[0];
        return first.solve;
    }

    solve() {
        const undoAll = [...this.cube.edgeFaces];
        let bestSolve = this.shortestSolve();
        this.cube.doMoves(bestSolve);
        bestSolve = bestSolve + this.adjustDownFace();
        this.cube.edgeFaces = [...undoAll];
        return bestSolve;
    }
}
