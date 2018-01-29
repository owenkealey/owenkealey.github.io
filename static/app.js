// Extra geometry
console.clear()
THREE.IcosahedronGeometry = function(radius, detail) {
  var t = (1 + Math.sqrt(5)) / 2
  var vertices = [
    -1,
    t,
    0,
    1,
    t,
    0,
    -1,
    -t,
    0,
    1,
    -t,
    0,
    0,
    -1,
    t,
    0,
    1,
    t,
    0,
    -1,
    -t,
    0,
    1,
    -t,
    t,
    0,
    -1,
    t,
    0,
    1,
    -t,
    0,
    -1,
    -t,
    0,
    1
  ]
  var indices = [
    0,
    11,
    5,
    0,
    5,
    1,
    0,
    1,
    7,
    0,
    7,
    10,
    0,
    10,
    11,
    1,
    5,
    9,
    5,
    11,
    4,
    11,
    10,
    2,
    10,
    7,
    6,
    7,
    1,
    8,
    3,
    9,
    4,
    3,
    4,
    2,
    3,
    2,
    6,
    3,
    6,
    8,
    3,
    8,
    9,
    4,
    9,
    5,
    2,
    4,
    11,
    6,
    2,
    10,
    8,
    6,
    7,
    9,
    8,
    1
  ]
  THREE.PolyhedronGeometry.call(this, vertices, indices, radius, detail)
  this.type = 'IcosahedronGeometry'
  this.parameters = {
    radius: radius,
    detail: detail
  }
}

THREE.IcosahedronGeometry.prototype = Object.create(
  THREE.PolyhedronGeometry.prototype
)
THREE.IcosahedronGeometry.prototype.constructor = THREE.IcosahedronGeometry

// Scene
var scene = new THREE.Scene()
var camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
)

var renderer = new THREE.WebGLRenderer({
  antialias: true,
  alpha: true
})

renderer.setClearColor(0xf7f7f7)
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

scene.fog = new THREE.Fog(0xd4d4d4, 8, 20)

// Create vertex points
var mesh = new THREE.IcosahedronGeometry(6, 2) // radius, detail
var vertices = mesh.vertices
var bigDotGeometry = new THREE.SphereGeometry(0.1, 32, 32)
var bigDotMaterial = new THREE.MeshBasicMaterial({ color: 0x000000 })
var smallDotGeometry = new THREE.SphereGeometry(0.08, 32, 32)
var smallDotMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 })
var bigDots = []
var smallDots = []

bigDots = vertices.filter(function(value, index) {
  return (index + 1) % 9 != 0
})

smallDots = vertices.filter(function(value, index) {
  return (index + 1) % 9 == 0
})

bigDots.map(function(el, i) {
  var bigDot = new THREE.Mesh(bigDotGeometry, bigDotMaterial)
  bigDot.position.x = el.x
  bigDot.position.y = el.y
  bigDot.position.z = el.z
  scene.add(bigDot)
})

smallDots.map(function(el, i) {
  var smallDot = new THREE.Mesh(smallDotGeometry, smallDotMaterial)
  smallDot.position.x = el.x
  smallDot.position.y = el.y
  smallDot.position.z = el.z
  scene.add(smallDot)
})

scene.add(
  new THREE.Mesh(
    mesh,
    new THREE.MeshPhongMaterial({
      color: 0x616161,
      emissive: 0xa1a1a1,
      wireframe: true,
      fog: 1
    })
  )
)

camera.position.z = 20

var render = function() {
  requestAnimationFrame(render)
  scene.rotation.x += 0.00055
  scene.rotation.y += 0.00055
  renderer.setClearColor(0x000000, 0.0)

  renderer.render(scene, camera)
}

render()

window.onresize = function(){ location.reload(); }

