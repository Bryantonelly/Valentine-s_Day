// get both pupils
const pupils = document.querySelectorAll(".eye .pupil");
    window.addEventListener("mousemove", (e) => {
        pupils.forEach((pupil) => {
            // get x and y postion of cursor
            var rect = pupil.getBoundingClientRect();
            var x = (e.pageX - rect.left) / 30 + "px";
            var y = (e.pageY - rect.top) / 30 + "px";
            pupil.style.transform = "translate3d(" + x + "," + y + ", 0px)";
        });
});

const objeto = document.getElementById("objeto");
const contenedor = document.getElementById("contenedor");

let startX = 0, startY = 0;
let offsetX = contenedor.offsetWidth / 2, offsetY = contenedor.offsetHeight / 2;
let isDragging = false;

function startDrag(e) {
    e.preventDefault(); // Evitar selección de texto al arrastrar

    isDragging = true;
    // Detectar si es un toque o un mouse
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;

    startX = clientX - offsetX;
    startY = clientY - offsetY;
}

function moveDrag(e) {
    if (!isDragging) return;
    
    // Detectar si es un toque o un mouse
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;

    offsetX = clientX - startX;
    offsetY = clientY - startY;

    // Limitar el movimiento dentro del contenedor (en X y Y)
    const maxX = contenedor.clientWidth - objeto.clientWidth;
    const maxY = contenedor.clientHeight - objeto.clientHeight;

    offsetX = Math.max(0, Math.min(maxX, offsetX));
    offsetY = Math.max(0, Math.min(maxY, offsetY));

    objeto.style.left = `${offsetX}px`;
    objeto.style.top = `${offsetY}px`;

    // Cambiar el texto basado en la posición del objeto
    updateTextBasedOnPosition();
}

function endDrag() {
    isDragging = false;
    const centerX = contenedor.clientWidth / 2;
    // Obtener la posición actual de objeto
    const objetoX = offsetX + objeto.clientWidth / 2;

    if (objetoX < centerX / 2) {
        setTimeout(() => {
            sendWhatsapp();
        }, 50);
    }
}

function updateTextBasedOnPosition() {
    const centerX = contenedor.clientWidth / 2;

    // Obtener la posición actual de objeto
    const objetoX = offsetX + objeto.clientWidth / 2;

    if (objetoX < centerX / 2) {
        objeto.innerText = '💖';
        setBackground(2);
        setSmile(2);
    } else if (objetoX > centerX * 1.5) {
        objeto.innerText = '💔';
        setBackground(1);
        setSmile(1);
    } else {
        objeto.innerHTML = '🧡​';
        setBackground(3);
        setSmile(3);
    }
}

// Eventos para Mouse
objeto.addEventListener("mousedown", startDrag);
document.addEventListener("mousemove", moveDrag);
document.addEventListener("mouseup", endDrag);

// Eventos para Touch
objeto.addEventListener("touchstart", startDrag);
document.addEventListener("touchmove", moveDrag);
document.addEventListener("touchend", endDrag);


//Sonrisa 
function setSmile(type) {
    let smileLeft = document.querySelector('#smileL');
    let smileRight = document.querySelector('#smileR');
    // Quitamos la clase 'claseAntigua' y agregamos 'claseNueva'
    smileLeft.classList.remove('normal_left');
    smileLeft.classList.remove('sad_left');
    smileLeft.classList.remove('smile_left');
    
    smileRight.classList.remove('normal_right');
    smileRight.classList.remove('sad_right');
    smileRight.classList.remove('smile_right');

    if( type == 1 ){
        smileLeft.classList.add('sad_left');
        smileRight.classList.add('sad_right');
    }else if( type == 2 ){
        smileLeft.classList.add('smile_left');
        smileRight.classList.add('smile_right');
    }else{
        smileLeft.classList.add('normal_left');
        smileRight.classList.add('normal_right');
    }
}
// Fondo
function setBackground(type){
    document.body.classList.remove('fondo_happy');
    document.body.classList.remove('fondo_sad');
    document.body.classList.remove('fondo_normal');
    if( type == 1 ){
        document.body.classList.add('fondo_sad');
    }else if( type == 2 ){
        document.body.classList.add('fondo_happy');
    }else{
        document.body.classList.add('fondo_normal');
    }
}

function sendWhatsapp(){
    let numero = "51931857235";  // Número con el código de país
    let mensaje = "¡Aceptooo!!!";
    let url = `https://wa.me/${numero}?text=${mensaje}`;
    setTimeout(() => {
        window.open(url, '_blank');
    }, 1000);
}