
// Sofia & Theo: The Neuro-Sync Spatial Engine
// Pure Three.js Core Implementation - AAA Game Architecture
// Powered by AI Studio Build - Game Dev Mode

// Access THREE from global window scope (loaded via CDN)
const THREE = (window as any).THREE;

if (!THREE) {
    console.error("Three.js not found! Ensure CDN is loaded in index.html");
    document.body.innerHTML += '<div style="color:white;position:fixed;top:0;left:0;background:red;padding:10px;z-index:9999">Erro: Three.js não carregado da CDN. Verifique a conexão ou o link no index.html.</div>';
}

/**
 * CONFIGURAÇÕES GERAIS
 */
const CONFIG = {
    PALETTE: {
        SKY_BOTTOM: '#ffecd2',
        SKY_TOP: '#fcb69f',
        GROUND: '#e0f2f1',
        NEON_TEAL: '#80deea',
        NEON_PINK: '#f48fb1',
        HOLOGR_BLUE: '#22d3ee'
    },
    PLAYER: {
        SPEED: 0.15,
        ROTATION_SPEED: 0.15
    },
    CITY: {
        SIZE: 300,
        BUILDING_MAX_HEIGHT: 50,
        BUILDING_MIN_HEIGHT: 15,
        BUILDING_COUNT: 45
    }
};

/**
 * ENGINE CORE
 */
class GameEngine {
    scene: any;
    camera: any;
    renderer: any;
    clock: any;
    player: Player | null = null;
    npc: NPC | null = null;
    buildings: any[] = [];
    hud: GameHUD | null = null;
    dialogue: DialogueBox | null = null;
    syncScore: number = 0;

    constructor() {
        this.init();
        this.createEnvironment();
        this.spawnActors();
        this.setupControls();
        this.hud = new GameHUD();
        this.dialogue = new DialogueBox();
        this.animate();
    }

