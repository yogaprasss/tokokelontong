import Image from 'next/image';
import styles from './ProductCard.module.css';
import useProductCardHooks from './hooks';
import DeleteIcon from '@/assets/delete.svg';
import StarIcon from '@/assets/rating.svg';

import { FC } from 'react';
import { capitalizeWord, formatCurrency } from '@/utils/string';

import type { ProductProps } from '@/services/product';

interface ProductCardProps extends ProductProps {
  onDeleteProduct: (id: string | number) => void;
}

const ProductCard: FC<ProductCardProps> = ({
  id,
  title,
  price,
  category,
  image,
  rating,
  onDeleteProduct
}) => {
  const { methods: { deleteProduct, background } } = useProductCardHooks();
  return (
    <div className={styles.container}>
      <Image
        src={image}
        alt='product-img'
        width={300}
        height={300}
        className={styles.image}
      />
      <div className={styles.informationContainer}>
        <div className={styles.informationContent}>
          <div className={styles.titleContainer}>
            <p className={styles.title} title={title}>{title}</p>
            <button
              type='button'
              onClick={deleteProduct(id, onDeleteProduct)}
              className={styles.buttonDelete}
            >
              <Image src={DeleteIcon} alt='delete-icon' width={15} height={24} />
            </button>
          </div>
          <p className={styles.price}>{formatCurrency(price)}</p>
          <div className={styles.ratingContainer}>
            <Image src={StarIcon} alt='rating-icon' width={20} height={20} />
            <p className={styles.rating}>{rating.rate} ({rating.count})</p>
          </div>
        </div>
        <div className={`${styles.categoryContainer} ${background(styles, category)}`}>
          {capitalizeWord(category)}
        </div>
      </div>
    </div>
  )
};

export default ProductCard;
