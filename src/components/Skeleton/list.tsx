import styles from './Skeleton.module.css';

const SkeletonList = () => {
  return (
    <div>
      <div className={styles.listImage} />
      <br />
      <div className={styles.listText} />
      <div className={styles.listText} />
      <div className={styles.listText} />
      <br />
      <br />
      <div className={styles.listText} />
    </div>
  );
};

export default SkeletonList;