import { ModeToggle } from '@/features/switch-mode'

export function Header({ mode, onModeChange, doneCount, total }){
  return (
    <header className="top">
      <h1>면접 답변 타자연습</h1>
      <ModeToggle mode={mode} onChange={onModeChange} />
      <div className="overall">완료 <b>{doneCount}</b> / <span>{total}</span></div>
    </header>
  )
}
