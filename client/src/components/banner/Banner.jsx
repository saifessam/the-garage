import { ReactComponent as LocationSVG } from '../../assets/svgs/location.svg';
import { ReactComponent as CallSVG } from '../../assets/svgs/call.svg';
import { ReactComponent as EmailSVG } from '../../assets/svgs/email.svg';
import { ReactComponent as ClockSVG } from '../../assets/svgs/clock.svg';
import { ReactComponent as SlashSVG } from '../../assets/svgs/slash.svg';
import { ReactComponent as DocumentSVG } from '../../assets/svgs/document.svg';
import Button from '../button/Button';
import './styles.css';

const Banner = ({
  type,
  image,
  name,
  location,
  phone,
  email,
  openingTime,
  closingTime,
  offDays,
  year,
  carCondition,
  carType,
  transmition,
  price,
  description,
}) => {
  const imagePath = `/assets/${type}/${image}`;

  const renderAvailability = () => {
    if (openingTime || closingTime) {
      const date = new Date();
      const currentHour = date.getHours();
      const openingHour = parseInt(openingTime.split(':')[0]);
      const closingHour = parseInt(closingTime.split(':')[0]);
      if (openingHour - closingHour === -12) {
        return (
          <>
            <span data-color="green">Always Opened</span>
          </>
        );
      } else if (currentHour >= openingHour && currentHour < closingHour) {
        return (
          <>
            <span data-color="orange">Opened</span>
          </>
        );
      } else {
        return (
          <>
            <span data-color="red">Closed</span>
          </>
        );
      }
    }
  };

  const to24hrForm = (time) => {
    let intTime = parseInt(time);
    if (intTime > 12) {
      return `${intTime - 12}:00 PM`;
    } else {
      if (time === '00:00') {
        return `12:00 AM`;
      } else {
        return `${time} AM`;
      }
    }
  };

  const handleOffDays = () => {
    if (offDays) {
      return offDays.map((day) => {
        return `${day} `;
      });
    } else {
      return 'None';
    }
  };

  const handleCTA = () => {
    if (type === 'center' || type === 'showroom') {
      return (
        <Button data={'action'} href={`tel: ${phone}`}>
          Contact for reservation
        </Button>
      );
    } else if (type === 'car') {
      if (carCondition === 'new') {
        return <Button>Procced to buy</Button>;
      } else {
        return <Button href={`tel: ${phone}`}>Contact owner</Button>;
      }
    } else if (type === 'spare') {
      return <Button>Add to cart</Button>;
    }
  };

  return (
    <div className="banner" style={{ backgroundImage: `url(${imagePath})` }}>
      <div className="banner-details">
        <h2>{name}</h2>
        <div className="banner-details-sections">
          <div className="banner-details-section">
            <span style={{ textTransform: 'capitalize' }}>
              <LocationSVG />
              {location}
            </span>
            <a href={`tel:${phone}`}>
              <CallSVG />
              +2{phone}
            </a>
            <a href={`mailto:${email}`}>
              <EmailSVG />
              {email}
            </a>
          </div>
          <div className="banner-details-section">
            <span>
              <ClockSVG />
              {to24hrForm(openingTime)} - {to24hrForm(closingTime)} &nbsp;•{renderAvailability()}
            </span>
            <span style={{ textTransform: 'capitalize' }}>
              <SlashSVG />
              {handleOffDays()}
            </span>
            <span>
              <DocumentSVG />
              {description}
            </span>
          </div>
        </div>
        {handleCTA()}
      </div>
    </div>
  );
};

export default Banner;
