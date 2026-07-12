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
    reg('body', bodyGroup, new THREE.Vector3(0, -0.9, 0));

    /* ---- 镀铬驱动轴 ---- */
    var shaft = new THREE.Mesh(new THREE.CylinderGeometry(0.062, 0.08, 0.72, 40), matChrome);
    shaft.position.y = 2.42; brush.add(shaft);
    reg('shaft', shaft, new THREE.Vector3(0, 0.28, 0));

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
    reg('head', headGroup, new THREE.Vector3(0, 0.85, 0));

    /* ---- 内部件（爆炸时露出）---- */
    var motor = new THREE.Group();
    var mCore = new THREE.Mesh(new THREE.CylinderGeometry(0.16, 0.16, 0.62, 40), matMotor); motor.add(mCore);
    var mCoil = new THREE.Mesh(new THREE.CylinderGeometry(0.175, 0.175, 0.2, 40), matCoil); mCoil.position.y = -0.18; motor.add(mCoil);
    motor.position.y = 1.15; brush.add(motor);
    reg('motor', motor, new THREE.Vector3(0, 0.55, 0.5));

    var battery = new THREE.Group();
    var bCell = new THREE.Mesh(new THREE.CylinderGeometry(0.19, 0.19, 1.0, 40), matBattery); battery.add(bCell);
    var bBand = new THREE.Mesh(new THREE.CylinderGeometry(0.192, 0.192, 0.14, 40), matBattBand); bBand.position.y = 0.3; battery.add(bBand);
    battery.position.y = -0.35; brush.add(battery);
    reg('battery', battery, new THREE.Vector3(0, 0.18, 0.65));

    var board = new THREE.Mesh(new THREE.BoxGeometry(0.26, 0.9, 0.05), matBoard);
    board.position.set(0, -1.35, 0.05); brush.add(board);
    reg('board', board, new THREE.Vector3(0, -0.2, 0.55));

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

  /* ============================================================
     B. Journey — 连续运镜
     f = 全局进度 p × 6：整数 i 即第 i 章驻留中心（snap 点）。
     每章占 f 的 1 个单位：[i-0.5, i-0.25] 进场 · [i-0.25, i+0.25] 驻留 · [i+0.25, i+0.5] 退场
     ============================================================ */
  var Journey = (function () {
    gsap.registerPlugin(ScrollTrigger);
    var N = 7;
    /* 每章驻留姿态：cam 相机位 / look 注视点 / rot 牙刷基准旋转 / spin 自转 */
    var KEY = [
      { cam: [0, 0.2, 10.2], look: [0, 0.1, 0], rot: [0, 0], spin: true },   /* 01 英雄 */
      { cam: [0.7, 0.5, 4.4], look: [0.15, 0.35, 0], rot: [0, 1.05], spin: false },  /* 02 工艺微距 */
      { cam: [0, 0.1, 10.0], look: [0, 0.05, 0], rot: [0, 0], spin: false },  /* 03 双色正面 */
      { cam: [1.0, 0.15, 12.5], look: [0.2, 0.1, 0], rot: [-0.28, 0.65], spin: false },  /* 04 拆解（拉远容纳爆炸全高） */
      { cam: [0, 0.42, 4.0], look: [0, 0.28, 0], rot: [0.1, 0.08], spin: false },  /* 05 屏幕特写 */
      { cam: [2.4, 0.1, 12.0], look: [0, 0, 0], rot: [0, 2.15], spin: false },  /* 06 拉远 */
      { cam: [0, 0.2, 9.8], look: [0, 0.1, 0], rot: [0, 0], spin: true }    /* 07 收尾 */
    ];
    var easeIO = gsap.parseEase('power2.inOut');
    var easeOut = gsap.parseEase('power3.out');

    var giants = [], infos = [], railItems = [];
    document.querySelectorAll('.giant-wrap').forEach(function (el) { giants[+el.dataset.ch] = el; });
    document.querySelectorAll('#ui .info').forEach(function (el) { infos[+el.dataset.ch] = el; });
    document.querySelectorAll('.rail-item').forEach(function (el) { railItems[+el.dataset.ch] = el; });
    var progressEl = document.getElementById('progress');
    var slimBar = document.querySelector('.progress-slim i');
    var calloutsEl = document.getElementById('callouts');

    /* 巨字按宽度适配：min(20vw, 88vw/字数) */
    function fitGiant() {
      var vw = window.innerWidth;
      document.querySelectorAll('.giant[data-fit]').forEach(function (el) {
        var n = el.textContent.replace(/\s/g, '').length;
        el.style.fontSize = Math.min(vw * 0.20, vw * 0.88 / Math.max(1, n)) + 'px';
      });
      document.querySelectorAll('.giant[data-fit-half]').forEach(function (el) {
        el.style.fontSize = (vw * 0.20) + 'px';
      });
      var bn = document.querySelector('.giant[data-fit-num]');
      if (bn) bn.style.fontSize = Math.min(vw * 0.24, vw * 0.80 / 2.6) + 'px';
    }
    fitGiant();

    var targetP = 0, curP = 0, curCh = 0, lastDomP = -1;

    /* 章节局部可见度：进场 0→1 / 驻留 1 / 退场 1→0 */
    function chapterVis(i, f) {
      var li = f - (i - 0.5);              /* 0..1 */
      if (li <= 0 || li >= 1) return 0;
      if (li < 0.25) return li / 0.25;
      if (li > 0.75) return 1 - (li - 0.75) / 0.25;
      return 1;
    }

    function lerp(a, b, t) { return a + (b - a) * t; }
    function lerp3(out, a, b, t) { out[0] = lerp(a[0], b[0], t); out[1] = lerp(a[1], b[1], t); out[2] = lerp(a[2], b[2], t); return out; }
    var _cam = [0, 0, 0], _look = [0, 0, 0];

    function apply(p) {
      var f = p * (N - 1);
      /* reduced-motion：姿态量化到最近章节（无运镜），文字仍按滚动淡入淡出 */
      var fPose = reduceMotion ? Math.max(0, Math.min(N - 1, Math.round(f))) : f;
      var i0 = Math.max(0, Math.min(N - 1, Math.floor(fPose)));
      var i1 = Math.min(N - 1, i0 + 1);
      /* 姿态：驻留平台 [i-0.25,i+0.25] 静止，其间 [i+0.25,i+0.75] 过渡 */
      var fr = fPose - i0, t;
      if (fr < 0.25) t = 0;
      else if (fr > 0.75) t = 1;
      else t = easeIO((fr - 0.25) / 0.5);
      var A = KEY[i0], B = KEY[i1];
      lerp3(_cam, A.cam, B.cam, t); lerp3(_look, A.look, B.look, t);
      App.camera.position.set(_cam[0], _cam[1], _cam[2]);
      App.camera.lookAt(_look[0], _look[1], _look[2]);
      App.pose.rotX = lerp(A.rot[0], B.rot[0], t);
      App.pose.rotY = lerp(A.rot[1], B.rot[1], t);

      var near = Math.round(f);
      App.pose.spin = !reduceMotion && (near === 0 || near === 6) && Math.abs(f - near) < 0.3;

      /* 拆解爆炸度：进场 scrub 到 1（snap 驻留点 f=3 恰好全展开），退场收拢 */
      var ex = 0;
      if (fPose > 2.5 && fPose < 3.7) {
        ex = Math.max(0, Math.min(1, (fPose - 2.55) / 0.45));
        if (fPose > 3.3) ex *= Math.max(0, 1 - (fPose - 3.3) / 0.3);
      }
      App.setExplode(ex);

      /* DOM 层 */
      for (var i = 0; i < N; i++) {
        var vis = chapterVis(i, f);
        var g = giants[i], info = infos[i];
        var on = vis > 0.01;
        if (g) {
          g.style.visibility = on ? 'visible' : 'hidden';
          g.style.opacity = vis;
          var li = f - (i - 0.5);
          var giant = g.firstElementChild;
          if (on) g.style.transform = 'translateY(' + ((0.5 - li) * 6) + 'vh)'; /* 视差 ≤±3vh */
        }
        if (info) {
          info.style.visibility = on ? 'visible' : 'hidden';
          info.style.opacity = vis;
          /* 逐行入场：错峰上移 */
          var lines = info.querySelectorAll('.lm .line');
          for (var j = 0; j < lines.length; j++) {
            var e = easeOut(Math.max(0, Math.min(1, vis * 1.35 - j * 0.12)));
            lines[j].style.transform = 'translateY(' + ((1 - e) * 112) + '%)';
          }
        }
      }
      if (calloutsEl) calloutsEl.style.visibility = chapterVis(3, f) > 0.01 ? 'visible' : 'hidden';

      /* 章节轨 + 进度 */
      var cur = Math.max(0, Math.min(N - 1, near));
      if (cur !== curCh) {
        if (railItems[curCh]) railItems[curCh].classList.remove('cur');
        if (railItems[cur]) railItems[cur].classList.add('cur');
        curCh = cur;
        if (Journey.onChapter) Journey.onChapter(cur);
      }
      progressEl.textContent = Math.round(p * 100) + '%';
      if (slimBar) slimBar.style.height = (p * 100) + '%';
    }

    /* 滚动源 */
    var st = null;
    function initScroll() {
      st = ScrollTrigger.create({
        trigger: 'main', start: 'top top', end: 'bottom bottom',
        snap: { snapTo: function (v) { return Math.round(v * (N - 1)) / (N - 1); }, duration: { min: 0.3, max: 0.7 }, ease: 'power2.inOut' },
        onUpdate: function (self) { targetP = self.progress; }
      });
    }

    function tick(dt) {
      if (reduceMotion) curP = targetP;                  /* 减弱动态：不做平滑 */
      else curP += (targetP - curP) * Math.min(1, dt * 7);   /* 手动 scrub 平滑 */
      if (Math.abs(curP - lastDomP) > 0.0002) { apply(curP); lastDomP = curP; }
    }

    function goto(ch) {
      var max = document.documentElement.scrollHeight - window.innerHeight;
      var y = ch / (N - 1) * max;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }

    /* 章节轨点击 / 首屏“看看黑科技” */
    railItems.forEach(function (el, i) { if (el) el.addEventListener('click', function () { goto(i); }); });
    var toTech = document.getElementById('to-tech');
    if (toTech) toTech.addEventListener('click', function () { goto(3); });

    apply(0);

    return { initScroll: initScroll, tick: tick, goto: goto, fitGiant: fitGiant,
      get progress() { return curP; }, get chapter() { return curCh; }, onChapter: null,
      refresh: function () { ScrollTrigger.refresh(); fitGiant(); } };
  })();
  window.Journey = Journey;
  Journey.initScroll();

  /* ============================================================
     C. 交互层
     ============================================================ */
  var Interact = (function () {

    /* ---- 1. 换色（03 章驻留期可点，visibility 已由 Journey 控） ---- */
    document.querySelectorAll('.swatch').forEach(function (s) {
      s.addEventListener('click', function () {
        document.querySelectorAll('.swatch').forEach(function (o) { o.classList.remove('active'); });
        s.classList.add('active');
        App.setColor(s.dataset.c);
      });
    });

    /* ---- 2. 模式卡：hover + click 双通道切屏幕 UI ---- */
    var modes = document.querySelectorAll('.mode');
    function activateMode(m) {
      modes.forEach(function (o) { o.classList.remove('on'); });
      m.classList.add('on');
      App.setScreenMode(m.dataset.mode);
    }
    modes.forEach(function (m) {
      m.addEventListener('click', function () { activateMode(m); });
      m.addEventListener('pointerenter', function () { if (!isTouch) activateMode(m); });
    });

    /* ---- 3. 数字滚动（06 章进场触发一次） ---- */
    var counted = false;
    function runCounters() {
      if (counted) return; counted = true;
      var bn = document.getElementById('bignum');
      var bnEnd = parseFloat(bn.dataset.count), bnSuf = bn.dataset.suffix || '';
      var o = { v: 0 };
      gsap.to(o, {
        v: bnEnd, duration: 1.3, ease: 'power3.out',
        onUpdate: function () { bn.innerHTML = o.v.toFixed(1) + '<small>' + bnSuf + '</small>'; }
      });
      document.querySelectorAll('.orbit-stat [data-count]').forEach(function (el) {
        var end = parseFloat(el.dataset.count), suf = el.dataset.suffix || '';
        var oo = { v: 0 };
        gsap.to(oo, {
          v: end, duration: 1.3, ease: 'power3.out', delay: 0.15,
          onUpdate: function () { el.innerHTML = oo.v.toFixed(1) + '<small>' + suf + '</small>'; }
        });
      });
    }

    /* ---- 章节进入钩子 ---- */
    Journey.onChapter = function (ch) {
      if (ch === 4) activateMode(modes[0]);       /* 05 默认第一张 */
      else if (ch === 5) runCounters();           /* 06 数字滚动 */
      else App.setScreenMode('clock');
    };

    /* ---- 4. 拆解标注线（爆炸阈值依次点亮，文字端 clamp 安全区） ---- */
    var calloutsEl = document.getElementById('callouts');
    var C_KEYS = ['head', 'motor', 'battery', 'body'];
    var C_THRESH = { head: 0.25, motor: 0.45, battery: 0.65, body: 0.85 };
    var cLines = {}, cLabels = {};
    calloutsEl.querySelectorAll('line').forEach(function (l) { cLines[l.dataset.k] = l; });
    calloutsEl.querySelectorAll('.callout').forEach(function (c) { cLabels[c.dataset.k] = c; });
    /* 槽位（vw/vh 相对，文字端保证在安全区内） */
    function cSlots() {
      var W = window.innerWidth, H = window.innerHeight;
      var right = Math.max(W * 0.06, 24), left = Math.max(W * 0.06, 118);
      return {
        head:    { x: W - right, y: H * 0.16, align: 'right' },
        motor:   { x: W - right, y: H * 0.40, align: 'right' },
        battery: { x: W - right, y: H * 0.64, align: 'right' },
        body:    { x: left,      y: H * 0.66, align: 'left' }
      };
    }
    function updateCallouts() {
      if (calloutsEl.style.visibility === 'hidden') return;
      var ex = App.state.explodeCur;
      var slots = cSlots();
      C_KEYS.forEach(function (k) {
        var lab = cLabels[k], ln = cLines[k], slot = slots[k];
        var lit = ex >= C_THRESH[k];
        lab.classList.toggle('lit', lit);
        ln.classList.toggle('lit-line', lit);
        /* label 定位 */
        if (slot.align === 'right') { lab.style.right = (window.innerWidth - slot.x) + 'px'; lab.style.left = 'auto'; }
        else { lab.style.left = slot.x + 'px'; lab.style.right = 'auto'; }
        lab.style.top = slot.y + 'px';
        /* 线：零件屏幕投影 → label 近端 */
        var p = App.partScreenPos(k); if (!p) return;
        var r = lab.getBoundingClientRect();
        var lx = slot.align === 'right' ? r.left - 8 : r.right + 8;
        var ly = r.top + Math.min(20, r.height / 2);
        ln.setAttribute('x1', p.x); ln.setAttribute('y1', p.y);
        ln.setAttribute('x2', lx); ln.setAttribute('y2', ly);
      });
    }

    /* ---- 5. 鼠标视差（触屏关闭） ---- */
    var mouseX = -1, mouseY = -1;
    if (!isTouch) {
      window.addEventListener('pointermove', function (e) {
        mouseX = e.clientX; mouseY = e.clientY;
        App.pointerParallax(e.clientX / window.innerWidth * 2 - 1, e.clientY / window.innerHeight * 2 - 1);
      });
    }

    /* ---- 6. 自定义光标（dot 即时 / ring 延迟 / 磁吸） ---- */
    var cursorEl = document.getElementById('cursor');
    var curDot = cursorEl.querySelector('.cur-dot'), curRing = cursorEl.querySelector('.cur-ring');
    var ringX = -100, ringY = -100;
    if (!isTouch) {
      document.querySelectorAll('[data-magnet]').forEach(function (el) {
        el.addEventListener('pointerenter', function () { cursorEl.classList.add('big'); });
        el.addEventListener('pointerleave', function () {
          cursorEl.classList.remove('big');
          gsap.to(el, { x: 0, y: 0, duration: 0.4, ease: 'power3.out' });
        });
        el.addEventListener('pointermove', function (e) {
          var r = el.getBoundingClientRect();
          var dx = e.clientX - (r.left + r.width / 2), dy = e.clientY - (r.top + r.height / 2);
          gsap.to(el, { x: Math.max(-14, Math.min(14, dx * 0.25)), y: Math.max(-14, Math.min(14, dy * 0.25)), duration: 0.3, ease: 'power2.out' });
        });
      });
    }
    function updateCursor(dt) {
      if (isTouch || mouseX < 0) return;
      curDot.style.transform = 'translate(' + mouseX + 'px,' + mouseY + 'px)';
      ringX += (mouseX - ringX) * Math.min(1, dt * 12);
      ringY += (mouseY - ringY) * Math.min(1, dt * 12);
      curRing.style.transform = 'translate(' + ringX + 'px,' + ringY + 'px)';
    }

    /* ---- 7. 微尘粒子（滚动拖尾 + 鼠标斥力） ---- */
    var dustOn = !reduceMotion;
    var dustCv = document.getElementById('dust'), dg = dustCv.getContext('2d');
    var DW, DH, ps = [];
    function dustResize() { DW = dustCv.width = window.innerWidth; DH = dustCv.height = window.innerHeight; }
    dustResize(); window.addEventListener('resize', dustResize);
    (function () {
      var seed = 7; function rnd() { seed = (seed * 16807) % 2147483647; return (seed - 1) / 2147483646; }
      for (var i = 0; i < 60; i++) ps.push({ x: rnd(), y: rnd(), z: rnd() * 0.8 + 0.2, s: rnd() * 1.4 + 0.5, vy: rnd() * 0.1 + 0.03 });
    })();
    var lastScroll = 0, scrollVel = 0;
    function updateDust(dt) {
      if (!dustOn) return;
      var sy = window.scrollY || 0;
      scrollVel += ((sy - lastScroll) - scrollVel) * Math.min(1, dt * 8); lastScroll = sy;
      var tail = Math.max(-1, Math.min(1, scrollVel / 600));
      dg.clearRect(0, 0, DW, DH);
      for (var i = 0; i < ps.length; i++) {
        var p = ps[i];
        p.y -= p.vy * dt * 1.6 + tail * dt * 0.9 * p.z;
        if (p.y < -0.03) { p.y = 1.03; } if (p.y > 1.03) { p.y = -0.03; }
        var px = p.x * DW, py = p.y * DH;
        /* 鼠标 80px 斥力 */
        if (mouseX > 0) {
          var dx = px - mouseX, dy = py - mouseY, d2 = dx * dx + dy * dy;
          if (d2 < 6400 && d2 > 1) { var d = Math.sqrt(d2), push = (80 - d) / 80 * 14; px += dx / d * push; py += dy / d * push; }
        }
        var len = 1 + Math.abs(tail) * 10 * p.z;
        dg.beginPath();
        dg.ellipse(px, py, p.s * p.z, p.s * p.z * len, 0, 0, 6.283);
        dg.fillStyle = 'rgba(' + (150 + p.z * 60 | 0) + ',' + (210 + p.z * 30 | 0) + ',255,' + (0.04 + p.z * 0.1) + ')';
        dg.fill();
      }
    }

    /* ---- 8. Loader（真实信号 + 4s 强制放行） ---- */
    (function loader() {
      var numEl = document.querySelector('.loader-num'), barEl = document.querySelector('.loader-bar i');
      var val = 0, target = 12, done = false;
      var signals = 0;
      function bump() { signals++; if (signals >= 2) target = 100; else target = Math.max(target, 82); }
      App.ready.then(bump);
      if (document.readyState === 'complete') bump(); else window.addEventListener('load', bump);
      var iv = setInterval(function () {
        target = Math.min(target + 1.4, signals >= 2 ? 100 : 90);   /* 无信号时爬到 90 为止 */
        val += (target - val) * 0.18;
        if (val > 99.2) val = 100;
        numEl.innerHTML = Math.round(val) + '<small>%</small>';
        barEl.style.width = val + '%';
        if (val >= 100 && !done) { done = true; clearInterval(iv); reveal(); }
      }, 40);
      setTimeout(function () { if (!done) { done = true; clearInterval(iv); numEl.innerHTML = '100<small>%</small>'; barEl.style.width = '100%'; reveal(); } }, 4000);
      function reveal() { requestAnimationFrame(function () { document.body.classList.add('scene-ready'); }); }
    })();

    return {
      tick: function (dt) { updateCursor(dt); updateDust(dt); updateCallouts(); },
      set dust(v) { dustOn = v; }
    };
  })();
  window.Interact = Interact;

  /* ---- 渲染主循环 ---- */
  var lastT = 0, firstFrame = true;
  function loop(ts) {
    var dt = Math.min(0.05, (ts - lastT) / 1000 || 0.016); lastT = ts;
    Journey.tick(dt);
    App.renderTick(dt);
    Interact.tick(dt);
    if (firstFrame) { firstFrame = false; App._markReady(); }
    requestAnimationFrame(loop);
  }
  requestAnimationFrame(loop);

  var resizeTimer = null;
  window.addEventListener('resize', function () {
    App.resize();
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function () { Journey.refresh(); }, 200);
  });
})();
