export function QuestionItem({ question, record, current, onClick }){
  return (
    <button type="button" className={'qitem' + (current ? ' is-current' : '')} aria-current={current ? 'true' : undefined} onClick={onClick}>
      <span className={'mark' + (record ? ' is-done' : '')} aria-hidden="true">{record ? '✓' : ''}</span>
      <span className="qtitle">{question.q}</span>
      {record && <span className="reps">{record.reps}회</span>}
    </button>
  )
}
