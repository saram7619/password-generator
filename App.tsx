import { FormEvent, useEffect, useRef, useState } from "react"
import Password from "./assets/components/Password/Password"
import Range from "./assets/components/Range"
import Checkboxes from "./assets/components/Checkboxes/Checkboxes"
import PasswordStrengthMeter from "./assets/components/PasswordStrengthMeter"

interface ICheckboxs {
  uppercase: string
  lowercase: string
  numbers: string
  symbols: string
}

interface IInputs {
  uppercase: boolean
  lowercase: boolean
  numbers: boolean
  symbols: boolean
}

const App = () => {
  const [checkboxesList, setCheckboxesList] = useState<IInputs>({
    uppercase: true,
    lowercase: true,
    numbers: true,
    symbols: true,
  })

  const [rangeLength, setRangeLength] = useState(0)
  const [passwordValue, setPasswordValue] = useState("")
  const submitButton = useRef<HTMLButtonElement>(null)

  const getInputCheckboxes = (): string[] => {
    type nameType = keyof typeof checkboxesList
    return Object.keys(checkboxesList)
      .map((item) => item as nameType)
      .filter((item) => checkboxesList[item])
  }

  const checkboxesVerification = (): boolean => {
    return Object.values(checkboxesList as IInputs).every(
      (item) => item === false
    )
  }

  const getObjectValues = (arr: string[]) => {
    const letters = "abcdefghijklmnñopqrstuvwxyz"

    const charactersIndex: ICheckboxs = {
      uppercase: letters.toUpperCase(),
      lowercase: letters,
      numbers: "0123456789",
      symbols: "~`!@#$%^&*()_-+={[}]|:;\"'<,>.?/",
    }

    type nameType = keyof typeof charactersIndex
    return arr.map((item) => charactersIndex[item as nameType]).join("")
  }

  const getRandomArray = (length: number, maxNum: number) => {
    return Array.from({ length }, () => {
      return Math.floor(Math.random() * maxNum)
    })
  }

  const onChangeRange = (value: number) => {
    setRangeLength(value)
  }

  const InputsOnChange = (data: IInputs) => {
    setCheckboxesList(data)
  }

  const characterRandoms = (numbers: number[], values: string): string => {
    return numbers.map((item) => values[item]).join("")
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const allUncheckeds = checkboxesVerification()

    if (allUncheckeds) return alert("Please select at least one option")

    const inputsName = getInputCheckboxes()
    const values = getObjectValues(inputsName)
    const numsRandoms = getRandomArray(rangeLength, values.length)
    const password = characterRandoms(numsRandoms, values)

    setPasswordValue(password)
  }

  useEffect(() => {
    if (submitButton.current) {
      ;(submitButton.current as HTMLButtonElement).click()
    }
  }, [])

  return (
    <main className='password'>
      <div className='password__content'>
        <h1 role='header' className='password__content__title'>
          Password Generator
        </h1>
        <Password value={passwordValue} placeholder={""} />

        <form
          role='password form'
          className='password__content__form'
          onSubmit={handleSubmit}>
          <Range onChange={onChangeRange} initValue={0} children={undefined} />
          <ul className='form__container'>
            <Checkboxes
              onChange={InputsOnChange}
              inputsStates={checkboxesList}
            />
          </ul>
          <PasswordStrengthMeter password={passwordValue} />
          <button
            role='generate password button'
            className='password__content__button'
            type='submit'
            ref={submitButton}>
            Generate
            <>
              <svg
                className='button-icon-arrow'
                width='12'
                height='12'
                xmlns='http://www.w3.org/2000/svg'>
                <path
                  className='path-icon-arrow'
                  d='m5.106 12 6-6-6-6-1.265 1.265 3.841 3.84H.001v1.79h7.681l-3.841 3.84z'
                />
              </svg>
            </>
          </button>
        </form>
      </div>
    </main>
  )
}

export default App
