import {useState} from 'react';

import {Control, Controller, FieldValues, Path, RegisterOptions} from 'react-hook-form';

import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';

import {Visibility, VisibilityOff} from '@mui/icons-material';

type Props<T extends FieldValues> = {
  name: Path<T>;
  control: Control<T>;
  rules?: RegisterOptions<T>;
  label?: string;
  placeholder?: string;
  type?: string;
  showPasswordToggle?: boolean;
  isRequired?: boolean;
  endAdornment?: React.ReactNode;
};

const NarTextField = <T extends FieldValues>({
  name,
  control,
  rules,
  placeholder = '',
  type,
  showPasswordToggle = false,
  isRequired = false,
  endAdornment,
  label,
}: Props<T>) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === 'password' || showPasswordToggle;
  const inputType = isPassword && !showPassword ? 'password' : (type ?? 'text');

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  return (
    <Controller
      name={name}
      control={control}
      rules={rules ?? {}}
      render={({field, fieldState}) => (
        <Stack height={55}>
          <TextField
            fullWidth
            {...field}
            label={label}
            type={inputType}
            placeholder={isRequired ? `${placeholder} *` : placeholder}
            error={!!fieldState.error}
            helperText={fieldState.error?.message ?? ' '}
            variant='outlined'
            slotProps={{
              inputLabel: {
                shrink: true,
              },
              input: {
                endAdornment: isPassword ? (
                  <InputAdornment position='end'>
                    <IconButton
                      aria-label={showPassword ? 'hide the password' : 'display the password'}
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge='end'>
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ) : endAdornment ? (
                  <InputAdornment position='end'>{endAdornment}</InputAdornment>
                ) : undefined,
              },
            }}
            sx={{
              '& .MuiInputBase-input': {
                fontSize: '1rem',
                '::placeholder': {
                  fontSize: '0.85rem',
                  opacity: 0.7,
                },
              },
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: fieldState.error ? 'error.main' : undefined,
                },
                '&.Mui-focused fieldset': {
                  borderColor: fieldState.error ? 'error.main' : 'primary.dark',
                },
              },
              '& .MuiInputLabel-root': {
                color: fieldState.error ? 'error.main' : 'text.primary',
                opacity: 1,
                '&.Mui-focused': {
                  color: fieldState.error ? 'error.main' : 'primary.dark',
                },
              },
            }}
          />
        </Stack>
      )}
    />
  );
};

export default NarTextField;
