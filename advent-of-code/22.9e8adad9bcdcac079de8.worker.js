self.webpackChunk([22],{"2tT0":function(e,t,r){"use strict";r.d(t,"a",function(){return n});class n{constructor(e){this._input=e.trim()}readLineByLine(e){const t=this._input.split(this.getSeperator()).filter(e=>e.length>0);return e?t.map(e):t}readAsTwoDimensionalArray(e){return this.readLineByLine().map(t=>{const r=t.split("");return e?r.map(e):r})}readEntriesSeperatedByWhiteline(e){const t=this._input.split(this.getSeperator()),r=[];let n=[];return t.forEach(e=>{0===e.length?n.length>0&&(r.push(n),n=[]):n.push(e)}),n.length>0&&r.push(n),e?r.map(e):r}getSeperator(){return-1===this._input.indexOf("\r")?"\n":-1===this._input.indexOf("\n")?"\r":"\r\n"}}},"77Z3":function(e,t,r){"use strict";r.r(t),r.d(t,"dayNineteenPartOne",function(){return i});var n=r("2tT0");function i(e){const t=new Map;function r(e){const r=t.get(e);if(!r)throw new Error("Rule id not found: "+e);return r}class i{constructor(e){this._letter=e,this.length=1}isValid(e){return this._letter===e}}class s{constructor(e){if(this._reference=e,!this._reference)throw new Error("Reference should be value. Got: "+e)}get length(){return r(this._reference).length}isValid(e){return r(this._reference).isValid(e)}}class u{constructor(e,t){this._leftRuleNumber=e,this._rightRuleNumber=t}get length(){return this._leftRuleNumber.length}isValid(e){return this._leftRuleNumber.isValid(e)||this._rightRuleNumber.isValid(e)}}class l{constructor(e,t){if(this._leftRuleNumber=e,this._rightRuleNumber=t,!e||!t)throw new Error(`Rule number(s) are invalid: ${e} ${t}`)}get length(){return r(this._leftRuleNumber).length+r(this._rightRuleNumber).length}isValid(e){const t=r(this._leftRuleNumber),n=r(this._rightRuleNumber),i=t.length;return i+n.length===e.length&&t.isValid(e.substr(0,i))&&n.isValid(e.substr(i))}}const h=new Map,o=[],a=new n.a(e),c=/^(\d+): (.+)$/,f=/^[ab]+$/;function d(e){if(-1!==e.indexOf('"'))return new i(JSON.parse(e));const t=e.split(" | ").map(e=>e.split(" ").map(Number));function r(e){switch(e.length){case 1:return new s(e[0]);case 2:return new l(e[0],e[1]);default:throw new Error("Found more then 3 numbers in a single operation")}}if(0===t.length||t.length>2)throw new Error("This should never happened");return 1===t.length?r(t[0]):new u(r(t[0]),r(t[1]))}a.readLineByLine(e=>{const t=c.exec(e),r=f.exec(e);if(!t&&!r)throw new Error("Invalid parsed line: "+e);t&&h.set(Number(t[1]),t[2]),r&&o.push(e)});for(const[n,m]of h)t.set(n,d(m));const g=r(0);let p=0;for(const n of o)g.isValid(n)&&p++;return p}}});