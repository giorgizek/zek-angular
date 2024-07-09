export const firstBy = (function() {

    function identity(v: any){return v;}

    function ignoreCase(v: any){return typeof(v)==="string" ? v.toLowerCase() : v;}

    function makeCompareFunction(f: any, opt: any){
        opt = typeof(opt)==="number" ? {direction:opt} : opt||{};
        if(typeof(f)!="function"){
            const prop = f;
            // make unary function
            f = function(v1: any){return !!v1[prop] ? v1[prop] : "";}
        }
        if(f.length === 1) {
            // f is a unary function mapping a single item to its sort score
            const uf = f;
            const preprocess = opt.ignoreCase?ignoreCase:identity;
            const cmp = opt.cmp || function(v1: any,v2: any) {return v1 < v2 ? -1 : v1 > v2 ? 1 : 0;}
            f = function(v1: any,v2: any) {return cmp(preprocess(uf(v1)), preprocess(uf(v2)));}
        }
        if(opt.direction === -1) return function(v1: any,v2: any){return -f(v1,v2)};
        return f;
    }

    /* adds a secondary compare function to the target function (`this` context)
       which is applied in case the first one returns 0 (equal)
       returns a new compare function, which has a `thenBy` method as well */
    function tb(this: any, func: any, opt: any) {
        /* should get value false for the first call. This can be done by calling the 
        exported function, or the firstBy property on it (for es6 module compatibility)
        */
        const x = (typeof(this) == "function" && !this.firstBy) ? this : false;
        const y = makeCompareFunction(func, opt);
        const f = x ? function(a: any, b: any) {
                        return x(a,b) || y(a,b);
                    }
                  : y;
        f.thenBy = tb;
        return f;
    }
    tb.firstBy = tb;
    return tb;
})();