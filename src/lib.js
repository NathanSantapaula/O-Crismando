import { createClient } from '@supabase/supabase-js'
export const sb = createClient(import.meta.env.VITE_SUPABASE_URL, import.meta.env.VITE_SUPABASE_KEY)

export const hoje = () => new Date().toLocaleDateString('sv-SE', { timeZone: 'America/Sao_Paulo' })
export const dataBR = d => d ? new Date(d + 'T12:00').toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' }) : ''
export const AREAS = { oracao: 'Vida de oração', sacramentos: 'Vida sacramental', formacao: 'Formação doutrinal', caridade: 'Caridade e serviço', comunidade: 'Vida em comunidade' }
export const STATUS = { aberta: 'Aberta', andamento: 'Em andamento', concluida: 'Concluída' }
// caminhos "/arte/..." do banco funcionam também no subcaminho do GitHub Pages
export const url = p => (p && p.startsWith('/') && !p.startsWith('//') ? import.meta.env.BASE_URL + p.slice(1) : p)
