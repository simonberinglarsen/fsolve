export class Cube {
    constructor() {
        this.edgeFaces = new Array(54);
        this.createMutationMap();
        this.initCube();
    }

    initCube() {
        for (let i = 0; i < 54; i++) {
            const color = (i >= 9 && i <= 44) ? 1 + Math.floor((i % 12) / 3) : Math.floor(i / 9);
            this.edgeFaces[i] = color;
        }
        this.doMove('Z2');
    }

    mutate(srcIndex, destIndex) {
        const srcColors = srcIndex.map((i) => this.edgeFaces[i]);
        for (var i = 0; i < srcColors.length; i++) {
            const idx = destIndex[i];
            this.edgeFaces[idx] = srcColors[i];
        }
    }

    moveR() {
        this.mutate(
            [38, 26, 14, 8, 5, 2, 18, 30, 42, 53, 50, 47,
                39, 27, 15, 16, 17, 29, 41, 40
            ],
            [8, 5, 2, 18, 30, 42, 53, 50, 47, 38, 26, 14,
                15, 16, 17, 29, 41, 40, 39, 27
            ]
        );
    }

    moveM() {
        this.mutate(
            [37, 25, 13, 7, 4, 1, 19, 31, 43, 52, 49, 46],
            [52, 49, 46, 37, 25, 13, 7, 4, 1, 19, 31, 43]
        );
    }

    moveY() {
        this.mutate(
            [
                9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
                21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32,
                33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44,
                6, 7, 8, 5, 2, 1, 0, 3,
                45, 46, 47, 50, 53, 52, 51, 48
            ],
            [
                18, 19, 20, 9, 10, 11, 12, 13, 14, 15, 16, 17,
                30, 31, 32, 21, 22, 23, 24, 25, 26, 27, 28, 29,
                42, 43, 44, 33, 34, 35, 36, 37, 38, 39, 40, 41,
                0, 3, 6, 7, 8, 5, 2, 1,
                51, 48, 45, 46, 47, 50, 53, 52
            ],
        );
    }

    setupIndexCube() {
        for (var i = 0; i < 54; i++) {
            this.edgeFaces[i] = i;
        }
    }

    extractMap() {
        const srcIndex = [];
        const destIndex = [];
        for (var i = 0; i < 54; i++) {
            if (this.edgeFaces[i] !== i) {
                srcIndex.push(this.edgeFaces[i]);
                destIndex.push(i);
            }
        }
        return {
            srcIndex: srcIndex,
            destIndex: destIndex,
        };
    }

    doMove(move) {
        const map = this.mutationMap[move];
        this.mutate(map.srcIndex, map.destIndex);
    }

    createMutationMap() {
        this.mutationMap = {};
        const mapMove = (move, mutations) => {
            this.setupIndexCube();
            mutations();
            this.mutationMap[move] = this.extractMap();
            this.setupIndexCube();
            mutations();
            mutations();
            mutations();
            this.mutationMap[`${move}'`] = this.extractMap();
            this.setupIndexCube();
            mutations();
            mutations();
            this.mutationMap[`${move}2`] = this.extractMap();
        };
        mapMove('Y', () => {
            this.moveY();
        });
        mapMove('R', () => {
            this.moveR();
        });
        mapMove('M', () => {
            this.moveM();
        });
        mapMove('L', () => {
            this.doMove(`Y2`);
            this.doMove(`R`);
            this.doMove(`Y2`);
        });
        mapMove('X', () => {
            this.doMove(`R`);
            this.doMove(`M'`);
            this.doMove(`L'`);
        });
        mapMove('F', () => {
            this.doMove(`Y'`);
            this.doMove(`R`);
            this.doMove(`Y`);
        });
        mapMove('S', () => {
            this.doMove(`Y'`);
            this.doMove(`M'`);
            this.doMove(`Y`);
        });
        mapMove('B', () => {
            this.doMove(`Y'`);
            this.doMove(`L`);
            this.doMove(`Y`);
        });
        mapMove('Z', () => {
            this.doMove(`F`);
            this.doMove(`S`);
            this.doMove(`B'`);
        });
        mapMove('U', () => {
            this.doMove(`Z`);
            this.doMove(`R`);
            this.doMove(`Z'`);
        });
        mapMove('D', () => {
            this.doMove(`Z`);
            this.doMove(`L`);
            this.doMove(`Z'`);
        });
        mapMove('E', () => {
            this.doMove(`U`);
            this.doMove(`D'`);
            this.doMove(`Y'`);
        });
    }

    doMoves(moves) {
        if(!moves || moves.length === 0) {
            return;
        }
        moves.trim().split(' ').forEach(m => this.doMove(m));
    }

    getScramble() {
        let moves = [];
        let last = '';
        let rnd = (x) => x[Math.floor(Math.random() * x.length)];
        for (let i = 0; i < 25; i++) {
            let faces = ['R', 'L', 'F', 'B', 'U', 'D'];
            faces = faces.filter(f => f !== last);
            last = rnd(faces);
            let direction = ['\'', '2', ''];
            moves.push(`${last}${rnd(direction)}`);
        }
        return moves.join(' ');
    }

}

