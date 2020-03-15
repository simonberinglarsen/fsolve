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
        $('#btn-copy-link').click(() => {
            var $temp = $("<input>");
            $("body").append($temp);
            $temp.val($('#external-link').text()).select();
            document.execCommand("copy");
            $temp.remove();
        });
    }

    toggleView() {
        $('#cube').toggleClass('d-none');
    }

    solveF2l() {
        this.solveCross();
        let strat = new F2lStrategy(this.cube, this.store);
        const moves = strat.execute();
        $('#f2l-text').text(`${moves}`);
        this.cube.doMoves(moves);

        const cross = $('#cross-text').text();
        const f2l = $('#f2l-text').text().replace(/\/\*/g, '%2f%2f').replace(/\*\//g, '%0a');
        
        let alg = `Z2 %2f%2finspection%0a ${cross} %2f%2fcross%0a ${f2l}`;
        alg = alg
            .replace(/ /g, '_')
            .replace(/'/g, '-')
            .replace(/X/g, 'x')
            .replace(/Y/g, 'y')
            .replace(/Z/g, 'z');

        const title = 'title';
        const scramble = $('#scramble-text').text();
        const url = `https://alg.cubing.net/?alg=${alg}&type=reconstruction&setup=${scramble}&title=${title}&view=playback`
        $('#external-link').text(url);
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