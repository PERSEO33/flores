// ==========================================
// MENSAJES PARA CADA FLOR
// ==========================================
const mensajes = [
    "para el quesito de Madrid 👑",
    "Cada minuto contigo es un regalo 🎁",
    "Aunque estemos lejos siempre te quiero 🌍",
    "Eres lo más bonito que me ha pasado 😊",
    "Eres la niña de mis ojos 💖",
    "Gracias soportarme ❤️",
    "Te quiero mucho princesa",
    "Te quiero mucho mas",
];

const flowersLayer = document.getElementById('flowers-layer');
const card = document.getElementById('message-card');
const cardContent = document.querySelector('.card-content');

// Generar imagen procedural de flor
function generateFlowerImage(size) {
    const canvas = document.createElement('canvas');
    canvas.width = size * 2;
    canvas.height = size * 2;
    const ctx = canvas.getContext('2d');

    ctx.translate(size, size);

    const petals = Math.floor(Math.random() * 4) + 12;
    const color = `hsl(${45 + Math.random() * 15}, 100%, 55%)`;
    const centerColor = `hsl(${25 + Math.random() * 10}, 80%, 25%)`;

    // Pétalos
    for (let i = 0; i < petals; i++) {
        ctx.rotate((Math.PI * 2) / petals);
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.quadraticCurveTo(size / 2.2, -size / 1.5, 0, -size);
        ctx.quadraticCurveTo(-size / 2.2, -size / 1.5, 0, 0);

        const gradient = ctx.createLinearGradient(0, 0, 0, -size);
        gradient.addColorStop(0, color);
        gradient.addColorStop(1, '#FFFACD');

        ctx.fillStyle = gradient;
        ctx.fill();
        ctx.strokeStyle = 'rgba(0, 0, 0, 0.05)';
        ctx.stroke();
    }

    // Centro
    ctx.beginPath();
    ctx.arc(0, 0, size / 3.5, 0, Math.PI * 2);
    ctx.fillStyle = centerColor;
    ctx.fill();

    // Textura
    for (let i = 0; i < size * 1.5; i++) {
        const r = Math.random() * (size / 3.5);
        const a = Math.random() * Math.PI * 2;
        ctx.fillStyle = 'rgba(0, 0, 0, 0.4)';
        ctx.fillRect(Math.cos(a) * r, Math.sin(a) * r, 2, 2);
    }

    return canvas.toDataURL();
}

let highestZ = 15;

// Distribuir flores como en un ramo real
mensajes.forEach((mensaje, i) => {
    const group = document.createElement('div');
    group.className = 'flower-group';

    // Distribución en abanico
    const angleDeg = (Math.random() * 80) - 40; // -40 a 40 grados
    const xOffset = Math.sin(angleDeg * Math.PI / 180) * 120;
    const yOffset = Math.random() * 50 - 15; // Variación en altura

    // Posicionar grupo
    group.style.left = `calc(50% + ${xOffset}px)`;
    group.style.top = `${60 + yOffset}px`;

    // Aplicar rotación original
    const origTransform = `rotate(${angleDeg}deg)`;
    group.style.transform = origTransform;
    group.style.zIndex = highestZ - Math.abs(Math.floor(xOffset));

    group.dataset.message = mensaje;
    group.dataset.origTransform = origTransform;

    // Crear Tallo
    const stem = document.createElement('div');
    stem.className = 'stem';
    stem.style.height = `${220 + Math.random() * 40}px`;
    stem.style.transform = `translateX(-50%) rotate(${angleDeg * -0.15}deg)`;

    // Crear Flor
    const img = document.createElement('img');
    const size = Math.random() * 20 + 45;
    img.src = generateFlowerImage(size);
    img.className = 'flower-img';
    img.style.width = `${size * 2}px`;
    img.style.height = `${size * 2}px`;

    // Ensamblar
    group.appendChild(stem);
    group.appendChild(img);
    flowersLayer.appendChild(group);

    // Interacción al tocar (Eventos de Puntero)
    group.addEventListener('pointerdown', (e) => {
        highestZ++;
        group.style.zIndex = highestZ;

        // Quitar active de otras flores
        document.querySelectorAll('.flower-group').forEach(f => f.classList.remove('active'));

        group.classList.add('active');

        // Mostrar "papelito" con el mensaje
        cardContent.textContent = group.dataset.message;
        card.classList.remove('hidden');

        e.stopPropagation(); // Evitar que se cierre al instante
    });
});

// Cerrar tarjeta al tocar fuera del ramo o de la carta
document.body.addEventListener('pointerdown', (e) => {
    if (!e.target.closest('.flower-group') && !e.target.closest('.card')) {
        card.classList.add('hidden');
        // Restaurar estado de las flores
        document.querySelectorAll('.flower-group').forEach(f => f.classList.remove('active'));
    }
});
