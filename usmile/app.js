/* =====================================================================
   智能牙刷 — 暗色沉浸式官网
   A. App     写实 3D（模型/材质/布光/换色/爆炸/屏幕）
   B. Journey 连续运镜（ScrollTrigger scrub + snap + 章节轨）
   C. 交互层  换色扫描/模式卡/数字/标注线/视差/光标/粒子/loader
   D. 兜底    reduced-motion / no-WebGL / 移动端 / resize
   ===================================================================== */
(function () {
  'use strict';

  var supportsWebGL = (function () {
    try { var c = document.createElement('canvas'); return !!(window.WebGLRenderingContext && (c.getContext('webgl') || c.getContext('experimental-webgl'))); }
    catch (e) { return false; }
  })();
  if (!window.THREE || !supportsWebGL) { document.body.classList.add('no-webgl'); return; }

  var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var isTouch = window.matchMedia && window.matchMedia('(hover: none)').matches;
  var ICE = '#6ee7ff';

  /* ============================================================
     A. App — 写实 3D
     ============================================================ */
  var App = (function () {
    var host = document.getElementById('stage');
    var renderer = new THREE.WebGLRenderer({ canvas: host, antialias: true, alpha: true, powerPreference: 'high-performance' });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.05;

    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(30, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.set(0, 0.2, 9.4);

    /* ---- 暗场影棚环境贴图：深灰底 + 两条竖向柔光条 + 顶部冷光 ---- */
    function makeDarkStudioEnv() {
      var cvs = document.createElement('canvas'); cvs.width = 512; cvs.height = 256;
      var g = cvs.getContext('2d');
      var grad = g.createLinearGradient(0, 0, 0, 256);
      grad.addColorStop(0, '#3a4048'); grad.addColorStop(0.42, '#14161c');
      grad.addColorStop(0.62, '#0b0c10'); grad.addColorStop(1, '#050608');
      g.fillStyle = grad; g.fillRect(0, 0, 512, 256);
      function strip(x, w, col) {
        var rg = g.createLinearGradient(x - w, 0, x + w, 0);
        rg.addColorStop(0, 'rgba(0,0,0,0)'); rg.addColorStop(0.5, col); rg.addColorStop(1, 'rgba(0,0,0,0)');
        g.fillStyle = rg; g.fillRect(x - w, 10, w * 2, 200);
      }
      strip(120, 26, 'rgba(235,242,250,0.85)');   /* 主柔光条（冷白） */
      strip(390, 34, 'rgba(110,180,220,0.35)');   /* 副柔光条（冰蓝弱） */
      var top = g.createRadialGradient(256, 0, 0, 256, 0, 180);
      top.addColorStop(0, 'rgba(150,200,235,0.5)'); top.addColorStop(1, 'rgba(0,0,0,0)');
      g.fillStyle = top; g.beginPath(); g.arc(256, 0, 180, 0, Math.PI * 2); g.fill();
      var tex = new THREE.CanvasTexture(cvs);
      tex.mapping = THREE.EquirectangularReflectionMapping; tex.colorSpace = THREE.SRGBColorSpace;
      var pmrem = new THREE.PMREMGenerator(renderer);
      var rt = pmrem.fromEquirectangular(tex); tex.dispose(); pmrem.dispose();
      return rt.texture;
    }
    scene.environment = makeDarkStudioEnv();

    /* ---- 暗场三点布光 ---- */
    var keyL = new THREE.DirectionalLight(0xf4f7fb, 2.0); keyL.position.set(4, 6, 5); scene.add(keyL);
    var rimL = new THREE.DirectionalLight(0x6ee7ff, 2.4); rimL.position.set(-6, 2.5, -5); scene.add(rimL);
    var fillL = new THREE.DirectionalLight(0xd8c6a8, 0.4); fillL.position.set(2.5, -4, 3); scene.add(fillL);
    var amb = new THREE.AmbientLight(0xaebacc, 0.22); scene.add(amb);
    /* 换色扫描用的临时扫光 */
    var sweepL = new THREE.SpotLight(0xffffff, 0, 30, 0.7, 0.6); sweepL.position.set(0, 8, 4);
    sweepL.target.position.set(0, 0, 0); scene.add(sweepL); scene.add(sweepL.target);

    /* ---- 材质 ---- */
    var COLORS = {
      gray: new THREE.Color('#a3a7ad'), pink: new THREE.Color('#e9c6ce'),
      grayDark: new THREE.Color('#5d6167'), pinkDark: new THREE.Color('#c79aa6')
    };
    var matBody = new THREE.MeshPhysicalMaterial({ color: COLORS.gray.clone(), metalness: 0.85, roughness: 0.34, clearcoat: 0.55, clearcoatRoughness: 0.35, envMapIntensity: 1.35 });
    var matGrip = new THREE.MeshStandardMaterial({ color: COLORS.grayDark.clone(), metalness: 0.3, roughness: 0.75 });
    var matChrome = new THREE.MeshStandardMaterial({ color: 0xd9dde3, metalness: 1.0, roughness: 0.14, envMapIntensity: 1.9 });
    var matHeadPlastic = new THREE.MeshPhysicalMaterial({ color: 0xf4f5f7, metalness: 0.0, roughness: 0.4, clearcoat: 0.6, clearcoatRoughness: 0.25, envMapIntensity: 1.0 });
    var matMotor = new THREE.MeshStandardMaterial({ color: 0xc9d2dd, metalness: 1.0, roughness: 0.24, envMapIntensity: 1.5 });
    var matCoil = new THREE.MeshStandardMaterial({ color: 0xc47a2e, metalness: 0.9, roughness: 0.34, emissive: 0x7a4514, emissiveIntensity: 0.3 });
    var matBattery = new THREE.MeshStandardMaterial({ color: 0x18344d, metalness: 0.5, roughness: 0.4 });
    var matBattBand = new THREE.MeshStandardMaterial({ color: 0x2ee6b6, metalness: 0.3, roughness: 0.4, emissive: 0x1fae89, emissiveIntensity: 0.5 });
    var matBoard = new THREE.MeshStandardMaterial({ color: 0x0f3d2e, metalness: 0.4, roughness: 0.5, emissive: 0x0a2a1f, emissiveIntensity: 0.3 });
    var matBtn = new THREE.MeshPhysicalMaterial({ color: 0x2a2d33, metalness: 0.6, roughness: 0.45, clearcoat: 0.8, clearcoatRoughness: 0.2 });
    var matBtnRing = new THREE.MeshStandardMaterial({ color: 0xeaf6ff, metalness: 0.5, roughness: 0.3, emissive: new THREE.Color(ICE), emissiveIntensity: 0.9 });

    /* ---- 屏幕纹理（Canvas，多模式 UI）---- */
    var MODE_TXT = { clock: ['护理模式', '2:00'], ortho: ['正畸护理', '2:30'], perio: ['牙周护理', '2:00'], implant: ['种植护理', '2:00'], caries: ['防龋护理', '2:20'] };
    var screenCvs = document.createElement('canvas'); screenCvs.width = 256; screenCvs.height = 384;
    var sg = screenCvs.getContext('2d');
    function rr(c, x, y, w, h, r) { c.beginPath(); c.moveTo(x + r, y); c.arcTo(x + w, y, x + w, y + h, r); c.arcTo(x + w, y + h, x, y + h, r); c.arcTo(x, y + h, x, y, r); c.arcTo(x, y, x + w, y, r); c.closePath(); }
    var screenState = { mode: 'clock', colon: true };
    var screenTex;
    function drawScreen() {
      var W = 256, H = 384, info = MODE_TXT[screenState.mode] || MODE_TXT.clock;
      sg.clearRect(0, 0, W, H);
      sg.fillStyle = '#04070c'; rr(sg, 4, 4, W - 8, H - 8, 42); sg.fill();
      var glow = sg.createRadialGradient(W / 2, 120, 10, W / 2, 120, 190);
      glow.addColorStop(0, 'rgba(110,231,255,0.12)'); glow.addColorStop(1, 'rgba(0,0,0,0)');
      sg.fillStyle = glow; sg.fillRect(0, 0, W, H);
      sg.fillStyle = ICE; sg.font = '700 28px system-ui,sans-serif'; sg.textBaseline = 'top'; sg.textAlign = 'left';
      sg.fillText(info[0], 36, 44);
      /* 电量 */
      sg.strokeStyle = 'rgba(242,243,245,.55)'; sg.lineWidth = 3; rr(sg, 176, 46, 44, 22, 6); sg.stroke();
      sg.fillStyle = '#3ee0a0'; rr(sg, 180, 50, 32, 14, 3); sg.fill();
      /* 时间 */
      var t = info[1].split(':');
      sg.fillStyle = '#f2f3f5'; sg.font = '800 88px system-ui'; sg.textAlign = 'center';
      sg.fillText(t[0] + (screenState.colon ? ':' : ' ') + t[1], W / 2, 128);
      sg.textAlign = 'left';
      /* 压力波形 */
      sg.fillStyle = ICE;
      for (var i = 0; i < 9; i++) {
        var bh = 12 + Math.abs(Math.sin(i * 0.8 + screenState.mode.length)) * 44;
        sg.globalAlpha = 0.4 + 0.6 * Math.abs(Math.sin(i * 1.3));
        rr(sg, 40 + i * 20, 316 - bh, 12, bh, 4); sg.fill();
      }
      sg.globalAlpha = 1;
      if (screenTex) screenTex.needsUpdate = true;
    }
    screenTex = new THREE.CanvasTexture(screenCvs); screenTex.colorSpace = THREE.SRGBColorSpace;
    var matScreen = new THREE.MeshBasicMaterial({ map: screenTex, toneMapped: false });

    /* ============ 组装 ============ */
    var brush = new THREE.Group(); scene.add(brush);
    brush.scale.setScalar(0.72);        /* 模型总高约 6.6，缩放后完整落入 30° 视锥 */
    brush.position.y = -0.45;
    var parts = {};   /* { key: { obj, home, exploded } } */
    function reg(key, obj, ex) { parts[key] = { obj: obj, home: obj.position.clone(), exploded: obj.position.clone().add(ex) }; }

    /* ---- 机身外壳（椭圆截面 Lathe）---- */
    var bodyGroup = new THREE.Group(); brush.add(bodyGroup);
    (function buildBody() {
      var p = []; function v(r, y) { p.push(new THREE.Vector2(r, y)); }
      v(0.001, -2.10); v(0.17, -2.10); v(0.285, -2.02); v(0.322, -1.84);
      v(0.334, -1.4); v(0.338, -0.3); v(0.334, 0.7); v(0.322, 1.4);
      v(0.30, 1.8); v(0.24, 2.0); v(0.13, 2.09); v(0.001, 2.12);
      var geo = new THREE.LatheGeometry(p, 160);
      geo.scale(1, 1, 0.82);               /* 椭圆截面：更贴近真实手柄 */
      geo.computeVertexNormals();
      var shell = new THREE.Mesh(geo, matBody); bodyGroup.add(shell);

      /* 正面微凹屏幕 */
      var scrW = 0.34, scrH = 0.52;
      var frame = new THREE.Mesh(new THREE.BoxGeometry(scrW + 0.05, scrH + 0.05, 0.02), matBtn);
      frame.position.set(0, 0.92, 0.264); bodyGroup.add(frame);
      var screen = new THREE.Mesh(new THREE.PlaneGeometry(scrW, scrH), matScreen);
      screen.position.set(0, 0.92, 0.278); bodyGroup.add(screen);

      /* 电源键 + 发光环 */
      var btn = new THREE.Mesh(new THREE.CylinderGeometry(0.085, 0.085, 0.03, 40), matBtn);
      btn.rotation.x = Math.PI / 2; btn.position.set(0, 0.32, 0.272); bodyGroup.add(btn);
      var ring = new THREE.Mesh(new THREE.TorusGeometry(0.095, 0.008, 12, 48), matBtnRing);
      ring.position.set(0, 0.32, 0.276); bodyGroup.add(ring);

      /* 底部防滑圈 + Type-C 凹槽 */
      var grip = new THREE.Mesh(new THREE.CylinderGeometry(0.328, 0.30, 0.24, 96), matGrip);
      grip.scale.z = 0.82; grip.position.y = -1.94; bodyGroup.add(grip);
      var usb = new THREE.Mesh(new THREE.CapsuleGeometry(0.028, 0.07, 4, 12), matBtn);
      usb.rotation.z = Math.PI / 2; usb.position.set(0, -2.1, 0); bodyGroup.add(usb);

      /* 颈部镀铬分界环 */
      var neckRing = new THREE.Mesh(new THREE.TorusGeometry(0.255, 0.016, 12, 72), matChrome);
      neckRing.rotation.x = Math.PI / 2; neckRing.scale.set(1, 0.82, 1);
      neckRing.position.y = 1.92; bodyGroup.add(neckRing);
    })();
    reg('body', bodyGroup, new THREE.Vector3(0, -1.5, 0));

    /* ---- 镀铬驱动轴 ---- */
    var shaft = new THREE.Mesh(new THREE.CylinderGeometry(0.062, 0.08, 0.72, 40), matChrome);
    shaft.position.y = 2.42; brush.add(shaft);
    reg('shaft', shaft, new THREE.Vector3(0, 0.5, 0));

    /* ---- 刷头（窄颈 12° 前倾 + 植毛）---- */
    var headGroup = new THREE.Group(); headGroup.position.y = 2.72; brush.add(headGroup);
    (function buildHead() {
      var neck = new THREE.Mesh(new THREE.CylinderGeometry(0.075, 0.095, 0.85, 40), matHeadPlastic);
      neck.position.y = 0.42; headGroup.add(neck);
      /* 头板：拉长胶囊压扁 */
      var plate = new THREE.Mesh(new THREE.CapsuleGeometry(0.155, 0.42, 8, 24), matHeadPlastic);
      plate.scale.set(1, 1, 0.42); plate.position.set(0, 1.06, 0.01);
      plate.rotation.z = 0; headGroup.add(plate);
      /* 植毛：InstancedMesh，白毛 + 外圈冰蓝指示毛，毛尖高度 ±12% 随机 */
      var tufts = [];
      for (var ry = -3; ry <= 3; ry++) {
        var w = (Math.abs(ry) === 3) ? 1 : (Math.abs(ry) === 2 ? 2 : 3);
        for (var rx = -w; rx <= w; rx++) tufts.push([rx * 0.062, ry * 0.075, (Math.abs(ry) === 3 || Math.abs(rx) === w)]);
      }
      var per = 9;
      var total = tufts.length * per;
      var bristleGeo = new THREE.CylinderGeometry(0.0065, 0.005, 0.17, 5);
      var bristleMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.85, metalness: 0 });
      var inst = new THREE.InstancedMesh(bristleGeo, bristleMat, total);
      var dummy = new THREE.Object3D(); var cWhite = new THREE.Color(0xf7f8fa), cIce = new THREE.Color(ICE);
      var seed = 1; function rnd() { seed = (seed * 16807) % 2147483647; return (seed - 1) / 2147483646; } /* 确定性伪随机 */
      var k = 0;
      for (var i = 0; i < tufts.length; i++) {
        for (var j = 0; j < per; j++) {
          var a = (j / per) * Math.PI * 2, rr2 = (j === 0 ? 0 : 0.016);
          var h = 0.17 * (0.94 + rnd() * 0.24); /* ±12% */
          dummy.position.set(tufts[i][0] + Math.cos(a) * rr2, 1.06 + tufts[i][1], 0.075 + h / 2);
          dummy.rotation.set(Math.PI / 2, 0, 0);
          dummy.scale.set(1, h / 0.17, 1);
          dummy.updateMatrix();
          inst.setMatrixAt(k, dummy.matrix);
          inst.setColorAt(k, tufts[i][2] ? cIce : cWhite);
          k++;
        }
      }
      inst.instanceMatrix.needsUpdate = true; if (inst.instanceColor) inst.instanceColor.needsUpdate = true;
      headGroup.add(inst);
      headGroup.rotation.x = -0.21; /* 12° 前倾 */
    })();
    reg('head', headGroup, new THREE.Vector3(0, 1.7, 0));

    /* ---- 内部件（爆炸时露出）---- */
    var motor = new THREE.Group();
    var mCore = new THREE.Mesh(new THREE.CylinderGeometry(0.16, 0.16, 0.62, 40), matMotor); motor.add(mCore);
    var mCoil = new THREE.Mesh(new THREE.CylinderGeometry(0.175, 0.175, 0.2, 40), matCoil); mCoil.position.y = -0.18; motor.add(mCoil);
    motor.position.y = 1.15; brush.add(motor);
    reg('motor', motor, new THREE.Vector3(0, 0.95, 0.55));

    var battery = new THREE.Group();
    var bCell = new THREE.Mesh(new THREE.CylinderGeometry(0.19, 0.19, 1.0, 40), matBattery); battery.add(bCell);
    var bBand = new THREE.Mesh(new THREE.CylinderGeometry(0.192, 0.192, 0.14, 40), matBattBand); bBand.position.y = 0.3; battery.add(bBand);
    battery.position.y = -0.35; brush.add(battery);
    reg('battery', battery, new THREE.Vector3(0, 0.25, 0.75));

    var board = new THREE.Mesh(new THREE.BoxGeometry(0.26, 0.9, 0.05), matBoard);
    board.position.set(0, -1.35, 0.05); brush.add(board);
    reg('board', board, new THREE.Vector3(0, -0.35, 0.6));

    /* 内部件初始藏在壳内 */
    [motor, battery, board].forEach(function (o) { o.visible = false; });

    /* ---- 接触阴影 ---- */
    (function contactShadow() {
      var cvs = document.createElement('canvas'); cvs.width = 256; cvs.height = 256;
      var g = cvs.getContext('2d');
      var rg = g.createRadialGradient(128, 128, 8, 128, 128, 120);
      rg.addColorStop(0, 'rgba(0,0,0,0.55)'); rg.addColorStop(1, 'rgba(0,0,0,0)');
      g.fillStyle = rg; g.fillRect(0, 0, 256, 256);
      var tex = new THREE.CanvasTexture(cvs);
      var m = new THREE.Mesh(new THREE.PlaneGeometry(3.6, 3.6), new THREE.MeshBasicMaterial({ map: tex, transparent: true, depthWrite: false, opacity: 0.8 }));
      m.rotation.x = -Math.PI / 2; m.position.y = -2.55; scene.add(m);
    })();

    /* ============ 对外接口 ============ */
    var state = {
      explodeCur: 0, explodeTarget: 0,
      parX: 0, parY: 0, parTX: 0, parTY: 0,
      spin: 0
    };

    function setColor(name) {
      var c = COLORS[name] || COLORS.gray, cd = name === 'pink' ? COLORS.pinkDark : COLORS.grayDark;
      gsap.to(matBody.color, { r: c.r, g: c.g, b: c.b, duration: 0.9, ease: 'power2.inOut' });
      gsap.to(matGrip.color, { r: cd.r, g: cd.g, b: cd.b, duration: 0.9, ease: 'power2.inOut' });
      /* 光泽扫描：扫光从上到下掠过一次 */
      sweepL.intensity = 0;
      gsap.timeline()
        .set(sweepL.position, { y: 8 })
        .to(sweepL, { intensity: 320, duration: 0.18, ease: 'power1.in' }, 0)
        .to(sweepL.position, { y: -6, duration: 0.8, ease: 'power2.inOut' }, 0)
        .to(sweepL, { intensity: 0, duration: 0.25, ease: 'power1.out' }, 0.58);
    }

    function setScreenMode(mode) { screenState.mode = mode; drawScreen(); }

    function setExplode(t) {
      state.explodeTarget = Math.max(0, Math.min(1, t));
      var showInner = state.explodeTarget > 0.02;
      motor.visible = battery.visible = board.visible = showInner;
    }

    var _v3 = new THREE.Vector3();
    function partScreenPos(key) {
      var p = parts[key]; if (!p) return null;
      p.obj.getWorldPosition(_v3); _v3.project(camera);
      return { x: (_v3.x * 0.5 + 0.5) * window.innerWidth, y: (-_v3.y * 0.5 + 0.5) * window.innerHeight };
    }

    function pointerParallax(nx, ny) { /* nx/ny ∈ [-1,1] → ±6° */
      state.parTX = ny * 0.105; state.parTY = nx * 0.105;
    }

    /* 屏幕冒号闪烁 */
    setInterval(function () { screenState.colon = !screenState.colon; drawScreen(); }, 600);
    drawScreen();

    /* Journey 每帧写入的基准姿态（渲染时叠加视差/自转/爆炸） */
    var pose = { rotX: 0, rotY: 0, spin: true };

    function renderTick(dt) {
      state.explodeCur += (state.explodeTarget - state.explodeCur) * Math.min(1, dt * 6);
      state.parX += (state.parTX - state.parX) * Math.min(1, dt * 5);
      state.parY += (state.parTY - state.parY) * Math.min(1, dt * 5);
      if (pose.spin) state.spin += dt * 0.25;

      brush.rotation.x = pose.rotX + state.parX;
      brush.rotation.y = pose.rotY + state.parY + state.spin;

      var t = state.explodeCur;
      for (var k in parts) {
        var p = parts[k];
        p.obj.position.lerpVectors(p.home, p.exploded, t);
      }
      renderer.render(scene, camera);
    }

    function resize() {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    }

    var readyResolve;
    var ready = new Promise(function (res) { readyResolve = res; });

    return {
      brush: brush, parts: parts, camera: camera, scene: scene, renderer: renderer,
      pose: pose, state: state, lights: { key: keyL, rim: rimL, amb: amb },
      setColor: setColor, setScreenMode: setScreenMode, setExplode: setExplode,
      partScreenPos: partScreenPos, pointerParallax: pointerParallax,
      renderTick: renderTick, resize: resize,
      ready: ready, _markReady: function () { readyResolve(); }
    };
  })();
  window.App = App;

  /* ---- 渲染主循环 ---- */
  var lastT = 0, firstFrame = true;
  function loop(ts) {
    var dt = Math.min(0.05, (ts - lastT) / 1000 || 0.016); lastT = ts;
    App.renderTick(dt);
    if (firstFrame) { firstFrame = false; App._markReady(); }
    requestAnimationFrame(loop);
  }
  requestAnimationFrame(loop);

  window.addEventListener('resize', function () { App.resize(); });
})();
