import 'bootstrap/dist/css/bootstrap.css';

const _app = ({ Component, pageProps }) => {
  return (
    <>
      <h1>Header!!</h1>
      <Component {...pageProps} />
    </>
  );
};

export default _app;
