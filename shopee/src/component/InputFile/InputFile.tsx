import { useRef } from 'react'
import { toast } from 'react-toastify'

interface Props {
  onChange?: (file?: File) => void
}

export default function InputFile({ onChange }: Props) {
  //const [file, setFile] = useState<File>()
  const maxSizeUpLoadAvt = 1048576 //bytes
  const fileInputRef = useRef<HTMLInputElement>(null)

  const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileFromLocal = event.target.files?.[0]
    if (fileFromLocal && (fileFromLocal?.size >= maxSizeUpLoadAvt || fileFromLocal?.type.includes('image'))) {
      toast.error('Dung lượng tối đa 1MB, định dạng JEPG, PNG', {
        position: 'top-center'
      })
    } else {
      onChange && onChange(fileFromLocal)
    }
  }

  const handleUpLoad = () => {
    fileInputRef.current?.click()
  }

  return (
    <div>
      <input className='hidden' type='file' accept='.jpg,.jpeg,.png' ref={fileInputRef} onChange={onFileChange} />

      <button
        type='button'
        onClick={handleUpLoad}
        className='flex h-10 items-center border border-gray-100 justify-end bg-white px-6 text-sm text-gray-600 shadow-sm'
      >
        Chọn ảnh
      </button>
    </div>
  )
}
