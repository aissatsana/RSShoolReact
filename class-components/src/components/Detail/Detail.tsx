'use client';

import { type FC } from 'react';
import { Loader } from '../Loader';
import { useGetCharacterByIdQuery } from '../../api/characterApi';
import styles from './Detail.module.css';

interface DetailProps {
  id: number;
  onClose: () => void;
}

export const Detail: FC<DetailProps> = ({ id, onClose }) => {
  const { data, isLoading, isError, refetch } = useGetCharacterByIdQuery(id);

  return (
    <div className={styles.detail}>
      <div className={styles.detail__content}>
        <button className={styles.detail__close} onClick={onClose}></button>
        {isLoading ? (
          <Loader />
        ) : isError || !data ? (
          <>
            <p>Something went wrong, please try again later</p>
            <button onClick={() => refetch()}>Retry</button>
          </>
        ) : (
          <>
            <h2 className={styles.detail__name}>{data.name}</h2>
            <img
              className={styles.detail__img}
              src={data.image}
              alt={data.name}
            />
            <ul className={styles.detail__info}>
              <li className={styles.detail__item}>{data.gender}</li>
              <li className={styles.detail__item}>{data.species}</li>
              <li className={styles.detail__item}>{data.status}</li>
              <li className={styles.detail__item}>{data.location.name}</li>
            </ul>
          </>
        )}
      </div>
    </div>
  );
};