    init() {
        const canvas = document.getElementById('world') as HTMLCanvasElement;
        this.renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;

        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(CONFIG.PALETTE.SKY_BOTTOM);
        this.scene.fog = new THREE.FogExp2(CONFIG.PALETTE.SKY_BOTTOM, 0.012);

        this.camera = new THREE.PerspectiveCamera(65, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.camera.position.set(0, 15, 20);

        this.clock = new THREE.Clock();

        // Iluminação
        const ambient = new THREE.AmbientLight(0xffffff, 0.7);
        this.scene.add(ambient);

        const sun = new THREE.DirectionalLight(0xffe4b5, 1.3);
        sun.position.set(30, 40, 30);
        sun.castShadow = true;
        sun.shadow.camera.left = -100;
        sun.shadow.camera.right = 100;
        sun.shadow.camera.top = 100;
        sun.shadow.camera.bottom = -100;
        sun.shadow.mapSize.width = 2048;
        sun.shadow.mapSize.height = 2048;
        this.scene.add(sun);
    }

    createEnvironment() {
        // Chão Terapêutico
        const floorGeo = new THREE.PlaneGeometry(800, 800);
        const floorMat = new THREE.MeshStandardMaterial({ 
            color: CONFIG.PALETTE.GROUND, 
            roughness: 0.85, 
            metalness: 0.05 
        });
        const floor = new THREE.Mesh(floorGeo, floorMat);
        floor.rotation.x = -Math.PI / 2;
        floor.receiveShadow = true;
        this.scene.add(floor);

        // Grade Neon
        const grid = new THREE.GridHelper(500, 125, CONFIG.PALETTE.NEON_TEAL, CONFIG.PALETTE.NEON_TEAL);
        grid.material.opacity = 0.1;
        grid.material.transparent = true;
        grid.position.y = 0.02;
        this.scene.add(grid);

        // Prédios Procedurais (Holographic City)
        for(let i=0; i < CONFIG.CITY.BUILDING_COUNT; i++) {
            const w = 6 + Math.random() * 8;
            const h = CONFIG.CITY.BUILDING_MIN_HEIGHT + Math.random() * (CONFIG.CITY.BUILDING_MAX_HEIGHT - CONFIG.CITY.BUILDING_MIN_HEIGHT);
            const d = 6 + Math.random() * 8;
            const x = (Math.random() - 0.5) * 200;
            const z = (Math.random() - 0.5) * 200;

            // Evita spawn no centro (onde Theo começa)
            if (Math.abs(x) < 20 && Math.abs(z) < 20) continue;

            const geo = new THREE.BoxGeometry(w, h, d);
            const mat = new THREE.MeshStandardMaterial({ 
                color: CONFIG.PALETTE.HOLOGR_BLUE, 
                transparent: true, 
                opacity: 0.05, 
                emissive: CONFIG.PALETTE.HOLOGR_BLUE,
                emissiveIntensity: 0.15
            });
            const b = new THREE.Mesh(geo, mat);
            b.position.set(x, h/2, z);
            b.castShadow = true;
            b.receiveShadow = true;
            this.scene.add(b);

            // Borda Neon
            const edges = new THREE.EdgesGeometry(geo);
            const line = new THREE.LineSegments(edges, new THREE.LineBasicMaterial({ color: CONFIG.PALETTE.HOLOGR_BLUE, transparent: true, opacity: 0.25 }));
            b.add(line);

            this.buildings.push({ mesh: b, radius: Math.max(w, d) / 1.7 });
        }
    }

    spawnActors() {
        this.player = new Player(this.scene, '#80deea', 'Theo');
        this.npc = new NPC(this.scene, '#f48fb1', 'Sofia');
        this.npc.mesh.position.set(6, 0, -6);
    }

    setupControls() {
        new JoystickHUD((x: number, y: number) => {
            if(this.player) this.player.setInput(x, y);
        });

        window.addEventListener('resize', () => {
            this.camera.aspect = window.innerWidth / window.innerHeight;
            this.camera.updateProjectionMatrix();
            this.renderer.setSize(window.innerWidth, window.innerHeight);
        });
    }

    checkCollisions() {
        if(!this.player) return;
        const pPos = this.player.mesh.position;

        for(const b of this.buildings) {
            const dist = pPos.distanceTo(b.mesh.position);
            if(dist < b.radius + 1.0) {
                const dir = pPos.clone().sub(b.mesh.position).normalize();
                pPos.add(dir.multiplyScalar(0.25));
            }
        }

        // Colisão com NPC (Sofia)
        if(this.npc) {
            const dist = pPos.distanceTo(this.npc.mesh.position);
            if(dist < 2.5) {
                const dir = pPos.clone().sub(this.npc.mesh.position).normalize();
                pPos.add(dir.multiplyScalar(0.15));
            }
        }
    }

    animate() {
        requestAnimationFrame(() => this.animate());
        const delta = this.clock.getDelta();

        if (this.player) {
            this.player.update(delta);
            this.checkCollisions();

            // Câmera dinâmica follow
            const targetPos = this.player.mesh.position.clone();
            const camOffset = new THREE.Vector3(0, 12, 18);
            this.camera.position.lerp(targetPos.add(camOffset), 0.08);
            this.camera.lookAt(this.player.mesh.position);
        }

        if (this.npc) {
            this.npc.update(this.clock.elapsedTime, this.player?.mesh.position);
            
            // Lógica de Proximidade e Interação
            const distToNpc = this.player!.mesh.position.distanceTo(this.npc.mesh.position);
            if (distToNpc < 5) {
                this.dialogue?.show("Olá Theo! Vamos sincronizar nossos circuitos? 💙");
                if (this.syncScore < 100) {
                    this.syncScore += delta * 5; // Sincroniza 5% por segundo perto
                    this.hud?.updateScore(this.syncScore);
                }
            } else {
                this.dialogue?.hide();
            }
        }

        this.renderer.render(this.scene, this.camera);
    }
}

/**
 * CLASSES DE ATORES
 */
class Player {
    mesh: any;
    input = { x: 0, y: 0 };
    targetRotation = 0;

