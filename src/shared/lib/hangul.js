const DOUBLE_JUNG = new Set([9,10,11,14,15,16,19])
const DOUBLE_JONG = new Set([3,5,6,9,10,11,12,13,14,15,18])

// 두벌식 기준 한 글자를 치는 데 필요한 타수
export function strokes(ch){
  const c = ch.charCodeAt(0)
  if(c >= 0xAC00 && c <= 0xD7A3){
    const i = c - 0xAC00, jung = Math.floor((i % 588) / 28), jong = i % 28
    return 1 + (DOUBLE_JUNG.has(jung) ? 2 : 1) + (jong === 0 ? 0 : DOUBLE_JONG.has(jong) ? 2 : 1)
  }
  return 1
}
