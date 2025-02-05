//Abre página en blanco de pagina creada
function createLink(){
    let name = document.getElementById('nombre').value;
    let number = document.getElementById('numero').value;
    let message = document.getElementById('mensaje').value;
    
    let url = 'https://bryantonelly.github.io/Valentine-s_Day';
    url += `?nombre=${name}&numero=${number}&mensaje=${message}`;
    window.open(url, '_blank');
}

document.getElementById('btn_crear_link').addEventListener('click', function() {
    console.log('¡Clic en el botón!');
    createLink();
});
