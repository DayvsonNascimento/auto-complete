import { useState, useCallback, useEffect } from 'react';

import styles from './AutoComplete.module.css';

interface Movie {
  title: string;
}

const AutoComplete = () => {
  const [active, setActive] = useState(false);
  const [options, setOptions] = useState([]);
  const [showOtpions, setShowOptions] = useState(false);
  const [query, setQuery] = useState('');

  const handleFocus = () => {
    setActive(true);
    setShowOptions(true);
  };

  const handleOnBlur = () => {
    setActive(false);
    setShowOptions(false);
  };

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
      <label
        className={`${styles.label} ${(active || query) && styles.active} `}
      >
        Options
      </label>
      <input
        className={styles.input}
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        onFocus={handleFocus}
        onBlur={handleOnBlur}
      ></input>

      {showOtpions && (
        <div className={styles.resultsContainer}>
          {options.map((option) => (
            <div className={styles.resultItem}>{option}</div>
          ))}

          {!!!options?.length && (
            <div className={styles.resultItem}>No results...</div>
          )}
        </div>
      )}
    </div>
  );
};

export default AutoComplete;
