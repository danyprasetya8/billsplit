import type {} from 'styled-components/cssprop'

declare module '*.module.css' {
  const classes: { [key: string]: string }
  export default classes
}