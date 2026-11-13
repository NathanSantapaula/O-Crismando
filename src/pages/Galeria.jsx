import Personagem, { GUIAS, AVATAR_PADRAO, PELES, ROUPA_CORES, Bandeira } from '../components/Personagem'

// Vitrine dos personagens: abra /?galeria
export default function Galeria() {
  const avatares = [
    AVATAR_PADRAO,
    { ...AVATAR_PADRAO, pele: PELES[7], cabelo: { estilo: 'cacheado', cor: '#2B2F3A' }, roupa: { tipo: 'moletom', cor: ROUPA_CORES[3] }, acessorio: 'terco', expressao: 'sorriso' },
    { ...AVATAR_PADRAO, pele: PELES[0], cabelo: { estilo: 'longo', cor: '#D9A55B' }, roupa: { tipo: 'camisa', cor: ROUPA_CORES[2] }, acessorio: 'oculos', expressao: 'piscando' },
    { ...AVATAR_PADRAO, pele: PELES[5], cabelo: { estilo: 'coque', cor: '#4A2F1F' }, roupa: { tipo: 'tunica', cor: '#EEF1F5' }, acessorio: 'veu', pose: 'reza' },
  ]
  return (
    <main className="min-h-dvh bg-ground p-6 text-ink">
      <div className="flex items-center gap-3"><Bandeira size={44} /><h1 className="text-2xl font-black">Personagens</h1></div>
      <div className="mt-6 grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-5">
        {Object.entries(GUIAS).map(([id, g]) => (
          <div key={id} className="text-center"><Personagem id={id} size={170} /><p className="mt-1 text-mute">{g.nome}</p></div>
        ))}
      </div>
      <h2 className="mt-10 text-xl font-black">Miniaturas (trilha)</h2>
      <div className="mt-4 flex flex-wrap items-end gap-5">{Object.keys(GUIAS).map(id => <Personagem key={id} id={id} mini size={96} />)}</div>
      <h2 className="mt-10 text-xl font-black">Avatares dos crismandos</h2>
      <div className="mt-4 flex flex-wrap items-end gap-6">{avatares.map((s, i) => <Personagem key={i} spec={s} size={130} />)}{avatares.map((s, i) => <Personagem key={'m' + i} spec={s} mini size={90} />)}</div>
      <div className="mt-6 flex flex-wrap gap-4">{['feliz', 'sorriso', 'surpreso', 'piscando', 'serio', 'triste'].map(h => <div key={h} className="rounded-2xl bg-surface p-2"><Personagem id="jesus" humor={h} busto size={80} /></div>)}</div>
    </main>
  )
}
