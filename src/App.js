import React, { useState, useMemo, createContext, useEffect } from 'react';
import { ThemeProvider } from 'styled-components';

import GlobalStyle from './styles/global';
import Layout from './components/Layout';

import themes from './styles/themes';
import common from './styles/themes/common';

export const toggleThemeContext = createContext('toggleTheme')

function useLocalState(key, initialValue = ''){
  const [state, setState] = useState(() => {
    const storedData = localStorage.getItem(key);

    if(storedData){
      return JSON.parse(storedData)
    };

    return initialValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state));
  }, [key, state]);

  return [state, setState]
}

function App() {


  const [theme, setTheme] = useLocalState('theme');

  // Resumidamente, é um hook que serve para memorizarmos valores (mesmo que
  // o componente em que esteja inserido, seja renderizado novamente). É
  // um state, só que mais performático. Recebe dois argumentos: O segundo é
  // a dependencia que ele vai ficar vendo, e o primeiro é a função a ser executada
  // sempre que a dependência tiver seu valor alterado. Mesmo que um setState 
  // renderize o componente novamente, se não houver alteraçào na dependencie
  // do useMemo, ele não vai executar a função. É um useState condicional.
  const currentTheme = useMemo(() => {
    return themes[theme] || themes.dark
    // Os colchetes com o nome do tema é como se fosse
    // theme.dark. Como estamos tentando procurar o valor dinamicamente, não
    // conseguimos acessar a propriedade da forma tradicional, portanto, utilizamos
    // essa maneira com colchetes (theme['dark']).
  }, [theme]);



  function handleToggleTheme() {
    setTheme(prevState => prevState === 'dark' ? 'light' : 'dark');
  }

  return (
    <ThemeProvider theme={{currentTheme, common}}>
      <toggleThemeContext.Provider value={{theme, handleToggleTheme}}>
      <GlobalStyle />
      <Layout/>
      </toggleThemeContext.Provider>
    </ThemeProvider>
  );
};

export default App;

// Para usar o Theming nos projetos, nós basicamente usamos o ThemeProvider
// do styled componentes e utilizamos como o provider normal da ContextApi.
// Passamos a props Theme e, no styled component que iremos utilizar, a injetamos
// utilizando o nome do objeto do arquivo do tema (ou seja lá o que for
// esse tema).

// No arquivo do componente que recebe o theme, não precisamos usar o useContext.

// O useEffect é um hook que recebe uma função, chamada de função de efeito,
// e que será executada durante o lifecycle do componente. Pode ser a cada render,
// se passarmos nada; no mount do componente (útil para requisições assíncronas)
// se passarmos um array vazio; ou a cada alteração do valor do array de dependencias.
// Para ações no unmount, basta retornar uma arrow function dentro do useEffect.
// Para evitar que o useEffect renderize na primeira render do componente, nós
// podemos usar o useRef, que é uma espécie de useState de bolso. Ele armazena
// um valor para nós e, diferente do useState, não renderiza novamente na alteração.
// Para alterar o valor, basta acessar a propriedade current do useRef.


// O useLayoutEffect é basicamente o useEffect, porém, o useLayoutEffect é
// realizado de forma síncrona e antes do DOM ser mostrado para o usuário. Enquanto
// o useEffect acontece de forma assíncrona, e após o usuário ver as alterações
// na tela. (O próprio React recomenda o useEffect em detrimendo ao useLayoutEffect)

// Coisas que disparam o render: Inicialização, mudança de state, mudança de prop.

//PS. Os hooks nunca podem ficar dentro de uma condicional.
