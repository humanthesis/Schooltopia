import * as THREE from "./vendor/three.module.min.js";

const canvas = document.getElementById("creatorWorld3d");
const hero = document.getElementById("creatorHero");

if (canvas && hero) {
  try {
  const reducedMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)");
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, powerPreference: "default" });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, window.innerWidth < 700 ? 1.25 : 1.5));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFShadowMap;

  const scene = new THREE.Scene();
  scene.background = new THREE.Color("#dfe9e2");
  scene.fog = new THREE.Fog("#dfe9e2", 17, 29);

  const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 60);
  camera.position.set(10.5, 9.4, 12.5);
  camera.lookAt(1.7, 0.4, 0);

  const ambient = new THREE.HemisphereLight("#ffffff", "#75877d", 2.25);
  scene.add(ambient);
  const sun = new THREE.DirectionalLight("#fff5d4", 3.1);
  sun.position.set(-5, 12, 8);
  sun.castShadow = true;
  sun.shadow.mapSize.set(1024, 1024);
  sun.shadow.camera.left = -11;
  sun.shadow.camera.right = 11;
  sun.shadow.camera.top = 11;
  sun.shadow.camera.bottom = -11;
  scene.add(sun);

  const palette = {
    primary: new THREE.Color("#245f61"),
    accent: new THREE.Color("#d09a39"),
    danger: new THREE.Color("#b64d3f"),
    sky: new THREE.Color("#10242b"),
  };
  const themedMaterials = { primary: [], accent: [], danger: [], sky: [] };
  const world = new THREE.Group();
  world.position.set(2.2, -0.65, 0);
  world.rotation.y = -0.14;
  scene.add(world);

  function material(colorKey, options = {}) {
    const next = new THREE.MeshStandardMaterial({
      color: palette[colorKey],
      roughness: options.roughness ?? 0.68,
      metalness: options.metalness ?? 0.04,
      transparent: Boolean(options.transparent),
      opacity: options.opacity ?? 1,
    });
    themedMaterials[colorKey].push(next);
    return next;
  }

  const neutral = new THREE.MeshStandardMaterial({ color: "#edf2eb", roughness: 0.86 });
  const dark = new THREE.MeshStandardMaterial({ color: "#18302a", roughness: 0.72 });
  const glass = new THREE.MeshStandardMaterial({
    color: "#d8f0ee",
    roughness: 0.18,
    metalness: 0.12,
    transparent: true,
    opacity: 0.78,
  });
  const grass = new THREE.MeshStandardMaterial({ color: "#7fa889", roughness: 0.92 });

  function box(width, height, depth, meshMaterial, x, y, z, group = world) {
    const mesh = new THREE.Mesh(new THREE.BoxGeometry(width, height, depth), meshMaterial);
    mesh.position.set(x, y, z);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    group.add(mesh);
    return mesh;
  }

  const base = box(13.8, 0.42, 9.2, neutral, 0, -0.18, 0);
  base.receiveShadow = true;
  const lawn = box(13.2, 0.12, 8.6, grass, 0, 0.09, 0);
  lawn.receiveShadow = true;

  const grid = new THREE.GridHelper(25, 25, "#86a39b", "#b8cbc4");
  grid.position.set(0, -0.37, 0);
  grid.material.opacity = 0.42;
  grid.material.transparent = true;
  scene.add(grid);

  const trackShape = new THREE.Shape();
  trackShape.absellipse(0, 0, 3.0, 1.82, 0, Math.PI * 2, false, 0);
  const hole = new THREE.Path();
  hole.absellipse(0, 0, 2.24, 1.12, 0, Math.PI * 2, true, 0);
  trackShape.holes.push(hole);
  const trackGeometry = new THREE.ShapeGeometry(trackShape, 64);
  const track = new THREE.Mesh(trackGeometry, material("danger", { roughness: 0.9 }));
  track.rotation.x = -Math.PI / 2;
  track.position.set(2.7, 0.18, 1.6);
  track.receiveShadow = true;
  world.add(track);
  box(4.35, 0.06, 2.12, new THREE.MeshStandardMaterial({ color: "#86b78b", roughness: 1 }), 2.7, 0.2, 1.6);

  function addBuilding({ x, z, width, depth, floors, colorKey = "primary", roofKey = "accent" }) {
    const group = new THREE.Group();
    group.position.set(x, 0, z);
    world.add(group);
    const height = floors * 0.72 + 0.45;
    box(width, height, depth, material(colorKey), 0, height / 2 + 0.2, 0, group);
    box(width + 0.28, 0.18, depth + 0.28, material(roofKey), 0, height + 0.31, 0, group);
    box(width * 0.26, 0.62, depth + 0.04, dark, 0, 0.52, depth * 0.01, group);
    const columns = Math.max(2, Math.floor(width / 0.65));
    for (let floor = 0; floor < floors; floor += 1) {
      for (let column = 0; column < columns; column += 1) {
        const windowWidth = Math.min(0.34, width / (columns * 1.8));
        const windowX = -width / 2 + (column + 0.5) * (width / columns);
        box(windowWidth, 0.31, 0.045, glass, windowX, 0.83 + floor * 0.71, depth / 2 + 0.03, group);
      }
    }
    return group;
  }

  addBuilding({ x: -2.7, z: -1.15, width: 4.8, depth: 1.65, floors: 4 });
  addBuilding({ x: 1.45, z: -2.25, width: 3.25, depth: 1.35, floors: 3, colorKey: "sky" });
  addBuilding({ x: 4.8, z: -1.2, width: 2.05, depth: 2.2, floors: 2, colorKey: "primary", roofKey: "danger" });

  const tower = new THREE.Group();
  tower.position.set(-5.25, 0, 2.7);
  world.add(tower);
  box(1.35, 2.1, 1.35, material("accent"), 0, 1.25, 0, tower);
  box(1.58, 0.15, 1.58, dark, 0, 2.37, 0, tower);
  const clock = new THREE.Mesh(new THREE.CylinderGeometry(0.35, 0.35, 0.08, 32), neutral);
  clock.rotation.x = Math.PI / 2;
  clock.position.set(0, 1.62, 0.72);
  tower.add(clock);

  function addTree(x, z, scale = 1) {
    const tree = new THREE.Group();
    const trunk = new THREE.Mesh(new THREE.CylinderGeometry(0.08 * scale, 0.11 * scale, 0.62 * scale, 8), dark);
    trunk.position.y = 0.49 * scale;
    trunk.castShadow = true;
    tree.add(trunk);
    const crown = new THREE.Mesh(new THREE.IcosahedronGeometry(0.46 * scale, 1), new THREE.MeshStandardMaterial({ color: "#3f8568", roughness: 0.9 }));
    crown.position.y = 1.02 * scale;
    crown.scale.y = 1.18;
    crown.castShadow = true;
    tree.add(crown);
    tree.position.set(x, 0.22, z);
    world.add(tree);
  }

  [[-5.4, -0.5, 1], [-4.8, -2.5, 0.8], [-0.9, 2.7, 0.95], [0.2, 3.2, 0.72], [5.7, 2.9, 0.9], [5.8, 0.9, 0.7]].forEach(([x, z, scale]) => addTree(x, z, scale));

  const nodeGroup = new THREE.Group();
  world.add(nodeGroup);
  const floatingNodes = [];
  [
    [-4.5, 4.05, -2.6, "accent"],
    [0.9, 4.55, -2.8, "danger"],
    [5.25, 3.7, 0.15, "primary"],
  ].forEach(([x, y, z, key], index) => {
    const node = new THREE.Mesh(new THREE.OctahedronGeometry(0.34, 0), material(key, { roughness: 0.35, metalness: 0.24 }));
    node.position.set(x, y, z);
    node.castShadow = true;
    node.userData.phase = index * 2.1;
    nodeGroup.add(node);
    floatingNodes.push(node);
    const ring = new THREE.Mesh(new THREE.TorusGeometry(0.54, 0.025, 8, 42), material(key, { transparent: true, opacity: 0.66 }));
    ring.position.copy(node.position);
    ring.rotation.x = Math.PI / 2;
    ring.userData.phase = index * 2.1 + 0.8;
    nodeGroup.add(ring);
    floatingNodes.push(ring);
  });

  const pinGeometry = new THREE.CylinderGeometry(0.025, 0.025, 2.3, 6);
  [-3.9, 0.9, 5.25].forEach((x, index) => {
    const pin = new THREE.Mesh(pinGeometry, material(index === 1 ? "danger" : "accent", { transparent: true, opacity: 0.44 }));
    pin.position.set(x, 2.15 + index * 0.15, index === 2 ? 0.15 : -2.7);
    world.add(pin);
  });

  let pointerX = 0;
  let pointerY = 0;
  let frame = 0;
  let lastTime = 0;
  let heroVisible = true;

  function updateTheme(colors = {}) {
    Object.keys(palette).forEach((key) => {
      if (!colors[key]) return;
      palette[key].set(colors[key]);
      themedMaterials[key].forEach((meshMaterial) => {
        meshMaterial.color.set(colors[key]);
        meshMaterial.needsUpdate = true;
      });
    });
  }

  function readThemeInputs() {
    return {
      primary: document.getElementById("creatorPrimary")?.value || "#245f61",
      accent: document.getElementById("creatorAccent")?.value || "#d09a39",
      danger: document.getElementById("creatorDanger")?.value || "#b64d3f",
      sky: document.getElementById("creatorSky")?.value || "#10242b",
    };
  }

  function resize() {
    const width = Math.max(1, hero.clientWidth);
    const height = Math.max(1, hero.clientHeight);
    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    const mobile = width < 700;
    camera.position.set(mobile ? 11.8 : 10.5, mobile ? 10.7 : 9.4, mobile ? 14.6 : 12.5);
    camera.lookAt(mobile ? 1.4 : 1.7, mobile ? 0.1 : 0.4, mobile ? 0.2 : 0);
    world.position.x = mobile ? 1.8 : 2.2;
    world.position.y = mobile ? -1.42 : -0.65;
    world.scale.setScalar(mobile ? 0.82 : 1);
    camera.updateProjectionMatrix();
    renderer.render(scene, camera);
  }

  function animate(time = 0) {
    frame = 0;
    const seconds = time * 0.001;
    const delta = Math.min(0.05, (time - lastTime) * 0.001 || 0);
    lastTime = time;
    const targetRotationY = -0.14 + pointerX * 0.1;
    const targetRotationX = pointerY * 0.035;
    world.rotation.y += (targetRotationY - world.rotation.y) * Math.min(1, delta * 4.5);
    world.rotation.x += (targetRotationX - world.rotation.x) * Math.min(1, delta * 4.5);
    if (!reducedMotion?.matches) {
      floatingNodes.forEach((node, index) => {
        node.position.y += Math.sin(seconds * 1.15 + node.userData.phase) * 0.0016;
        node.rotation.y = seconds * (0.28 + index * 0.03);
        node.rotation.z = Math.sin(seconds * 0.55 + index) * 0.16;
      });
    }
    renderer.render(scene, camera);
    if (!document.hidden && heroVisible) frame = requestAnimationFrame(animate);
  }

  hero.addEventListener("pointermove", (event) => {
    const bounds = hero.getBoundingClientRect();
    pointerX = ((event.clientX - bounds.left) / bounds.width - 0.5) * 2;
    pointerY = ((event.clientY - bounds.top) / bounds.height - 0.5) * 2;
  });
  hero.addEventListener("pointerleave", () => {
    pointerX = 0;
    pointerY = 0;
  });
  window.addEventListener("creator-theme-change", (event) => updateTheme(event.detail));
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      cancelAnimationFrame(frame);
      frame = 0;
    } else if (heroVisible && !frame) {
      frame = requestAnimationFrame(animate);
    }
  });
  if ("IntersectionObserver" in window) {
    new IntersectionObserver(([entry]) => {
      heroVisible = entry.isIntersecting;
      if (!heroVisible && frame) {
        cancelAnimationFrame(frame);
        frame = 0;
      } else if (heroVisible && !document.hidden && !frame) {
        lastTime = performance.now();
        frame = requestAnimationFrame(animate);
      }
    }, { rootMargin: "120px 0px" }).observe(hero);
  }
  new ResizeObserver(resize).observe(hero);

  window.Creator3D = { setTheme: updateTheme };
  updateTheme(readThemeInputs());
  resize();
  hero.classList.add("scene-ready");
  hero.classList.remove("scene-failed");
  window.dispatchEvent(new CustomEvent("creator-3d-ready"));
  frame = requestAnimationFrame(animate);
  } catch (error) {
    console.error("Schooltopia 3D scene failed to initialize", error);
    hero.classList.add("scene-failed");
    window.dispatchEvent(new CustomEvent("creator-3d-failed"));
  }
}
