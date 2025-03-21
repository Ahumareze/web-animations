import React from 'react'

import '../App.css'
import { paths } from '../constants/paths'

function Home() {
    return (
        <div className='home-page'>
            <h1 className=''>A collection of Animations to help you with your React & Next js projects </h1>
            <div className='links-container'>
                <div>
                    <a className='link-item' href={paths.mouseTrail}>Mouse Trail</a>
                </div>
            </div>
        </div>
    )
}

export default Home