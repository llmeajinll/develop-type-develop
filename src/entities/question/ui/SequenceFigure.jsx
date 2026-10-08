// fig: {cols:[참여자...], rows:[[답변 줄 번호, from, to, 라벨]...]}, from === to 이면 그 자리에서 하는 일
// 지금 치는 줄(line)의 화살표를 강조. line이 -1이면(읽기 모드) 강조 없이 전부 보여줌
export function SequenceFigure({ fig, line }){
  return (
    <figure className="seq" style={{'--n': fig.cols.length}} aria-label="통신 순서 그림">
      {fig.cols.map((c, i) => <div key={'c' + i} className="seq-col" style={{gridColumn:i + 1, gridRow:1}}>{c}</div>)}
      {fig.cols.map((_, i) => <div key={'l' + i} className="seq-life" style={{gridColumn:i + 1, gridRow:`2 / span ${fig.rows.length}`}}></div>)}
      {fig.rows.map(([at, from, to, label], r) => {
        const state = line < 0 ? 'read' : at < line ? 'done' : at === line ? 'live' : 'todo'
        const span = Math.abs(to - from) + 1
        const dir = from === to ? ' self' : to < from ? ' left' : ''
        return (
          <div key={r} className={`seq-msg is-${state}${dir}`} style={{gridColumn:`${Math.min(from, to) + 1} / span ${span}`, gridRow:r + 2, '--span':span}}>
            <span>{label}</span>
          </div>
        )
      })}
    </figure>
  )
}
