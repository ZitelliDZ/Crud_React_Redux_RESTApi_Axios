import {
    MOSTRAR_ALERTA,
    OCULTAR_ALERTA
} from "../types";


//Muestra Alerta
export function mostrarAlerta(alerta) {
    return (dispatch) =>{
        dispatch(crearAlerta(alerta))
    }
}

const crearAlerta = (alerta) =>({
    type: MOSTRAR_ALERTA,
    payload:alerta
})

//Oculta Alerta
export function ocultarAlerta() {
    return (dispatch) =>{
        dispatch(cierraAlerta())
    }
}
const cierraAlerta = () =>({
    type: OCULTAR_ALERTA,
})