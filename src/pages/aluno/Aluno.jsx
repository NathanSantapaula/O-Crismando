import { useEffect, useMemo, useRef, useState } from 'react'
import { Church, Shield, Trophy, Images, NotebookText, Star, BookOpen, Video, HandHeart, Lock, Check, KeyRound, X, Gift, Settings, Shirt, CalendarClock } from 'lucide-react'
import { sb, hoje, dataBR, AREAS, STATUS, url } from '../../lib'
import Personagem, { GUIAS, AVATAR_PADRAO, Marca, Bandeira } from '../../components/Personagem'
import Objeto, { ORDEM_OBJETOS, nomeObjeto } from '../../components/Objetos'
import { normalizar } from '../../components/Boneco'
import { Bau, Chama, Gema, Medalha, NavIcone } from '../../components/Icones'
import { Balao, Barra } from '../Login'
import Licao from './Licao'
import { som, somLigado, alternarSom } from '../../sons'
import Avatar from './Avatar'
import { FolhaOfensiva, FolhaXP } from './Topo'

// cores de unidade: amarelo (destaque), vinho, azul mariano, oliva, violeta
const COR = [
  { bg: 'bg-sol', borda: 'border-sol-dark', texto: 'text-[#2A2000]', no: '#FFC800', noEsc: '#D29C00' },
  { bg: 'bg-wine', borda: 'border-wine-dark', texto: 'text-white', no: '#E0455F', noEsc: '#A82B42' },
  { bg: 'bg-marian', borda: 'border-marian-dark', texto: 'text-white', no: '#3D8BFF', noEsc: '#2361C4' },
  { bg: 'bg-olive', borda: 'border-olive-dark', texto: 'text-white', no: '#7FB83A', noEsc: '#5A8A26' },
  { bg: 'bg-violet', borda: 'border-violet-dark', texto: 'text-white', no: '#8B5CF6', noEsc: '#6236C9' },
]
const ICONE_LICAO = { leitura: BookOpen, quiz: Star, video: Video, oracao: HandHeart }

