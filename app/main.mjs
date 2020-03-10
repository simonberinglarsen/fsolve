import { Cube } from './cube.mjs'
import { CubeComponent } from './cubeComponent.mjs'
import { Store } from './store.mjs';
import { CFOP } from './cfop.mjs'

class App {
    constructor() {
        this.store = new Store();
        this.cube = new Cube();
        this.cubeComponent = new CubeComponent(this.store);
    }

    start() {
        this.initComponents();
        $('#btn-test').click(() => {
            this.doThings();
        });

        this.cube.initCube();
        this.store.setSlice('cube', { edgeFaces: [...this.cube.edgeFaces] });
    }

    doThings() {
        let scramble = this.cube.getScramble();
        scramble = `D2 F' D2 R B' D' R2 L2 F' U' L' B' R' L' U B F2 D L' R L' B' R' U B'`;
        $('#scramble-text').text(`${scramble}`);
        this.cube.initCube();
        this.cube.doMove('Z2');
        this.cube.doMoves(scramble);

        let solver = new CFOP(this.cube, this.store);
        const cross = solver.cross();
        $('#cross-text').text(`${cross.split(' ').length}: ${cross}`);
        this.cube.doMoves(cross);
        this.store.setSlice('cube', { edgeFaces: [...this.cube.edgeFaces] });
    }

    initComponents() {
        this.cubeComponent.build();
    }
}

export let app = new App();