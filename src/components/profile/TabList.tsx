import styled from 'styled-components';

import Tab from '../ui/Tab';

import { useBookmarkStore } from '../../stores/useSettingBookmarkStore';

const TabListWrapper = styled.div`
  width: 100%;
  border-bottom: 1px solid ${(props) => props.theme.colors.third};
  margin-bottom: 2rem;
`;

export default function TabList() {
  const bookmarkData = useBookmarkStore((state) => state.bookmarkData);

  return (
    <TabListWrapper>
      <Tab text={'collection'} count={bookmarkData.length}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="w-5 h-5"
        >
          <path
            fillRule="evenodd"
            d="M10 2c-1.716 0-3.408.106-5.07.31C3.806 2.45 3 3.414 3 4.517V17.25a.75.75 0 0 0 1.075.676L10 15.082l5.925 2.844A.75.75 0 0 0 17 17.25V4.517c0-1.103-.806-2.068-1.93-2.207A41.403 41.403 0 0 0 10 2Z"
            clipRule="evenodd"
          />
        </svg>
      </Tab>
    </TabListWrapper>
  );
}
