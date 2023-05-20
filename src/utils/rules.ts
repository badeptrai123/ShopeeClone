import type { RegisterOptions, UseFormGetValues } from 'react-hook-form'
import * as yup from 'yup'
type Rules = {
  [key in 'email' | 'password' | 'confirm_password']?: RegisterOptions
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getRules = (getValues?: UseFormGetValues<any>): Rules => ({
  email: {
    required: {
      value: true,
      message: 'Email không được để trống'
    },
    pattern: {
      value:
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      message: 'Email không đúng định dạng'
    },
    maxLength: {
      value: 160,
      message: 'Độ dài email từ 5-160 kí tự'
    },
    minLength: {
      value: 5,
      message: 'Độ dài email từ 5-160 kí tự'
    }
  },
  password: {
    required: {
      value: true,
      message: 'Password không được để trống'
    },
    maxLength: {
      value: 160,
      message: 'Độ dài email từ 6-160 kí tự'
    },
    minLength: {
      value: 6,
      message: 'Độ dài email từ 6-160 kí tự'
    }
  },
  confirm_password: {
    required: {
      value: true,
      message: 'Confirm Password không được để trống'
    },
    maxLength: {
      value: 160,
      message: 'Độ dài Confirm Password từ 6-160 kí tự'
    },
    minLength: {
      value: 6,
      message: 'Độ dài Confirm Password từ 6-160 kí tự'
    },
    validate:
      typeof getValues === 'function'
        ? (value) => value === getValues('password') || 'Nhập lại mất khẩu không khớp'
        : undefined
  }
})
function testPriceMinMax(this: yup.TestContext<yup.AnyObject>) {
  const { price_max, price_min } = this.parent as { price_min: string; price_max: string }
  if (price_min !== '' && price_max !== '') {
    return Number(price_max) >= Number(price_min)
  }
  return price_min !== '' || price_max != ''
}

const handleConfirmPassword = (refString: string) => {
  return yup
    .string()
    .required('Confirm Password không được để trống')
    .min(6, 'Độ dài Confirm Password từ 6-160 kí tự')
    .max(160, 'Độ dài Confirm Password từ 6-160 kí tự')
    .oneOf([yup.ref(refString)], 'Nhập lại mật khẩu không khớp')
}

export const schema = yup.object({
  email: yup
    .string()
    .required('Email không được để trống')
    .min(5, 'Độ dài email từ 5-160 kí tự')
    .max(160, 'Độ dài email từ 5-160 kí tự')
    // .email('Email không đúng định dạng')
    .matches(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      'Email không đúng định dạng'
    ),
  password: yup
    .string()
    .required('Password không được để trống')
    .min(6, 'Độ dài Password từ 6-160 kí tự')
    .max(160, 'Độ dài Password từ 6-160 kí tự'),
  confirm_password: handleConfirmPassword('password'),
  price_min: yup.string().test({
    name: 'price-not-allowed',
    message: 'Giá không phù hợp',
    test: testPriceMinMax
  }),
  price_max: yup.string().test({
    name: 'price-not-allowed',
    message: 'Giá không phù hợp',
    test: testPriceMinMax
  }),
  name: yup.string().trim().required('Tên không được để trống')
})
export const userSchema = yup.object({
  name: yup.string().max(160, 'Độ dài tối đa là 160 kí tự'),
  phone: yup.string().max(20, 'Độ dài tối đa là 20 kí tự'),
  address: yup.string().max(160, 'Độ dài tối đa là 160 kí tự'),
  date_of_birth: yup.date().max(new Date(), 'Hãy chọn ngày trong quá khứ'),
  avatar: yup.string().max(1000, 'Độ dài tối đa là 1000 kí tự'),
  password: schema.fields['password'] as yup.StringSchema<string | undefined, yup.AnyObject, undefined, ''>,
  new_password: schema.fields['password'] as yup.StringSchema<string | undefined, yup.AnyObject, undefined, ''>,
  confirm_password: handleConfirmPassword('new_password')
})
export type UserSchema = yup.InferType<typeof userSchema>
export type Schema = yup.InferType<typeof schema>
