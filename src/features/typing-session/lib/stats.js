import { strokes } from '@/shared/lib'

export function freshSession(q, n){
  return {q, n, lineIdx:0, typedLines:[], value:'', composing:false, startTime:null, endTime:null, result:null}
}

function compare(target, typed, committed){
  let ok = 0, st = 0
  const n = Math.min(target.length, typed.length)
  for(let j = 0; j < n; j++) if(typed[j] === target[j]){ ok++; st += strokes(target[j]) }
  return {ok, st, total: committed ? Math.max(target.length, typed.length) : typed.length}
}

export function computeStats(s){
  let ok = 0, total = 0, st = 0
  const add = r => { ok += r.ok; total += r.total; st += r.st }
  for(let i = 0; i < s.lineIdx; i++) add(compare(s.q.a[i], s.typedLines[i], true))
  if(s.lineIdx < s.q.a.length) add(compare(s.q.a[s.lineIdx], s.composing ? s.value.slice(0, -1) : s.value, false))
  const secs = s.startTime ? ((s.endTime ?? Date.now()) - s.startTime) / 1000 : 0
  return {acc: total ? Math.round(ok / total * 100) : null, speed: secs >= 3 ? Math.round(st / (secs / 60)) : null}
}
