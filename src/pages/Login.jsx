import { useState } from 'react'
import { ArrowLeft, Eye, EyeOff } from 'lucide-react'
import { sb, url } from '../lib'
import Personagem from '../components/Personagem'
import { som } from '../sons'

export function Balao({ children, seta = 'baixo', className = '' }) {
  return (
    <div className={`relative rounded-2xl border-2 border-line bg-ground px-4 py-3 text-[17px] leading-snug text-ink ${className}`}>
      {children}
      {seta === 'baixo'
        ? <span className="absolute -bottom-[9px] left-1/2 h-4 w-4 -translate-x-1/2 rotate-45 border-b-2 border-r-2 border-line bg-ground" />
        : <span className="absolute -left-[9px] top-1/2 h-4 w-4 -translate-y-1/2 rotate-45 border-b-2 border-l-2 border-line bg-ground" />}
    </div>
  )
}

export function Barra({ valor, cor = 'bg-sol' }) {
  return (
    <div className="h-4 flex-1 overflow-hidden rounded-full bg-raised" role="progressbar" aria-valuenow={Math.round(valor * 100)}>
      <div className={`relative h-full rounded-full ${cor} transition-all duration-500`} style={{ width: `${Math.max(6, valor * 100)}%` }}>
        <span className="absolute left-2 right-2 top-1 h-1 rounded-full bg-white/40" />
      </div>
    </div>
  )
}

function Moldura({ children, rodape, voltar, progresso }) {
  return (
    <main className="app-h safe-t mx-auto flex max-w-md flex-col px-5">
      <header className="flex items-center gap-4 py-4">
        <button onClick={voltar} aria-label="Voltar" className="text-mute"><ArrowLeft size={28} /></button>
        {progresso !== undefined && <Barra valor={progresso} />}
      </header>
      <section className="flex flex-1 flex-col">{children}</section>
      <footer className="safe-b pt-4">{rodape}</footer>
    </main>
  )
}

export default function Login() {
  const [tela, setTela] = useState('inicio') // inicio | nome | criar | entrar
  const [nome, setNome] = useState('')
  const primeiro = nome.trim().split(/\s+/)[0]

  if (tela === 'inicio') return (
    <main className="app-h safe-t mx-auto flex max-w-md flex-col px-6 pb-4">
      <div className="flex flex-1 flex-col items-center justify-center text-center">
        <div className="surge"><Personagem id="jesus" size={200} className="pula" /></div>
        <h1 className="mt-7 text-5xl font-black tracking-tight text-sol">fidelingo</h1>
        <p className="mt-3 text-lg">Sua caminhada até a Crisma.</p>
      </div>
      <div className="safe-b space-y-3">
        <button className="btn btn-sol" onClick={() => { som('toque'); setTela('nome') }}>Começar</button>
        <button className="btn btn-ghost" onClick={() => setTela('entrar')}>Já tenho uma conta</button>
      </div>
    </main>
  )

  // um só passo: Jesus pergunta o nome e ele aparece grande embaixo enquanto a pessoa digita
  if (tela === 'nome') return (
    <Moldura voltar={() => setTela('inicio')} progresso={primeiro ? 0.5 : 0.15}
      rodape={<button className="btn btn-sol" disabled={!primeiro} onClick={() => { som('certo'); setTela('criar') }}>Continuar</button>}>
      <div className="flex items-center gap-3">
        <Personagem id="jesus" busto size={92} className="shrink-0" />
        <Balao seta="esquerda" className="surge">A paz! Eu sou <b className="text-sol">Jesus</b>. Como você se chama?</Balao>
      </div>
      <input autoFocus className="campo mt-6 text-center text-xl" placeholder="Digite seu nome" aria-label="Seu nome" maxLength={40}
        value={nome} onChange={e => setNome(e.target.value)} onKeyDown={e => e.key === 'Enter' && primeiro && setTela('criar')} />
      <div className="flex flex-1 flex-col items-center justify-center text-center">
        {primeiro ? (
          <>
            <p className="text-lg text-mute">Prazer,</p>
            <p key={primeiro} className="surge break-all text-5xl font-black text-sol">{primeiro}!</p>
            <div className="mt-2 flex gap-2">{[0, 1, 2].map(i => <span key={i} className="brilha h-2.5 w-2.5 rotate-45 rounded-sm bg-sol" style={{ animationDelay: `${i * 0.25}s` }} />)}</div>
          </>
        ) : <p className="text-mute">Seu nome vai aparecer aqui.</p>}
      </div>
    </Moldura>
  )

  return <Formulario modo={tela} resp={{}} nomeInicial={nome.trim()} trocar={setTela} />
}

