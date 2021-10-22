import React from 'react';
import './style.css';

export default function Card({name, image, nickname}){
    return(
        <div className= "style">
            <h3>{name}</h3>
            <h5>{nickname}</h5>
            <div class= "imagenes">
                <img src = {image} alt= "img not found" width="200" heigh="250px"/>
            </div>
        </div>
    );
}