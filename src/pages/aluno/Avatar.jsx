import { useState } from 'react'
import { X, Smile, Shirt, Scissors, Glasses, Palette } from 'lucide-react'
import { sb } from '../../lib'
import Personagem, { AVATAR_PADRAO, PELES, CABELO_CORES, OLHO_CORES, ROUPA_CORES, OPCOES } from '../../components/Personagem'

const ABAS = [
  { id: 'pele', Icone: Palette, nome: 'Pele' },
  { id: 'roupa', Icone: Shirt, nome: 'Roupa' },
  { id: 'rosto', Icone: Smile, nome: 'Rosto' },
  { id: 'cabelo', Icone: Scissors, nome: 'Cabelo' },
  { id: 'extra', Icone: Glasses, nome: 'Acessórios' },
]
const NOMES = {
  curto: 'Curto', topete: 'Topete', cacheado: 'Cacheado', longo: 'Longo', coque: 'Coque', tranca: 'Trança', raspado: 'Raspado', careca: 'Careca',
  nenhuma: 'Sem barba', bigode: 'Bigode', curta: 'Barba curta', cheia: 'Barba cheia',
  feliz: 'Feliz', sorriso: 'Sorrisão', surpreso: 'Surpreso', piscando: 'Piscadinha', serio: 'Sério', determinado: 'Determinado',
  camiseta: 'Camiseta', moletom: 'Moletom', camisa: 'Camisa', tunica: 'Túnica',
  nenhum: 'Nenhum', oculos: 'Óculos', terco: 'Terço', cruz: 'Cruz', veu: 'Véu', bone: 'Boné',
}

export default function Avatar({ perfil, onFim }) {
  const [a, setA] = useState({ ...AVATAR_PADRAO, ...perfil.avatar })
  const [aba, setAba] = useState('pele')
  const [salvando, setSalvando] = useState(false)
  const set = patch => setA({ ...a, ...patch })

  async function salvar() {
    setSalvando(true)
    await sb.from('profiles').update({ avatar: a }).eq('id', perfil.id)
    onFim()
  }

  const Cores = ({ titulo, lista, valor, onPick }) => (
    <section className="mb-7">
      <h3 className="mb-3 text-xl font-black">{titulo}</h3>
      <div className="grid grid-cols-5 gap-3">
        {lista.map(c => (
          <button key={c} onClick={() => onPick(c)} aria-label={`Cor ${c}`} aria-pressed={valor === c}
            className={`grid aspect-square place-items-center rounded-2xl border-2 ${valor === c ? 'border-marian bg-[#16304F]' : 'border-line'}`}>
            <span className="h-3/5 w-3/5 rounded-xl" style={{ background: c }} />
          </button>
        ))}
      </div>
    </section>
  )
  const Opcoes = ({ titulo, lista, valor, montar }) => (
    <section className="mb-7">
      <h3 className="mb-3 text-xl font-black">{titulo}</h3>
      <div className="grid grid-cols-3 gap-3">
        {lista.map(o => (
          <button key={o} onClick={() => setA(montar(o))} aria-pressed={valor === o}
            className={`flex flex-col items-center rounded-2xl border-2 pb-2 pt-1 ${valor === o ? 'border-marian bg-[#16304F]' : 'border-line'}`}>
            <Personagem spec={montar(o)} busto sombra={false} size={78} />
            <span className="text-sm text-mute">{NOMES[o]}</span>
          </button>
        ))}
      </div>
    </section>
  )

  return (
    <main className="app-h mx-auto flex max-w-[620px] flex-col bg-surface">
      <div className="safe-t bg-[#E5E9EC] text-ground">
        <header className="flex items-center px-4 py-3">
          <button onClick={onFim} aria-label="Fechar"><X size={32} /></button>
          <h1 className="flex-1 text-center text-xl">Escolha o seu visual</h1>
          <button onClick={salvar} disabled={salvando} className="rounded-2xl border-b-4 border-[#C9D2DA] bg-white px-4 py-2 font-extrabold uppercase tracking-wider active:translate-y-[2px]">Salvar</button>
        </header>
        <div className="flex justify-center"><Personagem spec={a} sombra={false} size={190} /></div>
      </div>

      <nav className="sticky top-0 z-10 flex border-b-2 border-line bg-surface">
        {ABAS.map(({ id, Icone, nome }) => (
          <button key={id} onClick={() => setAba(id)} aria-label={nome} aria-current={aba === id}
            className={`flex flex-1 justify-center border-b-4 py-4 ${aba === id ? 'border-marian text-marian' : 'border-transparent text-mute'}`}><Icone size={30} /></button>
        ))}
      </nav>

      <div className="flex-1 px-4 py-6">
        {aba === 'pele' && <Cores titulo="Tom da pele" lista={PELES} valor={a.pele} onPick={c => set({ pele: c })} />}
        {aba === 'roupa' && <>
          <Opcoes titulo="Roupa" lista={OPCOES.roupa} valor={a.roupa.tipo} montar={o => ({ ...a, roupa: { ...a.roupa, tipo: o } })} />
          <Cores titulo="Cor da roupa" lista={ROUPA_CORES} valor={a.roupa.cor} onPick={c => set({ roupa: { ...a.roupa, cor: c } })} />
        </>}
        {aba === 'rosto' && <>
          <Cores titulo="Cor dos olhos" lista={OLHO_CORES} valor={a.olhos} onPick={c => set({ olhos: c })} />
          <Opcoes titulo="Expressão" lista={OPCOES.expressao} valor={a.expressao} montar={o => ({ ...a, expressao: o })} />
        </>}
        {aba === 'cabelo' && <>
          <Opcoes titulo="Cabelo" lista={OPCOES.cabelo} valor={a.cabelo.estilo} montar={o => ({ ...a, cabelo: { ...a.cabelo, estilo: o } })} />
          <Cores titulo="Cor do cabelo" lista={CABELO_CORES} valor={a.cabelo.cor} onPick={c => set({ cabelo: { ...a.cabelo, cor: c }, barba: { ...a.barba, cor: c } })} />
          <Opcoes titulo="Barba" lista={OPCOES.barba} valor={a.barba.estilo} montar={o => ({ ...a, barba: { ...a.barba, estilo: o } })} />
        </>}
        {aba === 'extra' && <Opcoes titulo="Acessórios" lista={OPCOES.acessorio} valor={a.acessorio} montar={o => ({ ...a, acessorio: o })} />}
      </div>
    </main>
  )
}
