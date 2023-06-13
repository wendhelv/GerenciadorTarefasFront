import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [tarefas, setTarefas] = useState([]);
  const [novaTarefa, setNovaTarefa] = useState('');

  useEffect(() => {
    carregarTarefas();
  }, []);

  function carregarTarefas() {
    axios.get('http://localhost:3002/tarefas')
      .then(response => {
        setTarefas(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }

  function adicionarTarefa(event) {
    event.preventDefault();

    if (novaTarefa.trim() !== '') {
      axios.post('http://localhost:3002/tarefas', { nome: novaTarefa, feito: false })
        .then(response => {
          carregarTarefas();
          setNovaTarefa('');
        })
        .catch(error => {
          console.error(error);
        });
    }
  }

  function marcarComoFeito(id, feito,nome) {
    axios.put(`http://localhost:3002/tarefas/${id}`, { feito: !feito, nome: nome})
      .then(response => {
        carregarTarefas();
      })
      .catch(error => {
        console.error(error);
      });
  }

  function excluirTarefa(id) {
    axios.delete(`http://localhost:3002/tarefas/${id}`)
      .then(response => {
        carregarTarefas();
      })
      .catch(error => {
        console.error(error);
      });
  }

  return (
    <div className="App">
      <h1>Gerenciador de Tarefas</h1>

      <form onSubmit={adicionarTarefa}>
        <input
          type="text"
          value={novaTarefa}
          onChange={event => setNovaTarefa(event.target.value)}
          placeholder="Digite uma tarefa..."
        />
        <button type="submit">Adicionar</button>
      </form>

      <ul>
        {tarefas.map(tarefa => (
          <li key={tarefa.id}>
            <span className={tarefa.feito ? 'feito' : ''}>{tarefa.nome}</span>
            <button onClick={() => marcarComoFeito(tarefa.id,tarefa.feito,tarefa.nome)}>
              {!tarefa.feito?'Fazer':'Desfazer'}
            </button>
            <button onClick={() => excluirTarefa(tarefa.id)}>Excluir</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
