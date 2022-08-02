import * as Yup from 'yup'
import { numberInput } from '@/util/common'
import { useNavigate, useParams } from 'react-router-dom'
import { TaxPriority } from '@/enums'
import { getPlaceDetail, savePlace, updatePlace } from '@/store/slices/place'
import { useAppDispatch } from '@/hooks'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button'
import Header from '@/components/Header'
import styled from 'styled-components'
import constant from '@/config/constant'
import { GetPlaceDetailResponse } from '@/interfaces/response'

const { page } = constant

const Container = styled.div`
  width: 100%;
  padding: 0 50px;
  margin: 25px 0;
  display: flex;
  flex-direction: column;
`

interface FormType {
  name: string,
  tax: string,
  service: string,
  taxPriority: TaxPriority
}

const createPlaceSchema = Yup.object()
  .shape({
    name: Yup.string()
      .required('Place name required'),
    tax: Yup.number()
      .required('Tax required'),
    service: Yup.number()
      .required('Service required'),
    taxPriority: Yup.mixed<TaxPriority>()
      .oneOf([TaxPriority.SERVICE, TaxPriority.TAX])
  })

const CreatePlace: React.FC = () => {
  const { placeId } = useParams<{ placeId: string | undefined }>()
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const [placeDetail, setPlaceDetail] = useState<GetPlaceDetailResponse>()
  const [formInitialValues, setFormInitialValues] = useState<FormType>({
    name: '',
    tax: '',
    service: '',
    taxPriority: TaxPriority.TAX
  })

  useEffect(() => {
    if (placeDetail?.id) {
      setFormInitialValues({
        name: placeDetail.name,
        tax: placeDetail.percentage.tax.toString(),
        service: placeDetail.percentage.service.toString(),
        taxPriority: placeDetail.taxPriority
      })
    }
  }, [placeDetail])

  useEffect(() => {
    if (placeId === undefined) return

    const fetchPlaceDetail = async (): Promise<void> => {
      const placeDetail = await dispatch(getPlaceDetail(placeId)).unwrap()
      setPlaceDetail(placeDetail.data)
    }

    fetchPlaceDetail()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const saveOrUpdatePlace = async (form: FormType): Promise<void> => {
    const body = {
      name: form.name,
      taxPercentage: +form.tax,
      servicePercentage: +form.service,
      taxPriority: form.taxPriority.toString()
    }

    if (!placeId) {
      await dispatch(savePlace(body))
    } else {
      const updateBody = {
        ...body,
        placeId
      }
      await dispatch(updatePlace(updateBody))
    }
    navigate(page.place)
  }

  const toPlaceList = (): void => {
    navigate(page.place)
  }

  const getPageTitle = placeDetail?.id ? 'UPDATE PLACES' : 'ADD PLACES'

  return (
    <Container>
      <Header title={getPageTitle} />

      <Formik
        enableReinitialize
        initialValues={formInitialValues}
        validationSchema={createPlaceSchema}
        onSubmit={saveOrUpdatePlace}
      >
        <Form>
          <div className="d-flex flex-column">
            <div className="mb-1">
              Place name
            </div>
            <div className="mb-4">
              <Field
                name="name"
                className="px-3 py-2 w-50"
                placeholder="Place name"
              />
              <ErrorMessage
                name="name"
                component="div"
                className="mt-2 text-danger"
              />
            </div>

            <div className="d-flex mb-4">
              <div className="d-flex flex-column w-full">
                <div className="mb-1">
                  Tax percentage
                </div>
                <Field
                  name="tax"
                  className="px-3 py-2 me-4"
                  placeholder="Input tax"
                  onKeyDown={numberInput}
                />
                <ErrorMessage
                  name="tax"
                  component="div"
                  className="mt-2 text-danger"
                />
              </div>

              <div className="d-flex flex-column w-full">
                <div className="mb-1">
                  Service charge percentage
                </div>
                <Field
                  name="service"
                  className="px-3 py-2 me-4"
                  placeholder="Input service tax"
                  onKeyDown={numberInput}
                />
                <ErrorMessage
                  name="service"
                  component="div"
                  className="mt-2 text-danger"
                />
              </div>
            </div>

            <div className="mb-1">
              Tax Priority
            </div>
            <div role="group" className="d-flex flex-column">
              <label className="d-flex">
                <Field
                  name="taxPriority"
                  type="radio"
                  value={TaxPriority.TAX}
                />
                <div className="ms-1">
                  Tax first
                </div>
              </label>
              <label className="d-flex">
                <Field
                  name="taxPriority"
                  type="radio"
                  value={TaxPriority.SERVICE}
                />
                <div className="ms-1">
                  Service charge first
                </div>
              </label>
            </div>

            <div className="align-self-end">
              <Button
                variant="outline-primary"
                className="me-2"
                onClick={toPlaceList}
              >
                Back
              </Button>
              <Button type="submit">
                Submit
              </Button>
            </div>
          </div>
        </Form>
      </Formik>
    </Container>
  )
}

export default CreatePlace