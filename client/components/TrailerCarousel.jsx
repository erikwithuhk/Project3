import React, { Component } from 'react';
import request from 'superagent';

const propTypes = {
  userID: React.PropTypes.string,
  trailers: React.PropTypes.array,
  header: React.PropTypes.string,
};

class TrailerCarousel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentTrailerIndex: 0,
      currentTrailerHeight: '',
    };
    this.getVideoEmbedCode = this.getVideoEmbedCode.bind(this);
    this.handleCarouselButton = this.handleCarouselButton.bind(this);
    this.handleAddTrailer = this.handleAddTrailer.bind(this);
    this.handleBlockTrailer = this.handleBlockTrailer.bind(this);
    this.handleResize = this.handleResize.bind(this);
  }
  componentDidMount() {
    window.addEventListener('resize', this.handleResize);
    this.handleResize();
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
  }
  getVideoEmbedCode() {
    if (this.props.trailers[this.state.currentTrailerIndex]) {
      const currentTrailer = this.props.trailers[this.state.currentTrailerIndex];
      const videoHostDomain = 'https://www.youtube.com/embed/';
      const currentTrailerKey = currentTrailer.videoKey;
      const videoHostOptions = '?autoplay=1&controls=0&showinfo=0&autohide=1';
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
  handleResize(e) {
    const currentTrailerNode = document.querySelector('.current-trailer_li');
    this.setState({ currentTrailerHeight: currentTrailerNode.offsetHeight });
  }
  generatePreviousPoster() {
    if (this.props.trailers !== []) {
      return (
        <div
          className="trailer_container previous-trailer_container"
          // style={{ backgroundImage: `url(\'http://image.tmdb.org/t/p//w500//${this.props.trailers[this.state.currentTrailerIndex].backdrop_path}\')` }}
        />
      );
    }
    return (<div />);
  }
  generateNextPoster() {
    if (this.props.trailers !== []) {
      return (
        <div
          className="trailer_container next-trailer_container"
          // style={{ backgroundImage: `url(\'http://image.tmdb.org/t/p//w500//${this.props.trailers[this.state.currentTrailerIndex].backdrop_path}\')` }}
        />
      );
    }
    return (<div />);
  }
  generateTrailerTitle() {
    if (this.props.trailers.length) {
      return `${this.props.trailers[this.state.currentTrailerIndex].title}`;
    }
    return '';
  }
  handleCarouselButton(e) {
    document.querySelector('.heart').setAttribute('class', 'heart');
    document.querySelector('.broken-heart').setAttribute('class', 'broken-heart');
    let { currentTrailerIndex } = this.state;
    if (e.target.getAttribute('class') === 'next') {
      currentTrailerIndex = this.advanceIndex(currentTrailerIndex);
    } else if (e.target.getAttribute('class') === 'prev') {
      currentTrailerIndex = this.reverseIndex(currentTrailerIndex);
    }
    this.setState({ currentTrailerIndex });
  }
  advanceIndex(index) {
    if (index >= this.props.trailers.length - 1) {
      return 0;
    }
    return index + 1;
  }
  reverseIndex(index) {
    if (index <= 0) {
      return this.props.trailers.length - 1;
    }
    return index - 1;
  }
  handleAddTrailer(e) {
    e.preventDefault();
    e.target.setAttribute('class', 'heart liked');
    const trailerData = {
      tmdbID: this.props.trailers[this.state.currentTrailerIndex].tmdbID,
      mediaType: this.props.trailers[this.state.currentTrailerIndex].mediaType,
      title: this.props.trailers[this.state.currentTrailerIndex].title,
      blocked: false,
      users_id: this.props.userID,
    };
    request.post(`/api/users/${this.props.userID}/trailers`)
           .send(trailerData)
           .then(() => 'Trailer added!')
           .catch(err => err);
  }
  handleBlockTrailer(e) {
    e.preventDefault();
    e.target.setAttribute('class', 'broken-heart blocked');
  }
  render() {
    return (
      <div className="carousel-container">
        <section className="carousel">
          <h3 className="carousel_header" >{this.props.header}</h3>
          <ul className="carousel" style={{ height: `${this.state.currentTrailerHeight}px` }}>
            <li className="previous-trailer_li">
              {this.generatePreviousPoster()}
            </li>
            <li className="current-trailer_li">
              <div className="trailer_container current-trailer_container">
                {this.getVideoEmbedCode(this.state.currentTrailer)}
                <button className="heart" onClick={this.handleAddTrailer} />
                <button className="broken-heart" onClick={this.handleBlockTrailer} />
              </div>
              <button className="prev" onClick={this.handleCarouselButton} >&lt;</button>
              <button className="next" onClick={this.handleCarouselButton} >&gt;</button>
            </li>
            <li className="next-trailer_li">
              {this.generateNextPoster()}
            </li>
          </ul>
        </section>
        <h4 className="current-trailer_title">{this.generateTrailerTitle()}</h4>
      </div>
      );
  }
}

TrailerCarousel.propTypes = propTypes;

export default TrailerCarousel;
