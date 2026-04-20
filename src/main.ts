
// Three.js Game Engine - Core Implementation
// Powered by AI Studio Build - Game Dev Mode

declare const THREE: any;

const canvas = document.getElementById('world') as HTMLCanvasElement;
const renderer = new THREE.WebGLRenderer({ 
    canvas, 
    antialias: true,
    alpha: true 
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.shadowMap.enabled = true;

const scene = new THREE.Scene();

// Sunrise Sky Gradient
const skyColor = new THREE.Color('#ffecd2'); // Sunrise bottom
const skyTopColor = new THREE.Color('#fcb69f'); // Sunrise top
scene.background = new THREE.Color('#ffecd2');

// Sunrise Light
const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
scene.add(ambientLight);

const sunLight = new THREE.DirectionalLight(0xffe4b5, 1.2);
sunLight.position.set(10, 5, 20);
sunLight.castShadow = true;
scene.add(sunLight);

// Therapeutic Soft-Realism Ground
const groundGeometry = new THREE.PlaneGeometry(200, 200);
const groundMaterial = new THREE.MeshStandardMaterial({ 
    color: '#e0f2f1', 
    roughness: 0.8,
    metalness: 0.1
});
const ground = new THREE.Mesh(groundGeometry, groundMaterial);
ground.rotation.x = -Math.PI / 2;
ground.receiveShadow = true;
scene.add(ground);

// Grid for Reference
const grid = new THREE.GridHelper(100, 50, 0x80deea, 0x80deea);
grid.material.opacity = 0.2;
grid.material.transparent = true;
scene.add(grid);

// Avatares Sofia & Theo (Placeholders as ordered)
const createAvatar = (color: string, name: string) => {
    const group = new THREE.Group();
    
    // Body (Capsule)
    const bodyGeometry = new THREE.CapsuleGeometry(0.5, 1, 4, 8);
    const bodyMaterial = new THREE.MeshStandardMaterial({ color, roughness: 0.5 });
    const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
    body.position.y = 1;
    body.castShadow = true;
    group.add(body);
    
    // Head Hologram Overlay
    const headGeometry = new THREE.SphereGeometry(0.3, 16, 16);
    const headMaterial = new THREE.MeshBasicMaterial({ 
        color: '#ffffff', 
        transparent: true, 
        opacity: 0.5,
        wireframe: true 
    });
    const head = new THREE.Mesh(headGeometry, headMaterial);
    head.position.y = 1.9;
    group.add(head);

    return group;
};

const theo = createAvatar('#80deea', 'Theo');
theo.position.set(0, 0, 0);
scene.add(theo);

const sofia = createAvatar('#f48fb1', 'Sofia');
sofia.position.set(3, 0, -2);
scene.add(sofia);

// Camera Setup
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 8, 12);
camera.lookAt(0, 0, 0);

// Joystick HUD (Mobile/Touch)
const controlsUI = document.createElement('div');
controlsUI.style.position = 'fixed';
controlsUI.style.bottom = '40px';
controlsUI.style.left = '40px';
controlsUI.style.width = '120px';
controlsUI.style.height = '120px';
controlsUI.style.background = 'rgba(255,255,255,0.1)';
controlsUI.style.backdropFilter = 'blur(10px)';
controlsUI.style.border = '1px solid rgba(255,255,255,0.2)';
controlsUI.style.borderRadius = '50%';
controlsUI.style.zIndex = '1000';
controlsUI.style.touchAction = 'none';
document.body.appendChild(controlsUI);

const joystick = document.createElement('div');
joystick.style.width = '50px';
joystick.style.height = '50px';
joystick.style.background = '#80deea';
joystick.style.borderRadius = '50%';
joystick.style.position = 'absolute';
joystick.style.top = '50%';
joystick.style.left = '50%';
joystick.style.transform = 'translate(-50%, -50%)';
joystick.style.boxShadow = '0 0 20px rgba(128, 222, 234, 0.5)';
controlsUI.appendChild(joystick);

// Game Logic
let moveInput = { x: 0, y: 0 };
let isMouseDown = false;

const updateJoystick = (e: any) => {
    const rect = controlsUI.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const touchX = e.clientX || (e.touches && e.touches[0].clientX);
    const touchY = e.clientY || (e.touches && e.touches[0].clientY);
    
    let dx = touchX - centerX;
    let dy = touchY - centerY;
    const dist = Math.sqrt(dx*dx + dy*dy);
    const maxDist = 50;
    
    if (dist > maxDist) {
        dx = (dx / dist) * maxDist;
        dy = (dy / dist) * maxDist;
    }
    
    joystick.style.transform = `translate(calc(-50% + ${dx}px), calc(-50% + ${dy}px))`;
    moveInput.x = dx / maxDist;
    moveInput.y = dy / maxDist;
};

controlsUI.addEventListener('pointerdown', (e) => { isMouseDown = true; updateJoystick(e); });
window.addEventListener('pointermove', (e) => { if (isMouseDown) updateJoystick(e); });
window.addEventListener('pointerup', () => { 
    isMouseDown = false; 
    joystick.style.transform = 'translate(-50%, -50%)';
    moveInput = { x: 0, y: 0 };
});

// Render Loop
const animate = () => {
    requestAnimationFrame(animate);
    
    // Player Movement (Theo)
    const speed = 0.15;
    theo.position.x += moveInput.x * speed;
    theo.position.z += moveInput.y * speed;
    
    if (Math.abs(moveInput.x) > 0.1 || Math.abs(moveInput.y) > 0.1) {
        theo.rotation.y = Math.atan2(moveInput.x, moveInput.y);
    }
    
    // Camera Follow
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, theo.position.x, 0.1);
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, theo.position.z + 12, 0.1);
    camera.lookAt(theo.position.x, theo.position.y + 1, theo.position.z);
    
    // Sofia "Walking" Logic (Simple float)
    sofia.position.y = Math.sin(Date.now() * 0.002) * 0.1;
    sofia.lookAt(theo.position);

    renderer.render(scene, camera);
};

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

animate();
