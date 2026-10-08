import { DeleteQuestionButton } from '@/features/delete-question'
import { SequenceFigure } from '@/entities/question'
import { AnswerLines, TypingInput } from '@/features/typing-session'
import { ResultCard } from './ResultCard.jsx'

// 버튼을 눌러도 입력창 포커스(한글 조합)가 끊기지 않게
const keepFocus = e => e.preventDefault()

export function TypingBoard({ session, recall, onRestart, onPrev, onNext, onRandom, onDelete }){
  const { sess, finished, live } = session
  const cur = sess.q
  const kw = cur.kw || []

  return (
    <main className="stage">
      <div className="stage-inner" onClick={session.focus}>
        <div className="qhead">
          <span className="cat-tag">{cur.cat}</span>
          <h2>{cur.q}</h2>
          {cur.custom && <DeleteQuestionButton onDelete={onDelete} />}
        </div>
        {kw.length > 0 && <div className="keywords" aria-label="꼭 말할 키워드">{kw.map(k => <span key={k} className="kw">{k}</span>)}</div>}

        <AnswerLines sess={sess} recall={recall} />
        {!finished && <TypingInput inputProps={session.inputProps} recall={recall} />}
        {cur.fig && <SequenceFigure fig={cur.fig} line={sess.lineIdx} recall={recall} />}

        <div className="stats" aria-live="off">
          <span>타수<b>{live.speed == null ? '—' : live.speed + '타'}</b></span>
          <span>정확도<b>{live.acc == null ? '—' : live.acc + '%'}</b></span>
          <span>줄<b>{Math.min(sess.lineIdx + 1, cur.a.length)} / {cur.a.length}</b></span>
        </div>

        {finished ? (
          <ResultCard result={sess.result} hintCount={sess.hintCount} recall={recall} answer={cur.a} onAgain={onRestart} onNext={onNext} />
        ) : (
          <div className="controls">
            {recall && <button type="button" className="btn" onMouseDown={keepFocus} onClick={session.hint}>힌트: 다음 단어</button>}
            <button type="button" className="btn" onMouseDown={keepFocus} onClick={onRestart}>처음부터</button>
            <span className="spacer"></span>
            <button type="button" className="btn" onMouseDown={keepFocus} onClick={onPrev}>이전</button>
            <button type="button" className="btn" onMouseDown={keepFocus} onClick={onRandom}>무작위</button>
            <button type="button" className="btn" onMouseDown={keepFocus} onClick={onNext}>다음</button>
          </div>
        )}
      </div>
    </main>
  )
}
