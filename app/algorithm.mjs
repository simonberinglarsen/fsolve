export class Algorithm {
    constructor(alg) {
        this.alg = alg;
    }

    getPllAlgs() {

        const pllCornerT = `R U R' U' R' F R2 U' R' U' R U R' F'`;
        const pllCornerE = `X' R U' R' D R U R' D' R U R' D R U' R' D' X`;
        const premoves = [
            ``,
            `${pllCornerE} `,
            `${pllCornerT} `,
            `U ${pllCornerT} `,
            `U' ${pllCornerT} `,
            `U2 ${pllCornerT} `,
        ];

        const pllEdge = [
            ``,
            `M2 U' M U2 M' U' M2 `, //ua
            `M2 U M U2 M' U M2 `, //ub
            `M2 U M2 U2 M2 U M2 `, // H
            `M2 U M2 U M U2 M2 U2 M U2 `, //Z
        ];

        const all = [];
        premoves.forEach(a1 => {
            [``, `U `, `U' `, `U2 `].forEach(a2 => {
                pllEdge.forEach(a3 => {
                    const alg = `${a1}${a2}${a3}`.trim();
                    all.push(alg);
                });
            });
        });

        return all;
    }

    getOllAlgs() {
        const premoves = [``, `U `, `U' `, `U2 `];

        const precross = [
            ``,
            `F R U R' U' F' f R U R' U' f' `, // dot
            `F R U R' U' F' `, // line
            `f R U R' U' f' `, // L
        ];

        const olls = [
            ``,
            `R' U2 R U R' U R`, // sune
            `L' U R U' L U R'`, // antisune
            `F' r U R' U' r' F R`, // diag.
            `r U R' U' r' F R F'`, // chameleon
            `R2 D R' U2 R D' R' U2 R'`, // headlights
            `F R U R' U' R U R' U' R U R' U' F'`, // sym cross
            `R U2 R2 U' R2 U' R2 U2 R`,  // asym. cross
        ];

        const all = [];
        premoves.forEach(a1 => {
            precross.forEach(a2 => {
                premoves.forEach(a3 => {
                    olls.forEach(a4 => {
                        const alg = `${a1}${a2}${a3}${a4}`.trim();
                        all.push(alg);
                    });
                });
            });
        });

        return all;
    }

    getF2lAlgs() {
        const corner2top = [
            ``,
            `U'`,
            `U2`,
            `U`,
            `R U R' U'`,
            `R' U2 R U'`,
            `L U2 L'`,
            `L' U' L`,
        ];
        const whiteOnTop = [
            
            `R U R' U' R U R' U' R U R' U'`,
            `R U' R' Y L' U2 L Y'`,
            `R' U R Y L' U2 L U L' U' L Y'`,
            `R' U R2 U' R'`,
            `L U' L' U' R U R' U R U' R'`,
            `U2 L U2 L' Y L' U L Y'`,
            `L' U' L Y L' U2 L U' L' U L Y'`,
            `L' R U2 R' L`,

            `R U2 R' U' R U R'`,
            `U' Y L' U L U L' U L U' L' U L Y'`,
            `U R U2 R' U R U' R'`,
            `U2 Y' R' U' R U' R' U R Y`,
            `U2 R U R' U R U' R'`,
            `U' Y' R' U2 R U' R' U R Y`,
            `U R U' R' U' R U' R' U R U' R'`,
            `Y L' U2 L U L' U' L Y'`,
        ];
        const whiteOnSide = [
            `U' R U2 R' U R U R'`,
            `U2 R' F R F' U2 R U R'`,
            `R' U R U' Y L' U L Y'`,
            `R' U' R2 U R'`,
            `L' f U f' R U R'`,
            `U L U2 L' U' R U R'`,
            `U2 L' U L Y L' U2 L Y'`,
            `U2 L' U' L U2 R U R'`,

            `U' R U' R' U R U R'`,
            `R U' R' U2 Y L' U' L Y'`,
            `R U R'`,
            `U Y L' U2 L U2 L' U L Y'`,
            `U' R U R' U R U R'`,
            `U Y L' U' L U2 L' U L Y'`,
            `R' U2 R2 U R2 U R`,
            `Y U' L' U L Y'`,
        ];
        const whiteOnFront = [
            `U' R U' R' U2 R U' R'`,
            `U' R U R' U Y L' U' L Y'`,
            `U R' U2 R Y L' U' L Y'`,
            `U2 R f' U' F U' Y L' U' L Y'`,
            `U L U L' U' Y L' U' L Y'`,
            `U L U' L' R U' R'`,
            `U2 L' U2 L U2 Y L' U' L Y'`,
            `U' L F' L' F U Y L' U' L Y'`,

            `U R U' R'`,
            `U' R U2 R' U Y L' U' L Y'`,
            `U' R U R' U2 R U' R'`,
            `U' R U' R' U Y L' U' L Y'`,
            `U' R U2 R' U2 R U' R'`,
            `Y L' U' L Y'`,
            `R U2 R' U R U R' U R U' R'`,
            `Y U L' U L U' L' U' L Y'`,
        ];

        const extras = [
            `R U' R'`,
            `R' U R`,
            `L' U L`,
            `L U' L'`,
        ];

        let algs = [];

        corner2top.forEach(a => {
            whiteOnTop.forEach(a2 => algs.push(`${a} ${a2}`.trim()));
            whiteOnSide.forEach(a2 => algs.push(`${a} ${a2}`.trim()));
            whiteOnFront.forEach(a2 => algs.push(`${a} ${a2}`.trim()));
            extras.forEach(a2 => algs.push(`${a} ${a2}`.trim()));
        });

        algs = algs
            .filter((v, i) => algs.indexOf(v) === i)
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
        const alg = ' ' + this.alg + ' ';
        const expanded = alg
            .replace(/U2 /g, 'U U ')
            .replace(/D2 /g, 'D D ')
            .replace(/R2 /g, 'R R ')
            .replace(/L2 /g, 'L L ')
            .replace(/F2 /g, 'F F ')
            .replace(/B2 /g, 'B B ')
            .replace(/Y2 /g, 'Y Y ');

        let reduced = expanded;
        while (true) {
            const beforeReduction = reduced.length;
            reduced = reduced
                .replace(/U U U U /g, '')
                .replace(/D D D D /g, '')
                .replace(/R R R R /g, '')
                .replace(/L L L L /g, '')
                .replace(/F F F F /g, '')
                .replace(/B B B B /g, '')
                .replace(/Y Y Y Y /g, '')

                .replace(/U' U' U' U' /g, '')
                .replace(/D' D' D' D' /g, '')
                .replace(/R' R' R' R' /g, '')
                .replace(/L' L' L' L' /g, '')
                .replace(/F' F' F' F' /g, '')
                .replace(/B' B' B' B' /g, '')
                .replace(/Y' Y' Y' Y' /g, '')

                .replace(/U U U /g, `U' `)
                .replace(/D D D /g, `D' `)
                .replace(/R R R /g, `R' `)
                .replace(/L L L /g, `L' `)
                .replace(/F F F /g, `F' `)
                .replace(/B B B /g, `B' `)
                .replace(/Y Y Y /g, `Y' `)

                .replace(/U' U' U' /g, `U `)
                .replace(/D' D' D' /g, `D `)
                .replace(/R' R' R' /g, `R `)
                .replace(/L' L' L' /g, `L `)
                .replace(/F' F' F' /g, `F `)
                .replace(/B' B' B' /g, `B `)
                .replace(/Y' Y' Y' /g, `Y `)

                .replace(/U U' /g, '')
                .replace(/D D' /g, '')
                .replace(/R R' /g, '')
                .replace(/L L' /g, '')
                .replace(/F F' /g, '')
                .replace(/B B' /g, '')
                .replace(/Y Y' /g, '')

                .replace(/U' U /g, '')
                .replace(/D' D /g, '')
                .replace(/R' R /g, '')
                .replace(/L' L /g, '')
                .replace(/F' F /g, '')
                .replace(/B' B /g, '')
                .replace(/Y' Y /g, '');
            const cannotReduceMore = reduced.length === beforeReduction;
            if (cannotReduceMore) {
                break;
            }
        }

        let collapse = reduced
            .replace(/U U /g, 'U2 ')
            .replace(/D D /g, 'D2 ')
            .replace(/R R /g, 'R2 ')
            .replace(/L L /g, 'L2 ')
            .replace(/F F /g, 'F2 ')
            .replace(/B B /g, 'B2 ')
            .replace(/Y Y /g, 'Y2 ')
            .replace(/U' U' /g, 'U2 ')
            .replace(/D' D' /g, 'D2 ')
            .replace(/R' R' /g, 'R2 ')
            .replace(/L' L' /g, 'L2 ')
            .replace(/F' F' /g, 'F2 ')
            .replace(/B' B' /g, 'B2 ')
            .replace(/Y' Y' /g, 'Y2 ')

        this.alg = collapse.trim();
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

    raw() {
        this.alg = this.alg
            .replace(/\/\*.*?\*\//g, '')
            .replace(/\s\s+/g, ' ')
            .trim();
        return this;
    }

    result() {
        return this.alg.trim();
    }
}