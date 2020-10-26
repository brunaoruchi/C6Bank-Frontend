import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

function CriarMoeda() {
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const token = localStorage.getItem(`@C6Bank:token`)

  const onSubmit = async (data) => {
    const formData = new FormData()

    formData.append("logo", data.logo[0])
    formData.append("name", data.name.toLowerCase())

    const res = await fetch(`${process.env.REACT_APP_API_URL}/coins/admin`, {
      method: "POST",
      body: formData,
      headers: {
        Authorization: `Bearer ${token}`,
      }
    }).then(res => res.json())
    if (res.status === true) {
      setMessage('Cadastro da moeda realizado com sucesso!')
      setError('');
    } else {
      setMessage('')
      setError('Ocorreu um erro no cadastro da moeda, verifique os campos.');
    }

  }

  return (
    <div className="form-user">
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>Cadastrar moeda: </label>
        <input ref={register} type="file" name="logo" />
        <input ref={register} minlength="4" type="text" name="name" />
        <button>Criar</button>
      </form>
      {error && <span className="erro-form">{error}</span>}
      {message && <span className="message-form">{message}</span>}
    </div>

  );
}

export default CriarMoeda;