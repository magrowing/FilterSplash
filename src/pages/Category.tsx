import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { doc, updateDoc } from 'firebase/firestore';
import { dbService } from '../firebase/firebase';

import Button from '../components/ui/Button';
import styled from 'styled-components';

const autoKeyword = [
  '배경화면',
  '자연',
  '3D렌더링',
  '식음료',
  '비즈니스',
  '건강',
  '스포츠',
  '필름',
  '여행',
  '흑백',
];

export default function Category() {
  const [value, setValue] = useState('');
  const [keywords, setKeywords] = useState<string[]>([]);
  const [isLoading, setLoading] = useState(false);
  const param = useParams();
  const navigation = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setValue(value);
  };

  const handleAddClick = () => {
    if (keywords.length < 10) {
      setKeywords([value, ...keywords]);
      setValue('');
    } else {
      alert('키워드는 최대 10개까지만 추가됩니다.');
    }
  };

  const onDeleteClick = (value: string) => {
    const filterKeywords = keywords.filter((keyword) => keyword !== value);
    setKeywords([...filterKeywords]);
  };

  const onCreateKeywords = async (type: string) => {
    if (isLoading || !param.id) return;
    try {
      const docRef = doc(dbService, 'users', param.id);
      await updateDoc(docRef, {
        category: type !== 'auto' ? [...keywords] : autoKeyword,
      });
      navigation('/', { replace: true });
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <article>
      <div>
        <input
          type="text"
          placeholder="키워드를 입력해주세요."
          value={value}
          onChange={handleChange}
        />
        <Button type="button" text="키워드 추가" onClick={handleAddClick} />
      </div>
      {keywords.length ? (
        <ul>
          {keywords.map((keyword, idx) => {
            const key = `${keyword}-${idx}`;
            return (
              <li key={key}>
                {keyword}
                <button type="button" onClick={() => onDeleteClick(keyword)}>
                  삭제
                </button>
              </li>
            );
          })}
        </ul>
      ) : (
        <p>키워드를 입력해주세요.</p>
      )}
      <div>
        <button type="button" onClick={() => onCreateKeywords('new')}>
          카테고리 생성
        </button>
        <button type="button" onClick={() => onCreateKeywords('auto')}>
          카테고리 자동 생성
        </button>
      </div>
    </article>
  );
}
