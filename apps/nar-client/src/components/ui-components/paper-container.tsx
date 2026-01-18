import Stack from '@mui/material/Stack';

const PaperContainer: React.FC<{children: React.ReactNode}> = ({children}) => {
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
        boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1), 0 8px 16px rgba(0, 0, 0, 0.06)',
        backgroundColor: 'background.paper',
      }}>
      {children}
    </Stack>
  );
};

export default PaperContainer;
