// Boneco do crismando: chibi original (cabeça grande e redonda = simpático; corpo pequeno).
// Silhueta forte e leitura em qualquer tamanho. Peças combináveis, com toques de cultura pop
// genérica (sem personagens de marca) e itens católicos.

export const PELES = ['#FFE3D1', '#F9CDB3', '#F2B896', '#E3A27C', '#D08A62', '#B9724D', '#9C5C3C', '#7F4A31', '#643826', '#4B291C']
export const CORES_CABELO = ['#1F1A1A', '#4A2F1F', '#7A4A2A', '#B46A33', '#E5A84B', '#F2D27A', '#E7E3DC', '#8B8FA0', '#E0455F', '#8B5CF6', '#3D8BFF', '#29B39A']
export const CORES_OLHO = ['#3A2616', '#6B3F1E', '#3D7BD9', '#3E9B5C', '#8B5CF6', '#C0392B']
export const CORES_ROUPA = ['#FFC800', '#FFFFFF', '#E0455F', '#3D8BFF', '#7FB83A', '#8B5CF6', '#FF8A3D', '#1F2A33', '#F07CA8', '#29B39A', '#B5895A', '#C7D2DC']
export const FUNDOS = ['#FFC800', '#3D8BFF', '#E0455F', '#7FB83A', '#8B5CF6', '#FF8A3D', '#29B39A', '#F07CA8', '#1F2A33', '#E8EEF4']

export const OPCOES = {
  formato: ['redonda', 'quadrada', 'alta', 'larga'],
  corpo: ['padrao', 'magro', 'forte', 'baixinho'],
  olhar: ['normal', 'entediado', 'desconfiado', 'bravo', 'sonhador'],
  nariz: ['bolinha', 'triangulo', 'batata', 'arrebitado'],
  cabelo: ['curto', 'topete', 'anime', 'cacheado', 'blackpower', 'longo', 'rabo', 'coque', 'trancas', 'moicano', 'raspado', 'careca'],
  expressao: ['feliz', 'radiante', 'piscando', 'determinado', 'apaixonado', 'surpreso', 'maroto', 'sono'],
  roupa: ['camiseta', 'moletom', 'jaqueta', 'time', 'tunica', 'gamer'],
  cabeca: ['nada', 'bone', 'gorro', 'fone', 'gatinho', 'coroa', 'bandana', 'bruxo'],
  rosto: ['nada', 'oculos', 'escuros', 'sardas', 'curativo', 'bigode', 'barba'],
  extra: ['nada', 'terco', 'cruz', 'capa', 'controle', 'skate', 'violao', 'microfone', 'mochila'],
}
export const NOMES = {
  redonda: 'Redonda', quadrada: 'Quadrada', alta: 'Comprida', larga: 'Larga', padrao: 'Normal', magro: 'Magrelo', forte: 'Forte', baixinho: 'Baixinho',
  normal: 'Normal', entediado: 'Entediado', desconfiado: 'Desconfiado', bravo: 'Bravo', sonhador: 'Sonhador',
  bolinha: 'Bolinha', triangulo: 'Pontudo', batata: 'Batata', arrebitado: 'Arrebitado',
  curto: 'Curto', topete: 'Topete', anime: 'Espetado', cacheado: 'Cacheado', blackpower: 'Black power', longo: 'Longo', rabo: 'Rabo de cavalo', coque: 'Coque', trancas: 'Tranças', moicano: 'Moicano', raspado: 'Raspado', careca: 'Careca',
  feliz: 'Feliz', radiante: 'Radiante', piscando: 'Piscadinha', determinado: 'Determinado', apaixonado: 'Apaixonado', surpreso: 'Surpreso', maroto: 'Maroto', sono: 'Sono',
  camiseta: 'Camiseta', moletom: 'Moletom', jaqueta: 'Jaqueta', time: 'Camisa de time', tunica: 'Túnica de crisma', gamer: 'Colete gamer',
  nada: 'Nada', bone: 'Boné', gorro: 'Gorro', fone: 'Fone gamer', gatinho: 'Orelhas de gato', coroa: 'Coroa', bandana: 'Faixa ninja', bruxo: 'Chapéu de mago',
  oculos: 'Óculos', escuros: 'Óculos escuros', sardas: 'Sardas', curativo: 'Curativo', bigode: 'Bigode', barba: 'Barba',
  terco: 'Terço', cruz: 'Cruz', capa: 'Capa de herói', controle: 'Controle', skate: 'Skate', violao: 'Violão', microfone: 'Microfone', mochila: 'Mochila',
}

