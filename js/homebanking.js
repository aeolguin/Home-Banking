//Declaración de variables
var codigoSeguridad = 2712;
var bloquear = false;
var nombreUsuario = "Ariel Olguin";
var saldoCuenta = 4500;
var limiteExtraccion = 3000;
var saldoAnterior = 0;
var servicioAgua = 350;
var servicioTelefono = 425;
var servicioLuz = 210;
var servicioInternet = 570;
var cuotaPrestamo = 0;
var cuentaAmiga1 = 1234567;
var cuentaAmiga2 = 7654321;


//Ejecución de las funciones que actualizan los valores de las variables en el HTML.
window.onload = function() {
    cargarNombreEnPantalla();
    actualizarSaldoEnPantalla();
    actualizarLimiteEnPantalla();
    iniciarSesion ();
}


//Funciones que tenes que completar
function cambiarLimiteDeExtraccion() {
    if (cuentaBloqueada(bloquear)){
        return;
    }

    var monto = parseInt(prompt("Ingrese el nuevo límite de extracción"));
    if (ingresoNumeroValido(monto)) {
        monto = 0;
        return;
    }
    if (!billete100(monto)) {
        monto = 0;
        return;
    }

    limiteExtraccion = monto;
    actualizarLimiteEnPantalla();
    alert("Su nuevo límite de extracción es $" + limiteExtraccion);
}

function extraerDinero() {
    if (cuentaBloqueada(bloquear)){
        return;
    }

    var monto = Number.parseFloat (prompt("Ingrese el valor a extraer"));
    if (ingresoNumeroValido(monto)) {
        monto = 0;
        return;
    }
    if (superaLimite(monto)) {
        monto = 0;
        alert("Excede el límite máximo de extracción");
        return;
    }
    if (saldoDisponible(monto)) {
        monto = 0;
        return;
    }
    if (!billete100(monto)) {
        monto = 0;
        return;
    }

    restaSaldo (monto);
    alert("Saldo Anterior: $" + saldoAnterior + "\nHas retirado: $" + monto + 
    "\nSaldo actual: $" + saldoCuenta);
} 

function depositarDinero() {
    if (cuentaBloqueada(bloquear)){
        return;
    }

    var monto = Number.parseFloat (prompt("Ingrese el valor a depositar"));
    if (ingresoNumeroValido(monto)) {
        monto = 0;
    } else {
    adicionSaldo (monto)           
    alert("Saldo Anterior: $" + saldoAnterior + "\nDeposito Ingresado: $" + monto + "\nSaldo actual: $" + 
    saldoCuenta);
    }
}

function pagarServicio() {
    if (cuentaBloqueada(bloquear)){
        return;
    }

    var seleccionServicio = parseInt (prompt("ingrese el servicio que desea abonar \n" + "1 - Agua \n" + 
    "2 - Teléfono \n" + "3 - Luz \n" + "4 - Internet\n" + "5 - Cuota de Prestamo"));
    if (ingresoNumeroValido(seleccionServicio)) {
        seleccionServicio = 0;
        return;
    }
    switch (seleccionServicio) {
        case 1:
            if (saldoDisponible(servicioAgua)) {
                seleccionServicio = 0;
            } else {
                restaSaldo (servicioAgua);
                alert("Has pagado el servicio de Agua \n" + "saldo anterior: " + saldoAnterior + 
                "\nDinero descontado: " + servicioAgua + "\nSaldo actual: " + saldoCuenta);
            }
            break;
        case 2:
            if (saldoDisponible(servicioTelefono)) {
                seleccionServicio = 0;
            } else {
                restaSaldo (servicioTelefono);
                alert("Has pagado el servicio de Teléfono \n" + "saldo anterior: " + saldoAnterior + 
                "\nDinero descontado: " + servicioTelefono + "\nSaldo actual: " + saldoCuenta);
            }
            break;
        case 3:
            if (saldoDisponible(servicioLuz)) {
                seleccionServicio = 0;
            } else {
                restaSaldo (servicioLuz);
                alert("Has pagado el servicio de Luz \n" + "saldo anterior: " + saldoAnterior + 
                "\nDinero descontado: " + servicioLuz + "\nSaldo actual: " + saldoCuenta);
            }
            break;
        case 4:
            if (saldoDisponible(servicioInternet)) {
                seleccionServicio = 0;
            } else {
                restaSaldo (servicioInternet);
                alert("Has pagado el servicio de Internet \n" + "saldo anterior: " + saldoAnterior + 
                "\nDinero descontado: " + servicioInternet + "\nSaldo actual: " + saldoCuenta);
            }
            break;
        case 5:
            if (cuotaPrestamo === 0) {
                seleccionServicio = 0;
                alert("Usted no tiene ningún prestamo tomado");
                break;
            }
            if (saldoDisponible(cuotaPrestamo)) {
                seleccionServicio = 0;
                break;
            }
            
            restaSaldo (cuotaPrestamo.toFixed(2));
            alert("Has pagado la cuota del prestamo \n" + "saldo anterior: " + saldoAnterior + 
            "\nDinero descontado: " + cuotaPrestamo.toFixed(2) + "\nSaldo actual: " + saldoCuenta);
            break;
        }
}

