import { url } from '../lib'
// Personagens do Fidelingo, desenhados em SVG a partir das referências do projeto:
// cabeça arredondada, olhos com íris grande, corpo alongado, disco azul no chão.
// Cada um tem animação contínua (respira, pisca, gesto próprio) e versão miniatura (mini).

import { useId } from 'react'
import RIG from './rig.json'

export const PELES = ['#FCE3D4', '#F8CDB5', '#F2C3A0', '#E8B48E', '#D99E76', '#C2865E', '#A66C47', '#8A5536', '#6E412A', '#55301F']
export const CABELO_CORES = ['#2B2F3A', '#4A2F1F', '#6B4A33', '#8B5A3C', '#A87447', '#D9A55B', '#E9C988', '#9B9B9B', '#E6E2DC', '#3A3F5C']
export const OLHO_CORES = ['#5A3A22', '#3A2616', '#3B6FB6', '#4C7A3A', '#2E7E86', '#6B6B6B']
export const ROUPA_CORES = ['#FFC800', '#EEF1F5', '#D24A43', '#3F73C8', '#6E9B2E', '#7A4FC0', '#E06A3A', '#2B3442', '#F07CA8', '#29A3A3']

const tom = (hex, k) => {
  const n = parseInt(hex.slice(1), 16)
  const c = s => Math.min(255, Math.round(((n >> s) & 255) * k)).toString(16).padStart(2, '0')
  return `#${c(16)}${c(8)}${c(0)}`
}

const OURO = '#F3E2B0'
export const GUIAS = {
  jesus: { nome: 'Jesus', pele: '#F2C3A0', olhos: '#3B6FB6', pose: 'abre', aureola: '#E8EEF6',
    cabelo: { estilo: 'nazareno', cor: '#8B5A3C' }, barba: { estilo: 'curta', cor: '#8B5A3C' },
    roupa: { tipo: 'tunica', cor: '#EEF1F5', debrum: '#3D6FB8' }, manto: { tipo: 'diagonal', cor: '#E0685F' } },
  maria: { nome: 'Nossa Senhora', pele: '#F4C9AA', olhos: '#3B6FB6', pose: 'reza', aureola: OURO, coroa: true,
    cabelo: { estilo: 'repartido', cor: '#6B4A33' }, veu: { cor: '#4E8BCB', borda: '#BFD8EE' },
    roupa: { tipo: 'tunica', cor: '#EEF2F8', debrum: '#BFD8EE' }, faixas: true },
  jose: { nome: 'São José', pele: '#F2C3A0', olhos: '#5A3A22', pose: 'reza', aureola: OURO, coroa: true, itens: ['esquadro', 'lirio'],
    cabelo: { estilo: 'ondulado', cor: '#A87447' }, barba: { estilo: 'cheia', cor: '#A87447' },
    roupa: { tipo: 'tunica', cor: '#F1F1F1', debrum: '#BFD8EE' }, manto: { tipo: 'capa', cor: '#A86A34' } },
  pedro: { nome: 'São Pedro', pele: '#F0BE9C', olhos: '#6B3A1E', pose: 'pedro', rugas: true, itens: ['chaves'],
    cabelo: { estilo: 'calvo', cor: '#9B9B9B' }, barba: { estilo: 'cheia', cor: '#A3A3A3' },
    roupa: { tipo: 'tunica', cor: '#8C5A2E', padrao: true, cinto: '#3E2A1C' }, manto: { tipo: 'capa', cor: '#5E8794' } },
  agostinho: { nome: 'Santo Agostinho', pele: '#F0BE9C', olhos: '#6B3A1E', pose: 'segura', rugas: true, itens: ['coracao'],
    cabelo: { estilo: 'calvo', cor: '#9B9B9B' }, barba: { estilo: 'cheia', cor: '#5E4630' },
    roupa: { tipo: 'tunica', cor: '#8C5A2E', padrao: true }, manto: { tipo: 'capa', cor: '#5E8794' } },
  carlo: { nome: 'São Carlo Acutis', pele: '#E8B48E', olhos: '#5A3A22', pose: 'carlo', acessorio: 'oculos', itens: ['ostensorio', 'janela'],
    cabelo: { estilo: 'espetado', cor: '#2B2F3A' }, roupa: { tipo: 'camisa', cor: '#3F73C8', cor2: '#D24A43' }, calca: '#557DB0', pes: 'tenis' },
  tomas: { nome: 'São Tomás de Aquino', pele: '#F4C9AA', olhos: '#5A3A22', pose: 'segura', aureola: OURO, itens: ['livro', 'sol'],
    cabelo: { estilo: 'tonsura', cor: '#3A2A1E' }, roupa: { tipo: 'tunica', cor: '#F4F1EA' }, manto: { tipo: 'capa', cor: '#22252B' }, capuz: '#22252B' },
  francisco: { nome: 'São Francisco', pele: '#E8B48E', olhos: '#5A3A22', pose: 'segura', aureola: OURO, itens: ['pomba'], cordao: true,
    cabelo: { estilo: 'tonsura', cor: '#5C3B22' }, barba: { estilo: 'curta', cor: '#5C3B22' }, roupa: { tipo: 'tunica', cor: '#7A5634' }, capuz: '#6A482A', pes: 'descalco' },
  teresinha: { nome: 'Santa Teresinha', pele: '#FAD9C4', olhos: '#5A3A22', pose: 'segura', aureola: OURO, itens: ['rosas'],
    veu: { cor: '#22252B', borda: '#F4F1EA' }, touca: true, roupa: { tipo: 'tunica', cor: '#6B4A2E' }, manto: { tipo: 'capa', cor: '#F1E9D8' } },
}

