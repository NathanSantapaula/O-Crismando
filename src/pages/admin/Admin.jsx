import { useEffect, useState } from 'react'
import { LayoutDashboard, Users, BookOpen, Trophy, Megaphone, LogOut, ChevronLeft, KeyRound, Upload, Trash2, Plus, Gift, Check } from 'lucide-react'
import { sb, dataBR, hoje, AREAS, STATUS } from '../../lib'
import Personagem, { GUIAS, AVATAR_PADRAO, Bandeira } from '../../components/Personagem'
import { Medalha } from '../../components/Icones'

const ABAS = [
  { id: 'painel', nome: 'Painel', Icone: LayoutDashboard },
  { id: 'turma', nome: 'Crismandos', Icone: Users },
  { id: 'conteudo', nome: 'Encontros', Icone: BookOpen },
  { id: 'trofeus', nome: 'Troféus', Icone: Trophy },
  { id: 'campanha', nome: 'Campanha', Icone: Megaphone },
]
const ICONES = ['pomba', 'livro', 'chama', 'igreja', 'cajado', 'sol', 'trofeu']
const TIPOS = { xp: 'XP total', streak: 'Semanas de ofensiva', presencas: 'Presenças', licoes: 'Lições feitas', encontros: 'Encontros completos' }
const H1 = ({ children }) => <h1 className="text-3xl font-black">{children}</h1>
const Voltar = ({ onClick }) => <button onClick={onClick} className="flex items-center gap-1 text-mute"><ChevronLeft /> Voltar</button>

export default function Admin({ perfil }) {
  const [aba, setAba] = useState('painel')
  const [d, setD] = useState(null)

  async function carregar() {
    const [a, e, p, pr, t, c, cp] = await Promise.all([
      sb.from('profiles').select('*').eq('role', 'crismando').order('nome'),
      sb.from('encontros').select('*, encontro_codigos(codigo), licoes(*, perguntas(*))').order('ordem').order('ordem', { referencedTable: 'licoes' }),
      sb.from('presencas').select('*'),
      sb.from('progresso').select('*'),
      sb.from('trofeus').select('*').order('ordem'),
      sb.from('conquistas').select('*'),
      sb.from('campanhas').select('*').order('fim', { ascending: false }),
    ])
    setD({ alunos: a.data || [], encontros: e.data || [], presencas: p.data || [], progresso: pr.data || [], trofeus: t.data || [], conquistas: c.data || [], campanhas: cp.data || [] })
  }
  useEffect(() => {
    carregar()
    const ch = sb.channel('presencas').on('postgres_changes', { event: '*', schema: 'public', table: 'presencas' }, carregar).subscribe()
    return () => { sb.removeChannel(ch) }
  }, [])

  const props = { ...d, recarregar: carregar }
  return (
    <div className="app-h md:flex">
      <aside className="hidden w-64 shrink-0 border-r-2 border-line p-4 md:block">
        <div className="mb-8 flex items-center gap-2 px-2"><Bandeira size={36} /><span className="text-2xl font-black text-sol">o crismando</span></div>
        {ABAS.map(({ id, nome, Icone }) => (
          <button key={id} onClick={() => setAba(id)} className={`mb-2 flex w-full items-center gap-4 rounded-2xl border-2 px-4 py-3 font-extrabold uppercase tracking-wider ${aba === id ? 'border-marian bg-[#16304F] text-sol' : 'border-transparent text-mute'}`}>
            <Icone size={26} /> {nome}
          </button>
        ))}
        <button onClick={() => sb.auth.signOut()} className="mt-6 flex w-full items-center gap-4 px-4 py-3 font-extrabold uppercase tracking-wider text-mute"><LogOut size={24} /> Sair</button>
      </aside>

      <main className="safe-t flex-1 px-4 pb-28 pt-5 md:px-10 md:pb-10">
        <div className="mb-4 flex items-center justify-between md:hidden">
          <span className="flex items-center gap-2 text-xl font-black"><Personagem id="jose" busto size={40} /> {perfil.nome || 'Catequista'}</span>
          <button onClick={() => sb.auth.signOut()} aria-label="Sair" className="text-mute"><LogOut /></button>
        </div>
        {!d ? <p className="text-mute">Carregando…</p>
          : aba === 'painel' ? <Painel {...props} />
          : aba === 'turma' ? <Turma {...props} />
          : aba === 'conteudo' ? <Conteudo {...props} />
          : aba === 'trofeus' ? <Trofeus {...props} />
          : <Campanhas {...props} />}
      </main>

      <nav className="safe-b fixed inset-x-0 bottom-0 flex justify-around border-t-2 border-line bg-ground pt-2 md:hidden">
        {ABAS.map(({ id, nome, Icone }) => (
          <button key={id} onClick={() => setAba(id)} aria-label={nome} className={`grid h-12 w-14 place-items-center rounded-2xl border-2 ${aba === id ? 'border-marian bg-[#16304F] text-sol' : 'border-transparent text-mute'}`}><Icone size={26} /></button>
        ))}
      </nav>
    </div>
  )
}

