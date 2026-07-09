/* =====================================================================
   usmile 智能电动牙刷 F20 — 产品展示
   ===================================================================== */
(function () {
  'use strict';

  var host = document.getElementById('stage');
  var supportsWebGL = (function () {
    try {
      var c = document.createElement('canvas');
      return !!(window.WebGLRenderingContext && (c.getContext('webgl') || c.getContext('experimental-webgl')));
    } catch (e) { return false; }
  })();

  if (!window.THREE || !supportsWebGL) {
    document.body.classList.add('no-webgl');
    return;
  }

  var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  var COLORS = {
    gray:  new THREE.Color('#9a9ea6'),
    pink:  new THREE.Color('#eab6c6'),
    accent:new THREE.Color('#2b7bff'),
    accentPink: new THREE.Color('#ff85ab')
  };
  var state = {
    theme: 'gray', explodeCur: 0,
    dragging: false, autoSpin: !reduceMotion, velY: 0.0028,
    userYaw: 0, userPitch: 0,
    accent: COLORS.accent.clone(), accentTarget: COLORS.accent.clone(),
    highlightHeadHover: 0
  };

  var renderer = new THREE.WebGLRenderer({ canvas: host, antialias: true, alpha: true, powerPreference: 'high-performance' });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.12;

  var scene = new THREE.Scene();
  var camera = new THREE.PerspectiveCamera(32, window.innerWidth / window.innerHeight, 0.1, 100);
  camera.position.set(0, 0, 9.2);

  // 明亮棚拍环境（白背景柔光箱）→ PMREM，金属反射出干净银灰
  function makeStudioEnv() {
    var cvs = document.createElement('canvas'); cvs.width = 512; cvs.height = 256;
    var g = cvs.getContext('2d');
    var grad = g.createLinearGradient(0, 0, 0, 256);
    grad.addColorStop(0.0, '#ffffff');
    grad.addColorStop(0.4, '#eef4fc');
    grad.addColorStop(0.5, '#ffffff');
    grad.addColorStop(0.62, '#dfe8f5');
    grad.addColorStop(1.0, '#c3ccd8');
    g.fillStyle = grad; g.fillRect(0, 0, 512, 256);
    function glow(x, y, r, col) {
      var rg = g.createRadialGradient(x, y, 0, x, y, r);
      rg.addColorStop(0, col); rg.addColorStop(1, 'rgba(255,255,255,0)');
      g.fillStyle = rg; g.beginPath(); g.arc(x, y, r, 0, Math.PI * 2); g.fill();
    }
    glow(120, 90, 120, 'rgba(120,170,255,0.28)');
    glow(400, 120, 120, 'rgba(255,150,190,0.22)');
    var tex = new THREE.CanvasTexture(cvs);
    tex.mapping = THREE.EquirectangularReflectionMapping;
    tex.colorSpace = THREE.SRGBColorSpace;
    var pmrem = new THREE.PMREMGenerator(renderer);
    var rt = pmrem.fromEquirectangular(tex);
    tex.dispose(); pmrem.dispose();
    return rt.texture;
  }
  scene.environment = makeStudioEnv();

  var key = new THREE.DirectionalLight(0xffffff, 2.3); key.position.set(4, 6, 6); scene.add(key);
  var rim = new THREE.DirectionalLight(0xbcd4ff, 1.6); rim.position.set(-5, 2, -4); scene.add(rim);
  var warm = new THREE.DirectionalLight(0xffd6e4, 0.9); warm.position.set(3, -3, -2); scene.add(warm);
  scene.add(new THREE.AmbientLight(0xffffff, 0.55));

  var matBody = new THREE.MeshPhysicalMaterial({ color: COLORS.gray.clone(), metalness: 0.9, roughness: 0.32, clearcoat: 0.7, clearcoatRoughness: 0.26, envMapIntensity: 1.5 });
  var matShaft = new THREE.MeshStandardMaterial({ color: new THREE.Color('#dfe4ea'), metalness: 1.0, roughness: 0.22, envMapIntensity: 1.6 });
  var matHead = new THREE.MeshPhysicalMaterial({ color: new THREE.Color('#ffffff'), metalness: 0.0, roughness: 0.42, clearcoat: 0.55, clearcoatRoughness: 0.28, envMapIntensity: 1.1 });
  matHead.emissive = new THREE.Color(0x000000);
  var matMotor = new THREE.MeshStandardMaterial({ color: new THREE.Color('#d3dae5'), metalness: 1.0, roughness: 0.26, envMapIntensity: 1.5 });
  var matCoil = new THREE.MeshStandardMaterial({ color: new THREE.Color('#cf7f3f'), metalness: 0.9, roughness: 0.34, emissive: new THREE.Color('#b8621f'), emissiveIntensity: 0.3 });
  var matBattery = new THREE.MeshStandardMaterial({ color: new THREE.Color('#20415c'), metalness: 0.5, roughness: 0.4 });
  var matBattBand = new THREE.MeshStandardMaterial({ color: new THREE.Color('#2ee6b6'), metalness: 0.3, roughness: 0.4, emissive: new THREE.Color('#1fae89'), emissiveIntensity: 0.35 });
  var matAccent = new THREE.MeshStandardMaterial({ color: 0xdfe8f5, metalness: 0.3, roughness: 0.4, emissive: state.accent.clone(), emissiveIntensity: 1.2 });

  var brush = new THREE.Group();
  scene.add(brush);
  var parts = {};

  // 机身（把柄）+ 顶部金属驱动轴（刷头就插在这根轴上，与机身连成一体）
  (function buildBody() {
    var p = [];
    function v(r, y) { p.push(new THREE.Vector2(r, y)); }
    v(0.00, -2.05); v(0.30, -2.05); v(0.46, -1.92); v(0.52, -1.6);
    v(0.51, -1.0); v(0.49, -0.2); v(0.47, 0.6); v(0.44, 1.2);
    v(0.40, 1.7); v(0.33, 1.96); v(0.26, 2.05); v(0.00, 2.05);
    var geo = new THREE.LatheGeometry(p, 96); geo.computeVertexNormals();
    var body = new THREE.Mesh(geo, matBody);
    parts.body = body; brush.add(body);

    // 金属驱动轴（机身顶伸出，刷头套在其上）— 作为机身子物体，拆解时随机身留下
    var shaft = new THREE.Mesh(new THREE.CylinderGeometry(0.085, 0.1, 0.62, 32), matShaft);
    shaft.position.y = 2.32; body.add(shaft);

    var led = new THREE.Mesh(new THREE.TorusGeometry(0.42, 0.026, 16, 80), matAccent);
    led.position.y = 1.32; led.rotation.x = Math.PI / 2; body.add(led); parts.led = led;

    var btn = new THREE.Mesh(new THREE.CircleGeometry(0.13, 40), matAccent);
    btn.position.set(0, 0.5, 0.5); btn.lookAt(0, 0.5, 3); body.add(btn); parts.button = btn;
    var ring = new THREE.Mesh(new THREE.RingGeometry(0.15, 0.172, 40), matAccent);
    ring.position.copy(btn.position); ring.quaternion.copy(btn.quaternion); body.add(ring);
  })();

  // 精控动力马达（内藏，拆解时上移露出）
  (function buildMotor() {
    var motor = new THREE.Group();
    motor.add(new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.22, 0.7, 40), matMotor));
    for (var i = 0; i < 5; i++) {
      var coil = new THREE.Mesh(new THREE.TorusGeometry(0.225, 0.026, 12, 40), matCoil);
      coil.rotation.x = Math.PI / 2; coil.position.y = -0.24 + i * 0.12; motor.add(coil);
    }
    motor.position.y = 1.1; parts.motor = motor; brush.add(motor);
  })();

  // 电池（内藏，拆解时下移露出）
  (function buildBattery() {
    var batt = new THREE.Group();
    batt.add(new THREE.Mesh(new THREE.CylinderGeometry(0.32, 0.32, 0.95, 40), matBattery));
    var band = new THREE.Mesh(new THREE.CylinderGeometry(0.322, 0.322, 0.16, 40), matBattBand);
    band.position.y = 0.18; batt.add(band);
    var cap = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.12, 0.08, 24), matBattBand);
    cap.position.y = 0.52; batt.add(cap);
    batt.position.y = -0.85; parts.battery = batt; brush.add(batt);
  })();

  // 刷头（白色）：颈部套住驱动轴、底部与机身顶相接，静止时连成一支牙刷
  (function buildHead() {
    var head = new THREE.Group();
    // 颈：底部 local -0.28（world 1.97）低于机身顶 2.05，无缝相接
    var neck = new THREE.Mesh(new THREE.CylinderGeometry(0.115, 0.135, 0.56, 32), matHead);
    neck.position.y = 0.0; head.add(neck);
    var pad = new THREE.Mesh(new THREE.CapsuleGeometry(0.17, 0.34, 8, 24), matHead);
    pad.rotation.z = Math.PI / 2; pad.scale.set(1, 1, 0.5); pad.position.y = 0.46; head.add(pad);
    // 刷毛
    var rows = 5, cols = 9, count = rows * cols;
    var bg = new THREE.CylinderGeometry(0.018, 0.024, 0.26, 6);
    var inst = new THREE.InstancedMesh(bg, new THREE.MeshStandardMaterial({ roughness: 0.7, metalness: 0.0 }), count);
    var m = new THREE.Matrix4(), idx = 0;
    var tipBlue = new THREE.Color('#3b8bff'), white = new THREE.Color('#f2f6ff');
    for (var r = 0; r < rows; r++) for (var c = 0; c < cols; c++) {
      var x = (r - (rows - 1) / 2) * 0.06, z = (c - (cols - 1) / 2) * 0.062;
      m.makeTranslation(x, 0.66, z); inst.setMatrixAt(idx, m);
      inst.setColorAt(idx, (r + c) % 3 === 0 ? tipBlue : white); idx++;
    }
    inst.instanceMatrix.needsUpdate = true; if (inst.instanceColor) inst.instanceColor.needsUpdate = true;
    parts.bristles = inst; head.add(inst);
    head.position.y = 2.25; parts.head = head; brush.add(head);
  })();

  brush.scale.setScalar(0.62);

  var base = {};
  Object.keys(parts).forEach(function (k) { if (parts[k].position) base[k] = parts[k].position.clone(); });
  var EXPLODE = {
    head:   new THREE.Vector3(0, 2.0, 0),
    motor:  new THREE.Vector3(0, 1.75, 0),
    battery:new THREE.Vector3(0, -2.3, 0)
  };

  // 部件说明（产品卖点）
  var callouts = [
    { key: 'head',    el: null, label: '小雷达刷头 · 6 区 16 面' },
    { key: 'motor',   el: null, label: '精控动力 2.0 · AI 变频' },
    { key: 'battery', el: null, label: '110 天超长续航' }
  ];
  var calloutLayer = document.getElementById('callouts');
  callouts.forEach(function (co) {
    var el = document.createElement('div'); el.className = 'callout';
    el.innerHTML = '<span class="co-dot"></span><span class="co-text">' + co.label + '</span>';
    calloutLayer.appendChild(el); co.el = el;
  });

  var KEYS = [
    { at: 0.00, posX: 0.0,  rotX: 0.0,  cam: 9.2,  explode: 0, headHi: 0 },
    { at: 0.15, posX: 0.0,  rotX: 0.05, cam: 8.4,  explode: 0, headHi: 0 },
    { at: 0.30, posX: 1.7,  rotX: 0.0,  cam: 8.6,  explode: 0, headHi: 0 },
    { at: 0.46, posX: 0.0,  rotX: 0.0,  cam: 11.0, explode: 1, headHi: 0 },
    { at: 0.60, posX: 0.0,  rotX: 0.0,  cam: 11.0, explode: 1, headHi: 0 },
    { at: 0.73, posX: -1.6, rotX: 0.05, cam: 8.8,  explode: 0, headHi: 1 },
    { at: 0.88, posX: 1.4,  rotX: 0.0,  cam: 9.4,  explode: 0, headHi: 0 },
    { at: 1.00, posX: 0.0,  rotX: 0.0,  cam: 9.0,  explode: 0, headHi: 0 }
  ];
  function sampleKeys(t) {
    var a = KEYS[0], b = KEYS[KEYS.length - 1];
    for (var i = 0; i < KEYS.length - 1; i++) if (t >= KEYS[i].at && t <= KEYS[i + 1].at) { a = KEYS[i]; b = KEYS[i + 1]; break; }
    var span = (b.at - a.at) || 1, f = Math.max(0, Math.min(1, (t - a.at) / span)); f = f * f * (3 - 2 * f);
    return { posX: a.posX + (b.posX - a.posX) * f, rotX: a.rotX + (b.rotX - a.rotX) * f, cam: a.cam + (b.cam - a.cam) * f, explode: a.explode + (b.explode - a.explode) * f, headHi: a.headHi + (b.headHi - a.headHi) * f };
  }

  var scrollProgress = 0;
  function updateScroll() { var max = document.body.scrollHeight - window.innerHeight; scrollProgress = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0; }
  window.addEventListener('scroll', updateScroll, { passive: true }); updateScroll();

  var pointer = { down: false, lx: 0, ly: 0 };
  function onDown(e) {
    if (e.target && e.target.closest && e.target.closest('.no-drag')) return;
    pointer.down = true; state.dragging = true; state.autoSpin = false;
    var p = e.touches ? e.touches[0] : e; pointer.lx = p.clientX; pointer.ly = p.clientY;
    document.body.classList.add('grabbing');
  }
  function onMove(e) {
    if (!pointer.down) return;
    var p = e.touches ? e.touches[0] : e, dx = p.clientX - pointer.lx, dy = p.clientY - pointer.ly;
    pointer.lx = p.clientX; pointer.ly = p.clientY;
    state.userYaw += dx * 0.008; state.userPitch += dy * 0.006;
    state.userPitch = Math.max(-0.6, Math.min(0.6, state.userPitch)); state.velY = dx * 0.008;
  }
  function onUp() { pointer.down = false; state.dragging = false; document.body.classList.remove('grabbing');
    setTimeout(function () { if (!pointer.down && !reduceMotion) state.autoSpin = true; }, 2600); }
  window.addEventListener('mousedown', onDown);
  window.addEventListener('mousemove', onMove, { passive: true });
  window.addEventListener('mouseup', onUp);
  window.addEventListener('touchstart', onDown, { passive: true });
  window.addEventListener('touchmove', onMove, { passive: true });
  window.addEventListener('touchend', onUp);

  window.usmileSetColor = function (which) {
    state.theme = which;
    matBody.userData.target = (which === 'pink' ? COLORS.pink : COLORS.gray).clone();
    state.accentTarget = (which === 'pink' ? COLORS.accentPink : COLORS.accent).clone();
  };
  matBody.userData.target = COLORS.gray.clone();
  window.usmileHighlight = function (on) { state.highlightHeadHover = on ? 1 : 0; };

  var clock = new THREE.Clock(); var projV = new THREE.Vector3();
  function tick() {
    var dt = Math.min(clock.getDelta(), 0.05);
    var k = sampleKeys(scrollProgress);

    state.explodeCur += (k.explode - state.explodeCur) * Math.min(1, dt * 6);
    Object.keys(EXPLODE).forEach(function (name) {
      var pt = parts[name]; if (!pt) return; var off = EXPLODE[name];
      pt.position.set(base[name].x + off.x * state.explodeCur, base[name].y + off.y * state.explodeCur, base[name].z + off.z * state.explodeCur);
    });

    if (state.autoSpin && !pointer.down) { state.velY += (0.0032 - state.velY) * 0.02; state.userYaw += state.velY; }
    else if (!pointer.down) { state.velY *= 0.94; state.userYaw += state.velY; }
    brush.rotation.y = state.userYaw;
    brush.rotation.x = k.rotX + state.userPitch;
    brush.position.x += (k.posX - brush.position.x) * Math.min(1, dt * 4);
    var targetY = -0.55 * state.explodeCur;
    brush.position.y += (targetY - brush.position.y) * Math.min(1, dt * 4);

    camera.position.z += (k.cam - camera.position.z) * Math.min(1, dt * 4);
    camera.lookAt(0, 0, 0);

    if (matBody.userData.target) matBody.color.lerp(matBody.userData.target, Math.min(1, dt * 4));
    state.accent.lerp(state.accentTarget, Math.min(1, dt * 4));
    matAccent.emissive.copy(state.accent);
    matAccent.emissiveIntensity = 1.0 + Math.sin(clock.elapsedTime * 2.2) * 0.3;

    var hi = Math.max(k.headHi, state.highlightHeadHover || 0);
    matHead.emissive.copy(state.accent).multiplyScalar(hi * 0.4);

    var show = state.explodeCur > 0.35;
    calloutLayer.style.opacity = show ? Math.min(1, (state.explodeCur - 0.35) / 0.4) : 0;
    if (show) callouts.forEach(function (co) {
      var pt = parts[co.key]; if (!pt) return; pt.getWorldPosition(projV); projV.project(camera);
      var x = (projV.x * 0.5 + 0.5) * window.innerWidth, y = (-projV.y * 0.5 + 0.5) * window.innerHeight;
      co.el.style.transform = 'translate(' + x + 'px,' + y + 'px)';
    });

    renderer.render(scene, camera);
    requestAnimationFrame(tick);
  }
  tick();

  window.addEventListener('resize', function () {
    camera.aspect = window.innerWidth / window.innerHeight; camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });

  document.body.classList.add('scene-ready');
})();
