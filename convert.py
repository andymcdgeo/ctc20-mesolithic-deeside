import csv, json
from OSGridConverter import grid2latlong

colours = {'core': '#FF0000',
           'chip': '#FFFFFF',
           'flake': '#D3D3D3',
           'burnt': '#A9A9A9',
           'quartz': '#FF4500',
           'blade': '#4B0082', 
           'chunk': '#8B0000',
           'pebble': '#008080',
           'burrin': '#FFE4E1',
           'stone': '#000000',
           'stones': '#000000',
           'scraper': '#DAA520',
           'point': '#D2691E'}
def_colour = '#00FF00'
data = []
lats = []
lngs = []

with open('CTC20-MesoDeeside - 2017.csv') as f:
    reader = csv.reader(f)
    for row in reader:
        if row[0] == 'ID':
            continue
        gridref = '{}, {}'.format(row[1], row[2])
        # print(gridref)
        try:
            l = grid2latlong(gridref, tag='OSGB36')
        except:
            print("Can't convert to lat long: ", row)
            continue
        t = row[ord('l')-ord('a')].lower()
        if t in colours.keys():
            c = colours[t]
        else:
            c = def_colour
        data.append({'lat':l.latitude,
                     'lon':l.longitude,
                     'type':row[ord('l')-ord('a')],
                     'subType':row[ord('m')-ord('a')],
                     'classification':row[ord('n')-ord('a')],
                     'description':row[ord('o')-ord('a')],
                     'photo':row[ord('u')-ord('a')],
                     'colour':c,
                     })
        lats.append(l.latitude)
        lngs.append(l.longitude)

with open('data.json', 'w') as f:
    json.dump(data, f, indent=1)

print("centre: ", sum(lats)/len(lats), ", ", sum(lngs)/len(lngs))
