import { useAppDispatch, useAppSelector } from '@/hooks'
import { GetMenuWebResponse } from '@/interfaces/response'
import { getMenus, menusSelector, deleteMenu, updateMenu } from '@/store/slices/menu'
import { css } from 'styled-components'
import { PencilFill, TrashFill, CheckCircleFill, X } from 'react-bootstrap-icons'
import { numberFormatter } from '@/util/formatter'
import { numberInput } from '@/util/common'
import React, { useEffect, useState } from 'react'
import Button from '@/components/Button'

const menuElementStyle = css`
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
`

interface Prop {
  placeId: string
}

interface FormType {
  menuId: string,
  name: string,
  price: string
}

const MenuList: React.FC<Prop> = props => {
  const dispatch = useAppDispatch()
  const menus = useAppSelector(menusSelector)

  const [isEditingMode, setIsEditingMode] = useState<{ [key: string]: boolean }>({})
  const [form, setForm] = useState<FormType>({
    menuId: '',
    name: '',
    price: ''
  })

  const firstHalfMenus = (): GetMenuWebResponse[] => menus.slice(0, menus.length / 2)
  const secondHalfMenus = (): GetMenuWebResponse[] => menus.slice(menus.length / 2, menus.length)

  const fetchMenus = async (): Promise<void> => {
    if (props.placeId === undefined) return
    await dispatch(getMenus(props.placeId))
  }

  const doDeleteMenu = async (menuId: string) => {
    await dispatch(deleteMenu(menuId))
    fetchMenus()
  }

  const setEditingMode = (menu: GetMenuWebResponse) => {
    setIsEditingMode({
      ...getDefaultIsEditingMenus(),
      [menu.id]: true
    })
    setForm({
      menuId: menu.id,
      name: menu.name,
      price: menu.price.toString()
    })
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  const getDefaultIsEditingMenus = (): { [key: string]: boolean } => {
    return menus.reduce((accumulator, current) => {
      return {
        ...accumulator,
        [current.id]: false
      }
    }, {})
  }

  const doUpdateMenu = async (): Promise<void> => {
    await dispatch(updateMenu({
      name: form.name,
      price: +form.price,
      menuId: form.menuId
    }))

    setForm({
      name: '',
      price: '',
      menuId: ''
    })

    fetchMenus()
  }

  useEffect(() => {
    setIsEditingMode(getDefaultIsEditingMenus())
  }, [menus]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    fetchMenus()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const toMenuElement = (menu: GetMenuWebResponse) => (
    <div key={menu.id} css={menuElementStyle}>
      {
        isEditingMode[menu.id] ? (
          <div className="d-flex">
            <input
              name="name"
              className="px-3 py-2 me-3"
              placeholder="Menu name"
              value={form.name}
              onChange={handleInputChange}
            />
            <input
              name="price"
              className="px-3 py-2 me-3"
              placeholder="Price"
              value={form.price}
              onKeyDown={numberInput}
              onChange={handleInputChange}
            />
            <Button
              className="px-3"
              onClick={doUpdateMenu}
            >
              <CheckCircleFill size={22} />
            </Button>
            <Button
              variant="primary-outline-d"
              className="px-3 ms-2"
              onClick={() => setIsEditingMode(getDefaultIsEditingMenus())}
            >
              <X size={26} />
            </Button>
          </div>
        ) : (
          <>
            <div>
              {menu.name}
            </div>
            <div className="d-flex">
              <div>
                {numberFormatter(menu.price, 'Rp.')}
              </div>
              <div>
                <PencilFill
                  css={`margin: 0 8px; cursor: pointer;`}
                  onClick={() => setEditingMode(menu)}
                />
              </div>
              <div>
                <TrashFill
                  css={`cursor: pointer;`}
                  onClick={() => doDeleteMenu(menu.id)}
                />
              </div>
            </div>
          </>
        )
      }

    </div>
  )

  return (
    <div css={`
      display: flex;
      justify-content: space-between;
    `}>
      <div css={`width: 45%;`}>
        {firstHalfMenus().map(toMenuElement)}
      </div>
      <div css={`width: 45%;`}>
        {secondHalfMenus().map(toMenuElement)}
      </div>
    </div>
  )
}

export default MenuList