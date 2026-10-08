import { useEffect, useRef, useState } from 'react'
import { computeStats, freshSession } from '../lib/stats.js'

export function useTypingSession(initialQuestion, { onFinish }){
  const [sess, setSess] = useState(() => freshSession(initialQuestion, 0))
  // ref mirrors state so IME timeouts / chained handlers always see the latest session
  const sessRef = useRef(sess)
  const inputRef = useRef(null)
  const lastAdvance = useRef(0)
  const [, tick] = useState(0)
  const finished = sess.result != null

  const commit = next => { sessRef.current = next; setSess(next) }
  const set = patch => commit({...sessRef.current, ...patch})
  const focus = () => inputRef.current?.focus({preventScroll:true})

  useEffect(() => {
    if(!sess.startTime || finished) return
    const t = setInterval(() => tick(x => x + 1), 500)
    return () => clearInterval(t)
  }, [sess.startTime, finished])
  useEffect(focus, [sess.n])

  function load(q){ commit(freshSession(q, sessRef.current.n + 1)) }

  function advance(){
    const s = sessRef.current
    if(s.result) return
    const now = Date.now()
    if(now - lastAdvance.current < 200) return
    lastAdvance.current = now
    const target = s.q.a[s.lineIdx]
    let typed = inputRef.current?.value ?? s.value
    if(!/\s$/.test(target)) typed = typed.replace(/\s+$/, '')
    const typedLines = [...s.typedLines]
    typedLines[s.lineIdx] = typed
    const next = {...s, typedLines, lineIdx: s.lineIdx + 1, composing:false, value:'', startTime: s.startTime || now}
    if(next.lineIdx >= s.q.a.length){
      next.endTime = now
      const st = computeStats(next)
      next.result = {acc: st.acc ?? 0, speed: st.speed, secs: Math.max(1, Math.round((now - next.startTime) / 1000))}
      onFinish(s.q.id, next.result.acc)
    }
    commit(next)
  }

  function onType(value){
    const s = sessRef.current
    set({value, startTime: s.startTime || (value ? Date.now() : null)})
    if(!sessRef.current.composing && value === s.q.a[s.lineIdx]) advance()
  }

  const inputProps = {
    ref: inputRef,
    value: sess.value,
    onChange: e => onType(e.target.value),
    onCompositionStart: () => set({composing:true}),
    onCompositionEnd: e => { set({composing:false}); onType(e.currentTarget.value) },
    onKeyDown: e => {
      if(e.key !== 'Enter') return
      if(e.nativeEvent.isComposing || e.keyCode === 229) setTimeout(advance, 30)
      else { e.preventDefault(); advance() }
    },
  }

  return { sess, finished, live: computeStats(sess), load, focus, inputProps }
}
