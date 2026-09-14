/**
 * 3D Water & Ripple Simulation
 * Day: Sunlit Crystal Turquoise & Azure Water
 * Softened specular optics so the top never blows out with harsh white donut glints.
 */

(function() {
  const canvas = document.createElement('canvas');
  canvas.id = 'water-canvas';
  canvas.style.position = 'fixed';
  canvas.style.top = '0';
  canvas.style.left = '0';
  canvas.style.width = '100vw';
  canvas.style.height = '100vh';
  canvas.style.zIndex = '-1';
  canvas.style.pointerEvents = 'none';
  document.body.prepend(canvas);

  const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
  if (!gl) {
    console.warn('WebGL not supported, falling back to ambient CSS gradients.');
    return;
  }

  // Vertex Shader
  const vsSource = `
    attribute vec2 a_position;
    varying vec2 v_uv;
    void main() {
      v_uv = (a_position + 1.0) * 0.5;
      gl_Position = vec4(a_position, 0.0, 1.0);
    }
  `;

  // Fragment Shader
  const fsSource = `
    precision mediump float;
    varying vec2 v_uv;
    uniform vec2 u_resolution;
    uniform float u_time;
    uniform int u_theme; // 0 = Sunlit Water Blue, 1 = Luminous Sunset

    #define MAX_RIPPLES 8
    uniform vec3 u_ripples[MAX_RIPPLES]; // xy = pos, z = age

    // Surface height calculation
    float getWaterHeight(vec2 uv) {
      float h = 0.0;
      float aspect = u_resolution.x / u_resolution.y;

      // Meditative, slow, silky ambient ocean swell
      h += sin(uv.x * 5.2 + u_time * 0.37 + uv.y * 3.0) * 0.024;
      h += sin(uv.x * 10.5 - u_time * 0.47 + uv.y * 7.8) * 0.014;
      h += cos(uv.y * 7.0 + u_time * 0.27) * 0.018;

      // Gentle interactive ripples
      for (int i = 0; i < MAX_RIPPLES; i++) {
        vec3 r = u_ripples[i];
        if (r.z > 0.0 && r.z < 320.0) {
          vec2 diff = (uv - r.xy);
          diff.x *= aspect;
          float dist = length(diff);
          
          float radius = r.z * 0.00163;
          float waveDist = abs(dist - radius);
          
          if (waveDist < 0.11) {
            float fade = 1.0 - (r.z / 320.0);
            fade = fade * fade;
            float wave = sin(waveDist * 42.0) * (1.0 - waveDist / 0.11) * fade * 0.038;
            h += wave;
          }
        }
      }
      return h;
    }

    void main() {
      vec2 uv = v_uv;
      float eps = 0.0035;

      // Surface normal calculation
      float hL = getWaterHeight(uv - vec2(eps, 0.0));
      float hR = getWaterHeight(uv + vec2(eps, 0.0));
      float hD = getWaterHeight(uv - vec2(0.0, eps));
      float hU = getWaterHeight(uv + vec2(0.0, eps));

      vec3 normal = normalize(vec3((hL - hR) * 11.5, (hD - hU) * 11.5, 1.0));

      // Balanced distant light source (no harsh glare at the top)
      vec3 sunPos = vec3(0.5, 1.35, 0.55);
      vec3 lightDir = normalize(sunPos - vec3(uv, 0.0));
      vec3 viewDir = vec3(0.0, 0.0, 1.0);
      vec3 halfVec = normalize(lightDir + viewDir);

      float specular = pow(max(dot(normal, halfVec), 0.0), 32.0);
      float fresnel = pow(1.0 - max(dot(normal, viewDir), 0.0), 2.2);

      vec3 finalColor;

      if (u_theme == 0) {
        // DAY: Balanced, soothing Sunlit Ocean Water
        // Smooth sky into rich cerulean and turquoise water
        vec3 deepWater = vec3(0.06, 0.44, 0.70);
        vec3 clearAqua = vec3(0.12, 0.62, 0.84);
        vec3 sunlitTurquoise = vec3(0.25, 0.72, 0.90);

        // Smooth vertical transition without harsh blotches
        float rippleShading = normal.x * 0.20 + normal.y * 0.15;
        vec3 waterBase = mix(deepWater, sunlitTurquoise, uv.y * 0.65 + rippleShading + 0.20);

        // Soft, balanced sunlight shimmer (gentle, no harsh white rings)
        vec3 sunSparkle = vec3(1.0, 0.98, 0.90) * specular * 0.48;
        
        // Gentle liquid sheen along wavefronts
        vec3 aquaGlint = vec3(0.40, 0.85, 0.98) * fresnel * 0.25;

        finalColor = waterBase + sunSparkle + aquaGlint;
        finalColor = mix(vec3(0.88, 0.95, 0.99), finalColor, 0.72);
      } else {
        // SUNSET: Pure Radiant Sunset Sky & Deep Midnight Ocean
        vec3 royalIndigo = vec3(0.05, 0.07, 0.18);
        vec3 twilightViolet = vec3(0.24, 0.07, 0.36);
        vec3 sunsetMagenta = vec3(0.75, 0.10, 0.38);
        vec3 sunsetCoral = vec3(0.98, 0.38, 0.12);
        vec3 goldenSun = vec3(1.0, 0.75, 0.22);

        vec3 skyColor;
        if (uv.y > 0.70) {
          skyColor = mix(twilightViolet, royalIndigo, (uv.y - 0.70) / 0.30);
        } else if (uv.y > 0.42) {
          skyColor = mix(sunsetMagenta, twilightViolet, (uv.y - 0.42) / 0.28);
        } else if (uv.y > 0.18) {
          skyColor = mix(sunsetCoral, sunsetMagenta, (uv.y - 0.18) / 0.24);
        } else {
          skyColor = mix(goldenSun, sunsetCoral, uv.y / 0.18);
        }

        vec3 midnightWater = mix(vec3(0.03, 0.05, 0.13), vec3(0.06, 0.09, 0.22), uv.y + normal.x * 0.08);
        vec3 sunGlint = vec3(1.0, 0.85, 0.35) * specular * 0.65;
        vec3 coralGlow = mix(sunsetMagenta, sunsetCoral, uv.y) * fresnel * 0.35;

        finalColor = mix(midnightWater, skyColor, 0.22) + sunGlint + coralGlow;
        finalColor = mix(vec3(0.04, 0.06, 0.13), finalColor, 0.68);
      }

      gl_FragColor = vec4(finalColor, 1.0);
    }
  `;

  // Shader Helper
  function createShader(gl, type, source) {
    const shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      console.error('Shader compile error:', gl.getShaderInfoLog(shader));
      gl.deleteShader(shader);
      return null;
    }
    return shader;
  }

  const vertexShader = createShader(gl, gl.VERTEX_SHADER, vsSource);
  const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fsSource);

  const program = gl.createProgram();
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);

  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    console.error('Program link error:', gl.getProgramInfoLog(program));
    return;
  }

  // Full Screen Quad
  const positionBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
    -1, -1,
     1, -1,
    -1,  1,
    -1,  1,
     1, -1,
     1,  1,
  ]), gl.STATIC_DRAW);

  const aPosition = gl.getAttribLocation(program, 'a_position');
  gl.enableVertexAttribArray(aPosition);
  gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, 0, 0);

  // Uniform locations
  const uResolution = gl.getUniformLocation(program, 'u_resolution');
  const uTime = gl.getUniformLocation(program, 'u_time');
  const uTheme = gl.getUniformLocation(program, 'u_theme');
  const uRipples = gl.getUniformLocation(program, 'u_ripples');

  // Resize handling (Mobile-optimized DPR to prevent battery drain)
  function resize() {
    const isMobile = window.innerWidth <= 768;
    const maxDpr = isMobile ? 1.2 : 1.5;
    const dpr = Math.min(window.devicePixelRatio || 1, maxDpr);
    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;
    gl.viewport(0, 0, canvas.width, canvas.height);
  }
  window.addEventListener('resize', resize);
  resize();

  // Ripple state tracking
  const MAX_RIPPLES = 8;
  const ripples = [];
  for (let i = 0; i < MAX_RIPPLES; i++) {
    ripples.push({ x: 0, y: 0, age: -1 });
  }

  let rippleIndex = 0;
  function addRipple(clientX, clientY) {
    const rect = canvas.getBoundingClientRect();
    const x = (clientX - rect.left) / rect.width;
    const y = 1.0 - (clientY - rect.top) / rect.height;

    ripples[rippleIndex] = { x, y, age: 1.0 };
    rippleIndex = (rippleIndex + 1) % MAX_RIPPLES;
  }

  // Pointer interaction
  let lastMoveTime = 0;
  let lastX = 0;
  let lastY = 0;

  window.addEventListener('mousemove', function(e) {
    const now = performance.now();
    const dist = Math.hypot(e.clientX - lastX, e.clientY - lastY);

    if (now - lastMoveTime > 145 && dist > 20) {
      addRipple(e.clientX, e.clientY);
      lastMoveTime = now;
      lastX = e.clientX;
      lastY = e.clientY;
    }
  });

  window.addEventListener('click', function(e) {
    addRipple(e.clientX, e.clientY);
  });

  // Mobile Touch Support (gentle water ripples as user scrolls/taps)
  window.addEventListener('touchstart', function(e) {
    if (e.touches.length > 0) {
      const t = e.touches[0];
      addRipple(t.clientX, t.clientY);
      lastX = t.clientX;
      lastY = t.clientY;
      lastMoveTime = performance.now();
    }
  }, { passive: true });

  window.addEventListener('touchmove', function(e) {
    if (e.touches.length > 0) {
      const t = e.touches[0];
      const now = performance.now();
      const dist = Math.hypot(t.clientX - lastX, t.clientY - lastY);

      if (now - lastMoveTime > 180 && dist > 35) {
        addRipple(t.clientX, t.clientY);
        lastMoveTime = now;
        lastX = t.clientX;
        lastY = t.clientY;
      }
    }
  }, { passive: true });

  // Render Loop
  const startTime = performance.now();
  function render() {
    const currentTime = (performance.now() - startTime) * 0.001;
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';

    gl.useProgram(program);

    gl.uniform2f(uResolution, canvas.width, canvas.height);
    gl.uniform1f(uTime, currentTime);
    gl.uniform1i(uTheme, isDark ? 1 : 0);

    const rippleData = [];
    for (let i = 0; i < MAX_RIPPLES; i++) {
      if (ripples[i].age > 0) {
        ripples[i].age += 0.58;
        if (ripples[i].age > 320) {
          ripples[i].age = -1;
        }
      }
      rippleData.push(ripples[i].x, ripples[i].y, ripples[i].age);
    }
    gl.uniform3fv(uRipples, new Float32Array(rippleData));

    gl.drawArrays(gl.TRIANGLES, 0, 6);
    requestAnimationFrame(render);
  }

  requestAnimationFrame(render);
})();
