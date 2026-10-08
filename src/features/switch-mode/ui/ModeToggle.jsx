// 두 가지 연습 방식을 켜고 끄는 스위치: 끄면 따라치기, 켜면 읽기
export function ModeToggle({ mode, onChange }){
  const reading = mode === 'read'
  return (
    <button type="button" role="switch" aria-checked={reading} aria-label="읽기 모드" className="mode-switch" onClick={() => onChange(reading ? 'follow' : 'read')}>
      <span className="lbl-follow" aria-hidden="true">따라치기</span>
      <span className="switch-track" aria-hidden="true"><span className="switch-thumb"></span></span>
      <span className="lbl-read" aria-hidden="true">읽기</span>
    </button>
  )
}
