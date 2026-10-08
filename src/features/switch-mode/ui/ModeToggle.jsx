const MODES = [['follow','따라치기'], ['recall','기억해서 치기']]

export function ModeToggle({ mode, onChange }){
  return (
    <div className="seg" role="group" aria-label="연습 방식">
      {MODES.map(([m, label]) => (
        <button key={m} type="button" aria-pressed={mode === m} onClick={() => onChange(m)}>{label}</button>
      ))}
    </div>
  )
}
