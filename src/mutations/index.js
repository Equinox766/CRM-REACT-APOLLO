import {gql} from 'apollo-boost';

export const NUEVO_CLIENTE = gql`
mutation CrearCliente($input: ClienteInput) {
    crearCliente(input: $input) {
      id
      nombre
      apellido
      empresa
      tipo
      emails {
        email
      }
    }
  }`