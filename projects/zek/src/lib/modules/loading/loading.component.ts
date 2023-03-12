import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { LoadingInterceptor } from './loading-interceptor';


@Component({
    selector: 'zek-loading',
    styleUrls: ['./loading.component.css'],
    template: `
<div *ngIf="show" id="loading" class="progress">
    <div class="progress-bar progress-bar-striped progress-bar-animated bg-danger" role="progressbar" style="width:100%" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100"></div>
</div>
`
})
export class ZekLoading implements OnInit, OnDestroy {
    show: boolean = false;
    private subscription?: Subscription;
    constructor(private readonly loadingInterceptor: LoadingInterceptor) {
    }


    ngOnInit() {
        this.subscription = this.loadingInterceptor.getStatus().subscribe(x => {
            this.show = x
        });
    }

    ngOnDestroy() {
        if (this.subscription){
            this.subscription.unsubscribe();
        }
    }
}