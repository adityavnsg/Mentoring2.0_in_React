import React from 'react';
import classnames from 'classnames';

 const TextFieldGroup = ({ field, value, label, error, type, error_style,onChange,onBlur}) => {
  return (
    <div className={classnames('form-group', { 'has-error': error })}>
      <label className="control-label">{label}</label>
      <input
        autoComplete="off"
        onChange={onChange}
        onBlur = {onBlur}
        value={value}
        type={type}
        name={field}
        id = {error_style}
        className="form-control"
        required
      />
    {error && <span className="help-block">{error}</span>}
    </div>  );
}


TextFieldGroup.propTypes = {
}

TextFieldGroup.defaultProps = {
  type: 'text'
}

export default TextFieldGroup;