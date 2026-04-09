'use client';
import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { cn } from '@/lib/utils';

type Props = {
	className?: string;
	outerRef: { current: HTMLDivElement | null };
};

function makeGlowTexture(size = 64): THREE.CanvasTexture {
	const c = document.createElement('canvas');
	c.width = size;
	c.height = size;
	const ctx = c.getContext('2d')!;
	const g = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
	g.addColorStop(0,   'rgba(255,255,255,1)');
	g.addColorStop(0.18,'rgba(255,255,255,0.9)');
	g.addColorStop(0.45,'rgba(255,200,50,0.4)');
	g.addColorStop(1,   'rgba(255,100,0,0)');
	ctx.fillStyle = g;
	ctx.fillRect(0, 0, size, size);
	return new THREE.CanvasTexture(c);
}

export function ParticleSphere({ className, outerRef }: Props) {
	const containerRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const container = containerRef.current;
		if (!container) return;

		let W = window.innerWidth;
		let H = window.innerHeight;

		/* ─── Scene ─────────────────────────────── */
		const scene = new THREE.Scene();
		const camera = new THREE.PerspectiveCamera(55, W / H, 0.1, 100);
		camera.position.set(0, 0, 6);

		const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
		renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
		renderer.setSize(W, H);
		renderer.setClearColor(0x000000, 0);
		container.appendChild(renderer.domElement);

		/* ─── UV-grid sphere positions ──────────── */
		const COLS = 80;
		const ROWS = 50;
		const COUNT = COLS * ROWS;
		const SPHERE_R = 2.1;

		const phis   = new Float32Array(COUNT);
		const thetas = new Float32Array(COUNT);
		const baseNX = new Float32Array(COUNT);
		const baseNY = new Float32Array(COUNT);
		const baseNZ = new Float32Array(COUNT);

		for (let row = 0; row < ROWS; row++) {
			for (let col = 0; col < COLS; col++) {
				const i = row * COLS + col;
				const phi   = (row / (ROWS - 1)) * Math.PI;
				const theta = (col / COLS)        * Math.PI * 2;
				phis[i]   = phi;
				thetas[i] = theta;
				baseNX[i] = Math.sin(phi) * Math.cos(theta);
				baseNY[i] = Math.cos(phi);
				baseNZ[i] = Math.sin(phi) * Math.sin(theta);
			}
		}

		const sphereBase = new Float32Array(COUNT * 3);
		for (let i = 0; i < COUNT; i++) {
			sphereBase[i * 3]     = SPHERE_R * baseNX[i];
			sphereBase[i * 3 + 1] = SPHERE_R * baseNY[i];
			sphereBase[i * 3 + 2] = SPHERE_R * baseNZ[i];
		}

		const scatterPos = new Float32Array(COUNT * 3);
		for (let i = 0; i < COUNT; i++) {
			scatterPos[i * 3]     = (Math.random() - 0.5) * 16;
			scatterPos[i * 3 + 1] = (Math.random() - 0.5) * 10;
			scatterPos[i * 3 + 2] = (Math.random() - 0.5) * 8 - 1;
		}

		/* ─── Geometry & material ───────────────── */
		const positions = new Float32Array(scatterPos);
		const colors    = new Float32Array(COUNT * 3);

		for (let i = 0; i < COUNT; i++) {
			colors[i * 3]     = 0.7 + Math.random() * 0.3;
			colors[i * 3 + 1] = 0.15 + Math.random() * 0.25;
			colors[i * 3 + 2] = 0.0;
		}

		const geo = new THREE.BufferGeometry();
		geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
		geo.setAttribute('color',    new THREE.BufferAttribute(colors,    3));

		const sprite = makeGlowTexture(64);
		const mat = new THREE.PointsMaterial({
			size: 0.048,
			map: sprite,
			vertexColors: true,
			transparent: true,
			opacity: 1,
			blending: THREE.AdditiveBlending,
			depthWrite: false,
			sizeAttenuation: true,
		});

		const points = new THREE.Points(geo, mat);
		scene.add(points);

		/* ─── Scroll progress ───────────────────── */
		let rawP   = 0;
		let smoothP = 0;

		const onScroll = () => {
			const outer = outerRef.current;
			if (!outer) return;
			const top       = outer.getBoundingClientRect().top;
			const maxScroll = outer.clientHeight - window.innerHeight;
			if (maxScroll <= 0) return;
			rawP = Math.max(0, Math.min(1, -top / maxScroll));
		};
		window.addEventListener('scroll', onScroll, { passive: true });

		/* ─── Animation ─────────────────────────── */
		let raf = 0;
		let t   = 0;

		const PRI_R = 225 / 255;
		const PRI_G = 109 / 255;
		const PRI_B = 0;

		const animate = () => {
			raf = requestAnimationFrame(animate);
			t += 0.008;

			smoothP += (rawP - smoothP) * 0.055;
			const p = smoothP < 0.5
				? 4 * smoothP * smoothP * smoothP
				: 1 - Math.pow(-2 * smoothP + 2, 3) / 2;

			points.rotation.y += 0.0015 + 0.004 * p;
			points.rotation.x  = Math.sin(t * 0.18) * 0.07 * p;

			const ry = points.rotation.y;
			const rx = points.rotation.x;
			const cosY = Math.cos(ry), sinY = Math.sin(ry);
			const cosX = Math.cos(rx), sinX = Math.sin(rx);
			const camLX = sinY;
			const camLY = cosY * sinX;
			const camLZ = cosY * cosX;

			const pos = geo.attributes.position.array as Float32Array;
			const col = geo.attributes.color.array    as Float32Array;

			const fAmp = (1 - p) * (1 - p) * 0.2;

			for (let i = 0; i < COUNT; i++) {
				const k = i * 3;

				const wave = p * 0.13 * Math.sin(thetas[i] * 4 + t * 1.1) * Math.sin(phis[i] * 3 + t * 0.75);
				const r = SPHERE_R * (1 + wave);

				const sx = r * baseNX[i];
				const sy = r * baseNY[i];
				const sz = r * baseNZ[i];

				const fx = Math.sin(t * 0.6 + i * 0.017) * fAmp;
				const fy = Math.cos(t * 0.45 + i * 0.023) * fAmp;

				pos[k]     = scatterPos[k]     + (sx - scatterPos[k])     * p + fx;
				pos[k + 1] = scatterPos[k + 1] + (sy - scatterPos[k + 1]) * p + fy;
				pos[k + 2] = scatterPos[k + 2] + (sz - scatterPos[k + 2]) * p;

				const dot     = baseNX[i] * camLX + baseNY[i] * camLY + baseNZ[i] * camLZ;
				const facing  = Math.abs(dot);
				const fresnel = 1 - facing;

				let cr, cg, cb: number;
				if (fresnel > 0.82) {
					const f2 = (fresnel - 0.82) / 0.18;
					cr = 1.0;
					cg = 0.55 + f2 * 0.45;
					cb = f2 * 0.25;
				} else if (fresnel > 0.52) {
					const f2 = (fresnel - 0.52) / 0.30;
					cr = PRI_R + (1.0 - PRI_R) * f2;
					cg = PRI_G + (0.55 - PRI_G) * f2;
					cb = PRI_B;
				} else {
					const f2 = fresnel / 0.52;
					cr = 0.30 + (PRI_R - 0.30) * f2;
					cg = 0.02 + (PRI_G - 0.02) * f2;
					cb = PRI_B;
				}

				if (p < 1) {
					const scatterR = 0.7 + (i % 7) * 0.04;
					col[k]     = scatterR  + (cr - scatterR)  * p;
					col[k + 1] = 0.2       + (cg - 0.2)       * p;
					col[k + 2] = 0.0       + (cb - 0.0)       * p;
				} else {
					col[k]     = cr;
					col[k + 1] = cg;
					col[k + 2] = cb;
				}
			}

			geo.attributes.position.needsUpdate = true;
			geo.attributes.color.needsUpdate    = true;

			mat.size = 0.04 + p * 0.022;

			renderer.render(scene, camera);
		};
		animate();

		/* ─── Resize ────────────────────────────── */
		const onResize = () => {
			W = window.innerWidth;
			H = window.innerHeight;
			camera.aspect = W / H;
			camera.updateProjectionMatrix();
			renderer.setSize(W, H);
		};
		window.addEventListener('resize', onResize);

		return () => {
			cancelAnimationFrame(raf);
			window.removeEventListener('scroll', onScroll);
			window.removeEventListener('resize', onResize);
			geo.dispose();
			mat.dispose();
			sprite.dispose();
			renderer.dispose();
			if (container.contains(renderer.domElement)) container.removeChild(renderer.domElement);
		};
	}, [outerRef]);

	return <div ref={containerRef} className={cn('pointer-events-none', className)} />;
}
