import { useRef } from 'react'
import { CUSTOM_CAT } from '@/entities/question'
import { splitAnswer } from '../lib/splitAnswer.js'

export function AddQuestion({ onAdd }){
  const dlgRef = useRef(null), formRef = useRef(null)

  function open(){
    formRef.current.reset()
    dlgRef.current.returnValue = ''
    dlgRef.current.showModal()
  }
  function onClose(){
    if(dlgRef.current.returnValue !== 'ok') return
    const f = formRef.current.elements
    const q = f.q.value.trim(), a = splitAnswer(f.a.value)
    if(!q || !a.length) return
    const kw = f.k.value.split(',').map(s => s.trim()).filter(Boolean)
    onAdd({id:'c' + Date.now(), cat:CUSTOM_CAT, q, a, kw, custom:true})
  }

  return (
    <>
      <button type="button" className="btn" onClick={open}>질문 추가</button>
      <dialog ref={dlgRef} onClose={onClose}>
        <form method="dialog" className="dlg" ref={formRef}>
          <h3>질문 추가</h3>
          <label>질문
            <input name="q" required placeholder="예: 실행 컨텍스트란 무엇인가요?" />
          </label>
          <label>답변
            <textarea name="a" required placeholder="면접에서 말할 답변을 적어주세요."></textarea>
            <small>문장마다 한 줄씩 나눠서 연습해요. 줄바꿈이나 마침표로 문장을 구분해요.</small>
          </label>
          <label>키워드 <small>쉼표로 구분, 선택</small>
            <input name="k" placeholder="예: 렉시컬 환경, 콜 스택" />
          </label>
          <div className="dlg-actions">
            <button type="submit" className="btn" value="cancel" formNoValidate>취소</button>
            <button type="submit" className="btn primary" value="ok">추가</button>
          </div>
        </form>
      </dialog>
    </>
  )
}
