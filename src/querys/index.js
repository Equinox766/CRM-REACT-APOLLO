import {gql} from 'apollo-boost';


const OBTENER_CLIENTES = gql`{    
    getClientes {
      id
      nombre
      apellido
      empresa
      tipo
    }
  }`

export default OBTENER_CLIENTES;