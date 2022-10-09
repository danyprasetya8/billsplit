import { CaretDownFill } from 'react-bootstrap-icons'
import { css } from 'styled-components'
import { DropdownItem } from '@/interfaces'
import React, { useState } from 'react'
import styled from 'styled-components'

const Mask = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
`

const relativeStyle = css`position: relative;`

interface Props {
  placeholder: string,
  items: DropdownItem[],
  selectItem: (item: DropdownItem) => void
}

const Dropdown: React.FC<Props> = props => {

  const [visible, setVisible] = useState<boolean>(false)
  const [selectedItemId, setSelectedItemId] = useState<string>('')

  const selectItem = (item: DropdownItem) => {
    props.selectItem(item)
    setVisible(false)
    setSelectedItemId(item.id)
  }

  const selectedItem = props.items.find(item => item.id === selectedItemId)

  return (
    <div css={relativeStyle}>
      <div
        className="p-3 shadow-sm rounded-2 d-flex justify-content-between align-items-center"
        css={`cursor: pointer;`}
        onClick={() => setVisible(!visible)}
      >
        <div>
          {selectedItem?.id ? selectedItem.value : props.placeholder}
        </div>

        <CaretDownFill />
      </div>

      {
        visible && (
          <>
            <Mask onClick={() => setVisible(false)} />
            <div className="shadow-sm rounded-2 mt-1" css={`
              position: absolute;
              left: 0;
              top: 100%;
              width: 100%;
              background: white;
              max-height: 300px;
              overflow-y: scroll;
              z-index: 2;
            `}>
              {
                props.items.map(item => (
                  <div
                    key={item.id}
                    onClick={() => selectItem(item)}
                    css={`
                      padding: 10px 18px;
                      cursor: pointer;
                    `}
                  >
                    {item.value}
                  </div>
                ))
              }
            </div>
          </>
        )
      }
    </div>
  )
}

export default Dropdown