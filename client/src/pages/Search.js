import React, { useState, useEffect } from 'react';
// import { Grid, Header, Button } from 'semantic-ui-react';
import axios from 'axios';
import { Input } from 'semantic-ui-react';
import ThemeHeader from './../components/ThemeHeader';
import ThemeBody from './../components/ThemeBody';
import ThemeCard from './../components/ThemeCard';

function Search () {
  // set states for products and search term.
  const [products, setProducts] = useState(['']);
  const [ApiKey] = useState('300131a1a6649b667c037cf4136c26bc');
  const [search, setSearch] = useState('');
  const [isLoaded, setIsLoaded] = useState(false);

  // capture search from user input update states above
  function handleChange (event) {
    const search = event.target.value.trim() || 'Humane Society';
    setSearch(search);
  }

  // Run API call based on search term
  function charitySearch () {
    axios.get('https://api.data.charitynavigator.org/v2/Organizations?app_id=ba24e24a&app_key=' + ApiKey + '&pageSize=20&search=' + search + '&searchType=name_only&rated=true&sort=Rating')
      .then(res => {
        console.log(res.data);
        setProducts(res.data);
        setIsLoaded(true);
        return products;
      });
  }

  // function handleSave(){

  // }

  // Rerun API call each time search term is changed
  useEffect(() => {
    charitySearch();
  }, [search]);

  return (
    <div>
      <ThemeHeader text='Search for Organizations' />
      <ThemeBody>
        {/* input section to update search term */}
        <Input icon='search' placeholder='Search...' onChange={handleChange} fluid />
        {/* {this.isLoaded && } */}
        {/* Map through all of products in the state and display them onto the page */}
        <div>
          {isLoaded &&
            products.map(charity => (
              <div key={charity.ein}>
                <ThemeCard
                  title={charity.charityName}
                  image={charity.cause.image}
                  link={charity.websiteURL}
                  tagLine={charity.tagLine}
                  EIN={charity.EIN}
                  cause={charity.cause.causeName}
                  city={charity.mailingAddress.city}
                  state={charity.mailingAddress.stateOrProvince}
                >
                  {/* <button onClick={handleSave}>Save</button> */}
                </ThemeCard>
              </div>
            ))
          }
        </div>
      </ThemeBody>
    </div>
  );
}

export default Search;
