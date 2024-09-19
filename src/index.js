let usuarios = [];

function agregarUsuarios() {

    const nombre = document.getElementById('nombre').value;
    const billetera = document.getElementById('billetera').value;
    const transaccion = parseInt(document.getElementById('transaccion').value, 10);

    if (!nombre || !billetera || isNaN(transaccion)) {
        alert('Por favor, completa todos los campos correctamente.');
        return;
    }

     let usuarioExistente = usuarios.find(cuenta => cuenta.nombre === nombre && cuenta.billetera === billetera);

     if (usuarioExistente) {
         usuarioExistente.transaccion += transaccion;
         alert('Las transacciones han sido acumuladas.');
     } else {
         usuarios.push({ nombre, billetera, transaccion });
         alert('Información guardada con éxito.');
     }

        
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

    transaccionMaximaLista.innerHTML = ''; 

    if (usuarios.length === 0) return;
    const transaccionesPorUsuario = {};
    
    usuarios.forEach(function(transaccion){
        if (!transaccionesPorUsuario[transaccion.nombre]) {
            transaccionesPorUsuario[transaccion.nombre] = {};
        }

        if (transaccionesPorUsuario[transaccion.nombre][transaccion.billetera]) {
            transaccionesPorUsuario[transaccion.nombre][transaccion.billetera] += transaccion.transaccion;
        } else {
            transaccionesPorUsuario[transaccion.nombre][transaccion.billetera] = transaccion.transaccion;
        }        
    });

    const usuariosConMaxTransacciones = Object.entries(transaccionesPorUsuario).map(([nombre, billeteras]) => {
        const billeteraConMasTransacciones = Object.entries(billeteras).reduce((prev, current) => (prev[1] > current[1] ? prev : current));
        return { nombre, billetera: billeteraConMasTransacciones[0], transacciones: billeteraConMasTransacciones[1] };
    });

    // se puede modificar para mostrar los primeros x usuarios
    const topUsuarios = usuariosConMaxTransacciones.sort((a, b) => b.transacciones - a.transacciones).slice(0, 5);

    topUsuarios.forEach(usuario => {
        const div = document.createElement('div');
        div.classList.add('user-max-list-item');
        div.textContent = `${usuario.nombre}, ${usuario.billetera}, ${usuario.transacciones}`;
        transaccionMaximaLista.appendChild(div);
    });
}
