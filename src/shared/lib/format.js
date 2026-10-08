export function fmtTime(s){ const m = Math.floor(s/60), r = s%60; return m ? `${m}분 ${r}초` : `${r}초` }
