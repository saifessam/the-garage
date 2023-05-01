import Container from '../components/container/Container';
import Content from '../components/content/Content';
import ErrorMessage from '../components/error_message/ErrorMessage';
import Footer from '../components/footer/Footer';
import Navbar from '../components/navbar/Navbar';

const ErrorPage = () => {
  return (
    <Container>
      <Navbar />
      <Content>
        <ErrorMessage />
      </Content>
      <Footer />
    </Container>
  );
};

export default ErrorPage;
