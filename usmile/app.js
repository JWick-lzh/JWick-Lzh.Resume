/* =====================================================================
   usmile F20 · 交互式 3D 产品秀 — 全代码渲染（无实拍图）
   手写 Three.js：程序化建模 · PMREM 环境反射 · 滚动伸缩爆炸 · 拖拽 orbit
   作者：林灶辉（自主设计与编码）
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

  // ---- 配色（usmile 语言）----
  var COLORS = {
    gray:  new THREE.Color('#8d9096'),   // 太空灰 阳极氧化铝
    pink:  new THREE.Color('#e7aebe'),   // 冰莓粉
    accent:new THREE.Color('#6aa8ff'),
    accentPink: new THREE.Color('#f3a6c1')
  };
  var state = {
    theme: 'gray',
    explode: 0,          // 0..1 目标爆炸量
    explodeCur: 0,       // 平滑后的爆炸量
    dragging: false,
    autoSpin: !reduceMotion,
    velY: 0.0025,
    userYaw: 0,
    userPitch: 0,
    accent: COLORS.accent.clone(),
    accentTarget: COLORS.accent.clone(),
    highlightHead: 0
  };

  // ---- 渲染器 ----
  var renderer = new THREE.WebGLRenderer({ canvas: host, antialias: true, alpha: true, powerPreference: 'high-performance' });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.06;

  var scene = new THREE.Scene();
  var camera = new THREE.PerspectiveCamera(32, window.innerWidth / window.innerHeight, 0.1, 100);
  camera.position.set(0, 0, 9.2);

  // ---- 程序化环境贴图（棚拍柔光箱）→ PMREM，给金属真实反射 ----
  function makeStudioEnv() {
    var cvs = document.createElement('canvas');
    cvs.width = 512; cvs.height = 256;
    var g = cvs.getContext('2d');
    var grad = g.createLinearGradient(0, 0, 0, 256);
    grad.addColorStop(0.0, '#0a0f1c');
    grad.addColorStop(0.42, '#1a2540');
    grad.addColorStop(0.5, '#dfe8ff');   // 亮带 = 柔光箱
    grad.addColorStop(0.58, '#243252');
    grad.addColorStop(1.0, '#05070d');
    g.fillStyle = grad; g.fillRect(0, 0, 512, 256);
    // 两处冷暖点光
    function glow(x, y, r, col) {
      var rg = g.createRadialGradient(x, y, 0, x, y, r);
      rg.addColorStop(0, col); rg.addColorStop(1, 'rgba(0,0,0,0)');
      g.fillStyle = rg; g.beginPath(); g.arc(x, y, r, 0, Math.PI * 2); g.fill();
    }
    glow(120, 120, 130, 'rgba(120,170,255,0.55)');
    glow(400, 150, 120, 'rgba(255,150,190,0.4)');
    var tex = new THREE.CanvasTexture(cvs);
    tex.mapping = THREE.EquirectangularReflectionMapping;
    tex.colorSpace = THREE.SRGBColorSpace;
    var pmrem = new THREE.PMREMGenerator(renderer);
    var rt = pmrem.fromEquirectangular(tex);
    tex.dispose(); pmrem.dispose();
    return rt.texture;
  }
  scene.environment = makeStudioEnv();

  // ---- 灯光 ----
  var key = new THREE.DirectionalLight(0xffffff, 2.1); key.position.set(4, 6, 6); scene.add(key);
  var rim = new THREE.DirectionalLight(0x6aa8ff, 2.4); rim.position.set(-5, 2, -4); scene.add(rim);
  var warm = new THREE.DirectionalLight(0xf3a6c1, 1.1); warm.position.set(3, -3, -2); scene.add(warm);
  scene.add(new THREE.AmbientLight(0x22304e, 0.6));

  // ---- 材质 ----
  var matBody = new THREE.MeshPhysicalMaterial({
    color: COLORS.gray.clone(), metalness: 0.92, roughness: 0.34,
    clearcoat: 0.7, clearcoatRoughness: 0.28, envMapIntensity: 1.35
  });
  var matJoint = new THREE.MeshPhysicalMaterial({ color: new THREE.Color('#1c2230'), metalness: 0.2, roughness: 0.65, clearcoat: 0.2 });
  var matHead = new THREE.MeshPhysicalMaterial({ color: new THREE.Color('#f4f6fb'), metalness: 0.0, roughness: 0.5, clearcoat: 0.5, clearcoatRoughness: 0.3, envMapIntensity: 1.0 });
  var matMotor = new THREE.MeshStandardMaterial({ color: new THREE.Color('#c9d2e0'), metalness: 1.0, roughness: 0.28, envMapIntensity: 1.4 });
  var matCoil = new THREE.MeshStandardMaterial({ color: new THREE.Color('#c97b3c'), metalness: 0.9, roughness: 0.35, emissive: new THREE.Color('#b8621f'), emissiveIntensity: 0.35 });
  var matBattery = new THREE.MeshStandardMaterial({ color: new THREE.Color('#12324a'), metalness: 0.6, roughness: 0.4 });
  var matBattBand = new THREE.MeshStandardMaterial({ color: new THREE.Color('#2ee6b6'), metalness: 0.3, roughness: 0.4, emissive: new THREE.Color('#1fae89'), emissiveIntensity: 0.4 });
  var matAccent = new THREE.MeshStandardMaterial({ color: 0x101725, metalness: 0.4, roughness: 0.4, emissive: state.accent.clone(), emissiveIntensity: 1.4 });

  // ---- 模型组 ----
  var brush = new THREE.Group();
  scene.add(brush);
  var parts = {};

  // 机身：LatheGeometry 优雅锥形
  (function buildBody() {
    var p = [];
    function v(r, y) { p.push(new THREE.Vector2(r, y)); }
    v(0.00, -2.05); v(0.30, -2.05); v(0.46, -1.92); v(0.52, -1.6);
    v(0.51, -1.0); v(0.49, -0.2); v(0.47, 0.6); v(0.44, 1.2);
    v(0.40, 1.7); v(0.34, 1.95); v(0.30, 2.05); v(0.00, 2.05);
    var geo = new THREE.LatheGeometry(p, 96);
    geo.computeVertexNormals();
    var body = new THREE.Mesh(geo, matBody);
    parts.body = body; brush.add(body);

    // LED 环（点缀发光）
    var led = new THREE.Mesh(new THREE.TorusGeometry(0.42, 0.028, 16, 80), matAccent);
    led.position.y = 1.35; led.rotation.x = Math.PI / 2;
    body.add(led); parts.led = led;

    // 电源按钮（发光圆）
    var btn = new THREE.Mesh(new THREE.CircleGeometry(0.13, 40), matAccent);
    btn.position.set(0, 0.55, 0.5); btn.lookAt(0, 0.55, 3);
    body.add(btn); parts.button = btn;
    var btnRing = new THREE.Mesh(new THREE.RingGeometry(0.15, 0.175, 40), matAccent);
    btnRing.position.copy(btn.position); btnRing.quaternion.copy(btn.quaternion);
    body.add(btnRing);
  })();

  // 缓震颈（类关节）
  (function buildJoint() {
    var joint = new THREE.Mesh(new THREE.CylinderGeometry(0.24, 0.28, 0.4, 48), matJoint);
    joint.position.y = 2.25;
    parts.joint = joint; brush.add(joint);
  })();

  // 精控动力马达（内藏，爆炸时上移露出）
  (function buildMotor() {
    var motor = new THREE.Group();
    var core = new THREE.Mesh(new THREE.CylinderGeometry(0.23, 0.23, 0.7, 40), matMotor);
    motor.add(core);
    for (var i = 0; i < 5; i++) {
      var coil = new THREE.Mesh(new THREE.TorusGeometry(0.235, 0.028, 12, 40), matCoil);
      coil.rotation.x = Math.PI / 2; coil.position.y = -0.24 + i * 0.12;
      motor.add(coil);
    }
    motor.position.y = 1.15;
    parts.motor = motor; brush.add(motor);
  })();

  // 电池（内藏，爆炸时下移露出）
  (function buildBattery() {
    var batt = new THREE.Group();
    var cyl = new THREE.Mesh(new THREE.CylinderGeometry(0.32, 0.32, 0.95, 40), matBattery);
    batt.add(cyl);
    var band = new THREE.Mesh(new THREE.CylinderGeometry(0.322, 0.322, 0.16, 40), matBattBand);
    band.position.y = 0.18; batt.add(band);
    var cap = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.12, 0.08, 24), matBattBand);
    cap.position.y = 0.52; batt.add(cap);
    batt.position.y = -0.85;
    parts.battery = batt; brush.add(batt);
  })();

  // 刷头 + 刷毛（InstancedMesh）
  (function buildHead() {
    var head = new THREE.Group();
    var neck = new THREE.Mesh(new THREE.CylinderGeometry(0.11, 0.13, 0.5, 32), matHead);
    neck.position.y = -0.15; head.add(neck);
    var pad = new THREE.Mesh(new THREE.CapsuleGeometry(0.17, 0.34, 8, 24), matHead);
    pad.rotation.z = Math.PI / 2; pad.scale.set(1, 1, 0.5); pad.position.y = 0.22;
    head.add(pad);

    // 刷毛
    var rows = 5, cols = 9, count = rows * cols;
    var bg = new THREE.CylinderGeometry(0.018, 0.024, 0.26, 6);
    var bm = new THREE.MeshStandardMaterial({ roughness: 0.7, metalness: 0.0, vertexColors: false });
    var inst = new THREE.InstancedMesh(bg, bm, count);
    var m = new THREE.Matrix4(); var idx = 0;
    var tipBlue = new THREE.Color('#6aa8ff'); var white = new THREE.Color('#f6f8ff');
    for (var r = 0; r < rows; r++) {
      for (var c = 0; c < cols; c++) {
        var x = (r - (rows - 1) / 2) * 0.06;
        var z = (c - (cols - 1) / 2) * 0.062;
        var h = 0.24 + Math.random() * 0.05;
        m.makeTranslation(x, 0.42, z);
        inst.setMatrixAt(idx, m);
        inst.setColorAt(idx, (r + c) % 3 === 0 ? tipBlue : white);
        idx++;
      }
    }
    inst.instanceMatrix.needsUpdate = true;
    if (inst.instanceColor) inst.instanceColor.needsUpdate = true;
    parts.bristles = inst; head.add(inst);

    head.position.y = 2.95;
    parts.head = head; brush.add(head);
  })();

  // 整体缩放，保证爆炸后完整入镜
  brush.scale.setScalar(0.62);

  // 爆炸基准位（沿轴伸缩成清晰的分层堆叠）
  var base = {};
  Object.keys(parts).forEach(function (k) {
    if (parts[k].position) base[k] = parts[k].position.clone();
  });
  // 目标：刷头(顶) → 缓震颈 → 精控动力马达(浮出机身顶) → 机身(中) → 电池(落出机身底)
  var EXPLODE = {
    head:   new THREE.Vector3(0, 2.0, 0),
    joint:  new THREE.Vector3(0, 1.5, 0),
    motor:  new THREE.Vector3(0, 1.7, 0),
    battery:new THREE.Vector3(0, -2.45, 0)
  };

  // 标注锚点（投屏用）
  var callouts = [
    { key: 'head',    el: null, label: '小雷达刷头 · 6区16面' },
    { key: 'joint',   el: null, label: '类关节缓震' },
    { key: 'motor',   el: null, label: '精控动力 2.0' },
    { key: 'battery', el: null, label: '110 天长续航' }
  ];
  var calloutLayer = document.getElementById('callouts');
  callouts.forEach(function (co) {
    var el = document.createElement('div');
    el.className = 'callout';
    el.innerHTML = '<span class="co-dot"></span><span class="co-text">' + co.label + '</span>';
    calloutLayer.appendChild(el); co.el = el;
  });

  // ---- 相机/构图关键帧（由全局滚动进度驱动）----
  // 每帧字段：posX(模型横移) rotX(俯仰) cam(相机z) explode(爆炸) headHi(刷头高亮)
  var KEYS = [
    { at: 0.00, posX: 0.0,  rotX: 0.0,  cam: 9.2,  explode: 0, headHi: 0 },
    { at: 0.15, posX: 0.0,  rotX: 0.05, cam: 8.4,  explode: 0, headHi: 0 },
    { at: 0.30, posX: 1.7,  rotX: 0.0,  cam: 8.6,  explode: 0, headHi: 0 },  // 双色，模型偏右
    { at: 0.46, posX: 0.0,  rotX: 0.0,  cam: 11.0, explode: 1, headHi: 0 },  // 爆炸拆解 起
    { at: 0.60, posX: 0.0,  rotX: 0.0,  cam: 11.0, explode: 1, headHi: 0 },  // 爆炸拆解 保持
    { at: 0.73, posX: -1.6, rotX: 0.05, cam: 8.8,  explode: 0, headHi: 1 },  // 四大方案，刷头高亮
    { at: 0.88, posX: 1.4,  rotX: 0.0,  cam: 9.4,  explode: 0, headHi: 0 },  // 数据，偏右
    { at: 1.00, posX: 0.0,  rotX: 0.0,  cam: 9.0,  explode: 0, headHi: 0 }   // 收尾居中
  ];
  function sampleKeys(t) {
    var a = KEYS[0], b = KEYS[KEYS.length - 1];
    for (var i = 0; i < KEYS.length - 1; i++) {
      if (t >= KEYS[i].at && t <= KEYS[i + 1].at) { a = KEYS[i]; b = KEYS[i + 1]; break; }
    }
    var span = (b.at - a.at) || 1;
    var f = (t - a.at) / span; f = Math.max(0, Math.min(1, f));
    f = f * f * (3 - 2 * f); // smoothstep
    return {
      posX: a.posX + (b.posX - a.posX) * f,
      rotX: a.rotX + (b.rotX - a.rotX) * f,
      cam:  a.cam + (b.cam - a.cam) * f,
      explode: a.explode + (b.explode - a.explode) * f,
      headHi: a.headHi + (b.headHi - a.headHi) * f
    };
  }

  var scrollProgress = 0;
  function updateScroll() {
    var max = document.body.scrollHeight - window.innerHeight;
    scrollProgress = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
  }
  window.addEventListener('scroll', updateScroll, { passive: true });
  updateScroll();

  // ---- 拖拽 orbit ----
  var pointer = { down: false, lx: 0, ly: 0 };
  function onDown(e) {
    if (e.target && e.target.closest && e.target.closest('.no-drag')) return;
    pointer.down = true; state.dragging = true; state.autoSpin = false;
    var p = e.touches ? e.touches[0] : e;
    pointer.lx = p.clientX; pointer.ly = p.clientY;
    document.body.classList.add('grabbing');
  }
  function onMove(e) {
    if (!pointer.down) return;
    var p = e.touches ? e.touches[0] : e;
    var dx = p.clientX - pointer.lx, dy = p.clientY - pointer.ly;
    pointer.lx = p.clientX; pointer.ly = p.clientY;
    state.userYaw += dx * 0.008;
    state.userPitch += dy * 0.006;
    state.userPitch = Math.max(-0.6, Math.min(0.6, state.userPitch));
    state.velY = dx * 0.008;
  }
  function onUp() {
    pointer.down = false; state.dragging = false;
    document.body.classList.remove('grabbing');
    setTimeout(function () { if (!pointer.down && !reduceMotion) state.autoSpin = true; }, 2600);
  }
  window.addEventListener('mousedown', onDown);
  window.addEventListener('mousemove', onMove, { passive: true });
  window.addEventListener('mouseup', onUp);
  window.addEventListener('touchstart', onDown, { passive: true });
  window.addEventListener('touchmove', onMove, { passive: true });
  window.addEventListener('touchend', onUp);

  // ---- 颜色切换（对外 API）----
  window.usmileSetColor = function (which) {
    state.theme = which;
    var target = which === 'pink' ? COLORS.pink : COLORS.gray;
    matBody.userData.target = target.clone();
    state.accentTarget = (which === 'pink' ? COLORS.accentPink : COLORS.accent).clone();
  };
  matBody.userData.target = COLORS.gray.clone();

  // ---- 刷头高亮（四大方案 hover）----
  window.usmileHighlight = function (on) { state.highlightHeadHover = on ? 1 : 0; };

  // ---- 主循环 ----
  var clock = new THREE.Clock();
  var projV = new THREE.Vector3();
  function tick() {
    var dt = Math.min(clock.getDelta(), 0.05);
    var k = sampleKeys(scrollProgress);

    // 平滑爆炸
    state.explodeCur += (k.explode - state.explodeCur) * Math.min(1, dt * 6);
    Object.keys(EXPLODE).forEach(function (name) {
      var pt = parts[name]; if (!pt) return;
      var off = EXPLODE[name];
      pt.position.set(
        base[name].x + off.x * state.explodeCur,
        base[name].y + off.y * state.explodeCur,
        base[name].z + off.z * state.explodeCur
      );
    });

    // 自动旋转 + 惯性 + 用户拖拽
    if (state.autoSpin && !pointer.down) {
      state.velY += (0.0032 - state.velY) * 0.02;
      state.userYaw += state.velY;
    } else if (!pointer.down) {
      state.velY *= 0.94; state.userYaw += state.velY;
    }
    brush.rotation.y = state.userYaw;
    brush.rotation.x = k.rotX + state.userPitch;
    brush.position.x += (k.posX - brush.position.x) * Math.min(1, dt * 4);
    // 爆炸时整体下移，把向上更长的拆解堆叠重新框正
    var targetY = -0.55 * state.explodeCur;
    brush.position.y += (targetY - brush.position.y) * Math.min(1, dt * 4);

    camera.position.z += (k.cam - camera.position.z) * Math.min(1, dt * 4);
    camera.lookAt(0, 0, 0);

    // 机身材质渐变到目标色
    if (matBody.userData.target) matBody.color.lerp(matBody.userData.target, Math.min(1, dt * 4));
    state.accent.lerp(state.accentTarget, Math.min(1, dt * 4));
    matAccent.emissive.copy(state.accent);
    // LED 呼吸
    var pulse = 1.1 + Math.sin(clock.elapsedTime * 2.2) * 0.35;
    matAccent.emissiveIntensity = pulse;

    // 刷头高亮（方案区 or hover）
    var hi = Math.max(k.headHi, state.highlightHeadHover || 0);
    matHead.emissive = matHead.emissive || new THREE.Color(0x000000);
    matHead.emissive.copy(state.accent).multiplyScalar(hi * 0.5);

    // 标注投屏（爆炸时显示）
    var show = state.explodeCur > 0.35;
    calloutLayer.style.opacity = show ? Math.min(1, (state.explodeCur - 0.35) / 0.4) : 0;
    if (show) {
      callouts.forEach(function (co) {
        var pt = parts[co.key]; if (!pt) return;
        pt.getWorldPosition(projV);
        projV.project(camera);
        var x = (projV.x * 0.5 + 0.5) * window.innerWidth;
        var y = (-projV.y * 0.5 + 0.5) * window.innerHeight;
        co.el.style.transform = 'translate(' + x + 'px,' + y + 'px)';
      });
    }

    renderer.render(scene, camera);
    requestAnimationFrame(tick);
  }
  tick();

  // ---- resize ----
  window.addEventListener('resize', function () {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });

  // 就绪：移除加载态
  document.body.classList.add('scene-ready');
})();
