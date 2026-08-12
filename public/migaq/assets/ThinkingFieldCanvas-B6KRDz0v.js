import{r as x,j as J}from"./react-runtime-DF-nCXXw.js";const $=`
  attribute vec2 a_position;

  void main() {
    gl_Position = vec4(a_position, 0.0, 1.0);
  }
`,ee=`
  precision highp float;

  uniform vec2 u_resolution;
  uniform vec2 u_pointer;
  uniform float u_time;
  uniform float u_focus;
  uniform float u_typing;
  uniform float u_progress;
  uniform float u_submit;
  uniform float u_scroll;
  uniform float u_scroll_energy;
  uniform float u_scroll_direction;
  uniform float u_touch;
  uniform float u_touch_x;
  uniform float u_hover;
  uniform float u_hover_energy;

  float random(vec2 point) {
    return fract(sin(dot(point, vec2(12.9898, 78.233))) * 43758.5453);
  }

  float gaussian(float value, float width) {
    float scaled = value / max(0.001, width);
    return exp(-scaled * scaled);
  }

  float belowSurface(float y, float surface, float feather) {
    return 1.0 - smoothstep(surface - feather, surface + feather, y);
  }

  float caustic(float distanceToPath, float sharpness) {
    return exp(-abs(distanceToPath) * sharpness);
  }

  void main() {
    vec2 uv = gl_FragCoord.xy / u_resolution.xy;
    float aspect = u_resolution.x / max(1.0, u_resolution.y);
    float time = u_time;
    float compact = 1.0 - smoothstep(0.72, 1.10, aspect);
    float progress = clamp(u_progress, 0.0, 1.0);
    float focus = clamp(u_focus, 0.0, 1.0);
    float typing = clamp(u_typing, 0.0, 1.0);
    float hover = clamp(u_hover, 0.0, 1.0);
    float hoverEnergy = clamp(u_hover_energy, 0.0, 1.0);
    float scrollFlow = u_scroll_energy * u_scroll_direction;
    float pointerShift = (u_pointer.x - 0.5) * mix(0.13, 0.09, compact)
      * (0.28 + hover * 0.42);

    float x = (uv.x - 0.5) * aspect;
    float touchCenter = (u_touch_x - 0.5) * aspect;
    float shear = scrollFlow * (uv.y - 0.16) * mix(0.34, 0.23, compact)
      + (u_pointer.y - 0.5) * hover * (uv.y - 0.42) * 0.10;
    float fieldX = x + shear - pointerShift * (0.55 + focus * 0.28);

    vec3 ink = vec3(0.0015, 0.0025, 0.0085);
    vec3 midnight = vec3(0.004, 0.010, 0.048);
    vec3 deepBlue = vec3(0.006, 0.032, 0.31);
    vec3 cobalt = vec3(0.020, 0.145, 1.00);
    vec3 cyan = vec3(0.000, 0.690, 1.00);
    vec3 violet = vec3(0.285, 0.035, 1.00);
    vec3 electricViolet = vec3(0.580, 0.080, 1.00);
    vec3 magenta = vec3(0.720, 0.055, 0.73);
    vec3 hotMagenta = vec3(1.000, 0.015, 0.61);
    vec3 coral = vec3(1.000, 0.245, 0.115);
    vec3 amber = vec3(1.000, 0.535, 0.180);
    vec3 emerald = vec3(0.000, 0.860, 0.58);
    vec3 acid = vec3(0.745, 1.000, 0.10);
    vec3 gold = vec3(1.000, 0.720, 0.05);

    float bottomDepth = 1.0 - smoothstep(0.0, 0.64, uv.y);
    vec3 color = mix(ink, midnight, bottomDepth * 0.27);

    float colorTime = time * 0.23;
    float colorBreath = 0.5 + 0.5 * sin(colorTime * 0.72 + 0.8);
    float cyanCenter = 0.20 + sin(colorTime) * 0.055;
    float violetCenter = 0.68 + sin(colorTime * 0.73 + 1.9) * 0.070;
    float magentaCenter = 0.71 + sin(colorTime * 0.58 + 3.1) * 0.055;
    float warmCenter = 0.80 + sin(colorTime * 0.46 + 4.0) * 0.038;
    float idleCyanZone = gaussian(uv.x - cyanCenter, 0.25);
    float idleVioletZone = gaussian(uv.x - violetCenter, 0.29);
    float inputMagentaZone = gaussian(uv.x - magentaCenter, 0.27);
    float submitWarmZone = gaussian(uv.x - warmCenter, 0.25);

    float surgeCenter = 0.66 + sin(colorTime * 0.81 + 0.4) * 0.055;
    float spectralSurge = gaussian(uv.x - surgeCenter, mix(0.22, 0.27, compact));
    float cyanWing = gaussian(uv.x - (0.19 + sin(colorTime * 0.67) * 0.035), 0.30);
    float surgePulse = 0.86 + sin(time * 0.31 + 1.2) * 0.09;

    float progressLift = progress * mix(0.275, 0.330, compact);
    float focusLift = focus * 0.030;
    float typingLift = typing * mix(0.035, 0.045, compact);
    float submitLift = u_submit * mix(0.190, 0.220, compact);
    float scrollLift = u_scroll_energy * 0.082;

    float slowBack = sin(fieldX * 2.20 + time * 0.17 + u_scroll * 1.65) * 0.047
      + sin(fieldX * 5.25 - time * 0.105) * 0.015;
    float slowMiddle = sin(fieldX * 2.92 - time * 0.145 + 1.15 + u_scroll * 1.10) * 0.058
      + cos(fieldX * 6.10 + time * 0.090) * 0.013;
    float slowFront = sin(fieldX * 3.72 + time * 0.125 + 2.35) * 0.033
      + cos(fieldX * 7.05 - time * 0.080) * 0.010;

    float idleSurgeLift = spectralSurge * (0.205 + colorBreath * 0.035)
      + cyanWing * 0.055;
    float backSurface = 0.335 + idleSurgeLift * 0.92 + progressLift * 0.74
      + focusLift * 0.55 + typingLift * 0.58 + submitLift * 0.78 + scrollLift + slowBack;
    float middleSurface = 0.235 + idleSurgeLift * 0.72 + progressLift * 1.02
      + focusLift + typingLift + submitLift * 0.94 + scrollLift * 0.74 + slowMiddle;
    float frontSurface = 0.110 + idleSurgeLift * 0.25 + progressLift * 0.50
      + focusLift * 0.40 + typingLift * 0.42 + submitLift * 0.60 + scrollLift * 0.45
      + slowFront;

    float backBody = belowSurface(uv.y, backSurface, 0.125);
    float middleBody = belowSurface(uv.y, middleSurface, 0.092);
    float frontBody = belowSurface(uv.y, frontSurface, 0.060);
    float backEdge = caustic(uv.y - backSurface, 28.0);
    float middleEdge = caustic(uv.y - middleSurface, 42.0);
    float frontEdge = caustic(uv.y - frontSurface, 58.0);
    float backCyanFringe = caustic(uv.y - backSurface - 0.012, 44.0);
    float backVioletFringe = caustic(uv.y - backSurface + 0.014, 40.0);
    float middleCyanFringe = caustic(uv.y - middleSurface - 0.009, 55.0);
    float middleVioletFringe = caustic(uv.y - middleSurface + 0.011, 48.0);

    float spectrumPosition = smoothstep(
      0.08,
      0.92,
      uv.x + sin(colorTime * 0.62) * 0.035
    );
    float warmProgress = smoothstep(0.08, 0.92, progress + u_submit * 0.58);
    float warmSide = smoothstep(0.40, 0.92, uv.x) * warmProgress;
    float scrollPalette = smoothstep(0.025, 0.76, u_scroll);
    vec3 backColor = mix(cobalt, violet, 0.30 + spectrumPosition * 0.50);
    vec3 middleColor = mix(cobalt, violet, 0.35 + spectrumPosition * 0.46);
    middleColor = mix(middleColor, hotMagenta, warmSide * 0.76);
    vec3 frontColor = mix(deepBlue, cobalt, 0.58 + progress * 0.18);
    backColor = mix(backColor, mix(emerald, cyan, spectrumPosition), scrollPalette * 0.76);
    middleColor = mix(middleColor, mix(acid, gold, spectrumPosition), scrollPalette * 0.66);
    frontColor = mix(frontColor, emerald, scrollPalette * 0.48);

    color += deepBlue * backBody * (0.165 + progress * 0.050);
    color += backColor * backBody * (0.085 + bottomDepth * 0.044);
    color += mix(cobalt, violet, spectrumPosition * 0.55) * backEdge
      * (0.39 + progress * 0.15 + u_scroll_energy * 0.075);
    color += cyan * backCyanFringe * (0.115 + progress * 0.065);
    color += violet * backVioletFringe * (0.160 + progress * 0.090);

    color += middleColor * middleBody * (0.110 + progress * 0.080 + focus * 0.030);
    color += mix(cyan, violet, 0.28 + spectrumPosition * 0.40) * middleEdge
      * (0.46 + progress * 0.17 + typing * 0.055);
    color += cyan * middleCyanFringe * (0.145 + focus * 0.045);
    color += mix(violet, magenta, progress * 0.62) * middleVioletFringe
      * (0.170 + progress * 0.150);

    color += frontColor * frontBody * (0.12 + progress * 0.040);
    color += mix(cyan, cobalt, 0.52) * frontEdge * (0.25 + focus * 0.08);

    float chromaBody = max(backBody * 0.72, middleBody * 0.86);
    float chromaEdge = min(1.0, backEdge * 0.58 + middleEdge * 0.76);
    color += cyan * idleCyanZone * chromaBody
      * (0.042 + colorBreath * 0.030 + progress * 0.012);
    color += violet * idleVioletZone * chromaBody
      * (0.060 + (1.0 - colorBreath) * 0.040 + progress * 0.026);
    color += cyan * idleCyanZone * chromaEdge
      * (0.075 + colorBreath * 0.045);
    color += violet * idleVioletZone * chromaEdge
      * (0.105 + (1.0 - colorBreath) * 0.055);
    color += mix(violet, hotMagenta, 0.82) * inputMagentaZone * chromaBody
      * progress * 0.390;

    float scrollBand = 0.5 + 0.5 * sin(fieldX * 5.8 - uv.y * 4.2
      + time * 0.24 + u_scroll * 7.2);
    vec3 scrollSpectrum = mix(emerald, acid, smoothstep(0.12, 0.68, uv.x));
    scrollSpectrum = mix(scrollSpectrum, gold, smoothstep(0.66, 0.96, uv.x));
    color += scrollSpectrum * chromaBody * scrollPalette
      * (0.180 + scrollBand * 0.165);
    color += mix(cyan, acid, scrollPalette) * chromaEdge * scrollPalette * 0.320;
    float scrollLight = max(color.r, max(color.g, color.b));
    float scrollRecolor = clamp(
      scrollPalette * (0.20 + chromaBody * 0.48 + chromaEdge * 0.28),
      0.0,
      0.70
    );
    color = mix(
      color,
      scrollSpectrum * (0.18 + scrollLight * 0.96),
      scrollRecolor
    );
    float scrollAmbient = scrollPalette
      * (0.085 + 0.055 * (0.5 + 0.5 * sin(fieldX * 3.2 - time * 0.18)));
    color += scrollSpectrum * scrollAmbient;

    float idleLight = max(color.r, max(color.g, color.b));
    vec3 idleSpectrumTint = mix(
      cyan,
      electricViolet,
      smoothstep(0.18, 0.82, uv.x + sin(colorTime * 0.62) * 0.035)
    );
    float idleTintStrength = clamp(
      chromaBody * 0.34 + chromaEdge * 0.42,
      0.0,
      0.58
    );
    color = mix(
      color,
      idleSpectrumTint * (0.31 + idleLight * 1.08),
      idleTintStrength
    );

    float heroSpineSurface = 0.105 + uv.x * 0.60
      + sin(uv.x * 7.8 - time * 0.16 + u_scroll * 1.4) * 0.030
      + progress * 0.050 + u_submit * 0.045;
    float heroSpineWindow = smoothstep(0.04, 0.18, uv.x)
      * (1.0 - smoothstep(0.78, 0.96, uv.x));
    float heroSpine = caustic(uv.y - heroSpineSurface, 74.0)
      * heroSpineWindow * (0.72 + spectralSurge * 0.38);
    float heroSpineHalo = caustic(uv.y - heroSpineSurface, 19.0)
      * heroSpineWindow;
    color += mix(cyan, electricViolet, smoothstep(0.22, 0.72, uv.x))
      * heroSpineHalo * (0.115 + progress * 0.045);
    color += mix(vec3(0.78, 0.96, 1.00), vec3(1.00, 0.58, 0.96),
      smoothstep(0.42, 0.76, uv.x)) * heroSpine
      * (0.56 + progress * 0.18 + u_submit * 0.16);

    float warmCrossSurface = 0.855 - uv.x * 0.555
      + sin(uv.x * 6.4 + time * 0.13 + 1.8) * 0.026
      + progress * 0.022 - u_submit * 0.030;
    float warmCrossWindow = smoothstep(0.38, 0.55, uv.x)
      * (1.0 - smoothstep(0.90, 0.98, uv.x));
    float warmCrossHalo = caustic(uv.y - warmCrossSurface, 17.0)
      * warmCrossWindow;
    float warmCross = caustic(uv.y - warmCrossSurface, 62.0)
      * warmCrossWindow;
    color += mix(magenta, coral, 0.24 + u_submit * 0.42) * warmCrossHalo
      * (0.17 + progress * 0.13 + u_submit * 0.20);
    color += mix(vec3(1.00, 0.38, 0.88), vec3(1.00, 0.66, 0.34),
      u_submit) * warmCross * (0.34 + progress * 0.18 + u_submit * 0.32);

    float prismIgnition = min(1.0, heroSpineHalo * warmCrossHalo * 1.65)
      * gaussian(uv.x - 0.66, 0.18);
    color += mix(vec3(0.76, 0.96, 1.00), vec3(1.00, 0.54, 0.86),
      0.42 + u_submit * 0.28) * prismIgnition
      * (0.42 + progress * 0.20 + u_submit * 0.30);

    float crestCut = caustic(uv.y - backSurface + 0.004, 82.0)
      * gaussian(uv.x - surgeCenter, 0.18);
    float crestHalo = caustic(uv.y - backSurface + 0.010, 21.0)
      * gaussian(uv.x - surgeCenter, 0.30);
    color += mix(electricViolet, magenta, 0.56) * crestHalo
      * (0.38 + progress * 0.22);
    color += mix(vec3(0.70, 0.88, 1.00), vec3(1.00, 0.48, 0.90),
      smoothstep(0.48, 0.78, uv.x)) * crestCut
      * (0.62 + progress * 0.20 + u_submit * 0.15) * surgePulse;

    float idleWarmThreadPath = uv.y - (0.17 + uv.x * 0.45
      + sin(uv.x * 5.5 + time * 0.11 + 2.4) * 0.022);
    float idleWarmThread = caustic(idleWarmThreadPath, 58.0)
      * smoothstep(0.55, 0.70, uv.x) * (1.0 - smoothstep(0.88, 0.98, uv.x));
    color += mix(magenta, coral, 0.32 + u_submit * 0.42) * idleWarmThread
      * (0.16 + progress * 0.16 + u_submit * 0.28);

    float inputColorField = inputMagentaZone * backBody * progress;
    color += violet * idleVioletZone * backBody * (0.045 + progress * 0.170);
    color += cyan * idleCyanZone * backEdge * (0.060 + progress * 0.055);
    color += hotMagenta * inputColorField * 0.680;

    float inputLight = max(color.r, max(color.g, color.b));
    vec3 inputTint = mix(
      electricViolet,
      magenta,
      smoothstep(0.48, 0.92, uv.x)
    );
    float inputTintStrength = clamp(
      inputMagentaZone * chromaBody * progress * 0.88,
      0.0,
      0.72
    );
    color = mix(
      color,
      inputTint * (0.31 + inputLight * 0.96),
      inputTintStrength
    );

    float typingSweepSurface = 0.035 + uv.x * 0.79
      + sin(uv.x * 8.0 - time * 0.22) * 0.022
      - progress * 0.095;
    float typingSweepWindow = smoothstep(0.06, 0.24, uv.x)
      * (1.0 - smoothstep(0.86, 0.98, uv.x));
    float typingSweepHalo = caustic(uv.y - typingSweepSurface, 15.0)
      * typingSweepWindow * typing;
    float typingSweep = caustic(uv.y - typingSweepSurface, 66.0)
      * typingSweepWindow * typing;
    color += mix(electricViolet, hotMagenta, smoothstep(0.34, 0.84, uv.x))
      * typingSweepHalo * (0.48 + progress * 0.48);
    color += mix(vec3(0.94, 0.86, 1.0), vec3(1.0, 0.34, 0.75),
      smoothstep(0.38, 0.82, uv.x)) * typingSweep
      * (0.80 + progress * 0.42);

    float submitColorField = submitWarmZone
      * belowSurface(uv.y, backSurface + 0.10, 0.17) * u_submit;
    color += mix(coral, amber, 0.38 + colorBreath * 0.20)
      * submitColorField * 0.430;
    float submitAmberEdge = gaussian(uv.x - (warmCenter + 0.08), 0.16)
      * min(1.0, backEdge * 0.54 + middleEdge) * u_submit;
    color += amber * submitAmberEdge * 0.340;

    float submitLight = max(color.r, max(color.g, color.b));
    vec3 submitTint = mix(coral, amber, smoothstep(0.55, 0.88, uv.x));
    float submitTintStrength = clamp(
      submitWarmZone * (chromaBody * 0.52 + chromaEdge * 0.72) * u_submit * 0.86,
      0.0,
      0.68
    );
    color = mix(
      color,
      submitTint * (0.24 + submitLight * 0.86),
      submitTintStrength
    );

    float lowerMask = 1.0 - smoothstep(backSurface + 0.05, backSurface + 0.31, uv.y);
    float seamAPath = fieldX - (-0.46 + uv.y * 0.43
      + sin(uv.y * 4.35 + time * 0.12 + u_scroll) * 0.062);
    float seamBPath = fieldX - (0.18 - uv.y * 0.24
      + cos(uv.y * 5.15 - time * 0.105 + 0.7) * 0.078);
    float seamCPath = fieldX - (0.54 - uv.y * 0.58
      + sin(uv.y * 3.30 + time * 0.085 + 2.2) * 0.052);
    float seamA = caustic(seamAPath, 30.0) * lowerMask;
    float seamB = caustic(seamBPath, 27.0) * lowerMask;
    float seamC = caustic(seamCPath, 38.0) * lowerMask;

    color += mix(cyan, violet, 0.35 + idleVioletZone * 0.22) * seamA
      * (0.185 + progress * 0.095);
    color += mix(cobalt, magenta, warmProgress * 0.72) * seamB
      * (0.155 + progress * 0.115);
    color += mix(violet, coral, warmProgress * 0.72) * seamC
      * (0.090 + warmProgress * 0.145);

    float touchStreamPath = fieldX - (touchCenter + (uv.y - 0.16) * 0.13);
    float touchStream = caustic(touchStreamPath, 24.0) * lowerMask * u_touch;
    color += mix(cyan, violet, 0.42) * touchStream * 0.25;

    float pointerStreamPath = fieldX - ((u_pointer.x - 0.5) * aspect * 0.72
      + sin(uv.y * 3.4 + time * 0.09) * 0.035);
    float pointerStream = caustic(pointerStreamPath, 17.0) * lowerMask * hover;
    color += mix(cyan, hotMagenta, smoothstep(0.32, 0.78, u_pointer.x))
      * pointerStream * (0.085 + hoverEnergy * 0.10);

    float hoverWakeSurface = 0.10 + uv.x * 0.68
      + (u_pointer.y - 0.5) * 0.20
      - (u_pointer.x - 0.5) * 0.12
      + sin(uv.x * 6.6 + time * 0.24) * 0.025;
    float hoverWakeWindow = smoothstep(0.03, 0.18, uv.x)
      * (1.0 - smoothstep(0.86, 0.98, uv.x));
    float hoverWakeHalo = caustic(uv.y - hoverWakeSurface, 13.0)
      * hoverWakeWindow * hover;
    float hoverWake = caustic(uv.y - hoverWakeSurface, 50.0)
      * hoverWakeWindow * hover;
    color += mix(cyan, electricViolet, u_pointer.x) * hoverWakeHalo
      * (0.095 + hoverEnergy * 0.11);
    color += mix(vec3(0.78, 0.96, 1.0), vec3(1.0, 0.34, 0.84), u_pointer.x)
      * hoverWake * (0.15 + hoverEnergy * 0.16);

    float typingSheen = caustic(uv.y - middleSurface - 0.018, 47.0)
      * typing * (0.45 + 0.55 * smoothstep(-0.75, 0.62, fieldX));
    color += mix(electricViolet, hotMagenta, 0.58 + progress * 0.32) * typingSheen * 0.24;

    float scrollCurrent = (0.5 + 0.5 * sin(fieldX * 9.4 - uv.y * 5.8
      + time * 0.38 + scrollFlow * 4.2)) * lowerMask * u_scroll_energy;
    color += mix(emerald, acid, 0.34 + max(0.0, u_scroll_direction) * 0.22)
      * scrollCurrent * (0.16 + scrollPalette * 0.16);

    float warmLead = warmProgress * (middleEdge * smoothstep(-0.10, 0.68, fieldX)
      + seamC * 0.62 + frontEdge * 0.24);
    color += mix(coral, amber, 0.32 + u_submit * 0.36) * warmLead
      * (0.145 + u_submit * 0.310);

    float copyCenterY = mix(0.665, 0.655, compact);
    float copyPocket = gaussian(uv.x - 0.5, mix(0.31, 0.37, compact))
      * gaussian(uv.y - copyCenterY, mix(0.105, 0.125, compact));
    float copyProtection = min(0.98, 0.82 + progress * 0.08 + u_submit * 0.10);
    color = mix(color, color * 0.18 + ink * 0.82, copyPocket * copyProtection);

    float headerQuiet = smoothstep(0.78, 0.94, uv.y);
    color = mix(color, color * 0.30 + ink * 0.70, headerQuiet * 0.86);

    float floorQuiet = 1.0 - smoothstep(0.0, 0.14, uv.y);
    color = mix(color, color * 0.58 + ink * 0.42, floorQuiet * 0.48);

    float edgeX = smoothstep(0.34, 0.56, abs(uv.x - 0.5));
    float edgeY = smoothstep(0.42, 0.62, abs(uv.y - 0.5));
    float frameVignette = max(edgeX, edgeY);
    color = mix(color, ink, frameVignette * 0.20);

    float exposure = 1.25 + progress * 0.38 + u_submit * 0.26
      + typing * 0.10 + hoverEnergy * 0.04 + u_scroll_energy * 0.12;
    color = vec3(1.0) - exp(-color * exposure);

    float grain = random(gl_FragCoord.xy + floor(u_time * 9.0)) - 0.5;
    color += grain * 0.010;

    gl_FragColor = vec4(clamp(color, 0.0, 1.0), 1.0);
  }
`;function G(r,f,m){const n=r.createShader(f);return r.shaderSource(n,m),r.compileShader(n),r.getShaderParameter(n,r.COMPILE_STATUS)?n:(r.deleteShader(n),null)}function oe(r){const f=G(r,r.VERTEX_SHADER,$),m=G(r,r.FRAGMENT_SHADER,ee);if(!f||!m)return null;const n=r.createProgram();return r.attachShader(n,f),r.attachShader(n,m),r.linkProgram(n),r.deleteShader(f),r.deleteShader(m),r.getProgramParameter(n,r.LINK_STATUS)?n:(r.deleteProgram(n),null)}function p(r,f,m,n){return r+(f-r)*(1-Math.exp(-m*n))}function re({active:r,typing:f=!1,momentum:m=0,submitting:n}){const B=x.useRef(null),[X,q]=x.useState(()=>window.matchMedia("(prefers-reduced-motion: reduce)").matches),A=x.useRef({active:r,momentum:m,submitting:n}),h=x.useRef({touch:0,touchX:.5,hover:0,hoverEnergy:0,pointerX:.5,pointerY:.46,pointerTime:0});return x.useEffect(()=>{A.current={active:r,typing:f,momentum:m,submitting:n}},[r,f,m,n]),x.useEffect(()=>{const a=window.matchMedia("(prefers-reduced-motion: reduce)"),e=()=>q(a.matches);return a.addEventListener?.("change",e),()=>a.removeEventListener?.("change",e)},[]),x.useEffect(()=>{const a=B.current;if(!a)return;if(X){a.dataset.renderer="css-static",a.dataset.animationState="paused-reduced-motion";return}const e=a?.getContext("webgl",{alpha:!1,antialias:!1,depth:!1,powerPreference:"high-performance",premultipliedAlpha:!1});if(!e)return;const c=oe(e);if(!c)return;a.dataset.renderer="webgl",a.dataset.field="idea-ignition",e.useProgram(c);const F=e.createBuffer();e.bindBuffer(e.ARRAY_BUFFER,F),e.bufferData(e.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,-1,1,1,-1,1,1]),e.STATIC_DRAW);const R=e.getAttribLocation(c,"a_position");e.enableVertexAttribArray(R),e.vertexAttribPointer(R,2,e.FLOAT,!1,0,0);const l={resolution:e.getUniformLocation(c,"u_resolution"),pointer:e.getUniformLocation(c,"u_pointer"),time:e.getUniformLocation(c,"u_time"),focus:e.getUniformLocation(c,"u_focus"),typing:e.getUniformLocation(c,"u_typing"),progress:e.getUniformLocation(c,"u_progress"),submit:e.getUniformLocation(c,"u_submit"),scroll:e.getUniformLocation(c,"u_scroll"),scrollEnergy:e.getUniformLocation(c,"u_scroll_energy"),scrollDirection:e.getUniformLocation(c,"u_scroll_direction"),touch:e.getUniformLocation(c,"u_touch"),touchX:e.getUniformLocation(c,"u_touch_x"),hover:e.getUniformLocation(c,"u_hover"),hoverEnergy:e.getUniformLocation(c,"u_hover_energy")},g={x:.5,y:.46},y={progress:0,energy:0,direction:1},t={focus:0,typing:0,progress:0,submit:0,touch:0,hover:0,hoverEnergy:0,pointerX:.5,pointerY:.46,touchX:.5,scroll:0,scrollEnergy:0,scrollDirection:1};let b=0,w=0,d=0,S=window.performance.now(),W=window.scrollY,V=S,D=0,M=!1,_=!document.hidden,E=!0;function P(){e.uniform2f(l.resolution,b,w),e.uniform2f(l.pointer,t.pointerX,t.pointerY),e.uniform1f(l.time,D),e.uniform1f(l.focus,t.focus),e.uniform1f(l.typing,t.typing),e.uniform1f(l.progress,t.progress),e.uniform1f(l.submit,t.submit),e.uniform1f(l.scroll,t.scroll),e.uniform1f(l.scrollEnergy,t.scrollEnergy),e.uniform1f(l.scrollDirection,t.scrollDirection),e.uniform1f(l.touch,t.touch),e.uniform1f(l.touchX,t.touchX),e.uniform1f(l.hover,t.hover),e.uniform1f(l.hoverEnergy,t.hoverEnergy),e.drawArrays(e.TRIANGLES,0,6)}function U(){return!M&&_&&E}function K(){return M?"disposed":_?E?"running":"paused-offscreen":"paused-document-hidden"}function C(){if(a.dataset.animationState=K(),!U()){d&&window.cancelAnimationFrame(d),d=0,_&&E&&P();return}d||(S=window.performance.now(),d=window.requestAnimationFrame(N))}function Y(){const s=a.getBoundingClientRect(),o=window.innerWidth<760?1.35:1.5,i=Math.min(window.devicePixelRatio||1,o);b=Math.max(1,Math.round(s.width*i)),w=Math.max(1,Math.round(s.height*i)),(a.width!==b||a.height!==w)&&(a.width=b,a.height=w,e.viewport(0,0,b,w),P())}function H(s){const o=a.getBoundingClientRect();return!o.width||!o.height?null:{x:Math.min(1,Math.max(0,(s.clientX-o.left)/o.width)),y:1-Math.min(1,Math.max(0,(s.clientY-o.top)/o.height))}}function Z(s){const o=H(s);if(!o)return;const i=h.current,u=window.performance.now(),v=Math.max(.008,(u-(i.pointerTime||u-16))/1e3),T=Math.hypot(o.x-i.pointerX,o.y-i.pointerY)/v;g.x=o.x,g.y=o.y,i.hover=1,i.hoverEnergy=Math.max(i.hoverEnergy,Math.min(.24,.035+T*.055)),i.pointerX=o.x,i.pointerY=o.y,i.pointerTime=u}function I(s){const o=H(s);o&&(g.x=o.x,g.y=o.y,h.current.touchX=o.x,h.current.touch=.34,h.current.hover=1,h.current.hoverEnergy=Math.max(h.current.hoverEnergy,.12))}function O(){g.x=.5,g.y=.46,h.current.hover=0}function k(){const s=window.performance.now(),o=window.scrollY,i=o-W,u=Math.max(16,s-V),v=Math.max(1,window.innerHeight*1.08),L=Math.abs(i)/u;y.progress=Math.min(1,Math.max(0,o/v)),Math.abs(i)>.5&&(y.direction=Math.sign(i),y.energy=Math.min(1,.15+L*.68+Math.abs(i)/260)),W=o,V=s}function N(s){if(d=0,!U()){C();return}const o=Math.min(.05,Math.max(.001,(s-S)/1e3));S=s;const i=A.current,u=h.current,v=1;t.focus=p(t.focus,i.active?1:0,o,8.5);const L=typeof i.typing=="number"?Math.min(1,Math.max(0,i.typing)):i.typing?1:0;t.typing=p(t.typing,L,o,10.5),t.progress=p(t.progress,i.momentum,o,7.4),t.submit=p(t.submit,i.submitting?1:0,o,4.6),t.hover=p(t.hover,u.hover*v,o,2.8),t.pointerX=p(t.pointerX,g.x,o,1.9),t.pointerY=p(t.pointerY,g.y,o,1.9),t.touchX=p(t.touchX,u.touchX,o,11),t.scroll=p(t.scroll,y.progress,o,2.6),t.scrollDirection=p(t.scrollDirection,y.direction,o,7),t.touch=Math.max(u.touch*v,t.touch*Math.exp(-o*1.78)),t.hoverEnergy=Math.max(u.hoverEnergy*v,t.hoverEnergy*Math.exp(-o*2.7)),t.scrollEnergy=Math.max(y.energy*v,t.scrollEnergy*Math.exp(-o*3)),u.touch=0,u.hoverEnergy*=Math.exp(-o*3.2),y.energy*=Math.exp(-o*8);const T=.82+t.focus*.1+t.typing*.34+t.progress*.22+t.submit*.28+t.scrollEnergy*.16;D+=o*T,P(),d=window.requestAnimationFrame(N)}function Q(){_=!document.hidden,C()}const j=new ResizeObserver(Y),z=typeof IntersectionObserver=="function"?new IntersectionObserver(s=>{const o=s.at(-1);E=!!(o?.isIntersecting&&o.intersectionRatio>0),C()},{threshold:0}):null;return j.observe(a),z?.observe(a),window.addEventListener("pointermove",Z,{passive:!0}),window.addEventListener("pointerdown",I,{passive:!0}),window.addEventListener("scroll",k,{passive:!0}),document.documentElement.addEventListener("pointerleave",O),document.addEventListener("visibilitychange",Q),Y(),k(),C(),()=>{M=!0,d&&window.cancelAnimationFrame(d),d=0,j.disconnect(),z?.disconnect(),window.removeEventListener("pointermove",Z),window.removeEventListener("pointerdown",I),window.removeEventListener("scroll",k),document.documentElement.removeEventListener("pointerleave",O),document.removeEventListener("visibilitychange",Q),a.dataset.animationState="disposed",e.deleteBuffer(F),e.deleteProgram(c)}},[X]),J.jsx("canvas",{ref:B,className:"lab-home-field-canvas","aria-hidden":"true"})}export{re as ThinkingFieldCanvas};
