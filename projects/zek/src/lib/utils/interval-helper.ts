
export interface ITimeout {
  id: number;
  callback: string;
  interval: number;
  createdAt: Date;
}

export class IntervalHelper {
  private static _timeouts: ITimeout[] = [];

  static create(callback: Function, ms: number) {
    const id = setInterval(() => {
      callback();
    }, ms);

    const timeout = {
      id: +id,
      callback: callback.toString(),
      interval: ms,
      createdAt: new Date()
    } as ITimeout;
    this._timeouts.push(timeout);
    return timeout;
  }

  static clear(id: number) {
    const index = this._timeouts.findIndex(x => x.id === id);
    if (index !== -1) {
      clearInterval(id);
      this._timeouts.splice(index, 1);
      return true;
    }
    return false;
  }

  static clearAll() {
    for (const timeout of this._timeouts) {
      this.clear(timeout.id);
    }
    this._timeouts = [];
  }
}