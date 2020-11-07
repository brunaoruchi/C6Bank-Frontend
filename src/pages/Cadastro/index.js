import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';

function Cadastro() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [role, setRole] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');

    async function onCadastroSubmit(e) {
        e.preventDefault();
        if (!email) {
            setError('Digite seu email.');
            return
        }
        if (!password) {
            setError('Digite sua senha.');
            return
        }
        if(!name){
            setError('Digite seu nome.');
            return
        }

        if(name.length <= 3){
            setError('O nome tem que ser mais de 3 caracteres.');
            return;
        }
        if (email.length <= 3) {
            setError('O email tem que ser mais de 3 caracteres.');
            return;
        }
        if (password.length <= 3) {
            setError('A senha tem que ser mais de 3 caracteres.');
            return;
        }

        const info = {
            name,
            email,
            password,
            role
        };

        try {
            await api.post('auth/register', info);
            setMessage('Cadastro realizado com sucesso!')
            setError('');
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
                <label htmlFor="email">E-mail: </label>
                <input
                    id="email"
                    type="text"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />
                <label htmlFor="password">Senha: </label>
                <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />
                <label htmlFor="role">Role: </label>
                <select value={role} onChange={e => setRole(e.target.value)}>
                    <option disabled defaultValue> </option>
                    <option value="admin">Administrador</option>
                    <option value="user">Usuário</option>
                </select>
                <button type="submit">Criar</button>
            </form>
            {error && <span className="erro-form">{error}</span>}
            {message && <span className="message-form">{message}</span>}
        </div>
    );
}

export default Cadastro;