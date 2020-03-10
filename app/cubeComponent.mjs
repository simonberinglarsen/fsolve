import { Subject } from 'https://dev.jspm.io/rxjs@6/_esm2015';
import { takeUntil } from 'https://dev.jspm.io/rxjs@6/_esm2015/operators';

export class CubeComponent {
    constructor(store) {
        this.store = store;
        this.destroy$ = new Subject();
    }

    destroy() {
        this.destroy$.next();
    }

    build() {
        const rowStart = '<div class="d-flex flex-row">';
        const rowEnd = '</div>';
        const field = '<div id="" class="">+</div>';
        const field3Id = field + field + field;
        const field12Id = field3Id + field3Id + field3Id + field3Id;
        const field3NoId = '<div class="piece-3xw"></div>';
        const field6NoId = '<div class="piece-6xw"></div>';
        const r1 = rowStart + field3NoId + field3Id + field6NoId + rowEnd;
        const r2 = rowStart + field12Id + rowEnd;
        let table = r1 + r1 + r1 + r2 + r2 + r2 + r1 + r1 + r1;
        let index = 0;
        table = table.replace(/id=\"\"/g, () => `id="piece${index++}"`);
        index = 0;
        table = table.replace(/\+/g, () => `${index++}`);
        $('#cube').html(table);

        this.store.select((s) => s.cube)
            .pipe(takeUntil(this.destroy$))
            .subscribe((cube) => {
                this.edgeFaces = cube.edgeFaces;
                this.update();
            });
    }

    update() {
        this.edgeFaces.forEach((v, i, a) => {
            this.setColor(i, v);
        });
    }

    setColor(index, face) {
        $(`#piece${index}`).removeClass().addClass(`piece text-center face-${face}`);
    }
}