import { useDispatch, useSelector } from "react-redux"
import { editarProductoAction } from "../actions/productosActions"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"

const EditarProducto = () => {


  const [producto, setProducto] = useState({
    nombre:'',
    precio: 0
  })
  //producto a editar
  const productoEditar = useSelector(state => state.productos.productoEditar)
  
  
  useEffect(() => {
    setProducto(productoEditar)
  }, [productoEditar])

  const onChangeForm = (e)=>{
    setProducto({
      ...producto,
      [e.target.name] : e.target.value
    })
  }
  

  const {nombre , precio }= producto
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleSubmit = (e) =>{
    e.preventDefault()

    dispatch(editarProductoAction(producto))
    navigate('/')
  }

  return (
    <div className='row justify-content-center'>
      <div className='col-md-8'>
        <div className='card'>
          <div className='card-body'>
            <h2 className='text-center mb-4 font-weight-bold'>
              Editar Producto
            </h2>

            <form onSubmit={handleSubmit} >
              <div className=' form-group'>
                <label htmlFor='nombre'>Nombre</label>
                <input type="text" id='nombre' name='nombre' className='form-control' placeholder='Nombre Producto' value={nombre} onChange={onChangeForm} />
              </div>
              <div className=' form-group'>
                <label htmlFor='nombre'>Precio</label>
                <input type="number" id='precio' name='precio' className='form-control' placeholder='Precio Producto' value={precio} onChange={onChangeForm}/>
              </div>
              <button type='submit' className='btn btn-primary font-weight-bold text-uppercase d-block w-100'>
                Guardar Cambios

              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EditarProducto