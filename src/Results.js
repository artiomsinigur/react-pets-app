import React from "react";
import Pet from "./Pet";

export default function Results({ pets }) {
  return (
    <div className="results">
      {!pets.length ? (
        <h1>No pets found</h1>
      ) : (
        pets.map((pet) => {
          return <Pet
            key={pet.id}
            id={pet.id}
            animal={pet.type}
            name={pet.name}
            breed={pet.breeds.primary}
            media={pet.photos}
            location={`${pet.contact.address.city}, ${pet.contact.address.state}`}
          />;
        })
      )}
    </div>
  );
}
