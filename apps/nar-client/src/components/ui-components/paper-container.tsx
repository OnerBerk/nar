import Stack from '@mui/material/Stack';
import {getCustomStyles} from '@/styles/customStyles.ts';

const PaperContainer: React.FC<{children: React.ReactNode}> = ({children}) => {
  const styles = getCustomStyles();
  return (
    <Stack
      margin='auto'
      alignSelf='center'
      justifyContent='center'
      alignItems='center'
      border={1}
      p={2}
      borderRadius={2}
      sx={{
        borderColor: 'primary.main',
        boxShadow: styles.shadows.card,
        background: styles.backgrounds.card,
      }}>
      {children}
    </Stack>
  );
};

export default PaperContainer;
