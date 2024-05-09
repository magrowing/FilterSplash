export function booleanChk(value : string){
  if(value === '') {
    return false; 
  }
  return true;
} 

// 이메일 : 알파벳,숫자,특수기호@문자,숫자,특수기호.2-4글자
export function emailValidationCheck(value : string){ 
	const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i;

  if(regex.test(value)){
    return ''
  }
  return '유효하지않은 이메일입니다.'
}

// 아이디 : 글자 수 제한 (4글자 이상, 12글자 이하)
export function nameValidationCheck(value: string) {
  return value.length >= 4 && value.length <= 12 ? '' : '4글자 이상, 12글자 이하로 입력해주세요'
}

// 비밀번호 : 8글자 이상, 영문, 숫자, 특수문자 사용
export function passwordValidationCheck (value :string) {
  const regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,12}$/; 
  if(regex.test(value)){
    return ''
  }
  return '8글자 이상 16글자 이하로, 영문, 숫자, 특수문자(@$!%*#?&) 1개씩 사용해서 입력해주세요.'
}

// 비밀번호 확인 : 비밀번호와 비밀번호 확인 일치
export function passwordValidationMatchCheck (password1 :string, password2 :string) {
  if(password1 === password2){
    return ''
  }
  return '비밀번호가 일치하지 않습니다.';
}