export const AVATAR_PADRAO = {
  pele: PELES[2], olhos: OLHO_CORES[0], expressao: 'feliz', pose: 'parado',
  cabelo: { estilo: 'curto', cor: CABELO_CORES[1] }, barba: { estilo: 'nenhuma', cor: CABELO_CORES[1] },
  roupa: { tipo: 'camiseta', cor: ROUPA_CORES[0] }, acessorio: 'nenhum', pes: 'tenis',
}

export const OPCOES = {
  cabelo: ['curto', 'topete', 'espetado', 'cacheado', 'longo', 'coque', 'tranca', 'raspado', 'careca'],
  barba: ['nenhuma', 'bigode', 'curta', 'cheia'],
  expressao: ['feliz', 'sorriso', 'surpreso', 'piscando', 'serio', 'determinado'],
  roupa: ['camiseta', 'moletom', 'camisa', 'tunica'],
  acessorio: ['nenhum', 'oculos', 'terco', 'cruz', 'veu', 'bone'],
}

/* =================== cabeça =================== */

function Aureola({ cor }) {
  if (!cor) return null
  return (
    <g>
      <circle cx="100" cy="82" r="58" fill="none" stroke={cor} strokeWidth="5" />
      <g className="p-raios">
        {[...Array(9)].map((_, i) => {
          const a = Math.PI * (1.05 + i * 0.1125), x = 100 + Math.cos(a) * 70, y = 82 + Math.sin(a) * 70
          return <path key={i} d="M0-8 6 6H-6Z" fill={cor} transform={`translate(${x} ${y}) rotate(${(a * 180) / Math.PI + 90})`} />
        })}
      </g>
    </g>
  )
}

function Coroa() {
  return (
    <g>
      <path d="M68 54 72 28 84 42 92 18 100 36 108 18 116 42 128 28 132 54Z" fill="#E8B53C" />
      <path d="M92 18 100 36 96 50ZM108 18 100 36 104 50ZM72 28 84 42 78 52ZM128 28 116 42 122 52Z" fill="#F7D673" />
      <rect x="68" y="48" width="64" height="8" rx="3" fill="#D29C2A" />
    </g>
  )
}

function CabeloAtras({ c }) {
  if (!c) return null
  const f = c.cor
  switch (c.estilo) {
    case 'nazareno': return <path d="M58 92Q54 34 100 32 146 34 142 92L148 160Q132 170 122 152L124 104H76L78 152Q68 170 52 160Z" fill={f} />
    case 'longo': return <path d="M58 90Q54 34 100 32 146 34 142 90L146 168Q128 176 120 160V104H80V160Q72 176 54 168Z" fill={f} />
    case 'tranca': return <g fill={f}><rect x="132" y="96" width="16" height="74" rx="8" /><circle cx="140" cy="174" r="7" fill={tom(f, 0.8)} /></g>
    case 'coque': return <circle cx="100" cy="34" r="15" fill={f} />
    case 'cacheado': return <g fill={f}>{[[60, 96], [140, 96], [58, 76], [142, 76]].map(([x, y], i) => <circle key={i} cx={x} cy={y} r="14" />)}</g>
    default: return null
  }
}

function CabeloFrente({ c }) {
  if (!c) return null
  const f = c.cor
  switch (c.estilo) {
    case 'nazareno': return <path d="M62 88Q62 44 100 42 138 44 138 88 130 62 110 54L100 62 90 54Q70 62 62 88Z" fill={f} />
    case 'repartido': return <path d="M70 102Q70 60 100 58 130 60 130 102 124 74 104 66L100 70 96 66Q76 74 70 102Z" fill={f} />
    case 'ondulado': return <path d="M61 86Q58 40 100 38 142 40 139 86 136 66 124 60 112 70 94 62 80 66 72 62 64 70 61 86Z" fill={f} />
    case 'curto': return <path d="M62 82Q60 40 100 38 140 40 138 82 134 62 118 58 100 64 82 58 66 62 62 82Z" fill={f} />
    case 'topete': return <path d="M62 82Q60 46 84 38 96 22 122 30 142 40 138 82 132 60 114 56 96 60 80 58 66 64 62 82Z" fill={f} />
    case 'espetado': return <path d="M60 88Q54 52 70 42L64 30 82 36 84 20 98 32 108 18 114 34 132 26 128 42Q146 52 140 88 134 66 120 60 100 68 80 62 66 68 60 88Z" fill={f} />
    case 'cacheado': return <g fill={f}>{[[66, 66], [76, 50], [92, 42], [108, 42], [124, 50], [134, 66]].map(([x, y], i) => <circle key={i} cx={x} cy={y} r="14" />)}</g>
    case 'longo':
    case 'coque':
    case 'tranca': return <path d="M62 84Q62 42 100 40 138 42 138 84 124 60 100 58 76 60 62 84Z" fill={f} />
    case 'raspado': return <path d="M64 74Q66 42 100 41 134 42 136 74 100 60 64 74Z" fill={f} opacity=".5" />
    case 'tonsura': return <path d="M61 92V74Q100 58 139 74V92Q134 80 100 77 66 80 61 92Z" fill={f} />
    case 'calvo': return (
      <g fill={f}>
        <path d="M60 104Q54 70 76 50 68 72 74 104Z" /><path d="M140 104Q146 70 124 50 132 72 126 104Z" />
        <path d="M80 46Q100 34 120 46 100 40 80 46Z" opacity=".85" />
      </g>
    )
    default: return null
  }
}

