from PIL import Image

img = Image.open("icon.png")
sizes = [(16, 16), (32, 32), (48, 48), (64, 64), (128, 128), (256, 256)]
img.save("icoz.ico", format="ICO", sizes=sizes)
print("icoz.ico created with sizes:", sizes)
