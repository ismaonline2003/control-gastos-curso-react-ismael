import { useState } from 'react'
import Mensaje from './Mensaje'
const NuevoPresupuesto = ({
  presupuesto, 
  setPresupuesto,
  setIsValidPresupuesto
}) => {

  const [mensaje, setMensaje] = useState('');

  const handlePresupuesto = (e) => {
    e.preventDefault();
    let presupuestoNumber = Number(presupuesto)
    if(!presupuestoNumber || presupuestoNumber <= 0) {
      setMensaje('No es un presupuesto valido');
      setIsValidPresupuesto(false);
      return
    }
    setPresupuesto(presupuestoNumber);
    setMensaje('');
    setIsValidPresupuesto(true);
    console.log(presupuestoNumber);
  }

  return (
    <div className="contenedor-presupuesto contenedor sombra">
      <form onSubmit={handlePresupuesto} className="formulario">
        <div className="campo">
          <label htmlFor="">Definir Presupuesto</label>
          <input 
            className="nuevo-presupuesto"
            type="number"
            placeholder="Añade tu Presupuesto"
            value={presupuesto}
            onChange={e => setPresupuesto(e.target.value)}
          />

          <input type="submit" value="Añadir"/>

          {mensaje && <Mensaje tipo="error">{mensaje}</Mensaje>}
        </div>
      </form>
    </div>
  )
}

export default NuevoPresupuesto
