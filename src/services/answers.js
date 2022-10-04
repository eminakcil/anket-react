import { deleteRequest, get, postJSON } from './request'

export const getById = (id) => get(`answers/${id}`)
export const list = () => get('answers')
export const newAnswer = (data) => postJSON('answers', data)
export const remove = (id) => deleteRequest('answers', { id })
