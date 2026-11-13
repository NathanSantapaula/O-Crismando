# Mede olhos, pele, boca e pescoço de cada arte recortada e grava src/components/rig.json
import json
from collections import deque
from pathlib import Path
from PIL import Image

PASTA = Path(__file__).parent.parent / 'public' / 'personagens'
SAIDA = Path(__file__).parent.parent / 'src' / 'components' / 'rig.json'
BOCA = {'jesus': 1.15, 'maria': .85, 'jose': .9, 'pedro': .95, 'agostinho': .95, 'carlo': .72}
PESC = {'jesus': 2.4, 'maria': 2.06, 'jose': 2.2, 'pedro': 2.3, 'agostinho': 2.3, 'carlo': 1.25}
CARLO = [[226, 158, 256, 184], [302, 158, 334, 184]]  # atrás dos óculos: medido na grade

def olhos_brancos(im):
    w, h = im.size; px = im.load(); top = int(h * .4); vis = set(); blobs = []
    ok = lambda p: p[3] > 200 and min(p[:3]) > 232
    for y in range(top):
        for x in range(w):
            if (x, y) in vis or not ok(px[x, y]): continue
            q = deque([(x, y)]); vis.add((x, y)); pts = []
            while q:
                cx, cy = q.popleft(); pts.append((cx, cy))
                for n in ((cx + 1, cy), (cx - 1, cy), (cx, cy + 1), (cx, cy - 1)):
                    if 0 <= n[0] < w and 0 <= n[1] < top and n not in vis and ok(px[n]): vis.add(n); q.append(n)
            if len(pts) > 60:
                xs = [p[0] for p in pts]; ys = [p[1] for p in pts]
                if max(xs) - min(xs) < w * .15: blobs.append((len(pts), min(xs), min(ys), max(xs), max(ys)))
    blobs.sort(reverse=True); e1 = blobs[0]
    e2 = next(b for b in blobs[1:] if abs((b[2] + b[4]) - (e1[2] + e1[4])) < 30 and abs((b[1] + b[3]) - (e1[1] + e1[3])) > 30)
    return [list(o[1:]) for o in sorted([e1, e2], key=lambda o: o[1])]

rig = {}
for id in BOCA:
    im = Image.open(PASTA / f'{id}.png').convert('RGBA'); w, h = im.size
    olhos = CARLO if id == 'carlo' else olhos_brancos(im)
    (a, b), (c, e) = [((x0 + x1) / 2, (y0 + y1) / 2) for x0, y0, x1, y1 in olhos]
    cx, cy, dist = (a + c) / 2, (b + e) / 2, c - a
    rgb = im.convert('RGB'); pele = []
    for x0, y0, x1, y1 in olhos:
        yy = y1 + (18 if id == 'carlo' else 6)
        cores = sorted(rgb.getpixel((x, yy)) for x in range(int(x0 + (x1 - x0) * .3), int(x1 - (x1 - x0) * .3)))
        pele.append('#%02x%02x%02x' % cores[len(cores) // 2])
    rig[id] = {'w': w, 'h': h, 'topo': im.getbbox()[1], 'olhos': olhos, 'pele': pele, 'cx': round(cx, 1), 'dist': round(dist, 1),
               'boca': [round(cx, 1), round(cy + BOCA[id] * dist, 1), round(dist * .42, 1)], 'pescoco': round(cy + PESC[id] * dist)}
    print(id, rig[id]['w'], rig[id]['h'], olhos)
json.dump(rig, open(SAIDA, 'w'), indent=1)
