const whitelistKey = [
  84, // tab
  66, // backspace
  68, // delete
  65 // arrow
]

const numberInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
  const charCode = e.key.charCodeAt(0)

  const isCharacter = charCode > 31
  const isNonNumber = charCode < 48 || charCode > 57
  const isWhitelisted = whitelistKey.includes(charCode)

  if (isWhitelisted) {
    return true
  }

  if (isCharacter && isNonNumber) {
    e.preventDefault()
    return
  }
  return true
}

export { numberInput }
