import React, {useContext} from 'react';


import Header from '../Header';
import Footer from '../Footer';
import { toggleThemeContext } from '../../App';
import Routes from '../../Routes';
import { BrowserRouter, Link } from 'react-router-dom';
import { Nav } from './styles';
// Usamos o "Link" do react-router-dom para fazer a navegação entre páginas.
// O Link, diferente do <a>, não gera refresh na página, preservando, assim
// a SPA. Entretanto, o Link, no DOM, é um <a> normal, com href, porém
// controlado pelo react-router-dom.
// PS. Deve estar envoltou em um componente Router. Por isso, retiramos
// o BrowserRouter do Routes.js e o colocamos para envolver os componentes
// Link e Routes aqui.

// Para acessar qualquer hook ou algo do tipo relacionado as rotas, é
// necessário estar dentro do Router.


export default function Layout() {

  const {theme, handleToggleTheme} = useContext(toggleThemeContext);


  return (
    <BrowserRouter>
      <Header 
      onToggleTheme={handleToggleTheme}
      selectedTheme={theme}
       />
      <Nav>
      <Link to="/">Home</Link>
      <Link to="/posts">Posts</Link>
      <Link to="/posts/1234">Post</Link>
      </Nav>
       <Routes/>
      {/* <Footer 
      onToggleTheme={handleToggleTheme}
      selectedTheme={theme}
      /> */}
      </BrowserRouter>
  );
}
