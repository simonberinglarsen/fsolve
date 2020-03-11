import { Cube } from './cube.mjs'
import { CubeComponent } from './cubeComponent.mjs'
import { Store } from './store.mjs';
import { CrossStrategy } from './cross-strategy.mjs'
import { F2lStrategy } from './f2l-strategy.mjs'

class App {
    constructor() {
        this.store = new Store();
        this.cube = new Cube();
        this.cubeComponent = new CubeComponent(this.store);
    }

    start() {
        this.initComponents();
        this.initEventHandlers();

        this.cube.initCube();
        this.store.setSlice('cube', { edgeFaces: [...this.cube.edgeFaces] });
    }

    initEventHandlers() {
        $('#btn-scramble').click(() => {
            this.scrambleCube();
        });
        $('#btn-cross').click(() => {
            this.solveCross();
        });
        $('#btn-f2l').click(() => {
            this.solveF2l();
        });
        $('#btn-toggle-view').click(() => {
            this.toggleView();
        });
    }

    toggleView() {
        $('#cube').toggleClass('d-none');
    }

    solveF2l() {
        this.solveCross();
        let strat = new F2lStrategy(this.cube, this.store);
        const moves = strat.execute();
        const moveCount = moves.split(' ').length;
        $('#f2l-text').text(`${moveCount}: ${moves}`);
        this.cube.doMoves(moves);
        this.store.setSlice('cube', { edgeFaces: [...this.cube.edgeFaces] });
    }

    solveCross() {
        this.scrambleCube();

        let strat = new CrossStrategy(this.cube, this.store);
        const moves = strat.execute();
        const moveCount = moves.split(' ').length;
        $('#cross-text').text(`${moveCount}: ${moves}`);
        this.cube.doMoves(moves);
        this.store.setSlice('cube', { edgeFaces: [...this.cube.edgeFaces] });
    }

    scrambleCube() {
        let scramble = this.cube.getScramble();
        $('#scramble-text').text(`${scramble}`);
        this.cube.initCube();
        this.cube.doMove('Z2');
        this.cube.doMoves(scramble);
        this.store.setSlice('cube', { edgeFaces: [...this.cube.edgeFaces] });
    }

    initComponents() {
        this.cubeComponent.build();
    }
}

export let app = new App();