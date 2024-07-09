export class HtmlHelper {
    static escapeHtml(source: string) {
        if (source == null) {
            source = '';
        }

        return source
            .replace(/&/g, '&amp;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;');
    }


    static addInput(type: string, name: string, id: string = name, force = false) {
        const node = document.createElement('input');
        node.type = type;
        node.name = name;
        node.id = id;

        document.getElementsByTagName('body')[0].appendChild(node);
        return node;
    }


    static loadScript(url: string, nonce?: string, async = true, defer = true) {
        const script = document.createElement('script');
        script.innerHTML = '';
        script.src = url;
        script.type = 'text/javascript';

        if (nonce) {
            script.nonce = nonce;
        }

        if (async) {
            script.async = true;
        }
        if (defer) {
            script.defer = true;
        }

        document.head.appendChild(script);
        //2022-02-24 document.getElementsByTagName('head')[0].appendChild(script);
    }
    static loadScripts(...scripts: string[]) {
        const promises: any[] = [];
        scripts.forEach((script) => promises.push(this.internalLoadScript(script)));
        return Promise.all(promises);
    }
    private static internalLoadScript(src: string) {
        return new Promise((resolve, reject) => {
            const script = document.createElement('script') as any;
            script.src = src;
            script.type = 'text/javascript';
            if (script.readyState) {  //IE
                script.onreadystatechange = () => {
                    if (script.readyState === "loaded" || script.readyState === "complete") {
                        script.onreadystatechange = null;
                        resolve({ script: src, loaded: true });
                    }
                };
            } else {  //Others
                script.onload = () => {
                    resolve({ script: src, loaded: true });
                };
            }
            script.onerror = (error: any) => resolve({ script: src, loaded: false });
            document.getElementsByTagName('head')[0].appendChild(script);
        });
    }

}