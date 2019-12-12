import React, { useState, useEffect } from 'react'
import axios from 'axios'
import ThemeCard from '../../ThemeCard'
// import ProductCard from './productCard'

function Products() {

  // set states for products and search term. 
  const [products, setProducts] = useState([''])
  const ApiKey = process.env.REACT_APP_CHARITY_API_KEY;
  const [search, setSearch] = useState('');
  const [isLoaded, setIsLoaded] = useState(false);

  // capture search from user input update states above
  function handleChange (event) {
    const search = event.target.value.trim() || "Humane Society";
    setSearch(search)
  }

  // function handleSave(){

  // }
  // Rerun API call each time search term is changed
  useEffect(() => {
    axios
      .get('https://api.data.charitynavigator.org/v2/Organizations?app_id=ba24e24a&app_key=' + ApiKey + '&pageSize=20&search=' + search + '&searchType=name_only&rated=true&sort=Rating')
      .then(res => {
        setProducts(res.data);
        setIsLoaded(true);
        return products;
      });
  }, [search, ApiKey, products]);

  return (
    <div>

      {/* input section to update search term */}
      <input
        type="text"
        name="search"
        placeholder="Search"
        onChange={handleChange}
      />
      {/* {this.isLoaded && } */}
      {/* Map through all of products in the state and display them onto the page */}
      <div>
        {isLoaded &&
          products.map(charity => (
            <div key={charity.ein}>
              <ThemeCard title={
                <a
                  href={charity.websiteURL} target="blank">{charity.cause.causeName}
                </a>
              }
              image={charity.cause.image}>
                <img src={charity.cause.image} alt="charity Images" />
                <h4>EIN: {charity.ein}</h4>
                <h4>{charity.tagLine}</h4>
                {/* <button onClick={handleSave}>Save</button> */}

              </ThemeCard>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default Products;
