import { Link } from 'react-router-dom'

interface CustomerCareProps {
  content: string
}
export default function CustomerCare({ content }: CustomerCareProps) {
  return (
    <li className='mt-[6px]'>
      <Link to='/'>
        <span className='text-[0.75rem] text-[rgba(0,0,0,.65)] hover:text-red-500 hover:transition-colors'>
          {content}
        </span>
      </Link>
    </li>
  )
}
