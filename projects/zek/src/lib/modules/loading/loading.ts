import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ZekLoadingService } from './loading-interceptor';

@Component({
    selector: 'app-loading',
    styleUrls: ['./loading.css'],
    template: `
<div *ngIf="show" id="loading" class="progress">
    <div class="progress-bar progress-bar-striped progress-bar-animated bg-danger" role="progressbar" style="width:100%" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100"></div>
</div>
`
})
export class ZekLoading implements OnInit, OnDestroy {
    show: boolean = false;
    private subscription?: Subscription;
    constructor(private readonly _loading: ZekLoadingService) {
    }

    ngOnInit() {
        this.subscription = this._loading.onLoading.subscribe(x => {
            this.show = x
        });
    }

    ngOnDestroy() {
        this.subscription?.unsubscribe();
    }
}