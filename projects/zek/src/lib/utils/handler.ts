
export const handler = (function () {
    let i = 1;
    const listeners: any = {};

    return {
        addListener: function (element: HTMLElement | Window, event: string, handler: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions) {
            element.addEventListener(event, handler, options);            
            listeners[i] = {
                element: element,
                event: event,
                handler: handler,
                options: options,
            };
            return i++;
        },
        removeListener: function (id: number) {
            if (id in listeners) {
                const h = listeners[id];
                
                h.element.removeEventListener(h.event, h.handler, h.options);
                delete listeners[id];
            }
        }
    };
}());