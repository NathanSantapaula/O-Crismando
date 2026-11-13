import { useState } from 'react'
import { ArrowLeft, Eye, EyeOff } from 'lucide-react'
import { sb, url } from '../lib'
import Personagem from '../components/Personagem'

const PERGUNTAS = [
  { chave: 'origem', fala: 'Como você conheceu o Fidelingo?', opcoes: ['Pelo meu catequista', 'Na paróquia', 'Por amigos', 'Pela família', 'Nas redes sociais'] },
  { chave: 'tempo', fala: 'Quanto tempo por semana você quer rezar e estudar aqui?', opcoes: ['5 minutos, tranquilo', '15 minutos, firme', '30 minutos, intenso', '1 hora, missionário'] },
  { chave: 'motivo', fala: 'O que mais te move a receber a Crisma?', opcoes: ['Fortalecer minha fé', 'Viver os sacramentos', 'Poder ser padrinho ou madrinha', 'Ainda estou descobrindo'] },
]

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
  const [tela, setTela] = useState('inicio') // inicio | ola | rapidas | q0..q2 | criar | entrar
  const [resp, setResp] = useState({})
  const passo = /^q\d$/.test(tela) ? +tela[1] : null

  if (tela === 'inicio') return (
    <main className="app-h safe-t mx-auto flex max-w-md flex-col px-6 pb-4">
      <div className="flex flex-1 flex-col items-center justify-center text-center">
        <div className="surge"><img src={url('/capa.png')} alt="" width="168" height="168" className="pula rounded-[40px] border-b-[6px] border-[#0A1118]" /></div>
        <h1 className="mt-7 text-5xl font-black tracking-tight text-sol">fidelingo</h1>
        <p className="mt-3 text-lg">Sua caminhada até a Crisma.</p>
      </div>
      <div className="safe-b space-y-3">
        <button className="btn btn-sol" onClick={() => setTela('ola')}>Começar</button>
        <button className="btn btn-ghost" onClick={() => setTela('entrar')}>Já tenho uma conta</button>
      </div>
    </main>
  )

  if (tela === 'ola' || tela === 'rapidas') return (
    <Moldura voltar={() => setTela(tela === 'ola' ? 'inicio' : 'ola')} rodape={<button className="btn btn-sol" onClick={() => setTela(tela === 'ola' ? 'rapidas' : 'q0')}>Continuar</button>}>
      <div className="flex flex-1 flex-col items-center justify-center">
        <Balao key={tela} className="surge max-w-xs text-center">
          {tela === 'ola' ? <>A paz! Eu sou <b className="text-sol">Jesus</b>. Vou caminhar com você até a Crisma.</> : <>Só <b>3 perguntas rápidas</b> e depois vamos para a sua primeira lição!</>}
        </Balao>
        <Personagem id="jesus" humor={tela === 'ola' ? 'sorriso' : 'feliz'} size={150} className="balanca mt-5" />
      </div>
    </Moldura>
  )

  if (passo !== null) {
    const q = PERGUNTAS[passo]
    return (
      <Moldura progresso={(passo + 1) / (PERGUNTAS.length + 1)} voltar={() => setTela(passo ? `q${passo - 1}` : 'rapidas')}
        rodape={<button className="btn btn-sol" disabled={!resp[q.chave]} onClick={() => setTela(passo < 2 ? `q${passo + 1}` : 'criar')}>Continuar</button>}>
        <div className="flex items-center gap-3">
          <Personagem id="jesus" busto size={86} className="shrink-0" />
          <Balao seta="esquerda" key={passo} className="surge">{q.fala}</Balao>
        </div>
        <div className="mt-6 space-y-3">
          {q.opcoes.map(o => (
            <button key={o} onClick={() => setResp({ ...resp, [q.chave]: o })}
              className={`w-full rounded-2xl border-2 border-b-4 px-5 py-4 text-left text-lg active:translate-y-[2px] ${resp[q.chave] === o ? 'border-marian bg-[#16304F] text-[#9CC5FF]' : 'border-line'}`}>{o}</button>
          ))}
        </div>
      </Moldura>
    )
  }

  return <Formulario modo={tela} resp={resp} trocar={setTela} />
}

function Formulario({ modo, resp, trocar }) {
  const criar = modo === 'criar'
  const [f, setF] = useState({ nome: '', email: '', senha: '' })
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
        <button onClick={() => trocar(criar ? 'q2' : 'inicio')} aria-label="Voltar" className="text-mute"><ArrowLeft size={28} /></button>
        <h1 className="flex-1 pr-7 text-center text-xl text-mute">{criar ? 'Crie seu perfil' : 'Insira os seus dados'}</h1>
      </header>
      {criar && <div className="mb-5 flex items-center gap-3"><Personagem id="jesus" humor="sorriso" busto size={70} className="shrink-0" /><Balao seta="esquerda">Ótimo! Agora vamos criar seu perfil.</Balao></div>}
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
