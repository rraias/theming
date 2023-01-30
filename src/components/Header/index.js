import React from 'react';
import { useHistory } from 'react-router-dom';

import { Container } from './styles';

export default function Header({ onToggleTheme, selectedTheme }) {
  // O useHistory se assemelha muito ao History do próprio Browser.
  // O history é praticamente um Array que recebe as navegações das rotas.
  // Possui métodos próprios. O push, por exemplo, é igual o de array, mas
  // redireciona o usuário para essa "última" rota recém adicionada.

  const history = useHistory();
  
  function handleNavigate(){
    history.push('/posts')
  }

  return (
    <Container>
      <h1>JStack's Blog</h1>
      <button
        type="button"
        onClick={onToggleTheme}
      >
        {selectedTheme === 'light' ? '🌚' : '🌞'}
      </button>
      <button onClick={handleNavigate} style={ { color: '#fff'}}>Navegar</button>
    </Container>
  );
}