function Veu({ v, frente }) {
  if (!v) return null
  if (!frente) return <path d="M54 98Q50 32 100 28 150 32 146 98L164 294Q164 314 142 314H58Q36 314 36 294Z" fill={v.cor} />
  return (
    <g>
      <path d="M58 108Q56 44 100 40 144 44 142 108H134Q134 54 100 52 66 54 66 108Z" fill={v.cor} />
      <path d="M66 108Q66 54 100 52 134 54 134 108H130Q130 58 100 57 70 58 70 108Z" fill={v.borda} />
    </g>
  )
}

function Barba({ b }) {
  if (!b || b.estilo === 'nenhuma') return null
  if (b.estilo === 'bigode') return <path d="M86 116Q93 110 100 114 107 110 114 116 107 119 100 117 93 119 86 116Z" fill={b.cor} />
  const cheia = b.estilo === 'cheia'
  return (
    <g fill={b.cor}>
      <path d={cheia ? 'M62 96Q60 152 100 156 140 152 138 96 132 118 118 118 108 114 100 115 92 114 82 118 68 118 62 96Z'
        : 'M64 104Q64 144 100 148 136 144 136 104 128 120 116 120 108 116 100 117 92 116 84 120 72 120 64 104Z'} />
      <path d="M84 118Q92 110 100 114 108 110 116 118 108 121 100 119 92 121 84 118Z" />
    </g>
  )
}

function Rosto({ s, expressao }) {
  const sombra = tom(s.pele, 0.86)
  const sobr = s.cabelo?.cor && s.cabelo.estilo !== 'calvo' ? s.cabelo.cor : (s.barba?.cor || '#5A3A22')
  const ry = expressao === 'surpreso' ? 13 : expressao === 'serio' ? 9 : 12
  const olho = (cx, esq) => expressao === 'piscando' && !esq
    ? <path key={cx} d={`M${cx - 10} ${98}q10-8 20 0`} stroke="#2B211C" strokeWidth="4" fill="none" strokeLinecap="round" />
    : (
      <g key={cx}>
        <ellipse cx={cx} cy="96" rx="11.5" ry={ry + 0.5} fill="#fff" />
        <circle cx={cx + 3} cy="97.5" r="7.8" fill={s.olhos} />
        <circle cx={cx + 3.5} cy="98" r="3.8" fill="#1E1611" />
        <circle cx={cx + 6.5} cy="93.5" r="2.6" fill="#fff" />
      </g>
    )
  const boca = {
    sorriso: <path d="M89 117q11 14 22 0Z" fill="#8A3A30" />,
    surpreso: <ellipse cx="100" cy="121" rx="5" ry="6.5" fill="#8A3A30" />,
    serio: <path d="M93 121h14" stroke="#8A3A30" strokeWidth="4" strokeLinecap="round" />,
    triste: <path d="M91 124q9-8 18 0" stroke="#8A3A30" strokeWidth="4" fill="none" strokeLinecap="round" />,
  }[expressao] || <path d="M90 117q10 10 20 0" stroke={s.barba && s.barba.estilo !== 'nenhuma' && s.barba.estilo !== 'bigode' ? '#F4D9C9' : '#8A3A30'} strokeWidth="4" fill="none" strokeLinecap="round" />
  const sobrancelha = expressao === 'determinado'
    ? 'M75 80 94 86M125 80 106 86'
    : expressao === 'triste' ? 'M78 82Q85 78 92 79M122 82Q115 78 108 79' : 'M78 80Q85 76 93 78M122 80Q115 76 107 78'
  return (
    <g>
      <g className="p-pisca">{olho(85, true)}{olho(115, false)}</g>
      <path d={sobrancelha} stroke={sobr} strokeWidth="6" fill="none" strokeLinecap="round" />
      {s.rugas && <path d="M84 66q16-5 32 0M88 72q12-4 24 0" stroke={sombra} strokeWidth="2.5" fill="none" strokeLinecap="round" />}
      <path d="M100 99q-7 14-1 17 7 0 6-4-1-6-5-13Z" fill={tom(s.pele, 0.8)} />
      <ellipse cx="74" cy="110" rx="8.5" ry="6" fill="#F2A08C" opacity=".6" />
      <ellipse cx="126" cy="110" rx="8.5" ry="6" fill="#F2A08C" opacity=".6" />
      <Barba b={s.barba} />
      {boca}
    </g>
  )
}

