self.webpackChunk([18],{"2tT0":function(e,r,t){"use strict";t.d(r,"a",function(){return n});class n{constructor(e){this._input=e.trim()}readLineByLine(e){const r=this._input.split(this.getSeperator()).filter(e=>e.length>0);return e?r.map(e):r}readAsTwoDimensionalArray(e){return this.readLineByLine().map(r=>{const t=r.split("");return e?t.map(e):t})}readEntriesSeperatedByWhiteline(e){const r=this._input.split(this.getSeperator()),t=[];let n=[];return r.forEach(e=>{0===e.length?n.length>0&&(t.push(n),n=[]):n.push(e)}),n.length>0&&t.push(n),e?t.map(e):t}getSeperator(){return-1===this._input.indexOf("\r")?"\n":-1===this._input.indexOf("\n")?"\r":"\r\n"}}},DcO0:function(e,r,t){"use strict";t.r(r),t.d(r,"daySixteenPartTwo",function(){return i});var n=t("2tT0");function i(e){const r=/([a-z ]+): (\d+)-(\d+) or (\d+)-(\d+)/;class t{constructor(e){const t=r.exec(e);if(!t)throw new Error("Unknown ticket rule: "+e);const[,n,i,s,a,o]=t;this.name=n,this._validNumbers=new Set([...this.validNumbersForRange([Number(i),Number(s)]),...this.validNumbersForRange([Number(a),Number(o)])])}validNumbers(){return Array.from(this._validNumbers.values())}isInRange(e){return this._validNumbers.has(e)}validNumbersForRange([e,r]){return Array.from({length:r-e+1}).map((r,t)=>t+e)}}function i(e){const r=e.split(",").map(Number);if(r.some(Number.isNaN))throw new Error("Invalid ticket value found");return r}const s=new n.a(e),[a,[,o],[,...u]]=s.readEntriesSeperatedByWhiteline(),l=i(o),c=a.map(e=>new t(e)),h=c.reduce((e,r)=>(r.validNumbers().forEach(r=>e.add(r)),e),new Set),m=[o,...u].map(i).filter(e=>e.every(e=>h.has(e))),f=new Map;for(const n of c)for(let e=0;e<c.length;e++)if(m.every(r=>n.isInRange(r[e]))){let r=f.get(n);r||f.set(n,r=[]),r.push(e)}const d=new Map;if(f.size!==c.length)throw new Error("Failed to map all column possibilities");let p=!0;for(;p;){p=!1;for(const[e,r]of Array.from(f.entries()))if(1===r.length){const t=r[0];d.set(e,t),Array.from(f.values()).forEach(e=>{const r=e.indexOf(t);-1!==r&&e.splice(r,1)}),p=!0}}if(d.size!==c.length)throw new Error("Failed to map all columns");for(const n of Array.from(d.keys()))n.name.startsWith("departure")||d.delete(n);return Array.from(d.values()).reduce((e,r)=>e*l[r],1)}}});