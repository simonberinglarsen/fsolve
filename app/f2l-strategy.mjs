import { Algorithm } from "./algorithm.mjs";

export class F2lStrategy {
    constructor(cube, store) {
        this.cube = cube;
        this.store = store;
        this.allAlgs = new Algorithm().getF2lAlgs();
    }

    score() {
      
    }

    solveAllPairs(currentAlg, solves) {
        const currentScore = this.score();
        if(solves.length > 0) {
            return;
        }
        if (currentScore === 4) {
            solves.push(currentAlg);
            return;
        }
        const undoAll = [...this.cube.edgeFaces];
        this.allAlgs.forEach(a => {
            this.cube.doMoves(a);
            if (this.score() > currentScore) {
                this.solveAllPairs(`${currentAlg} ${a}`, solves);
            }
            this.cube.edgeFaces = [...undoAll];
        });
    }

    shortestSolve() {
        const solves = [];
        this.solveAllPairs('', solves);
        const best = solves
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
        return best.solve;
    }

    execute() {
        const undoAll = [...this.cube.edgeFaces];
        let bestSolve = this.shortestSolve();
        this.cube.doMoves(bestSolve);
        bestSolve = bestSolve + this.adjustDownFace();
        this.cube.edgeFaces = [...undoAll];
        return bestSolve;
    }
}
