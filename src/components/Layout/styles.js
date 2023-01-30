import styled from "styled-components";

export const Nav = styled.nav`
    background-color: #000;
    margin-top: 16px;
    padding: 16px;
    border-radius: 4px;

    a{
    color: #fff;
    text-decoration: none;
    display: inline-block;

    & + a{ //Aqui, sempre que tiver um <a> depois de outro <a>, adiciona
        // o margin-left.
        margin-left: 16px;
    }
    }

`