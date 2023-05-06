import { useState } from 'react'
import { useEffect } from 'react'
import Header from './components/Header'
import Filtros from './components/Filtros'
import ListadoGastos from './components/ListadoGastos'
import Modal from './components/Modal'
import { generarId } from './helpers'
import IconoNuevoGasto from './img/nuevo-gasto.svg'

function App() {
  const [presupuesto, setPresupuesto] = useState(
    Number(localStorage.getItem('presupuesto')) ?? 0
  );
  const [isValidPresupuesto, setIsValidPresupuesto] = useState(false);
  const [modal, setModal] = useState(false);
  const [animarModal, setAnimarModal] = useState(false);
  const [gastos, setGastos] = useState(
    localStorage.getItem('gastos') ? JSON.parse(localStorage.getItem('gastos')) : []
  );
  const [gastoEditar, setGastoEditar] = useState({});
  const [filtro, setFiltro] = useState("");
  const [gastosFiltrados, setGastosFiltrados] = useState([]);


  useEffect(() => {
    if(Object.keys(gastoEditar).length > 0) {
      handleGastoExistente();
    }
  }, [gastoEditar]);

  useEffect(() => {
    localStorage.setItem('presupuesto', Number(presupuesto) ?? 0);
  }, [presupuesto]);

  useEffect(() => {
    const presupuestoLS = Number(localStorage.getItem('presupuesto') ?? 0);
    if(presupuestoLS > 0) {
      setIsValidPresupuesto(true);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('gastos', JSON.stringify(gastos) ?? []);
  }, [gastos]);

  useEffect(() => {
    if(filtro) {
      //Filtrar gastos por categoria
      const gastosFiltradosFiltro = gastos.filter(gasto => 
        gasto.categoria === filtro
      );
      setGastosFiltrados(gastosFiltradosFiltro);
    }
  }, [filtro])


  const handleGastoExistente = () => {
    setModal(true);
    setTimeout(() => {
      setAnimarModal(true);
    }, 300)
  }

  const handleNuevoGasto = () => {
    setModal(true);
    setGastoEditar({});
    setTimeout(() => {
      setAnimarModal(true);
    }, 300)
  }
  

  const guardarGasto = gasto => {
    console.log('guardando gasto');
    if(gasto.id) {
      const gastosActualizados = gastos.map(gastoState => 
        gastoState.id === gasto.id ? gasto : gastoState)
      setGastos(gastosActualizados);
      setGastoEditar({});
      return;
    }
    gasto.id = generarId();
    gasto.fecha = Date.now();
    setGastos([...gastos, gasto]);
  }

  const eliminarGasto = id => {
    const gastosActualizados = gastos.filter(gasto => gasto.id !== id);
    setGastos([...gastosActualizados]);
  }

  return (
    <div className={modal ? 'fijar' : ''}>
      <Header
        gastos={gastos}
        setGastos={setGastos}
        presupuesto={presupuesto}
        setPresupuesto={setPresupuesto}
        isValidPresupuesto={isValidPresupuesto}
        setIsValidPresupuesto={setIsValidPresupuesto}
      />
      { isValidPresupuesto ? (
          <>
            <main>
              <Filtros 
                filtro={filtro}
                setFiltro={setFiltro}
              />
              <ListadoGastos 
                gastos={gastos}
                setGastoEditar={setGastoEditar}
                eliminarGasto={eliminarGasto}
                gastosFiltrados={gastosFiltrados}
                filtro={filtro}
              />
            </main>
            <div className='nuevo-gasto'>
              <img 
                src={IconoNuevoGasto} 
                alt="icono-nuevo-gasto" 
                onClick={handleNuevoGasto}
              />
            </div>
          </>
      ): null}

      {modal && <Modal 
                  setModal={setModal} 
                  animarModal={animarModal} 
                  setAnimarModal={setAnimarModal}
                  guardarGasto={guardarGasto}
                  gastoEditar={gastoEditar}
                  setGastoEditar={setGastoEditar}
                  />
                  }
    </div>
  )
}

export default App
