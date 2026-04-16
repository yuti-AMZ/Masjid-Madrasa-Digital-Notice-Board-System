export function AuthTextField({ id, label, icon, right, ...inputProps }) {
  return (
    <div className="auth-field">
      <label className="auth-field__label" htmlFor={id}>
        {label}
      </label>
      <div className="auth-field__wrap">
        <span className="auth-field__icon">{icon}</span>
        <input id={id} className="auth-field__input" {...inputProps} />
        {right}
      </div>
    </div>
  )
}
