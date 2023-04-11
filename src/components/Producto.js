import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'


//redux
import { useDispatch } from 'react-redux'
import { eliminarProductosAction,obtenerProductoEditar } from '../actions/productosActions'

const Producto = ({ producto }) => {

    const { nombre, precio, id } = producto

    const dispatch = useDispatch()

    //confirmar
    const confirmarEliminarProducto = ()=>{
        Swal.fire({
            title: 'Seguro que desea eliminar el producto?',
            text: "No podrás revertir esto.!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, Eliminar!'
        }).then(async(result) => {
            if (result.isConfirmed) {
                
                dispatch(eliminarProductosAction(id))

            }
        })
    }

    //funcion que redirige de forma programada
    const navigate = useNavigate ()
    const redireccionarEdicion = producto =>{
        dispatch(obtenerProductoEditar(producto))
        navigate(`/productos/editar/${producto.id}`)
    }

    return (
        <tr>
            <td>{nombre}</td>
            <td><span className='font-weight-bold'>$ {precio}</span></td>
            <td className='acciones'>
                <button type='button' onClick={()=>redireccionarEdicion(producto)}
                className='btn btn-primary mr-2'
                >Editar</button>
                <button onClick={()=>confirmarEliminarProducto(id)} type='button'
                className='btn btn-danger'
                >Eliminar</button>
            </td>
        </tr>
    )
}

export default Producto