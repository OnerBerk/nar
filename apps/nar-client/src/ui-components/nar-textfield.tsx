import {Control, Controller, FieldValues, Path, RegisterOptions} from 'react-hook-form';
import {FormControl, Input, InputAdornment, IconButton, FormHelperText, Stack} from '@mui/material';
import {Visibility, VisibilityOff} from '@mui/icons-material';
import {useState} from 'react';

type Props<T extends FieldValues> = {
  name: Path<T>;
  control: Control<T>;
  rules?: RegisterOptions<T>;
  placeholder?: string;
  type?: string;
  showPasswordToggle?: boolean;
  isRequired?: boolean;
};

const NarTextField = <T extends FieldValues>({
  name,
  control,
  rules,
  placeholder = '',
  type = 'text',
  showPasswordToggle = false,
  isRequired = false,
}: Props<T>) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === 'password' || showPasswordToggle;
  const inputType = isPassword && !showPassword ? 'password' : 'text';

  return (
    <Controller
      name={name}
      control={control}
      rules={rules ?? {}}
      render={({field, fieldState}) => (
        <Stack height={55}>
          <FormControl variant='standard' fullWidth error={!!fieldState.error}>
            <Input
              {...field}
              type={inputType}
              placeholder={isRequired ? `${placeholder} *` : placeholder}
              endAdornment={
                isPassword ? (
                  <InputAdornment position='end'>
                    <IconButton onClick={() => setShowPassword((prev) => !prev)} edge='end' tabIndex={-1}>
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ) : undefined
              }
              disableUnderline={false}
              sx={{
                '& .MuiInputBase-input': {
                  fontSize: '1rem',
                  '::placeholder': {
                    fontSize: '0.85rem',
                    opacity: 0.7,
                  },
                },
                '& .MuiInputBase-root': {
                  '&:focus-within': {
                    '& .MuiInputBase-input': {
                      outline: 'none',
                    },
                  },
                },
                '& .MuiInputBase-input:focus': {
                  outline: 'none',
                  boxShadow: 'none',
                },
                '& .MuiInputBase-input:-webkit-autofill': {
                  '-webkit-box-shadow': '0 0 0 1000px white inset',
                  '-webkit-text-fill-color': 'inherit',
                },
              }}
            />
            <FormHelperText>{fieldState.error?.message ?? ' '}</FormHelperText>
          </FormControl>
        </Stack>
      )}
    />
  );
};

export default NarTextField;