export const BONECO_PADRAO = {
  pele: PELES[2], olhos: CORES_OLHO[0], expressao: 'feliz',
  cabelo: 'curto', corCabelo: CORES_CABELO[1], roupa: 'camiseta', corRoupa: CORES_ROUPA[0],
  cabeca: 'nada', rosto: 'nada', extra: 'nada', fundo: FUNDOS[1],
  formato: 'redonda', corpo: 'padrao', olhar: 'normal', nariz: 'bolinha',
}

// converte o avatar antigo (versão anterior do editor) para o novo
export function normalizar(a = {}) {
  const b = { ...BONECO_PADRAO, ...a }
  if (a.cabelo && typeof a.cabelo === 'object') { b.cabelo = OPCOES.cabelo.includes(a.cabelo.estilo) ? a.cabelo.estilo : 'curto'; b.corCabelo = a.cabelo.cor || b.corCabelo }
  if (a.roupa && typeof a.roupa === 'object') { b.roupa = OPCOES.roupa.includes(a.roupa.tipo) ? a.roupa.tipo : 'camiseta'; b.corRoupa = a.roupa.cor || b.corRoupa }
  if (a.acessorio) { if (['oculos'].includes(a.acessorio)) b.rosto = 'oculos'; if (['terco', 'cruz'].includes(a.acessorio)) b.extra = a.acessorio; if (a.acessorio === 'bone') b.cabeca = 'bone' }
  if (a.barba?.estilo && a.barba.estilo !== 'nenhuma') b.rosto = a.barba.estilo === 'bigode' ? 'bigode' : 'barba'
  if (!OPCOES.expressao.includes(b.expressao)) b.expressao = 'feliz'
  return b
}

const tom = (hex, k) => {
  const n = parseInt(hex.slice(1), 16)
  const c = s => Math.max(0, Math.min(255, Math.round(((n >> s) & 255) * k))).toString(16).padStart(2, '0')
  return `#${c(16)}${c(8)}${c(0)}`
}

/* ---------- cabelo: desenhado a partir da caixa da cabeça escolhida, então serve em todas ---------- */
// h = { x, y, width, height, rx } da cabeça
function capa(h, frac, borda) {
  const { x, y, width: w, height: a } = h, Y = y + a * frac, r = Math.min(h.rx + 2, a * frac)
  return `M${x - 2} ${Y}V${y + r - 2}A${r} ${r} 0 0 1 ${x - 2 + r} ${y - 2}H${x + w + 2 - r}A${r} ${r} 0 0 1 ${x + w + 2} ${y + r - 2}V${Y}${borda(x, y, w, Y)}Z`
}
const franja = (x, y, w, Y) => `Q${x + w * 0.82} ${Y - 18} ${x + w * 0.64} ${Y - 10}Q${x + w * 0.5} ${Y - 2} ${x + w * 0.36} ${Y - 13}Q${x + w * 0.18} ${Y - 22} ${x - 2} ${Y}`
const risca = (x, y, w, Y) => `Q${x + w * 0.74} ${Y - 26} ${x + w / 2 + 3} ${Y - 34}L${x + w / 2} ${Y - 26}L${x + w / 2 - 3} ${Y - 34}Q${x + w * 0.26} ${Y - 26} ${x - 2} ${Y}`
const reta = (x, y, w, Y) => `Q${x + w / 2} ${Y - 10} ${x - 2} ${Y}`

