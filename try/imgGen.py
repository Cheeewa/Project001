import sys
#from PIL import ImageDraw, Image
import PIL
import numpy as np

#This function receive as arguments the picture mode and the number of pseudo pixel

"""
Mode:
1 = (1-bit pixels, black and white, stored with one pixel per byte)
L = (8-bit pixels, black and white)
P = (8-bit pixels, mapped to any other mode using a color palette)
RGB (3x8-bit pixels, true color)

"""

def createImage(mode='1', pixel='5'):
    interval = pixel/512
    color = 1 if mode=='1' else 255
    PIL.Image.new(mode, 512, color=1)