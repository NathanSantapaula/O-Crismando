# Reduz o peso das artes (paleta de 256 cores com transparência; desenho chapado não perde nada visível)
from pathlib import Path
from PIL import Image
PASTA = Path(__file__).parent.parent / 'public' / 'personagens'
for f in sorted(PASTA.glob('*.png')):
    antes = f.stat().st_size
    im = Image.open(f).convert('RGBA')
    im.quantize(256, method=Image.Quantize.FASTOCTREE, dither=Image.Dither.NONE).save(f, optimize=True)
    print(f.name, antes // 1024, '->', f.stat().st_size // 1024, 'KB')
