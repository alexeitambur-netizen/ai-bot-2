const E=require('./signal-engine.js');
function candles(n, mode='trend') {
 let a=[], p=1.1000, t=1700000000000;
 for(let i=0;i<n;i++){
  let d= mode==='trend' ? 0.00008 : (Math.sin(i/2)*0.00008);
  let o=p, c=p+d, h=Math.max(o,c)+0.00002, l=Math.min(o,c)-0.00002;
  a.push({t:t+i*60000,open:o,high:h,low:l,close:c}); p=c;
 }
 return a;
}
let good=candles(240);
let out=E.decide({m1:good,now:good.at(-1).t+60000,lastTickAt:good.at(-1).t});
if(!out || !['UP','DOWN','NO_TRADE'].includes(out.direction)) throw Error('bad output');
let broken=good.slice(); broken[100]={...broken[100],high:broken[100].close-1};
let bad=E.decide({m1:broken});
if(bad.direction!=='NO_TRADE'||!bad.reason.includes('повреждена')) throw Error('malformed candles not rejected');
let ticks=Array.from({length:100},(_,i)=>({t:good.at(-1).t+i*100,price:1.5+i*0.001}));
let baseline=E.decide({m1:good});
let withTicks=E.decide({m1:good,ticks,now:good.at(-1).t+60000,lastTickAt:good.at(-1).t});
if(baseline.direction!==withTicks.direction) throw Error('ticks override analysis');
let stats=E.backtest(good,'TEST');
if(!stats || !stats.all || stats.evaluatedBars<=0) throw Error('backtest failed');
console.log(JSON.stringify({decision:out.direction,score:out.score,malformed:bad.direction,tickInvariant:baseline.direction===withTicks.direction,backtestBars:stats.evaluatedBars,signals:stats.all.total,winRate:stats.all.winRate},null,2));
