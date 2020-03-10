import { Cube } from './cube.mjs'
import { CubeComponent } from './cubeComponent.mjs'
import { Store } from './store.mjs';
import { CFOPCross } from './cfop-cross.mjs'

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
        $('#scramble-text').text(`${scramble}`);
        this.cube.initCube();
        this.cube.doMove('Z2');
        this.cube.doMoves(scramble);

        let solver = new CFOPCross(this.cube, this.store);
        const cross = solver.solve();
        $('#cross-text').text(`${cross.split(' ').length}: ${cross}`);
        this.cube.doMoves(cross);
        this.store.setSlice('cube', { edgeFaces: [...this.cube.edgeFaces] });
    }

    initComponents() {
        this.cubeComponent.build();
    }
}

export let app = new App();