function CabeloAtras({ e, c, h }) {
  const { x, y, width: w, height: a } = h, cx = x + w / 2
  switch (e) {
    case 'longo': return <path d={`M${x - 7} ${y + a * 0.3}Q${x - 8} ${y - 6} ${cx} ${y - 7}Q${x + w + 8} ${y - 6} ${x + w + 7} ${y + a * 0.3}V${y + a + 30}q-${w * 0.13} 12-${w * 0.26} 0V${y + a * 0.62}H${x + w * 0.26}V${y + a + 30}q-${w * 0.13} 12-${w * 0.26} 0Z`} fill={c} />
    case 'rabo': return <path d={`M${x + w - 6} ${y + a * 0.22}q34 4 30 46-2 22-14 30 4-30-20-50Z`} fill={c} />
    case 'trancas': return <g fill={c}>{[x - 3, x + w + 3].map(bx => <g key={bx}>{[0, 1, 2, 3].map(i => <ellipse key={i} cx={bx} cy={y + a * 0.62 + i * 14} rx="8.5" ry="8" />)}</g>)}</g>
    case 'blackpower': return <ellipse cx={cx} cy={y + a * 0.36} rx={w * 0.64} ry={a * 0.6} fill={c} />
    case 'coque': return <circle cx={cx} cy={y - 8} r="16" fill={c} />
    default: return null
  }
}

function CabeloFrente({ e, c, h }) {
  const { x, y, width: w, height: a } = h, cx = x + w / 2, s = tom(c, 0.82)
  switch (e) {
    case 'curto': return <path d={capa(h, 0.4, franja)} fill={c} />
    case 'topete': return <g><path d={capa(h, 0.38, franja)} fill={c} /><ellipse cx={x + w * 0.42} cy={y - 4} rx={w * 0.26} ry="15" fill={c} /><path d={`M${x + w * 0.3} ${y - 8}q${w * 0.14}-12 ${w * 0.3}-4`} stroke={s} strokeWidth="4" fill="none" strokeLinecap="round" /></g>
    case 'anime': return (
      <g fill={c}>
        <path d={capa(h, 0.42, (X, Y0, W, Y) => `L${X + W * 0.84} ${Y - 16}L${X + W * 0.7} ${Y + 2}L${X + W * 0.56} ${Y - 14}L${X + W * 0.42} ${Y + 4}L${X + W * 0.28} ${Y - 14}L${X + W * 0.14} ${Y + 2}L${X - 2} ${Y - 6}`)} />
        {[0.08, 0.26, 0.46, 0.66, 0.86].map((t, i) => <path key={i} d={`M${x + w * (t - 0.1)} ${y + 8}L${x + w * t + (i % 2 ? 4 : -4)} ${y - 20 + (i === 2 ? -6 : 0)}L${x + w * (t + 0.1)} ${y + 8}Z`} />)}
      </g>
    )
    case 'cacheado': return (
      <g fill={c}>
        <path d={capa(h, 0.24, reta)} />
        {[0, 1, 2, 3, 4, 5, 6].map(t => { const k = Math.abs(t - 3) / 3; return <circle key={t} cx={x + w * (0.04 + 0.92 * t / 6)} cy={y + 4 + k * k * Math.min(h.rx, 30) * 0.9} r={w * 0.13} /> })}
      </g>
    )
    case 'blackpower': return <path d={capa(h, 0.3, (X, Y0, W, Y) => `Q${X + W * 0.75} ${Y - 10} ${X + W * 0.62} ${Y - 4}Q${X + W / 2} ${Y - 12} ${X + W * 0.38} ${Y - 4}Q${X + W * 0.25} ${Y - 10} ${X - 2} ${Y}`)} fill={c} />
    case 'longo':
    case 'rabo':
    case 'trancas':
    case 'coque': return <path d={capa(h, 0.44, risca)} fill={c} />
    case 'moicano': return <path d={`M${cx - 12} ${y + a * 0.34}Q${cx - 14} ${y - 12} ${cx} ${y - 22}Q${cx + 14} ${y - 12} ${cx + 12} ${y + a * 0.34}Z`} fill={c} />
    case 'raspado': return <path d={capa(h, 0.32, reta)} fill={c} opacity=".45" />
    default: return null
  }
}

