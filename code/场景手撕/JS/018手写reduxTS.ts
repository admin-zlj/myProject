type CbList = (() => void) | null;
type Action = { type: string; payload?: any };
type Reducer<S> = (preState: S, action: Action) => S;

class MyCreatStore<S> {
  private cbList: CbList[];
  private reducer: Reducer<S>;
  private state: S;
  constructor(reducer: Reducer<S>, initState: S) {
    this.reducer = reducer;
    this.state = initState;
    this.cbList = [];
  }

  dispatch(action: Action) {
    this.state = this.reducer(this.state, action);
    this.cbList.forEach((cb) => cb && cb());
  }

  subscibe(cb: CbList) {
    this.cbList.push(cb);
    let index = this.cbList.length - 1;
    return () => {
      this.cbList[index] = null;
    };
  }

  getState() {
    return this.state;
  }
}

const pre: {} = {};
const reducer = (pre: {}, action: { type: string; payload?: any }) => pre;
let s = new MyCreatStore(reducer, pre);
let dis = s.subscibe(() => {
  console.log('111', 111);
});
s.dispatch({ type: '' });
dis();
