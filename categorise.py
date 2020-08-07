types = """Blade
Regular flake
Flake fragment
Retouched blade
Irregular flake
Core
Chunk
Retouched flake
Small flake
Blade fragment
Spall
Pebble fragment
Microlith
Flaked pebble
Utilised blade
Chip
clay pipe fragment
Utilised chunk
Fragment of cannel coal?
Utilised flake
Natural pebble
Pebble
Retouched core
Unused pebble
Natural chunk
Natural fragment
Natural chip
Hammerstone
chunk
Lump
Natural
Split cobble
Flaked hammerstone
Nodule
Natural spall
Flake
Retouched pebble
Probable natural cobble chunk
stone
Natural chunk?
Chunks
quartz pebble chunk
sandstone spall
SS pebble""".splitlines()

def categorise(t):
    t = t.lower()
    for n in ["natural", "ss", "sandstone", "lump"]:
        if n in t.lower():
            return "natural"
    for c in ["chunk", "chip", "spall"]:
        if c in t.lower():
            return "chunk"
    if "retouched" in t.lower():
        return "retouched"
    if "blade" in t.lower():
        return "blade"
    if "flake" in t.lower():
        return "flake"
    for c in ["core", "nodule", "pebble"]:
        if c in t.lower():
            return "core"
    return "other"

for t in types:
    print("{} -> {}".format(t, categorise(t)))
