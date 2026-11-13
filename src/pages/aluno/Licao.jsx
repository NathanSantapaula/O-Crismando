import { useState } from 'react'
import { X, Heart, CheckCircle2, XCircle, Target, Zap } from 'lucide-react'
import { sb } from '../../lib'
import Personagem from '../../components/Personagem'
import { Chama, Medalha } from '../../components/Icones'
import { Balao, Barra } from '../Login'
import { Arte, Tela } from './Aluno'

export default function Licao({ licao, encontro: e, metricas, conquistas, trofeus, onFim }) {
  const perguntas = licao.perguntas || []
  const leitura = licao.tipo !== 'quiz' || perguntas.length === 0
  const total = perguntas.length
  const [passo, setPasso] = useState(0) // perguntas; em leitura: 0 = texto
  const [escolha, setEscolha] = useState(null)
  const [verificado, setVerificado] = useState(false)
  const [acertos, setAcertos] = useState(0)
  const [vidas, setVidas] = useState(5)
  const [fim, setFim] = useState(null) // { resultado, telas: [] }

  const q = perguntas[passo]
  const certo = q && escolha === q.correta

  async function concluir(ac) {
    const { data } = await sb.rpc('concluir_licao', { p_licao: licao.id, p_acertos: ac, p_total: leitura ? 0 : total })
    const [{ data: c }, { data: m }] = await Promise.all([sb.from('conquistas').select('*'), sb.rpc('minhas_metricas')])
    const novos = (c || []).filter(x => !conquistas.some(k => k.trofeu_id === x.trofeu_id)).map(x => trofeus.find(t => t.id === x.trofeu_id)).filter(Boolean)
    const telas = ['resumo']
    if (!metricas.semana_feita && m?.semana_feita) telas.push('ofensiva')
    novos.forEach(t => telas.push({ trofeu: t }))
    setFim({ resultado: data, telas, ac, streak: m?.streak || 1 })
  }

  function verificar() {
    setVerificado(true)
    if (certo) setAcertos(a => a + 1); else setVidas(v => v - 1)
  }
  function continuar() {
    setVerificado(false); setEscolha(null)
    if (passo + 1 >= total) return concluir(acertos)
    setPasso(p => p + 1)
  }

  if (vidas <= 0) return (
    <Tela onFechar={onFim} rotulo="Voltar à trilha">
      <Personagem id="teresinha" humor="triste" size={160} />
      <h1 className="mt-6 text-3xl font-black">Suas vidas acabaram</h1>
      <p className="mt-2 text-lg text-mute">Releia o guia do encontro e tente de novo. Errar faz parte da caminhada.</p>
    </Tela>
  )

  if (fim) {
    const tela = fim.telas[0]
    const proxima = () => fim.telas.length > 1 ? setFim({ ...fim, telas: fim.telas.slice(1) }) : onFim()
    if (tela === 'ofensiva') return (
      <Tela onFechar={proxima}>
        <div className="surge"><Chama size={150} className="chama" /></div>
        <p className="mt-2 text-7xl font-black text-[#FF9600]">{fim.streak}</p>
        <h1 className="text-3xl font-black text-[#FF9600]">{fim.streak === 1 ? 'semana de ofensiva!' : 'semanas de ofensiva!'}</h1>
        <p className="mt-3 text-lg text-mute">Faça ao menos uma lição por semana para manter a chama acesa.</p>
      </Tela>
    )
    if (tela?.trofeu) return (
      <Tela onFechar={proxima}>
        <div className="surge"><Medalha icone={tela.trofeu.icone} size={160} /></div>
        <h1 className="mt-6 text-3xl font-black text-sol">Novo troféu!</h1>
        <p className="mt-2 text-2xl">{tela.trofeu.titulo}</p>
        {tela.trofeu.premio && <p className="mt-3 rounded-2xl bg-sol-soft px-4 py-3 text-sol">Você ganhou: {tela.trofeu.premio}. Retire com seu catequista!</p>}
      </Tela>
    )
    const pct = leitura ? 100 : Math.round((fim.ac / total) * 100)
    return (
      <Tela onFechar={proxima}>
        <div className="surge"><Personagem id={e.guia} humor={pct >= 70 ? 'sorriso' : 'feliz'} size={170} className="pula" /></div>
        <h1 className="mt-6 text-3xl font-black text-sol">{pct >= 70 ? 'Lição concluída!' : 'Concluída, mas dá para melhorar!'}</h1>
        {fim.resultado?.reposicao && <p className="mt-3 rounded-2xl bg-sol-soft px-4 py-2 text-sol">Falta do encontro reposta!</p>}
        {fim.resultado?.completo && !fim.resultado?.reposicao && <p className="mt-3 text-mute">Encontro completo. Abra o baú na trilha!</p>}
        <div className="mt-8 flex gap-3">
          <Caixa cor="#FFC800" titulo="Total de XP" Icone={Zap} valor={10 + fim.ac * 5} />
          <Caixa cor="#3D8BFF" titulo={leitura ? 'Leitura' : 'Precisão'} Icone={Target} valor={`${pct}%`} />
        </div>
      </Tela>
    )
  }

  return (
    <main className="app-h safe-t mx-auto flex max-w-[620px] flex-col">
      <header className="flex items-center gap-4 px-4 py-4">
        <button onClick={() => confirm('Sair da lição? O progresso desta lição será perdido.') && onFim()} aria-label="Sair da lição" className="text-mute"><X size={30} strokeWidth={3} /></button>
        <Barra valor={leitura ? 0.5 : (passo + (verificado ? 1 : 0)) / total} />
        <span className="flex items-center gap-1 text-lg text-wine"><Heart size={26} fill="currentColor" /> {vidas}</span>
      </header>

      <section className="flex-1 overflow-y-auto px-5 pb-6">
        {leitura ? (
          <>
            <h1 className="text-2xl font-black">{licao.titulo}</h1>
            <div className="mt-4 flex items-start gap-3"><Personagem id={e.guia} busto size={76} className="shrink-0" /><Balao seta="esquerda" className="surge">{e.citacao ? <>“{e.citacao}” <b className="text-sol">{e.cic_ref}</b></> : 'Vamos ouvir a Palavra?'}</Balao></div>
            <Arte e={e} className="mt-5" />
            <p className="mt-5 text-lg leading-relaxed">{e.leitura}</p>
            {e.video_url && <a href={e.video_url} target="_blank" rel="noreferrer" className="btn btn-marian mt-5">Assistir ao vídeo do encontro</a>}
          </>
        ) : (
          <>
            <h1 className="text-2xl font-black">Selecione a resposta certa</h1>
            {q.imagem_url && <Arte e={{ imagem_url: q.imagem_url, imagem_credito: q.imagem_credito }} className="mt-4" />}
            <div className="mt-5 flex items-center gap-3"><Personagem id={e.guia} busto size={86} className="shrink-0" /><Balao seta="esquerda" key={passo} className="surge">{q.enunciado}</Balao></div>
            <div className="mt-6 space-y-3">
              {q.opcoes.map((o, i) => {
                const marcado = escolha === i
                const cor = verificado && i === q.correta ? 'border-sol bg-sol-soft text-sol'
                  : verificado && marcado ? 'border-wine bg-wine-soft text-wine'
                  : marcado ? 'border-marian bg-[#16304F] text-[#9CC5FF]' : 'border-line'
                return (
                  <button key={i} disabled={verificado} onClick={() => setEscolha(i)}
                    className={`flex w-full items-center gap-4 rounded-2xl border-2 border-b-4 px-4 py-4 text-left text-lg active:translate-y-[2px] ${cor}`}>
                    <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg border-2 border-current text-sm opacity-80">{i + 1}</span>{o}
                  </button>
                )
              })}
            </div>
          </>
        )}
      </section>

      {verificado ? (
        <footer className={`sobe safe-b px-5 pt-5 ${certo ? 'bg-sol-soft text-sol' : 'bg-wine-soft text-wine'}`}>
          <p className="flex items-center gap-2 text-2xl font-black">{certo ? <CheckCircle2 size={32} /> : <XCircle size={32} />}{certo ? 'Muito bem!' : 'Resposta correta:'}</p>
          {!certo && <p className="mt-1 text-lg">{q.opcoes[q.correta]}</p>}
          {q.explicacao && <p className="mt-1 opacity-90">{q.explicacao}</p>}
          <button className={`btn mb-2 mt-4 ${certo ? 'btn-sol' : 'btn-wine'}`} onClick={continuar}>Continuar</button>
        </footer>
      ) : (
        <footer className="safe-b border-t-2 border-line px-5 pt-4">
          {leitura
            ? <button className="btn btn-sol mb-2" onClick={() => concluir(0)}>Amém, continuar</button>
            : <button className="btn btn-sol mb-2" disabled={escolha === null} onClick={verificar}>Verificar</button>}
        </footer>
      )}
    </main>
  )
}

function Caixa({ cor, titulo, Icone, valor }) {
  return (
    <div className="w-36 overflow-hidden rounded-2xl border-2" style={{ borderColor: cor, background: cor }}>
      <p className="py-1 text-xs font-black uppercase tracking-wider text-[#111B24]">{titulo}</p>
      <p className="flex items-center justify-center gap-1.5 rounded-xl bg-ground py-3 text-2xl font-black" style={{ color: cor }}><Icone size={22} /> {valor}</p>
    </div>
  )
}
