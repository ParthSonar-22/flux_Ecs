import cv2
import numpy as np
import re

# Load original logo
im = cv2.imread('public/logo-flux.png', cv2.IMREAD_GRAYSCALE)

# Crop the emblem (y: 100 to 695, x: 90 to 935)
emblem = im[100:695, 90:935]
h, w = emblem.shape

# Threshold cleanly
_, thresh = cv2.threshold(emblem, 120, 255, cv2.THRESH_BINARY)

# Find contours with tree hierarchy
contours, hierarchy = cv2.findContours(thresh, cv2.RETR_TREE, cv2.CHAIN_APPROX_TC89_KCOS)

def contour_to_svg_d(cnt):
    pts = cnt.reshape(-1, 2)
    if len(pts) < 3:
        return ''
    d = f"M {pts[0][0]} {pts[0][1]}"
    for x, y in pts[1:]:
        d += f" L {x} {y}"
    d += " Z"
    return d

path_d_list = []
for cnt in contours:
    if cv2.contourArea(cnt) > 4:
        d = contour_to_svg_d(cnt)
        if d:
            path_d_list.append(d)

full_d = " ".join(path_d_list)

# Generate public/logo-emblem.svg
svg_content = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {w} {h}" fill="currentColor" fill-rule="evenodd" aria-hidden="true">
  <path d="{full_d}" />
</svg>'''

with open('public/logo-emblem.svg', 'w') as f:
    f.write(svg_content)

# Generate components/Logo.js React component
logo_component = f'''export default function Logo({{ className = 'w-full h-full text-ink', ...props }}) {{
  return (
    <svg
      viewBox="0 0 {w} {h}"
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
'''

with open('components/Logo.js', 'w') as f:
    f.write(logo_component)

# Generate transparent PNGs
rgba_ink = np.zeros((h, w, 4), dtype=np.uint8)
rgba_ink[:, :, 0] = 27
rgba_ink[:, :, 1] = 24
rgba_ink[:, :, 2] = 24
rgba_ink[:, :, 3] = thresh
cv2.imwrite('public/logo-emblem-ink.png', rgba_ink)

# Also update logo-mark.png to be a clean transparent PNG with padding
# Make it square with transparent background
pad_size = max(w, h) + 40
square_canvas = np.zeros((pad_size, pad_size, 4), dtype=np.uint8)
off_x = (pad_size - w) // 2
off_y = (pad_size - h) // 2
square_canvas[off_y:off_y+h, off_x:off_x+w] = rgba_ink
cv2.imwrite('public/logo-mark.png', square_canvas)

print('Generated public/logo-emblem.svg, components/Logo.js, and transparent public/logo-mark.png!')
