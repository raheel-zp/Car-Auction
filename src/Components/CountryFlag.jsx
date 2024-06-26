import { useState, useEffect } from 'react';

const CountryFlag = ({ country }) => {
  const [flagUrl, setFlagUrl] = useState('');

  useEffect(() => {
    const fetchFlag = async () => {
      try {
        const response = await fetch(`https://restcountries.com/v2/name/${country}`);
        const data = await response.json();
        const flagImageUrl = data[0].flags.svg; // Assuming the API provides the flag image URL in the "flags.svg" property
        setFlagUrl(flagImageUrl);
      } catch (error) {
        console.error('Error fetching flag:', error);
      }
    };

    fetchFlag();
  }, [country]);

  return (
    <a>
      {flagUrl && <img src={flagUrl} alt={country} />}
      {country}
    </a>
  );
};

export default CountryFlag;
