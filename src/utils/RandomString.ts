const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz';
const numChars = '0123456789';
export function randomString(length: number) {
  let randomstring = '';
  for (let i = 0; i < length; i++) {
    let rnum = Math.floor(Math.random() * chars.length);
    randomstring += chars.substring(rnum, rnum + 1);
  }
  return randomstring;
}

export function randomNumberString(length: number){
  let randomstring = '';
  for (let i = 0; i < length; i++) {
    let rnum = Math.floor(Math.random() * numChars.length);
    randomstring += numChars.substring(rnum, rnum + 1);
  }
  return randomstring;
}