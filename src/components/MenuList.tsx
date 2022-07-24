import { useAppDispatch, useAppSelector } from '@/hooks'
import { GetMenuWebResponse } from '@/interfaces/response'
import { getMenus, menusSelector, deleteMenu } from '@/store/slices/menu'
import { css } from 'styled-components'
import { PencilFill, TrashFill } from 'react-bootstrap-icons'
import { numberFormatter } from '@/util/formatter'
import React, { useEffect } from 'react'

const menuElementStyle = css`
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
`

interface Prop {
  placeId: string
}

const MenuList: React.FC<Prop> = props => {
  const dispatch = useAppDispatch()
  const menus = useAppSelector(menusSelector)

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

  useEffect(() => {
    fetchMenus()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const toMenuElement = (menu: GetMenuWebResponse) => (
    <div key={menu.id} css={menuElementStyle}>
      <div>
        {menu.name}
      </div>

      <div className="d-flex">
        <div>
          {numberFormatter(menu.price, 'Rp.')}
        </div>
        <div>
          <PencilFill css={`margin: 0 8px; cursor: pointer;`} />
        </div>
        <div>
          <TrashFill
            css={`cursor: pointer;`}
            onClick={() => doDeleteMenu(menu.id)}
          />
        </div>
      </div>
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