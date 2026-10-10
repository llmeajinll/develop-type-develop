// 두 가지 연습 방식을 켜고 끄는 스위치: 끄면 따라치기, 켜면 읽기
export function ModeToggle({ mode, onChange }){
  const reading = mode === 'read'
  return (
    <button type="button" role="switch" aria-checked={reading} aria-label="읽기 모드" className="mode-switch" onClick={() => onChange(reading ? 'follow' : 'read')}>
      <span className="switch-track" aria-hidden="true">
        <span className="switch-thumb"></span>
        <span className="lbl-follow">치기</span>
        <span className="lbl-read">읽기</span>
      </span>
    </button>
  )
}
