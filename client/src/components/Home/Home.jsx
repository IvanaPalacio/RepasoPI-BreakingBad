import React from 'react';
import {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { getCharacters, filterCharactersByStatus, filterCreated } from '../../actions';
import {Link} from 'react-router-dom';
import Card from '../Card/Card';
import Paginado from '../Paginado/Paginado';

export default function Home (){
    const dispatch = useDispatch();
    const allCharacters = useSelector((state) => state.characters) //con useSelector traeme en esa constante todo lo que esta en el estado de characters
    const [currentPage, setCurrentPage] = useState(1) //estados locales, quiero un estado con la pag actual y otra que me setee la pag actual
    const [characetersPerPage, setCharactersPerPage] = useState(6)
    const indexOfLastCharacter = currentPage * characetersPerPage  //
    const indexOfFirstCharacter = indexOfLastCharacter - characetersPerPage //
    const currentCharacters = allCharacters.slice(indexOfFirstCharacter,indexOfLastCharacter)

    const paginado = (pageNumber) =>{ 
        setCurrentPage(pageNumber)
    }

useEffect(() =>{
    dispatch (getCharacters());
    },[dispatch]) //está vaacío porque no depende de nada entonces se va a motar tranquilamente

function handleClick(e){
e.preventDefault(); //es preventivo pra que no se me rompa la página cuando se me recarga la página debido a que algo dependía de algo
dispatch(getCharacters()); //me lo resetea, carga todos los personajes, sirve para cualdo se bugea

}

function handleFilterStatus(e){
    dispatch(filterCharactersByStatus(e.target.value))
}

function handleFilterCreated(e){
    dispatch(filterCreated(e.target.value)) 
}
return (
    <div>
        <div>
        <Link to='/character'> Crear personaje</Link>
        </div>
        <div>
        <button onClick={e => {handleClick(e)}}>Volver a cargar todos los personajes</button>
        </div>
        <select>
            <option value = 'asc'>Ascendente</option>
            <option value = 'desc'>Descendente</option>
        </select>
        {/* el value que pasamos acá en el inferior viene de la api */}
        <select onChange={e=> handleFilterStatus(e)} >
            <option value = 'All'>Todos</option>    
            <option value = 'Alive'>Vivo</option>
            <option value = 'Deceased'>Muerto</option>
            <option value = 'Unknown'>Desconocido</option>
            <option value = 'Presumed dead'>Probablemente muerto</option>
        </select>
        <select onChange={e=> handleFilterCreated(e)} >
            <option value = 'All'>Todos</option>
            <option value = 'created'>Creados</option>
            <option value = 'api'>Existente</option>
        </select>
        <Paginado
            characetersPerPage = {characetersPerPage}
            allCharacters = {allCharacters.length}
            paginado = {paginado} 
        />
    {currentCharacters?.map((c) => {
        return(
        <div> 
            <Link to = {'/home/' + c.id}>
            <Card name={c.name} image={c.image} nickname={c.nickname} key={c.id}></Card>
            </Link>
        </div>
        )
    })}
    </div>
    );
};

