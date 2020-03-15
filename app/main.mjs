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
        $('#f2l-text').text(`${moves}`);
        this.cube.doMoves(moves);

        const cross = $('#cross-text').text();
        const f2l = $('#f2l-text').text();
        let alg = `Z2 %2f%2finspection%0a ${cross} %2f%2fcross%0a ${f2l} %2f%2ff2l%0a`;
        alg = alg
            .replace(/ /g, '_')
            .replace(/'/g, '-')
            .replace(/X/g, 'x')
            .replace(/Y/g, 'y')
            .replace(/Z/g, 'z');

        const title = 'title';
        const scramble = $('#scramble-text').text();
        const url = `https://alg.cubing.net/?alg=${alg}&type=reconstruction&setup=${scramble}&title=${title}&view=playback`
        $('#cube-viewer').attr("src", url);
        this.store.setSlice('cube', { edgeFaces: [...this.cube.edgeFaces] });
    }

    solveCross() {
        this.scrambleCube();

        let strat = new CrossStrategy(this.cube, this.store);
        const moves = strat.execute();
        $('#cross-text').text(`${moves}`);
        this.cube.doMoves(moves);
        this.store.setSlice('cube', { edgeFaces: [...this.cube.edgeFaces] });
    }

    scrambleCube() {
        let scramble = this.cube.getScramble();
        scramble = `R' F2 U' B U2 D B2 R F B R' U' L U' R2 D L U F' U' R L2 F D F2`;
        $('#scramble-text').text(`${scramble}`);
        this.cube.initCube();
        this.cube.doMoves(scramble);
        this.cube.doMove('Z2');
        this.store.setSlice('cube', { edgeFaces: [...this.cube.edgeFaces] });
    }

    initComponents() {
        this.cubeComponent.build();
    }
}

export let app = new App();