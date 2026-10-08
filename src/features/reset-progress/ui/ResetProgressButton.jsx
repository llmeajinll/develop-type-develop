export function ResetProgressButton({ onReset }){
  return <button type="button" className="btn quiet" onClick={() => confirm('완료 기록을 모두 지울까요? 직접 추가한 질문은 남아요.') && onReset()}>기록 초기화</button>
}
