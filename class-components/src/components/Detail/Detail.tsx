import { useEffect, useState, type FC } from 'react';
import { API_URL } from '../Home/constants';
import { Loader } from '../Loader';
import type { CharacterDetail } from '../../types';
import './style.css';

interface DetailProps {
  id: number;
  onClose: () => void;
}

export const Detail: FC<DetailProps> = ({ id, onClose }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<CharacterDetail | null>(null);

  useEffect(() => {
    setLoading(true);
    fetch(`${API_URL}/${id}`)
      .then((resp) => {
        if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
        return resp.json();
      })
      .then((data) => setData(data))
      .catch(() => setData(null))
      .finally(() => setLoading(false));
  }, [id]);

  return (
    <div className="detail">
      <div className="detail__content">
        <button className="detail__close" onClick={onClose}></button>
        {loading ? (
          <Loader />
        ) : data ? (
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
        ) : (
          <p>Something went wrong, please try again later</p>
        )}
      </div>
    </div>
  );
};
