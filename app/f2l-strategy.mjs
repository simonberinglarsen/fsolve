import { Algorithm } from "./algorithm.mjs";

export class F2lStrategy {
    constructor(cube, store) {
        this.cube = cube;
        this.store = store;
        this.allAlgs = new Algorithm().getF2lAlgs();
    }

    score() {
        const f = this.cube.edgeFaces;
        if(f[46] !== 5 || f[48] !== 5 || f[50] !== 5 || f[52] !== 5 ) {
            return 0;
        }
        const s1 =
            (f[47] === 5 && (f[25] === f[26] && f[25] === f[38] && f[28] === f[27] && f[28] === f[39]))
            + (f[53] === 5 && (f[28] === f[29] && f[28] === f[41] && f[31] === f[30] && f[31] === f[42]))
            + (f[51] === 5 && (f[31] === f[32] && f[31] === f[44] && f[22] === f[21] && f[22] === f[33]))
            + (f[45] === 5 && (f[22] === f[23] && f[22] === f[35] && f[25] === f[24] && f[25] === f[36]));
        return s1;
    }

    solveAllPairs(currentAlg, solves) {
        const currentScore = this.score();
        if (currentScore === 4) {
            solves.push(currentAlg);
            return;
        }
        const undoAll = [...this.cube.edgeFaces];
        [``,`Y`,`Y'`,`Y2`].forEach(rotation => {
            this.allAlgs.forEach(x => {
                const a = `${rotation} ${x}`.trim();
                this.cube.doMoves(a);
                if (this.score() > currentScore) {
                    this.solveAllPairs(`${currentAlg} ${a}`, solves);
                }
                this.cube.edgeFaces = [...undoAll];
            });
        });
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
    
    annotate(moves) {
        const undoAll = [...this.cube.edgeFaces];
        const annotated = [];
        let maxScore = 0;
        moves.split(' ').forEach(a => {
            this.cube.doMove(a);
            const scoreNow = this.score();
            annotated.push(a);
            if(scoreNow > maxScore) {
                maxScore = scoreNow;
                let s = scoreNow > 1 ? 's' : '';
                annotated.push(`/* ${maxScore} pair${s} */`)
            }
        });

        this.cube.edgeFaces = [...undoAll];
        return annotated.join(' ');
    }

    execute() {
        const undoAll = [...this.cube.edgeFaces];
        let bestSolve = this.shortestSolve();
        this.cube.doMoves(bestSolve);
        this.cube.edgeFaces = [...undoAll];
        return this.annotate(bestSolve);
    }
}
