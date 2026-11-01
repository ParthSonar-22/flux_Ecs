import {test} from 'node:test'
import assert from 'node:assert/strict'
import {PerspectiveCamera,Mesh,BoxGeometry,MeshStandardMaterial} from 'three'
import {animate} from 'animejs'
import 'animejs/adapters/three'

test('installed Anime Three adapter maps camera and mesh transforms',()=>{
  const camera=new PerspectiveCamera()
  const move=animate(camera,{x:5,y:3,z:7,duration:1000,autoplay:false,ease:'linear'})
  move.seek(1000)
  assert.equal(camera.position.x,5)
  assert.equal(camera.position.y,3)
  assert.equal(camera.position.z,7)
  const mesh=new Mesh(new BoxGeometry(),new MeshStandardMaterial())
  const turn=animate(mesh,{rotateY:90,scale:2,duration:1000,autoplay:false,ease:'linear'})
  turn.seek(1000)
  assert.ok(Math.abs(mesh.rotation.y-Math.PI/2)<.0001)
  assert.equal(mesh.scale.x,2)
  move.cancel();turn.cancel();mesh.geometry.dispose();mesh.material.dispose()
})
