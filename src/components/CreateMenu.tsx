import * as Yup from 'yup'
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from 'formik'
import { numberInput } from '@/util/common'
import { useAppDispatch } from '@/hooks'
import { getMenus, saveMenu } from '@/store/slices/menu'
import React from 'react'
import Button from '@/components/Button'

interface FormType {
  name: string,
  price: string
}

interface Props {
  placeId: string
}

const validationSchema = Yup.object()
  .shape({
    name: Yup.string()
      .required('Name is required'),
    price: Yup.string()
      .required('Price is required')
  })

const CreateMenu: React.FC<Props> = props => {
  const dispatch = useAppDispatch()

  const initialValues: FormType = {
    name: '',
    price: ''
  }

  const addMenu = async (form: FormType, { setValues, setTouched }: FormikHelpers<FormType>): Promise<void> => {
    const requestBody = {
      name: form.name,
      price: +form.price,
      placeId: props.placeId
    }
    await dispatch(saveMenu(requestBody))
    await dispatch(getMenus(props.placeId))

    setValues({
      name: '',
      price: ''
    })
    setTouched({
      name: false,
      price: false
    })
  }

  const handleFormKeyDown = (e: React.KeyboardEvent<HTMLFormElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
    }
  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={addMenu}
    >
      <Form onKeyDown={handleFormKeyDown}>
        <div className="d-flex">
          <div>
            <Field
              name="name"
              className="px-3 py-2 me-3"
              placeholder="Menu name"
            />
            <ErrorMessage
              name="name"
              component="div"
              className="mt-2 text-danger"
            />
          </div>

          <div>
            <Field
              name="price"
              className="px-3 py-2"
              placeholder="Price"
              onKeyDown={numberInput}
            />
            <ErrorMessage
              name="price"
              component="div"
              className="mt-2 text-danger"
            />
          </div>

          <div>
            <Button className="ms-3 px-4" type="submit">
              Add
            </Button>
          </div>
        </div>
      </Form>
    </Formik>
  )
}

export default CreateMenu