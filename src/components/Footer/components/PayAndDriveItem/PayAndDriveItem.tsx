import { Link } from 'react-router-dom'
interface PayAndDriveItemProps {
  url: string
}
export default function PayAndDriveItem({ url }: PayAndDriveItemProps) {
  return (
    <li className='col-span-1 mt-[6px]'>
      <Link to='/'>
        <img src={url} alt='' className='inline-block h-full w-full bg-white p-[0.25rem] shadow-md' />
      </Link>
    </li>
  )
}
