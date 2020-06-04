import React from "react";
import { render, cleanup, fireEvent } from "@testing-library/react";
import pet, { ANIMALS, _breeds, _dogs } from "@frontendmasters/pet";
import SearchParams from "../SearchParams";

afterEach(cleanup);

test("SearchParams", async () => {
  const { container, getByTestId, getByText } = render(<SearchParams />);

  const animalDropdown = getByTestId("use-dropdown-animal");
  expect(animalDropdown.children.length).toEqual(ANIMALS.length + 1); // + 1 is for <option>All</option>

  expect(pet.breeds).toHaveBeenCalled(); // The API was beed called
  const breedDropdown = getByTestId("use-dropdown-breed");
  expect(breedDropdown.children.length).toEqual(_breeds.length + 1);

  const searchResults = getByTestId("results");
  expect(searchResults.textContent).toEqual("No pets found");
  fireEvent(getByText("Send"), new MouseEvent("click")); // If we click
  expect(pet.animals).toHaveBeenCalled(); // Call the API
  expect(searchResults.children.length).toEqual(_dogs.length);

  expect(container.firstChild).toMatchInlineSnapshot(`
    <div
      class="search-params"
    >
      <form>
        <div>
          <label
            for="location"
          >
            Location
            <input
              id="location"
              placeholder="Location"
              type="text"
              value="Seattle . WA"
            />
          </label>
        </div>
        <div>
          <label
            for="use-dropdown-animal"
          >
            Animal
            <select
              data-testid="use-dropdown-animal"
              id="use-dropdown-animal"
              name="use-dropdown-animal"
            >
              <option>
                All
              </option>
              <option
                value="dog"
              >
                dog
              </option>
              <option
                value="cat"
              >
                cat
              </option>
              <option
                value="bird"
              >
                bird
              </option>
            </select>
          </label>
        </div>
        <div>
          <label
            for="use-dropdown-breed"
          >
            Breed
            <select
              data-testid="use-dropdown-breed"
              id="use-dropdown-breed"
              name="use-dropdown-breed"
            >
              <option>
                All
              </option>
              <option
                value="Bichon Frise"
              >
                Bichon Frise
              </option>
              <option
                value="Bolognese"
              >
                Bolognese
              </option>
              <option
                value="Bolonka"
              >
                Bolonka
              </option>
              <option
                value="Coton de Tulear"
              >
                Coton de Tulear
              </option>
              <option
                value="Havanese"
              >
                Havanese
              </option>
              <option
                value="Lowchen"
              >
                Lowchen
              </option>
              <option
                value="Maltese"
              >
                Maltese
              </option>
            </select>
          </label>
          <label
            for="theme"
          >
            <select
              id="theme"
              name="theme"
            >
              <option
                value="green"
              >
                Green
              </option>
              <option
                value="darkblue"
              >
                Darkblue
              </option>
              <option
                value="tomato"
              >
                Tomato
              </option>
            </select>
          </label>
        </div>
        <button
          style="background-color: green;"
          type="submit"
        >
          Send
        </button>
      </form>
    </div>
  `);
});
