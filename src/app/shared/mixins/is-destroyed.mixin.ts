import { OnDestroy } from '@angular/core';
import { Subject } from 'rxjs/Subject';

export class IsDestroyedMixin implements OnDestroy {
    protected itIsDestroyed: Subject<void> = new Subject<void>();

    ngOnDestroy() {
        this.itIsDestroyed.next();
        this.itIsDestroyed.complete();
    }
}
