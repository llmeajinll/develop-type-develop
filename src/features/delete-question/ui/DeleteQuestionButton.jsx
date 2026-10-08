export function DeleteQuestionButton({ onDelete }){
  return <button type="button" className="btn quiet" onClick={() => confirm('이 질문을 삭제할까요?') && onDelete()}>이 질문 삭제</button>
}
