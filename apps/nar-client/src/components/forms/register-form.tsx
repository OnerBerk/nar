import React, {useCallback} from 'react';

import {RegisterFormData, SexEnum} from '@/types';

import {useForm, Controller} from 'react-hook-form';

import NarTextField from '@/ui-components/nar-textfield.tsx';

import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import {useAppDispatch} from '@/hooks/use-app-dispatch';
import {register} from '@/redux/modules/auth/auth.actions';
import {Typography} from '@mui/material';
import {useIsMobile} from '@/hooks/use-responsive';

interface RegisterFormProps {
  onRegisterSuccess: () => void;
  setIsLoginPos: (isLoginPos: boolean) => void;
}

const RegisterForm: React.FC<RegisterFormProps> = ({onRegisterSuccess, setIsLoginPos}) => {
  const dispatch = useAppDispatch();
  const isMobile = useIsMobile();
  const {handleSubmit, control, watch} = useForm<RegisterFormData>({
    defaultValues: {
      sex: SexEnum.Woman,
    },
  });

  const password = watch('password');

  const registerSubmit = useCallback(
    (data: RegisterFormData) => {
      dispatch(
        register({
          firstname: data.firstname,
          lastname: data.lastname,
          email: data.email,
          sex: data.sex,
          password: data.password,
        })
      ).then(() => {
        onRegisterSuccess();
      });
    },
    [dispatch, onRegisterSuccess]
  );

  return (
    <form onSubmit={handleSubmit(registerSubmit)}>
      <Stack height='100%' width='100%' justifyContent='space-between' alignItems='center' p={3}>
        <Typography textAlign='center' variant='h5' fontWeight={600}>
          INSCRIPTION
        </Typography>
        <Stack spacing={2}>
          <NarTextField
            rules={{required: 'Le prénom est requis'}}
            label='Prénom'
            name='firstname'
            control={control}
            placeholder='Prénom'
            isRequired
          />
          <NarTextField
            rules={{required: 'Le nom est requis'}}
            label='Nom'
            name='lastname'
            control={control}
            placeholder='Nom'
            isRequired
          />
          <NarTextField
            rules={{
              required: 'L’email est requis',
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: 'Format d’email invalide',
              },
            }}
            label='Email'
            name='email'
            control={control}
            placeholder='Email'
            isRequired
          />

          <NarTextField
            rules={{
              required: 'Le mot de passe est requis',
              pattern: {
                value: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
                message:
                  'Le mot de passe doit contenir au moins une majuscule, une minuscule, un chiffre, un caractère spécial et 8 caractères minimum.',
              },
            }}
            label='Mot de passe'
            name='password'
            control={control}
            placeholder='Mot de passe'
            type='password'
            isRequired
            showPasswordToggle
          />
          <NarTextField
            rules={{
              required: 'La confirmation est requise',
              validate: (value) => value === password || 'Les mots de passe ne correspondent pas',
            }}
            label='Confirmer le mot de passe'
            name='confirmPassword'
            control={control}
            placeholder='Confirmer le mot de passe'
            type='password'
            isRequired
            showPasswordToggle
          />
          <Controller
            name='sex'
            control={control}
            rules={{required: 'Le sexe est requis'}}
            render={({field, fieldState}) => (
              <FormControl error={!!fieldState.error} fullWidth>
                <RadioGroup {...field} row>
                  <Stack direction='row' spacing={2} alignItems='center' justifyContent='center' width='100%'>
                    <FormControlLabel
                      value={SexEnum.Man}
                      control={<Radio sx={{color: 'text.primary', '&.Mui-checked': {color: 'primary.dark'}}} />}
                      label='Homme'
                      sx={{color: 'text.primary', '& .MuiFormControlLabel-label': {fontSize: '0.85rem'}}}
                    />
                    <FormControlLabel
                      value={SexEnum.Woman}
                      control={<Radio sx={{color: 'text.primary', '&.Mui-checked': {color: 'primary.dark'}}} />}
                      label='Femme'
                      sx={{color: 'text.primary', '& .MuiFormControlLabel-label': {fontSize: '0.85rem'}}}
                    />
                  </Stack>
                </RadioGroup>
                {fieldState.error && <FormHelperText sx={{mt: 0.5}}>{fieldState.error.message}</FormHelperText>}
              </FormControl>
            )}
          />
        </Stack>
        <Stack direction='column' spacing={1} justifyContent='center'>
          <Button
            type='submit'
            variant='outlined'
            sx={{border: 'none', alignSelf: 'center', marginTop: 1, fontSize: {xs: 12, md: 16}}}>
            S’inscrire
          </Button>
          {isMobile && (
            <Stack direction='row' spacing={1} justifyContent='center' sx={{zIndex: 0}}>
              <Typography variant='inherit' sx={{fontSize: 12, textAlign: 'center'}}>
                Vous avez déjà un compte ?{' '}
                <span
                  onClick={() => setIsLoginPos(true)}
                  style={{
                    color: 'primary.main',
                    cursor: 'pointer',
                    fontSize: '12px',
                    textDecoration: 'underline',
                  }}>
                  Connectez-vous
                </span>
              </Typography>
            </Stack>
          )}
        </Stack>
      </Stack>
    </form>
  );
};

export default RegisterForm;