/* ---------- rosto ---------- */
function Olhos({ x, cor, exp }) {
  if (exp === 'piscando' && x > 80) return <path d={`M${x - 10} 74q10-9 20 0`} stroke="#2B211C" strokeWidth="4.5" fill="none" strokeLinecap="round" />
  if (exp === 'sono') return <path d={`M${x - 10} 74q10 7 20 0`} stroke="#2B211C" strokeWidth="4.5" fill="none" strokeLinecap="round" />
  if (exp === 'apaixonado') return <path transform={`translate(${x} 72)`} d="M0 10C-14 1-14-10-6-10c4 0 6 3 6 5 0-2 2-5 6-5 8 0 8 11-6 20Z" fill="#E0455F" />
  if (exp === 'radiante') return (
    <g><ellipse cx={x} cy="72" rx="11.5" ry="13" fill="#fff" /><path transform={`translate(${x + 1} 73)`} d="M0-9 2.5-2.5 9 0 2.5 2.5 0 9-2.5 2.5-9 0-2.5-2.5Z" fill={cor} /><circle cx={x + 5} cy="66" r="2.5" fill="#fff" /></g>
  )
  const ry = exp === 'surpreso' ? 14 : 13
  return (
    <g>
      <ellipse cx={x} cy="72" rx="11.5" ry={ry} fill="#fff" />
      <circle cx={x + 1.5} cy="74" r="8" fill={cor} /><circle cx={x + 2} cy="74.5" r="4" fill="#160F0C" />
      <circle cx={x + 5} cy="69" r="3.2" fill="#fff" /><circle cx={x - 2} cy="79" r="1.5" fill="#fff" opacity=".8" />
    </g>
  )
}
function Rosto({ b }) {
  const e = b.expressao, sombra = tom(b.pele, 0.84)
  const sob = e === 'determinado' ? 'M50 52 72 58M110 52 88 58' : e === 'surpreso' ? 'M50 50q12-8 22-2M110 50q-12-8-22-2' : 'M51 55q11-6 21-2M109 55q-11-6-21-2'
  const boca = {
    feliz: <path d="M70 94q10 10 20 0" stroke="#7A2A2A" strokeWidth="4" fill="none" strokeLinecap="round" />,
    radiante: <path d="M66 91q14 18 28 0Z" fill="#7A2A2A" />,
    piscando: <path d="M68 92q12 12 24 0Z" fill="#7A2A2A" />,
    determinado: <path d="M68 93q12 6 24-2" stroke="#7A2A2A" strokeWidth="4" fill="none" strokeLinecap="round" />,
    apaixonado: <path d="M68 92q12 12 24 0Z" fill="#7A2A2A" />,
    surpreso: <ellipse cx="80" cy="97" rx="6" ry="7.5" fill="#7A2A2A" />,
    maroto: <path d="M70 95q10 4 20-6" stroke="#7A2A2A" strokeWidth="4" fill="none" strokeLinecap="round" />,
    sono: <ellipse cx="80" cy="96" rx="4.5" ry="3.5" fill="#7A2A2A" />,
  }[e]
  return (
    <g>
      <Olhos x={62} cor={b.olhos} exp={e} /><Olhos x={98} cor={b.olhos} exp={e} />
      {e !== 'apaixonado' && <path d={sob} stroke={tom(b.corCabelo, 0.85)} strokeWidth="5" fill="none" strokeLinecap="round" />}
      <ellipse cx="46" cy="88" rx="8" ry="5" fill="#F28B8B" opacity=".45" /><ellipse cx="114" cy="88" rx="8" ry="5" fill="#F28B8B" opacity=".45" />
      {boca}
      {(e === 'radiante' || e === 'piscando' || e === 'apaixonado') && <path d="M71 93h18" stroke="#fff" strokeWidth="3" />}
      {e === 'sono' && <text x="124" y="34" fontSize="16" fontWeight="900" fill="#8EA3B5">z</text>}
    </g>
  )
}
function Rosto2({ id, b }) {
  switch (id) {
    case 'oculos': return <g fill="none" stroke="#2B2B2B" strokeWidth="4"><circle cx="62" cy="73" r="15" /><circle cx="98" cy="73" r="15" /><path d="M77 72h6M47 70l-14-4M113 70l14-4" /></g>
    case 'escuros': return <g><path d="M44 62h34v12q-2 14-16 14-18 0-18-14ZM82 62h34v12q0 14-18 14-14 0-16-14Z" fill="#1F1A2E" /><path d="M78 66h4M44 64 34 60M116 64l10-4" stroke="#1F1A2E" strokeWidth="4" /><path d="M50 68l8-4M88 68l8-4" stroke="#fff" strokeWidth="3" strokeLinecap="round" opacity=".7" /></g>
    case 'sardas': return <g fill={tom(b.pele, 0.7)}>{[[44, 84], [50, 89], [40, 90], [116, 84], [110, 89], [120, 90]].map(([x, y], i) => <circle key={i} cx={x} cy={y} r="1.8" />)}</g>
    case 'curativo': return <g transform="rotate(-20 112 50)"><rect x="98" y="44" width="28" height="11" rx="5" fill="#F5D0A9" /><path d="M108 47v5M112 47v5M116 47v5" stroke="#D9A877" strokeWidth="1.5" /></g>
    case 'bigode': return <path d="M64 90q8-8 16-3 8-5 16 3-8 4-16 1-8 3-16-1Z" fill={b.corCabelo} />
    case 'barba': return <path d="M34 78q0 36 46 36t46-36q-8 16-20 18-8-6-26-6t-26 6q-12-2-20-18Z" fill={b.corCabelo} />
    default: return null
  }
}

