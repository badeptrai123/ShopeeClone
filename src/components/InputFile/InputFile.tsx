import { Fragment, useRef } from 'react'
import Button from '../Button'
import { toast } from 'react-toastify'
import config from 'src/constants/config'

interface Prop {
  onChange?: (file?: File) => void
}
export default function InputFile({ onChange }: Prop) {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const handleChooseImage = () => {
    fileInputRef.current?.click()
  }
  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileFromLocal = e.target.files?.[0]
    console.log(fileFromLocal)
    if ((fileFromLocal && fileFromLocal?.size > config.maxSizeUploadFile) || !fileFromLocal?.type.includes('image')) {
      toast('Dụng lượng file tối đa 1 MB. Định dạng:.JPEG, .PNG')
    } else {
      onChange && onChange(fileFromLocal)
    }
  }
  return (
    <Fragment>
      <input
        className='hidden'
        type='file'
        accept='.jpg,.jpeg,.png'
        ref={fileInputRef}
        onChange={onFileChange}
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onClick={(e) => ((e.target as any).value = null)}
      />
      <Button
        type='button'
        className='flex h-10 items-center justify-end rounded-sm border bg-white px-6 text-sm capitalize text-gray-600 shadow-sm transition-colors hover:bg-gray-200/20'
        onClick={handleChooseImage}
      >
        Chọn ảnh
      </Button>
    </Fragment>
  )
}
