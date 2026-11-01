"""Run with Blender --background --disable-autoexec <source.blend> --python this_file."""
import bpy,json,hashlib
from pathlib import Path
from mathutils import Vector
root=Path.cwd()
objects=[]
for obj in bpy.data.objects:
 item={'name':obj.name,'type':obj.type,'location':list(obj.location),'dimensions':list(obj.dimensions),'parent':obj.parent.name if obj.parent else None,'modifiers':[{'name':m.name,'type':m.type} for m in obj.modifiers],'materials':[m.name if m else None for m in obj.data.materials] if obj.type=='MESH' else []}
 if obj.type=='MESH':
  mesh=obj.data;mesh.calc_loop_triangles();item.update(vertices=len(mesh.vertices),polygons=len(mesh.polygons),triangles=len(mesh.loop_triangles),world_bounds=[list(obj.matrix_world@Vector(c)) for c in obj.bound_box])
 objects.append(item)
materials=[]
for mat in bpy.data.materials:
 materials.append({'name':mat.name,'diffuse':list(mat.diffuse_color),'use_nodes':mat.use_nodes,'nodes':[{'type':n.type,'name':n.name,'image':n.image.filepath if n.type=='TEX_IMAGE' and n.image else None} for n in mat.node_tree.nodes] if mat.use_nodes else []})
source=root/'assets/engineering-lab/source/f1_car.blend'
report={'source':str(source.relative_to(root)),'sha256':hashlib.sha256(source.read_bytes()).hexdigest(),'bytes':source.stat().st_size,'blender_version':bpy.app.version_string,'objects':objects,'materials':materials,'images':[{'name':i.name,'path':i.filepath,'packed':bool(i.packed_file)} for i in bpy.data.images],'actions':[{'name':a.name,'channels':len(a.fcurves)} for a in bpy.data.actions],'totals':{'meshes':sum(o['type']=='MESH' for o in objects),'vertices':sum(o.get('vertices',0) for o in objects),'triangles':sum(o.get('triangles',0) for o in objects)}}
(root/'docs/engineering-lab/opengameart-inspection.json').write_text(json.dumps(report,indent=2))
print(json.dumps({'totals':report['totals'],'materials':[m['name'] for m in materials],'images':report['images'],'mesh_objects':[(o['name'],o.get('triangles'),o['dimensions']) for o in objects if o['type']=='MESH']},indent=2))