export default function Aluno({ perfil, recarregar }) {
  const [aba, setAba] = useState('inicio')
  const [d, setD] = useState(null)
  const [licao, setLicao] = useState(null)
  const [editarAvatar, setEditarAvatar] = useState(false)
  const [campanhaAberta, setCampanhaAberta] = useState(false)
  const [folha, setFolha] = useState(null) // 'ofensiva' | 'xp'

  async function carregar() {
    const [e, p, pr, b, t, c, m, cp] = await Promise.all([
      sb.from('encontros').select('*, licoes(*, perguntas(*))').order('ordem').order('ordem', { referencedTable: 'licoes' }),
      sb.from('presencas').select('*').eq('aluno_id', perfil.id),
      sb.from('progresso').select('*').eq('aluno_id', perfil.id),
      sb.from('baus').select('*').eq('aluno_id', perfil.id),
      sb.from('trofeus').select('*').eq('ativo', true).order('ordem'),
      sb.from('conquistas').select('*').eq('aluno_id', perfil.id),
      sb.rpc('minhas_metricas'),
      sb.from('campanhas').select('*').eq('ativa', true).gte('fim', hoje()).order('fim').limit(1),
    ])
    const dados = { encontros: e.data || [], presencas: p.data || [], progresso: pr.data || [], baus: b.data || [], trofeus: t.data || [], conquistas: c.data || [], metricas: m.data || {}, campanha: cp.data?.[0] }
    setD(dados)
    // campanha aparece uma vez por dia ao entrar
    try { if (dados.campanha && localStorage.getItem('campanha-vista') !== hoje()) { setCampanhaAberta(true); localStorage.setItem('campanha-vista', hoje()) } } catch {}
  }
  useEffect(() => { carregar() }, [])
  const topoRef = useRef(null)
  useEffect(() => {
    const el = topoRef.current; if (!el) return
    const medir = () => document.documentElement.style.setProperty('--topo', `${el.offsetHeight}px`)
    medir(); const ro = new ResizeObserver(medir); ro.observe(el)
    return () => ro.disconnect()
  }, [d, aba])

  if (editarAvatar) return <Avatar perfil={perfil} onFim={() => { setEditarAvatar(false); recarregar() }} />
  if (licao) return <Licao {...licao} metricas={d.metricas} conquistas={d.conquistas} trofeus={d.trofeus} onFim={() => { setLicao(null); carregar(); recarregar() }} />
  if (!d) return <div className="app-h grid place-items-center"><Personagem id="jesus" size={110} className="pula" /></div>

  const feito = id => d.progresso.some(p => p.licao_id === id)
  const presenca = id => d.presencas.find(p => p.encontro_id === id)
  const faltas = d.encontros.filter(e => e.liberado && e.data && e.data <= hoje() && !presenca(e.id))
  const ctx = { ...d, perfil, feito, presenca, faltas, carregar, abrir: (l, e) => setLicao({ licao: l, encontro: e }), setEditarAvatar, setCampanhaAberta }
  const avatar = { ...AVATAR_PADRAO, ...perfil.avatar }
  const irParaLicao = () => { setAba('inicio'); setTimeout(() => document.querySelector('.brilho-no')?.scrollIntoView({ behavior: 'smooth', block: 'center' }), 80) }
  const encontrosFeitos = d.metricas.encontros || 0

  const ABAS = [
    { id: 'inicio', nome: 'Início', el: <NavIcone tipo="inicio" /> },
    { id: 'ranking', nome: 'Ranking', el: <NavIcone tipo="ranking" /> },
    { id: 'trofeus', nome: 'Troféus', el: <NavIcone tipo="trofeus" /> },
    { id: 'acervo', nome: 'Credencial', el: <NavIcone tipo="acervo" /> },
    { id: 'perfil', nome: 'Perfil', el: <span className="block h-10 w-10 overflow-hidden rounded-full bg-[#E5E9EC]"><Personagem spec={avatar} busto size={40} /></span> },
  ]

  return (
    <div className="app-h mx-auto max-w-[620px]">
      {aba !== 'perfil' && (
        <header ref={topoRef} className="safe-t sticky top-0 z-20 flex items-center justify-between bg-ground px-5 py-3">
          {/* cada número do topo é tocável */}
          <button onClick={() => { som('toque'); irParaLicao() }} className="flex items-center gap-2 rounded-xl px-1 text-lg active:scale-90" aria-label="Encontros completos: ir para a lição atual"><Bandeira size={34} /> {encontrosFeitos}</button>
          <button onClick={() => setFolha('ofensiva')} className="flex items-center gap-1.5 rounded-xl px-1 text-lg active:scale-90" aria-label="Ver minha sequência" style={{ color: d.metricas.semana_feita ? '#FF9600' : '#55687A' }}>
            <Chama size={24} acesa={d.metricas.semana_feita} className={d.metricas.semana_feita ? 'chama' : ''} /> {d.metricas.streak || 0}
          </button>
          <button onClick={() => setFolha('xp')} className="flex items-center gap-1.5 rounded-xl px-1 text-lg text-marian active:scale-90" aria-label="Ver meu XP"><Gema /> {perfil.xp}</button>
          <button onClick={() => { som('toque'); setAba('trofeus'); scrollTo(0, 0) }} className="flex items-center gap-1.5 rounded-xl px-1 text-lg text-sol active:scale-90" aria-label="Abrir troféus"><Trophy size={22} fill="currentColor" /> {d.conquistas.length}</button>
        </header>
      )}

      <main className="pb-32">
        {aba === 'inicio' && <Inicio {...ctx} />}
        {aba === 'ranking' && <Ranking {...ctx} />}
        {aba === 'trofeus' && <Trofeus {...ctx} />}
        {aba === 'acervo' && <Acervo {...ctx} />}
        {aba === 'perfil' && <Perfil {...ctx} avatar={avatar} />}
      </main>

      <nav className="safe-b fixed inset-x-0 bottom-0 z-20 mx-auto flex max-w-[620px] justify-around border-t-2 border-line bg-ground px-2 pt-2">
        {ABAS.map(a => (
          <button key={a.id} onClick={() => { setAba(a.id); scrollTo(0, 0) }} aria-label={a.nome} aria-current={aba === a.id}
            className={`relative grid h-[60px] w-[68px] place-items-center rounded-2xl border-[3px] ${aba === a.id ? 'border-[#4FB4FF] bg-[#16304F]' : 'border-transparent'}`}>
            {a.el}
            {a.id === 'inicio' && faltas.length > 0 && <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-wine px-1 text-xs text-white">{faltas.length}</span>}
          </button>
        ))}
      </nav>

      {campanhaAberta && d.campanha && <Campanha c={d.campanha} fechar={() => setCampanhaAberta(false)} />}
      {folha === 'ofensiva' && <FolhaOfensiva metricas={d.metricas} progresso={d.progresso} fechar={() => setFolha(null)} irParaLicao={irParaLicao} />}
      {folha === 'xp' && <FolhaXP perfil={perfil} trofeus={d.trofeus} conquistas={d.conquistas} fechar={() => setFolha(null)} />}
    </div>
  )
}

/* ---------------- Início: a trilha ---------------- */

function Inicio({ encontros, feito, presenca, faltas, baus, abrir, carregar, campanha, setCampanhaAberta }) {
  const [sel, setSel] = useState(null) // { tipo, id }
  const [guiaDe, setGuiaDe] = useState(null)
  const [codigoDe, setCodigoDe] = useState(null)
  const [bauAberto, setBauAberto] = useState(null)
  // primeira lição pendente de toda a trilha liberada = "COMEÇAR"
  const atual = useMemo(() => {
    for (const e of encontros) if (e.liberado) for (const l of e.licoes) if (!feito(l.id)) return l.id
    return null
  }, [encontros])
  const onda = i => Math.round(Math.sin(i * 0.9) * 78) // zigue-zague suave

  let n = 0
  return (
    <div className="px-4">
      {faltas.length > 0 && (
        <button onClick={() => document.getElementById(`enc-${faltas[0].id}`)?.scrollIntoView({ behavior: 'smooth' })}
          className="mb-4 flex w-full items-center gap-3 rounded-2xl border-2 border-b-4 border-wine-dark bg-wine-soft p-3 text-left">
          <Objeto id="pomba" size={64} className="shrink-0" />
          <span className="flex-1"><b className="block text-wine">{faltas.length} falta(s) para repor</b><span className="text-sm text-mute">Complete as lições do encontro com 70% de acerto.</span></span>
        </button>
      )}

      {encontros.map((e, i) => {
        const cor = COR[i % COR.length]
        const pres = presenca(e.id)
        const todas = e.licoes.length > 0 && e.licoes.every(l => feito(l.id))
        const bau = baus.some(b => b.encontro_id === e.id)
        const falta = faltas.some(f => f.id === e.id)
        const nos = [
          ...e.licoes.map((l, k) => ({ tipo: 'licao', id: l.id, l, k, ok: feito(l.id), bloq: !e.liberado || (l.id !== atual && !feito(l.id)) })),
          { tipo: 'presenca', id: `p${e.id}`, ok: !!pres, bloq: !e.liberado },
          { tipo: 'bau', id: `b${e.id}`, ok: bau, bloq: !todas },
        ]
        const meio = Math.floor(nos.length / 2)
        return (
          <section key={e.id} id={`enc-${e.id}`} className="mb-12 scroll-mt-20">
            {i > 0 && (
              <div className="mb-6 flex items-center gap-3 text-mute" aria-hidden="true">
                <span className="h-0.5 flex-1 rounded bg-line" /><span className="text-sm font-extrabold uppercase tracking-wider">Encontro {e.ordem}</span><span className="h-0.5 flex-1 rounded bg-line" />
              </div>
            )}
            {/* faixa gruda logo abaixo da barra; o fundo cobre o que passa por baixo */}
            <div className="sticky z-10 -mx-4 bg-ground px-4 pb-2 pt-1" style={{ top: 'var(--topo, 64px)' }}>
            <div className={`flex overflow-hidden rounded-2xl border-b-4 ${cor.bg} ${cor.borda} ${cor.texto}`}>
              <div className="flex-1 px-4 py-3">
                <p className="text-[13px] font-extrabold uppercase tracking-wider opacity-75">Encontro {e.ordem} · {e.data ? dataBR(e.data) : 'em breve'}{falta ? ' · falta' : ''}</p>
                <h2 className="text-xl font-black leading-tight">{e.titulo}</h2>
              </div>
              <button onClick={() => setGuiaDe(e)} aria-label="Guia do encontro" className="grid w-16 place-items-center border-l-2 border-black/15"><NotebookText size={30} /></button>
            </div>
            </div>

            {i === 0 && campanha && (
              <button onClick={() => setCampanhaAberta(true)} className="surge relative mt-4 flex w-24 flex-col items-center rounded-2xl border-b-4 border-[#24315F] bg-[#3B4FA0] pt-1 text-white">
                <span className="flex h-14 items-end gap-1.5 pb-1" aria-hidden="true">
                  {['#8B5CF6', '#8B5CF6', '#F07CA8', '#8B5CF6'].map((v, k) => (
                    <span key={k} className="flex flex-col items-center"><span className={`h-3 w-2 rounded-full ${k === 0 ? 'chama bg-[#FFB020]' : 'bg-white/15'}`} /><span className="mt-0.5 h-7 w-3.5 rounded-sm" style={{ background: v }} /></span>
                  ))}
                </span>
                <span className="w-full rounded-b-xl bg-[#2C3B7A] py-1 text-sm">{Math.max(0, Math.ceil((new Date(campanha.fim) - new Date(hoje())) / 864e5))} dias</span>
              </button>
            )}

            <div className="relative mt-16 flex flex-col items-center gap-5">
              <div className={`pointer-events-none absolute top-[30%] ${onda(n + meio) > 0 ? 'left-0' : 'right-0'}`}>
                {i === 0
                  ? <Personagem id={e.guia} mini size={96} className={e.liberado ? 'balanca' : 'opacity-50 grayscale'} />
                  : <Objeto id={ORDEM_OBJETOS[(i - 1) % ORDEM_OBJETOS.length]} size={138} className={e.liberado ? 'pula' : 'opacity-60 grayscale'} />}
              </div>
              {nos.map((no, k) => {
                const x = onda(n++)
                const aberto = sel?.id === no.id
                const corNo = no.bloq && !no.ok ? { no: '#33475A', noEsc: '#24323F' } : cor
                const ativo = no.tipo === 'licao' && no.id === atual
                return (
                  <div key={no.id} className="relative flex flex-col items-center" style={{ transform: `translateX(${x}px)`, zIndex: aberto ? 30 : 1 }}>
                    {ativo && !aberto && <span className="pula absolute -top-12 z-10 whitespace-nowrap rounded-xl border-2 border-line bg-ground px-3 py-1.5 font-extrabold uppercase tracking-wider text-sol">Começar</span>}
                    {no.tipo === 'bau' ? (
                      <button aria-label={no.ok ? 'Baú aberto' : 'Baú do encontro'} disabled={no.bloq || no.ok}
                        onClick={async () => { if (await sb.rpc('abrir_bau', { p_encontro: e.id }).then(r => r.data)) { som('bau'); setBauAberto(e); carregar() } }}
                        className={`transition-transform active:scale-95 ${!no.bloq && !no.ok ? 'pula' : ''}`}>
                        <Bau aberto={no.ok} apagado={no.bloq && !no.ok} size={78} />
                      </button>
                    ) : (
                      <No cor={corNo} ativo={ativo} ok={no.ok} rotulo={no.tipo === 'licao' ? `${no.l.titulo}` : 'Presença'}
                        onClick={() => { som('toque'); setSel(aberto ? null : no) }}>
                        {no.bloq && !no.ok ? <Lock size={30} strokeWidth={3} /> : no.tipo === 'presenca' ? (no.ok ? <Check size={36} strokeWidth={4} /> : <KeyRound size={32} strokeWidth={3} />) : (() => { const I = no.ok ? Check : ICONE_LICAO[no.l.tipo] || Star; return <I size={34} strokeWidth={no.ok ? 4 : 2.6} fill={!no.ok && no.l.tipo === 'quiz' ? 'currentColor' : 'none'} /> })()}
                      </No>
                    )}
                    {aberto && (
                      <Popover cor={cor} fechar={() => setSel(null)}>
                        {no.tipo === 'licao' ? <>
                          <b className="text-lg">{no.l.titulo}</b>
                          <p className="opacity-80">Lição {no.k + 1} de {e.licoes.length}{falta ? ' · vale reposição' : ''}</p>
                          {no.bloq && !no.ok
                            ? <p className="mt-3 opacity-80">{e.liberado ? 'Complete as lições anteriores para desbloquear.' : 'Este encontro ainda não foi liberado pelo catequista.'}</p>
                            : <button className="btn btn-claro mt-3" onClick={() => abrir(no.l, e)}>{no.ok ? 'Praticar de novo · +5 XP' : `Começar · +${10 + (no.l.perguntas?.length || 0) * 5} XP`}</button>}
                        </> : <>
                          <b className="text-lg">Presença</b>
                          {no.ok ? <p className="opacity-80">{pres.tipo === 'presenca' ? 'Você esteve no encontro.' : 'Falta reposta com as lições.'}</p>
                            : no.bloq ? <p className="opacity-80">Liberada no fim do encontro.</p>
                            : <button className="btn btn-claro mt-3" onClick={() => { setSel(null); setCodigoDe(e) }}>Digitar código</button>}
                        </>}
                      </Popover>
                    )}
                  </div>
                )
              })}
            </div>
          </section>
        )
      })}

      {guiaDe && <Guia e={guiaDe} fechar={() => setGuiaDe(null)} />}
      {codigoDe && <Codigo e={codigoDe} fechar={() => setCodigoDe(null)} ok={() => { setCodigoDe(null); carregar() }} />}
      {bauAberto && (
        <Tela onFechar={() => setBauAberto(null)}>
          <div className="surge"><Bau aberto size={150} /></div>
          <h2 className="mt-6 text-3xl font-black text-sol">Baú aberto!</h2>
          <p className="mt-2 text-lg">Você completou "{bauAberto.titulo}" e ganhou <b className="text-marian">+25 XP</b>.</p>
        </Tela>
      )}
    </div>
  )
}

// botão redondo "3D" da trilha
export function No({ cor, ok, ativo, children, onClick, rotulo }) {
  return (
    <div className="relative">
      {/* anel centrado em pixels fixos (sem transform, que o Safari do iPhone trata diferente):
          botão 78x68 + sombra de 8px => centro em (39, 38); anel 106x98 => canto em (-14, -11) */}
      {ativo && (
        <svg className="pointer-events-none absolute" style={{ left: -14, top: -11 }} width="106" height="98" viewBox="0 0 106 98" aria-hidden="true">
          <ellipse cx="53" cy="49" rx="48" ry="44" fill="none" stroke="#33475A" strokeWidth="8" />
          <path d="M53 5a48 44 0 0 1 48 44" fill="none" stroke={cor.no} strokeWidth="8" strokeLinecap="round" />
        </svg>
      )}
      {ativo && <span className="brilho-no pointer-events-none absolute left-0 top-0 h-[68px] w-[78px] rounded-[50%]" style={{ '--cor': cor.no }} />}
      <button onClick={onClick} aria-label={rotulo + (ok ? ', concluída' : '')}
        className="relative grid h-[68px] w-[78px] place-items-center rounded-[50%] text-white transition-transform active:translate-y-[6px]"
        style={{ background: cor.no, boxShadow: `0 8px 0 ${cor.noEsc}` }}>
        <span className="pointer-events-none absolute left-3 top-2 h-3 w-8 -rotate-[25deg] rounded-full bg-white/35" />
        <span className={ok || cor.no === '#FFC800' ? 'text-[#2A2000]/80' : ''} style={cor.no === '#33475A' ? { color: '#5D7286' } : undefined}>{children}</span>
      </button>
    </div>
  )
}

function Popover({ cor, children, fechar }) {
  return (
    <div className={`surge absolute top-[92px] z-30 w-72 rounded-2xl p-4 ${cor.bg} ${cor.texto}`} role="dialog">
      <span className={`absolute -top-2 left-1/2 h-4 w-4 -translate-x-1/2 rotate-45 ${cor.bg}`} />
      <button onClick={fechar} aria-label="Fechar" className="absolute right-3 top-3 opacity-70"><X size={20} /></button>
      {children}
    </div>
  )
}

export function Tela({ children, onFechar, rotulo = 'Continuar' }) {
  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-ground">
      <div className="app-h safe-t mx-auto flex max-w-md flex-col px-6">
        <div className="flex flex-1 flex-col items-center justify-center py-10 text-center">{children}</div>
        <div className="safe-b"><button className="btn btn-sol" onClick={onFechar}>{rotulo}</button></div>
      </div>
    </div>
  )
}

