import { ModeToggle } from '@/features/switch-mode'

export function Header({ mode, onModeChange, doneCount, total, onOpenList }){
  return (
    <header className="top">
      <h1><span className="title-full">면접 답변 타자연습</span><span className="title-short" aria-hidden="true">면.답.타</span></h1>
      <button type="button" className="btn list-btn" aria-label="질문 목록" onClick={onOpenList}>
        <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
      </button>
      <ModeToggle mode={mode} onChange={onModeChange} />
      <div className="overall">완료 <b>{doneCount}</b> / <span>{total}</span></div>
    </header>
  )
}