function Cabeca({ s, expressao }) {
  const veu = s.veu || (s.acessorio === 'veu' ? { cor: '#F4F1EA', borda: '#E2D8C4' } : null)
  return (
    <g>
      <CabeloAtras c={veu ? null : s.cabelo} />
      <circle cx="60" cy="96" r="10" fill={tom(s.pele, 0.9)} />
      <circle cx="140" cy="96" r="10" fill={tom(s.pele, 0.9)} />
      <rect x="62" y="44" width="76" height="88" rx="32" fill={s.pele} />
      <path d="M100 44h6c18 0 32 14 32 32v24c0 18-14 32-32 32h-6Z" fill="#000" opacity=".035" />
      {!veu && <CabeloFrente c={s.cabelo} />}
      {veu && <><Veu v={veu} frente />{s.cabelo?.estilo === 'repartido' && <CabeloFrente c={s.cabelo} />}</>}
      <Rosto s={s} expressao={expressao} />
      {s.acessorio === 'oculos' && <g fill="none" stroke="#2B2B2B" strokeWidth="3.5"><rect x="71" y="85" width="28" height="22" rx="8" /><rect x="101" y="85" width="28" height="22" rx="8" /><path d="M99 94h2M71 92l-8-3M129 92l8-3" /></g>}
      {s.acessorio === 'bone' && <g><path d="M62 70Q62 38 100 38 138 38 138 70Z" fill="#D24A43" /><path d="M100 64h48q2 8-6 8h-42Z" fill="#A8332E" /></g>}
      {s.coroa && <Coroa />}
    </g>
  )
}

/* =================== corpo =================== */

function Corpo({ s }) {
  const r = s.roupa
  const pele = s.pele
  const longa = r.tipo === 'tunica'
  const capa = s.manto?.tipo === 'capa' ? s.manto.cor : null
  return (
    <g>
      {s.veu && <Veu v={s.veu} />}
      {capa && <path d="M54 146Q100 120 146 146 168 220 166 296Q164 316 142 316H58Q36 316 34 296 32 220 54 146Z" fill={tom(capa, 0.8)} />}
      {/* pés */}
      <Pes tipo={s.pes || (longa ? 'sandalia' : 'tenis')} pele={pele} />
      {!longa && <g fill={s.calca || '#4F78A8'}><rect x="72" y="226" width="27" height="98" rx="6" /><rect x="101" y="226" width="27" height="98" rx="6" /><rect x="99" y="226" width="4" height="40" fill={tom(s.calca || '#4F78A8', 0.8)} /></g>}
      <rect x="88" y="120" width="24" height="24" rx="8" fill={tom(pele, 0.88)} />
      {longa ? (
        <g>
          <path d="M66 138Q100 126 134 138 146 200 148 318H52Q54 200 66 138Z" fill={r.cor} />
          <path d="M100 130Q120 130 134 138 146 200 148 318H104Z" fill="#000" opacity=".06" />
          {r.debrum && <path d="M86 135 100 154 114 135" stroke={r.debrum} strokeWidth="5" fill="none" strokeLinejoin="round" />}
          {r.padrao && <Padrao cor={tom(r.cor, 1.35)} />}
          {r.cinto && <rect x="66" y="208" width="68" height="9" fill={r.cinto} />}
        </g>
      ) : (
        <g>
          <path d="M68 140Q100 128 132 140 138 190 136 236H64Q62 190 68 140Z" fill={r.tipo === 'camisa' ? (r.cor2 || '#F4F1EA') : r.cor} />
          {r.tipo === 'camisa' && <><path d="M68 140Q84 132 92 134L90 236H64Q62 190 68 140Z" fill={r.cor} /><path d="M132 140Q116 132 108 134L110 236H136Q138 190 132 140Z" fill={tom(r.cor, 0.9)} /><path d="M88 134 96 150 92 136ZM112 134 104 150 108 136Z" fill={tom(r.cor, 0.75)} /></>}
          {r.tipo === 'moletom' && <><path d="M76 138Q100 156 124 138" stroke={tom(r.cor, 0.75)} strokeWidth="7" fill="none" strokeLinecap="round" /><rect x="82" y="190" width="36" height="20" rx="8" fill={tom(r.cor, 0.85)} /></>}
          {r.tipo === 'camiseta' && <path d="M88 135q12 10 24 0" fill={tom(pele, 0.88)} />}
          <rect x="66" y="228" width="68" height="7" fill="#3A2E28" /><rect x="96" y="228" width="8" height="7" fill="#9AA3AD" />
        </g>
      )}
      {s.faixas && <g><path d="M120 140 132 146Q126 210 70 262L60 236Q104 196 120 140Z" fill="#F2B095" /><path d="M112 150h14l6 150h-14Z" fill="#F3E29A" /></g>}
      {s.manto?.tipo === 'diagonal' && (
        <g fill={s.manto.cor}>
          <path d="M116 138Q132 140 134 150L142 300H112Q118 220 110 168Z" />
          <path d="M110 138 134 146Q122 206 70 244L62 220Q102 192 110 138Z" fill={tom(s.manto.cor, 0.88)} />
          <path d="M84 222Q104 206 118 178" stroke={tom(s.manto.cor, 0.75)} strokeWidth="3" fill="none" strokeLinecap="round" />
        </g>
      )}
      {capa && <g><path d="M54 148Q72 136 88 140 82 220 86 312H60Q42 312 40 296 38 220 54 148Z" fill={capa} /><path d="M146 148Q128 136 112 140 118 220 114 312H140Q158 312 160 296 162 220 146 148Z" fill={tom(capa, 0.88)} /><path d="M86 160 84 300M114 160 116 300" stroke={tom(capa, 0.72)} strokeWidth="3" strokeLinecap="round" opacity=".6" /></g>}
      {s.capuz && <path d="M70 138Q100 158 130 138L136 150Q100 172 64 150Z" fill={s.capuz} />}
      {s.touca && <path d="M68 124Q100 160 132 124L136 146Q100 170 64 146Z" fill="#F4F1EA" />}
      {s.cordao && <g stroke="#EDE3C8" fill="#EDE3C8"><path d="M62 210Q100 220 138 210" strokeWidth="5" fill="none" /><path d="M84 214v52" strokeWidth="4" />{[236, 248, 260].map(y => <circle key={y} cx="84" cy={y} r="4" />)}</g>}
      {s.acessorio === 'cruz' && <path d="M96 156h8v26h-8zM89 163h22v7H89z" fill="#E8B53C" />}
      {s.acessorio === 'terco' && <g><path d="M80 140Q100 196 120 140" stroke="#7A5634" strokeWidth="3" fill="none" strokeDasharray="1 5" strokeLinecap="round" /><path d="M97 170h6v18h-6zM92 175h16v5H92z" fill="#7A5634" /></g>}
    </g>
  )
}