function Guia({ e, fechar }) {
  return (
    <div className="fixed inset-0 z-40 overflow-y-auto bg-ground">
      <div className="safe-t mx-auto max-w-[620px] px-5 pb-12">
        <button onClick={fechar} aria-label="Fechar" className="py-4 text-mute"><X size={30} /></button>
        <p className="font-extrabold uppercase tracking-wider text-mute">Guia do encontro {e.ordem}</p>
        <h2 className="text-3xl font-black">{e.titulo}</h2>
        <div className="mt-5 flex items-start gap-3"><Personagem id={e.guia} busto size={70} className="shrink-0" /><Balao seta="esquerda">{e.citacao ? <>“{e.citacao}” <b className="text-sol">{e.cic_ref}</b></> : GUIAS[e.guia]?.nome}</Balao></div>
        <Arte e={e} className="mt-5" />
        <p className="mt-5 text-lg leading-relaxed">{e.leitura}</p>
        {e.video_url && <a href={e.video_url} target="_blank" rel="noreferrer" className="btn btn-marian mt-5">Assistir ao vídeo</a>}
        {e.foto_url && <img src={e.foto_url} alt={`Foto da turma no encontro ${e.titulo}`} className="mt-5 w-full rounded-2xl" />}
      </div>
    </div>
  )
}

