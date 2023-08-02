import { useState, SetStateAction, Dispatch, useRef } from 'react';

import styles from './AutoComplete.module.css';

interface AutoCompleteProps {
  label: string;
  options: string[];
  query: string;
  setQuery: Dispatch<SetStateAction<string>>;
}

const AutoComplete = ({
  label,
  options,
  query,
  setQuery,
}: AutoCompleteProps) => {
  const [active, setActive] = useState(false);
  const [showOtpions, setShowOptions] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFocus = () => {
    setActive(true);
    setShowOptions(true);
  };

  const handleOnBlur = () => {
    setActive(false);
    setShowOptions(false);
  };

  const handleMouseDown = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    event?.preventDefault();
  };

  const handleClick = (query: string) => {
    setQuery(query);
    setShowOptions(false);

    inputRef?.current?.blur();
  };

  return (
    <div className={styles.container}>
      <label
        className={`${styles.label} ${(active || query) && styles.active} `}
      >
        {label}
      </label>
      <input
        className={styles.input}
        value={query}
        ref={inputRef}
        onChange={(event) => setQuery(event.target.value)}
        onFocus={handleFocus}
        onBlur={handleOnBlur}
      ></input>

      {showOtpions && (
        <div className={styles.resultsContainer}>
          {options.map((option, index) => (
            <div
              key={index}
              className={styles.resultItem}
              onMouseDown={(event) => handleMouseDown(event)}
              onClick={() => handleClick(option)}
            >
              {option}
            </div>
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