const marca = (presencas, a, e) => presencas.find(p => p.aluno_id === a && p.encontro_id === e)
const feitas = (progresso, a, e) => e.licoes.filter(l => progresso.some(p => p.aluno_id === a && p.licao_id === l.id)).length

/* ---------- Painel ---------- */

function Painel({ alunos, encontros, presencas, progresso, conquistas, trofeus }) {
  const lib = encontros.filter(e => e.liberado && e.data <= hoje())
  const possiveis = alunos.length * lib.length
  const ok = presencas.filter(p => lib.some(e => e.id === p.encontro_id) && alunos.some(a => a.id === p.aluno_id)).length
  const pendentes = conquistas.filter(c => !c.entregue && trofeus.find(t => t.id === c.trofeu_id)?.premio).length
  return (
    <div>
      <H1>Painel da turma</H1>
      <div className="mt-5 grid grid-cols-2 gap-3 lg:grid-cols-4">
        {[['Crismandos', alunos.length, 'text-ink'], ['Frequência', `${possiveis ? Math.round((ok / possiveis) * 100) : 0}%`, 'text-sol'], ['Faltas em aberto', possiveis - ok, 'text-wine'], ['Prêmios a entregar', pendentes, 'text-marian']].map(([t, v, c]) => (
          <div key={t} className="card p-4"><p className={`text-4xl font-black ${c}`}>{v}</p><p className="text-mute">{t}</p></div>
        ))}
      </div>
      <h2 className="mt-8 text-xl font-black">Presença e lições</h2>
      <p className="text-sm text-mute">P presente · R reposta · F falta · número = lições feitas. Atualiza sozinho.</p>
      <div className="card mt-3 overflow-x-auto">
        <table className="w-full text-left">
          <thead><tr className="border-b-2 border-line text-mute"><th className="p-3">Crismando</th>{encontros.filter(e => e.liberado).map(e => <th key={e.id} className="p-3 text-center" title={e.titulo}>{dataBR(e.data)}</th>)}</tr></thead>
          <tbody>
            {alunos.map(a => (
              <tr key={a.id} className="border-b-2 border-line last:border-0">
                <td className="p-3"><span className="flex items-center gap-2"><span className="h-9 w-9 overflow-hidden rounded-full bg-[#E5E9EC]"><Personagem spec={{ ...AVATAR_PADRAO, ...a.avatar }} busto size={36} /></span>{a.nome || '(sem nome)'}</span></td>
                {encontros.filter(e => e.liberado).map(e => {
                  const p = marca(presencas, a.id, e.id)
                  const passou = e.data <= hoje()
                  return (
                    <td key={e.id} className="p-3 text-center">
                      <span className={`inline-grid h-9 w-9 place-items-center rounded-xl ${p ? (p.tipo === 'presenca' ? 'bg-sol-soft text-sol' : 'bg-[#16304F] text-marian') : passou ? 'bg-wine-soft text-wine' : 'bg-raised text-mute'}`}>{p ? (p.tipo === 'presenca' ? 'P' : 'R') : passou ? 'F' : '·'}</span>
                      <span className="ml-1 text-sm text-mute">{feitas(progresso, a.id, e)}/{e.licoes.length}</span>
                    </td>
                  )
                })}
              </tr>
            ))}
            {!alunos.length && <tr><td className="p-4 text-mute">Nenhum crismando cadastrado ainda.</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  )
}

/* ---------- Crismandos ---------- */

function Turma(props) {
  const [sel, setSel] = useState(null)
  if (sel) return <Prontuario aluno={sel} voltar={() => { setSel(null); props.recarregar() }} {...props} />
  return (
    <div>
      <H1>Crismandos</H1>
      <div className="mt-5 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
        {props.alunos.map(a => (
          <button key={a.id} onClick={() => setSel(a)} className="card flex items-center gap-3 border-b-4 p-3 text-left active:translate-y-[2px]">
            <span className="h-14 w-14 overflow-hidden rounded-full bg-[#E5E9EC]"><Personagem spec={{ ...AVATAR_PADRAO, ...a.avatar }} busto size={56} /></span>
            <span className="flex-1"><b className="block text-lg">{a.nome || '(sem nome)'}</b><span className="text-sm text-mute">{a.turma} · {a.xp} XP</span></span>
          </button>
        ))}
      </div>
    </div>
  )
}

function Prontuario({ aluno, voltar, encontros, presencas, progresso, trofeus, conquistas, recarregar }) {
  const [aba, setAba] = useState('pdi')
  const [turma, setTurma] = useState(aluno.turma)
  return (
    <div>
      <Voltar onClick={voltar} />
      <div className="mt-3 flex items-center gap-4">
        <span className="h-20 w-20 overflow-hidden rounded-full bg-[#E5E9EC]"><Personagem spec={{ ...AVATAR_PADRAO, ...aluno.avatar }} busto size={80} /></span>
        <div><H1>{aluno.nome || '(sem nome)'}</H1><p className="text-mute">{aluno.xp} XP · {aluno.streak} semana(s) de ofensiva</p></div>
      </div>
      <form className="mt-4 flex max-w-md gap-2" onSubmit={async e => { e.preventDefault(); await sb.from('profiles').update({ turma }).eq('id', aluno.id); recarregar() }}>
        <input className="campo" aria-label="Turma" value={turma} onChange={e => setTurma(e.target.value)} />
        <button className="btn btn-sol !w-auto">Salvar turma</button>
      </form>
      <div className="mt-5 flex gap-2">
        {[['pdi', 'PDI'], ['jornada', 'Jornada'], ['premios', 'Prêmios']].map(([id, n]) => (
          <button key={id} onClick={() => setAba(id)} className={`rounded-2xl border-2 px-5 py-2 font-extrabold uppercase tracking-wider ${aba === id ? 'border-marian bg-[#16304F] text-sol' : 'border-line text-mute'}`}>{n}</button>
        ))}
      </div>
      {aba === 'pdi' && <PDI aluno={aluno} />}
      {aba === 'jornada' && (
        <div className="mt-5 space-y-2">
          {encontros.filter(e => e.liberado).map(e => {
            const p = marca(presencas, aluno.id, e.id)
            return (
              <div key={e.id} className="card flex items-center justify-between p-4">
                <div><b>{e.titulo}</b><p className="text-sm text-mute">{dataBR(e.data)} · {feitas(progresso, aluno.id, e)}/{e.licoes.length} lições</p></div>
                <span className={p ? 'text-sol' : 'text-wine'}>{p ? (p.tipo === 'presenca' ? 'Presente' : 'Reposta') : e.data <= hoje() ? 'Falta' : 'Em breve'}</span>
              </div>
            )
          })}
        </div>
      )}
      {aba === 'premios' && <Entregas conquistas={conquistas.filter(c => c.aluno_id === aluno.id)} trofeus={trofeus} recarregar={recarregar} />}
    </div>
  )
}

function Entregas({ conquistas, trofeus, recarregar, alunos }) {
  if (!conquistas.length) return <p className="mt-5 text-mute">Nenhum troféu conquistado ainda.</p>
  return (
    <div className="mt-5 space-y-2">
      {conquistas.map(c => {
        const t = trofeus.find(x => x.id === c.trofeu_id); if (!t) return null
        const a = alunos?.find(x => x.id === c.aluno_id)
        return (
          <div key={c.aluno_id + c.trofeu_id} className="card flex items-center gap-3 p-3">
            <Medalha icone={t.icone} size={48} />
            <div className="flex-1"><b>{t.titulo}</b>{a && <span className="text-mute"> · {a.nome}</span>}<p className="text-sm text-mute">{t.premio ? <>Prêmio: {t.premio}</> : 'Sem prêmio físico'} · {new Date(c.created_at).toLocaleDateString('pt-BR')}</p></div>
            {t.premio && (c.entregue
              ? <span className="flex items-center gap-1 text-sol"><Check size={18} /> Entregue</span>
              : <button className="btn btn-sol !w-auto !px-4" onClick={async () => { await sb.from('conquistas').update({ entregue: true }).eq('aluno_id', c.aluno_id).eq('trofeu_id', c.trofeu_id); recarregar() }}>Entregar</button>)}
          </div>
        )
      })}
    </div>
  )
}

// PDI: metas por área da vida cristã + anotações privadas do catequista
function PDI({ aluno }) {
  const [metas, setMetas] = useState([])
  const [notas, setNotas] = useState([])
  const [nova, setNova] = useState({ area: 'oracao', meta: '', prazo: '' })
  const [nota, setNota] = useState('')
  const carregar = async () => {
    const [m, n] = await Promise.all([
      sb.from('pdi_metas').select('*').eq('aluno_id', aluno.id).order('created_at'),
      sb.from('pdi_notas').select('*').eq('aluno_id', aluno.id).order('created_at', { ascending: false }),
    ])
    setMetas(m.data || []); setNotas(n.data || [])
  }
  useEffect(() => { carregar() }, [aluno.id])
  const concluidas = metas.filter(m => m.status === 'concluida').length

  return (
    <div className="mt-5 grid gap-6 lg:grid-cols-2">
      <section>
        <h2 className="text-xl font-black">Metas espirituais</h2>
        <div className="mt-2 h-4 overflow-hidden rounded-full bg-raised"><div className="h-full rounded-full bg-sol" style={{ width: `${metas.length ? (concluidas / metas.length) * 100 : 0}%` }} /></div>
        <p className="mt-1 text-sm text-mute">{concluidas} de {metas.length} concluídas</p>
        <div className="mt-3 space-y-2">
          {metas.map(m => (
            <div key={m.id} className="card p-3">
              <div className="flex items-start justify-between gap-2">
                <div><p className="text-sm text-sol">{AREAS[m.area]}</p><p className="text-lg">{m.meta}</p>{m.prazo && <p className="text-sm text-mute">até {dataBR(m.prazo)}</p>}</div>
                <button aria-label="Excluir meta" className="text-mute" onClick={async () => { await sb.from('pdi_metas').delete().eq('id', m.id); carregar() }}><Trash2 size={18} /></button>
              </div>
              <select className="campo mt-2 !py-2" aria-label="Status da meta" value={m.status} onChange={async ev => { await sb.from('pdi_metas').update({ status: ev.target.value }).eq('id', m.id); carregar() }}>
                {Object.entries(STATUS).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
              </select>
            </div>
          ))}
        </div>
        <form onSubmit={async e => { e.preventDefault(); await sb.from('pdi_metas').insert({ ...nova, prazo: nova.prazo || null, aluno_id: aluno.id }); setNova({ ...nova, meta: '', prazo: '' }); carregar() }} className="card mt-3 space-y-2 p-3">
          <select className="campo" aria-label="Área" value={nova.area} onChange={e => setNova({ ...nova, area: e.target.value })}>
            {Object.entries(AREAS).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
          </select>
          <input className="campo" placeholder="Ex.: Rezar o terço às quartas" value={nova.meta} onChange={e => setNova({ ...nova, meta: e.target.value })} required />
          <input className="campo" type="date" aria-label="Prazo" value={nova.prazo} onChange={e => setNova({ ...nova, prazo: e.target.value })} />
          <button className="btn btn-sol flex items-center justify-center gap-2"><Plus size={18} /> Adicionar meta</button>
        </form>
      </section>
      <section>
        <h2 className="text-xl font-black">Anotações do catequista</h2>
        <p className="text-sm text-mute">Só catequistas veem.</p>
        <form onSubmit={async e => { e.preventDefault(); await sb.from('pdi_notas').insert({ texto: nota, aluno_id: aluno.id }); setNota(''); carregar() }} className="mt-3 space-y-2">
          <textarea className="campo min-h-24" placeholder="Evolução, conversas, pontos de atenção…" value={nota} onChange={e => setNota(e.target.value)} required />
          <button className="btn btn-marian">Salvar anotação</button>
        </form>
        <div className="mt-3 space-y-2">
          {notas.map(n => <div key={n.id} className="rounded-2xl bg-surface p-3"><p className="text-sm text-mute">{new Date(n.created_at).toLocaleDateString('pt-BR')}</p><p className="whitespace-pre-wrap">{n.texto}</p></div>)}
        </div>
      </section>
    </div>
  )
}

/* ---------- Encontros, lições e perguntas ---------- */

function Conteudo({ encontros, recarregar }) {
  const [edit, setEdit] = useState(null)
  if (edit) return <Editor e={edit} voltar={() => { setEdit(null); recarregar() }} />
  return (
    <div>
      <div className="flex items-center justify-between gap-3">
        <H1>Encontros</H1>
        <button className="btn btn-sol !w-auto" onClick={() => setEdit({ ordem: encontros.length + 1, titulo: '', guia: 'jesus', leitura: '', data: hoje(), licoes: [] })}>Novo encontro</button>
      </div>
      <div className="mt-5 space-y-2">
        {encontros.map(e => (
          <button key={e.id} onClick={() => setEdit(e)} className="card flex w-full items-center gap-3 border-b-4 p-3 text-left active:translate-y-[2px]">
            <Personagem id={e.guia} busto size={52} />
            <div className="flex-1"><b className="text-lg">{e.ordem}. {e.titulo}</b><p className="text-sm text-mute">{dataBR(e.data)} · {e.licoes.length} lições · {e.licoes.reduce((s, l) => s + l.perguntas.length, 0)} perguntas</p></div>
            <span className={`rounded-xl px-3 py-1 text-sm ${e.liberado ? 'bg-sol-soft text-sol' : 'bg-raised text-mute'}`}>{e.liberado ? 'Liberado' : 'Fechado'}</span>
          </button>
        ))}
      </div>
    </div>
  )
}

function Editor({ e: inicial, voltar }) {
  const [e, setE] = useState(inicial)
  const [codigo, setCodigo] = useState(inicial.encontro_codigos?.codigo || '')
  const [msg, setMsg] = useState('')
  const [novaLicao, setNovaLicao] = useState({ titulo: '', tipo: 'quiz' })
  const set = k => ev => setE({ ...e, [k]: ev.target.value })
  const campos = ({ id, ordem, titulo, data, guia, leitura, citacao, cic_ref, imagem_url, imagem_credito, video_url, foto_url, liberado }) =>
    ({ id, ordem: +ordem, titulo, data, guia, leitura, citacao, cic_ref, imagem_url, imagem_credito, video_url, foto_url, liberado: !!liberado })

  async function recarregarLicoes(id) {
    const { data } = await sb.from('licoes').select('*, perguntas(*)').eq('encontro_id', id).order('ordem')
    setE(x => ({ ...x, id, licoes: data || [] }))
  }
  async function salvar() {
    const { data, error } = await sb.from('encontros').upsert(campos(e)).select().single()
    if (error) { setMsg(error.message); return null }
    setE(x => ({ ...x, ...data })); setMsg('Salvo.')
    return data
  }
  const garantir = async () => e.id ? e : await salvar()
  async function gerarCodigo() {
    const s = await garantir(); if (!s) return
    const c = Math.random().toString(36).slice(2, 8).toUpperCase().padEnd(6, '0')
    await sb.from('encontro_codigos').upsert({ encontro_id: s.id, codigo: c }); setCodigo(c)
  }
  async function enviarFoto(ev) {
    const f = ev.target.files?.[0]; if (!f) return
    const caminho = `encontro-${e.id || 'novo'}-${Date.now()}-${f.name.replace(/[^\w.]/g, '')}`
    const { error } = await sb.storage.from('fotos').upload(caminho, f)
    if (error) return setMsg(error.message)
    setE({ ...e, foto_url: sb.storage.from('fotos').getPublicUrl(caminho).data.publicUrl }); setMsg('Foto enviada. Clique em salvar.')
  }
  async function addLicao(ev) {
    ev.preventDefault()
    const s = await garantir(); if (!s) return
    await sb.from('licoes').insert({ ...novaLicao, encontro_id: s.id, ordem: (e.licoes?.length || 0) + 1 })
    setNovaLicao({ titulo: '', tipo: 'quiz' }); recarregarLicoes(s.id)
  }

  return (
    <div className="max-w-3xl">
      <Voltar onClick={voltar} />
      <div className="mt-3"><H1>{e.id ? 'Editar encontro' : 'Novo encontro'}</H1></div>
      <div className="mt-5 grid gap-3 md:grid-cols-2">
        <input className="campo md:col-span-2" placeholder="Tema do encontro" value={e.titulo} onChange={set('titulo')} />
        <input className="campo" type="number" aria-label="Ordem" value={e.ordem} onChange={set('ordem')} />
        <input className="campo" type="date" aria-label="Data" value={e.data || ''} onChange={set('data')} />
        <select className="campo md:col-span-2" value={e.guia} onChange={set('guia')} aria-label="Guia">
          {Object.entries(GUIAS).map(([k, g]) => <option key={k} value={k}>Guia: {g.nome}</option>)}
        </select>
        <textarea className="campo min-h-32 md:col-span-2" placeholder="Texto da leitura (aparece nas lições de leitura e no guia)" value={e.leitura} onChange={set('leitura')} />
        <input className="campo md:col-span-2" placeholder="Citação do Catecismo" value={e.citacao || ''} onChange={set('citacao')} />
        <input className="campo" placeholder="Referência (ex.: CIC 1285)" value={e.cic_ref || ''} onChange={set('cic_ref')} />
        <input className="campo" placeholder="Link do vídeo" value={e.video_url || ''} onChange={set('video_url')} />
        <input className="campo" placeholder="Arte sacra (ex.: /arte/pentecostes.jpg)" value={e.imagem_url || ''} onChange={set('imagem_url')} />
        <input className="campo" placeholder="Crédito da obra (autor, título, ano)" value={e.imagem_credito || ''} onChange={set('imagem_credito')} />
      </div>

      <div className="card mt-5 space-y-3 p-4">
        <h2 className="text-xl font-black">Fim do encontro</h2>
        <label className="btn btn-ghost flex cursor-pointer items-center justify-center gap-2"><Upload size={18} /> {e.foto_url ? 'Trocar foto da turma' : 'Enviar foto da turma'}<input type="file" accept="image/*" className="hidden" onChange={enviarFoto} /></label>
        {e.foto_url && <img src={e.foto_url} alt="Foto da turma" className="max-h-60 rounded-xl" />}
        <button className="btn btn-marian flex items-center justify-center gap-2" onClick={gerarCodigo}><KeyRound size={18} /> {codigo ? 'Gerar novo código' : 'Gerar código de presença'}</button>
        {codigo && <p className="text-center text-5xl font-black tracking-[.3em] text-sol">{codigo}</p>}
        <label className="flex items-center gap-3"><input type="checkbox" className="h-6 w-6 accent-[#FFC800]" checked={!!e.liberado} onChange={ev => setE({ ...e, liberado: ev.target.checked })} /> Liberar encontro (lições, código e acervo)</label>
      </div>
      {msg && <p className="mt-3 text-sol">{msg}</p>}
      <button className="btn btn-sol mt-3" onClick={salvar}>Salvar encontro</button>

      <h2 className="mt-10 text-2xl font-black">Lições deste encontro</h2>
      <p className="text-mute">Cada lição vira uma bolinha na trilha. Concluir todas abre o baú e, se o crismando faltou, repõe a falta.</p>
      <div className="mt-4 space-y-4">
        {(e.licoes || []).map(l => <LicaoEditor key={l.id} l={l} encontroId={e.id} atualizar={() => recarregarLicoes(e.id)} />)}
      </div>
      <form onSubmit={addLicao} className="card mt-4 flex flex-wrap gap-2 p-3">
        <input className="campo flex-1" placeholder="Nome da lição (ex.: Desafio)" value={novaLicao.titulo} onChange={ev => setNovaLicao({ ...novaLicao, titulo: ev.target.value })} required />
        <select className="campo !w-auto" aria-label="Tipo" value={novaLicao.tipo} onChange={ev => setNovaLicao({ ...novaLicao, tipo: ev.target.value })}>
          <option value="leitura">Leitura</option><option value="quiz">Quiz</option><option value="video">Vídeo</option><option value="oracao">Oração</option>
        </select>
        <button className="btn btn-sol !w-auto">Adicionar lição</button>
      </form>
    </div>
  )
}

function LicaoEditor({ l, encontroId, atualizar }) {
  const vazio = { enunciado: '', opcoes: ['', '', ''], correta: 0, explicacao: '', imagem_url: '', imagem_credito: '' }
  const [q, setQ] = useState(vazio)
  const [aberta, setAberta] = useState(false)
  async function add(ev) {
    ev.preventDefault()
    const opcoes = q.opcoes.filter(Boolean)
    await sb.from('perguntas').insert({ ...q, opcoes, correta: Math.min(q.correta, opcoes.length - 1), licao_id: l.id, encontro_id: encontroId, imagem_url: q.imagem_url || null, imagem_credito: q.imagem_credito || null })
    setQ(vazio); atualizar()
  }
  return (
    <div className="card p-4">
      <div className="flex items-center justify-between gap-2">
        <button onClick={() => setAberta(!aberta)} className="flex-1 text-left"><b className="text-lg">{l.ordem}. {l.titulo}</b><span className="text-mute"> · {l.tipo} · {l.perguntas.length} pergunta(s)</span></button>
        <button aria-label="Excluir lição" className="text-mute" onClick={async () => { if (confirm('Excluir esta lição e suas perguntas?')) { await sb.from('licoes').delete().eq('id', l.id); atualizar() } }}><Trash2 size={18} /></button>
      </div>
      {aberta && <>
        <div className="mt-3 space-y-2">
          {l.perguntas.map(p => (
            <div key={p.id} className="flex items-start justify-between gap-2 rounded-xl bg-surface p-3">
              <div><p>{p.enunciado}</p><p className="text-sm text-sol">Certa: {p.opcoes[p.correta]}</p></div>
              <button aria-label="Excluir pergunta" className="text-mute" onClick={async () => { await sb.from('perguntas').delete().eq('id', p.id); atualizar() }}><Trash2 size={18} /></button>
            </div>
          ))}
        </div>
        <form onSubmit={add} className="mt-3 space-y-2">
          <input className="campo" placeholder="Pergunta" value={q.enunciado} onChange={ev => setQ({ ...q, enunciado: ev.target.value })} required />
          {q.opcoes.map((o, i) => (
            <label key={i} className="flex items-center gap-2">
              <input type="radio" name={`c${l.id}`} className="h-5 w-5 accent-[#FFC800]" checked={q.correta === i} onChange={() => setQ({ ...q, correta: i })} aria-label={`Opção ${i + 1} é a certa`} />
              <input className="campo" placeholder={`Opção ${i + 1}`} value={o} onChange={ev => setQ({ ...q, opcoes: q.opcoes.map((x, j) => j === i ? ev.target.value : x) })} required={i < 2} />
            </label>
          ))}
          <input className="campo" placeholder="Explicação com referência ao CIC" value={q.explicacao} onChange={ev => setQ({ ...q, explicacao: ev.target.value })} />
          <div className="grid gap-2 md:grid-cols-2">
            <input className="campo" placeholder="Arte sacra (opcional)" value={q.imagem_url} onChange={ev => setQ({ ...q, imagem_url: ev.target.value })} />
            <input className="campo" placeholder="Crédito da obra" value={q.imagem_credito} onChange={ev => setQ({ ...q, imagem_credito: ev.target.value })} />
          </div>
          <button className="btn btn-marian">Adicionar pergunta</button>
        </form>
      </>}
    </div>
  )
}

/* ---------- Troféus e prêmios ---------- */

function Trofeus({ trofeus, conquistas, alunos, recarregar }) {
  const vazio = { titulo: '', descricao: '', icone: 'trofeu', tipo: 'licoes', meta: 5, premio: '' }
  const [t, setT] = useState(vazio)
  const set = k => ev => setT({ ...t, [k]: ev.target.value })
  const pendentes = conquistas.filter(c => !c.entregue && trofeus.find(x => x.id === c.trofeu_id)?.premio)
  return (
    <div className="max-w-4xl">
      <H1>Troféus e prêmios</H1>
      <h2 className="mt-6 flex items-center gap-2 text-xl font-black"><Gift className="text-sol" /> A entregar ({pendentes.length})</h2>
      <Entregas conquistas={pendentes} trofeus={trofeus} alunos={alunos} recarregar={recarregar} />

      <h2 className="mt-8 text-xl font-black">Catálogo</h2>
      <div className="mt-3 grid gap-3 md:grid-cols-2">
        {trofeus.map(x => (
          <div key={x.id} className="card flex items-center gap-3 p-3">
            <Medalha icone={x.icone} ativo={x.ativo} size={56} />
            <div className="flex-1"><b>{x.titulo}</b><p className="text-sm text-mute">{TIPOS[x.tipo]} ≥ {x.meta}{x.premio ? ` · ${x.premio}` : ''} · {conquistas.filter(c => c.trofeu_id === x.id).length} conquistaram</p></div>
            <button className="text-sm text-mute underline" onClick={async () => { await sb.from('trofeus').update({ ativo: !x.ativo }).eq('id', x.id); recarregar() }}>{x.ativo ? 'Pausar' : 'Ativar'}</button>
          </div>
        ))}
      </div>

      <form onSubmit={async ev => { ev.preventDefault(); await sb.from('trofeus').insert({ ...t, meta: +t.meta, premio: t.premio || null, ordem: trofeus.length + 1 }); setT(vazio); recarregar() }} className="card mt-5 grid gap-2 p-4 md:grid-cols-2">
        <h3 className="text-lg font-black md:col-span-2">Novo troféu</h3>
        <input className="campo" placeholder="Nome (ex.: Amigo dos Santos)" value={t.titulo} onChange={set('titulo')} required />
        <input className="campo" placeholder="Descrição (ex.: Complete 5 encontros)" value={t.descricao} onChange={set('descricao')} required />
        <select className="campo" aria-label="Regra" value={t.tipo} onChange={set('tipo')}>{Object.entries(TIPOS).map(([k, v]) => <option key={k} value={k}>{v}</option>)}</select>
        <input className="campo" type="number" min="1" aria-label="Meta" value={t.meta} onChange={set('meta')} />
        <input className="campo md:col-span-2" placeholder="Prêmio físico (opcional, ex.: Terço de madeira)" value={t.premio} onChange={set('premio')} />
        <div className="flex flex-wrap gap-2 md:col-span-2">
          {ICONES.map(i => <button type="button" key={i} onClick={() => setT({ ...t, icone: i })} aria-label={i} className={`rounded-2xl border-2 p-1 ${t.icone === i ? 'border-marian bg-[#16304F]' : 'border-line'}`}><Medalha icone={i} size={44} /></button>)}
        </div>
        <button className="btn btn-sol md:col-span-2">Criar troféu</button>
      </form>
    </div>
  )
}

/* ---------- Campanha ---------- */

function Campanhas({ campanhas, recarregar }) {
  const [c, setC] = useState({ titulo: '', texto: '', guia: 'maria', fim: '' })
  const set = k => ev => setC({ ...c, [k]: ev.target.value })
  return (
    <div className="max-w-3xl">
      <H1>Campanhas</H1>
      <p className="text-mute">Aparece para os crismandos ao abrir o app, uma vez por dia, até a data final.</p>
      <div className="mt-5 space-y-2">
        {campanhas.map(x => (
          <div key={x.id} className="card flex items-center gap-3 p-3">
            <Personagem id={x.guia} busto size={52} />
            <div className="flex-1"><b>{x.titulo}</b><p className="text-sm text-mute">até {dataBR(x.fim)} · {x.texto}</p></div>
            <button className="text-sm text-mute underline" onClick={async () => { await sb.from('campanhas').update({ ativa: !x.ativa }).eq('id', x.id); recarregar() }}>{x.ativa ? 'Pausar' : 'Ativar'}</button>
          </div>
        ))}
      </div>
      <form onSubmit={async ev => { ev.preventDefault(); await sb.from('campanhas').insert(c); setC({ ...c, titulo: '', texto: '' }); recarregar() }} className="card mt-5 grid gap-2 p-4">
        <h3 className="text-lg font-black">Nova campanha</h3>
        <input className="campo" placeholder="Título (ex.: Novena de Pentecostes)" value={c.titulo} onChange={set('titulo')} required />
        <textarea className="campo" placeholder="Mensagem e prêmio" value={c.texto} onChange={set('texto')} required />
        <div className="grid gap-2 md:grid-cols-2">
          <select className="campo" aria-label="Personagem" value={c.guia} onChange={set('guia')}>{Object.entries(GUIAS).map(([k, g]) => <option key={k} value={k}>{g.nome}</option>)}</select>
          <input className="campo" type="date" aria-label="Termina em" value={c.fim} onChange={set('fim')} required />
        </div>
        <button className="btn btn-sol">Publicar campanha</button>
      </form>
    </div>
  )
}
