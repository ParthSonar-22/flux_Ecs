import cv2
import numpy as np
from PIL import Image

# Load original logo
im = cv2.imread('public/logo-flux.png', cv2.IMREAD_GRAYSCALE)

# Crop from y=100 to y=875 (emblem + FLUXECS wordmark)
full_crop = im[100:875, 90:935]
_, thresh = cv2.threshold(full_crop, 100, 255, cv2.THRESH_BINARY)

# Dilate text part slightly for boldness
kernel = cv2.getStructuringElement(cv2.MORPH_RECT, (3, 3))
thresh[610:, :] = cv2.dilate(thresh[610:, :], kernel, iterations=1)

h, w = thresh.shape

# Create RGBA ink image
rgba_ink = np.zeros((h, w, 4), dtype=np.uint8)
rgba_ink[:, :, 0] = 24
rgba_ink[:, :, 1] = 24
rgba_ink[:, :, 2] = 27
rgba_ink[:, :, 3] = thresh

# Make square canvas with padding
pad_w = 40
size = w + pad_w * 2
pad_h = (size - h) // 2
canvas = np.zeros((size, size, 4), dtype=np.uint8)
canvas[pad_h:pad_h+h, pad_w:pad_w+w] = rgba_ink

cv2.imwrite('public/logo-full-ink.png', canvas)

pil_img = Image.fromarray(canvas)
pil_img.save('app/favicon.ico', format='ICO', sizes=[(16,16), (32,32), (48,48), (64,64)])
pil_img.save('public/favicon.ico', format='ICO', sizes=[(16,16), (32,32), (48,48), (64,64)])
pil_img.resize((32, 32), Image.Resampling.LANCZOS).save('app/icon.png')
pil_img.resize((180, 180), Image.Resampling.LANCZOS).save('app/apple-icon.png')
pil_img.resize((192, 192), Image.Resampling.LANCZOS).save('public/icon-192.png')

print('Favicons and app icons updated with full lockup!')
