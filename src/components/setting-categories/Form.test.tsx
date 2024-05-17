import { render } from '../../test-helper';

import { fireEvent, screen } from '@testing-library/react';

import Form from './Form';

const context = describe;

describe('Form', () => {

  it('Form 요소 렌더링 확인', () => {
    render(<Form />);
    screen.getByPlaceholderText('키워드를 입력해주세요.');
    screen.getByText('키워드 추가');
  });

  it('키워드 입력시 change event 호출 확인', () => {
    render(<Form />);

    fireEvent.change(screen.getByPlaceholderText('키워드를 입력해주세요.'), {
      target: { value: '키워드' },
    });
    const input = screen.getByDisplayValue('키워드');
    expect(input.value).toEqual('키워드');
  });

  it('키워드 입력시 Enter 버튼 event 호출 확인', () => {
    render(<Form />);

    fireEvent.change(screen.getByPlaceholderText('키워드를 입력해주세요.'), {
      target: { value: '과일' },
    });
    fireEvent.keyDown(screen.getByPlaceholderText('키워드를 입력해주세요.'), {
      key: 'Enter',
      code: 'Enter',
      charCode: 13,
    });

    const input = screen.getByDisplayValue('과일');
    expect(input.value).toEqual('과일');
  });

  context('키워드 버튼 클릭시 호출 결과 확인', () => {
    it('입력된 키워드가 없다면 input focus 검증', () => {
      render(<Form />);
      const button = screen.getByText('키워드 추가');
      fireEvent.click(button);
      expect(
        screen.getByPlaceholderText('키워드를 입력해주세요.')
      ).toHaveFocus();
    });
  });
});
