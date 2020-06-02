import React from "react";
import { Link } from "@reach/router";

// const handleKeyPress = (e) => {
//   if (/13|32/.test(e.keyCode)) alert("Pressed enter key");
// };

export default function Pet({ id, animal, name, breed, location, media }) {
  let hero = "http://placecorgi.com/300/300";
  if (media.length) {
    hero = media[0].small;
  }

  return (
    <Link to={`/details/${id}`} className="pet">
      <div className="pet-header">
        <img src={hero} alt={name} />
      </div>
      <div className="pet-body">
        <h2 className="pet-name">{name}</h2>
        <span className="pet-type">{animal}</span>
        <span className="pet-breed">{breed}</span>
        <span className="pet-address">{location}</span>
      </div>
    </Link>
  );
}
