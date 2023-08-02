import AutoComplete from '../components/AutoComplete/AutoComplete';

import styles from './CustomInputContainer.module.css';

const CustomInputContainer = () => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h2 className={styles.title}>Auto Complete</h2>
        <AutoComplete />
      </div>
    </div>
  );
};

export default CustomInputContainer;
