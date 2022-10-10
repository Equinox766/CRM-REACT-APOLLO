import React, { Fragment, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import {Link} from 'react-router-dom';
import OBTENER_CLIENTES from '../querys/index';

function Contactos() {
  const {data, loading, error, startPolling, stopPolling } = useQuery(OBTENER_CLIENTES, 
    useEffect(() => {
      startPolling(1000)
      return () => {
        stopPolling()
      }
    })
  );
  if (loading) return null;
  if (error) return "Error: "+error;
  return(
    <Fragment>
      <h2 className='text-center'>Listado de Clientes</h2>
      <ul className='list-group mt-4 mb-5'>
        {data.getClientes.map(item=>(
          <li key={item.id} className="list-group-item list-group-item-dark">
            <div className='row justify-content-between aling-items-center'>
              <div className='col-md-8 d-flex justify-content-between align-items-center'>
                {item.nombre} {item.apellido} - {item.empresa} 
              </div>
              <div className='col-md-4 d-flex d-block justify-content-end'>
                <Link to={`/cliente/editar/${item.id}`} className='btn btn-success d-block d-md-inline-block'>Editar Cliente</Link>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </Fragment>
  )
}

export {Contactos};