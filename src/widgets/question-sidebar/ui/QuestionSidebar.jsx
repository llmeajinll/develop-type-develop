import { useEffect, useRef } from 'react'
import { QuestionItem } from '@/entities/question'
import { AddQuestion } from '@/features/add-question'
import { QuestionFilter } from '@/features/filter-questions'
import { ResetProgressButton } from '@/features/reset-progress'

export function QuestionSidebar({ filterProps, list, done, onlyTodo, currentId, onPick, onAdd, onReset }){
  const listRef = useRef(null)

  useEffect(() => {
    const box = listRef.current, act = box.querySelector('.is-current')
    if(!act) return
    const top = act.offsetTop
    if(top < box.scrollTop || top > box.scrollTop + box.clientHeight - 40) box.scrollTop = top - box.clientHeight/2
  }, [currentId])

  return (
    <aside className="side" aria-label="질문 목록">
      <QuestionFilter {...filterProps} done={done} onlyTodo={onlyTodo} />
      <ul className="qlist" ref={listRef}>
        {!list.length && <li className="empty">{onlyTodo ? '이 분류는 다 끝냈어요. ‘안 푼 것만’을 끄면 다시 연습할 수 있어요.' : '이 분류에 질문이 없어요. 아래에서 직접 추가해보세요.'}</li>}
        {list.map(q => (
          <li key={q.id}>
            <QuestionItem question={q} record={done[q.id]} current={q.id === currentId} onClick={() => onPick(q)} />
          </li>
        ))}
      </ul>
      <div className="side-foot">
        <AddQuestion onAdd={onAdd} />
        <ResetProgressButton onReset={onReset} />
      </div>
    </aside>
  )
}
