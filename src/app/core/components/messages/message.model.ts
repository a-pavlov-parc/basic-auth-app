import { Observable } from 'rxjs/Observable';

export class Message {
    visible: boolean;
    removed: boolean;
    text: string;
    type: 'SUCCESS' | 'INFO' | 'WARNING' | 'DANGER';

    constructor() {
        this.text = null;
        this.type = 'SUCCESS';
        this.visible = false;
        this.removed = false;
    }

    show() {
        this.visible = true;
    }

    hide() {
        this.visible = false;
    }

    remove() {
        this.removed = true;
    }

    showForSeconds(seconds: number): Observable<number> {
        return Observable.timer(0)
            .do(() => this.show())
            .delay(seconds * 1000)
            .do(() => this.hide())
            .delay(1000)
            .do(() => this.remove());
    }

    removeFadeOut(): Observable<number> {
        return Observable.timer(0)
            .do(() => this.hide())
            .delay(1000)
            .do(() => this.remove());
    }
}
