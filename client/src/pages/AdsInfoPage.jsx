import { useContext, useState } from 'react';
import { useParams } from 'react-router-dom';
import { UserToken } from '../context/UserToken';
import { useLazyQuery, useMutation, useQuery } from '@apollo/client';
import { GET_SINGLE_AD, GET_OWNER_DETAILS } from '../graphql/Query';
import { ADD_TO_CART } from '../graphql/Mutation';
import Container from '../components/container/Container';
import Navbar from '../components/navbar/Navbar';
import Content from '../components/content/Content';
import Wrapper from '../components/wrapper/Wrapper';
import Loader from '../components/loader/Loader';
import Carousel from '../components/carousel/Carousel';
import Footer from '../components/footer/Footer';
import DetailsWrapper from '../components/details_wrapper/DetailsWrapper';
import NumberFormat from '../functions/NumberFormat';
import Message from './../components/message/Message';
import Button from '../components/button/Button';
import NumberInput from '../components/number_input/NumberInput';
import { ReactComponent as DollarSVG } from '../assets/svgs/dollar.svg';
import { ReactComponent as CalendarSVG } from '../assets/svgs/calendar.svg';
import { ReactComponent as ColorsSVG } from '../assets/svgs/colors.svg';
import { ReactComponent as GearSVG } from '../assets/svgs/gear.svg';
import { ReactComponent as StarsSVG } from '../assets/svgs/stars.svg';
import { ReactComponent as CarSVG } from '../assets/svgs/car.svg';
import { ReactComponent as LocationSVG } from '../assets/svgs/location.svg';
import { ReactComponent as SmartCarSVG } from '../assets/svgs/smart-car.svg';
import { ReactComponent as UserSVG } from '../assets/svgs/user.svg';
import { ReactComponent as EmailSVG } from '../assets/svgs/email.svg';
import { ReactComponent as PhoneSVG } from '../assets/svgs/call.svg';

const AdsInfoPage = () => {
  const { id: userId, isAdmin } = useContext(UserToken);
  const { id: adId } = useParams();
  const [data, setData] = useState(null);
  const [ownerDetails, setOwnerDetails] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [message, setMessage] = useState({ status: null, response: '' });
  const { loading: queryLoading } = useQuery(GET_SINGLE_AD, {
    variables: { adId },
    onCompleted(data) {
      setData(data.getSingleAd);
    },
    onError(error) {
      console.error(error);
    },
  });

  const [getOwnerDetails, { loading: getOwnerDetailsLoading }] = useLazyQuery(GET_OWNER_DETAILS, {
    onCompleted(data) {
      setOwnerDetails(data.getOwnerDetails);
    },
    onError(error) {
      console.error(error);
    },
  });

  const variables = {
    cartData: {
      itemId: adId,
      image: data?.images[0],
      title: data?.title,
      price: data?.price,
      quantity,
      userId: isAdmin !== undefined ? userId : null,
      serviceProviderId: isAdmin === undefined ? userId : null,
    },
  };

  const [addToCart, { loading: addToCartLoading }] = useMutation(ADD_TO_CART, {
    onCompleted(data) {
      const status = Object.entries(data)[0][1].status;
      const response = Object.entries(data)[0][1].response;
      setMessage({ status, response });
    },
    onError(error) {
      console.error(error);
    },
  });

  const showMessage = () => {
    if (message.status === false) {
      return <Message data={'error'}>{message.response}</Message>;
    } else if (message.status === true) {
      return <Message data={'success'}>{message.response}</Message>;
    }
  };

  const renderCartInupts = () => {
    if (data?.adType === 'spare') {
      return (
        <Wrapper>
          <NumberInput state={quantity} setter={setQuantity} />
          <Button type={'button'} action={() => addToCart({ variables })} fit={true}>
            Add item to cart
          </Button>
        </Wrapper>
      );
    } else {
      return null;
    }
  };

  const renderOwnerDetails = () => {
    if (ownerDetails) {
      return (
        <Wrapper>
          <DetailsWrapper svg={<UserSVG />} title={ownerDetails.name} />
          <DetailsWrapper svg={<EmailSVG />} title={ownerDetails.email} small />
          <DetailsWrapper svg={<PhoneSVG />} title={ownerDetails.phone ? ownerDetails.phone : ownerDetails.branches.phone} />
          <DetailsWrapper
            svg={<LocationSVG />}
            title={ownerDetails.location ? ownerDetails.location : ownerDetails.branches.location}
          />
        </Wrapper>
      );
    } else {
      return (
        <Button type={'button'} action={() => getOwnerDetails({ variables: { getOwnerDetailsId: data?.ownerId } })}>
          View Owner Details
        </Button>
      );
    }
  };

  const renderLoader = () => {
    if (queryLoading || getOwnerDetailsLoading || addToCartLoading) return <Loader />;
  };

  return (
    <>
      {renderLoader()}
      <Container>
        <Navbar />
        <Content>
          <Wrapper>
            <Wrapper vertical>
              <Carousel type={data?.adType} condition={data?.condition} images={data?.images} />
              <Wrapper vertical>{renderOwnerDetails()}</Wrapper>
            </Wrapper>
            <Wrapper vertical={true}>
              {data?.title && <DetailsWrapper title={data?.title} heading={true} />}
              {data?.description && <DetailsWrapper title={data?.description} />}
              <Wrapper>
                <Wrapper vertical={true}>
                  {data?.price && <DetailsWrapper svg={<DollarSVG />} title={NumberFormat(data?.price) + ' EGP'} />}
                  {data?.make && <DetailsWrapper svg={<CarSVG />} title={data?.make} />}
                  {data?.model && <DetailsWrapper svg={<CarSVG />} title={data?.model} />}
                  {data?.year && <DetailsWrapper svg={<CalendarSVG />} title={data?.year} />}
                  {data?.color && <DetailsWrapper svg={<ColorsSVG />} title={data?.color} />}
                </Wrapper>
                <Wrapper vertical={true}>
                  {data?.transmission && <DetailsWrapper svg={<GearSVG />} title={data?.transmission} />}
                  {data?.condition && <DetailsWrapper svg={<StarsSVG />} title={data?.condition} />}
                  {data?.carType && <DetailsWrapper svg={<CarSVG />} title={data?.carType} />}
                  {data?.location && <DetailsWrapper svg={<LocationSVG />} title={data?.location} />}
                  {data?.features.length > 0 && (
                    <DetailsWrapper svg={<SmartCarSVG />} title={data?.features.join(', ')} caps={true} />
                  )}
                </Wrapper>
              </Wrapper>
              {renderCartInupts()}
              {showMessage()}
            </Wrapper>
          </Wrapper>
        </Content>
        <Footer />
      </Container>
    </>
  );
};

export default AdsInfoPage;
