import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserToken } from '../context/UserToken';
import { useMutation, useQuery } from '@apollo/client';
import { GET_USER_ADS } from '../graphql/Query';
import { CREATE_AD, DELETE_AD } from '../graphql/Mutation';
import Loader from '../components/loader/Loader';
import Container from '../components/container/Container';
import Content from '../components/content/Content';
import Navbar from '../components/navbar/Navbar';
import Navigator from '../components/navigator/Navigator';
import Dropdown from '../components/dropdown/Dropdown';
import FileUpload from '../components/file_upload/FileUpload';
import Footer from '../components/footer/Footer';
import Wrapper from '../components/wrapper/Wrapper';
import Button from '../components/button/Button';
import Card from '../components/card/Card';
import NumberFormat from '../functions/NumberFormat';
import Form from '../components/form/Form';
import Checkbox from '../components/checkbox/Checkbox';
import Logout from '../functions/Logout';
import conditionsJSON from './../data/Conditions.json';
import adTypesJSON from './../data/AdTypes.json';
import carsJSON from './../data/Cars.json';
import carTypesJSON from './../data/CarTypes.json';
import transmissionJSON from './../data/Transmission.json';
import featuresJSON from './../data/Features.json';
import locationsJSON from './../data/Locations.json';

const PlacedAdsPage = () => {
  const { id: ownerId, isAdmin } = useContext(UserToken);
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [title, setTitle] = useState(null);
  const [images, setImages] = useState([]);
  const [price, setPrice] = useState(null);
  const [description, setDescription] = useState(null);
  const [condition, setCondition] = useState(null);
  const [adType, setAdType] = useState(null);
  const [make, setMake] = useState(null);
  const [model, setModel] = useState(null);
  const [year, setYear] = useState(null);
  const [color, setColor] = useState(null);
  const [carType, setCarType] = useState(null);
  const [transmission, setTransmission] = useState(null);
  const [features, setFeatures] = useState([]);
  const [location, setLocation] = useState([]);
  const carBrands = [];
  const carModels = [];

  const { loading: queryLoading } = useQuery(GET_USER_ADS, {
    variables: { userId: ownerId },
    onCompleted(data) {
      setData(data.getUserAds);
    },
    onError(error) {
      console.error(error);
    },
  });

  const variables = {
    adData: {
      title,
      images,
      price: parseInt(price),
      avilability: true,
      description,
      approved: false,
      condition,
      adType,
      make,
      model,
      year: year ? parseInt(year) : null,
      color,
      carType,
      transmission,
      features,
      location,
      ownerId,
    },
  };

  carsJSON.map((car) => {
    carBrands.push(car.brand);
  });

  const getFeatures = (e) => {
    let updatedList = [...features];
    if (e.target.checked) {
      updatedList = [...features, e.target.value];
    } else {
      updatedList.splice(features.indexOf(e.target.value), 1);
    }
    setFeatures(updatedList);
  };

  const [deleteAd, { loading: DeleteAdLoading }] = useMutation(DELETE_AD, {
    onCompleted(data) {
      window.location.reload(false);
    },
    onError(error) {
      console.error(error);
    },
  });

  const renderAdCards = () => {
    if (data) {
      return data.map((ad) => {
        return (
          <Card
            id={ad.id}
            type={ad.adType}
            condition={ad.condition}
            image={ad.images[0]}
            name={ad.title}
            detail1={`${NumberFormat(ad.price)} EGP`}
            detail2={ad.condition}
            detail3={ad.approved ? 'Approved' : 'Not approved'}
            detail4={
              <Button action={() => deleteAd({ variables: { adId: ad.id } })} type={'button'} data={'danger'}>
                Delete Ad
              </Button>
            }
            key={ad.id}
          />
        );
      });
    } else {
      return 'Empty';
    }
  };

  const renderCarModels = () => {
    if (make) {
      carsJSON.map((car) => {
        if (car.brand === 'Any') {
          carModels.push([]);
        } else if (car.brand === make) {
          carModels.push(car.model);
          console.log(carModels);
        }
      });
      return (
        <div className="input-wrapper">
          <div className="input-wrapper-title">
            <label>Model</label>
            <span></span>
          </div>
          <Dropdown name="model" options={carModels[0].sort()} label="Car model" action={setModel} />
        </div>
      );
    }
  };

  const renderInputs = () => {
    if (adType === 'vehicle') {
      return (
        <>
          <div className="input-wrapper">
            <div className="input-wrapper-title">
              <label>Year</label>
              <span></span>
            </div>
            <input type="text" placeholder="Enter vehicle year" value={year} onChange={(e) => setYear(e.target.value)} />
          </div>
          <div className="input-wrapper">
            <div className="input-wrapper-title">
              <label>Color</label>
              <span></span>
            </div>
            <input type="text" placeholder="Enter vehicle color" value={color} onChange={(e) => setColor(e.target.value)} />
          </div>
          <div className="input-wrapper">
            <div className="input-wrapper-title">
              <label>Vehicle Type</label>
              <span></span>
            </div>
            <Dropdown name="type" options={carTypesJSON} label="Vehicle type" action={setCarType} />
          </div>
          <div className="input-wrapper">
            <div className="input-wrapper-title">
              <label>Transmition</label>
              <span></span>
            </div>
            <Dropdown name="transmission" options={transmissionJSON} label="Vehicle transmission" action={setTransmission} />
          </div>
          <div className="input-wrapper">
            <div className="input-wrapper-title">
              <label>Features</label>
              <span></span>
            </div>
            <Checkbox checkboxs={featuresJSON} name={'feature'} action={(e) => getFeatures(e)} gird={true} />
          </div>
        </>
      );
    } else {
      return null;
    }
  };

  const renderDashboard = () => {
    if (isAdmin) {
      return (
        <>
          <Button type={'button'} action={() => navigate('/admin/dashboard/service-providers')}>
            Dashboard
          </Button>
          <Button type={'button'} action={() => navigate('/admin')}>
            Register new admin
          </Button>
        </>
      );
    } else {
      return null;
    }
  };

  const renderLoader = () => {
    if (queryLoading || DeleteAdLoading) return <Loader />;
  };

  return (
    <>
      {renderLoader()}
      <Container>
        <Navbar />
        <Navigator>
          <Button
            type={'button'}
            action={() => navigate('/account/profile/account-details')}
            data={'/account/profile/account-details'}
          >
            Account details
          </Button>
          <Button
            type={'button'}
            action={() => navigate('/account/profile/placed-ads')}
            data={'/account/profile/placed-ads'}
          >
            Placed ads
          </Button>
          <Button type={'button'} action={() => navigate('/account/profile/orders')} data={'/account/profile/orders'}>
            Orders
          </Button>
          {renderDashboard()}
          <Button type={'button'} action={() => Logout(navigate)}>
            Logout
          </Button>
        </Navigator>
        <Content horizontal>
          <Form mutation={CREATE_AD} variables={variables} title={'Place an ad'} buttonLabel={'Place ad'} notCentered sticky>
            <div className="input-wrapper">
              <div className="input-wrapper-title">
                <label>Title</label>
                <span></span>
              </div>
              <input type="text" placeholder="Enter ad title" value={title} onChange={(e) => setTitle(e.target.value)} />
            </div>
            <div className="input-wrapper">
              <div className="input-wrapper-title">
                <label htmlFor="image">Images</label>
                <span></span>
              </div>
              <FileUpload name={'images'} action={setImages} multiple={true} />
            </div>
            <div className="input-wrapper">
              <div className="input-wrapper-title">
                <label>Price</label>
                <span></span>
              </div>
              <input
                type="number"
                placeholder="Enter price"
                min={0}
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
            <div className="input-wrapper">
              <div className="input-wrapper-title">
                <label>Description</label>
                <span></span>
              </div>
              <textarea
                placeholder="Enter ad description"
                rows={5}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className="input-wrapper">
              <div className="input-wrapper-title">
                <label>Ad Type</label>
                <span></span>
              </div>
              <Dropdown name="type" options={adTypesJSON} label="Ad type" action={setAdType} />
            </div>
            <div className="input-wrapper">
              <div className="input-wrapper-title">
                <label>Brand</label>
                <span></span>
              </div>
              <Dropdown name="brand" options={carBrands.sort()} label="Car brand" action={setMake} />
            </div>
            {renderCarModels()}
            {renderInputs()}
            <div className="input-wrapper">
              <div className="input-wrapper-title">
                <label>Condition</label>
                <span></span>
              </div>
              <Dropdown name="condition" options={conditionsJSON} label="Condition" action={setCondition} />
            </div>
            <div className="input-wrapper">
              <div className="input-wrapper-title">
                <label>Location</label>
                <span></span>
              </div>
              <Dropdown name="location" options={locationsJSON} label="Location" action={setLocation} />
            </div>
          </Form>
          <Wrapper start>{renderAdCards()}</Wrapper>
        </Content>
        <Footer />
      </Container>
    </>
  );
};

export default PlacedAdsPage;
