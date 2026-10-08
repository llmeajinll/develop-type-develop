import { useEffect, useRef } from 'react'
import { fmtTime } from '@/shared/lib'

export function ResultCard({ result, answer, onAgain, onNext }){
  const ref = useRef(null), nextRef = useRef(null)

  useEffect(() => {
    nextRef.current.focus({preventScroll:true})
    ref.current.scrollIntoView({block:'nearest', behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth'})
  }, [])

  return (
    <section className="result" ref={ref}>
      <h3>답변 완료</h3>
      <div className="stats">
        <span>정확도<b>{result.acc}%</b></span>
        <span>평균 타수<b>{result.speed == null ? '—' : result.speed + '타'}</b></span>
        <span>걸린 시간<b>{fmtTime(result.secs)}</b></span>
      </div>
      <p className="say">이제 화면에서 눈을 떼고 소리 내서 한 번 답해보세요. 막힌 부분이 다음에 다시 칠 곳이에요.</p>
      <details><summary>전체 답변 보기</summary><p>{answer.join(' ')}</p></details>
      <div className="controls">
        <button type="button" className="btn" onClick={onAgain}>한 번 더</button>
        <button type="button" className="btn primary" ref={nextRef} onClick={onNext}>다음 질문</button>
      </div>
    </section>
  )
}
