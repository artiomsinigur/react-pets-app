import React from "react";

export default class Carousel extends React.Component {
  state = {
    photos: [],
    active: 0,
  };

  // Get some derived state from props, does some filtering then passe them in the component.
  // Is invoked right before calling the render method, It should return an object to update the state, or null to update nothing.
  static getDerivedStateFromProps({ media }) {
    let photos = ["http://placecorgi.com/600/600"];

    if (media.length) {
      photos = media.map(({ large }) => large);
    }

    return { photos };
  }

  handleIndexClick = (e) => {
    this.setState({ active: +e.target.dataset.index });
  };

  handleKeyPress = (e) => {
    const index = +e.target.dataset.index;
    const ARROW_KEYS = {
      enter: 13,
      space: 32,
    };

    switch (e.keyCode) {
      case ARROW_KEYS.enter:
        this.setState({ active: index });
        break;
      case ARROW_KEYS.space:
        this.setState({ active: index });
        break;
      default:
        break;
    }
  };

  render() {
    const { photos, active } = this.state;

    return (
      <div className="carousel">
        <img src={photos[active]} alt="animal" />
        <div className="carousel-sm" style={{ display: "flex" }}>
          {/* {this.props.media.map((photo, index) => { */}
          {photos.map((photo, index) => {
            return (
              // eslint-disable-next-line
              <img
                // src={photo.large}
                src={photo}
                key={photo}
                alt="animal thumbnail"
                onClick={this.handleIndexClick}
                data-index={index}
                className={index === active ? "active" : ""}
                style={{ width: "150px", opacity: ".8" }}
                tabIndex="0"
                onKeyDown={this.handleKeyPress}
              />
            );
          })}
        </div>
      </div>
    );
  }
}
