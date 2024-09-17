let usuarios = [];

function agregarUsuarios() {

    const nombre = document.getElementById('nombre').value;
    const billetera = document.getElementById('billetera').value;
    const transaccion = parseInt(document.getElementById('transaccion').value, 10);

    if (!nombre || !billetera || isNaN(transaccion)) {
        alert('Por favor, completa todos los campos correctamente.');
        return;
    }

    //let usuarioExistente = usuarios.find(cuenta => cuenta.nombre === nombre && cuenta.billetera === billetera);

    /*if (usuarioExistente) {
        usuarioExistente.transaccion += transaccion;
        alert('Las transacciones han sido acumuladas.');
    } else {
    */
        usuarios.push({ nombre, billetera, transaccion });
        //alert('Información guardada con éxito.');
    //}

    document.getElementById('nombre').value = '';
    document.getElementById('billetera').value = '';
    document.getElementById('transaccion').value = '';
    listaUsuarios();
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
        if(!transaccionesPorUsuario[transaccion.nombre]){
            transaccionesPorUsuario[transaccion.nombre]=new Set(); //Set evita duplicar nombres
        }        
    });
    let resultado ='';
    Object.entries(transaccionesPorUsuario).forEach(([nombre,billetera])=>{
    const billeteraConMasTransacciones = Object.entries(billetera).reduce((prev,current)=>(prev[1]>current[1]?prev:current));
    resultado += `${nombre}: ${billeteraConMasTransacciones[0]} (${billeteraConMasTransacciones[1]} transacciones)<br>`;
    });
    transaccionMaximaLista.innerHTML=resultado;



    //let transaccionMaxima = usuarios.reduce((prev, current) => (current.transaccion > prev.transaccion) ? current : prev);

    //transaccionMaximaLista.innerHTML = `<p>El usuario <strong>${transaccionMaxima.nombre}</strong> tiene la billetera <strong>${transaccionMaxima.billetera}</strong> con el mayor número de transacciones: <strong>${transaccionMaxima.transaccion}</strong>.</p>`;
}
