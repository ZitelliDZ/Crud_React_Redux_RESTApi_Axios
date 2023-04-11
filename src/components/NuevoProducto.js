import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
//actions redux
import { crearNuevoProductoAction } from '../actions/productosActions';
import { mostrarAlerta, ocultarAlerta } from '../actions/alertaActions';


const NuevoProducto = ({ history }) => {

  //State del componente
  const [nombre, setNombre] = useState('')
  const [precio, setPrecio] = useState(0)

  //Acceder al State
  const cargando = useSelector(state => state.productos.loading)
  const error = useSelector(state => state.productos.error)
  const alerta = useSelector(state => state.alerta.alerta)


  //manda a llamar el action de producto
  const dispatch = useDispatch()
  const agregarProducto = (producto) => dispatch(crearNuevoProductoAction(producto))

  const navigate = useNavigate()

  //cuando el usuario haga submit
  const handleSubmit = (e) => {
    e.preventDefault()

    //validar form
    if ([nombre].includes('') || precio <= 0) {
      const alerta = {
        msg: 'Todos los campos son obligatorios.!',
        classes: 'alert alert-danger text-center text-uppercase p-3'
      }
      dispatch(mostrarAlerta(alerta))
      setTimeout(() => {
        dispatch(ocultarAlerta())
      }, 2000);
      return;
    }


    //si no hay errores
    //dispatch(ocultarAlerta())

    //crear nuevo producto
    agregarProducto({
      nombre,
      precio
    })
    //redireccionar
    navigate('/')
  }

  return (
    <div className='row justify-content-center'>
      <div className='col-md-8'>
        <div className='card'>
          <div className='card-body'>
            <h2 className='text-center mb-4 font-weight-bold'>
              Agregar Nuevo Producto
            </h2>
            {alerta ? <p className={alerta.classes}>{alerta.msg}</p> : null}
            <form onSubmit={handleSubmit}>
              <div className=' form-group'>
                <label htmlFor='nombre'>Nombre</label>
                <input type="text" value={nombre} onChange={e => setNombre(e.target.value)} id='nombre' name='nombre' className='form-control' placeholder='Nombre Producto' />
              </div>
              <div className=' form-group'>
                <label htmlFor='precio'>Precio</label>
                <input type="number" value={precio} onChange={e => setPrecio(Number(e.target.value))} id='precio' name='precio' className='form-control' placeholder='Precio Producto' />
              </div>
              <button type='submit' className='btn btn-primary font-weight-bold text-uppercase d-block w-100'>
                Agregar

              </button>
            </form>
            {cargando ? <p>Cargando...</p> : null}
            {error ? <p className='alert alert-danger p2 text-center mt-4'>Hubo un error</p> : null}
          </div>
        </div>
      </div>
    </div>
  )
}

export default NuevoProducto