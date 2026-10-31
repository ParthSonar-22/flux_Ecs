import cv2
import numpy as np

# Load original logo
im = cv2.imread('public/logo-flux.png', cv2.IMREAD_GRAYSCALE)

# Crop from y=100 to y=875 (emblem + FLUXECS wordmark)
full_crop = im[100:875, 90:935]
_, full_thresh = cv2.threshold(full_crop, 100, 255, cv2.THRESH_BINARY)

# Dilate the text part slightly to make it even bolder!
kernel = cv2.getStructuringElement(cv2.MORPH_RECT, (3, 3))
full_thresh[610:, :] = cv2.dilate(full_thresh[610:, :], kernel, iterations=1)

fh, fw = full_thresh.shape

def get_svg_d(thresh_img):
    contours, hierarchy = cv2.findContours(thresh_img, cv2.RETR_TREE, cv2.CHAIN_APPROX_TC89_KCOS)
    d_list = []
    for cnt in contours:
        if cv2.contourArea(cnt) > 4:
            pts = cnt.reshape(-1, 2)
            if len(pts) >= 3:
                d = f"M {pts[0][0]} {pts[0][1]}"
                for x, y in pts[1:]:
                    d += f" L {x} {y}"
                d += " Z"
                d_list.append(d)
    return " ".join(d_list)

# 1. Full Lockup (Emblem + Bolder FLUXECS text)
full_d = get_svg_d(full_thresh)
with open('public/logo-full.svg', 'w') as f:
    f.write(f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {fw} {fh}" fill="currentColor" fill-rule="evenodd" aria-hidden="true">
  <path d="{full_d}" />
</svg>''')

with open('components/LogoFull.js', 'w') as f:
    f.write(f'''export default function LogoFull({{ className = 'w-full h-full text-ink', ...props }}) {{
  return (
    <svg
      viewBox="0 0 {fw} {fh}"
      fill="currentColor"
      fillRule="evenodd"
      aria-hidden="true"
      className={{className}}
      {{...props}}
    >
      <path d="{full_d}" />
    </svg>
  )
}}
''')

# 2. Wordmark only (Bolder FLUXECS text)
wm_crop = full_thresh[610:775, :]
nz = cv2.findNonZero(wm_crop)
wx, wy, ww, wh = cv2.boundingRect(nz)
px, py = max(0, wx - 10), max(0, wy - 5)
letters = wm_crop[py:min(wm_crop.shape[0], py+wh+10), px:min(wm_crop.shape[1], px+ww+20)]
lh, lw = letters.shape

wm_d = get_svg_d(letters)

with open('public/logo-wordmark.svg', 'w') as f:
    f.write(f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {lw} {lh}" fill="currentColor" fill-rule="evenodd" aria-hidden="true">
  <path d="{wm_d}" />
</svg>''')

with open('components/LogoWordmark.js', 'w') as f:
    f.write(f'''export default function LogoWordmark({{ className = 'h-full w-auto text-ink', ...props }}) {{
  return (
    <svg
      viewBox="0 0 {lw} {lh}"
      fill="currentColor"
      fillRule="evenodd"
      aria-hidden="true"
      className={{className}}
      {{...props}}
    >
      <path d="{wm_d}" />
    </svg>
  )
}}
''')

print(f'Generated LogoFull ({fw}x{fh}) and LogoWordmark ({lw}x{lh}) successfully!')