    constructor(scene: any, color: string, name: string) {
        this.mesh = this.createVisuals(color);
        scene.add(this.mesh);
    }

    createVisuals(color: string) {
        const group = new THREE.Group();
        
        // Body
        const body = new THREE.Mesh(
            new THREE.CapsuleGeometry(0.5, 1, 4, 8),
            new THREE.MeshStandardMaterial({ color, roughness: 0.5 })
        );
        body.position.y = 1;
        body.castShadow = true;
        group.add(body);

        // Holographic Ring at Base
        const ringGeo = new THREE.RingGeometry(0.7, 0.9, 32);
        const ringMat = new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.2, side: THREE.DoubleSide });
        const ring = new THREE.Mesh(ringGeo, ringMat);
        ring.rotation.x = -Math.PI / 2;
        ring.position.y = 0.1;
        group.add(ring);

        // Head Glow
        const headGlow = new THREE.Mesh(
            new THREE.SphereGeometry(0.35, 16, 16),
            new THREE.MeshBasicMaterial({ color: '#fff', transparent: true, opacity: 0.15, wireframe: true })
        );
        headGlow.position.y = 1.9;
        group.add(headGlow);

        return group;
    }

    setInput(x: number, y: number) {
        this.input.x = x;
        this.input.y = y;
    }

    update(delta: number) {
        if(Math.abs(this.input.x) > 0.05 || Math.abs(this.input.y) > 0.05) {
            this.mesh.position.x += this.input.x * CONFIG.PLAYER.SPEED;
            this.mesh.position.z += this.input.y * CONFIG.PLAYER.SPEED;

            const rotateAngle = Math.atan2(this.input.x, this.input.y);
            this.mesh.rotation.y = THREE.MathUtils.lerp(this.mesh.rotation.y, rotateAngle, CONFIG.PLAYER.ROTATION_SPEED);
        }
    }
}

class NPC {
    mesh: any;

    constructor(scene: any, color: string, name: string) {
        this.mesh = this.createVisuals(color);
        scene.add(this.mesh);
    }

    createVisuals(color: string) {
        const group = new THREE.Group();
        const body = new THREE.Mesh(
            new THREE.CapsuleGeometry(0.5, 1, 4, 8),
            new THREE.MeshStandardMaterial({ color, roughness: 0.5 })
        );
        body.position.y = 1;
        body.castShadow = true;
        group.add(body);

        // Eyes Glow
        const eyeGeo = new THREE.SphereGeometry(0.12);
        const eyeMat = new THREE.MeshBasicMaterial({ color: '#fff' });
        const eyeL = new THREE.Mesh(eyeGeo, eyeMat);
        eyeL.position.set(-0.25, 1.4, 0.45);
        const eyeR = eyeL.clone();
        eyeR.position.x = 0.25;
        group.add(eyeL, eyeR);

        return group;
    }

    update(time: number, targetPos: any) {
        // Serene Levitation
        this.mesh.position.y = Math.sin(time * 1.5) * 0.15 + 0.1;
        
        // Track Player
        if(targetPos) {
            this.mesh.lookAt(targetPos.x, this.mesh.position.y, targetPos.z);
        }
    }
}

/**
 * HUD E INTERFACE
 */
class GameHUD {
    scoreElement: HTMLElement;
    objectiveElement: HTMLElement;