/* ---------- cabeça (chapéus) ---------- */
function Chapeu({ id, b }) {
  switch (id) {
    case 'bone': return <g><path d="M30 46Q30 8 80 8t50 38Z" fill={b.corRoupa} /><path d="M80 42h62q4 10-8 10H80Z" fill={tom(b.corRoupa, 0.75)} /><circle cx="80" cy="10" r="4" fill={tom(b.corRoupa, 0.7)} /><path d="M80 8v34" stroke={tom(b.corRoupa, 0.85)} strokeWidth="3" /></g>
    case 'gorro': return <g><path d="M30 50Q28 4 80 4t50 46Z" fill="#E0455F" /><rect x="26" y="40" width="108" height="16" rx="8" fill="#F4EEDF" /><circle cx="80" cy="2" r="10" fill="#F4EEDF" /></g>
    case 'fone': return <g><path d="M30 64Q28 6 80 6t50 58" stroke="#1F2A33" strokeWidth="8" fill="none" /><rect x="16" y="54" width="20" height="32" rx="9" fill="#1F2A33" /><rect x="124" y="54" width="20" height="32" rx="9" fill="#1F2A33" /><rect x="19" y="58" width="6" height="24" rx="3" fill="#29B39A" /><rect x="135" y="58" width="6" height="24" rx="3" fill="#29B39A" /></g>
    case 'gatinho': return <g><path d="M30 64Q28 8 80 8t50 56" stroke="#F07CA8" strokeWidth="7" fill="none" /><path d="M36 36 40 4l26 18Z" fill="#F07CA8" /><path d="M124 36 120 4 94 22Z" fill="#F07CA8" /><path d="M42 30l2-16 12 9ZM118 30l-2-16-12 9Z" fill="#FFD1E3" /></g>
    case 'coroa': return <g><path d="M44 30 48 2l16 16 16-20 16 20 16-16 4 28Z" fill="#FFC800" /><rect x="44" y="26" width="72" height="9" rx="3" fill="#D29C00" /><circle cx="80" cy="14" r="4" fill="#E0455F" /><circle cx="56" cy="20" r="3" fill="#3D8BFF" /><circle cx="104" cy="20" r="3" fill="#7FB83A" /></g>
    case 'bandana': return <g><rect x="28" y="38" width="104" height="14" rx="5" fill="#3D8BFF" /><path d="M130 42q18 4 22 18-12-4-22-6Z" fill="#3D8BFF" /><circle cx="80" cy="45" r="5" fill="#C7D2DC" /></g>
    case 'bruxo': return <g><path d="M24 44q56-22 112 0l-6 6q-50-16-100 0Z" fill="#6236C9" /><path d="M42 40 86-30l10 14-6 4 26 52Z" fill="#8B5CF6" /><path d="M58 34q20-6 40-2" stroke="#FFC800" strokeWidth="5" fill="none" /><path d="M78 0l3 6 6 1-5 4 1 6-5-3-5 3 1-6-5-4 6-1Z" fill="#FFC800" /></g>
    default: return null
  }
}

