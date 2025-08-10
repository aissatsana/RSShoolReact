import { type FC } from 'react';
import { Loader } from '../Loader';
import './style.css';
import { useGetCharacterByIdQuery } from '../../api/characterApi';

interface DetailProps {
  id: number;
  onClose: () => void;
}

export const Detail: FC<DetailProps> = ({ id, onClose }) => {
  const { data, isLoading, isError } = useGetCharacterByIdQuery(id);

  return (
    <div className="detail">
      <div className="detail__content">
        <button className="detail__close" onClick={onClose}></button>
        {isLoading ? (
          <Loader />
        ) : isError || !data ? (
          <p>Something went wrong, please try again later</p>
        ) : (
          <>
            <h2 className="detail__name">{data.name}</h2>
            <img className="detail__img" src={data.image} alt={data.name} />
            <ul className="detail__info">
              <li className="detail__item">{data.gender}</li>
              <li className="detail__item">{data.species}</li>
              <li className="detail__item">{data.status}</li>
              <li className="detail__item">{data.location.name}</li>
            </ul>
          </>
        )}
      </div>
    </div>
  );
};
