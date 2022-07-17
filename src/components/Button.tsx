import React from 'react'
import { default as RbButton, ButtonProps } from 'react-bootstrap/Button'

const Button: React.FC<ButtonProps> = props => {
  return (
    <>
      <style type="text/css">
        {`
          .btn-primary-d {
            background-color: #00ADB5;
            color: #FFF;
            padding: 10px 0;
            transition: background-color .2s ease;
          }
          .btn-primary-d:hover {
            color: #FFF;
            background-color: #009FA7;
          }
        `}
      </style>
      <RbButton variant="primary-d" {...props}>
        {props.children}
      </RbButton>
    </>
  )
}

export default Button