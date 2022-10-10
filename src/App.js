import {Component, Fragment} from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';

//Componentes
import {Contactos} from './componentes/Cliente'
import Header from './componentes/Header';
import EditarCliente from './componentes/EditarCliente';
import NuevoCliente from './componentes/NuevoCliente';
class App extends Component {
  render() {
    return (
      <Router>
        <Fragment>
          <Header />
          <div className='container'>
            <Routes>
              <Route exact path='/' element={<Contactos />} />
              <Route exact path='/cliente/nuevo' element={<NuevoCliente />} />
              <Route exact path='/cliente/editar/:id' element={<EditarCliente />} />
            </Routes>
          </div>
        </Fragment>
      </Router>
      
    );
  }
}

export default App;