/* ---------- corpo e roupa ---------- */
function Corpo({ b }) {
  const c = b.corRoupa, s = tom(c, 0.84), calca = b.roupa === 'tunica' ? null : '#3E5A86'
  return (
    <g>
      {calca && <g fill={calca}><rect x="58" y="146" width="20" height="34" rx="7" /><rect x="82" y="146" width="20" height="34" rx="7" /></g>}
      {b.roupa === 'tunica'
        ? <path d="M44 120q36-12 72 0 8 30 8 62H36q0-32 8-62Z" fill="#F7F4EC" />
        : <path d="M44 120q36-12 72 0 6 16 6 34H38q0-18 6-34Z" fill={c} />}
      <g fill="#2B2B33"><rect x="54" y="178" width="26" height="12" rx="6" /><rect x="80" y="178" width="26" height="12" rx="6" /></g>
      <path d="M56 186h22M82 186h22" stroke="#fff" strokeWidth="2.5" opacity=".7" />
      {b.roupa === 'moletom' && <g><path d="M54 118q26 16 52 0" stroke={s} strokeWidth="7" fill="none" strokeLinecap="round" /><rect x="64" y="136" width="32" height="14" rx="6" fill={s} /><path d="M72 122v12M88 122v12" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" /></g>}
      {b.roupa === 'jaqueta' && <g><path d="M44 120q14-6 30-8l-2 42H38q0-18 6-34Z" fill="#4F78B8" /><path d="M116 120q-14-6-30-8l2 42h34q0-18-6-34Z" fill="#46699F" /><path d="M66 116l8 14 6-16M94 116l-8 14-6-16" fill="#3A5A8C" /></g>}
      {b.roupa === 'time' && <g><path d="M44 120q8-4 16-6v40H38q0-18 6-34ZM116 120q-8-4-16-6v40h22q0-18-6-34Z" fill={s} /><text x="80" y="148" textAnchor="middle" fontSize="22" fontWeight="900" fill="#fff">10</text></g>}
      {b.roupa === 'gamer' && <g><path d="M48 124h64l4 30H44Z" fill="#1F2A33" /><path d="M52 132h56" stroke="#29B39A" strokeWidth="3" /><path d="M72 142h16" stroke="#F07CA8" strokeWidth="3" /><circle cx="64" cy="146" r="3" fill="#FFC800" /></g>}
      {b.roupa === 'tunica' && <g><path d="M80 116v66" stroke="#E3DACB" strokeWidth="3" /><path d="M72 124h16M80 118v14" stroke="#D29C00" strokeWidth="4" strokeLinecap="round" /></g>}
      {b.roupa === 'camiseta' && <path d="M66 114q14 10 28 0" fill={tom(b.pele, 0.9)} />}
    </g>
  )
}
function Bracos({ b }) {
  const c = b.roupa === 'tunica' ? '#EDE8DC' : b.roupa === 'jaqueta' ? '#4F78B8' : b.roupa === 'gamer' ? b.corRoupa : b.corRoupa
  return (
    <g>
      <path d="M46 124q-12 14-10 30" stroke={c} strokeWidth="15" strokeLinecap="round" fill="none" />
      <path d="M114 124q12 14 10 30" stroke={tom(c, 0.92)} strokeWidth="15" strokeLinecap="round" fill="none" />
      <circle cx="37" cy="157" r="8" fill={b.pele} /><circle cx="123" cy="157" r="8" fill={b.pele} />
    </g>
  )
}
function ExtraAtras({ id, b }) {
  if (id === 'capa') return <path d="M46 118q34-10 68 0l22 70q-56 12-112 0Z" fill="#E0455F" />
  if (id === 'mochila') return <rect x="34" y="118" width="92" height="50" rx="16" fill="#7FB83A" />
  return null
}
function ExtraFrente({ id }) {
  switch (id) {
    case 'terco': return <g><path d="M62 116q18 30 36 0" stroke="#8B5A2E" strokeWidth="3" fill="none" strokeDasharray="1.5 5" strokeLinecap="round" /><path d="M78 136h4v12h-4zM74 140h12v4H74z" fill="#8B5A2E" /></g>
    case 'cruz': return <g><path d="M68 116q12 12 24 0" stroke="#D29C00" strokeWidth="2" fill="none" /><path d="M78 124h5v18h-5zM73 129h15v5H73z" fill="#FFC800" /></g>
    case 'capa': return <path d="M46 118q34 10 68 0" stroke="#A82B42" strokeWidth="5" fill="none" />
    case 'mochila': return <path d="M54 118v34M106 118v34" stroke="#5A8A26" strokeWidth="6" />
    case 'controle': return <g transform="translate(110 148)"><rect x="-4" y="-8" width="34" height="20" rx="10" fill="#3E4A57" /><circle cx="4" cy="2" r="3" fill="#C7D2DC" /><circle cx="20" cy="-1" r="2.5" fill="#E0455F" /><circle cx="25" cy="4" r="2.5" fill="#3D8BFF" /></g>
    case 'skate': return <g transform="translate(130 120) rotate(78)"><rect x="0" y="0" width="64" height="10" rx="5" fill="#FF8A3D" /><circle cx="12" cy="13" r="4" fill="#1F2A33" /><circle cx="52" cy="13" r="4" fill="#1F2A33" /></g>
    case 'violao': return <g transform="translate(112 124) rotate(30)"><ellipse cx="10" cy="34" rx="16" ry="18" fill="#C9862E" /><ellipse cx="10" cy="18" rx="11" ry="12" fill="#C9862E" /><circle cx="10" cy="28" r="5" fill="#5B3A20" /><rect x="7" y="-26" width="6" height="40" rx="2" fill="#5B3A20" /></g>
    case 'microfone': return <g transform="translate(116 126)"><rect x="5" y="14" width="6" height="22" rx="3" fill="#3E4A57" /><circle cx="8" cy="10" r="9" fill="#C7D2DC" /><path d="M2 8h12M2 12h12" stroke="#8EA3B5" strokeWidth="1.5" /></g>
    default: return null
  }
}

const CABECA = {
  redonda: { x: 30, y: 16, width: 100, height: 98, rx: 44 },
  quadrada: { x: 26, y: 18, width: 108, height: 96, rx: 20 },
  alta: { x: 36, y: 0, width: 88, height: 114, rx: 34 },
  larga: { x: 20, y: 26, width: 120, height: 88, rx: 40 },
}
// leva o que foi desenhado para a cabeça redonda (x30 y16, 100x98) até o formato escolhido
function ajusteCabeca(f) {
  const h = CABECA[f] || CABECA.redonda, sx = h.width / 100, sy = h.height / 98
  return `translate(${h.x - 30 * sx} ${h.y - 16 * sy}) scale(${sx} ${sy})`
}
// corpo: escala o tronco/braços/pernas em torno do pescoço
const CORPO = { padrao: [1, 1], magro: [0.78, 1.08], forte: [1.28, 1], baixinho: [1.08, 0.82] }

// pálpebras dão a "atitude" do olhar
function Olhar({ b }) {
  // cada pálpebra: área na cor da pele + só a linha da borda de baixo
  const lid = (k, area, borda) => <g key={k}><path d={area} fill={b.pele} /><path d={borda} stroke="#2B211C" strokeWidth="3.5" fill="none" strokeLinecap="round" /></g>
  const reta = (x, y) => lid(x, `M${x - 14} 56H${x + 14}V${y}H${x - 14}Z`, `M${x - 13} ${y}H${x + 13}`)
  switch (b.olhar) {
    case 'entediado': return <g>{reta(62, 73)}{reta(98, 73)}</g>
    case 'sonhador': return <g>{reta(62, 69)}{reta(98, 69)}</g>
    case 'desconfiado': return <g>{reta(62, 75)}{reta(98, 66)}</g>
    case 'bravo': return <g>{lid(62, 'M46 54H78V70L46 62Z', 'M47 62 77 70')}{lid(98, 'M82 54H114V62L82 70Z', 'M83 70 113 62')}</g>
    default: return null
  }
}
function Nariz({ b }) {
  const c = tom(b.pele, 0.8)
  switch (b.nariz) {
    case 'triangulo': return <path d="M80 76l-8 16h14Z" fill={c} />
    case 'batata': return <ellipse cx="80" cy="86" rx="10" ry="8" fill={c} />
    case 'arrebitado': return <path d="M76 80q2 10 10 8" stroke={c} strokeWidth="4" fill="none" strokeLinecap="round" />
    default: return <path d="M78 82q2 6 4 0" stroke={c} strokeWidth="3" fill="none" strokeLinecap="round" />
  }
}

export default function Boneco({ spec, size = 120, busto = false, fundo = false, className = '' }) {
  const b = normalizar(spec)
  const vb = busto ? '18 -8 124 124' : '0 -10 160 206'
  const [w, h] = vb.split(' ').slice(2).map(Number)
  return (
    <svg viewBox={vb} width={size} height={(size * h) / w} className={className} role="img" aria-label="Avatar">
      {fundo && <rect x="-20" y="-20" width="200" height="240" fill={b.fundo} />}
      {!busto && <ellipse cx="80" cy="190" rx="48" ry="7" fill="#000" opacity=".22" />}
      <ExtraAtras id={b.extra} b={b} />
      {/* cabelo e chapéu esticam junto com o formato da cabeça (foram desenhados para a redonda) */}
      <CabeloAtras e={b.cabelo} c={b.corCabelo} h={CABECA[b.formato] || CABECA.redonda} />
      <g transform={`translate(80 114) scale(${(CORPO[b.corpo] || CORPO.padrao).join(' ')}) translate(-80 -114)`}>
        <Corpo b={b} />
        <Bracos b={b} />
        <ExtraFrente id={b.extra} />
      </g>
      {(() => { const h = CABECA[b.formato] || CABECA.redonda; return <><circle cx={h.x} cy="72" r="10" fill={tom(b.pele, 0.92)} /><circle cx={h.x + h.width} cy="72" r="10" fill={tom(b.pele, 0.92)} /></> })()}
      <rect {...CABECA[b.formato] || CABECA.redonda} fill={b.pele} />
      <path d="M80 16h6c24 0 44 20 44 44v10c0 24-20 44-44 44h-6Z" fill="#000" opacity=".035" />
      <CabeloFrente e={b.cabelo} c={b.corCabelo} h={CABECA[b.formato] || CABECA.redonda} />
      <Rosto b={b} />
      <Olhar b={b} />
      <Nariz b={b} />
      <Rosto2 id={b.rosto} b={b} />
      <g transform={ajusteCabeca(b.formato)}><Chapeu id={b.cabeca} b={b} /></g>
    </svg>
  )
}

// estilos prontos (personagens originais) para o aluno começar e ajustar
export const ESTILOS = [
  { nome: 'Sério de óculos', b: { formato: 'quadrada', corpo: 'magro', olhar: 'entediado', nariz: 'triangulo', cabelo: 'topete', corCabelo: '#1F1A1A', rosto: 'oculos', roupa: 'camiseta', corRoupa: '#FFFFFF', expressao: 'determinado', pele: '#F2B896', fundo: '#3D8BFF', cabeca: 'nada', extra: 'nada' } },
  { nome: 'Agitada', b: { formato: 'redonda', corpo: 'baixinho', olhar: 'normal', nariz: 'arrebitado', cabelo: 'blackpower', corCabelo: '#4A2F1F', rosto: 'sardas', roupa: 'moletom', corRoupa: '#F07CA8', expressao: 'radiante', pele: '#9C5C3C', fundo: '#FFC800', cabeca: 'nada', extra: 'microfone' } },
  { nome: 'Gamer cansado', b: { formato: 'larga', corpo: 'padrao', olhar: 'entediado', nariz: 'batata', cabelo: 'raspado', corCabelo: '#7A4A2A', rosto: 'nada', roupa: 'gamer', corRoupa: '#29B39A', expressao: 'sono', pele: '#E3A27C', fundo: '#8B5CF6', cabeca: 'fone', extra: 'controle' } },
  { nome: 'Desconfiada', b: { formato: 'alta', corpo: 'magro', olhar: 'desconfiado', nariz: 'triangulo', cabelo: 'longo', corCabelo: '#8B5CF6', rosto: 'nada', roupa: 'jaqueta', corRoupa: '#1F2A33', expressao: 'maroto', pele: '#FFE3D1', fundo: '#E0455F', cabeca: 'nada', extra: 'nada' } },
  { nome: 'Bravo do time', b: { formato: 'quadrada', corpo: 'forte', olhar: 'bravo', nariz: 'batata', cabelo: 'moicano', corCabelo: '#E0455F', rosto: 'curativo', roupa: 'time', corRoupa: '#7FB83A', expressao: 'determinado', pele: '#B9724D', fundo: '#FF8A3D', cabeca: 'nada', extra: 'nada' } },
  { nome: 'Coroinha', b: { formato: 'redonda', corpo: 'baixinho', olhar: 'sonhador', nariz: 'bolinha', cabelo: 'cacheado', corCabelo: '#E5A84B', rosto: 'nada', roupa: 'tunica', corRoupa: '#FFFFFF', expressao: 'feliz', pele: '#F9CDB3', fundo: '#29B39A', cabeca: 'nada', extra: 'terco' } },
]
