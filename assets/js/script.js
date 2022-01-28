// Obtiene y validad la cantidad de requeticiones que quiere jugar el usuario
function cantidadRepeticiones() {

    let cantidadRepeticiones;

    do { //Validación de la entrada de dato cantidad de repeticiones

        cantidadRepeticiones = parseInt(prompt("Indique la cantidad de veces que quiere jugar:", ""));

        if (cantidadRepeticiones <= 0 || !cantidadRepeticiones) {
            alert("ERROR: Ingrese un valor valido para las repeticiones (mayores a 0)");
        }

    } while (cantidadRepeticiones <= 0 || !cantidadRepeticiones); // !cantidadRepeticiones es para captar el valor de cantidadRepeticiones cuando es cancelado el prompt

    return cantidadRepeticiones;

}

// Reinicia en PANTALLA el marcador, los iconos de las jugadas y desaparese el botón de "Nuevo Juego" y resultado final, y reaparece los botones de jugadas.
function nuevoJuego(marcadorJugador, marcadorMaquina) {

    // Reinicia marcador en pantalla y resultado de la ronda
    $("#marcador-jugador").html(marcadorJugador);
    $("#marcador-maquina").html(marcadorMaquina);
    $("#resultado-jugada h3").html("Resultado de la ronda");

    // Se ponen los iconos de jugador y maquina en las elecciones
    $("#icono-jugador").attr("class", "fas fa-user fa-5x");
    $("#icono-maquina").attr("class", "fas fa-robot fa-5x");

    // Se remueve de pantalla el mensaje del resultado anterior y el botón de comienzo y se imprime la pantalla de juego y las opciones de jugadas
    $("#pantalla-resultado").addClass("d-none");
    $("#nuevo-juego").addClass("d-none");
    $("#jugadas").removeClass("d-none");
    $("#resultado-jugada").removeClass("d-none");

    // Remueve la clase para el color de la fuente del resultado final y marcador y resultado de la ronda
    $("#pantalla-resultado, #marcador").removeClass("victoria derrota empate");
    $("#resultado-jugada").removeClass("victoria derrota empate");

}

// Transforma las jugadas representadas en numero a palabra
// Piedra = 0 || Papel = 1 || Tijera = 2
function jugadaNumeroAPalabra(jugada) {

    let jugadaLiteral;

    switch (jugada) {
        case 0:
            jugadaLiteral = "Piedra";
            break;

        case 1:
            jugadaLiteral = "Papel";
            break;

        case 2:
            jugadaLiteral = "Tijera";
            break;

        default:
            break;
    }

    return jugadaLiteral;
}

// Imprime en pantalla las jugadas en la etiqueta del selector elegido
function imprimirElecciones(jugada, selector) {

    switch (jugada) {
        case "Piedra":
            $(selector).attr("class", "far fa-hand-rock fa-5x");
            break;

        case "Papel":
            $(selector).attr("class", "far fa-hand-paper fa-5x");
            break;

        case "Tijera":
            $(selector).attr("class", "far fa-hand-scissors fa-5x");
            break;
        default:
            console.error("Error en jugada en la función imprimirElecciones");
            break;
    }

}

// Se obtiene el resultado de la partida, imprime las jugadas en pantalla y se define un color a cada jugada si se gana (verde), pierde (rojo) o empata (gris).
function resultadoJuego(jugadaJugador, marcadorJugador, marcadorMaquina) {

    let jugadaMaquina, resultado;

    // Se genera la jugada de la máquina
    jugadaMaquina = Math.floor(Math.random() * 3);

    // Transforma las jugadas representadas en numero a palabras
    jugadaJugador = jugadaNumeroAPalabra(jugadaJugador);
    jugadaMaquina = jugadaNumeroAPalabra(jugadaMaquina);

    // Muestra en la pantalla las elecciones del jugador y la máquina
    imprimirElecciones(jugadaJugador, "#icono-jugador");
    imprimirElecciones(jugadaMaquina, "#icono-maquina");

    // Limpia las clases del color de los iconos
    $("#icono-jugador, #icono-maquina").removeClass("victoria derrota empate");

    // Comparacion para elegir el resultado de juego
    if (jugadaJugador == jugadaMaquina) {
        //Caso de Empate
        resultado = "Empate";
        $("#icono-jugador, #icono-maquina").addClass("empate");

    } else if ((jugadaJugador == "Piedra" && jugadaMaquina == "Tijera") || (jugadaJugador == "Papel" && jugadaMaquina == "Piedra") || (jugadaJugador == "Tijera" && jugadaMaquina == "Papel")) {
        //Caso de Victoria

        $("#icono-jugador").addClass("victoria");
        $("#icono-maquina").addClass("derrota");
        resultado = "Victoria";
        marcadorJugador++;

    } else {
        //Caso de Derrota

        $("#icono-maquina").addClass("victoria");
        $("#icono-jugador").addClass("derrota");
        resultado = "Derrota";
        marcadorMaquina++;
    }

    // Imprimir marcador en pantalla
    $("#marcador-jugador").html(marcadorJugador);
    $("#marcador-maquina").html(marcadorMaquina);

    return resultado;

}

