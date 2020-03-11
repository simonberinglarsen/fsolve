export class Algorithm {
    constructor(alg) {
        this.alg = alg;
    }

    getF2lAlgs() {
        const corner2top = [
            ``,
            `U'`,
            `U2`,
            `U`,
            `R U R' U'`,
            `B U2 B'`,
            `L' U' L`,
            `L U' L'`,
        ];
        const whiteOnTop = [
            `R U2 R' U' R U R'`,
            `Y U' L' U L U2 L' U' L U' L' U L`,

            `U R U2 R' U R U' R'`,
            `U2 F' U' F Y U' L' U L`,

            `U2 R U R' U R U' R'`,
            `U' F' U2 F Y U' L' U L`,

            `U R U' R' U2 R U' R' U R U' R'`,
            `Y L' U2 L U L' U' L`,
        ];
        const whiteOnSide = [
            ``,
        ];
        const whiteOnFront = [
            ``,
        ];

        let algs = [];
        corner2top.forEach(a => {
            whiteOnTop.forEach(a2 => algs.push(`${a} ${a2}`.trim()));
            whiteOnSide.forEach(a2 => algs.push(`${a} ${a2}`.trim()));
            whiteOnFront.forEach(a2 => algs.push(`${a} ${a2}`.trim()));
        });
        algs = algs
            .filter((v,i) => algs.indexOf(v) === i)
            .filter((a) => a && a.length > 0)
        

        return algs;
    }

    getCrossAlgs() {
        const basicAlgs = [
            //FD
            `F D' L`,
            `F' D R'`,
            //FL
            `F'`,
            `D' L`,
            //FR
            `F`,
            `D R'`,
            //FU
            'F2',
            `F D R'`,
            `F' D' L`,
            //UR
            `R' F`,
            `R' F R`,
            `U F2`,
            //UL
            `L F'`,
            `L F' L'`,
            `U' F2`,
            //RD
            `R D R'`,
            `R F`,
            //LD
            `L' D' L`,
            `L' F'`,
            //BU
            `U2 F2`,
            `U R' F`,
            `U R' F R`,
            `U' L F'`,
            `U' L F' L'`,
            //BR
            `D R`,
            `D2 B'`,
            //BL
            `D' L'`,
            `D2 B`,
            //BD
            `B2 U2 F2`,
            `B D R`,
            `B' D' L'`,
        ];
        const algs = [];
        ['', 'Y ', `Y' `, 'Y2 '].forEach(rotation => {
            basicAlgs.forEach(a => {
                algs.push(`${rotation}${a}`);
            });
        });
        return algs;
    }

    reduceCancelMoves() {
        const alg = this.alg;
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
        this.alg = temp.trim();
        return this;
    }

    reduceYRotations() {
        const alg = this.alg;
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
        this.alg = newAlg.join(' ');
        return this;
    }

    result() {
        return this.alg.trim();
    }
}