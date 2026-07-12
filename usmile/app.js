/* =====================================================================
   智能牙刷 — 交互式 3D 产品展示（按版块吸附驱动）
   ===================================================================== */
(function () {
  'use strict';

  var host = document.getElementById('stage');
  var supportsWebGL = (function () { try { var c = document.createElement('canvas'); return !!(window.WebGLRenderingContext && (c.getContext('webgl') || c.getContext('experimental-webgl'))); } catch (e) { return false; } })();
  if (!window.THREE || !supportsWebGL) { document.body.classList.add('no-webgl'); return; }

  var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  var COLORS = { gray: new THREE.Color('#a7a29a'), pink: new THREE.Color('#e6c3ca'), accent: new THREE.Color('#b1904f'), accentPink: new THREE.Color('#c69a86') };
  var state = { theme: 'gray', idx: 0, explodeCur: 0, vis: 1, curRotX: 0, curRotZ: 0, down: false, autoSpin: !reduceMotion, velY: 0.0028, userYaw: 0, userPitch: 0, accent: COLORS.accent.clone(), accentTarget: COLORS.accent.clone(), highlightHeadHover: 0 };

  var renderer = new THREE.WebGLRenderer({ canvas: host, antialias: true, alpha: true, powerPreference: 'high-performance' });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.outputColorSpace = THREE.SRGBColorSpace; renderer.toneMapping = THREE.ACESFilmicToneMapping; renderer.toneMappingExposure = 1.14;

  var scene = new THREE.Scene();
  var camera = new THREE.PerspectiveCamera(30, window.innerWidth / window.innerHeight, 0.1, 100);
  camera.position.set(0, 0, 9.4);

  function makeStudioEnv() {
    var cvs = document.createElement('canvas'); cvs.width = 512; cvs.height = 256; var g = cvs.getContext('2d');
    var grad = g.createLinearGradient(0, 0, 0, 256);
    grad.addColorStop(0.0, '#ffffff'); grad.addColorStop(0.36, '#f6f2ea'); grad.addColorStop(0.5, '#ffffff'); grad.addColorStop(0.64, '#ece5d9'); grad.addColorStop(1.0, '#cabfa8');
    g.fillStyle = grad; g.fillRect(0, 0, 512, 256);
    function glow(x, y, r, col) { var rg = g.createRadialGradient(x, y, 0, x, y, r); rg.addColorStop(0, col); rg.addColorStop(1, 'rgba(255,255,255,0)'); g.fillStyle = rg; g.beginPath(); g.arc(x, y, r, 0, Math.PI * 2); g.fill(); }
    glow(120, 70, 150, 'rgba(255,240,210,0.5)'); glow(400, 120, 130, 'rgba(210,225,255,0.28)'); glow(256, 40, 200, 'rgba(255,255,255,0.75)');
    var tex = new THREE.CanvasTexture(cvs); tex.mapping = THREE.EquirectangularReflectionMapping; tex.colorSpace = THREE.SRGBColorSpace;
    var pmrem = new THREE.PMREMGenerator(renderer); var rt = pmrem.fromEquirectangular(tex); tex.dispose(); pmrem.dispose(); return rt.texture;
  }
  scene.environment = makeStudioEnv();

  var keyL = new THREE.DirectionalLight(0xffffff, 2.5); keyL.position.set(4, 7, 6); scene.add(keyL);
  var rimL = new THREE.DirectionalLight(0xbcd4ff, 1.8); rimL.position.set(-6, 3, -4); scene.add(rimL);
  var warmL = new THREE.DirectionalLight(0xffd6e4, 1.0); warmL.position.set(3, -4, 2); scene.add(warmL);
  scene.add(new THREE.AmbientLight(0xffffff, 0.5));

  var matBody = new THREE.MeshPhysicalMaterial({ color: COLORS.gray.clone(), metalness: 0.72, roughness: 0.42, clearcoat: 0.4, clearcoatRoughness: 0.5, envMapIntensity: 1.25 });
  var matChrome = new THREE.MeshStandardMaterial({ color: new THREE.Color('#e7e3da'), metalness: 1.0, roughness: 0.16, envMapIntensity: 1.8 });
  var matHead = new THREE.MeshPhysicalMaterial({ color: new THREE.Color('#ffffff'), metalness: 0.0, roughness: 0.36, clearcoat: 0.7, clearcoatRoughness: 0.2, envMapIntensity: 1.15 }); matHead.emissive = new THREE.Color(0x000000);
  var matMotor = new THREE.MeshStandardMaterial({ color: new THREE.Color('#d6dde8'), metalness: 1.0, roughness: 0.22, envMapIntensity: 1.6 });
  var matCoil = new THREE.MeshStandardMaterial({ color: new THREE.Color('#d0822f'), metalness: 0.9, roughness: 0.32, emissive: new THREE.Color('#b8621f'), emissiveIntensity: 0.35 });
  var matBattery = new THREE.MeshStandardMaterial({ color: new THREE.Color('#1d3f5c'), metalness: 0.55, roughness: 0.38 });
  var matBattBand = new THREE.MeshStandardMaterial({ color: new THREE.Color('#2ee6b6'), metalness: 0.3, roughness: 0.4, emissive: new THREE.Color('#1fae89'), emissiveIntensity: 0.4 });
  var matAccent = new THREE.MeshStandardMaterial({ color: 0xeaf1fb, metalness: 0.4, roughness: 0.35, emissive: state.accent.clone(), emissiveIntensity: 1.1 });

  var screenCvs = document.createElement('canvas'); screenCvs.width = 260; screenCvs.height = 360; var sg = screenCvs.getContext('2d');
  function rr(c, x, y, w, h, r) { c.beginPath(); c.moveTo(x + r, y); c.arcTo(x + w, y, x + w, y + h, r); c.arcTo(x + w, y + h, x, y + h, r); c.arcTo(x, y + h, x, y, r); c.arcTo(x, y, x + w, y, r); c.closePath(); }
  function drawScreen(colonOn) {
    var W = 260, H = 360; sg.clearRect(0, 0, W, H);
    sg.fillStyle = '#0c1119'; rr(sg, 6, 6, W - 12, H - 12, 46); sg.fill();
    sg.fillStyle = '#05080e'; rr(sg, 22, 26, W - 44, H - 52, 34); sg.fill();
    sg.fillStyle = '#7fd6ff'; sg.font = '700 30px system-ui,sans-serif'; sg.textBaseline = 'top'; sg.fillText('护理模式', 44, 48);
    sg.strokeStyle = 'rgba(255,255,255,.5)'; sg.lineWidth = 3; rr(sg, 176, 50, 46, 22, 6); sg.stroke();
    sg.fillStyle = '#3ee0a0'; rr(sg, 180, 54, 34, 14, 3); sg.fill();
    sg.fillStyle = '#ffffff'; sg.font = '800 96px system-ui'; sg.textAlign = 'center'; sg.fillText('2' + (colonOn ? ':' : ' ') + '00', W / 2, 130); sg.textAlign = 'left';
    sg.fillStyle = '#2b7bff'; for (var i = 0; i < 9; i++) { var bh = 12 + Math.abs(Math.sin(i * 0.8)) * 40; sg.globalAlpha = 0.45 + 0.55 * Math.abs(Math.sin(i * 1.3)); rr(sg, 46 + i * 19, 300 - bh, 11, bh, 4); sg.fill(); } sg.globalAlpha = 1;
  }
  drawScreen(true);
  var screenTex = new THREE.CanvasTexture(screenCvs); screenTex.colorSpace = THREE.SRGBColorSpace;
  var matScreen = new THREE.MeshBasicMaterial({ map: screenTex });

  var brush = new THREE.Group(); scene.add(brush); var parts = {};

  (function buildBody() {
    // 工业化：侧壁近乎笔直、收口利落的机身
    var p = []; function v(r, y) { p.push(new THREE.Vector2(r, y)); }
    v(0.00, -2.10); v(0.16, -2.10); v(0.27, -2.03); v(0.305, -1.86);
    v(0.315, -1.5); v(0.318, -0.4); v(0.315, 0.6); v(0.305, 1.35);
    v(0.29, 1.78); v(0.235, 1.98); v(0.135, 2.08); v(0.00, 2.10);
    var geo = new THREE.LatheGeometry(p, 192); geo.computeVertexNormals();
    var body = new THREE.Mesh(geo, matBody); body.userData.partKey = 'body'; parts.body = body; brush.add(body);
    // 顶部镀铬驱动轴（刷头对位）
    var shaft = new THREE.Mesh(new THREE.CylinderGeometry(0.068, 0.085, 0.7, 48), matChrome); shaft.position.y = 2.36; body.add(shaft);
    // 颈部利落镀铬环（工艺分界）
    var neckRing = new THREE.Mesh(new THREE.CylinderGeometry(0.24, 0.248, 0.05, 64), matChrome); neckRing.position.y = 1.9; body.add(neckRing);
    var botRing = new THREE.Mesh(new THREE.CylinderGeometry(0.28, 0.26, 0.04, 64), matChrome); botRing.position.y = -1.9; body.add(botRing);
    // 底部点缀环（主题色）
    var footRing = new THREE.Mesh(new THREE.TorusGeometry(0.3, 0.022, 18, 120), matAccent); footRing.position.y = -1.55; footRing.rotation.x = Math.PI / 2; body.add(footRing); parts.led = footRing;
    var screen = new THREE.Mesh(new THREE.PlaneGeometry(0.34, 0.48), matScreen); screen.position.set(0, 1.12, 0.325); body.add(screen); parts.screen = screen;
    var btn = new THREE.Mesh(new THREE.CircleGeometry(0.055, 32), matAccent); btn.position.set(0, 0.58, 0.318); body.add(btn);
  })();
  (function buildMotor() {
    var motor = new THREE.Group(); motor.userData.partKey = 'motor';
    motor.add(new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.2, 0.74, 48), matMotor));
    for (var i = 0; i < 5; i++) { var coil = new THREE.Mesh(new THREE.TorusGeometry(0.205, 0.024, 12, 48), matCoil); coil.rotation.x = Math.PI / 2; coil.position.y = -0.24 + i * 0.12; motor.add(coil); }
    motor.position.y = 1.05; parts.motor = motor; brush.add(motor);
  })();
  (function buildBattery() {
    var batt = new THREE.Group(); batt.userData.partKey = 'battery';
    batt.add(new THREE.Mesh(new THREE.CylinderGeometry(0.29, 0.29, 0.98, 48), matBattery));
    var band = new THREE.Mesh(new THREE.CylinderGeometry(0.292, 0.292, 0.15, 48), matBattBand); band.position.y = 0.2; batt.add(band);
    var cap = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.1, 0.08, 24), matBattBand); cap.position.y = 0.53; batt.add(cap);
    batt.position.y = -0.8; parts.battery = batt; brush.add(batt);
  })();
  (function buildHead() {
    // 与机身严格同轴（x=0,z=0）：直颈 → 对称椭圆刷面 → 对称刷毛
    var head = new THREE.Group(); head.userData.partKey = 'head';
    var neck = new THREE.Mesh(new THREE.CylinderGeometry(0.072, 0.085, 0.64, 48), matHead); neck.position.y = 0.0; head.add(neck);
    // 椭圆刷面（扁球，居中对称，避免朝向歧义）
    var pad = new THREE.Mesh(new THREE.SphereGeometry(0.165, 32, 22), matHead); pad.scale.set(1, 0.42, 0.8); pad.position.y = 0.5; head.add(pad);
    // 对称刷毛（限定在椭圆内，指向 +y）
    var pts = []; for (var r = -3; r <= 3; r++) for (var c = -3; c <= 3; c++) { var x = r * 0.048, z = c * 0.042; if ((x * x) / 0.026 + (z * z) / 0.017 <= 1) pts.push([x, z]); }
    var inst = new THREE.InstancedMesh(new THREE.CapsuleGeometry(0.014, 0.12, 4, 8), new THREE.MeshStandardMaterial({ roughness: 0.62, metalness: 0.0 }), pts.length);
    var m = new THREE.Matrix4(), tip = new THREE.Color('#cfd6df'), white = new THREE.Color('#f6f7f9'), gold = new THREE.Color('#d8c08a');
    for (var i = 0; i < pts.length; i++) { m.makeTranslation(pts[i][0], 0.62, pts[i][1]); inst.setMatrixAt(i, m); var d = Math.abs(pts[i][0]) + Math.abs(pts[i][1]); inst.setColorAt(i, d > 0.16 ? tip : (i % 5 === 0 ? gold : white)); }
    inst.instanceMatrix.needsUpdate = true; if (inst.instanceColor) inst.instanceColor.needsUpdate = true; head.add(inst);
    head.position.y = 2.3; parts.head = head; brush.add(head);
  })();

  // 接触阴影（Sprite 面向相机，增强落地质感）
  var shTex = (function () { var c = document.createElement('canvas'); c.width = c.height = 128; var x = c.getContext('2d'); var rg = x.createRadialGradient(64, 64, 0, 64, 64, 64); rg.addColorStop(0, 'rgba(26,24,21,0.5)'); rg.addColorStop(1, 'rgba(26,24,21,0)'); x.fillStyle = rg; x.fillRect(0, 0, 128, 128); return new THREE.CanvasTexture(c); })();
  var shadow = new THREE.Sprite(new THREE.SpriteMaterial({ map: shTex, transparent: true, depthWrite: false, opacity: 0.22 })); shadow.scale.set(2.5, 0.85, 1); scene.add(shadow);

  var BASE_SCALE = 0.62;
  var base = {}; Object.keys(parts).forEach(function (k) { if (parts[k].position && (k === 'head' || k === 'motor' || k === 'battery')) base[k] = parts[k].position.clone(); });
  var EXPLODE = { head: new THREE.Vector3(0, 2.15, 0), motor: new THREE.Vector3(0, 1.65, 0), battery: new THREE.Vector3(0, -2.35, 0) };

  // 数字徽标（拆解页，① head ② motor ③ battery ④ body）
  var badges = [ { key: 'head', n: 1 }, { key: 'motor', n: 2 }, { key: 'battery', n: 3 }, { key: 'body', n: 4 } ];
  var calloutLayer = document.getElementById('callouts');
  if (calloutLayer) badges.forEach(function (b) { var el = document.createElement('div'); el.className = 'badge'; el.textContent = b.n; calloutLayer.appendChild(el); b.el = el; });

  // 每个版块的目标姿态
  var T = [
    { posX: 1.2,  rotX: 0.0,  rotZ: 0.0,  rotY: 0,   cam: 9.4,  explode: 0, spin: true,  headHi: 0, hidden: false },  // hero
    { posX: -1.2, rotX: 0.05, rotZ: 0.0,  rotY: 0,   cam: 8.7,  explode: 0, spin: true,  headHi: 0, hidden: false },  // craft
    { posX: 1.2,  rotX: 0.0,  rotZ: 0.0,  rotY: 0,   cam: 8.7,  explode: 0, spin: true,  headHi: 0, hidden: false },  // color
    { posX: 1.15, rotX: 0.14, rotZ: -0.72,rotY: 0.5, cam: 11.4, explode: 1, spin: false, headHi: 0, hidden: false },  // tech：45° 斜放拆解
    { posX: -1.2, rotX: 0.05, rotZ: 0.0,  rotY: 0,   cam: 8.7,  explode: 0, spin: true,  headHi: 1, hidden: false },  // modes
    { posX: 1.15, rotX: 0.0,  rotZ: 0.0,  rotY: 0,   cam: 9.2,  explode: 0, spin: true,  headHi: 0, hidden: false },  // proof
    { posX: 0.0,  rotX: 0.0,  rotZ: 0.0,  rotY: 0,   cam: 9.4,  explode: 0, spin: false, headHi: 0, hidden: true  }   // buy：隐藏产品
  ];
  window.usmileGoto = function (i) { if (i >= 0 && i < T.length) state.idx = i; };

  var pointer = { down: false, lx: 0, ly: 0 };
  function onDown(e) { if (e.target && e.target.closest && e.target.closest('.no-drag')) return; pointer.down = true; state.down = true; state.autoSpin = false; var p = e.touches ? e.touches[0] : e; pointer.lx = p.clientX; pointer.ly = p.clientY; }
  function onMove(e) { if (!pointer.down) return; var p = e.touches ? e.touches[0] : e, dx = p.clientX - pointer.lx, dy = p.clientY - pointer.ly; pointer.lx = p.clientX; pointer.ly = p.clientY; state.userYaw += dx * 0.008; state.userPitch += dy * 0.006; state.userPitch = Math.max(-0.6, Math.min(0.6, state.userPitch)); state.velY = dx * 0.008; }
  function onUp() { pointer.down = false; state.down = false; setTimeout(function () { if (!pointer.down && !reduceMotion && T[state.idx].spin) state.autoSpin = true; }, 2400); }
  window.addEventListener('mousedown', onDown); window.addEventListener('mousemove', onMove, { passive: true }); window.addEventListener('mouseup', onUp);
  window.addEventListener('touchstart', onDown, { passive: true }); window.addEventListener('touchmove', onMove, { passive: true }); window.addEventListener('touchend', onUp);

  window.usmileSetColor = function (which) { state.theme = which; matBody.userData.target = (which === 'pink' ? COLORS.pink : COLORS.gray).clone(); state.accentTarget = (which === 'pink' ? COLORS.accentPink : COLORS.accent).clone(); };
  matBody.userData.target = COLORS.gray.clone();
  window.usmileHighlight = function (on) { state.highlightHeadHover = on ? 1 : 0; };

  var clock = new THREE.Clock(); var projV = new THREE.Vector3(); var blink = 0, blOn = true;
  function tick() {
    var dt = Math.min(clock.getDelta(), 0.05); var t = T[state.idx]; var s = Math.min(1, dt * 4);

    state.explodeCur += (t.explode - state.explodeCur) * Math.min(1, dt * 5);
    Object.keys(EXPLODE).forEach(function (name) { var pt = parts[name]; if (!pt) return; var off = EXPLODE[name]; pt.position.set(base[name].x + off.x * state.explodeCur, base[name].y + off.y * state.explodeCur, base[name].z + off.z * state.explodeCur); });

    // 自旋 / 定姿
    if (!t.spin) state.autoSpin = false;
    if (state.autoSpin && !pointer.down && t.spin) { state.velY += (0.003 - state.velY) * 0.02; state.userYaw += state.velY; }
    else if (!pointer.down && !t.spin) { state.userYaw += (t.rotY - state.userYaw) * Math.min(1, dt * 3); }
    else if (!pointer.down) { state.velY *= 0.94; state.userYaw += state.velY; }

    state.curRotX += (t.rotX - state.curRotX) * s;
    state.curRotZ += (t.rotZ - state.curRotZ) * s;
    brush.rotation.y = state.userYaw; brush.rotation.x = state.curRotX + state.userPitch; brush.rotation.z = state.curRotZ;
    brush.position.x += (t.posX - brush.position.x) * s;
    brush.position.y += (0 - brush.position.y) * s;
    state.vis += ((t.hidden ? 0 : 1) - state.vis) * Math.min(1, dt * 5); brush.scale.setScalar(BASE_SCALE * state.vis);
    brush.visible = state.vis > 0.02;
    shadow.position.set(brush.position.x, -2.4, 0); shadow.material.opacity = 0.2 * state.vis * (1 - state.explodeCur * 0.7); shadow.visible = state.vis > 0.05;
    camera.position.z += (t.cam - camera.position.z) * s; camera.lookAt(0, 0, 0);

    if (matBody.userData.target) matBody.color.lerp(matBody.userData.target, s);
    state.accent.lerp(state.accentTarget, s); matAccent.emissive.copy(state.accent); matAccent.emissiveIntensity = 1.0 + Math.sin(clock.elapsedTime * 2.2) * 0.28;
    var hi = Math.max(t.headHi, state.highlightHeadHover || 0); matHead.emissive.copy(state.accent).multiplyScalar(hi * 0.4);

    blink += dt; if (blink > 0.5) { blink = 0; blOn = !blOn; drawScreen(blOn); screenTex.needsUpdate = true; }

    // 拆解页数字徽标跟随
    var showBadges = state.idx === 3 && state.explodeCur > 0.5;
    if (calloutLayer) { calloutLayer.style.opacity = showBadges ? Math.min(1, (state.explodeCur - 0.5) / 0.35) : 0;
      if (showBadges) badges.forEach(function (b) { var pt = parts[b.key]; if (!pt) return; pt.getWorldPosition(projV); projV.project(camera); b.el.style.transform = 'translate(' + ((projV.x * 0.5 + 0.5) * window.innerWidth) + 'px,' + ((-projV.y * 0.5 + 0.5) * window.innerHeight) + 'px)'; }); }

    renderer.render(scene, camera); requestAnimationFrame(tick);
  }
  tick();

  window.addEventListener('resize', function () { camera.aspect = window.innerWidth / window.innerHeight; camera.updateProjectionMatrix(); renderer.setSize(window.innerWidth, window.innerHeight); });
  document.body.classList.add('scene-ready');
})();