function Padrao({ cor }) {
  const losango = (x, y, oco) => <path key={x + '-' + y} d={`M${x} ${y - 9} ${x + 9} ${y} ${x} ${y + 9} ${x - 9} ${y}Z`} fill={oco ? 'none' : cor} stroke={cor} strokeWidth={oco ? 3 : 0} />
  return (
    <g opacity=".85">
      <path d="M84 146 100 170 116 146M88 176 100 192 112 176" stroke={cor} strokeWidth="3.5" fill="none" />
      {[84, 100, 116].map(x => losango(x, 238))}
      {[84, 100, 116].map(x => losango(x, 262, true))}
      <rect x="60" y="280" width="80" height="4" fill={cor} />
      {[72, 88, 104, 120].map(x => <path key={x} d={`M${x - 8} 312 ${x} 296 ${x + 8} 312Z`} fill={cor} />)}
    </g>
  )
}

function Pes({ tipo, pele }) {
  if (tipo === 'tenis') return <g><rect x="70" y="316" width="30" height="14" rx="6" fill="#3A3F48" /><rect x="100" y="316" width="30" height="14" rx="6" fill="#3A3F48" /><path d="M70 326h30M100 326h30" stroke="#E6E9EE" strokeWidth="3" /></g>
  return (
    <g>
      <ellipse cx="86" cy="324" rx="15" ry="7" fill={pele} /><ellipse cx="114" cy="324" rx="15" ry="7" fill={pele} />
      {tipo === 'sandalia' && <><rect x="70" y="327" width="32" height="5" rx="2.5" fill="#B88A50" /><rect x="98" y="327" width="32" height="5" rx="2.5" fill="#B88A50" /><path d="M76 322h20M104 322h20" stroke="#8A6236" strokeWidth="3.5" strokeLinecap="round" /></>}
    </g>
  )
}

/* =================== braços e objetos =================== */

const mao = (x, y, pele, r = 10) => <circle cx={x} cy={y} r={r} fill={pele} />