    constructor() {
        this.scoreElement = document.createElement('div');
        this.scoreElement.style.cssText = `
            position: fixed; top: 20px; left: 20px; font-family: 'JetBrains Mono', monospace;
            color: #80deea; font-size: 20px; font-weight: bold; background: rgba(0,0,0,0.2);
            padding: 10px 20px; border-radius: 15px; backdrop-filter: blur(5px);
            border: 1px solid rgba(128,222,234,0.3); z-index: 9000;
        `;
        this.scoreElement.innerText = 'NEURO-SYNC: 0%';
        document.body.appendChild(this.scoreElement);

        this.objectiveElement = document.createElement('div');
        this.objectiveElement.style.cssText = `
            position: fixed; top: 20px; right: 20px; font-family: sans-serif;
            color: #fff; font-size: 14px; background: rgba(255,255,255,0.1);
            padding: 10px 20px; border-radius: 15px; backdrop-filter: blur(5px);
            border: 1px solid rgba(255,255,255,0.1); z-index: 9000; text-align: right;
        `;
        this.objectiveElement.innerHTML = '🎯 OBJETIVO: Aproxime-se de Sofia';
        document.body.appendChild(this.objectiveElement);
    }

    updateScore(val: number) {
        this.scoreElement.innerText = `NEURO-SYNC: ${Math.floor(val)}%`;
        if (val >= 100) {
            this.objectiveElement.innerHTML = '✅ SINCRONIZAÇÃO COMPLETA';
            this.scoreElement.style.color = '#f48fb1';
            this.scoreElement.style.borderColor = '#f48fb1';
        }
    }
}

class DialogueBox {
    element: HTMLElement;

    constructor() {
        this.element = document.createElement('div');
        this.element.style.cssText = `
            position: fixed; bottom: 150px; left: 50%; transform: translateX(-50%);
            font-family: sans-serif; color: #fff; background: rgba(0,0,0,0.6);
            padding: 15px 30px; border-radius: 20px; backdrop-filter: blur(10px);
            border: 1px solid rgba(128,222,234,0.4); z-index: 9500; display: none;
            transition: opacity 0.3s; pointer-events: none; text-align: center;
        `;
        document.body.appendChild(this.element);
    }

    show(text: string) {
        this.element.innerText = text;
        this.element.style.display = 'block';
    }

    hide() {
        this.element.style.display = 'none';
    }
}

class JoystickHUD {
    constructor(onMove: (x: number, y: number) => void) {
        const container = document.createElement('div');
        container.style.cssText = `
            position: fixed; bottom: 50px; left: 50px; width: 140px; height: 140px;
            background: rgba(128, 222, 234, 0.08); backdrop-filter: blur(12px);
            border: 2px solid rgba(128, 222, 234, 0.25); border-radius: 50%;
            z-index: 9999; touch-action: none;
        `;
        document.body.appendChild(container);

        const stick = document.createElement('div');
        stick.style.cssText = `
            position: absolute; top: 50%; left: 50%; width: 55px; height: 55px;
            background: #80deea; border-radius: 50%; transform: translate(-50%, -50%);
            box-shadow: 0 0 25px rgba(128, 222, 234, 0.45); pointer-events: none;
            transition: transform 0.1s ease-out;
        `;
        container.appendChild(stick);

        let isPressed = false;
        const update = (e: any) => {
            if(!isPressed) return;
            const rect = container.getBoundingClientRect();
            const cx = rect.left + rect.width / 2;
            const cy = rect.top + rect.height / 2;
            const tx = e.clientX || (e.touches && e.touches[0].clientX);
            const ty = e.clientY || (e.touches && e.touches[0].clientY);
            
            let dx = tx - cx;
            let dy = ty - cy;
            const dist = Math.sqrt(dx*dx + dy*dy);
            const limit = 55;
            
            if (dist > limit) {
                dx *= limit / dist;
                dy *= limit / dist;
            }
            
            stick.style.transform = `translate(calc(-50% + ${dx}px), calc(-50% + ${dy}px))`;
            onMove(dx / limit, dy / limit);
        };

        container.addEventListener('pointerdown', (e) => { isPressed = true; update(e); });
        window.addEventListener('pointermove', update);
        window.addEventListener('pointerup', () => { 
            isPressed = false; 
            stick.style.transform = 'translate(-50%, -50%)';
            onMove(0, 0);
        });
    }
}

// Start Application
window.addEventListener('load', () => {
    new GameEngine();
});
