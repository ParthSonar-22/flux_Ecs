"""Prepare the inspected CC0 mesh for a Spline import and render its static fallback.
Run Blender with --background --factory-startup --disable-autoexec source.blend --python this_file.
No downloaded scripts or original animation drivers are executed.
"""
import bpy, math,json
from pathlib import Path
from mathutils import Vector
from bpy_extras.object_utils import world_to_camera_view
root=Path.cwd(); output=root/'assets/engineering-lab'; public=root/'public/engineering-lab'
public.mkdir(parents=True,exist_ok=True)
source=bpy.data.objects['f1']; mesh=source.data.copy()
# Static rest mesh. Remove the original rig and all authored animation actions.
for obj in list(bpy.data.objects):bpy.data.objects.remove(obj,do_unlink=True)
for action in list(bpy.data.actions):bpy.data.actions.remove(action)
car=bpy.data.objects.new('FLUX_CAR',mesh);bpy.context.collection.objects.link(car)
mins=Vector(tuple(min(v.co[i] for v in mesh.vertices) for i in range(3)))
maxs=Vector(tuple(max(v.co[i] for v in mesh.vertices) for i in range(3)))
center=(mins+maxs)/2; factor=6/(maxs.x-mins.x)
for v in mesh.vertices:v.co=Vector(((v.co.x-center.x)*factor,(v.co.y-center.y)*factor,(v.co.z-mins.z)*factor))
print('MODEL BOUNDS',list(mins),list(maxs),'SCALE',factor)
def srgb(v):return v/12.92 if v<.04045 else ((v+.055)/1.055)**2.4
def material(name,hexcode,metal,rough):
 mat=bpy.data.materials.new(name);mat.use_nodes=True
 color=tuple(srgb(int(hexcode[i:i+2],16)/255) for i in (0,2,4))+(1,)
 node=mat.node_tree.nodes.get('Principled BSDF');node.inputs['Base Color'].default_value=color;node.inputs['Metallic'].default_value=metal;node.inputs['Roughness'].default_value=rough;mat.diffuse_color=color
 return mat
carbon=material('FLUX_Carbon','232932',.55,.32)
titanium=material('FLUX_Titanium','626b74',.7,.32)
orange=material('FLUX_VelocityOrange','ff603b',.28,.31)
tires=material('FLUX_Tires','13161a',.05,.68)
mapping={'Red':carbon,'White':orange,'Black':titanium,'Tires':tires}
old_names=[m.name for m in mesh.materials]
for i,name in enumerate(old_names):mesh.materials[i]=mapping[name]
# A small original body mark, with no third-party team or manufacturer logo.
curve=bpy.data.curves.new('FLUX_BrandMark','FONT');curve.body='FLUX';curve.align_x='CENTER';curve.size=.26;curve.extrude=.0004
brand=bpy.data.objects.new('FLUX_BrandMark',curve);bpy.context.collection.objects.link(brand);bpy.context.view_layer.update()
hit,location,normal,_=car.ray_cast(Vector((1.2,0,3)),Vector((0,0,-1)))
brand.location=location+normal*.006 if hit else Vector((1.2,0,.5))
brand.rotation_euler=normal.to_track_quat('Z','Y').to_euler() if hit else (0,0,0)
curve.align_y='CENTER';curve.size=.19;curve.materials.append(orange)
# Grounding and a studio lighting setup. These are not baked textures.
floor=material('Studio_Floor','080a0e',0,.85)
bpy.ops.mesh.primitive_plane_add(size=200,location=(0,0,-.012));plane=bpy.context.object;plane.name='Studio_Floor';plane.data.materials.append(floor)
world=bpy.context.scene.world or bpy.data.worlds.new('FLUX_Studio');bpy.context.scene.world=world;world.use_nodes=True;world.node_tree.nodes['Background'].inputs[0].default_value=(.08,.095,.12,1);world.node_tree.nodes['Background'].inputs[1].default_value=.45
def area(name,location,power,color,size):
 data=bpy.data.lights.new(name,'AREA');data.energy=power;data.color=color;data.shape='DISK';data.size=size
 obj=bpy.data.objects.new(name,data);bpy.context.collection.objects.link(obj);obj.location=location;obj.rotation_euler=(Vector((0,0,.4))-obj.location).to_track_quat('-Z','Y').to_euler()
area('Studio_Key',(1,-3.5,6),850,(.94,.97,1),5)
area('Studio_Fill',(-4,-1,3.5),600,(.7,.8,1),4)
area('Studio_Rim',(0,4.5,5),1100,(1,.82,.68),4)
camdata=bpy.data.cameras.new('Lab_Camera');camera=bpy.data.objects.new('Lab_Camera',camdata);bpy.context.collection.objects.link(camera);camera.location=(7.5,-6.5,4.7);camera.rotation_euler=(Vector((0,0,.5))-camera.location).to_track_quat('-Z','Y').to_euler();camdata.type='ORTHO';camdata.ortho_scale=8.25;bpy.context.scene.camera=camera
scene=bpy.context.scene;scene.render.engine='CYCLES';scene.cycles.samples=32;scene.cycles.use_denoising=True
scene.render.resolution_x=1440;scene.render.resolution_y=1000;scene.render.resolution_percentage=100
scene.view_settings.view_transform='Filmic';scene.view_settings.look='Medium High Contrast';scene.view_settings.exposure=0
scene.render.image_settings.file_format='PNG';scene.render.filepath=str(public/'engineering-lab-poster.png');scene.render.film_transparent=False
# Store conceptual subsystem anchors and their projection for the static fallback.
anchors={'sensors':(2.1,-.52,.46),'telemetry':(-.15,0,1.3),'aerodynamics':(2.75,0,.25),'control':(.7,0,.73),'power':(-1.2,-.6,.53)}
bpy.context.view_layer.update()
projections={}
for name,pos in anchors.items():
 ndc=world_to_camera_view(scene,camera,Vector(pos));projections[name]={'left':round(ndc.x*100,2),'top':round((1-ndc.y)*100,2),'world_blender':pos}
(output/'hotspot-projections.json').write_text(json.dumps(projections,indent=2))
# Export car and branding only. Static, no embedded scripts, images or animation.
bpy.ops.object.select_all(action='DESELECT');car.select_set(True);brand.select_set(True);bpy.context.view_layer.objects.active=brand
bpy.ops.object.convert(target='MESH');brand=bpy.context.object
bpy.ops.export_scene.gltf(filepath=str(output/'flux-lab-car.glb'),export_format='GLB',use_selection=True,export_animations=False,export_cameras=False,export_lights=False,export_yup=True)
bpy.ops.wm.save_as_mainfile(filepath=str(output/'flux-lab-studio.blend'))
bpy.ops.render.render(write_still=True)
print('PREPARED',output/'flux-lab-car.glb')
