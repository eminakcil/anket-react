import { deleteRequest, get, postJSON } from './request'

export const getById = (id) => get(`surveys/${id}`)
export const list = () => get('surveys')
export const answerList = (id) => get(`surveys/${id}/answers`)
export const newSurvey = (data) => postJSON('surveys', data)
export const remove = (id) => deleteRequest('surveys', { id })
