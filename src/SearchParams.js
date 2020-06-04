import React, { useState, useEffect, useContext, Fragment } from "react";
import pet, { ANIMALS } from "@frontendmasters/pet"; // API
import useDropdown from "./useDropdown";
import Results from "./Results";
import { ThemeContext } from "./ThemeContext";

export default function SearchParams() {
  const [location, setLocation] = useState("Seattle . WA");
  // const [animal, setAnimal] = useState("dog");
  const [breeds, setBreeds] = useState([]);
  const [animal, AnimalDropdown] = useDropdown("Animal", "dog", ANIMALS);
  const [breed, BreedDropdown, setBreed] = useDropdown("Breed", "", breeds);
  const [pets, setPets] = useState([]);
  const [theme, setTheme] = useContext(ThemeContext);

  const [_, setFoo] = useState("foo"); // eslint-disable-line

  // Fetch animals when click submit button
  const handleFetchPets = (e) => {
    e.preventDefault();
    pet
      .animals({
        location,
        breed,
        type: animal,
      })
      .then(({ animals }) => {
        setPets(animals || []);
      });
  };

  // useEffect not will fire on the first render
  useEffect(() => {
    setBreeds([]);
    setBreed("");

    // Fetch breeds on beginning of application
    pet.breeds(animal).then(
      (api) => {
        const breedStrings = api.breeds.map(({ name }) => name);
        setBreeds(breedStrings);
      },
      (error) => console.error(error)
    );
  }, [animal, setBreed, setBreeds]); // to run only once write []

  return (
    <Fragment>
      <div className="search-params">
        <form onSubmit={handleFetchPets}>
          <div>
            <label htmlFor="location">
              Location
              <input
                type="text"
                id="location"
                placeholder="Location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </label>
          </div>
          <div>
            {/* <label htmlFor="animal">
              Select by animal
              <select
                name="animal"
                id="animal"
                value={animal}
                onChange={(e) => setAnimal(e.target.value)}
                onBlur={(e) => setAnimal(e.target.value)}
              >
                <option>All</option>
                {ANIMALS.map((elm, i) => (
                  <option key={i} value={elm}>
                    {elm}
                  </option>
                ))}
              </select>
            </label> */}

            {/* Now we can replace with custom hook */}
            <AnimalDropdown />
          </div>
          <div>
            <BreedDropdown />
            <label htmlFor="theme">
              <select
                value={theme}
                name="theme"
                id="theme"
                onChange={(e) => setTheme(e.target.value)}
                onBlur={(e) => setTheme(e.target.value)}
              >
                <option value="green">Green</option>
                <option value="darkblue">Darkblue</option>
                <option value="tomato">Tomato</option>
              </select>
            </label>
          </div>
          <button type="submit" style={{ backgroundColor: theme }}>
            Send
          </button>
        </form>
      </div>

      <Results pets={pets} />
    </Fragment>
  );
}
