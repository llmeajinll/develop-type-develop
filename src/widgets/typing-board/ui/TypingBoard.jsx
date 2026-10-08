import { useEffect, useRef } from 'react'
import { DeleteQuestionButton } from '@/features/delete-question'
import { SequenceFigure } from '@/entities/question'
import { AnswerLines, TypingInput } from '@/features/typing-session'
import { ResultCard } from './ResultCard.jsx'

// 버튼을 눌러도 입력창 포커스(한글 조합)가 끊기지 않게
const keepFocus = e => e.preventDefault()
// 모바일은 키보드가 화면 아래를 가리므로 치는 줄을 화면 위쪽으로 올림
const isMobile = () => matchMedia('(max-width: 860px)').matches

export function TypingBoard({ session, recall, doneCount, total, onRestart, onPrev, onNext, onRandom, onDelete }){
  const { sess, finished, live } = session
  const cur = sess.q
  const kw = cur.kw || []
  const boardRef = useRef(null)
  // 중괄호 필수: 최신 크롬은 scrollIntoView가 Promise를 반환해서, 그대로 return하면 React가 클린업 함수로 착각함
  // 첫 줄은 질문 바로 아래라 이미 보임. 올리면 오히려 질문 제목이 가려짐
  const showLiveLine = () => { if(sess.lineIdx > 0) boardRef.current?.querySelector('.line.is-live')?.scrollIntoView({block: isMobile() ? 'start' : 'nearest'}) }
  useEffect(showLiveLine, [sess.lineIdx])

  return (
    <main className="stage">
      <div className="stage-inner" ref={boardRef} onClick={session.focus} onFocus={() => isMobile() && setTimeout(showLiveLine, 300)}>
        <div className="qhead">
          <span className="cat-tag">{cur.cat}</span>
          {/* 모바일에서는 완료 내역을 헤더 대신 분류 태그 옆에 표시 */}
          <span className="overall stage-overall">완료 <b>{doneCount}</b> / {total}</span>
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
