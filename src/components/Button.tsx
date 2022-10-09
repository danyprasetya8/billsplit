import React from 'react'
import { default as RbButton, ButtonProps } from 'react-bootstrap/Button'

const Button: React.FC<ButtonProps> = props => {
  return (
    <>
      <style type="text/css">
        {`
          .btn-primary-d {
            background-color: #00ADB5;
            border: 1px solid #00ADB5;
            color: #FFF;
            padding: 10px 0;
            transition: background-color .2s ease;
          }
          .btn-primary-d:hover {
            color: #FFF;
            background-color: #009FA7;
          }
          .btn.disabled, .btn:disabled {
            background: #CCC;
            border: 1px solid #CCC;
          }
          .btn-primary-outline-d {
            background-color: #FFF;
            border: 1px solid #00ADB5;
            color: #00ADB5;
            padding: 10px 0;
          }
          .btn-primary-outline-d:hover {
            color: #00ADB5;
            background-color: #FFF;
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