// Objetos católicos largados pela trilha (no lugar de repetir personagens).
// Traço chapado e arredondado, com sombra no chão e um brilho de destaque.

const Chao = ({ rx = 40 }) => <ellipse cx="60" cy="88" rx={rx} ry="7" fill="#000" opacity=".28" />
const Brilho = ({ d }) => <path d={d} stroke="#fff" strokeOpacity=".55" strokeWidth="3" fill="none" strokeLinecap="round" />

const OBJ = {
  espada: { nome: 'Espada de São Paulo', d: (
    <g>
      <Chao rx={46} />
      <g transform="rotate(-18 60 70)">
        <path d="M18 66h62l12 5-12 5H18Z" fill="#C9D3DC" /><path d="M18 71h74l-12 5H18Z" fill="#9EABB7" />
        <Brilho d="M24 68h50" />
        <rect x="10" y="58" width="9" height="26" rx="4" fill="#E3B23C" /><rect x="10" y="58" width="9" height="13" rx="4" fill="#F7D673" />
        <rect x="-6" y="67" width="17" height="8" rx="4" fill="#8A5A2E" />
        <circle cx="-8" cy="71" r="6" fill="#E3B23C" />
      </g>
    </g>
  ) },
  terco: { nome: 'Terço de Maria', d: (
    <g>
      <Chao rx={38} />
      {[...Array(18)].map((_, i) => { const a = (i / 18) * Math.PI * 2; return <circle key={i} cx={60 + Math.cos(a) * 26} cy={56 + Math.sin(a) * 15} r="4.2" fill={i % 6 === 0 ? '#3D8BFF' : '#8FC0FF'} /> })}
      <path d="M60 71v8" stroke="#8FC0FF" strokeWidth="3" />
      <path d="M57 79h6v18h-6zM51 84h18v5H51z" fill="#E3B23C" />
      <circle cx="56" cy="44" r="1.6" fill="#fff" opacity=".8" />
    </g>
  ) },
  espinhos: { nome: 'Coroa de espinhos', d: (
    <g>
      <Chao rx={44} />
      <ellipse cx="60" cy="64" rx="38" ry="16" fill="none" stroke="#7A5634" strokeWidth="9" />
      <ellipse cx="60" cy="64" rx="38" ry="16" fill="none" stroke="#A97A48" strokeWidth="4" strokeDasharray="10 8" />
      {[...Array(12)].map((_, i) => { const a = (i / 12) * Math.PI * 2, x = 60 + Math.cos(a) * 38, y = 64 + Math.sin(a) * 16; return <path key={i} d={`M${x} ${y}l${Math.cos(a + 0.9) * 9} ${Math.sin(a + 0.9) * 7 - 3}`} stroke="#5E4026" strokeWidth="3" strokeLinecap="round" /> })}
    </g>
  ) },
  cruz: { nome: 'Cruz', d: (
    <g>
      <Chao rx={46} />
      <g transform="rotate(-8 60 68)">
        <rect x="10" y="60" width="100" height="18" rx="5" fill="#A0693A" /><rect x="10" y="60" width="100" height="7" rx="4" fill="#C08452" />
        <rect x="30" y="46" width="18" height="46" rx="5" fill="#8A5A2E" /><rect x="30" y="46" width="7" height="46" rx="4" fill="#A0693A" />
        <path d="M60 64v10M78 66v8" stroke="#6E4622" strokeWidth="2" strokeLinecap="round" />
      </g>
    </g>
  ) },
  pregos: { nome: 'Os pregos', d: (
    <g>
      <Chao rx={40} />
      {[[-24, 34], [8, 62], [36, 86]].map(([r, x], i) => (
        <g key={i} transform={`rotate(${r} ${x} 66)`}>
          <path d={`M${x - 3} 44h6v34l-3 8-3-8Z`} fill="#7C8794" /><path d={`M${x - 3} 44h3v40l-3-6Z`} fill="#A3AEBA" />
          <rect x={x - 8} y="40" width="16" height="6" rx="3" fill="#56616D" />
        </g>
      ))}
    </g>
  ) },
  chaves: { nome: 'Chaves de São Pedro', d: (
    <g>
      <Chao rx={42} />
      <g stroke="#E3B23C" strokeWidth="7" fill="none" strokeLinecap="round"><circle cx="30" cy="48" r="11" /><path d="M38 56 92 82M80 76l-6 9M88 80l-6 9" /></g>
      <g stroke="#B9C3CC" strokeWidth="7" fill="none" strokeLinecap="round"><circle cx="90" cy="48" r="11" /><path d="M82 56 28 82M40 76l6 9M32 80l6 9" /></g>
      <circle cx="60" cy="69" r="5" fill="#FFF3B8" />
    </g>
  ) },
  calice: { nome: 'Cálice', d: (
    <g>
      <Chao rx={30} />
      <circle cx="60" cy="26" r="13" fill="#FFF8E6" /><path d="M60 18v16M53 25h14" stroke="#E3B23C" strokeWidth="2.5" />
      <path d="M36 40h48q0 26-24 28-24-2-24-28Z" fill="#E3B23C" /><path d="M36 40h24v28q-24-2-24-28Z" fill="#F7D673" />
      <rect x="55" y="66" width="10" height="12" fill="#C98A12" />
      <path d="M42 84q18-10 36 0Z" fill="#E3B23C" />
      <Brilho d="M42 46q2 10 8 15" />
    </g>
  ) },
  lirio: { nome: 'Lírio de São José', d: (
    <g>
      <Chao rx={42} />
      <path d="M14 80Q56 70 98 50" stroke="#5E9B3A" strokeWidth="5" fill="none" strokeLinecap="round" />
      <path d="M44 74q-6-14 6-20 4 12-6 20ZM66 64q2-14 15-14-1 12-15 14Z" fill="#7FB83A" />
      <g transform="translate(98 48) rotate(-25)">
        {[0, 72, 144, 216, 288].map(r => <path key={r} transform={`rotate(${r})`} d="M0 0q-6-12 0-20 6 8 0 20Z" fill="#fff" />)}
        <circle r="4" fill="#E3B23C" />
      </g>
    </g>
  ) },
  pomba: { nome: 'Pomba do Espírito Santo', d: (
    <g>
      <Chao rx={34} />
      <path d="M26 66q10-22 36-16l22-12-8 18q14 14-12 24-28 6-38-14Z" fill="#fff" />
      <path d="M50 56q-14-24 8-34 4 22-8 34Z" fill="#E3ECF5" />
      <circle cx="74" cy="52" r="2.8" fill="#1E2A36" /><path d="M84 48l8-2-6 6Z" fill="#E89A2A" />
      <path d="M40 80l-6 8M48 82l-2 8" stroke="#E89A2A" strokeWidth="3" strokeLinecap="round" />
    </g>
  ) },
  biblia: { nome: 'Bíblia', d: (
    <g>
      <Chao rx={44} />
      <path d="M16 56l44-14 44 14-44 16Z" fill="#8E1F35" />
      <path d="M16 56v12l44 16V72Z" fill="#B3263E" /><path d="M104 56v12L60 84V72Z" fill="#6E1828" />
      <path d="M22 60l38 12 38-12" stroke="#F4EEDF" strokeWidth="3" fill="none" />
      <path d="M57 52l6-2 1 6 6-2-2 4-5 2 1 6-4 1-1-6-6 2 2-4 4-1Z" fill="#E3B23C" />
      <path d="M78 74q4 10 0 18" stroke="#E3B23C" strokeWidth="3.5" fill="none" strokeLinecap="round" />
    </g>
  ) },
  vela: { nome: 'Vela', d: (
    <g>
      <Chao rx={26} />
      <rect x="48" y="40" width="24" height="46" rx="5" fill="#F4EEDF" /><rect x="48" y="40" width="9" height="46" rx="4" fill="#fff" />
      <path d="M48 52q6 6 0 12M72 48q-6 8 0 14" stroke="#E3D7BF" strokeWidth="3" fill="none" />
      <path d="M60 40v-6" stroke="#3A2E28" strokeWidth="2.5" />
      <g className="chama"><path d="M60 8q12 14 0 26Q48 22 60 8Z" fill="#FF9600" /><path d="M60 16q6 8 0 14-6-6 0-14Z" fill="#FFE066" /></g>
    </g>
  ) },
}

// ordem do caminho: Paulo, Maria, Paixão (espinhos, cruz, pregos), Pedro, Eucaristia, José, Espírito, Palavra, Luz
export const ORDEM_OBJETOS = ['espada', 'terco', 'espinhos', 'cruz', 'pregos', 'chaves', 'calice', 'lirio', 'pomba', 'biblia', 'vela']

export default function Objeto({ id, size = 100, className = '' }) {
  const o = OBJ[id] || OBJ.cruz
  return (
    <svg viewBox="-12 0 136 100" width={size} height={(size * 100) / 136} className={className} role="img" aria-label={o.nome}>
      {o.d}
    </svg>
  )
}
export const nomeObjeto = id => OBJ[id]?.nome
