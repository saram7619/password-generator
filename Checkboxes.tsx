import { useEffect, useState } from "react"
import InputCheckboxes from "./CheckBoxInput"

type CheckboxesProps = {
  onChange: (data: IInputs) => void
  inputsStates: IInputs
}

interface IInputs {
  uppercase: boolean
  lowercase: boolean
  numbers: boolean
  symbols: boolean
}

const Checkboxes = ({ onChange, inputsStates }: CheckboxesProps) => {
  const [data, setData] = useState<IInputs>(inputsStates)

  const handleInput = (checked: boolean, name: string) => {
    setData({
      ...data,
      [name]: checked,
    })
  }

  useEffect(() => {
    onChange(data)
  }, [data])

  return (
    <>
      <InputCheckboxes
        label='Include Uppercase Letters'
        onChange={handleInput}
        checked={data.uppercase}
      />
      <InputCheckboxes
        label='Include Lowercase Letters'
        onChange={handleInput}
        checked={data.lowercase}
      />
      <InputCheckboxes
        label='Include Numbers'
        onChange={handleInput}
        checked={data.numbers}
      />
      <InputCheckboxes
        label='Include Symbols'
        onChange={handleInput}
        checked={data.symbols}
      />
    </>
  )
}

export default Checkboxes