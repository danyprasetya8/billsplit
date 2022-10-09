import { Container, Line } from '@/util/style'
import { SelectedMenu } from '@/interfaces'
import Header from '@/components/Header'
import Button from '@/components/Button'
import AddMenuModal from '@/components/AddMenuModal'
import React, { useState } from 'react'
import constant from '@/config/constant'

const { page } = constant

const AddPerson: React.FC = () => {
  const [visibleAddMenuModal, setVisibleAddMenuModal] = useState<boolean>()

  const addToDraftMenu = (selectedMenus: SelectedMenu[]) => {
    console.log(selectedMenus);
    setVisibleAddMenuModal(false)
  }

  return (
    <>
      <Container>
        <Header
          title="ADD PERSON"
          backUrl={page.bill}
        />

        <div className="d-flex justify-content-between">
          <input
            type="text"
            placeholder="Name"
            css={`padding: 6px 10px; width: 30%;`}
          />

          <div css={`width: 15%;`}>
            <Button
              className="w-100"
              onClick={() => setVisibleAddMenuModal(true)}
            >
              Add Menu
            </Button>
          </div>
        </div>

        <Line css={`margin: 24px 0;`} />
      </Container>

      {
        visibleAddMenuModal && (
          <AddMenuModal onSubmitMenu={addToDraftMenu} />
        )
      }
    </>
  )
}

export default AddPerson