export function Arte({ e, className = '' }) {
  if (!e.imagem_url && !e.imagem_credito) return null
  return (
    <figure className={className}>
      <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border-2 border-line bg-surface">
        {e.imagem_url && <img src={url(e.imagem_url)} alt={e.imagem_credito || ''} className="absolute inset-0 h-full w-full object-cover" onError={ev => (ev.currentTarget.style.display = 'none')} />}
        <div className="flex h-full flex-col items-center justify-center gap-2 p-6 text-center text-sol"><Marca size={64} /><span>{e.imagem_credito}</span></div>
      </div>
      {e.imagem_credito && <figcaption className="mt-1.5 text-sm text-mute">{e.imagem_credito}</figcaption>}
    </figure>
  )
}

function Codigo({ e, fechar, ok }) {
  const [codigo, setCodigo] = useState('')
  const [erro, setErro] = useState('')
  async function enviar(ev) {
    ev.preventDefault(); setErro('')
    const { data } = await sb.rpc('registrar_presenca', { p_encontro: e.id, p_codigo: codigo })
    data ? (som('presenca'), ok()) : (som('errado'), setErro('Código inválido. Confira com seu catequista.'))
  }
  return (
    <div className="fixed inset-0 z-40 flex items-end bg-black/60" onClick={fechar}>
      <form onSubmit={enviar} onClick={ev => ev.stopPropagation()} className="sobe safe-b mx-auto w-full max-w-[620px] rounded-t-3xl bg-surface px-6 pt-6">
        <div className="flex items-center gap-3"><Personagem id="jose" busto size={64} /><Balao seta="esquerda">Digite o código que o catequista mostrou no fim do encontro.</Balao></div>
        <input autoFocus className="campo mt-5 text-center text-3xl uppercase tracking-[.4em]" maxLength={6} placeholder="······" value={codigo} onChange={ev => setCodigo(ev.target.value)} aria-label="Código de presença" />
        {erro && <p role="alert" className="mt-2 text-wine">{erro}</p>}
        <button className="btn btn-sol mb-2 mt-4" disabled={codigo.length < 6}>Confirmar presença</button>
      </form>
    </div>
  )
}

