import { Algorithm } from "./algorithm.mjs";

export class F2lStrategy {
    constructor(cube, store) {
        this.cube = cube;
        this.store = store;
        this.allAlgs = new Algorithm().getF2lAlgs();
    }

    score() {
        const f = this.cube.edgeFaces;
        const s1 =
            (f[47] === 5 && (f[25] === f[26] && f[25] === f[38] && f[28] === f[27] && f[28] === f[39]))
            + (f[53] === 5 && (f[28] === f[29] && f[28] === f[41] && f[31] === f[30] && f[31] === f[42]))
            + (f[51] === 5 && (f[31] === f[32] && f[31] === f[44] && f[22] === f[21] && f[22] === f[33]))
            + (f[45] === 5 && (f[22] === f[23] && f[22] === f[35] && f[25] === f[24] && f[25] === f[36]));
        return s1;
    }

    solveAllPairs(currentAlg, solves) {
        for (let i = 0; i < 4; i++) {
            const currentScore = this.score();
            const undoAll = [...this.cube.edgeFaces];
            let shortestAlg = '';
            for (let x = 0; x < this.allAlgs.length; x++) {
                const a = this.allAlgs[x];
                this.cube.doMoves(a);

                if (this.score() > currentScore && (shortestAlg.length === 0 ||  a.length < shortestAlg.length)) {
                    shortestAlg = a;
                }
                this.cube.edgeFaces = [...undoAll];
            };
            currentAlg = ` ${currentAlg} ${shortestAlg} Y`;
            currentAlg = currentAlg.replace(/\s\s+/g, ' ');
            if (shortestAlg.length > 0) {
                this.cube.doMoves(shortestAlg);
            }
            else {
                // not found
                this.store.setSlice('cube', { edgeFaces: [...this.cube.edgeFaces] });
            }
            this.cube.doMoves(`Y`);
        }
        const s = this.score();
        if(s != 4) {
            console.log('ERROR!!!!!!!!!');
        }
        solves.push(currentAlg);
    }

    shortestSolve() {
        const solves = [];
        this.solveAllPairs('', solves);
        const best = solves
            .map(s => {
                const solve = new Algorithm(s)
                    .reduceCancelMoves()
                    .result();
                const length = solve.split(' ').length;
                return {
                    length: length,
                    solve: solve
                }
            })
            .sort((a, b) => a.length - b.length)[0];
        return best.solve;
    }

    execute() {
        const undoAll = [...this.cube.edgeFaces];
        let bestSolve = this.shortestSolve();
        this.cube.doMoves(bestSolve);
        bestSolve = bestSolve;
        this.cube.edgeFaces = [...undoAll];
        return bestSolve;
    }
}
