# Recorta o fundo das artes originais e gera public/personagens/<id>.webp e <id>-busto.webp
import sys
from pathlib import Path
from PIL import Image, ImageDraw, ImageFilter

AQUI = Path(__file__).parent
SAIDA = AQUI.parent / 'public' / 'personagens'
# id: (arquivo, recorte da figura, áreas de texto/botões a apagar, recorte do busto)
ARTES = {
    'carlo':     ('eb6eb0cf-image.jpg', (100, 120, 1164, 1760), [], (360, 130, 780, 590)),
    'agostinho': ('d4102e0d-image.jpg', (200, 40, 1100, 1682), [], (420, 30, 830, 500)),
    'pedro':     ('e8b4804e-image.jpg', (30, 150, 800, 1742), [], (170, 160, 540, 580)),
    'maria':     ('4daa6a5c-image.jpg', (250, 130, 935, 2050), [(868, 540, 935, 890)], (330, 130, 900, 820)),
    'jose':      ('5bb66c05-image.jpg', (260, 110, 920, 2000), [(868, 530, 920, 880)], (370, 110, 890, 820)),
    'jesus':     ('15a0266b-image.jpg', (30, 40, 410, 740), [(322, 210, 410, 318)], (120, 40, 340, 330)),
}
CHAVE = (255, 0, 255)
LIMITE = 18  # baixo: a pele clara fica perto do fundo cinza

def sem_fundo(im, apagar):
    im = im.convert('RGB')
    fundo = im.getpixel((3, 3))
    d = ImageDraw.Draw(im)
    for r in apagar:
        d.rectangle(r, fill=fundo)
    w, h = im.size
    sementes = [(x, y) for x in (0, w // 4, w // 2, 3 * w // 4, w - 1) for y in (0, h - 1)] + [(0, y) for y in range(0, h, 40)] + [(w - 1, y) for y in range(0, h, 40)]
    for s in sementes:
        if im.getpixel(s) != CHAVE:
            ImageDraw.floodfill(im, s, CHAVE, thresh=LIMITE)
    rgba = im.convert('RGBA')
    px = rgba.load()
    for y in range(h):
        for x in range(w):
            r, g, b, _ = px[x, y]
            perto = abs(r - fundo[0]) + abs(g - fundo[1]) + abs(b - fundo[2]) < 24  # bolsões fechados (entre pernas, braço e cajado)
            if (r, g, b) == CHAVE or perto:
                px[x, y] = (0, 0, 0, 0)
    a = rgba.getchannel('A').filter(ImageFilter.MinFilter(3)).filter(ImageFilter.GaussianBlur(0.8))  # borda limpa
    rgba.putalpha(a)
    return rgba.crop(rgba.getbbox())

def salvar(im, nome, altura):
    if im.height > altura:
        im = im.resize((round(im.width * altura / im.height), altura), Image.LANCZOS)
    im.save(SAIDA / nome, 'WEBP', quality=88, method=6)
    return im.size

SAIDA.mkdir(parents=True, exist_ok=True)
for id, (arq, caixa, apagar, busto) in ARTES.items():
    orig = Image.open(AQUI / arq)
    ajuste = [(r[0] - caixa[0], r[1] - caixa[1], r[2] - caixa[0], r[3] - caixa[1]) for r in apagar]
    figura = sem_fundo(orig.crop(caixa), ajuste)
    print(id, 'figura', salvar(figura, f'{id}.webp', 900))
    ab = [(r[0] - busto[0], r[1] - busto[1], r[2] - busto[0], r[3] - busto[1]) for r in apagar]
    print(id, 'busto', salvar(sem_fundo(orig.crop(busto), ab), f'{id}-busto.webp', 360))
