import { Cube } from './cube.mjs'
import { CubeComponent } from './cubeComponent.mjs'
import { Store } from './store.mjs';
import { CrossStrategy } from './cross-strategy.mjs'
import { F2lStrategy } from './f2l-strategy.mjs'
import { OllStrategy } from './oll-strategy.mjs'
import { PllStrategy } from './pll-strategy.mjs'

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
        $('#visual').toggleClass('d-none');
    }

    solveF2l() {
        let count =0 ;
        const result = [];
        let debugMsg = '';
        while(count<1000)
        try {
            this.scrambleCube();

            const crosstext = new CrossStrategy(this.cube, this.store).execute();
            this.cube.doMoves(crosstext);
            debugMsg = `---   ${$('#scramble-text').text()} Z2 ${crosstext}`;

            const f2ltext = new F2lStrategy(this.cube, this.store).execute();
            this.cube.doMoves(f2ltext);
            debugMsg = `---   ${$('#scramble-text').text()} Z2 ${crosstext} ${f2ltext}`;

            const olltext = new OllStrategy(this.cube, this.store).execute();
            this.cube.doMoves(olltext);
            debugMsg = `---   ${$('#scramble-text').text()} Z2 ${crosstext} ${f2ltext} ${olltext}`;

            const plltext = new PllStrategy(this.cube, this.store).execute();
            this.cube.doMoves(plltext);
            debugMsg = `---   ${$('#scramble-text').text()} Z2 ${crosstext} ${f2ltext} ${olltext} ${plltext}`;

            //--------------------- update UI
            $('#f2l-text').text(`${f2ltext}`);
            $('#oll-text').text(`${olltext}`);
            $('#pll-text').text(`${plltext}`);
            $('#cross-text').text(`${crosstext}`);
            const encodedF2ltext = f2ltext.replace(/\/\*/g, '%2f%2f').replace(/\*\//g, '%0a');

            const newline = `%0a`;
            const newlineX2 = `%0a%0a`;
            let alg = `Z2 //inspection${newlineX2}${crosstext}//cross${newlineX2}${encodedF2ltext}${newline}${olltext}//oll${newlineX2}${plltext}//pll${newline}`;
            alg = alg
                .replace(/ /g, '_')
                .replace(/'/g, '-')
                .replace(/X/g, 'x')
                .replace(/Y/g, 'y')
                .replace(/Z/g, 'z')
                .replace(/\/\//g, '%2f%2f');

            const title = 'Mr. Robot';
            const scramble = $('#scramble-text').text();
            const url = `https://alg.cubing.net/?alg=${alg}&type=reconstruction&setup=${scramble}&title=${title}&view=playback`
            $('#external-link').text(url);
            //$('#cube-viewer').attr("src", url);
            this.store.setSlice('cube', { edgeFaces: [...this.cube.edgeFaces] });
            count++;
            console.log(`${count} solved`);
            result.push(url);
        }
        catch (e) {
            console.log(`FAILED!!!!!: ${debugMsg}`);
        }
        console.log(JSON.stringify(result));
    }

    scrambleCube() {
        let scramble = this.cube.getScramble();
        //scramble = `D2 L F' R D L2 D R' U R' D' L' U2 B2 L2 D' B' D' U L D F R2 L2 U`;
        $('#scramble-text').text(`${scramble}`);
        this.cube.initCube();
        this.cube.doMoves(scramble);
        this.cube.doMove('Z2');
    }

    initComponents() {
        this.cubeComponent.build();
    }
}

export let app = new App();