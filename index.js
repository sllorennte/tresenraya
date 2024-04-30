$(function() {
    var tablero = $("#tablero");
    var turno = "X";
    var juegoEnCurso = true;

    tablero.on("click", ".celda", function() {
        if (!juegoEnCurso) return;

        var celda = $(this);
        if (celda.text()==="") {
            celda.text(turno);
            celda.attr("data-jugador", turno);

            if (verificarGanador(turno)) {
                $("#info").text(`¡Ganador: ${jugadorNombre(turno)}!`);
                juegoEnCurso = false;
            } else if ($(".celda:empty").length === 0) {
                $("#info").text("¡Es empate!");
                juegoEnCurso = false;
            } else {
                if (turno === "X") {
                    turno = "O";
                } else {
                    turno = "X";
                }
                $("#info").text(`Turno de: ${jugadorNombre(turno)}`);
            }
        }
    });
    $("#confirmar").click(function(){
        var jugador1Nombre = $("#jugador1").val() || "Jugador 1";
        var jugador2Nombre = $("#jugador2").val() || "Jugador 2";

        $("#info").text(`Turno de: ${jugador1Nombre}`);
        $("#nombres").hide();
        juegoEnCurso = true;
    });

    $("#reiniciar").click(function() {
        $(".celda").removeClass("winner").text("");
        $("#info").text("Turno de: ");
        turno = "X";
        juegoEnCurso = true;
    });

    function verificarGanador(jugador) {
        var combinacionesGanadoras = [
            [0,1,2],
            [3,4,5],
            [6,7,8],
            [0,3,6],
            [1,4,7],
            [2,5,8],
            [0,4,8],
            [2,4,6]
        ];

        for (var i = 0; i < combinacionesGanadoras.length; i++) {
            var combinacion = combinacionesGanadoras[i];
            if (combinacion.every((indice) => $(".celda[data-indice='" + indice + "']").text() === jugador)) {
                combinacion.forEach((indice) => {
                    $(".celda[data-indice='" + indice + "']").addClass("winner");
                });
                return true;
            }
        }
        return false;
    }

    function jugadorNombre(turno) {
        if (turno==="X") {
            return $("#jugador1").val() || "Jugador 1";
        } else {
            return $("#jugador2").val() || "Jugador 2";
        }
    }
});