function Campanha({ c, fechar }) {
  const dias = Math.max(0, Math.ceil((new Date(c.fim) - new Date(hoje())) / 864e5))
  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#0B1440]">
      <div className="app-h safe-t mx-auto flex max-w-md flex-col px-6">
        <button onClick={fechar} aria-label="Fechar" className="self-start py-4 text-white/80"><X size={32} /></button>
        <div className="relative mx-auto mt-2 grid aspect-square w-full max-w-[340px] place-items-center">
          <div className="absolute inset-4 rounded-full bg-[#1D2A73]" />
          <div className="absolute inset-12 rounded-full bg-[#FFE7A3]" />
          {[[8, 12], [86, 18], [14, 70], [90, 66], [50, 4]].map(([x, y], i) => <span key={i} className="brilha absolute h-2.5 w-2.5 rotate-45 rounded-sm bg-sol" style={{ left: `${x}%`, top: `${y}%`, animationDelay: `${i * 0.3}s` }} />)}
          {/* coroa do Advento: quatro velas */}
          <div className="absolute bottom-10 flex items-end gap-3">
            {['#6236C9', '#6236C9', '#F07CA8', '#6236C9'].map((v, i) => (
              <div key={i} className="flex flex-col items-center"><span className="chama h-4 w-2.5 rounded-full bg-[#FF9600]" style={{ animationDelay: `${i * 0.2}s`, opacity: i === 0 ? 1 : 0.25 }} /><span className="mt-0.5 h-12 w-5 rounded-md" style={{ background: v }} /></div>
            ))}
          </div>
          <div className="surge relative -mt-10"><Personagem id={c.guia} size={150} humor="sorriso" /></div>
        </div>
        <h2 className="mt-4 text-center text-3xl font-black text-white">{c.titulo}</h2>
        <p className="mt-2 flex items-center justify-center gap-1.5 font-extrabold uppercase tracking-wider text-sol"><CalendarClock size={20} /> Termina em {dias} dias</p>
        <p className="mt-3 text-center text-lg text-white/90">{c.texto}</p>
        <div className="flex-1" />
        <button className="btn btn-claro safe-b mb-2 mt-8" onClick={fechar}>Bora!</button>
      </div>
    </div>
  )
}

/* ---------------- Ranking ---------------- */

function Ranking({ perfil }) {
  const [semana, setSemana] = useState(true)
  const [lista, setLista] = useState(null)
  useEffect(() => { setLista(null); sb.rpc('ranking', { p_semana: semana }).then(({ data }) => setLista(data || [])) }, [semana])
  const medalha = ['#FFC800', '#C9D2DA', '#D58E4A']
  return (
    <div className="px-4">
      <div className="flex flex-col items-center pt-2 text-center">
        <div className="flex items-end gap-1">
          {['#D58E4A', '#FFC800', '#C9D2DA'].map((c, i) => <Shield key={i} size={i === 1 ? 64 : 46} fill={c} color={c} className={i === 1 ? 'surge' : 'opacity-70'} />)}
        </div>
        <h1 className="mt-3 text-2xl font-black">Liga da {perfil.turma}</h1>
        <p className="text-mute">{semana ? 'XP desta semana. Recomeça toda segunda.' : 'XP desde o início da caminhada.'}</p>
        <div className="mt-4 flex rounded-2xl border-2 border-line p-1">
          {[[true, 'Semana'], [false, 'Geral']].map(([v, t]) => <button key={t} onClick={() => setSemana(v)} className={`rounded-xl px-6 py-2 font-extrabold uppercase ${semana === v ? 'bg-raised text-sol' : 'text-mute'}`}>{t}</button>)}
        </div>
      </div>
      <ol className="mt-5 border-t-2 border-line">
        {!lista && <p className="p-6 text-center text-mute">Carregando…</p>}
        {lista?.map((a, i) => (
          <li key={a.id} className={`flex items-center gap-3 rounded-2xl px-3 py-2.5 ${a.id === perfil.id ? 'bg-[#16304F]' : ''}`}>
            <span className="w-8 text-center text-lg font-black" style={{ color: medalha[i] || '#8EA3B5' }}>{i < 3 ? <Shield size={26} fill={medalha[i]} color={medalha[i]} className="mx-auto" /> : i + 1}</span>
            <span className="h-12 w-12 overflow-hidden rounded-full bg-[#E5E9EC]"><Personagem spec={{ ...AVATAR_PADRAO, ...a.avatar }} busto size={48} /></span>
            <span className="flex-1 text-lg">{a.nome || 'Crismando'}{a.id === perfil.id && <span className="text-mute"> (você)</span>}</span>
            <span className="text-mute">{a.xp} XP</span>
          </li>
        ))}
        {lista?.length === 0 && <p className="p-6 text-center text-mute">Ninguém pontuou ainda nesta semana. Seja o primeiro!</p>}
      </ol>
    </div>
  )
}

