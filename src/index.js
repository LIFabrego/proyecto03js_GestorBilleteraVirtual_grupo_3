let usuarios = [];

function agregarUsuarios() {

    const nombre = document.getElementById('nombre').value;
    const billetera = document.getElementById('billetera').value;
    const transaccion = parseInt(document.getElementById('transaccion').value, 10);

    if (!nombre || !billetera || isNaN(transaccion)) {
        alert('Por favor, completa todos los campos correctamente.');
        return;
    }

        usuarios.push({ nombre, billetera, transaccion });
    document.getElementById('nombre').value = '';
    document.getElementById('billetera').value = '';
    document.getElementById('transaccion').value = '';
    cargaAlerta();
   
}

function listaUsuarios() {
    const contenedorLista = document.getElementById('contenedorLista');
    contenedorLista.innerHTML = ''; 
//Muestra de registro de Usuario fue cambiado, de div a li para que se muestre en pantalla en forma de lista
    usuarios.forEach(cuenta => {
        const li = document.createElement('li');
        li.classList.add('user-list-item');
        li.textContent = `${cuenta.nombre}, ${cuenta.billetera}, ${cuenta.transaccion}`;
        contenedorLista.appendChild(li);
    });
}

function billeteraMasTransacciones() {
    const transaccionMaxima = document.getElementById('transaccionMaxima');

    if (usuarios.length === 0) return;
    const transaccionesPorUsuario = {};
    usuarios.forEach(function(transaccion){
        if(!transaccionesPorUsuario[transaccion.nombre]){
            transaccionesPorUsuario[transaccion.nombre]={}; 
        }
        //en caso de que las billeteras esten repetidas para un mismo usuario se suma el numero de transacciones
        if (transaccionesPorUsuario[transaccion.nombre][transaccion.billetera]) {
            transaccionesPorUsuario[transaccion.nombre][transaccion.billetera] += transaccion.transaccion;
        } else {
            transaccionesPorUsuario[transaccion.nombre][transaccion.billetera] = transaccion.transaccion;
        }        
    });
    //muestra del resultado maximo por cada uno de los usuarios
    let resultado ='';
    Object.entries(transaccionesPorUsuario).forEach(([nombre,billetera])=>{
        const billeteraConMasTransacciones = Object.entries(billetera).reduce((prev,current)=>(prev[1]>current[1]?prev:current));
        resultado += `${nombre}: ${billeteraConMasTransacciones[0]} ${billeteraConMasTransacciones[1]} transacciones <br>`;
        console.log(resultado);
    });
    transaccionMaxima.innerHTML = resultado;
}
function cargaAlerta(){
    swal({
        text: "Se ha cargado correctamente",
        icon: "success",
    });
}
