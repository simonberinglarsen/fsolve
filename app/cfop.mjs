export class CFOP {
    constructor(cube, store) {
        this.cube = cube;
        this.store = store;
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

    reduceCancelMoves(alg) {
        const temp = ' ' + alg
            .replace(` U U' `, ' ')
            .replace(` D D' `, ' ')
            .replace(` R R' `, ' ')
            .replace(` L L' `, ' ')
            .replace(` F F' `, ' ')
            .replace(` B B' `, ' ')

            .replace(` U2 U2 `, ' ')
            .replace(` D2 D2 `, ' ')
            .replace(` R2 R2 `, ' ')
            .replace(` L2 L2 `, ' ')
            .replace(` F2 F2 `, ' ')
            .replace(` B2 B2 `, ' ')

            .replace(` U' U `, ' ')
            .replace(` D' D `, ' ')
            .replace(` R' R `, ' ')
            .replace(` L' L `, ' ')
            .replace(` F' F `, ' ')
            .replace(` B' B `, ' ')


            .replace(` U U `, ' U2 ')
            .replace(` D D `, ' D2 ')
            .replace(` L L `, ' L2 ')
            .replace(` R R `, ' R2 ')
            .replace(` F F `, ' F2 ')
            .replace(` B B `, ' B2 ')

            .replace(` U' U' `, ' U2 ')
            .replace(` D' D' `, ' D2 ')
            .replace(` L' L' `, ' L2 ')
            .replace(` R' R' `, ' R2 ')
            .replace(` F' F' `, ' F2 ')
            .replace(` B' B' `, ' B2 ') + ' ';
        return temp.trim();
    }

    reduceYRotations(alg) {
        const x = alg.split(' ');
        const newAlg = [];
        let rotIdx = 0;
        const rotY = 'FRBL';
        for (var i = 0; i < x.length; i++) {
            const move = x[i];
            if (move == 'Y') {
                rotIdx = (rotIdx + 1) % rotY.length;
                continue;
            } else if (move == `Y'`) {
                rotIdx = (rotIdx + 3) % rotY.length;
                continue;
            } else if (move == `Y2`) {
                rotIdx = (rotIdx + 2) % rotY.length;
                continue;
            }
            if (rotY.indexOf(move[0]) >= 0) {
                let idx = (rotY.indexOf(move[0]) + rotIdx) % rotY.length;
                let newMove = rotY[idx] + move.substring(1);
                newAlg.push(newMove);
            }
            else {
                newAlg.push(move);
            }

        }
        return newAlg.join(' ');
    }

    cross() {
        const algs = [
            //FD
            `F D' L`,
            //FL
            `F'`,
            `D' L`,
            //FR
            `F`,
            `D R'`,
            //FU
            'F2',
            `F D R'`,
            //UR
            `R' F R`,
            `U F2`,
            //UL
            `L F' L'`,
            `U' F2`,
            //BU
            `U2 F2`,
            `U R' F R`,
            //RD
            `R D R'`,
            `R F`,
            //LD
            `L' D' L`,
            `L' F'`,
            //BR
            `D R`,
            `D2 B'`,
            //BL
            `D' L'`,
            `D2 B`,
        ];

        const orgState = [...this.cube.edgeFaces];
        let best = this.score();
        const crossAlg = [];
        while (best < 4) {
            let bestAlg = '';
            ['', 'Y ', `Y' `, 'Y2 '].forEach(premove => {
                const tempState = [...this.cube.edgeFaces];
                algs.forEach(a => {
                    const alg = `${premove}${a}`;
                    this.cube.doMoves(alg);
                    this.store.setSlice('cube', { edgeFaces: [...this.cube.edgeFaces] });
                    let score = this.score();
                    if (score > best || (score === best && alg.split(' ').length < bestAlg.split(' ').length)) {
                        best = score;
                        bestAlg = alg;
                    }
                    this.cube.edgeFaces = [...tempState];
                });
            });
            if (bestAlg === '') {
                throw Error('should never happen');
            }
            crossAlg.push(bestAlg);
            this.cube.doMoves(bestAlg);
            this.store.setSlice('cube', { edgeFaces: [...this.cube.edgeFaces] });
        }
        let res = crossAlg.join(' ');
        res = this.reduceCancelMoves(res);
        res = this.reduceYRotations(res);
        this.cube.edgeFaces = [...orgState];
        this.cube.doMoves(res);
        res = res + this.adjustDownFace();
        this.cube.edgeFaces = [...orgState];
        return res;
    }
}
