import { useState } from 'react';
function Page({ data }) {
  const [currencyFrom, setcurrencyFrom] = useState(1);
  const [currencyTo, setcurrencyTo] = useState('currency to');
  return (
    <div>
      <h1>data goes here </h1>
      <h1>
        {currencyFrom} and {currencyTo}
      </h1>
      {console.log(data.conversion_rates)}
      <select onChange={(e) => setcurrencyFrom(e.target.value)}>
        {Object.keys(data.conversion_rates).map((rate, index) => {
          return (
            <option key={index} value={data.conversion_rates[rate]}>
              {rate} - {data.conversion_rates[rate]}
            </option>
          );
        })}
      </select>

      <select onChange={(e) => setcurrencyTo(e.target.value)}>
        {Object.keys(data.conversion_rates).map((rate, index) => {
          return (
            <option key={index} value={data.conversion_rates[rate]}>
              {rate} - {data.conversion_rates[rate]}
            </option>
          );
        })}
      </select>

      {/* 
from    to
----  = ------
rate1   rate2

rate1 * to = from * rate2

or

rate1 * to
----------  = rate2
  from  
  */}
    </div>
  );
}

// This gets called on every request
export async function getServerSideProps() {
  // Fetch data from external API
  const res = await fetch(
    `https://v6.exchangerate-api.com/v6/1f88a2cead881e5036e60f6b/latest/USD`
  );
  const data = await res.json();

  // Pass data to the page via props
  return { props: { data } };
}

export default Page;
