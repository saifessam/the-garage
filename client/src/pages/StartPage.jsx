import Container from '../components/container/Container';
import Footer from '../components/footer/Footer';
import Header from '../components/header/Header';
import ServiceCard from '../components/service_card/ServiceCard';
import Services from './../data/Services.json';

const StartPage = () => {
  const renderServices = () => {
    return Services.map((service) => {
      return (
        <ServiceCard path={service.path} image={service.image} title={service.title} text={service.text} key={service.key} />
      );
    });
  };

  return (
    <Container>
      <Header>{renderServices()}</Header>
      <Footer />
    </Container>
  );
};

export default StartPage;
