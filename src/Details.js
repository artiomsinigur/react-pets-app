import React from "react";
import pet from "@frontendmasters/pet";
import { navigate } from "@reach/router";
import Carousel from "./Carousel";
import ErrorBoundary from "./ErrorBoundaries";
import { ThemeContext } from "./ThemeContext";

class Details extends React.Component {
  state = { loading: true, showModal: false };

  componentDidMount() {
    pet.animal(this.props.id).then(({ animal }) => {
      this.setState({
        url: animal.url,
        name: animal.name,
        type: animal.type,
        age: animal.age,
        breed: animal.breeds.primary,
        location: `${animal.contact.address.city} ${animal.contact.address.state}`,
        email: animal.contact.email,
        description: animal.description,
        media: animal.photos,
        loading: false,
      });
    }, console.error);
  }

  toggleModal = () => this.setState({ showModal: !this.state.showModal });
  adopt = () => navigate(this.state.url);

  render() {
    if (this.state.loading) {
      return <h4>Loading...</h4>;
    }

    const {
      name,
      type,
      age,
      breed,
      location,
      email,
      description,
      media,
      showModal,
    } = this.state;

    return (
      <div className="pet-details">
        <Carousel media={media} />
        <h1>{name}</h1>
        <h2>{`${type} - ${breed} - ${location}`}</h2>

        <ThemeContext.Consumer>
          {([theme]) => (
            <button
              style={{ backgroundColor: theme }}
              onClick={this.toggleModal}
            >
              Adobt {name}
            </button>
          )}
        </ThemeContext.Consumer>

        <hr />
        <span>{age} |</span>
        <span>{email}</span>
        <p>{description}</p>
        {showModal ? (
          <div>
            <h1>Would you like to adopt {name}?</h1>
            <div className="button-group">
              <button onClick={this.adopt}>Yes</button>
              <button onClick={this.toggleModal}>
                No, I am not ready yet! :(
              </button>
            </div>
          </div>
        ) : null}
      </div>
    );
  }
}

export default function DetailsWithErrorBondary(props) {
  return (
    <ErrorBoundary>
      <Details {...props} />
    </ErrorBoundary>
  );
}