/* ---------------- Troféus ---------------- */

function Trofeus({ trofeus, conquistas, metricas }) {
  const [filtro, setFiltro] = useState('todos')
  const [sel, setSel] = useState(null)
  const [giro, setGiro] = useState(0)
  const ganho = t => conquistas.find(x => x.trofeu_id === t.id)
  const prog = t => Math.min(1, (metricas[t.tipo] || 0) / t.meta)
  const lista = trofeus.filter(t => filtro === 'todos' || (filtro === 'ganhos' ? ganho(t) : !ganho(t)))
  const total = trofeus.length, feitos = trofeus.filter(ganho).length
  const linhas = []; for (let i = 0; i < lista.length; i += 3) linhas.push(lista.slice(i, i + 3))
  const abrir = t => { som(ganho(t) ? 'trofeu' : 'toque'); setSel(t) }
  return (
    <div className="px-4">
      {/* resumo: anel com quantos foram conquistados */}
      <div className="flex items-center gap-4 rounded-3xl border-2 border-b-4 border-line bg-surface p-4">
        <div className="relative grid h-24 w-24 shrink-0 place-items-center">
          <svg viewBox="0 0 100 100" className="absolute inset-0" aria-hidden="true">
            <circle cx="50" cy="50" r="42" fill="none" stroke="var(--color-raised)" strokeWidth="10" />
            <circle cx="50" cy="50" r="42" fill="none" stroke="#FFC800" strokeWidth="10" strokeLinecap="round" strokeDasharray={`${(feitos / Math.max(1, total)) * 264} 264`} transform="rotate(-90 50 50)" />
          </svg>
          <Medalha icone="trofeu" size={52} />
        </div>
        <div>
          <h1 className="text-2xl font-black">Sala de troféus</h1>
          <p className="text-mute"><b className="text-sol">{feitos}</b> de {total} conquistados. Toque numa medalha para ver o desafio.</p>
        </div>
      </div>
      <div className="mt-4 flex gap-2">
        {[['todos', 'Todos'], ['ganhos', 'Conquistados'], ['faltam', 'Em progresso']].map(([id, n]) => (
          <button key={id} onClick={() => { som('toque'); setFiltro(id) }} className={`rounded-2xl border-2 px-4 py-2 text-sm font-extrabold uppercase ${filtro === id ? 'border-marian bg-marian/15 text-marian' : 'border-line text-mute'}`}>{n}</button>
        ))}
      </div>
      {/* estante: três medalhas por prateleira */}
      <div className="mt-5 space-y-6">
        {linhas.map((l, i) => (
          <div key={i}>
            <div className="grid grid-cols-3 gap-2 px-2">
              {l.map(t => {
                const g = ganho(t)
                return (
                  <button key={t.id} onClick={() => abrir(t)} aria-label={t.titulo} className="flex flex-col items-center active:scale-90 transition-transform">
                    <div className="relative grid h-24 w-24 place-items-center">
                      {!g && <svg viewBox="0 0 100 100" className="absolute inset-0" aria-hidden="true"><circle cx="50" cy="50" r="44" fill="none" stroke="var(--color-raised)" strokeWidth="6" /><circle cx="50" cy="50" r="44" fill="none" stroke="#3D8BFF" strokeWidth="6" strokeLinecap="round" strokeDasharray={`${prog(t) * 276} 276`} transform="rotate(-90 50 50)" /></svg>}
                      <div className={g ? 'pula' : ''} style={{ animationDelay: `${(t.id % 5) * 0.3}s` }}><Medalha icone={t.icone} ativo={!!g} size={g ? 80 : 64} /></div>
                      {g && <span className="brilha absolute right-2 top-1 h-3 w-3 rotate-45 rounded-sm bg-[#FFF3B8]" />}
                      {t.premio && <span className="absolute -bottom-1 right-1 grid h-7 w-7 place-items-center rounded-full border-2 border-ground bg-wine text-white"><Gift size={14} /></span>}
                    </div>
                    <span className={`mt-1 text-center text-sm leading-tight ${g ? 'text-ink' : 'text-mute'}`}>{t.titulo}</span>
                  </button>
                )
              })}
            </div>
            <div className="mt-2 h-3 rounded-full bg-[#8A5A2E] shadow-[0_5px_0_#5B3A20]" />
          </div>
        ))}
        {!lista.length && <p className="py-8 text-center text-mute">Nada por aqui ainda.</p>}
      </div>

      {sel && (() => {
        const g = ganho(sel), atual = Math.min(sel.meta, metricas[sel.tipo] || 0)
        return (
          <div className="fixed inset-0 z-40 flex items-end bg-black/60" onClick={() => setSel(null)}>
            <div onClick={ev => ev.stopPropagation()} className="sobe safe-b relative mx-auto w-full max-w-[620px] overflow-hidden rounded-t-3xl bg-surface px-6 pb-4 pt-8 text-center">
              {g && <div className="pointer-events-none absolute inset-x-0 top-0 h-40">{[...Array(16)].map((_, i) => <span key={i} className="confete absolute h-2.5 w-1.5 rounded-sm" style={{ left: `${4 + i * 6}%`, background: ['#FFC800', '#E0455F', '#3D8BFF', '#7FB83A'][i % 4], animationDelay: `${(i % 5) * 0.12}s` }} />)}</div>}
              {/* tocar na medalha faz ela girar */}
              <button key={giro} onClick={() => { som(g ? 'trofeu' : 'toque'); setGiro(x => x + 1) }} aria-label="Girar medalha" className="gira mx-auto block w-fit">
                <Medalha icone={sel.icone} ativo={!!g} size={140} />
              </button>
              <h2 className="mt-3 text-2xl font-black">{sel.titulo}</h2>
              <p className="text-mute">{sel.descricao}</p>
              {g ? <p className="mt-3 font-extrabold text-sol">Conquistado em {new Date(g.created_at).toLocaleDateString('pt-BR')}</p>
                : <div className="mt-4 flex items-center gap-3"><Barra valor={atual / sel.meta} cor="bg-marian" /><span className="font-extrabold text-marian">{atual}/{sel.meta}</span></div>}
              {sel.premio && (
                <div className="mt-4 flex items-center gap-3 rounded-2xl border-2 border-dashed border-wine p-3 text-left">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-wine text-white"><Gift size={22} /></span>
                  <span><b className="block">{sel.premio}</b><span className="text-sm text-mute">{g ? (g.entregue ? 'Já entregue pelo catequista.' : 'Retire com seu catequista no próximo encontro!') : 'Prêmio de verdade, entregue pelo catequista.'}</span></span>
                </div>
              )}
              <button className="btn btn-sol mt-5" onClick={() => setSel(null)}>{g ? 'Glória a Deus!' : 'Bora conquistar'}</button>
            </div>
          </div>
        )
      })()}
    </div>
  )
}

