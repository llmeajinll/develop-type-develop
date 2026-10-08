function lineSpans(target, typed, state, composing){
  const tl = typed.length, out = []
  for(let j = 0; j < target.length; j++){
    const c = target[j]
    let cls, shown = c
    if(state === 'todo'){
      cls = 'todo'
    }else if(j < tl){
      if(state === 'live' && composing && j === tl-1){ cls = 'comp'; shown = typed[j] }
      else if(typed[j] === c) cls = 'ok'
      else { cls = 'bad'; shown = typed[j] } // 틀린 자리엔 실제로 친 글자를 보여줌
    }else if(state === 'done'){
      cls = 'miss'
    }else{
      cls = j === tl ? 'todo caret' : 'todo'
    }
    out.push(<span key={j} className={cls}>{shown}</span>)
  }
  if(tl > target.length) out.push(<span key="over" className="over">{typed.slice(target.length)}</span>)
  if(state === 'live' && tl >= target.length) out.push(<span key="end" className="caret end" aria-hidden="true"></span>)
  return out
}

export function AnswerLines({ sess }){
  return (
    <div className="sheet">
      <ol className="lines">
        {sess.q.a.map((t, i) => {
          const state = i < sess.lineIdx ? 'done' : i === sess.lineIdx ? 'live' : 'todo'
          const typed = state === 'done' ? sess.typedLines[i] : state === 'live' ? sess.value : ''
          return <li key={i} className={`line is-${state}`}>{lineSpans(t, typed, state, sess.composing)}</li>
        })}
      </ol>
    </div>
  )
}
