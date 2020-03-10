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

    solveMoreEdges() {
        let best = this.score();
        let bestAlg = '';
        this.allCrossAlgs.forEach(alg => {
            const undoMoves = [...this.cube.edgeFaces];
            this.cube.doMoves(alg);
            let score = this.score();
            const sameScore = score === best;
            const shorterAlg = alg.split(' ').length < bestAlg.split(' ').length;
            const newBest = score > best || (sameScore && shorterAlg);
            if (newBest) {
                best = score;
                bestAlg = alg;
            }
            this.cube.edgeFaces = [...undoMoves];
        });
        return bestAlg;
    }

    solveAllEdges() {
        const undoAll = [...this.cube.edgeFaces];
        const crossSolution = [];
        while (this.score() < 4) {
            const bestAlg = this.solveMoreEdges();
            if (bestAlg === '') {
                throw Error('should never happen');
            }
            crossSolution.push(bestAlg);
            this.cube.doMoves(bestAlg);
            this.store.setSlice('cube', { edgeFaces: [...this.cube.edgeFaces] });
        }
        this.cube.edgeFaces = [...undoAll];
        return crossSolution;
    }

    solve() {
        const undoAll = [...this.cube.edgeFaces];
        let res = this.solveAllEdges().join(' ');
        res = new Algorithm(res)
            .reduceCancelMoves()
            .reduceYRotations()
            .result();
        this.cube.doMoves(res);
        res = res + this.adjustDownFace();
        this.cube.edgeFaces = [...undoAll];
        return res;
    }
}
