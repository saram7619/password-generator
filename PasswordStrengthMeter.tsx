import zxcvbn from "zxcvbn-typescript"

type PasswordStrengthMeterProps = {
  password: string
}

const PasswordStrengthMeter = ({ password }: PasswordStrengthMeterProps) => {
  const { score } = zxcvbn(password)
  const states = [
    { items: ["too-weak"], id: "too-weak", label: "too weak!", color: "red" },
    { items: ["weak"], id: "weak", label: "weak!", color: "orange" },
    { items: ["medium"], id: "medium", label: "medium!", color: "yellow" },
    { items: ["strong"], id: "strong", label: "strong!", color: "green" },
  ]

  const state = states[Math.min(score, states.length - 1)]

  return (
    <section className='password-strength-meter'>
      <div className='strength-meter-container'>
        <div>
          <p className='strength-text'>Strength</p>
        </div>
        {score === 1 && password.length > 0 ? (
          <span className='strength-meter-label'>too weak!</span>
        ) : score === 2 ? (
          <span className='strength-meter-label'>weak!</span>
        ) : score === 3 ? (
          <span className='strength-meter-label'>medium!</span>
        ) : score > 3 ? (
          <span className='strength-meter-label'>{state.label}</span>
        ) : null}
        <div className='grid-container'>
          {Array.from({ length: 4 }, (_, i) => {
            return (
              <div
                key={i}
                className={`grid-item ${
                  score === 1 && password.length > 0 && i === 0
                    ? "too-weak"
                    : score === 2 && password.length > 0 && i < 2
                    ? "weak"
                    : score === 3 && password.length > 0 && i < 3
                    ? "medium"
                    : i < score
                    ? state.id
                    : "empty"
                }`}>
                <div
                  className='strength-meter-bar-inner'
                  style={{
                    backgroundColor:
                      score === 1 && password.length > 0 && i === 0
                        ? "red"
                        : score === 2 && password.length > 0 && i < 2
                        ? "orange"
                        : score === 3 && password.length > 0 && i < 3
                        ? "yellow"
                        : i < score
                        ? state.color
                        : "none",
                  }}
                />
                <div
                  className={`strength-meter-bar-fill ${
                    score === 1 && password.length > 0 && i === 0
                      ? "red"
                      : score === 2 && password.length > 0 && i < 2
                      ? "orange"
                      : score === 3 && password.length > 0 && i < 3
                      ? "yellow"
                      : i < score
                      ? state.color
                      : "#18171F"
                  }`}
                  style={{ width: "25%" }}></div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default PasswordStrengthMeter