function Bracos({ s }) {
  const p = s.pele
  const manga = s.manto?.tipo === 'capa' ? s.manto.cor : s.roupa.tipo === 'camisa' ? s.roupa.cor : s.roupa.cor
  const punho = s.roupa.debrum || tom(manga, 0.85)
  switch (s.pose) {
    case 'abre': return (
      <g>
        <g className="p-braco-e"><path d="M74 146Q50 170 36 210L54 220Q66 186 86 166Z" fill={manga} /><path d="M36 210l18 10-4 7-18-10Z" fill={punho} /><path d="M22 224q12-10 30 0 4 6-6 8H26q-8-2-4-8Z" fill={p} /></g>
        <g className="p-braco-d"><path d="M126 146Q150 170 164 210L146 220Q134 186 114 166Z" fill={tom(manga, 0.93)} /><path d="M164 210l-18 10 4 7 18-10Z" fill={punho} /><path d="M178 224q-12-10-30 0-4 6 6 8h20q8-2 4-8Z" fill={p} /></g>
      </g>
    )
    case 'reza': return (
      <g>
        <path d="M70 150Q58 204 84 214L100 198Q88 186 86 166Z" fill={manga} />
        <path d="M130 150Q142 204 116 214L100 198Q112 186 114 166Z" fill={tom(manga, 0.92)} />
        <path d="M82 206l16-12 4 8-14 10Z" fill={punho} /><path d="M118 206l-16-12-4 8 14 10Z" fill={punho} />
        <path d="M92 196Q90 160 100 154 110 160 108 196Z" fill={p} /><path d="M100 158v36" stroke={tom(p, 0.85)} strokeWidth="2" />
      </g>
    )
    case 'pedro': return (
      <g>
        <path d="M70 150Q58 196 74 208L94 200Q84 188 84 166Z" fill={manga} />
        <path d="M130 150Q154 170 152 208L136 210Q134 184 116 168Z" fill={tom(manga, 0.92)} />
        <rect x="149" y="150" width="7" height="182" rx="3.5" fill="#7A5634" />
        {mao(152, 206, p, 11)}{mao(84, 202, p, 11)}
      </g>
    )
    case 'carlo': return (
      <g>
        <g className="p-braco-e"><path d="M72 146Q54 170 58 204L76 206Q76 180 88 164Z" fill={manga} /></g>
        <g className="p-braco-d"><path d="M128 146Q148 170 160 186L148 198Q136 184 114 168Z" fill={tom(manga, 0.92)} /><path d="M150 190q14-12 28-4 4 6-4 8l-16 4Z" fill={p} /></g>
      </g>
    )
    case 'segura': return (
      <g>
        <path d="M70 150Q58 204 80 214H96V200Q86 194 86 168Z" fill={manga} />
        <path d="M130 150Q142 204 120 214H104V200Q114 194 114 168Z" fill={tom(manga, 0.92)} />
        {mao(86, 206, p)}{mao(114, 206, p)}
      </g>
    )
    default: return ( // parado: braços ao lado do corpo
      <g>
        <path d="M70 146Q56 190 58 232L74 234Q74 196 84 166Z" fill={manga} />
        <path d="M130 146Q144 190 142 232L126 234Q126 196 116 166Z" fill={tom(manga, 0.92)} />
        {mao(66, 240, p)}{mao(134, 240, p)}
      </g>
    )
  }
}

