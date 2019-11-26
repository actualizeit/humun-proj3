import React, { useState } from 'react'
import axios from 'axios'



function Products(){

    const [products, setProducts] = useState('')
    const [ApiKey]=useState("300131a1a6649b667c037cf4136c26bc")
    const[search, setSearch]=useState('');


    function handleChange(event){
        const search = event.target.value;

        setSearch(search)
    }

    function handleSubmit(event){

        event.preventDefault();
        axios.get('https://api.data.charitynavigator.org/v2/Organizations?app_id=ba24e24a&app_key='+ApiKey+'&search='+search+'&rated=true&sort=Rating')
        .then(res =>{
            console.log(res.data[0].charityName)
            setProducts(res)
            return products;
            
        })

        
    };
    
    return(
        <div>
            <nav className="navbar navbar-light bg-light">
                <a 
                href="/"
                className="navbar-brand">Navbar</a>
                <form onSubmit = {handleSubmit}className="form-inline">
                    <input className="form-control mr-sm-2" type="search" placeholder="Search" 
                    onChange={handleChange}aria-label="Search"/>
                    <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                </form>
            </nav>
            <div>
                {
                   console.log(products)
                   
                }
                {
                    products.map(charity =>(
                        
                        <h4>{charity.data.charityName}</h4>
                    ))  
                }   
                
            </div>
        </div>

    
    ) 
}

export default Products