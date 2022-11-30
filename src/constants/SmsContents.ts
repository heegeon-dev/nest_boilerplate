const MASSAGE_TYPE = {
  VERIFY_SMS: "VERIFY_SMS",
} as const;
type MASSAGE_TYPE = typeof MASSAGE_TYPE[keyof typeof MASSAGE_TYPE];

const MASSAGES ={
  VERIFY_SMS:(smsToken: string) => {
      return `[씨즌]인증번호는 [${smsToken}]입니다.`
  }
}

export const getContents = (massageType: MASSAGE_TYPE) => {
  return MASSAGES[massageType];
};
