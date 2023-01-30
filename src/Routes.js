import React from "react";
import { Route, Switch, useLocation } from "react-router-dom";

import { useTransition, animated } from "react-spring"; 
// Biblioteca para animar transições entre rotas
// O useTransition retorna uma função, que possui dois argumentos:
// o useLocation, e os objetos from, enter e leave.
// O Animated serve para coordenar as animações. Devemos envolver nossas
// rotas pelo animated.AlgumaTagHTML, e lhe passar props e item.
// O animated recebe o props(responsável pela animação) no style, 
// e o Switch recebe o item(a rota) em location

// O Route é o componente responsável por definir as rotas.
// Recebe duas propriedades: o path, que é o endereço da rota, e o
// component a ser renderizado naquela rota.

// As rotas precisam estar envoltas sobre um componente Router. O
// Router pode ser de diversos tipos. O mais baixo nível é o simplesmente
// Router, que precisamos instalar o history, instanciar e passar como prop
// Uma abstração dele é o BrowserRouter (usado em 99% dos casos),
// que não depende disso. Já faz uso da API History do HTML5.
// O Router de baixo nível é interessante para podermos realizar
// manipulações com um histórico customizado de navegação.

// Para fazer o JS manipular as rotas, e não o servidor, devemos passar
// a flag "historyApiFallback: true" para o webpack. O Webpack irá
// tentar resolver a rota e, caso dê o erro 404, vai redirecionar
// para o index.html, que possui o nosso bundle do JS, que irá
// cuidar da rota.

// A prop "exact" é para evitar o pseudo "includes" que existe no Router.
// O component da rota só será renderizado se for exatamente igual ao path.
//É interessante utilizarmos sempre nas rotas "pai".

// A rota padrão de NotFound, precisamos passar um path com wildcard, que
// seria "*", ou então não passar a prop path para a Route.

// O componente Switch, do react-router-dom, funciona como um Swich
// statemente do JS com breaks. Ele vai apenas renderizar a PRIMEIRA rota
// que cumpra com os parâmetros do path. Caso não encontre nenhum, aí
// renderiza a NotFound, que é nossa página default.

// Passamos a flag "publicPath: '/'" para o webpack, no output, para
// dizer que o arquivo JS do bundle está na página raiz, e não gerar
// conflito quando passarmos as rotas como /posts/id.


import Home from "./pages/Home";
import Posts from "./pages/Posts";
import NotFound from "./pages/NotFound";
import Post from "./pages/Post";

export default function Routes(){
    const location = useLocation();
    const transitions = useTransition(location, {
        from: { opacity: 0, transform: 'translateY(50px)', position: 'absolute'}, // Estilos antes de entrar na tela
        enter: { opacity: 1, transform: 'translateY(0)', position: 'absolute'}, // Estilos quando entrar em tela
        leave: { opacity: 0, transform: 'translateY(50px)', position: 'absolute'} // Estilos ao sair da tela
        // Obedece sempre a ordem from -> enter -> leave
        // Usamos o position: absolute, pois podem ocorrer bugs referentes
        // ao posicionamento dos elementos, pois o react spring não espera
        // um elemento sair para inserir o outro. Com o position absolute
        // um sobrepõe ao outro, evita o bug e a transição fica mais smooth
    })

    return transitions((props, item) => (
        <animated.div style={props}>
        <Switch location={item} >
        <Route exact path="/" component={Home}/>
        <Route exact path="/posts" component={Posts}/>
        <Route path="/posts/:id" component={Post}/>
        <Route component={NotFound}/>
        </Switch>
        </animated.div>
    ))
}