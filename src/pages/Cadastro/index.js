import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';

function Cadastro() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [role, setRole] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [errorName, setErrorName] = useState('');
    const [errorEmail, setErrorEmail] = useState('');
    const [errorPassword, setErrorPassword] = useState('');
    const [errorRole, setErrorRole] = useState('');

    async function onCadastroSubmit(e) {
        e.preventDefault();
        const regex_validation = /^.+@.+..+$/;
        var aux = true;
        setError('');
        setErrorName('');
        setErrorEmail('');
        setErrorPassword('');
        setErrorRole('');
        setMessage('');

        if(!email){
            setErrorEmail('Digite seu email.');
            aux = false;
        }

        if(!regex_validation.test(email)){
            setErrorEmail('Digite um email válido.');
            aux = false;
        }
        
        if(!password){
            setErrorPassword('Digite sua senha.');
            aux = false;
        }

        if(!name){
            setErrorName('Digite seu nome.');
            aux = false;
        }

        if(name.length <= 3){
            setErrorName('O nome tem que ser mais de 3 caracteres.');
            aux = false;
        }

        if(email.length <= 3){
            setErrorEmail('O email tem que ser mais de 3 caracteres.');
            aux = false;
        }

        if(password.length <= 3){
            setErrorPassword('A senha tem que ser mais de 3 caracteres.');
            aux = false;
        }

        if(role === ''){
            setErrorRole('Selecione um role.');
            aux = false;
        }

        const info = {
            name,
            email,
            password,
            role
        };

        if(!aux){
            
            return;
        }

        try {
            await api.post('auth/register', info);
            setMessage('Cadastro realizado com sucesso!')
            setError('');
            setError('');
            setErrorName('');
            setErrorEmail('');
            setErrorPassword('');
            setErrorRole('');
        } catch (err) {
            setError('Cadastro inválido! E-mail já cadastrado ou Erro no servidor');
            return
        }
    }

    return (
        <div className="form-user">
            <h1 id="h1criarconta">Criar conta: </h1>
            <Link to="/" className="botao" >Voltar</Link>
            <form onSubmit={onCadastroSubmit}>
                <label htmlFor="name">Name: </label>
                <input
                    id="name"
                    type="text"
                    value={name}
                    onChange={e => setName(e.target.value)}
                />
                {errorName&&<span className="erro-form">{errorName}</span>}
                <label htmlFor="email">E-mail: </label>
                <input
                    id="email"
                    type="text"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />
                {errorEmail&&<span className="erro-form">{errorEmail}</span>}
                <label htmlFor="password">Senha: </label>
                <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />
                {errorPassword&&<span className="erro-form">{errorPassword}</span>}
                <label htmlFor="role">Role: </label>
                <select value={role} onChange={e => setRole(e.target.value)}>
                    <option disabled defaultValue> </option>
                    <option value="admin">Administrador</option>
                    <option value="user">Usuário</option>
                </select>
                {errorRole&&<span className="erro-form">{errorRole}</span>}
                <button type="submit">Criar</button>
            </form>
            {error && <span className="erro-form">{error}</span>}
            {message && <span className="message-form">{message}</span>}
        </div>
    );
}

export default Cadastro;