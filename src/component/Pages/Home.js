import { Image, Col, Row, Button } from "react-bootstrap";
import "./Home.css";

let tourdates = [
  {
    id: 11,
    date: "JUL 16",
    title: "DETROIT, MI",
    des: "DTE ENERGY MUSIC THEATRE",
  },
  {
    id: 12,
    date: "JUL 19",
    title: "TORONTO,ON",
    des: "BUDWEISER STAGE",
  },
  {
    id: 13,
    date: "JUL 22",
    title: "BRISTOW, VA",
    des: "JIGGY LUBE LIVE",
  },
  {
    id: 14,
    date: "JUL 29",
    title: "PHOENIX, AZ",
    des: "AK-CHIN PAVILION",
  },
  {
    id: 15,
    date: "AUG 2",
    title: "LAS VEGAS, NV",
    des: "T-MOBILE ARENA",
  },
  {
    id: 16,
    date: "AUG 7",
    title: "CONCORD, CA",
    des: "CONCORD PAVILION",
  },
];

function Home() {
  return (
    <div>
      <div className="text-white title-1">
        <h1 className="text-center">The Generics</h1>
        <span>
          <h3 className="heading">Get our Latest Album</h3>
        </span>
        <div className="ply-button">
          <Image
            src="https://skrimenko.kiev.ua/wp-content/uploads/icons8-play-button-circled-unscreen.gif"
            alt="play-button"
          />
        </div>
      </div>
      <div className="home-container">
        <span className="text-center">TOUR</span>
      </div>
      <div className="parent">
        <Col className="tour-row">
          {tourdates.map((date) => (
            <Row key={date.id} md={4} className="tour-box">
              <div className="tour-item">
                <div className="tour-date">{date.date}</div>
                <div className="tour-title">{date.title}</div>
                <div className="tour-des">{date.des}</div>
                <Button className="but-button">Buy Tickets</Button>
              </div>
            </Row>
          ))}
        </Col>
      </div>
    </div>
  );
}
export default Home;
