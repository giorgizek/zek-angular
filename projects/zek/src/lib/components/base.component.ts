import { Input, Directive, inject, EventEmitter, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { PrintType } from '../models/print.model';
import { WebApiClient } from '../services';
import { CoreComponent } from './core.component';
import { BooleanInput } from './types';
import { Convert, FileHelper, UrlHelper } from '../utils';

@Directive()
export class BaseComponent<TModel = any> extends CoreComponent {
    protected readonly api = inject(WebApiClient);
    protected readonly route = inject(ActivatedRoute);
    protected readonly router = inject(Router);

    private _readOnly = false;
    @Input()
    get readOnly(): boolean {
        return this._readOnly;
    }
    set readOnly(v: BooleanInput) {
        this._readOnly = Convert.toBooleanProperty(v);
    }

    private _url: string | null = null;
    protected get url(): string {
        if (!this._url)
            this._url = UrlHelper.getNoParam(this.router.url);
        return this._url;
    }

    @Input() model?: TModel | null;
    @Output() modelChange = new EventEmitter<TModel | null | undefined>();

    protected getParam(name: string) {
        return this.route.snapshot.paramMap.get(name);
    }
    protected getQueryParam(name: string) {
        return this.route.snapshot.queryParamMap.get(name);
    }

    reload() {
        this._redirectTo(this.router.url);
    }
    private _redirectTo(url: string) {
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
            this.router.navigateByUrl(url);
        });
    }

    protected navigateReturnUrl() {
        const returnUrl = this.getQueryParam('returnUrl') || this.getParam('returnUrl');
        if (returnUrl) {
            this.router.navigateByUrl(returnUrl);
            // let urlTree = this.router.parseUrl(returnUrl);
            // const urlWithoutParams = urlTree.root.children[PRIMARY_OUTLET].segments.map(it => it.path).join('/')
            // this.router.navigate([urlWithoutParams, urlTree.root.children[PRIMARY_OUTLET].segments[urlTree.root.children[PRIMARY_OUTLET].segments.length - 1].parameters]);
            return;
        }

        this.router.navigate([this.router.url.substring(0, this.router.url.lastIndexOf('/'))]);
    }


    cancel() {
        this.navigateReturnUrl();
    }

    downloadFile(blob: Blob | null, fileName: string, type?: string | null) {
        FileHelper.download(blob, fileName);
    }
    print(id?: number | null, printType?: PrintType) {
        const split = this.url.split('/');
        if (split.length < 2) {
            return;
        }
        const template = split[1];
        // let api = inject(WebApiClient);

        let actionName: string;

        switch (printType) {
            case PrintType.Pdf:
                actionName = 'PrintPdfIdLink';
                break;

            default:
                actionName = 'ShowIdLink'
                break;
        }
        this.api.getString(`api/Reports/${actionName}`, { template, id }).subscribe(url => {
            if (url) {
                window.open(url, '_blank');
            }
        });
    }

    protected internalPrint(name: any, id: any, printType: PrintType = PrintType.Show) {
        this.api.get(`api/reports/presigned-url`, { name, id, type: printType }).subscribe(data => {
            if (data?.success) {
                window.open(data.value, '_blank');
            }
        });
    }
}
