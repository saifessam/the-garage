import { useNavigate, useParams } from 'react-router-dom';
import { useState, useContext } from 'react';
import { useQuery } from '@apollo/client';
import { UserToken } from '../context/UserToken';
import { GET_SINGLE_SERVICE_PROVIDER, GET_USER_ADS } from './../graphql/Query';
import { CREATE_REVIEW } from './../graphql/Mutation';
import GetAvgRating from './../functions/GetAvgRating';
import Container from './../components/container/Container';
import Navbar from './../components/navbar/Navbar';
import Content from './../components/content/Content';
import Banner from './../components/banner/Banner';
import Wrapper from './../components/wrapper/Wrapper';
import Reviews from '../components/reviews/Reviews';
import Spinner from './../components/spinner/Spinner';
import Carousel from '../components/carousel/Carousel';
import Form from '../components/form/Form';
import Footer from './../components/footer/Footer';
import NumberInput from '../components/number_input/NumberInput';
import Card from '../components/card/Card';
import NumberFormat from '../functions/NumberFormat';

const ServiceProvidersInfoPage = () => {
  const { id: serviceProviderId } = useParams();
  const { token, id: userId, isAdmin } = useContext(UserToken);
  const [data, setData] = useState(null);
  const [ads, setAds] = useState(null);
  const [title, setTitle] = useState('');
  const [rate, setRate] = useState(1);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const { loading: serviceProviderData } = useQuery(GET_SINGLE_SERVICE_PROVIDER, {
    variables: { serviceProviderId },
    onCompleted(data) {
      setData(data.getSingleServiceProvider);
    },
    onError(error) {
      console.error(error);
    },
  });

  const { loading: serviceProviderAds } = useQuery(GET_USER_ADS, {
    variables: { userId: serviceProviderId },
    onCompleted(data) {
      console.log(data);
      setAds(data.getUserAds);
    },
    onError(error) {
      console.error(error);
    },
  });

  if (serviceProviderData || serviceProviderAds) return <Spinner />;

  const variables = {
    reviewData: {
      title,
      rate,
      message,
      userId,
      serviceProviderId,
    },
  };

  const renderForm = () => {
    if (!token) {
      return null;
    } else if (isAdmin === undefined) {
      return null;
    } else {
      return (
        <Form mutation={CREATE_REVIEW} variables={variables} title={'Add your review'} buttonLabel={'Send'}>
          <div className="input-wrapper">
            <div className="input-wrapper-title">
              <label htmlFor="name">Title</label>
              <span></span>
            </div>
            <input
              type="text"
              name="title"
              placeholder="Enter a title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="input-wrapper">
            <div className="input-wrapper-title">
              <label htmlFor="name">Rate</label>
              <span></span>
            </div>
            <NumberInput state={rate} setter={setRate} max={5} />
          </div>

          <div className="input-wrapper">
            <div className="input-wrapper-title">
              <label htmlFor="name">Message</label>
              <span></span>
            </div>
            <textarea
              type="text"
              name="message"
              placeholder="Enter your message"
              value={message}
              rows={6}
              onChange={(e) => setMessage(e.target.value)}
            />
          </div>
        </Form>
      );
    }
  };

  const renderAdCards = () => {
    if (ads) {
      return ads.map((ad) => {
        return (
          <Card
            id={ad.id}
            type={ad.adType}
            condition={ad.condition}
            image={ad.images[0]}
            name={ad.title}
            detail1={`${NumberFormat(ad.price)} EGP`}
            detail2={ad.condition}
            detail3={ad.location}
            key={ad.id}
          />
        );
      });
    } else {
      return 'Empty';
    }
  };

  return (
    <Container>
      <Navbar />
      <Content>
        <Wrapper>
          <Banner
            type={data?.type}
            image={data?.images[0]}
            name={data?.name}
            location={data?.branches.location}
            phone={data?.branches.phone}
            email={data?.email}
            openingTime={data?.workTime.open}
            closingTime={data?.workTime.close}
            offDays={data?.offDays}
            description={data?.description}
          />
          <Carousel type={data?.type} images={data?.images} />
        </Wrapper>
        <Wrapper>
          <Reviews reviews={data?.reviews} avgRating={GetAvgRating(data?.reviews.length, data?.reviews)} />
          {renderForm()}
        </Wrapper>
        <Wrapper vertical>
          <h1 className="wrapper-title">Ads published by {data?.name}</h1>
          <Wrapper start>{renderAdCards()}</Wrapper>
        </Wrapper>
      </Content>
      <Footer />
    </Container>
  );
};

export default ServiceProvidersInfoPage;
