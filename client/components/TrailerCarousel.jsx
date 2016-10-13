import React, { Component } from 'react';

const propTypes = {
  currentUser: React.PropTypes.object,
  trailers: React.PropTypes.array,
  header: React.PropTypes.string,
};

class TrailerCarousel extends Component {
  constructor() {
    super();
    this.state = {
      currentTrailerIndex: 0,
      previousTrailerIndex: 0,
      nextTrailerIndex: 0,
      currentTrailer: '',
      currentTrailerTitle: '',
      carouselHeight: 0,
      header: '',
    };
    this.getVideoEmbedCode = this.getVideoEmbedCode.bind(this);
    this.handleCarouselButton = this.handleCarouselButton.bind(this);
    this.handleAddLoveMovie = this.handleAddLoveMovie.bind(this);
    this.handleAddLoveMovieClick = this.handleAddLoveMovieClick.bind(this);
    this.handleAddHateMovie = this.handleAddHateMovie.bind(this);
    this.handleAddHateMovieClick = this.handleAddHateMovieClick.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    const previousTrailerIndex = (nextProps.trailers.length - 1) || 0;
    const currentTrailerIndex = this.state.currentTrailerIndex || 0;
    const currentTrailer = nextProps.trailers[currentTrailerIndex];
    const nextTrailerIndex = currentTrailerIndex + 1 || 1;
    this.setState({
      previousTrailerIndex,
      previousTrailerImage: nextProps.trailers[previousTrailerIndex].backdrop_path || '',
      currentTrailerIndex,
      currentTrailer: currentTrailer || 0,
      currentTrailerTitle: currentTrailer.title || '',
      nextTrailerIndex,
      nextTrailerImage: nextProps.trailers[nextTrailerIndex].backdrop_path || '',
      header: nextProps.header,
    });
  }
  getVideoEmbedCode(trailer = this.state.currentTrailer) {
    if (trailer) {
      const videoHostDomain = 'https://www.youtube.com/embed/';
      const currentTrailerKey = trailer.videoKey;
      const videoHostOptions = '?controls=0&showinfo=0&autohide=1&start=0';
      // const videoHostOptions = '?autoplay=1&controls=0&showinfo=0&autohide=1&start=0';
      const currentTrailerURL = `${videoHostDomain}${currentTrailerKey}${videoHostOptions}`;
      return (
        <iframe
          src={currentTrailerURL}
          frameBorder="0"
          allowFullScreen
        />
      );
    }
    return 'Loading';
  }
  setCurrentTrailer() {
    this.setState({ currentTrailer: this.props.trailers[this.state.currentTrailerIndex] });
  }
  handleCarouselButton(e) {
    let { previousTrailerIndex, currentTrailerIndex, nextTrailerIndex } = this.state;
    const indices = [previousTrailerIndex, currentTrailerIndex, nextTrailerIndex];
    let nextIndices;
    if (e.target.getAttribute('class') === 'next') {
      nextIndices = this.advanceIndices(indices);
    } else if (e.target.getAttribute('class') === 'prev') {
      nextIndices = this.reverseIndices(indices);
    }
    [previousTrailerIndex, currentTrailerIndex, nextTrailerIndex] = nextIndices;
    const nextState = {
      previousTrailerIndex,
      currentTrailerIndex,
      currentTrailer: this.props.trailers[currentTrailerIndex],
      nextTrailerIndex,
    };
    this.setState(nextState);
  }
  advanceIndices(indices) {
    return indices.map((index) => {
      if (index >= this.props.trailers.length - 1) {
        return 0;
      }
      return index + 1;
    });
  }
  reverseIndices(indices) {
    return indices.map((index) => {
      if (index <= 0) {
        return this.props.trailers.length - 1;
      }
      return index - 1;
    });
  }
  handleAddLoveMovie() {
   request.post(`/api/users/${this.props.currentUser.id}/trailers`)
           .send(this.state)
           .then((response) => {
            const updated = response.body;
              console.log(updated);
             this.setState(updated);
      });
  }
  handleAddLoveMovieClick(e) {
    e.preventDefault();
    this.handleAddLoveMovie();
  }
  handleAddHateMovie() {
    request.post(`/api/users/${this.props.currentUser.id}/trailers`)
           .send(this.state)
           .then((response) => {
            const updated = response.body;
              console.log(updated);
             this.setState(updated);
      });
  }
  handleAddHateMovieClick(e) {
    e.preventDefault();
    this.handleAddHateMovie();
  }
  componentDidMount() {
    const carouselHeight = document.querySelector('.current-trailer_li').offsetHeight;
    this.setState({
      carouselHeight,
    });
  }
  render() {
    const videoEmbedCode = this.getVideoEmbedCode(this.state.currentTrailer);
    return (
      <div className="carousel-container">
        <section
          className="carousel"
        >
          <h3 className="carousel_header" >{this.props.header}</h3>
          <ul className="carousel">
            <li className="previous-trailer_li">
              <div
                className="trailer_container previous-trailer_container"
                style={{ backgroundImage: `url(\'http://image.tmdb.org/t/p//w500//${this.state.previousTrailerImage}\')` }}
              />
            </li>
            <li className="current-trailer_li">
              <div className="trailer_container current-trailer_container">
                {videoEmbedCode}
                <button className="heart" onClick={this.handleAddLoveMovieClick} />
                <button className="broken-heart" onClick={this.handleAddLoveMovieClick} />
              </div>
              <h4 className="current-trailer_title">{this.state.currentTrailerTitle}</h4>
            </li>
            <li className="next-trailer_li">
              <div
                className="trailer_container next-trailer_container"
                style={{ backgroundImage: `url(\'http://image.tmdb.org/t/p//w500/${this.state.nextTrailerImage}\')` }}
              />
            </li>
            <li className="spacer"><div className="spacer-div" >&nbsp;</div></li>
          </ul>
        </section>
        <div className="carousel-buttons">
          <button className="prev" onClick={this.handleCarouselButton} >&lt;</button>
          <button className="next" onClick={this.handleCarouselButton} >&gt;</button>
        </div>
      </div>
      );
  }
}

TrailerCarousel.propTypes = propTypes;

export default TrailerCarousel;
