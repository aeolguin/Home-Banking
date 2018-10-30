/*Funciones Globales*/

function cuentaBloqueada (estado) {
    if (estado === true){
        alert("Cuenta Bloqueda");
        return true;
    }else {
        return false;
    }
}

function ingresoNumeroValido (monto) { 
    var prueba =isNaN(monto);
    if (prueba) {
       alert("ingrese un número válido");
       return prueba;
    } else {
        return prueba;    
    }
}

function superaLimite(monto) {
    return limiteExtraccion < monto;
}

function billete100(monto) {
    if (monto % 100 === 0){
      return true;    
    }else {
      alert("El sistema solo entrega billetes de $100");
      return false;
    }
}

function saldoDisponible(monto){
    if (saldoCuenta < monto) {
       alert("Saldo insuficiente para la operación que desea realizar");
       return true;
    }else {
        return false;
    }
}

function adicionSaldo (monto){
    saldoAnterior = saldoCuenta;
    saldoCuenta += monto;
    actualizarSaldoEnPantalla();
}

function restaSaldo (monto){
    saldoAnterior = saldoCuenta;
    saldoCuenta -= monto;
    actualizarSaldoEnPantalla();
}

function tomarPrestamo (monto , cuotas) { //Se calcula con un simple interes compuesto Cf=Ci(1+1)^n
    var calculoCuotaPrestamo = Number.parseFloat (((Math.pow (1.035 , cuotas) * monto) / cuotas));
    cuotaPrestamo += calculoCuotaPrestamo;
    adicionSaldo (monto);
    alert("tomaste un prestamo por $"+ monto + "\nCantidad de cuotas solicitadas: " + cuotas + 
    "\n El monto total a devolver es: $" + (calculoCuotaPrestamo * cuotas).toFixed(2) + "\n La cuota mensual sera de: $" + 
    calculoCuotaPrestamo.toFixed(2));
}
