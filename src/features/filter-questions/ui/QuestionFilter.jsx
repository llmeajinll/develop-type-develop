import { useEffect, useRef, useState } from 'react'
import { ALL_CAT } from '../model/filter.js'

export function QuestionFilter({ cats, active, questions, done, onSelect, onlyTodo, onOnlyTodoChange }){
  const [open, setOpen] = useState(false) // 모바일: 평소엔 가로 스크롤, 펼치면 전부 보임
  const boxRef = useRef(null)

  // 양 끝에 더 넘길 탭이 있을 때만 그쪽 끝을 흐리게(CSS가 data-start/data-end를 봄)
  // ponytail: 창 크기 변경은 감지 안 함. 다음 스크롤 때 맞춰짐
  const markEdges = () => {
    const box = boxRef.current
    box.dataset.start = box.scrollLeft <= 1
    box.dataset.end = box.scrollLeft + box.clientWidth >= box.scrollWidth - 1
  }

  // 접힌 상태에서 선택한 탭을 가운데로. scrollIntoView는 바깥 페이지까지 움직일 수 있어서 이 상자만 직접 스크롤
  useEffect(() => {
    const box = boxRef.current, chip = box.querySelector('[aria-pressed="true"]')
    if(!open && chip) box.scrollLeft += chip.getBoundingClientRect().left - box.getBoundingClientRect().left - (box.clientWidth - chip.offsetWidth) / 2
    markEdges()
  }, [active, open])

  // 마우스 휠(세로)을 가로 스크롤로. 트랙패드의 가로 스와이프는 브라우저 기본 동작에 맡김
  const onWheel = e => {
    if(Math.abs(e.deltaY) > Math.abs(e.deltaX)) boxRef.current.scrollBy({ left: e.deltaY, behavior: 'instant' })
  }
  return (
    <>
      <div className="cats-wrap">
        <div id="cat-list" ref={boxRef} className={'cats' + (open ? ' is-open' : '')} onWheel={onWheel} onScroll={markEdges}>
          {cats.map(c => {
            const qs = c === ALL_CAT ? questions : questions.filter(q => q.cat === c)
            const d = qs.filter(q => done[q.id]).length
            return <button key={c} type="button" className="chip" aria-pressed={c === active} onClick={() => onSelect(c)}>{c}<span className="chip-n">{d}/{qs.length}</span></button>
          })}
        </div>
        <button type="button" className="cats-toggle" aria-controls="cat-list" aria-expanded={open} aria-label={open ? '분류 접기' : '분류 모두 보기'} onClick={() => setOpen(o => !o)}>
          <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true"><path d="m6 9 6 6 6-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </button>
      </div>
      <label className="todo-toggle"><input type="checkbox" checked={onlyTodo} onChange={e => onOnlyTodoChange(e.target.checked)} /> 안 푼 것만</label>
    </>
  )
}
