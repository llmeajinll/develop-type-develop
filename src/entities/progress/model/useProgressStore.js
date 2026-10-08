import { useEffect, useState } from 'react'

const KEY = 'interview-typing-v1'

function load(){
  try{
    const s = JSON.parse(localStorage.getItem(KEY))
    if(s && typeof s === 'object'){
      return {done:s.done||{}, custom:Array.isArray(s.custom)?s.custom:[], mode:s.mode==='recall'?'recall':'follow', lastId:s.lastId||null}
    }
  }catch{ /* 저장소 접근 불가 시 기본값 */ }
  return {done:{}, custom:[], mode:'follow', lastId:null}
}

// 완료 기록, 직접 추가한 질문, 연습 방식, 마지막 질문을 localStorage에 보관
export function useProgressStore(){
  const [store, setStore] = useState(load)
  useEffect(() => { try{ localStorage.setItem(KEY, JSON.stringify(store)) }catch{ /* ignore */ } }, [store])

  return {
    ...store,
    setMode: mode => setStore(s => ({...s, mode})),
    setLastId: id => setStore(s => s.lastId === id ? s : {...s, lastId:id}),
    recordResult: (id, acc) => setStore(s => {
      const prev = s.done[id] || {reps:0, best:0}
      return {...s, done:{...s.done, [id]:{reps: prev.reps + 1, best: Math.max(prev.best, acc)}}}
    }),
    resetDone: () => setStore(s => ({...s, done:{}})),
    addCustom: item => setStore(s => ({...s, custom:[...s.custom, item]})),
    removeCustom: id => setStore(s => {
      const {[id]: _removed, ...done} = s.done
      return {...s, custom: s.custom.filter(q => q.id !== id), done}
    }),
  }
}
