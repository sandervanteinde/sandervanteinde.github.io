self.webpackChunk([16],{"2tT0":function(r,t,e){"use strict";e.d(t,"a",function(){return n});class n{constructor(r){this._input=r.trim()}readLineByLine(r){const t=this._input.split(this.getSeperator()).filter(r=>r.length>0);return r?t.map(r):t}readAsTwoDimensionalArray(r){return this.readLineByLine().map(t=>{const e=t.split("");return r?e.map(r):e})}readEntriesSeperatedByWhiteline(r){const t=this._input.split(this.getSeperator()),e=[];let n=[];return t.forEach(r=>{0===r.length?n.length>0&&(e.push(n),n=[]):n.push(r)}),n.length>0&&e.push(n),r?e.map(r):e}getSeperator(){return-1===this._input.indexOf("\r")?"\n":-1===this._input.indexOf("\n")?"\r":"\r\n"}}},ataB:function(r,t,e){"use strict";e.r(t),e.d(t,"dayFourteenPartTwo",function(){return i});var n=e("2tT0");function i(r){const t=new n.a(r),e=/^mask = ([01X]+)$/,i=/^mem\[(\d+)\] = (\d+)$/,o=t.readLineByLine(function(r){const t=i.exec(r);if(t)return n=Number(t[1]),o=Number(t[2]),{perform:r=>{const t=function(r,t){const e=function(r){const t=[];for(let e=0;0!==r;e++){const n=Math.pow(2,e);(r&n)===n?(t.push("1"),r-=n):t.push("0")}return t}(r);return function(r){return r.reduce((r,t,e)=>{if("0"===t)return r;const n=Math.pow(2,e);return"X"===t?[...r,...r.map(r=>r+n)]:r.map(r=>r+n)},[0])}(t.map((r,t)=>{var n;return"0"===r?null!==(n=e[t])&&void 0!==n?n:"0":r}))}(n,r.mask);for(const e of t)r.memory.set(e,o)}};var n,o;const s=e.exec(r);if(s)return(u=s[1].split("")).reverse(),{perform:r=>r.mask=u};var u;throw new Error("Invalid line: "+r)}),s={mask:[],memory:new Map};for(const n of o)n.perform(s);return Array.from(s.memory.values()).reduce((r,t)=>r+t,0)}}});