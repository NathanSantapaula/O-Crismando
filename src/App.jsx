import { useEffect, useState } from 'react'
import { sb } from './lib'
import Login from './pages/Login'
import Aluno from './pages/aluno/Aluno'
import Admin from './pages/admin/Admin'
import Galeria from './pages/Galeria'
import Comparar from './pages/Comparar'
import GradeCabelo from './pages/GradeCabelo'

export default function App() {
  if (import.meta.env.DEV && location.search.includes('galeria')) return <Galeria />
  if (import.meta.env.DEV && location.search.includes('comparar')) return <Comparar />
  if (import.meta.env.DEV && location.search.includes('cabelos')) return <GradeCabelo />
  const [sessao, setSessao] = useState(undefined)
  const [perfil, setPerfil] = useState(null)

  useEffect(() => {
    sb.auth.getSession().then(({ data }) => setSessao(data.session))
    const { data } = sb.auth.onAuthStateChange((_e, s) => setSessao(s))
    return () => data.subscription.unsubscribe()
  }, [])

  const carregarPerfil = () => sessao && sb.from('profiles').select('*').eq('id', sessao.user.id).single().then(({ data }) => setPerfil(data))
  useEffect(() => { setPerfil(null); carregarPerfil() }, [sessao?.user.id])

  if (sessao === undefined || (sessao && !perfil)) return <div className="app-h grid place-items-center text-mute">Carregando…</div>
  if (!sessao) return <Login />
  return perfil.role === 'catequista' ? <Admin perfil={perfil} /> : <Aluno perfil={perfil} recarregar={carregarPerfil} />
}
