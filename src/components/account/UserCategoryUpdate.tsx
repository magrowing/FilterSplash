import { useState } from 'react';

import styled from 'styled-components';

import SettingCategories from '../setting-categories';
import CategoryTagList from '../common/CategoryTagList';

import Button from '../ui/Button';

import { useUserInfoStore } from '../../stores/useUserInfoStore';
import { useSettingCategoriesStore } from '../../stores/useSettingCategoriesStore';

const Wrapper = styled.div`
  position: relative;
`;

export default function UserCategoryUpdate() {
  const [isOpen, setOpen] = useState(false);
  const category = useUserInfoStore((state) => state.category);
  const { setKeywords } = useSettingCategoriesStore((state) => state.actions);

  const handleClick = () => {
    setOpen(true);
    setKeywords(category);
  };

  const onClosePopup = () => {
    setOpen(false);
  };

  return (
    <Wrapper>
      <CategoryTagList />
      {isOpen && <SettingCategories popup={true} onClosePopup={onClosePopup} />}
      <Button type="button" onClick={handleClick} text={'카테고리 업데이트'} />
    </Wrapper>
  );
}
