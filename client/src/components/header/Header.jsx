import './styles.css';

const Header = ({ children }) => {
  return (
    <header>
      <video src={'/assets/videos/background.mp4'} className="header-background" autoPlay loop muted></video>
      <div className="header-title">
        <span id="greeting">
          Welcome to&nbsp;<h1>THE GARAGE</h1>&nbsp;,
        </span>
        <span>to start please choose which services you need.</span>
      </div>
      <div className="header-services">{children}</div>
    </header>
  );
};

export default Header;