function Item({ id, pele }) {
  switch (id) {
    case 'coracao': return (
      <g>
        <g className="p-fogo"><path d="M82 182Q84 152 96 140 96 158 104 152 104 136 114 126 118 154 120 182Z" fill="#F08A2A" /><path d="M92 182Q94 164 102 158 104 170 108 166 110 172 112 182Z" fill="#F7C94A" /></g>
        <path d="M100 232C66 210 66 178 86 178 95 178 100 186 100 190 100 186 105 178 114 178 134 178 134 210 100 232Z" fill="#B8323A" />
        <ellipse cx="86" cy="190" rx="6" ry="4" fill="#fff" opacity=".35" transform="rotate(-30 86 190)" />
        {mao(76, 206, pele)}{mao(124, 206, pele)}
      </g>
    )
    case 'chaves': return (
      <g className="p-brilho">
        <g stroke="#9EA6AE" strokeWidth="5" fill="none" strokeLinecap="round"><circle cx="84" cy="230" r="8" /><path d="M88 222 100 168M98 176h8M96 184h7" /></g>
        <g stroke="#E3B23C" strokeWidth="5" fill="none" strokeLinecap="round"><circle cx="66" cy="176" r="8" /><path d="M72 182 104 222M98 214l-6 5M104 222l-6 5" /></g>
        {mao(84, 202, pele, 11)}
      </g>
    )
    case 'lirio': return (
      <g><path d="M124 176 140 138" stroke="#5E9B3A" strokeWidth="3.5" /><path d="M130 160q-12-2-12-10 10 0 14 6Z" fill="#5E9B3A" />
        <g transform="translate(142 132)"><path d="M0-12q7 6 0 14-7-8 0-14ZM-10-2q10-2 10 6-10 2-10-6ZM10-2q-10-2-10 6 10 2 10-6Z" fill="#fff" /><circle cy="-2" r="2.5" fill="#E8B53C" /></g></g>
    )
    case 'esquadro': return <g><path d="M118 140 128 144 104 214 94 210Z" fill="#C79A6A" /><path d="M118 166 150 176 147 186 124 179 121 190 112 187Z" fill="#C9D0D6" /></g>
    case 'ostensorio': return (
      <g>
        <g className="p-raios" stroke="#FCEFB4" strokeWidth="4" strokeLinecap="round">{[...Array(8)].map((_, i) => { const a = (i * Math.PI) / 4; return <path key={i} d={`M${66 + Math.cos(a) * 26} ${150 + Math.sin(a) * 26}L${66 + Math.cos(a) * 36} ${150 + Math.sin(a) * 36}`} /> })}</g>
        <path d="M62 124h8v52h-8zM40 146h52v8H40z" fill="#A9B0B8" />
        <circle cx="66" cy="150" r="17" fill="#A9B0B8" /><circle cx="66" cy="150" r="13" fill="#8A6236" /><circle cx="66" cy="150" r="10" fill="#FFFDF4" />
        <path d="M54 200h24l4 10H50Z" fill="#A9B0B8" /><rect x="58" y="203" width="10" height="4" rx="2" fill="#3D8BFF" />
        {mao(66, 190, pele, 11)}
      </g>
    )
    case 'janela': return (
      <g className="p-flutua">
        <rect x="140" y="106" width="56" height="46" rx="6" fill="#fff" /><path d="M140 112a6 6 0 0 1 6-6h44a6 6 0 0 1 6 6v6h-56Z" fill="#4A7FD0" />
        <circle cx="147" cy="112" r="1.8" fill="#E0455F" /><circle cx="153" cy="112" r="1.8" fill="#FFC800" /><circle cx="159" cy="112" r="1.8" fill="#7FB83A" />
        <circle cx="168" cy="128" r="7" fill="#FBEFD2" /><path d="M168 123v10M164 127h8" stroke="#C9A227" strokeWidth="1.5" />
        <path d="M158 134h20q-2 8-8 8v4h4v3h-12v-3h4v-4q-6 0-8-8Z" fill="#E89A2A" />
      </g>
    )
    case 'livro': return <g><rect x="80" y="188" width="40" height="30" rx="3" fill="#B3263E" /><path d="M97 192h6v22h-6zM90 199h20v6H90z" fill="#FFC800" />{mao(80, 204, pele)}{mao(120, 204, pele)}</g>
    case 'sol': return <g transform="translate(100 168)" className="p-raios">{[...Array(8)].map((_, i) => <rect key={i} x="-2" y="-15" width="4" height="8" rx="2" fill="#FFC800" transform={`rotate(${i * 45})`} />)}<circle r="7" fill="#FFC800" /></g>
    case 'pomba': return <g transform="translate(104 196)"><path d="M-18 4q6-12 20-8l12-6-4 10q8 8-6 14-14 4-22-10Z" fill="#fff" /><path d="M-4-2q-8-14 4-20 2 12-4 20Z" fill="#E3ECF5" /><circle cx="8" cy="-4" r="2" fill="#2B211C" /><path d="M14-6l6-1-4 4Z" fill="#E0A030" /></g>
    case 'rosas': return <g><path d="M100 230V196M90 206h20" stroke="#2B211C" strokeWidth="4" />{[[86, 196], [100, 188], [114, 196], [92, 208], [108, 208]].map(([x, y], i) => <circle key={i} cx={x} cy={y} r="8" fill={i % 2 ? '#E0457B' : '#F07CA8'} />)}</g>
    default: return null
  }
}

/* =================== figura =================== */

export default function Personagem({ id, spec, humor, size = 120, sombra = true, className = '', busto = false, mini = false, animado = true, falando = false }) {
  // única imagem de Jesus do app: todo guia mostra a mesma arte
  if (!spec && id) return <Marca size={Math.round(size * (busto ? 0.95 : 1.3))} className={className} largura />
  if (!spec && RIG[id]) return <Arte id={id} size={size} className={className} busto={busto} mini={mini} animado={animado} falando={falando} />
  const s = spec || GUIAS[id] || GUIAS.jesus
  const expressao = humor || s.expressao || 'feliz'
  const itens = s.itens || []
  // mini: cabeça maior e corpo encolhido (estilo das miniaturas da trilha)
  const tCabeca = `translate(100 132) scale(${mini ? 1.34 : 1.13}) translate(-100 -132)`
  const tCorpo = mini ? 'translate(100 132) scale(.6) translate(-100 -132)' : undefined
  const vb = busto ? '30 -4 140 148' : mini ? '0 -36 200 294' : '0 -14 200 360'
  const [w, h] = vb.split(' ').slice(2).map(Number)
  return (
    <svg viewBox={vb} width={size} height={(size * h) / w} className={`${animado ? 'p-anima' : ''} ${className}`} role="img" aria-label={s.nome || 'Avatar'}>
      {sombra && !busto && <ellipse cx="100" cy={mini ? 252 : 334} rx={mini ? 52 : 78} ry={mini ? 9 : 13} fill="#5B8FD6" opacity=".9" />}
      <g transform={tCorpo}>
        <g className="p-respira">
          <Corpo s={s} />
          {itens.filter(i => i === 'esquadro').map(i => <Item key={i} id={i} pele={s.pele} />)}
          <Bracos s={s} />
          {itens.filter(i => i !== 'esquadro').map(i => <Item key={i} id={i} pele={s.pele} />)}
        </g>
      </g>
      <g transform={tCabeca}>
        <g className="p-cabeca"><Cabeca s={s} expressao={expressao} /></g>
      </g>
    </svg>
  )
}

