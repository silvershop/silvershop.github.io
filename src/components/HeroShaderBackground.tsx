import { useEffect, useRef } from "react";

/** Logo blue — hero gradient / shader accent */
const BRAND_RGB: [number, number, number] = [0x11 / 255, 0x9b / 255, 0xf2 / 255];

const VERT_SRC = `
attribute vec2 a_pos;
void main() {
  gl_Position = vec4(a_pos, 0.0, 1.0);
}
`;

const FRAG_SRC = `
precision mediump float;
uniform vec2 u_resolution;
uniform float u_time;
uniform vec3 u_brand;

void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution.xy;
  vec2 p = (gl_FragCoord.xy - 0.5 * u_resolution.xy) / min(u_resolution.x, u_resolution.y);
  float t = u_time * 0.18;

  float waveA = sin(p.x * 2.0 + p.y * 1.4 + t) * 0.5 + 0.5;
  float waveB = sin(p.x * 1.1 - p.y * 2.0 + t * 0.7 + 1.2) * 0.5 + 0.5;
  float waveC = sin(length(p + vec2(sin(t * 0.35), cos(t * 0.22))) * 2.6 + t) * 0.5 + 0.5;

  /* Light field anchored near brand #119bf2 */
  vec3 base = mix(vec3(0.78, 0.93, 0.995), u_brand, 0.22);
  vec3 col = base;
  col = mix(col, u_brand * 0.98, waveA * 0.44);
  col = mix(col, u_brand, waveB * 0.3);
  col += u_brand * waveC * 0.11;

  /* Top-left wash — pairs with hero logo placement */
  vec2 tl = uv - vec2(0.08, 0.92);
  tl.y *= u_resolution.x / u_resolution.y;
  float topLeft = exp(-dot(tl, tl) * 1.15);
  col = mix(col, u_brand, topLeft * 0.34);
  col += u_brand * topLeft * 0.12;

  vec2 hp = uv - vec2(0.78, 0.12);
  float hotspot = exp(-dot(hp, hp) * 3.5);
  col += u_brand * hotspot * 0.16;

  vec2 lp = uv - vec2(0.22, 0.65);
  float cool = exp(-dot(lp, lp) * 2.2);
  col = mix(col, col + vec3(0.02, 0.05, 0.08), cool * 0.28);

  vec2 q = uv - 0.5;
  float vig = 1.0 - dot(q, q) * 0.14;
  col *= vig;

  float grain = fract(sin(dot(gl_FragCoord.xy + u_time * 40.0, vec2(12.9898, 78.233))) * 43758.5453);
  col += (grain - 0.5) * 0.016;

  gl_FragColor = vec4(col, 1.0);
}
`;

function compile(
  gl: WebGLRenderingContext,
  vertSrc: string,
  fragSrc: string,
): WebGLProgram | null {
  const vs = gl.createShader(gl.VERTEX_SHADER);
  const fs = gl.createShader(gl.FRAGMENT_SHADER);
  if (!vs || !fs) return null;
  gl.shaderSource(vs, vertSrc);
  gl.shaderSource(fs, fragSrc);
  gl.compileShader(vs);
  gl.compileShader(fs);
  if (!gl.getShaderParameter(vs, gl.COMPILE_STATUS) || !gl.getShaderParameter(fs, gl.COMPILE_STATUS)) {
    gl.deleteShader(vs);
    gl.deleteShader(fs);
    return null;
  }
  const prog = gl.createProgram();
  if (!prog) return null;
  gl.attachShader(prog, vs);
  gl.attachShader(prog, fs);
  gl.linkProgram(prog);
  gl.deleteShader(vs);
  gl.deleteShader(fs);
  if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
    gl.deleteProgram(prog);
    return null;
  }
  return prog;
}

/**
 * Full-bleed WebGL fragment backdrop for the home hero (light procedural field near brand #119bf2).
 */
export function HeroShaderBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl", {
      alpha: false,
      antialias: false,
      depth: false,
      stencil: false,
      powerPreference: "low-power",
    });
    if (!gl) {
      canvas.remove();
      return;
    }

    const program = compile(gl, VERT_SRC, FRAG_SRC);
    if (!program) {
      canvas.remove();
      return;
    }

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const buf = gl.createBuffer();
    if (!buf) {
      gl.deleteProgram(program);
      canvas.remove();
      return;
    }
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);

    const aPos = gl.getAttribLocation(program, "a_pos");
    const uRes = gl.getUniformLocation(program, "u_resolution");
    const uTime = gl.getUniformLocation(program, "u_time");
    const uBrand = gl.getUniformLocation(program, "u_brand");

    let raf = 0;
    let start = performance.now();

    const resize = () => {
      const hero = canvas.parentElement;
      if (!hero) return;
      const w = hero.clientWidth;
      const h = hero.clientHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const cw = Math.max(1, Math.floor(w * dpr));
      const ch = Math.max(1, Math.floor(h * dpr));
      if (canvas.width !== cw || canvas.height !== ch) {
        canvas.width = cw;
        canvas.height = ch;
      }
      gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
    };

    const draw = (now: number) => {
      resize();
      const t = reduceMotion ? 0 : (now - start) / 1000;
      gl.clearColor(0.78, 0.93, 0.995, 1);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.useProgram(program);
      gl.bindBuffer(gl.ARRAY_BUFFER, buf);
      gl.enableVertexAttribArray(aPos);
      gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);
      gl.uniform2f(uRes, gl.drawingBufferWidth, gl.drawingBufferHeight);
      gl.uniform1f(uTime, t);
      gl.uniform3f(uBrand, BRAND_RGB[0], BRAND_RGB[1], BRAND_RGB[2]);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    };

    const loop = (now: number) => {
      draw(now);
      raf = reduceMotion ? 0 : requestAnimationFrame(loop);
    };

    resize();
    draw(performance.now());

    if (!reduceMotion) {
      raf = requestAnimationFrame(loop);
    }

    const ro = new ResizeObserver(() => {
      resize();
      draw(reduceMotion ? performance.now() : performance.now());
    });
    const hero = canvas.parentElement;
    if (hero) ro.observe(hero);

    const onVisibility = () => {
      if (document.hidden && raf) {
        cancelAnimationFrame(raf);
        raf = 0;
      } else if (!document.hidden && !reduceMotion && !raf) {
        start = performance.now();
        raf = requestAnimationFrame(loop);
      }
    };
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      document.removeEventListener("visibilitychange", onVisibility);
      ro.disconnect();
      if (raf) cancelAnimationFrame(raf);
      gl.deleteProgram(program);
      gl.deleteBuffer(buf);
    };
  }, []);

  return <canvas ref={canvasRef} className="hero-shader" aria-hidden="true" />;
}