// Se enseña el resultado final de la partida, se eliminana las opciones de jugada y se muestra el botón de "Nuevo Juego" 
function finJuego(marcadorJugador, marcadorMaquina) {

    // Dependiendo de si es mayor, menor o igual, se mostrara el resultado final en pantalla y cambiara el color del mensaje y del marcador
    if (marcadorJugador > marcadorMaquina) {

        $("#mensaje-resultado").html(`
        Felicidades has ganado esta partida.
        `);
        $("#pantalla-resultado, #marcador").addClass("victoria");

    } else if (marcadorJugador < marcadorMaquina) {

        $("#mensaje-resultado").html(`
        Lo sentimos, has perdido esta partida.
        `);
        $("#pantalla-resultado, #marcador").addClass("derrota");

    } else {

        $("#mensaje-resultado").html(`
        Has empatado esta partida.
        `);
        $("#pantalla-resultado, #marcador").addClass("empate");

    }


    // Se eliminana las opciones de jugada y se muestra el botón de "Nuevo Juego "
    $("#pantalla-resultado").removeClass("d-none");
    $("#nuevo-juego").removeClass("d-none");
    $("#jugadas").addClass("d-none");
}


$(function () { //Funcion Ready

    // Se definen variables a ocupar
    var numeroRepeticiones, rondaActual, jugadaJugador, marcadorJugador, marcadorMaquina, resultado;


    // Se activa el evento cuando se presiona el botón de "Nuevo Juego"
    $(document).on("click", "#btn-nuevo-juego", function () {

        // Reinicia las variables de los marcadores y la ronda actual
        marcadorJugador = 0;
        marcadorMaquina = 0;
        rondaActual = 0;

        // Se obtiene el dato del número de repeticiones
        numeroRepeticiones = cantidadRepeticiones();

        // Se imprimen en pantalla las rondas totales y la ronda actual
        $("#total-rondas").html(numeroRepeticiones);
        $("#ronda-actual").html(rondaActual);

        // Se inicia el nuevo juego
        nuevoJuego(marcadorJugador, marcadorMaquina);
    });



    // Se activa el evento cuando uno de los botones de jugada se presiona
    $(document).on("click", "#btn-piedra, #btn-papel, #btn-tijera", function () {

        // Actualiza el numero de la ronda actual y la imprime en pantalla
        rondaActual++;
        $("#ronda-actual").html(rondaActual);

        // Se obtiene la jugada elegida por la persona segun el botón que activo el evento
        jugadaJugador = parseInt($(this).attr("value"));

        // Se obtiene el resultado de la partida y se muestran las jugadas en pantalla
        resultado = resultadoJuego(jugadaJugador, marcadorJugador, marcadorMaquina);
        $("#resultado-jugada h3").html(`Ronda ${rondaActual} - ${resultado}`);

        // Limpia las clases del color de la fuente del resultado de la ronda
        $("#resultado-jugada").removeClass("victoria derrota empate");

        // Aumenta el contador del ganador o no realizar nada si es un empate, y cambia de color de la fuente en el resultado de la ronda
        switch (resultado) {
            case "Victoria":
                $("#resultado-jugada").addClass("victoria");
                marcadorJugador++;
                break;

            case "Derrota":
                $("#resultado-jugada").addClass("derrota");
                marcadorMaquina++;
                break;

            default:
                $("#resultado-jugada").addClass("empate");
                break;
        }

        // Si se finalizan las rondas se termina el juego
        if (rondaActual >= numeroRepeticiones) {

            finJuego(marcadorJugador, marcadorMaquina);

        }


    });
});