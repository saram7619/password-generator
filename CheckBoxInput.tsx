import { FormEvent } from "react"

type CheckBoxInputProps = {
  label: string
  checked: boolean
  onChange: (checked: boolean, name: string) => void
}

const CheckBoxInput = ({ label, checked, onChange }: CheckBoxInputProps) => {
  const text = label.toLowerCase()

  const onChangeHandle = (event: FormEvent<HTMLInputElement>) => {
    const checked = (event.target as HTMLInputElement).checked
    onChange(checked, text)
  }

  return (
    <li className='password__content__fwitem'>
      <section className='password__content__fwchecked'>
        <input
          role='password checkbox'
          className='password__content__fwiinput'
          type='checkbox'
          name={text}
          id={text}
          defaultChecked={checked}
          onChange={onChangeHandle}
        />
        <label
          role='label'
          className='password__content__fwilabel'
          htmlFor={text}>
          {label}
        </label>
      </section>
    </li>
  )
}

export default CheckBoxInput