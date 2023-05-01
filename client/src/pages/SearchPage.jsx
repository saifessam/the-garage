import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { SEARCH } from '../graphql/Query';
import Loader from './../components/loader/Loader';
import Container from './../components/container/Container';
import Navbar from './../components/navbar/Navbar';
import Content from './../components/content/Content';
import Wrapper from './../components/wrapper/Wrapper';
import Card from './../components/card/Card';
import Footer from './../components/footer/Footer';
import NumberFormat from '../functions/NumberFormat';

const SearchPage = () => {
  const { criteria, query } = useParams();
  const [data, setData] = useState(null);
  const { loading: queryLoading } = useQuery(SEARCH, {
    variables: { searchData: { criteria, query } },
    onCompleted(data) {
      setData(data.search);
    },
    onError(error) {
      console.error(error);
    },
  });

  const renderDetails = (year, phone, location) => {
    if (year) {
      return year;
    }
    if (phone) {
      return phone;
    }
    if (location) {
      return location;
    }
  };

  const renderData = () => {
    return data?.map((ad) => {
      return (
        <Card
          id={ad.id}
          type={ad.type ? ad.type : ad.adType}
          condition={ad.condition}
          image={ad.images[0]}
          name={ad.title ? ad.title : ad.name}
          detail1={ad.price ? `${NumberFormat(ad.price)} EGP` : ad.branches.location}
          detail2={renderDetails(ad?.year, ad?.branches?.phone, ad?.location)}
          detail3={ad.condition}
          detail4={ad.transmission}
          key={ad.id}
        />
      );
    });
  };

  const renderLoader = () => {
    if (queryLoading) return <Loader />;
  };

  return (
    <>
      {renderLoader()}
      <Container>
        <Navbar />
        <Content>
          <h1>Searching for word: {query}</h1>
          <Wrapper start>{renderData()}</Wrapper>
        </Content>
        <Footer />
      </Container>
    </>
  );
};

export default SearchPage;
