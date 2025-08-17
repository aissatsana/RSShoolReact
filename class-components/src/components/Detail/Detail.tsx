'use client';

import Image from 'next/image';
import { type FC } from 'react';
import { Loader } from '../Loader';
import { useGetCharacterByIdQuery } from '../../api/characterApi';
import styles from './Detail.module.css';
import { useTranslations } from 'next-intl';

interface DetailProps {
  id: number;
  onClose: () => void;
}

export const Detail: FC<DetailProps> = ({ id, onClose }) => {
  const t = useTranslations('utils');
  const { data, isLoading, isError, refetch } = useGetCharacterByIdQuery(id);

  return (
    <div className={styles.detail}>
      <div className={styles.detail__content}>
        <button className={styles.detail__close} onClick={onClose}></button>
        {isLoading ? (
          <Loader />
        ) : isError || !data ? (
          <>
            <p>{t('Something went wrong, please try again later')}</p>
            <button onClick={() => refetch()}>{t('Retry')}</button>
          </>
        ) : (
          <>
            <h2 className={styles.detail__name}>{data.name}</h2>
            <Image
              className={styles.detail__img}
              src={data.image}
              alt={data.name}
              width={300}
              height={300}
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
