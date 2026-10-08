export function TypingInput({ inputProps }){
  return (
    <div className="typer-wrap">
      <input
        {...inputProps} className="typer" type="text"
        autoComplete="off" autoCorrect="off" autoCapitalize="off" spellCheck={false} aria-label="현재 줄을 입력하세요"
      />
      <p className="help">회색 글자를 그대로 따라 치세요. 다 치면 자동으로, 또는 Enter로 다음 줄로 넘어가요.</p>
      <p className="help blur-hint">입력이 멈췄어요. 본문을 클릭하면 이어서 칠 수 있어요.</p>
    </div>
  )
}
