import { CATS, CUSTOM_CAT } from '@/entities/question'

export const ALL_CAT = '전체'

export function getCategories(hasCustom){
  return [ALL_CAT, ...CATS, ...(hasCustom ? [CUSTOM_CAT] : [])]
}

export function filterQuestions(questions, { cat, onlyTodo, done }){
  return questions.filter(q => (cat === ALL_CAT || q.cat === cat) && (!onlyTodo || !done[q.id]))
}
