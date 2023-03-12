export var handler = (function () {
    var i = 1;
    var listeners: any = {};

    return {
        addListener: function (element: HTMLElement, event: string, handler: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions) {
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
                var h = listeners[id];
                h.element.removeEventListener(h.event, h.handler, h.options);
                delete listeners[id];
            }
        }
    };
}());