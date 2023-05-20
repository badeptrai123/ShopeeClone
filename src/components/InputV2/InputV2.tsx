/* eslint-disable @typescript-eslint/no-explicit-any */
import { InputHTMLAttributes, useState } from 'react'
import { FieldPath, FieldValues, useController, UseControllerProps } from 'react-hook-form'

export type InputNumberProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = {
  classNameInput?: string
  classNameError?: string
} & InputHTMLAttributes<HTMLInputElement> &
  UseControllerProps<TFieldValues, TName>
function InputV2<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>(props: InputNumberProps<TFieldValues, TName>) {
  const {
    onChange,
    type,
    className,
    classNameInput = 'w-full rounded-sm border border-gray-300 p-3 outline-none focus:border-gray-500 focus:shadow-sm',
    classNameError = 'mt-1 min-h-[1.25rem] text-sm text-red-600',
    value = '',
    ...rest
  } = props
  const { field, fieldState } = useController(props)
  const [localValue, setLocalValue] = useState<string>(field.value)
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const formValue = event.target.value
    const numberCondition = type === 'number' && (/^\d+$/.test(formValue) || formValue === '')
    if (numberCondition || type !== 'number') {
      setLocalValue(formValue)
      field.onChange(event)
      onChange && onChange(event)
    }
  }
  return (
    <div className={className}>
      <input className={classNameInput} {...rest} {...field} onChange={handleChange} value={value || localValue} />
      <div className={classNameError}>{fieldState.error?.message}</div>
    </div>
  )
}

export default InputV2

// type Gen<TFunc> = {
//     getName: TFunc
//   }

// eslint-disable-next-line @typescript-eslint/no-unused-vars
// function Hexa<TFunc extends () => string, TLastName extends ReturnType<TFunc>>(prop: {
//   person: Gen<TFunc>
//   lastName: TLastName
// }) {
//   return null
// }
// const handleName: () => 'Duoc' = () => 'Duoc'
// function App() {
//   return <Hexa person={{ getName: handleName }} lastName='Duoc' />
// }
