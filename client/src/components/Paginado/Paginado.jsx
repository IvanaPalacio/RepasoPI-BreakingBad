import React from 'react';
import './estilo.css';


export default function Paginado ({characetersPerPage,allCharacters, paginado }){
    const pageNumbers = []
    
    for(let i=0; i<= Math.ceil(allCharacters/characetersPerPage); i++){
        pageNumbers.push(i)
    }
    return(
        
        <nav>
            <section className ="estilo">
                {pageNumbers && 
                pageNumbers.map(number =>(
                    <div className="number" key={number}>
                        <a href onClick={() => paginado(number)}>{number}</a>
                    </div>
                    ))}
            </section>
        </nav>
    )
}
