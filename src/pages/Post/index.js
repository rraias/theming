import React, { useMemo } from "react";
import { useParams, useLocation } from "react-router-dom";

// Usamos o useParams para capturar os parâmetros/pathname da URL.
// É bem simples, basta inicializar-lo em uma constante e pronto!
// Para capturar-mos os QueryParams, utilizamos o useLocation.
// Ele possui uma propriedade chamada "search", cuja qual podemos
// desestruturar. Depois, basta instanciar uma URLSearchParams, passando
// ela como argumento, e utilizar o método .get('nomeDoQueryParam') para
// obter o seu valor.
// PS. Uma dia é utilizar esse new URLSearchParams em um useMemo, para 
// que ele só seja instanciado caso haja uma alteração no search.

export default function Post(){
    const params = useParams();
    const {search} = useLocation();
    const queryParams = useMemo(() => new URLSearchParams(search), [search])

    console.log(params);
    console.log(queryParams.get('key'));

    return(
        <h1>Post Page</h1>
    )
}