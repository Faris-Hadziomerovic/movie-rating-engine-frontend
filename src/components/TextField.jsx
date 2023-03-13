import { TextField, InputAdornment } from '@mui/material';
import PropTypes from 'prop-types';
import textStyle from '../styles/overview/TextFieldCustomStyle';

const TextFieldCustom = ({
  label,
  placeholder,
  iconStart,
  inputProps,
  register,
  fieldName,
  error,
  helperText,
  disabled,
  inputRef,
  InputProps,
  type,
  value,
  onChange,
  required,
  sx,
}) => {
  const conditionalValue = fieldName ? null : {
    value,
  };
  return (
    <TextField
      FormHelperTextProps={{ sx: { backgroundColor: '#FFFFFF', m: '0px' } }}
      InputProps={{
        startAdornment: iconStart && (
          <InputAdornment position="start">{iconStart}</InputAdornment>
        ),
        ...InputProps,
      }}
      size="small"
      color="info"
      margin="dense"
      focused
      label={label}
      type={type}
      required={required}
      placeholder={placeholder}
      inputProps={inputProps}
      error={error}
      helperText={helperText}
      inputRef={inputRef}
      disabled={disabled}
      onChange={onChange}
      {...conditionalValue}
      {...register(fieldName)}
      sx={{ ...textStyle, ...sx }}
    />
  );
};

TextFieldCustom.defaultProps = {
  label: '',
  placeholder: '',
  iconStart: null,
  inputProps: {},
  inputRef: null,
  register: () => {},
  fieldName: '',
  helperText: '',
  error: false,
  disabled: false,
  InputProps: null,
  type: 'text',
  value: '',
  onChange: null,
  required: false,
  sx: {},
};

TextFieldCustom.propTypes = {
  label: PropTypes.string,
  placeholder: PropTypes.string,
  iconStart: PropTypes.node,
  inputProps: PropTypes.object,
  register: PropTypes.func,
  fieldName: PropTypes.string,
  error: PropTypes.bool,
  disabled: PropTypes.bool,
  inputRef: PropTypes.func,
  helperText: PropTypes.string,
  type: PropTypes.string,
  InputProps: PropTypes.object,
  value: PropTypes.string,
  required: PropTypes.bool,
  onChange: PropTypes.func,
  sx: PropTypes.object,
};

export default TextFieldCustom;
