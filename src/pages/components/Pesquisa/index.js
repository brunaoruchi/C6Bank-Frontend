import React, {useState} from 'react';
import api from '../../../services/api';

function Pesquisa() {
    const [name, setName] = useState('');
    const [error, setError] = useState('');
    const [moedaNome, setMoedaNome] = useState('');
    const [moedaImg, setMoedaImg] = useState('');
    const token = localStorage.getItem(`@C6Bank:token`)
    
    async function nameSubmit(e) {
        e.preventDefault();
        if(!name){
            setError('Digite a moeda desejada.');
            return;
        }

        if(name.length <= 3){
            setError('O nome da moeda tem que ser mais de 3 caracteres.');
            return;
        }

        try {
            const coin = await api.get(`coins/${name}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            })
            setMoedaNome(coin.data.coin.name);
            setMoedaImg(`${process.env.REACT_APP_API_URL}/files/${coin.data.coin.logo}`);
            setError('');
        }catch(err){
            console.log(err);
            setError('Moeda não encontrada.');
        }
    }

    return (
        <>
            <form onSubmit={nameSubmit}>
                <label htmlFor="pais">Digite o nome da moeda que deseja buscar: </label>
                <input 
                    id="pais" 
                    type="text" 
                    value={name} 
                    placeholder="Ex.: 01coin, audax, aunit"
                    onChange={e => setName(e.target.value)}
                />
                <button type="submit">Pesquisar</button>
            </form>
            {error&&<span className="erro-form">{error}</span>}

            {
                moedaNome && 
                <div className="campo-moeda">
                    <h2>Nome: {moedaNome}</h2><br/>
                    <img src={moedaImg} alt="Logo Moeda"/><br/>
                </div>
            }
        </>
    );
}

export default Pesquisa;