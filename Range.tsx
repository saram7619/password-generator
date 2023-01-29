import { ReactNode, FormEvent, useState, useEffect } from "react"

type RangeProps = {
  onChange: (value: number) => void
  initValue: number
  children: ReactNode
}

const Range = ({ children, onChange, initValue }: RangeProps) => {
  const [inputValue, setInputValue] = useState<number>(0)
  const MAX = 20

  /* useEffect(() => {
    onChange(initValue)
  }, [])*/

  const getBackgroundSize = () => {
    return {
      background: `linear-gradient(to right, #A4FFAF ${
        (inputValue * 100) / MAX
      }%, #18171F ${(inputValue * 100) / MAX}%, #18171F)`,
    }
  }

  const rangeOnInput = (event: FormEvent<HTMLInputElement>) => {
    const currentValue = (event.target as HTMLInputElement).value
    const valueNumber = Number(currentValue)
    setInputValue(valueNumber)
    onChange(valueNumber)
  }

  return (
    <li className='password__content__fwitem'>
      <section className='password__content__fwchecked'>
        <div>
          <label role='password name' className='password__content__name '>
            Character Length
          </label>
          <span role='password number' className='password__content__number'>
            {inputValue}
          </span>
        </div>
        <input
          role='password range'
          className='input__range'
          type='range'
          min={0}
          max={MAX}
          step={1}
          onInput={rangeOnInput}
          defaultValue={inputValue}
          style={getBackgroundSize()}
        />
        {children}
      </section>
    </li>
  )
}

export default Range