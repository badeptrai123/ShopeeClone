import { createSearchParams, useNavigate } from 'react-router-dom'
import omit from 'lodash/omit'
import { useForm } from 'react-hook-form'
import { Schema, schema } from 'src/utils/rules'
import useQueryConfig from 'src/hooks/useQueryConfig'
import { yupResolver } from '@hookform/resolvers/yup'

type FormData = Pick<Schema, 'name'>
const nameSchema = schema.pick(['name'])

export default function useSearchProducts() {
  const queryConfig = useQueryConfig()
  const navigate = useNavigate()

  const { register, handleSubmit } = useForm<FormData>({
    defaultValues: {
      name: ''
    },
    resolver: yupResolver(nameSchema)
  })

  const onSubmit = handleSubmit((data) => {
    const config = queryConfig.order
      ? omit(
          {
            ...queryConfig,
            name: data.name
          },
          ['order', 'sort_by']
        )
      : omit({
          ...queryConfig,
          name: data.name
        })
    navigate({
      pathname: '/',
      search: createSearchParams(config).toString()
    })
  })
  return { register, onSubmit }
}
