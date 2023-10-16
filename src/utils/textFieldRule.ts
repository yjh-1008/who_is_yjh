const validLen = (value: string): string | boolean => {
  return !!value || "텍스트를 입력해주세요";
};

const validSign = (value: string): string | boolean => {
  // eslint-disable-next-line no-useless-escape
  const regExp = /[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/g;
  return !regExp.test(value) || "특수문자를 사용할 수 없습니다";
};

export { validLen, validSign };