/* ---------------- Credencial do peregrino (fotos e materiais de cada encontro) ---------------- */

const TINTA = ['#E0455F', '#3D8BFF', '#7FB83A', '#8B5CF6', '#FF8A3D', '#29B39A']

// carimbo redondo com borda serrilhada, o objeto do encontro no meio e a data
function Carimbo({ e, i, marcado, bloqueado, batendo }) {
  const cor = bloqueado ? '#5B6E80' : TINTA[i % TINTA.length]
  const dentes = [...Array(28)].map((_, k) => { const a = (k / 28) * Math.PI * 2; return `${50 + Math.cos(a) * 46},${50 + Math.sin(a) * 46} ${50 + Math.cos(a + Math.PI / 28) * 42},${50 + Math.sin(a + Math.PI / 28) * 42}` }).join(' ')
  return (
    <div className={`relative ${batendo ? 'carimbar' : ''}`} style={{ transform: `rotate(${((i * 37) % 17) - 8}deg)` }}>
      <svg viewBox="0 0 100 100" className="w-full" aria-hidden="true">
        <polygon points={dentes} fill={marcado ? cor : 'none'} stroke={cor} strokeWidth="2.5" strokeDasharray={marcado ? '' : '4 4'} opacity={marcado ? 1 : 0.7} />
        <circle cx="50" cy="50" r="34" fill={marcado ? '#FFF8E6' : 'none'} stroke={marcado ? '#fff' : cor} strokeWidth="2" strokeDasharray={marcado ? '' : '3 4'} opacity={marcado ? 1 : 0.6} />
        <path id={`arco${e.id}`} d="M22 50a28 28 0 0 1 56 0" fill="none" />
        <text fontSize="8.5" fontWeight="900" fill={marcado ? cor : '#8EA3B5'} letterSpacing="1"><textPath href={`#arco${e.id}`} startOffset="50%" textAnchor="middle">ENCONTRO {e.ordem}</textPath></text>
        <text x="50" y="80" textAnchor="middle" fontSize="7.5" fontWeight="800" fill={marcado ? cor : '#8EA3B5'}>{e.data ? dataBR(e.data).toUpperCase() : 'EM BREVE'}</text>
      </svg>
      <div className={`absolute left-1/2 top-1/2 grid h-[44%] w-[56%] -translate-x-1/2 -translate-y-1/2 place-items-center ${marcado ? '' : 'opacity-40 grayscale'}`}>
        {bloqueado ? <Lock size={22} color="#8EA3B5" /> : i === 0 ? <Marca size={26} /> : <Objeto id={ORDEM_OBJETOS[(i - 1) % ORDEM_OBJETOS.length]} size={58} />}
      </div>
    </div>
  )
}

function Acervo({ encontros, presenca }) {
  const [aberto, setAberto] = useState(null)
  const [batendo, setBatendo] = useState(null)
  const carimbados = encontros.filter(e => presenca(e.id)).length
  const tocar = e => {
    if (!e.liberado) return
    if (presenca(e.id)) { som('presenca'); setBatendo(e.id); setTimeout(() => { setBatendo(null); setAberto(e) }, 420) }
    else { som('toque'); setAberto(e) }
  }
  return (
    <div className="px-4">
      {/* capa da credencial */}
      <div className="relative overflow-hidden rounded-3xl border-b-4 border-[#5E1622] bg-[#8E1F35] p-5 text-[#FFF3D6]">
        <div className="absolute -right-6 -top-6 h-28 w-28 rounded-full border-[10px] border-[#FFC800]/25" />
        <p className="text-sm font-extrabold uppercase tracking-widest text-[#FFC800]">Credencial do peregrino</p>
        <h1 className="mt-1 text-2xl font-black">Meu caminho até a Crisma</h1>
        <p className="mt-1 opacity-85">Cada presença ganha um carimbo. Toque para ver fotos e materiais do encontro.</p>
        <div className="mt-3 flex items-center gap-3"><Barra valor={carimbados / Math.max(1, encontros.length)} /><b className="text-[#FFC800]">{carimbados}/{encontros.length}</b></div>
      </div>
      {/* páginas com os carimbos */}
      <div className="mt-5 rounded-3xl border-2 border-b-4 border-line bg-[#FFF8E6] p-4" style={{ backgroundImage: 'repeating-linear-gradient(0deg, transparent 0 31px, #F1E4C7 31px 32px)' }}>
        <div className="grid grid-cols-2 gap-x-4 gap-y-5">
          {encontros.map((e, i) => (
            <button key={e.id} disabled={!e.liberado} onClick={() => tocar(e)} className="text-center disabled:cursor-default active:scale-95 transition-transform">
              <Carimbo e={e} i={i} marcado={!!presenca(e.id)} bloqueado={!e.liberado} batendo={batendo === e.id} />
              <p className="mt-1 text-sm font-extrabold leading-tight text-[#3A2E28]">{e.titulo}</p>
              {e.foto_url && <span className="mt-1 inline-flex items-center gap-1 rounded-full bg-[#3A2E28] px-2 py-0.5 text-xs text-[#FFF3D6]"><Images size={12} /> foto</span>}
            </button>
          ))}
        </div>
      </div>
      {aberto && <Guia e={aberto} fechar={() => setAberto(null)} />}
    </div>
  )
}

