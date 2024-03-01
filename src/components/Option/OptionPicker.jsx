import styles from './Option.module.scss';

function OptionPicker({ color }) {
  const style = {
    backgroundColor: color,
  };
  return <div className={styles.div} style={style}></div>;
}
export default OptionPicker;
