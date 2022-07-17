import React from 'react'
import { Outlet, Link, useLocation } from 'react-router-dom'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import styled from 'styled-components'
import constant from '@/config/constant'

const { page } = constant

const style = {
  container: {
    paddingLeft: 0,
    paddingRight: 0
  },
  row: {
    marginLeft: 0,
    marginRight: 0
  },
  col: {
    paddingLeft: 0,
    paddingRight: 0
  }
}

const SideNavigation = styled.div`
  background-color: #222831;
  color: #fff;
  height: 100vh;
`

interface Menu {
  text: string,
  value: string,
  path: string
}

const MENUS: Menu[] = [
  {
    text: 'Places',
    value: 'PLACES',
    path: page.place
  },
  {
    text: 'Split Bill',
    value: 'BILLS',
    path: page.bill
  }
]

const Title = styled.div`
  display: flex;
  justify-content: center;
  margin: 32px 0;
  font-size: 22px;
`

interface MenuContainerProps {
  active: boolean
}

const MenuContainer = styled.div<MenuContainerProps>`
  padding: 20px 30px;
  margin: 0 0 10px;
  font-size: 16px;
  cursor: pointer;
  border-top-right-radius: 32px;
  border-bottom-right-radius: 32px;
  transition: background .2s ease;
  background: ${props => props.active && '#00ADB5'};

  &:hover {
    background: #00ADB5;
    border-top-right-radius: 32px;
    border-bottom-right-radius: 32px;
  }
`

const MenuLink = styled(Link)`
  text-decoration: none;
  color: #FFF;

  &:hover {
    color: #FFF;
  }
`

const BaseLayout: React.FC = () => {
  const location = useLocation()

  const isActiveMenu = (menu: Menu): boolean => (
    location.pathname.includes(menu.path)
    || (location.pathname === page.base && menu.value === 'PLACES')
  )

  return (
    <Container fluid style={style.container}>
      <Row style={style.row}>
        <Col
          style={style.col}
          xl={3}
        >
          <SideNavigation>
            <Container style={style.container}>
              <Row>
                <Col>
                  <Title>
                    Username
                  </Title>
                </Col>
              </Row>

              {
                MENUS.map(menu => (
                  <Row key={menu.value} style={style.row}>
                    <Col style={style.col}>
                      <MenuLink to={menu.path}>
                        <MenuContainer active={isActiveMenu(menu)}>
                          {menu.text}
                        </MenuContainer>
                      </MenuLink>
                    </Col>
                  </Row>
                ))
              }
            </Container>
          </SideNavigation>
        </Col>
        <Col style={style.col}>
          <Outlet />
        </Col>
      </Row>
    </Container>
  )
}

export default BaseLayout