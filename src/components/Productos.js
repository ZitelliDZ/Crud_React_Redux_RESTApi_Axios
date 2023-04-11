import React from 'react'
import { useEffect } from 'react'
//redux
import { useSelector, useDispatch } from 'react-redux'
import { obtenerProductosAction } from '../actions/productosActions'
import Producto from './Producto'


const Productos = () => {

  const cargando = useSelector(state => state.productos.loading)
  const error = useSelector(state => state.productos.error)
  const productos = useSelector(state => state.productos.productos)

  const dispatch = useDispatch()

  useEffect(() => {
    //consultar Api
    const buscarProductos = (producto) => dispatch(obtenerProductosAction())
    buscarProductos();
    // eslint-disable-next-line
  }, [])


  return (
    <>
      <h2 className='text-center my-5'>Listado de Productos</h2>
      
      {cargando ? <p className='text-center'>Cargando...</p> : null}
      {error ? <p className='alert alert-danger p2 text-center mt-4'>Hubo un error</p> : null}
      
      <table className="table table-striped">
        <thead className='bg-primary table-dark'>
          <tr>
            <th>Nombre</th>
            <th>Precio</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {productos.length === 0 ? 'No hay productos' :
            (
              productos.map(producto => (
                <Producto key={producto.id} producto={producto} />
              ))
            )}

        </tbody>
      </table>
    </>
  )
}

export default Productos