function Formulario({ modo, resp, trocar, nomeInicial = '' }) {
  const criar = modo === 'criar'
  const [f, setF] = useState({ nome: nomeInicial, email: '', senha: '' })
  const [ver, setVer] = useState(false)
  const [msg, setMsg] = useState('')
  const [carregando, setCarregando] = useState(false)
  const set = k => e => setF({ ...f, [k]: e.target.value })
  const linha = 'w-full bg-transparent px-4 py-4 text-ink outline-none placeholder:text-mute'

  async function enviar(e) {
    e.preventDefault(); setMsg(''); setCarregando(true)
    const { error, data } = criar
      ? await sb.auth.signUp({ email: f.email, password: f.senha, options: { data: { nome: f.nome, onboarding: resp } } })
      : await sb.auth.signInWithPassword({ email: f.email, password: f.senha })
    setCarregando(false)
    if (error) return setMsg(error.message === 'Invalid login credentials' ? 'E-mail ou senha incorretos.' : error.message)
    if (criar && !data.session) setMsg('Conta criada! Confirme pelo link enviado ao seu e-mail e depois entre.')
  }
  async function esqueci() {
    if (!f.email) return setMsg('Digite seu e-mail acima primeiro.')
    await sb.auth.resetPasswordForEmail(f.email)
    setMsg('Enviamos um link para redefinir a senha.')
  }

  return (
    <main className="app-h safe-t mx-auto flex max-w-md flex-col px-5">
      <header className="flex items-center py-4">
        <button onClick={() => trocar(criar ? 'nome' : 'inicio')} aria-label="Voltar" className="text-mute"><ArrowLeft size={28} /></button>
        <h1 className="flex-1 pr-7 text-center text-xl text-mute">{criar ? 'Crie seu perfil' : 'Insira os seus dados'}</h1>
      </header>
      {criar && <div className="mb-5 flex items-center gap-3"><Personagem id="jesus" humor="sorriso" busto size={70} className="shrink-0" /><Balao seta="esquerda" className="surge">{f.nome.trim() ? <>Ótimo, <b className="text-sol">{f.nome.trim().split(' ')[0]}</b>! Agora crie seu acesso.</> : 'Agora vamos criar seu acesso.'}</Balao></div>}
      <form onSubmit={enviar} className="flex flex-1 flex-col">
        <div className="overflow-hidden rounded-2xl border-2 border-line bg-surface">
          {criar && <input className={`${linha} border-b-2 border-line`} placeholder="Seu nome" aria-label="Seu nome" value={f.nome} onChange={set('nome')} required />}
          <input className={`${linha} border-b-2 border-line`} type="email" placeholder="E-mail" aria-label="E-mail" autoComplete="email" value={f.email} onChange={set('email')} required />
          <div className="flex items-center">
            <input className={linha} type={ver ? 'text' : 'password'} placeholder="Senha" aria-label="Senha" minLength={6} autoComplete={criar ? 'new-password' : 'current-password'} value={f.senha} onChange={set('senha')} required />
            <button type="button" onClick={() => setVer(!ver)} aria-label={ver ? 'Esconder senha' : 'Mostrar senha'} className="px-4 text-marian">{ver ? <EyeOff /> : <Eye />}</button>
          </div>
        </div>
        <button className="btn btn-sol mt-5" disabled={carregando || !f.email || f.senha.length < 6}>{criar ? 'Criar conta' : 'Entrar'}</button>
        {!criar && <button type="button" onClick={esqueci} className="mt-6 text-center font-extrabold uppercase tracking-wider text-marian">Esqueci a senha</button>}
        {msg && <p role="alert" className="mt-4 text-center text-sol">{msg}</p>}
        <div className="flex-1" />
        <button type="button" className="btn btn-ghost safe-b mb-2" onClick={() => trocar(criar ? 'entrar' : 'ola')}>{criar ? 'Já tenho uma conta' : 'Criar uma conta'}</button>
      </form>
    </main>
  )
}
