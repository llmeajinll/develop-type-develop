import { ALL_CAT } from '../model/filter.js'

export function QuestionFilter({ cats, active, questions, done, onSelect, onlyTodo, onOnlyTodoChange }){
  return (
    <>
      <div className="cats">
        {cats.map(c => {
          const qs = c === ALL_CAT ? questions : questions.filter(q => q.cat === c)
          const d = qs.filter(q => done[q.id]).length
          return <button key={c} type="button" className="chip" aria-pressed={c === active} onClick={() => onSelect(c)}>{c}<span className="chip-n">{d}/{qs.length}</span></button>
        })}
      </div>
      <label className="todo-toggle"><input type="checkbox" checked={onlyTodo} onChange={e => onOnlyTodoChange(e.target.checked)} /> 안 푼 것만</label>
    </>
  )
}
