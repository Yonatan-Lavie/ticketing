// import 'bootstrap/dist/css/bootstrap.css';
import BuildClient from '../api/build-client';
import Header from '../components/header';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Copyright from '../components/Copyright';
import { Container, CssBaseline } from '@mui/material';

const theme = createTheme();

const AppComponent = ({ Component, pageProps, currentUser }) => {
  return (
    <>
      <ThemeProvider theme={theme}>
        <Container component="main" fixed={true}>
          <CssBaseline />
          <Header currentUser={currentUser} />
          <Component currentUser={currentUser} {...pageProps} />
          <Copyright sx={{ mt: 5 }} />
        </Container>
      </ThemeProvider>
    </>
  );
};

AppComponent.getInitialProps = async (appContext) => {
  // console.log(Object.keys(appContext)); ==> [ 'AppTree', 'Component', 'router', 'ctx' ]
  const client = BuildClient(appContext.ctx);
  const { data } = await client.get('/api/users/currentUser');

  let pageProps;
  if (appContext.Component.getInitialProps) {
    pageProps = await appContext.Component.getInitialProps(
      appContext.ctx,
      client,
      data.currentUser
    );
  }

  return {
    pageProps,
    ...data,
  };
};

export default AppComponent;
