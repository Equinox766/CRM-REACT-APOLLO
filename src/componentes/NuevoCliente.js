import React, { Fragment, useState } from 'react';
import { NUEVO_CLIENTE } from '../mutations';
import { useMutation } from '@apollo/client';
import {useNavigate} from 'react-router-dom'

export default function NuevoCliente() {
    const navigate = useNavigate();
    const [nombre, setNombre] = useState("");
    const [apellido, setApellido] = useState("");
    const [empresa, setEmpresa] = useState("");
    const [tipo, setTipo] = useState("");
    const [error, setError] = useState(false);
    const [emails, setEmails] = useState([]);

    const [crearCliente] = useMutation(NUEVO_CLIENTE, {
        onCompleted({crearCliente}) {
            navigate('/');
        }
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        if(nombre.length===0 || apellido.length===0 || empresa.length===0 || tipo.length===0){
            setError(true);
            return;
        }
        crearCliente({
            variables: {
                input: {
                    nombre,
                    apellido,
                    empresa,
                    emails,
                    tipo
                }
            }
        });
        setError(false); 

    }

    const nuevoCampo = () => {
        setEmails(emails.concat([{email: ''}]))
    }

    const quitarCampo = (i) => () => {
        setEmails(emails.filter((email, index) => i !== index))
    }

    const leerCampo = i => e => {
        const nuevoEmail = emails.map((email, index) => {
            if(i !== index) return email;
            return {
                ...email,
                email: e.target.value.toUpperCase()
            }
        });
        setEmails(nuevoEmail);
    }



    return (
        <Fragment>
            <h2 className='text-center'>Nuevo Cliente</h2>
            <div className='row justify-content-center'>
                <form 
                        className='col-md-8 m-3'
                        onSubmit={handleSubmit}
                    >
                        {error?
                        <div className="alert alert-danger text-center" role="alert">
                            Favor rellenar todos los campos
                        </div>:""}
                        <div className='form-row'>
                            <div className='form-group col-md-6'>
                                <label>Nombre</label>
                                <input 
                                    type="text" 
                                    className='form-control mb-1' 
                                    placeholder='Nombre'
                                    name='nombre'
                                    onChange={(e) => {
                                        setNombre(e.target.value.toUpperCase())
                                    }}
                                />
                            </div>
                            
                            <div className='form-group col-md-6'>
                                <label>Apellido</label>
                                <input 
                                    type="text" 
                                    className='form-control mb-1' 
                                    placeholder='Apellido'
                                    name='apellido'
                                    onChange={(e) => {
                                        setApellido(e.target.value.toUpperCase())
                                    }}
                            />
                            </div>
                            {emails.map((input, index) => (
                                <div key={index} className='form-group col-md-12'>
                                    <label>Email {index + 1}:</label>
                                    <div className='input-group'>
                                        <input 
                                            type="email" 
                                            className='form-control' 
                                            placeholder='Email'
                                            name='email'
                                            onChange={leerCampo(index)}
                                        
                                        />
                                        <div className='input-group-append'>
                                            <button type='button' className='btn btn-danger' onClick={quitarCampo(index)}> &times; Eliminar</button> 
                                        </div>
                                    </div>
                                </div>
                            ))}
                            <div className='form-group d-flex justify-content-center col-md-12'>
                                    <button type='button' className='btn btn-warning ' onClick={nuevoCampo}>
                                        + Agregar Email
                                    </button>
                            </div>
                            <div className='form-group col-md-12'>
                                <label>Empresa</label>
                                <input 
                                    type="text" 
                                    className='form-control mb-1' 
                                    placeholder='Empresa'
                                    name='empresa'
                                    onChange={(e) => {
                                        setEmpresa(e.target.value.toUpperCase())
                                    }}
                                />
                            </div>
                            <div className='form-group col-md-12'>
                                <label>Tipo Cliente</label>
                                <select 
                                    className='form-control mb-1'
                                    name='tipo'
                                    
                                    onChange={(e) => {
                                        setTipo(e.target.value.toUpperCase())
                                    }}
                                >
                                    <option value="">Elegir...</option>
                                    <option value="PREMIUM">PREMIUM</option>
                                    <option value="BASICO">BASICO</option>
                                </select>
                            </div>
                        </div>
                        <div className='form-group'>
                            <button type='submit' className='btn btn-success float-right col-md-12'>Agregar Cliente</button>
                        </div>
                </form>  
            </div>
        </Fragment>
    );
}
