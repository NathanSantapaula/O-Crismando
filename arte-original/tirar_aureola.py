# Remove a auréola (anel e raios). Fora da figura vira transparente; onde ela passava
# por cima do véu ou dentro da coroa, preenche com a cor vizinha.
import json
from collections import deque
from pathlib import Path
from PIL import Image, ImageFilter

PASTA = Path(__file__).parent.parent / 'public' / 'personagens'
ARQ = Path(__file__).parent.parent / 'src' / 'components' / 'rig.json'
RIG = json.load(open(ARQ))
COR = {'jesus': (238, 243, 248), 'maria': (243, 226, 181), 'jose': (243, 226, 181)}

for id, alvo in COR.items():
    im = Image.open(PASTA / f'{id}.webp').convert('RGBA'); w, h = im.size; px = im.load()
    parecido = lambda p, t=30: p[3] > 40 and all(abs(p[i] - alvo[i]) < t for i in range(3))
    olhos = [(x0 - 6, y0 - 6, x1 + 6, y1 + 6) for x0, y0, x1, y1 in RIG[id]['olhos']]
    limite = int(RIG[id]['pescoco'] * 0.92)
    vis, halo = set(), set()
    for y in range(limite):
        for x in range(w):
            if (x, y) in vis or not parecido(px[x, y]): continue
            q = deque([(x, y)]); vis.add((x, y)); comp = []
            while q:
                cx, cy = q.popleft(); comp.append((cx, cy))
                for n in ((cx + 1, cy), (cx - 1, cy), (cx, cy + 1), (cx, cy - 1)):
                    if 0 <= n[0] < w and 0 <= n[1] < limite and n not in vis and parecido(px[n]): vis.add(n); q.append(n)
            x0, y0 = comp[0]
            if len(comp) > 8 and not any(a <= x0 <= c and b <= y0 <= d for a, b, c, d in olhos): halo.update(comp)
    m = Image.new('L', (w, h), 0); mp = m.load()
    for x, y in halo: mp[x, y] = 255
    larga = m.filter(ImageFilter.MaxFilter(7)).load()
    fora = lambda x, y: px[x, y][3] < 40
    def vizinho(x, y, passo):
        for k in range(1, 30):
            nx = x + k * passo
            if not (0 <= nx < w): return None
            if not larga[nx, y]: return None if fora(nx, y) else px[nx, y]
        return None
    novo = im.copy(); np_ = novo.load()
    for y in range(limite):
        for x in range(w):
            if not larga[x, y]: continue
            e, d = vizinho(x, y, -1), vizinho(x, y, 1)
            if e and d:  # dentro da figura: tapa o buraco com a cor da esquerda
                if parecido(px[x, y], 60) or px[x, y][3] < 200: np_[x, y] = e
            elif mp[x, y] or parecido(px[x, y], 70) or px[x, y][3] < 250 or sum(px[x, y][:3]) / 3 < 110:
                np_[x, y] = (0, 0, 0, 0)
    novo = novo.crop((0, 0, w, h))
    RIG[id]['topo'] = novo.getbbox()[1]
    novo.save(PASTA / f'{id}.webp', 'WEBP', quality=88, method=6)
    print(id, 'auréola', len(halo), 'topo', RIG[id]['topo'])
json.dump(RIG, open(ARQ, 'w'), indent=1)

# restos dos botões da tela original no topo da arte do Jesus
im = Image.open(PASTA / 'jesus.webp').convert('RGBA'); a = im.getchannel('A'); al = a.load()
for y in range(int(im.height * 0.1)):
    for x in range(im.width): al[x, y] = 0
im.putalpha(a); im.save(PASTA / 'jesus.webp', 'WEBP', quality=88, method=6)
