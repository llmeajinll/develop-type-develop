import { useState } from 'react'
import { useProgressStore } from '@/entities/progress'
import { CUSTOM_CAT, QUESTIONS } from '@/entities/question'
import { ALL_CAT, filterQuestions, getCategories } from '@/features/filter-questions'
import { useTypingSession } from '@/features/typing-session'
import { Header } from '@/widgets/header'
import { QuestionSidebar } from '@/widgets/question-sidebar'
import { TypingBoard } from '@/widgets/typing-board'

export function PracticePage(){
  const progress = useProgressStore()
  const [filterCat, setFilterCat] = useState(ALL_CAT)
  const [onlyTodo, setOnlyTodo] = useState(false)
  const [listOpen, setListOpen] = useState(false) // 모바일에서만 쓰는 목록 오버레이

  const all = QUESTIONS.concat(progress.custom)
  const cats = getCategories(progress.custom.length > 0)
  const cat = cats.includes(filterCat) ? filterCat : ALL_CAT
  const filtered = (c = cat, qs = all) => filterQuestions(qs, {cat:c, onlyTodo, done:progress.done})
  const list = filtered()
  const reading = progress.mode === 'read'
  const doneCount = all.filter(q => progress.done[q.id]).length

  const session = useTypingSession(all.find(q => q.id === progress.lastId) || QUESTIONS[0], { onFinish: progress.recordResult })
  const cur = session.sess.q

  function loadQuestion(q){
    session.load(q)
    progress.setLastId(q.id)
    setListOpen(false)
  }
  function step(dir){
    if(!list.length) return
    const i = list.findIndex(q => q.id === cur.id)
    const n = i === -1 ? (dir > 0 ? 0 : list.length - 1) : (i + dir + list.length) % list.length
    loadQuestion(list[n])
  }
  function randomQ(){
    const l = list.length > 1 ? list.filter(q => q.id !== cur.id) : list
    if(l.length) loadQuestion(l[Math.floor(Math.random() * l.length)])
  }
  function selectCat(c){
    setFilterCat(c)
    if(listOpen) return // 모바일 목록에서는 분류만 바꾸고, 질문은 직접 고르게 둠
    const l = filtered(c)
    if(l.length && !l.some(q => q.id === cur.id)) loadQuestion(l[0])
    else session.focus()
  }
  function changeMode(m){
    progress.setMode(m)
    session.focus()
  }
  function addQuestion(item){
    progress.addCustom(item)
    setFilterCat(CUSTOM_CAT)
    loadQuestion(item)
  }
  function deleteCurrent(){
    progress.removeCustom(cur.id)
    loadQuestion(filtered(cat, all.filter(q => q.id !== cur.id))[0] || QUESTIONS[0])
  }

  return (
    <>
      <Header mode={progress.mode} onModeChange={changeMode} doneCount={doneCount} total={all.length} onOpenList={() => setListOpen(true)} />
      <div className={'layout' + (listOpen ? ' is-list-open' : '')}>
        <QuestionSidebar
          filterProps={{cats, active:cat, questions:all, onSelect:selectCat, onOnlyTodoChange:setOnlyTodo}}
          list={list} done={progress.done} onlyTodo={onlyTodo} currentId={cur.id}
          onPick={loadQuestion} onAdd={addQuestion} onReset={progress.resetDone}
          open={listOpen} onClose={() => setListOpen(false)}
        />
        <TypingBoard
          session={session} reading={reading} doneCount={doneCount} total={all.length}
          onRestart={() => loadQuestion(cur)} onPrev={() => step(-1)} onNext={() => step(1)}
          onRandom={randomQ} onDelete={deleteCurrent}
        />
      </div>
    </>
  )
}
