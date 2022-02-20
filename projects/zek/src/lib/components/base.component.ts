import { Input, Directive } from '@angular/core';
import { ActivatedRoute, Router, PRIMARY_OUTLET } from '@angular/router';

//import { AlertService } from '../modules/alert/shared/alert.service';
// import { WebApiClient } from '../services/web.api';
import { PrintType } from '../models/print.model';
// import { AppBaseModule } from '../app-base.module';
import { CoreComponent } from './core.component';

@Directive()
export class BaseComponent<TModel = any> extends CoreComponent {
    constructor(
        // protected readonly alertService: AlertService,
        protected readonly route: ActivatedRoute,
        protected readonly router: Router
    ) {
        super();
        this.url = this.router.url.split(';')[0];
    }


    private _readOnly = false;
    get readOnly() {
        return this._readOnly;
    }
    @Input() set readOnly(v: boolean) {
        this._readOnly = v;
    }

    protected readonly url: string;
    @Input() model?: TModel | null;



    protected getParam(name: string) {
        return this.route.snapshot.paramMap.get(name);
    }
    protected getAction() {
        return this.url.substr(this.url.lastIndexOf('/') + 1);
    }
    protected navigateReturnUrl() {
        const returnUrl = this.route.snapshot.paramMap.get('returnUrl');
        if (returnUrl) {
            let urlTree = this.router.parseUrl(returnUrl);
            const urlWithoutParams = urlTree.root.children[PRIMARY_OUTLET].segments.map(it => it.path).join('/')
            this.router.navigate([urlWithoutParams, urlTree.root.children[PRIMARY_OUTLET].segments[urlTree.root.children[PRIMARY_OUTLET].segments.length - 1].parameters]);
            return;
        }

        this.router.navigate([this.router.url.substr(0, this.router.url.lastIndexOf('/'))]);
    }


    cancel() {
        this.navigateReturnUrl();
    }

    downloadFile(blob: Blob | null, fileName: string, type: string) {
        if (!blob) return;

        const nav = (window.navigator as any);
        if (nav && nav.msSaveOrOpenBlob) {
            nav.msSaveOrOpenBlob(blob, fileName);
        } else {
            let a = document.createElement('a');
            a.href = URL.createObjectURL(blob);
            a.download = fileName;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        }
    }
    // print(id?: number | null, printType?: PrintType) {
    //     const split = this.url.split('/');
    //     if (split.length < 2) {
    //         return;
    //     }
    //     const template = split[1];
    //     let api = AppBaseModule.injector.get(WebApiClient);

    //     let actionName: string;


    //     switch (printType) {
    //         case PrintType.Pdf:
    //             actionName = 'PrintPdfIdLink';
    //             break;

    //         default:
    //             actionName = 'ShowIdLink'
    //             break;
    //     }
    //     api.getString(`api/Reports/${actionName}`, { template, id }).subscribe(url => {
    //         if (url) {
    //             window.open(url, '_blank');
    //         }
    //     });
    // }
}
