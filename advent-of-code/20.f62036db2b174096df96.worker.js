self.webpackChunk([20],{"2tT0":function(t,e,r){"use strict";r.d(e,"a",function(){return n});class n{constructor(t){this._input=t.trim()}readLineByLine(t){const e=this._input.split(this.getSeperator()).filter(t=>t.length>0);return t?e.map(t):e}readEntriesSeperatedByWhiteline(t){const e=this._input.split(this.getSeperator()),r=[];let n=[];return e.forEach(t=>{0===t.length?n.length>0&&(r.push(n),n=[]):n.push(t)}),n.length>0&&r.push(n),t?r.map(t):r}getSeperator(){return-1===this._input.indexOf("\r")?"\n":-1===this._input.indexOf("\n")?"\r":"\r\n"}}},c9Jt:function(t,e,r){"use strict";r.r(e),r.d(e,"dayEighteenPartOne",function(){return s});var n=r("2tT0");function s(t){return new n.a(t).readLineByLine(function(t){let e=[];class r{constructor(t){this.afterBracketOps=t,this.state=new i}read(t){return this.state instanceof r?(this.state=this.state.read(t),this):")"===t?(e.push(...this.afterBracketOps),new i):(this.state=this.state.read(t),this)}}class n{constructor(t,e){this.operation=t,this.left=e}read(t){const n=t.charCodeAt(0);if(n>=48&&n<=57)return this.left&&e.push(this.left),e.push(Number(t)),e.push(this.operation),new i;if("("===t)return new r(this.left?[this.left,this.operation]:[this.operation]);throw new Error("Unknown operation in state "+this.constructor.name)}}class s{constructor(t){this.left=t}read(t){switch(t){case"+":case"*":return new n(t,this.left);default:throw new Error("Unknown operation in state "+this.constructor.name)}}}class i{read(t){const e=t.charCodeAt(0);if(e>=48&&e<=57)return new s(Number(t));if("("===t)return new r([]);if("*"===t||"+"===t)return new n(t);throw new Error(`Unknown operation [${t}] in state ${this.constructor.name}`)}}let o=new i;for(const a of t)" "!==a&&(o=o.read(a));return e}).map(function(t){let e=[];const r=()=>{const t=e.pop();if(void 0===t)throw new Error("Attempted to pop a value from the stack but there was no value left!");return t};for(const n of t)switch(n){case"*":e.push(r()*r());break;case"+":e.push(r()+r());break;default:e.push(n)}return r()}).reduce((t,e)=>t+e,0)}}});