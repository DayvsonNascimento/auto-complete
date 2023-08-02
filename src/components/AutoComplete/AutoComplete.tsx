import { useState } from 'react';

import styles from './AutoComplete.module.css';

const AutoComplete = () => {
  const [active, setActive] = useState(false);

  const handleFocus = () => {
    setActive(true);
  };

  const handleOnBlur = () => setActive(false);

  return (
    <div className={styles.container}>
      <label className={`${styles.label} ${active && styles.active} `}>
        Options
      </label>
      <input
        className={styles.input}
        onFocus={handleFocus}
        onBlur={handleOnBlur}
      ></input>
    </div>
  );
};

export default AutoComplete;