/* ---------------- Perfil ---------------- */

function BotaoTema() {
  const [claro, setClaro] = useState(document.documentElement.dataset.tema === 'claro')
  const trocar = () => {
    const v = !claro; setClaro(v); som('toque')
    document.documentElement.dataset.tema = v ? 'claro' : 'escuro'
    try { localStorage.setItem('tema', v ? 'claro' : 'escuro') } catch {}
  }
  return (
    <button onClick={trocar} className="mt-3 flex w-full items-center justify-between rounded-2xl border-2 border-b-4 border-line px-4 py-3 active:translate-y-[2px]">
      <span className="text-lg">Tema</span>
      <span className="flex rounded-xl bg-raised p-1 text-sm font-extrabold uppercase">
        <span className={`rounded-lg px-3 py-1 ${!claro ? 'bg-ground text-ink' : 'text-mute'}`}>Escuro</span>
        <span className={`rounded-lg px-3 py-1 ${claro ? 'bg-sol text-[#2A2000]' : 'text-mute'}`}>Claro</span>
      </span>
    </button>
  )
}

function BotaoSom() {
  const [ligado, setLigado] = useState(somLigado())
  return (
    <button onClick={() => { const v = alternarSom(); setLigado(v); if (v) som('certo') }}
      className="mt-7 flex w-full items-center justify-between rounded-2xl border-2 border-b-4 border-line px-4 py-3 active:translate-y-[2px]">
      <span className="text-lg">Sons e vibração</span>
      <span className={`rounded-xl px-3 py-1 font-extrabold uppercase ${ligado ? 'bg-sol text-[#2A2000]' : 'bg-raised text-mute'}`}>{ligado ? 'Ligado' : 'Desligado'}</span>
    </button>
  )
}

function Perfil({ perfil, avatar, metricas, conquistas, trofeus, presencas, setEditarAvatar }) {
  const [metas, setMetas] = useState([])
  useEffect(() => { sb.from('pdi_metas').select('*').eq('aluno_id', perfil.id).order('created_at').then(({ data }) => setMetas(data || [])) }, [])
  const stats = [
    [<Chama size={26} acesa={metricas.semana_feita} />, metricas.streak || 0, 'Semanas de ofensiva'],
    [<Gema size={26} />, perfil.xp, 'Total de XP'],
    [<Check size={26} color="#7FB83A" strokeWidth={4} />, presencas.length, 'Presenças'],
    [<Star size={26} color="#FFC800" fill="#FFC800" />, metricas.licoes || 0, 'Lições feitas'],
  ]
  return (
    <div>
      <div className="safe-t relative overflow-hidden text-white" style={{ background: normalizar(perfil.avatar).fundo }}>
        <div className="pointer-events-none absolute -left-10 -top-10 h-40 w-40 rounded-full bg-white/15" /><div className="pointer-events-none absolute -bottom-16 -right-10 h-48 w-48 rounded-full bg-black/10" />
        <div className="flex items-center justify-between px-5 pt-4">
          <h1 className="text-2xl font-black">{perfil.nome || 'Crismando'}</h1>
          <div className="flex gap-4">
            <button onClick={() => setEditarAvatar(true)} aria-label="Editar visual"><Shirt size={28} /></button>
            <button onClick={() => confirm('Sair da conta?') && sb.auth.signOut()} aria-label="Sair"><Settings size={28} /></button>
          </div>
        </div>
        <button onClick={() => setEditarAvatar(true)} className="mx-auto block" aria-label="Editar visual"><Personagem spec={avatar} busto sombra={false} size={190} /></button>
      </div>
      <div className="px-5">
        <p className="mt-5 font-extrabold uppercase tracking-wider text-mute">{perfil.turma} · na caminhada desde {new Date(perfil.created_at).getFullYear()}</p>
        <button className="btn btn-ghost mt-4" onClick={() => setEditarAvatar(true)}>Personalizar meu visual</button>
        <h2 className="mt-7 text-xl font-black">Visão geral</h2>
        <div className="mt-3 grid grid-cols-2 gap-3">
          {stats.map(([ic, v, t]) => <div key={t} className="flex items-center gap-3 rounded-2xl border-2 border-line p-3">{ic}<div><p className="text-xl font-black leading-none">{v}</p><p className="text-sm text-mute">{t}</p></div></div>)}
        </div>
        <h2 className="mt-7 text-xl font-black">Conquistas</h2>
        <div className="mt-3 flex flex-wrap gap-2">
          {trofeus.map(t => <div key={t.id} title={t.titulo}><Medalha icone={t.icone} ativo={conquistas.some(c => c.trofeu_id === t.id)} size={54} /></div>)}
        </div>
        <BotaoSom />
        <BotaoTema />
        <h2 className="mt-7 text-xl font-black">Meu plano de vida</h2>
        <div className="mt-3 space-y-2">
          {metas.length === 0 && <p className="text-mute">Seu catequista ainda não definiu metas com você.</p>}
          {metas.map(m => (
            <div key={m.id} className="rounded-2xl border-2 border-line p-3">
              <p className="text-sm text-sol">{AREAS[m.area]}</p>
              <p className="text-lg">{m.meta}</p>
              <p className="text-sm text-mute">{STATUS[m.status]}{m.prazo ? ` · até ${dataBR(m.prazo)}` : ''}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
