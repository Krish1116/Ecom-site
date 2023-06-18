import { MDBFooter } from "mdb-react-ui-kit";
import "./Footer.css";
import { Image } from "react-bootstrap";
import ytlogo from "../Data/ytlogo.jpg";

function Footer() {
  return (
    <MDBFooter className="footer">
      <div className="footer-title">The Generics</div>
      <div className="img-container">
        <a
          href="https://www.youtube.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image src={ytlogo} alt="yt-logo" className="imgs-icon" />
        </a>
        <a
          href="https://open.spotify.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            src="https://raw.githubusercontent.com/prasadyash2411/ecom-website/main/img/Spotify%20Logo.png"
            alt="spotify-logo"
            className="imgs-icon"
          />
        </a>
        <a
          href="https://www.facebook.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            src="https://raw.githubusercontent.com/prasadyash2411/ecom-website/main/img/Facebook%20Logo.png"
            alt="fb-logo"
            className="imgs-icon"
          />
        </a>
      </div>
    </MDBFooter>
  );
}

export default Footer;
