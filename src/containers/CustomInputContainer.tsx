import { useState, useCallback, useEffect } from 'react';

import AutoComplete from '../components/AutoComplete/AutoComplete';

import styles from './CustomInputContainer.module.css';

interface Movie {
  title: string;
}

const CustomInputContainer = () => {
  const [query, setQuery] = useState('');
  const [options, setOptions] = useState([]);

  const getOptionsbyQuery = useCallback(async () => {
    try {
      const response = await fetch(
        `http://localhost:3004/movies?title_like=${query}`
      );
      const data = await response.json();

      const moviesTitles = data?.map((movie: Movie) => movie.title) || [];

      setOptions(moviesTitles);
    } catch (error) {
      console.error(error);

      setOptions([]);
    }
  }, [query]);

  useEffect(() => {
    getOptionsbyQuery();
  }, [query]);

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h2 className={styles.title}>Auto Complete</h2>

        <AutoComplete
          label="Movie"
          options={options}
          query={query}
          setQuery={setQuery}
        />
      </div>
    </div>
  );
};

export default CustomInputContainer;
