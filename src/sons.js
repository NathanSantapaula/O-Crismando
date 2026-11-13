// Efeitos sonoros e vibração do Fidelingo, sintetizados na hora (Web Audio), sem arquivos.
// Sons originais: notas curtas e redondas, no clima de app de jogo leve.

let ctx = null
const audio = () => {
  if (!ctx) { const A = window.AudioContext || window.webkitAudioContext; if (!A) return null; ctx = new A() }
  if (ctx.state === 'suspended') ctx.resume()
  return ctx
}
export const somLigado = () => { try { return localStorage.getItem('som') !== 'off' } catch { return true } }
export const alternarSom = () => { try { localStorage.setItem('som', somLigado() ? 'off' : 'on') } catch {} return somLigado() }

// uma nota: frequência, início (s), duração (s), timbre, volume
function nota(f, t0, dur, tipo = 'sine', vol = 0.18, deslize = 0) {
  const c = audio(); if (!c) return
  const t = c.currentTime + t0
  const o = c.createOscillator(), g = c.createGain()
  o.type = tipo; o.frequency.setValueAtTime(f, t)
  if (deslize) o.frequency.exponentialRampToValueAtTime(f * deslize, t + dur)
  g.gain.setValueAtTime(0.0001, t)
  g.gain.exponentialRampToValueAtTime(vol, t + 0.012)
  g.gain.exponentialRampToValueAtTime(0.0001, t + dur)
  o.connect(g).connect(c.destination); o.start(t); o.stop(t + dur + 0.02)
}
// brilho: a mesma nota uma oitava acima, bem baixinho, dá o timbre de "sininho"
const sino = (f, t0, dur, vol = 0.16) => { nota(f, t0, dur, 'triangle', vol); nota(f * 2, t0, dur * 0.7, 'sine', vol * 0.35) }

const vibrar = p => { try { navigator.vibrate?.(p) } catch {} }

const SONS = {
  toque: () => { nota(660, 0, 0.06, 'triangle', 0.08); vibrar(8) },
  selecionar: () => { nota(520, 0, 0.07, 'triangle', 0.1); vibrar(10) },
  certo: () => { sino(784, 0, 0.16); sino(1175, 0.09, 0.3); vibrar([18, 40, 18]) },
  errado: () => { nota(220, 0, 0.22, 'square', 0.06, 0.8); nota(165, 0.12, 0.3, 'square', 0.05, 0.85); vibrar([60, 50, 90]) },
  concluir: () => { [523, 659, 784, 1047].forEach((f, i) => sino(f, i * 0.11, 0.35, 0.15)); sino(1319, 0.48, 0.6, 0.13); vibrar([20, 60, 20, 60, 40]) },
  bau: () => { nota(300, 0, 0.12, 'triangle', 0.12, 1.6); [880, 1109, 1319, 1760].forEach((f, i) => sino(f, 0.14 + i * 0.07, 0.3, 0.11)); vibrar([30, 40, 60]) },
  presenca: () => { sino(659, 0, 0.18); sino(988, 0.12, 0.35); vibrar([20, 50, 30]) },
  ofensiva: () => { nota(180, 0, 0.5, 'sawtooth', 0.04, 3.2); [784, 988, 1175].forEach((f, i) => sino(f, 0.35 + i * 0.1, 0.4, 0.14)); vibrar([15, 30, 15, 30, 60]) },
  trofeu: () => { [659, 784, 988, 1319].forEach((f, i) => sino(f, i * 0.09, 0.3, 0.14)); [1319, 1568].forEach((f, i) => sino(f, 0.45 + i * 0.12, 0.6, 0.12)); vibrar([25, 40, 25, 40, 80]) },
  semVidas: () => { [392, 330, 262].forEach((f, i) => nota(f, i * 0.16, 0.3, 'triangle', 0.12)); vibrar([80, 60, 120]) },
}

export function som(nome) {
  if (!somLigado()) return
  try { SONS[nome]?.() } catch {}
}
