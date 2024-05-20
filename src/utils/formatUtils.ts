export function splitString(text: string) {
  return text.substring(0, text.indexOf('T'));
}

export function numberFormat(value: number) {
  return new Intl.NumberFormat().format(value);
}