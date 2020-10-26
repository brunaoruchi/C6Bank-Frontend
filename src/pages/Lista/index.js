import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import Pesquisa from '../components/Pesquisa';
import CriarMoeda from '../components/CriarMoeda';

import api from '../../services/api';

export default function Lista() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(['']);
    const [flag, setFlag] = useState('');
    const [role, setRole] = useState('');
    const [message, setMessage] = useState('');

    async function onLoginSubmit(e) {
        e.preventDefault();
        if (!email) {
            setError('Digite seu email.');
            return;
        }
        if (!password) {
            setError('Digite sua senha.');
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
            email,
            password
        };

        try {
            const res = await api.post('auth/authenticate', info);

            localStorage.setItem("@C6Bank:token", res.data.token);
            localStorage.setItem("@C6Bank:role", res.data.user.role);
            setError('');
            setMessage('Login realizado com sucesso!')
            setFlag(localStorage.getItem(`@C6Bank:token`));
            if (localStorage.getItem(`@C6Bank:role`) === 'admin') {
                setRole(localStorage.getItem(`@C6Bank:role`));
            } else {
                setRole(null);
            }
        } catch (err) {
            setError('Login/Senha inválida!');
            console.log(err);
            return;
        }
    }

    useEffect(() => {
        setFlag(localStorage.getItem(`@C6Bank:token`));
        if (localStorage.getItem(`@C6Bank:role`) === 'admin') {
            setRole(localStorage.getItem(`@C6Bank:role`));
        } else {
            setRole(null);
        }

    }, [])

    function onSair() {
        localStorage.removeItem(`@C6Bank:token`)
        localStorage.removeItem(`@C6Bank:role`)
        alert('Usuário deslogado!');
        setRole(null);
        setFlag(null);
        setMessage('');
    }

    return (
        <div className="form-user">
            <h1 id="h1criarconta">Fazer login: </h1>
            <Link to="/" className="botao" >Voltar</Link>

            <form onSubmit={onLoginSubmit}>
                <label htmlFor="email">E-mail: </label>
                <input
                    id="email"
                    type="email"
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
                <button type="submit">Entrar</button>

            </form>
            <button className="botao-sair" onClick={onSair} >Sair</button>

            {error && <span className="erro-form">{error}</span>}
            {message && <span className="message-form">{message}</span>}
            {role && <CriarMoeda />}
            {flag && <Pesquisa />}
        </div>
    );
}