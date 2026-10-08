// 줄바꿈과 문장부호(. ? !) 기준으로 답변을 연습할 줄 단위로 나눔
export function splitAnswer(t){
  return t.split(/\n+/).flatMap(p => p.split(/(?<=[.?!])\s+/)).map(s => s.trim()).filter(Boolean)
}
