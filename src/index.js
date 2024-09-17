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
    listaUsuarios();
    document.getElementById('nombre').value = '';
    document.getElementById('billetera').value = '';
    document.getElementById('transaccion').value = '';
   
}

function listaUsuarios() {
    const contenedorLista = document.getElementById('contenedorLista');
    contenedorLista.innerHTML = ''; 

    usuarios.forEach(cuenta => {
        const div = document.createElement('div');
        div.classList.add('user-list-item');
        div.textContent = `${cuenta.nombre}, ${cuenta.billetera}, ${cuenta.transaccion}`;
        contenedorLista.appendChild(div);
    });
}

function billeteraMasTransacciones() {
    const transaccionMaximaLista = document.getElementById('transaccionMaximaLista');

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
        const div = document.createElement('div');
        div.classList.add('user-max-list-item');
        div.textContent= `${nombre}, ${billeteraConMasTransacciones[0]},${billeteraConMasTransacciones[1]}`;
        transaccionMaximaLista.appendChild(div);
    });
    //el codigo funciona, pero cada vez que se presiona el boton genera nuevas etiquetas div.. nesita ajustes
}
