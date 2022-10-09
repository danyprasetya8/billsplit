import React, { useEffect, useState } from 'react'
import { GetMenuWebResponse } from '@/interfaces/response'
import { DropdownItem, SelectedMenu } from '@/interfaces'
import { useAppDispatch } from '@/hooks'
import { getMenus } from '@/store/slices/menu'
import { useParams } from 'react-router-dom'
import { numberInput } from '@/util/common'
import { Line } from '@/util/style'
import { numberFormatter } from '@/util/formatter'
import { TrashFill } from 'react-bootstrap-icons'
import Button from '@/components/Button'
import Dropdown from '@/components/Dropdown'
import styled from 'styled-components'

const Mask = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, .5);
  width: 100vw;
  height: 100vh;
`

interface Prop {
  onSubmitMenu: (selectedMenus: SelectedMenu[]) => void
}

const AddMenuModal: React.FC<Prop> = props => {
  const dispatch = useAppDispatch()
  const { placeId } = useParams<{ placeId: string }>()

  const [menus, setMenus] = useState<GetMenuWebResponse[]>([])
  const [selectedMenu, setSelectedMenu] = useState<DropdownItem>()
  const [selectedMenus, setSelectedMenus] = useState<SelectedMenu[]>([])
  const [quantity, setQuantity] = useState<string>('1')

  const menuDropdownItems = menus.map(menu => ({
    id: menu.id,
    value: menu.name
  }))

  const addTempMenu = (): void => {
    const menu = menus.find(menu => menu.id === selectedMenu?.id)
    if (!menu?.id) return

    const isExistingMenu = selectedMenus.some(m => m.id === menu.id)
    if (isExistingMenu) {
      const updated = selectedMenus.map(m => {
        if (m.id === menu.id) {
          m.quantity += +quantity
        }
        return m
      })
      setSelectedMenus(() => updated)
      return
    }

    setSelectedMenus([...selectedMenus, {
      id: menu.id,
      price: menu.price,
      name: menu.name,
      quantity: +quantity
    }])
  }

  const removeSelectedMenu = (removedSelectedMenu: SelectedMenu) => {
    const updated = selectedMenus.filter(m => m.id !== removedSelectedMenu.id)
    setSelectedMenus(() => updated)
  }

  const fetchMenus = async () => {
    if (!placeId) return
    const menus = await dispatch(getMenus(placeId)).unwrap()
    setMenus(() => menus.data)
  }

  useEffect(() => {
    fetchMenus()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <Mask />

      <div className="shadow rounded-3" css={`
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: #FFF;
        padding: 24px;
        width: 30%;
      `}>
        <div className="mb-3" css={`
          color: #00ADB5;
          font-weight: 600;
          font-size: 24px;
        `}>
          Add Menu
        </div>

        <Dropdown
          placeholder="Select menu"
          items={menuDropdownItems}
          selectItem={setSelectedMenu}
        />

        <div className="my-3 shadow-sm rounded-3" css={`padding: 10px 18px;`}>
          <input
            type="text"
            onKeyDown={numberInput}
            onChange={e => setQuantity(e.target.value)}
            value={quantity}
            className="w-100"
            css={`
              outline: none;
              border: none;
            `}
          />
        </div>

        <Button
          className="w-100"
          disabled={!selectedMenu?.id}
          onClick={addTempMenu}
        >
          Add
        </Button>

        <Line className="my-4" />

        {
          selectedMenus.map(selectedMenu => (
            <div key={selectedMenu.id} className="d-flex my-4">
              <div css={`width: 60%;`}>
                {selectedMenu.name}
              </div>
              <div css={`width: 40%;`}>
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    {selectedMenu.quantity}
                  </div>
                  <div>
                    {numberFormatter(selectedMenu.price, 'Rp.')}
                  </div>
                  <TrashFill
                    css={`cursor: pointer;`}
                    onClick={() => removeSelectedMenu(selectedMenu)}
                  />
                </div>
              </div>
            </div>
          ))
        }

        <Button
          className="w-100"
          disabled={!selectedMenus.length}
          onClick={() => props.onSubmitMenu(selectedMenus)}
        >
          Submit
        </Button>
      </div>
    </>
  )
}

export default AddMenuModal