function transferirDinero() {
    if (cuentaBloqueada(bloquear)){
        return;
    }

    var monto = Number.parseFloat (prompt("Ingrese el monto a transferir"));
    if (ingresoNumeroValido(monto)) {
        monto = 0;
        return;
    }
    if (saldoDisponible(monto)) {
        monto = 0;
        return;
    }

    var cuentaDestino = parseInt (prompt("Ingrese el número de cuenta a transferir"));
    if (ingresoNumeroValido(cuentaDestino)) {
        cuentaDestino = 0;
        return;
    }
    if (cuentaDestino === cuentaAmiga1 || cuentaDestino === cuentaAmiga2){
        restaSaldo (monto);
        alert("Se han transferido:" + monto + "\nCuenta destino:" + cuentaDestino);
    } else {
        cuentaDestino = 0;
        alert("Solo se puede transferir dinero a cuentas amigas");
    }  
}

function prestamoEnCuenta() {
    if (cuentaBloqueada(bloquear)){
        return;
    }

    var monto = Number.parseFloat (prompt("Ingrese el monto del prestamo que va a tomar"));
    if (ingresoNumeroValido(monto)) {
        monto = 0;
        return;
    }
    
    var cuotas = parseInt (prompt("Ingrese la cantidad de cuotas del prestamo"))
    if (ingresoNumeroValido(cuotas)) {
        cuotas = 0;
        return;
    } else {
        tomarPrestamo(monto , cuotas);
    }
}

function iniciarSesion() {
    var codigoIngresado = parseInt (prompt("Ingrese el Código de Seguridad"));
    if (codigoIngresado === codigoSeguridad) {
        alert("Bienvenido " + nombreUsuario + " ya puedes comenzar a realizar operaciones.");
    } else {
        saldoCuenta = 0;
        bloquear = true;
        alert("Código incorrecto. Tu dinero ha sido retenido por cuestiones de seguridad");
        actualizarSaldoEnPantalla();
    }
}

//Funciones que actualizan el valor de las variables en el HTML
function cargarNombreEnPantalla() {
    document.getElementById("nombre").innerHTML = "Bienvenido/a " + nombreUsuario;
}

function actualizarSaldoEnPantalla() {
    if (saldoCuenta === 0) {
        document.getElementById("saldo-cuenta").innerHTML = "$" + saldoCuenta;
        document.getElementById("saldo-cuenta").style.color = "red";
    } else {
        document.getElementById("saldo-cuenta").style.color = "white";
        document.getElementById("saldo-cuenta").innerHTML = "$" + saldoCuenta;
    }
}

function actualizarLimiteEnPantalla() {
    document.getElementById("limite-extraccion").innerHTML = "Tu límite de extracción es: $" + limiteExtraccion;
}
