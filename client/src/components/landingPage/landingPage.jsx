import React from 'react';
import {Link} from 'react-router-dom';

export default function landingPage(){
    return(
        <div>
            <br/>
            <Link to = '/home'>
                <button>ingresar</button>
            </Link>
        </div>
    )
}