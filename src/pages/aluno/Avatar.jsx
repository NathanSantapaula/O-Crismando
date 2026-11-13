import { useState } from 'react'
import { X, Palette, Scissors, Smile, Shirt, Crown, Glasses, Sparkles, Shuffle } from 'lucide-react'
import { sb } from '../../lib'
import { som } from '../../sons'
import Boneco, { normalizar, OPCOES, NOMES, PELES, CORES_CABELO, CORES_OLHO, CORES_ROUPA, FUNDOS } from '../../components/Boneco'

const ABAS = [
  { id: 'pele', Icone: Palette, nome: 'Pele e fundo' },
  { id: 'cabelo', Icone: Scissors, nome: 'Cabelo' },
  { id: 'rosto', Icone: Smile, nome: 'Rosto' },
  { id: 'roupa', Icone: Shirt, nome: 'Roupa' },
  { id: 'cabeca', Icone: Crown, nome: 'Na cabeça' },
  { id: 'detalhe', Icone: Glasses, nome: 'Detalhes' },
  { id: 'extra', Icone: Sparkles, nome: 'Itens' },
]
const sorteia = l => l[Math.floor(Math.random() * l.length)]

export default function Avatar({ perfil, onFim }) {
  const [b, setB] = useState(normalizar(perfil.avatar))
  const [aba, setAba] = useState('pele')
  const [pulo, setPulo] = useState(0)
  const [salvando, setSalvando] = useState(false)
  const mudar = patch => { som('selecionar'); setB(x => ({ ...x, ...patch })); setPulo(p => p + 1) }

  function surpresa() {
    som('bau'); setPulo(p => p + 1)
    setB(x => ({ ...x, pele: sorteia(PELES), olhos: sorteia(CORES_OLHO), expressao: sorteia(OPCOES.expressao), cabelo: sorteia(OPCOES.cabelo), corCabelo: sorteia(CORES_CABELO),
      roupa: sorteia(OPCOES.roupa), corRoupa: sorteia(CORES_ROUPA), cabeca: sorteia(OPCOES.cabeca), rosto: sorteia(OPCOES.rosto), extra: sorteia(OPCOES.extra), fundo: sorteia(FUNDOS) }))
  }
  async function salvar() {
    setSalvando(true); som('concluir')
    await sb.from('profiles').update({ avatar: b }).eq('id', perfil.id)
    setTimeout(onFim, 500)
  }

  const Cores = ({ titulo, lista, campo }) => (
    <section className="mb-7">
      <h3 className="mb-3 text-lg font-black">{titulo}</h3>
      <div className="grid grid-cols-6 gap-2">
        {lista.map(c => (
          <button key={c} onClick={() => mudar({ [campo]: c })} aria-label={`${titulo} ${c}`} aria-pressed={b[campo] === c}
            className={`grid aspect-square place-items-center rounded-2xl border-2 border-b-4 transition-transform active:scale-90 ${b[campo] === c ? 'border-marian bg-marian/15' : 'border-line'}`}>
            <span className="h-3/5 w-3/5 rounded-xl" style={{ background: c, boxShadow: 'inset 0 -3px 0 rgba(0,0,0,.18)' }} />
          </button>
        ))}
      </div>
    </section>
  )
  const Pecas = ({ titulo, campo, cols = 3 }) => (
    <section className="mb-7">
      <h3 className="mb-3 text-lg font-black">{titulo}</h3>
      <div className={`grid gap-3 ${cols === 4 ? 'grid-cols-4' : 'grid-cols-3'}`}>
        {OPCOES[campo].map(o => {
          const sel = b[campo] === o
          return (
            <button key={o} onClick={() => mudar({ [campo]: o })} aria-pressed={sel}
              className={`relative flex flex-col items-center overflow-hidden rounded-2xl border-2 border-b-4 pb-1.5 transition-transform active:scale-95 ${sel ? 'border-marian bg-marian/15' : 'border-line bg-surface'}`}>
              <Boneco spec={{ ...b, [campo]: o }} busto size={cols === 4 ? 64 : 84} />
              <span className="px-1 text-center text-xs font-extrabold leading-tight text-mute">{NOMES[o]}</span>
              {sel && <span className="absolute right-1.5 top-1.5 h-3 w-3 rounded-full bg-marian" />}
            </button>
          )
        })}
      </div>
    </section>
  )

  return (
    <main className="app-h mx-auto flex max-w-[620px] flex-col bg-ground">
      {/* palco: boneco sobre o fundo escolhido, pula a cada troca */}
      <div className="safe-t relative overflow-hidden" style={{ background: b.fundo }}>
        <div className="absolute -left-10 -top-10 h-40 w-40 rounded-full bg-white/15" />
        <div className="absolute -bottom-16 -right-10 h-48 w-48 rounded-full bg-black/10" />
        <header className="relative flex items-center px-4 py-3 text-white">
          <button onClick={onFim} aria-label="Fechar" className="grid h-10 w-10 place-items-center rounded-full bg-black/20"><X size={24} /></button>
          <h1 className="flex-1 text-center text-xl font-black drop-shadow">Monte seu visual</h1>
          <button onClick={surpresa} aria-label="Surpreenda-me" className="grid h-10 w-10 place-items-center rounded-full bg-black/20"><Shuffle size={22} /></button>
        </header>
        <div className="relative flex justify-center pb-4">
          <div key={pulo} className="surge"><Boneco spec={b} size={200} /></div>
        </div>
      </div>

      <nav className="sticky top-0 z-10 flex gap-1 overflow-x-auto border-b-2 border-line bg-ground px-2 py-2">
        {ABAS.map(({ id, Icone, nome }) => (
          <button key={id} onClick={() => { som('toque'); setAba(id) }} aria-label={nome} aria-current={aba === id}
            className={`flex shrink-0 flex-col items-center rounded-2xl border-2 px-3 py-1.5 ${aba === id ? 'border-marian bg-marian/15 text-marian' : 'border-transparent text-mute'}`}>
            <Icone size={24} /><span className="text-[11px] font-extrabold">{nome}</span>
          </button>
        ))}
      </nav>

      <div className="flex-1 px-4 py-5">
        {aba === 'pele' && <><Cores titulo="Tom da pele" lista={PELES} campo="pele" /><Cores titulo="Cor do fundo" lista={FUNDOS} campo="fundo" /></>}
        {aba === 'cabelo' && <><Pecas titulo="Penteado" campo="cabelo" /><Cores titulo="Cor do cabelo" lista={CORES_CABELO} campo="corCabelo" /></>}
        {aba === 'rosto' && <><Pecas titulo="Expressão" campo="expressao" cols={4} /><Cores titulo="Cor dos olhos" lista={CORES_OLHO} campo="olhos" /></>}
        {aba === 'roupa' && <><Pecas titulo="Roupa" campo="roupa" /><Cores titulo="Cor da roupa" lista={CORES_ROUPA} campo="corRoupa" /></>}
        {aba === 'cabeca' && <Pecas titulo="Na cabeça" campo="cabeca" cols={4} />}
        {aba === 'detalhe' && <Pecas titulo="Detalhes do rosto" campo="rosto" cols={4} />}
        {aba === 'extra' && <Pecas titulo="Itens" campo="extra" />}
      </div>

      <footer className="safe-b sticky bottom-0 border-t-2 border-line bg-ground px-4 pt-3">
        <button className="btn btn-sol mb-2" disabled={salvando} onClick={salvar}>{salvando ? 'Salvo!' : 'Salvar visual'}</button>
      </footer>
    </main>
  )
}
