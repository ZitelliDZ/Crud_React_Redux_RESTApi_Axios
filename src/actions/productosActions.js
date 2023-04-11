import {
    AGREGAR_PRODUCTO,
    AGREGAR_PRODUCTO_EXITO,
    AGREGAR_PRODUCTO_ERROR,
    COMENZAR_DESCARGA_PRODUCTOS,
    DESCARGA_PRODUCTOS_EXITO,
    DESCARGA_PRODUCTOS_ERROR,
    OBTENER_PRODUCTO_ELIMINAR,
    PRODUCTO_ELIMINAR_EXITO,
    PRODUCTO_ELIMINAR_ERROR,
    OBTENER_PRODUCTO_EDITAR,
    COMENZAR_EDICION_PRODUCTO,
    PRODUCTO_EDITAR_EXITO,
    PRODUCTO_EDITAR_ERROR
} from '../types';
import clienteAxios from '../config/axios';
import Swal from 'sweetalert2'


//Crear Nuevos Productos
export function crearNuevoProductoAction(producto) {
    return async (dispatch) => {
        dispatch(agregarProducto())

        try {
            //insertr en la api
            await clienteAxios.post('/productos', producto)
            //Si todo sale bien actualizar el state
            dispatch(agregarProductoExito(producto))

            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'El producto se agregó correctamente!',
                showConfirmButton: false,
                timer: 3000
            })
        } catch (error) {

            Swal.fire({
                position: 'top-end',
                icon: 'error',
                title: 'Se produjo un error!',
                showConfirmButton: false,
                timer: 3000
            })

            //Si hay un error cambiar el state
            dispatch(agregarProductoError(true))

        }

    }
}

const agregarProducto = () => ({
    type: AGREGAR_PRODUCTO,
    payload: true
})
//si el producto se guarda en la base de datos
const agregarProductoExito = (producto) => ({
    type: AGREGAR_PRODUCTO_EXITO,
    payload: producto,
})
//si hubo un error
const agregarProductoError = (estado) => ({
    type: AGREGAR_PRODUCTO_ERROR,
    payload: estado
})


//funcion que descarga productos de la bd
export function obtenerProductosAction() {
    return async (dispatch) => {
        dispatch(comenzarDescargaProductos())

        try {
            //buscar productos en la api
            const respuesta = await clienteAxios.get('/productos')
            //Si todo sale bien actualizar el state
            dispatch(descargaProductosExito(respuesta.data))
        } catch (error) {

            Swal.fire({
                position: 'top-end',
                icon: 'error',
                title: 'Se produjo un error al descargar los productos!',
                showConfirmButton: false,
                timer: 3000
            })

            //Si hay un error cambiar el state
            dispatch(descargaProductosError())

        }

    }
}



const comenzarDescargaProductos = () => ({
    type: COMENZAR_DESCARGA_PRODUCTOS,
    payload: true
})

const descargaProductosExito = (productos) => ({
    type: DESCARGA_PRODUCTOS_EXITO,
    payload: productos
})

const descargaProductosError = () => ({
    type: DESCARGA_PRODUCTOS_ERROR,
    payload: true
})




//Selecciona y elimina producto
export function eliminarProductosAction(id) {
    return async (dispatch) => {
        dispatch(obtenerProductoEliminar(id))

        try {
            //elimina producto en la api
            const respuesta = await clienteAxios.delete(`/productos/${id}`)
            //Si todo sale bien actualizar el state
            dispatch(productoEliminarExito(respuesta.data))
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Su producto ha sido eliminado.',
                showConfirmButton: false,
                timer: 3000
            })
        } catch (error) {

            //Si hay un error cambiar el state
            dispatch(productoEliminarError())

            Swal.fire({
                position: 'top-end',
                icon: 'error',
                title: 'Se produjo un error al eliminar el producto!',
                showConfirmButton: false,
                timer: 3000
            })
        }
    }
}



const obtenerProductoEliminar = (id) => ({
    type: OBTENER_PRODUCTO_ELIMINAR,
    payload: id
})

const productoEliminarExito = () => ({
    type: PRODUCTO_ELIMINAR_EXITO,
})

const productoEliminarError = () => ({
    type: PRODUCTO_ELIMINAR_ERROR,
    payload: true
})



//Colocar en activo para editar
export function obtenerProductoEditar(producto) {
    return async (dispatch) => {
        dispatch(obtenerProductoEditarActivo(producto))
    }
}




const obtenerProductoEditarActivo = (producto) => ({
    type: OBTENER_PRODUCTO_EDITAR,
    payload: producto
})




//Edita un registro en la api y state
export function editarProductoAction(producto) {
    return async (dispatch) => {
        dispatch(editarProducto())

        try {
            //elimina producto en la api
            await clienteAxios.put(`/productos/${producto.id}`,producto)
            //Si todo sale bien actualizar el state
            dispatch(productoEditarExito(producto))
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Su producto ha sido editado correctamente.',
                showConfirmButton: false,
                timer: 3000
            })
        } catch (error) {
            //Si hay un error cambiar el state
            dispatch(productoEditarError())

            Swal.fire({
                position: 'top-end',
                icon: 'error',
                title: 'Se produjo un error al editar el producto!',
                showConfirmButton: false,
                timer: 3000
            })
        }
    }
}




const editarProducto = () => ({
    type: COMENZAR_EDICION_PRODUCTO,
    
})

const productoEditarExito = (producto) => ({
    type: PRODUCTO_EDITAR_EXITO,
    payload:producto
})

const productoEditarError= () => ({
    type: PRODUCTO_EDITAR_ERROR,
    payload: true
})
