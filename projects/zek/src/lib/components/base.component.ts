import { Input, Directive, Type } from '@angular/core';
import { ActivatedRoute, Router, PRIMARY_OUTLET } from '@angular/router';
import { AppBaseModule } from '../zek.module';

import { PrintType } from '../models/print.model';
import { WebApiClient } from '../services';
import { CoreComponent } from './core.component';
import { BooleanInput, StringInput } from './types';
import { Convert, UrlHelper } from '../utils';

@Directive()
export class BaseComponent<TModel = any> extends CoreComponent {
    constructor(
        protected readonly route: ActivatedRoute,
        protected readonly router: Router
    ) {
        super();
    }


    private _readOnly = false;
    @Input()
    get readOnly() {
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



    protected getParam(name: string) {
        return this.route.snapshot.paramMap.get(name);
    }
    protected getQueryParam(name: string) {
        return this.route.snapshot.queryParamMap.get(name);
    }


    protected navigateReturnUrl() {
        const returnUrl = this.getQueryParam('returnUrl') || this.getParam('returnUrl');
        if (returnUrl) {
            let urlTree = this.router.parseUrl(returnUrl);
            const urlWithoutParams = urlTree.root.children[PRIMARY_OUTLET].segments.map(it => it.path).join('/')
            this.router.navigate([urlWithoutParams, urlTree.root.children[PRIMARY_OUTLET].segments[urlTree.root.children[PRIMARY_OUTLET].segments.length - 1].parameters]);
            return;
        }

        this.router.navigate([this.router.url.substring(0, this.router.url.lastIndexOf('/'))]);
    }


    cancel() {
        this.navigateReturnUrl();
    }

    downloadFile(blob: Blob | null, fileName: string, type: StringInput) {
        if (!blob) return;

        const nav = (window.navigator as any);
        if (nav && nav.msSaveOrOpenBlob) {
            nav.msSaveOrOpenBlob(blob, fileName);
        } else {
            let a = document.createElement('a');
            a.href = URL.createObjectURL(blob);
            a.download = fileName;
            a.target = '_blank';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        }
    }
    print(id?: number | null, printType?: PrintType) {
        const split = this.url.split('/');
        if (split.length < 2) {
            return;
        }
        const template = split[1];
        let api = AppBaseModule.injector.get<WebApiClient>(WebApiClient as Type<WebApiClient>);

        let actionName: string;

        switch (printType) {
            case PrintType.Pdf:
                actionName = 'PrintPdfIdLink';
                break;

            default:
                actionName = 'ShowIdLink'
                break;
        }
        api.getString(`api/Reports/${actionName}`, { template, id }).subscribe(url => {
            if (url) {
                window.open(url, '_blank');
            }
        });
    }
}
