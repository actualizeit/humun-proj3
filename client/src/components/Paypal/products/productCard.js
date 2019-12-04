import React from 'react'
import ThemeCard from '../../ThemeCard'
import charity from './index'


function ProductCard(props){
    <ThemeCard title={
        <a 
            href={charity.websiteURL} target="blank">{charity.charityName}
        </a>
    }>
        <p>EIN: {charity.ein}</p>
        <p>{charity.tagLine}</p>
        <img src={charity.cause.image}/> 
    </ThemeCard>  
}
export default ProductCard