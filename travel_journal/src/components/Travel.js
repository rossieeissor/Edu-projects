export default function Travel(props) {
  return (
    <div className="travel">
      <img
        src={props.travel.imageUrl}
        alt="location img"
        className="travel--img"
      />
      <div className="travel--info">
        <div className="travel--location">
          <img
            src="images/location_logo.png"
            alt="location_logo"
            className="travel--location-logo"
          />
          <span className="travel--location-country">
            {props.travel.location.toUpperCase()}
          </span>
          <a
            href={props.travel.googleMapsUrl}
            className="travel--google-link"
            target="_blank"
            rel="noreferrer"
          >
            View on Google Maps
          </a>
        </div>
        <h1 className="travel--title">{props.travel.title}</h1>
        <h3 className="travel--dates  ">{`${props.travel.startDate} - ${props.travel.endDate}`}</h3>
        <p className="travel--description">{props.travel.description}</p>
      </div>
    </div>
  );
}