// Personagens principais: a arte original do projeto (public/personagens) com pálpebras e boca
// refeitas por cima na cor da pele, para piscar e falar. Miniatura: corte no pescoço,
// cabeça ampliada e corpo reduzido. Medidas em rig.json (gerado de arte-original/).
function Arte({ id, size, className, busto, mini, animado, falando }) {
  const r = RIG[id]
  const uid = useId().replace(/:/g, '')
  const { w, h, pescoco: p, cx, dist } = r
  const vb = busto ? [cx - dist * 1.65, Math.max(0, (r.olhos[0][1] + r.olhos[0][3]) / 2 - dist * 1.55), dist * 3.3, dist * 3.3]
    : mini ? [-w * 0.14, p - p * 1.3, w * 1.28, p * 1.3 + (h - p) * 0.6] : [0, 0, w, h]
  const alturaPadrao = size * 1.75 // todos com a mesma altura visual, qualquer que seja a largura da arte
  const [larg, alt] = busto ? [size, size] : [(alturaPadrao * vb[2]) / vb[3], alturaPadrao]
  const img = <image href={url(`/personagens/${id}.png`)} width={w} height={h} />
  return (
    <svg viewBox={vb.join(' ')} width={larg} height={alt} className={`${animado ? 'p-anima' : ''} ${falando ? 'p-falando' : ''} ${className}`} role="img" aria-label={GUIAS[id]?.nome || id}>
      <defs>
        <clipPath id={`c${uid}`}><rect x={-w} y={-h} width={w * 3} height={h + p + 2} /></clipPath>
        <clipPath id={`k${uid}`}><rect x={-w} y={p - 2} width={w * 3} height={h * 2} /></clipPath>
      </defs>
      <g transform={mini ? `translate(${cx} ${p}) scale(.6) translate(${-cx} ${-p})` : undefined}>
        <g className="p-respira"><g clipPath={`url(#k${uid})`}>{img}</g></g>
      </g>
      <g transform={mini ? `translate(${cx} ${p}) scale(1.3) translate(${-cx} ${-p})` : undefined}>
        <g className="p-art-cabeca">
          <g clipPath={`url(#c${uid})`}>{img}</g>
          {r.olhos.map(([x0, y0, x1, y1], i) => (
            <g key={i} className="p-palpebra">
              <ellipse cx={(x0 + x1) / 2} cy={(y0 + y1) / 2} rx={(x1 - x0) / 2 + 3} ry={(y1 - y0) / 2 + 3} fill={r.pele[i]} />
              <path d={`M${x0 - 1} ${(y0 + y1) / 2 + 2}q${(x1 - x0) / 2 + 1} ${(y1 - y0) * 0.28} ${x1 - x0 + 2} 0`} stroke="#3A2618" strokeWidth={Math.max(2, dist * 0.05)} fill="none" strokeLinecap="round" />
            </g>
          ))}
          <g className="p-boca-aberta">
            <ellipse cx={r.boca[0]} cy={r.boca[1] + r.boca[2] * 0.3} rx={r.boca[2] * 0.55} ry={r.boca[2] * 0.45} fill="#6A2A24" />
            <ellipse cx={r.boca[0]} cy={r.boca[1] + r.boca[2] * 0.55} rx={r.boca[2] * 0.32} ry={r.boca[2] * 0.17} fill="#E07A7A" />
          </g>
        </g>
      </g>
    </svg>
  )
}

/* ---------- marca do app: Jesus de braços abertos ---------- */
export function Marca({ size = 40, className = '', largura = false }) {
  // largura: size é a largura (lugares de personagem); senão é a altura (ícone na barra)
  const estilo = largura ? { width: size, height: 'auto' } : { height: size, width: 'auto' }
  return <img src={url('/jesus-abracos.png')} alt="Jesus" style={estilo} className={`shrink-0 ${className}`} />
}

/* ---------- bandeira do Vaticano (simplificada) ---------- */
export function Bandeira({ size = 34, className = '' }) {
  return (
    <svg viewBox="0 0 30 22" width={size} height={(size * 22) / 30} className={className} role="img" aria-label="Bandeira do Vaticano">
      <rect width="30" height="22" rx="4" fill="#fff" />
      <path d="M4 0h11v22H4a4 4 0 0 1-4-4V4a4 4 0 0 1 4-4Z" fill="#FFC800" />
      <g strokeWidth="1.6" strokeLinecap="round">
        <path d="M18 17l8-9" stroke="#C9A227" /><path d="M26 17l-8-9" stroke="#A9A9A9" />
        <circle cx="18.6" cy="16.4" r="1.6" fill="none" stroke="#C9A227" /><circle cx="25.4" cy="16.4" r="1.6" fill="none" stroke="#A9A9A9" />
      </g>
      <path d="M20 7q2-4 4 0Z" fill="#E8E8E8" stroke="#C9A227" strokeWidth=".6" /><circle cx="22" cy="2.8" r=".9" fill="#C9A227" />
    </svg>
  )
}
