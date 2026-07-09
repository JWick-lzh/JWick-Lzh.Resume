/* =====================================================================
   智能牙刷 — 交互式 3D 产品展示
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
  if (!window.THREE || !supportsWebGL) { document.body.classList.add('no-webgl'); return; }

  var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  var COLORS = {
    gray:  new THREE.Color('#9a9ea6'),
    pink:  new THREE.Color('#eab6c6'),
    accent:new THREE.Color('#2b7bff'),
    accentPink: new THREE.Color('#ff85ab')
  };
  var state = {
    theme: 'gray', sp: 0, explodeCur: 0,
    dragging: false, moved: 0, autoSpin: !reduceMotion, velY: 0.0028,
    userYaw: 0, userPitch: 0,
    accent: COLORS.accent.clone(), accentTarget: COLORS.accent.clone(),
    highlightHeadHover: 0, hoverKey: null
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

  function makeStudioEnv() {
    var cvs = document.createElement('canvas'); cvs.width = 512; cvs.height = 256;
    var g = cvs.getContext('2d');
    var grad = g.createLinearGradient(0, 0, 0, 256);
    grad.addColorStop(0.0, '#ffffff'); grad.addColorStop(0.4, '#eef4fc'); grad.addColorStop(0.5, '#ffffff');
    grad.addColorStop(0.62, '#dfe8f5'); grad.addColorStop(1.0, '#c3ccd8');
    g.fillStyle = grad; g.fillRect(0, 0, 512, 256);
    function glow(x, y, r, col) { var rg = g.createRadialGradient(x, y, 0, x, y, r); rg.addColorStop(0, col); rg.addColorStop(1, 'rgba(255,255,255,0)'); g.fillStyle = rg; g.beginPath(); g.arc(x, y, r, 0, Math.PI * 2); g.fill(); }
    glow(120, 90, 120, 'rgba(120,170,255,0.28)'); glow(400, 120, 120, 'rgba(255,150,190,0.22)');
    var tex = new THREE.CanvasTexture(cvs); tex.mapping = THREE.EquirectangularReflectionMapping; tex.colorSpace = THREE.SRGBColorSpace;
    var pmrem = new THREE.PMREMGenerator(renderer); var rt = pmrem.fromEquirectangular(tex);
    tex.dispose(); pmrem.dispose(); return rt.texture;
  }
  scene.environment = makeStudioEnv();

  var keyL = new THREE.DirectionalLight(0xffffff, 2.3); keyL.position.set(4, 6, 6); scene.add(keyL);
  var rimL = new THREE.DirectionalLight(0xbcd4ff, 1.6); rimL.position.set(-5, 2, -4); scene.add(rimL);
  var warmL = new THREE.DirectionalLight(0xffd6e4, 0.9); warmL.position.set(3, -3, -2); scene.add(warmL);
  scene.add(new THREE.AmbientLight(0xffffff, 0.55));

  var matBody = new THREE.MeshPhysicalMaterial({ color: COLORS.gray.clone(), metalness: 0.9, roughness: 0.3, clearcoat: 0.8, clearcoatRoughness: 0.22, envMapIntensity: 1.55 });
  var matShaft = new THREE.MeshStandardMaterial({ color: new THREE.Color('#dfe4ea'), metalness: 1.0, roughness: 0.2, envMapIntensity: 1.7 });
  var matHead = new THREE.MeshPhysicalMaterial({ color: new THREE.Color('#ffffff'), metalness: 0.0, roughness: 0.4, clearcoat: 0.6, clearcoatRoughness: 0.26, envMapIntensity: 1.1 });
  matHead.emissive = new THREE.Color(0x000000);
  var matTrim = new THREE.MeshStandardMaterial({ color: new THREE.Color('#11151c'), metalness: 0.5, roughness: 0.45 });
  var matMotor = new THREE.MeshStandardMaterial({ color: new THREE.Color('#d3dae5'), metalness: 1.0, roughness: 0.24, envMapIntensity: 1.5 });
  var matCoil = new THREE.MeshStandardMaterial({ color: new THREE.Color('#cf7f3f'), metalness: 0.9, roughness: 0.34, emissive: new THREE.Color('#b8621f'), emissiveIntensity: 0.3 });
  var matBattery = new THREE.MeshStandardMaterial({ color: new THREE.Color('#20415c'), metalness: 0.5, roughness: 0.4 });
  var matBattBand = new THREE.MeshStandardMaterial({ color: new THREE.Color('#2ee6b6'), metalness: 0.3, roughness: 0.4, emissive: new THREE.Color('#1fae89'), emissiveIntensity: 0.35 });
  var matAccent = new THREE.MeshStandardMaterial({ color: 0xdfe8f5, metalness: 0.3, roughness: 0.4, emissive: state.accent.clone(), emissiveIntensity: 1.1 });

  // ---- OLED 智能小屏（CanvasTexture）----
  var screenCvs = document.createElement('canvas'); screenCvs.width = 240; screenCvs.height = 300;
  var sg = screenCvs.getContext('2d');
  function drawScreen(colonOn) {
    var w = 240, h = 300; sg.clearRect(0, 0, w, h);
    sg.fillStyle = '#060b14'; roundRect(sg, 0, 0, w, h, 26); sg.fill();
    // 顶部：模式 + 电量
    sg.fillStyle = '#7fd6ff'; sg.font = '700 26px system-ui,sans-serif'; sg.textBaseline = 'top';
    sg.fillText('护理模式', 22, 22);
    // 电量条
    sg.strokeStyle = 'rgba(255,255,255,.5)'; sg.lineWidth = 3; roundRect(sg, 150, 26, 52, 22, 5); sg.stroke();
    sg.fillStyle = '#3ee0a0'; roundRect(sg, 154, 30, 38, 14, 3); sg.fill();
    sg.fillStyle = 'rgba(255,255,255,.55)'; sg.font = '600 15px system-ui'; sg.fillText('86%', 150, 54);
    // 中部：计时
    sg.fillStyle = '#ffffff'; sg.font = '800 92px system-ui'; sg.textAlign = 'center';
    sg.fillText('2' + (colonOn ? ':' : ' ') + '00', w / 2, 108);
    sg.textAlign = 'left';
    // 声波条
    sg.fillStyle = '#2b7bff';
    for (var i = 0; i < 9; i++) { var bh = 12 + Math.abs(Math.sin(i * 0.9)) * 34; sg.globalAlpha = 0.5 + 0.5 * Math.abs(Math.sin(i)); roundRect(sg, 34 + i * 19, 250 - bh, 10, bh, 4); sg.fill(); }
    sg.globalAlpha = 1;
  }
  function roundRect(c, x, y, w, h, r) { c.beginPath(); c.moveTo(x + r, y); c.arcTo(x + w, y, x + w, y + h, r); c.arcTo(x + w, y + h, x, y + h, r); c.arcTo(x, y + h, x, y, r); c.arcTo(x, y, x + w, y, r); c.closePath(); }
  drawScreen(true);
  var screenTex = new THREE.CanvasTexture(screenCvs); screenTex.colorSpace = THREE.SRGBColorSpace;
  var matScreen = new THREE.MeshBasicMaterial({ map: screenTex });

  var brush = new THREE.Group(); scene.add(brush);
  var parts = {};

  // 机身 + 驱动轴 + 智能屏 + 底部装饰环
  (function buildBody() {
    var p = [];
    function v(r, y) { p.push(new THREE.Vector2(r, y)); }
    v(0.00, -2.08); v(0.28, -2.08); v(0.44, -1.96); v(0.5, -1.62);
    v(0.49, -1.0); v(0.475, -0.2); v(0.46, 0.6); v(0.43, 1.2);
    v(0.39, 1.72); v(0.31, 1.98); v(0.24, 2.06); v(0.00, 2.06);
    var geo = new THREE.LatheGeometry(p, 128); geo.computeVertexNormals();
    var body = new THREE.Mesh(geo, matBody); body.userData.partKey = 'body';
    parts.body = body; brush.add(body);

    var shaft = new THREE.Mesh(new THREE.CylinderGeometry(0.082, 0.098, 0.64, 32), matShaft);
    shaft.position.y = 2.33; body.add(shaft);

    // 底部装饰环
    var ring = new THREE.Mesh(new THREE.TorusGeometry(0.4, 0.03, 18, 90), matAccent);
    ring.position.y = -1.55; ring.rotation.x = Math.PI / 2; body.add(ring); parts.led = ring;

    // 智能 OLED 小屏（略微外凸，正面朝 +z）
    var bezel = new THREE.Mesh(new THREE.PlaneGeometry(0.4, 0.5), matTrim);
    bezel.position.set(0, 1.28, 0.472); body.add(bezel);
    var screen = new THREE.Mesh(new THREE.PlaneGeometry(0.34, 0.44), matScreen);
    screen.position.set(0, 1.28, 0.476); body.add(screen); parts.screen = screen;

    // 电源按钮（屏下）
    var btn = new THREE.Mesh(new THREE.CircleGeometry(0.075, 32), matAccent);
    btn.position.set(0, 0.82, 0.47); body.add(btn);
  })();

  (function buildMotor() {
    var motor = new THREE.Group(); motor.userData.partKey = 'motor';
    motor.add(new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.22, 0.72, 44), matMotor));
    for (var i = 0; i < 5; i++) { var coil = new THREE.Mesh(new THREE.TorusGeometry(0.225, 0.026, 12, 44), matCoil); coil.rotation.x = Math.PI / 2; coil.position.y = -0.24 + i * 0.12; motor.add(coil); }
    motor.position.y = 1.1; parts.motor = motor; brush.add(motor);
  })();

  (function buildBattery() {
    var batt = new THREE.Group(); batt.userData.partKey = 'battery';
    batt.add(new THREE.Mesh(new THREE.CylinderGeometry(0.32, 0.32, 0.96, 44), matBattery));
    var band = new THREE.Mesh(new THREE.CylinderGeometry(0.322, 0.322, 0.16, 44), matBattBand); band.position.y = 0.18; batt.add(band);
    var cap = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.12, 0.08, 24), matBattBand); cap.position.y = 0.52; batt.add(cap);
    batt.position.y = -0.85; parts.battery = batt; brush.add(batt);
  })();

  (function buildHead() {
    var head = new THREE.Group(); head.userData.partKey = 'head';
    var neck = new THREE.Mesh(new THREE.CylinderGeometry(0.112, 0.132, 0.56, 36), matHead); head.add(neck);
    var pad = new THREE.Mesh(new THREE.CapsuleGeometry(0.17, 0.34, 10, 28), matHead);
    pad.rotation.z = Math.PI / 2; pad.scale.set(1, 1, 0.5); pad.position.y = 0.46; head.add(pad);
    var rows = 5, cols = 9, count = rows * cols;
    var inst = new THREE.InstancedMesh(new THREE.CylinderGeometry(0.018, 0.024, 0.26, 6), new THREE.MeshStandardMaterial({ roughness: 0.7, metalness: 0.0 }), count);
    var m = new THREE.Matrix4(), idx = 0, tipBlue = new THREE.Color('#3b8bff'), white = new THREE.Color('#f2f6ff');
    for (var r = 0; r < rows; r++) for (var c = 0; c < cols; c++) { var x = (r - 2) * 0.06, z = (c - 4) * 0.062; m.makeTranslation(x, 0.66, z); inst.setMatrixAt(idx, m); inst.setColorAt(idx, (r + c) % 3 === 0 ? tipBlue : white); idx++; }
    inst.instanceMatrix.needsUpdate = true; if (inst.instanceColor) inst.instanceColor.needsUpdate = true;
    head.add(inst); head.position.y = 2.25; parts.head = head; brush.add(head);
  })();

  brush.scale.setScalar(0.62);

  var base = {};
  Object.keys(parts).forEach(function (k) { if (parts[k].position && (k === 'head' || k === 'motor' || k === 'battery')) base[k] = parts[k].position.clone(); });
  var EXPLODE = { head: new THREE.Vector3(0, 2.0, 0), motor: new THREE.Vector3(0, 1.75, 0), battery: new THREE.Vector3(0, -2.3, 0) };

  // 交替左右（zig-zag）；tech 幕居中拆解
  var KEYS = [
    { at: 0.00, posX: 0.0,  rotX: 0.0,  cam: 9.2,  explode: 0, headHi: 0 },
    { at: 0.14, posX: 1.7,  rotX: 0.04, cam: 8.5,  explode: 0, headHi: 0 },  // 工艺：产品右
    { at: 0.30, posX: -1.7, rotX: 0.0,  cam: 8.6,  explode: 0, headHi: 0 },  // 双色：产品左
    { at: 0.46, posX: 0.0,  rotX: 0.0,  cam: 11.0, explode: 1, headHi: 0 },  // 拆解：居中
    { at: 0.60, posX: 0.0,  rotX: 0.0,  cam: 11.0, explode: 1, headHi: 0 },
    { at: 0.73, posX: 1.6,  rotX: 0.04, cam: 8.8,  explode: 0, headHi: 1 },  // 方案：产品右
    { at: 0.88, posX: -1.6, rotX: 0.0,  cam: 9.2,  explode: 0, headHi: 0 },  // 数据：产品左
    { at: 1.00, posX: 0.0,  rotX: 0.0,  cam: 9.0,  explode: 0, headHi: 0 }
  ];
  function sampleKeys(t) {
    var a = KEYS[0], b = KEYS[KEYS.length - 1];
    for (var i = 0; i < KEYS.length - 1; i++) if (t >= KEYS[i].at && t <= KEYS[i + 1].at) { a = KEYS[i]; b = KEYS[i + 1]; break; }
    var span = (b.at - a.at) || 1, f = Math.max(0, Math.min(1, (t - a.at) / span)); f = f * f * (3 - 2 * f);
    return { posX: a.posX + (b.posX - a.posX) * f, rotX: a.rotX + (b.rotX - a.rotX) * f, cam: a.cam + (b.cam - a.cam) * f, explode: a.explode + (b.explode - a.explode) * f, headHi: a.headHi + (b.headHi - a.headHi) * f };
  }

  var scrollTarget = 0;
  function updateScroll() { var max = document.body.scrollHeight - window.innerHeight; scrollTarget = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0; }
  window.addEventListener('scroll', updateScroll, { passive: true }); updateScroll(); state.sp = scrollTarget;

  // ---- 拖拽 + 点击零件 ----
  var pointer = { down: false, lx: 0, ly: 0, sx: 0, sy: 0 };
  var ray = new THREE.Raycaster(); var ndc = new THREE.Vector2();
  function partAt(clientX, clientY) {
    ndc.x = (clientX / window.innerWidth) * 2 - 1; ndc.y = -(clientY / window.innerHeight) * 2 + 1;
    ray.setFromCamera(ndc, camera);
    var hits = ray.intersectObjects(brush.children, true);
    for (var i = 0; i < hits.length; i++) { var o = hits[i].object; while (o && o !== brush) { if (o.userData && o.userData.partKey) return o.userData.partKey; o = o.parent; } }
    return null;
  }
  function onDown(e) {
    if (e.target && e.target.closest && e.target.closest('.no-drag')) return;
    pointer.down = true; state.dragging = true; state.autoSpin = false; state.moved = 0;
    var p = e.touches ? e.touches[0] : e; pointer.lx = pointer.sx = p.clientX; pointer.ly = pointer.sy = p.clientY;
  }
  function onMove(e) {
    var p = e.touches ? e.touches[0] : e;
    if (pointer.down) {
      var dx = p.clientX - pointer.lx, dy = p.clientY - pointer.ly; pointer.lx = p.clientX; pointer.ly = p.clientY;
      state.moved += Math.abs(dx) + Math.abs(dy);
      state.userYaw += dx * 0.008; state.userPitch += dy * 0.006;
      state.userPitch = Math.max(-0.6, Math.min(0.6, state.userPitch)); state.velY = dx * 0.008;
    } else if (state.explodeCur > 0.5 && !e.touches) {
      var k = partAt(p.clientX, p.clientY); state.hoverKey = k; host.style.cursor = k ? 'pointer' : 'default';
    }
  }
  function onUp(e) {
    if (pointer.down && state.moved < 6) {
      var p = e.changedTouches ? e.changedTouches[0] : e;
      if (state.explodeCur > 0.5) { var k = partAt(p.clientX, p.clientY); if (k && window.usmileShowPart) window.usmileShowPart(k, p.clientX, p.clientY); else if (window.usmileHidePart) window.usmileHidePart(); }
    }
    pointer.down = false; state.dragging = false;
    setTimeout(function () { if (!pointer.down && !reduceMotion) state.autoSpin = true; }, 2600);
  }
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
  // 供页面查询：当前是否处于可点击拆解态、某零件屏幕坐标
  window.usmilePartScreen = function (key) {
    var pt = parts[key]; if (!pt) return null; var v = new THREE.Vector3(); pt.getWorldPosition(v); v.project(camera);
    return { x: (v.x * 0.5 + 0.5) * window.innerWidth, y: (-v.y * 0.5 + 0.5) * window.innerHeight, exploded: state.explodeCur > 0.5 };
  };

  var clock = new THREE.Clock(); var blink = 0, blOn = true;
  function tick() {
    var dt = Math.min(clock.getDelta(), 0.05);
    // 平滑滚动进度（丝滑）
    state.sp += (scrollTarget - state.sp) * Math.min(1, dt * 5);
    var k = sampleKeys(state.sp);

    state.explodeCur += (k.explode - state.explodeCur) * Math.min(1, dt * 6);
    Object.keys(EXPLODE).forEach(function (name) { var pt = parts[name]; if (!pt) return; var off = EXPLODE[name]; pt.position.set(base[name].x + off.x * state.explodeCur, base[name].y + off.y * state.explodeCur, base[name].z + off.z * state.explodeCur); });

    if (state.autoSpin && !pointer.down) { state.velY += (0.0032 - state.velY) * 0.02; state.userYaw += state.velY; }
    else if (!pointer.down) { state.velY *= 0.94; state.userYaw += state.velY; }
    brush.rotation.y = state.userYaw;
    brush.rotation.x = k.rotX + state.userPitch;
    brush.position.x += (k.posX - brush.position.x) * Math.min(1, dt * 4.5);
    brush.position.y += ((-0.55 * state.explodeCur) - brush.position.y) * Math.min(1, dt * 4.5);
    camera.position.z += (k.cam - camera.position.z) * Math.min(1, dt * 4.5);
    camera.lookAt(0, 0, 0);

    if (matBody.userData.target) matBody.color.lerp(matBody.userData.target, Math.min(1, dt * 4));
    state.accent.lerp(state.accentTarget, Math.min(1, dt * 4));
    matAccent.emissive.copy(state.accent); matAccent.emissiveIntensity = 1.0 + Math.sin(clock.elapsedTime * 2.2) * 0.28;
    var hi = Math.max(k.headHi, state.highlightHeadHover || 0); matHead.emissive.copy(state.accent).multiplyScalar(hi * 0.4);

    // 屏幕计时冒号闪烁
    blink += dt; if (blink > 0.5) { blink = 0; blOn = !blOn; drawScreen(blOn); screenTex.needsUpdate = true; }

    // 拆解态时通知页面刷新零件说明卡锚点
    if (window.usmileTickAnchors) window.usmileTickAnchors();

    renderer.render(scene, camera);
    requestAnimationFrame(tick);
  }
  tick();

  window.addEventListener('resize', function () { camera.aspect = window.innerWidth / window.innerHeight; camera.updateProjectionMatrix(); renderer.setSize(window.innerWidth, window.innerHeight); });
  document.body.classList.add('scene-ready');
})();
