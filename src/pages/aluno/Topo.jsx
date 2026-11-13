import { useEffect, useState } from 'react'
import { X } from 'lucide-react'
import { sb } from '../../lib'
import { som } from '../../sons'
import { Chama, Gema, Medalha } from '../../components/Icones'
import { Barra } from '../Login'

// segunda-feira (fuso de São Paulo) da semana de uma data
const semanaDe = d => { const x = new Date(new Date(d).toLocaleString('en-US', { timeZone: 'America/Sao_Paulo' })); x.setHours(0, 0, 0, 0); x.setDate(x.getDate() - ((x.getDay() + 6) % 7)); return x.getTime() }
const curta = t => new Date(t).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' }).replace('.', '')

function Folha({ fechar, children, cor = 'bg-surface' }) {
  useEffect(() => { som('toque') }, [])
  return (
    <div className="fixed inset-0 z-40 flex items-end bg-black/60" onClick={fechar}>
      <div onClick={e => e.stopPropagation()} className={`sobe safe-b relative mx-auto w-full max-w-[620px] rounded-t-3xl px-6 pb-4 pt-6 ${cor}`}>
        <button onClick={fechar} aria-label="Fechar" className="absolute right-4 top-4 text-mute"><X size={26} /></button>
        {children}
      </div>
    </div>
  )
}

// toque no foguinho: a sequência de semanas com lição
export function FolhaOfensiva({ metricas, progresso, fechar, irParaLicao }) {
  const agora = semanaDe(Date.now()), SEM = 7 * 864e5
  const comLicao = new Set(progresso.map(p => semanaDe(p.concluido_em)))
  const semanas = [...Array(8)].map((_, i) => agora - (7 - i) * SEM)
  const feita = metricas.semana_feita, n = metricas.streak || 0
  return (
    <Folha fechar={fechar}>
      <div className="flex items-center gap-4">
        <div className={feita ? 'chama' : ''}><Chama size={74} acesa={feita} /></div>
        <div>
          <p className="text-5xl font-black leading-none" style={{ color: feita ? '#FF9600' : '#8EA3B5' }}>{n}</p>
          <p className="text-lg font-extrabold">{n === 1 ? 'semana seguida' : 'semanas seguidas'}</p>
        </div>
      </div>
      <p className="mt-3 text-mute">{feita ? 'Chama acesa nesta semana! Volte na próxima para ela crescer.' : 'Faça uma lição até domingo para manter a chama acesa.'}</p>
      <div className="mt-5 grid grid-cols-8 gap-1.5">
        {semanas.map(t => {
          const ok = comLicao.has(t), atual = t === agora
          return (
            <div key={t} className="flex flex-col items-center gap-1">
              <div className={`grid h-11 w-full place-items-center rounded-xl border-2 ${atual ? 'border-[#FF9600]' : 'border-line'} ${ok ? 'bg-[#FF9600]/15' : 'bg-raised'}`}>
                <Chama size={20} acesa={ok} />
              </div>
              <span className={`text-[10px] font-extrabold ${atual ? 'text-[#FF9600]' : 'text-mute'}`}>{atual ? 'hoje' : curta(t)}</span>
            </div>
          )
        })}
      </div>
      {!feita && <button className="btn btn-sol mt-5" onClick={() => { fechar(); irParaLicao() }}>Fazer uma lição agora</button>}
      {feita && <button className="btn btn-ghost mt-5" onClick={fechar}>Amém!</button>}
    </Folha>
  )
}

// toque no XP: total, ganho da semana e o próximo troféu de XP
export function FolhaXP({ perfil, trofeus, conquistas, fechar }) {
  const [semana, setSemana] = useState(null)
  useEffect(() => { sb.rpc('ranking', { p_semana: true }).then(({ data }) => setSemana(data?.find(a => a.id === perfil.id)?.xp ?? 0)) }, [])
  const proximo = trofeus.filter(t => t.tipo === 'xp' && !conquistas.some(c => c.trofeu_id === t.id)).sort((a, b) => a.meta - b.meta)[0]
  return (
    <Folha fechar={fechar}>
      <div className="flex items-center gap-4">
        <div className="pula"><Gema size={70} /></div>
        <div>
          <p className="text-5xl font-black leading-none text-sol">{perfil.xp}</p>
          <p className="text-lg font-extrabold">pontos de graça (XP)</p>
        </div>
      </div>
      <div className="mt-5 grid grid-cols-2 gap-3">
        <div className="rounded-2xl border-2 border-line p-3"><p className="text-2xl font-black text-marian">{semana ?? '…'}</p><p className="text-sm text-mute">nesta semana</p></div>
        <div className="rounded-2xl border-2 border-line p-3"><p className="text-2xl font-black">+10</p><p className="text-sm text-mute">por lição, +5 por acerto</p></div>
      </div>
      {proximo && (
        <div className="mt-4 flex items-center gap-3 rounded-2xl bg-raised p-3">
          <Medalha icone={proximo.icone} ativo={false} size={52} />
          <div className="flex-1"><b>{proximo.titulo}</b><div className="mt-1 flex items-center gap-2"><Barra valor={perfil.xp / proximo.meta} /><span className="text-sm text-mute">{perfil.xp}/{proximo.meta}</span></div></div>
        </div>
      )}
      <button className="btn btn-sol mt-5" onClick={fechar}>Bora ganhar mais</button>
    </Folha>
  )
}
