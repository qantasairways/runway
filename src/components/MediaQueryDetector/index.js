import React from 'react';
import PropTypes from 'prop-types';

class MediaQueryDetector extends React.Component {
  static propTypes = {
    children: PropTypes.func.isRequired,
    query: PropTypes.string.isRequired
  };

  static extract = query => query.replace('@media', '');

  state = {
    matches: window.matchMedia(MediaQueryDetector.extract(this.props.query))
      .matches
  };

  update = evt => this.setState({ matches: evt.matches });

  componentWillMount = () => {
    const { query } = this.props;
    this.mediaQueryList = window.matchMedia(MediaQueryDetector.extract(query));
    this.mediaQueryList.addListener(this.update);
  };

  componentWillUnmount = () => this.mediaQueryList.removeListener(this.update);

  render = () => {
    const { children } = this.props;
    const { matches } = this.state;
    return children(matches);
  };
}

export const withMediaQueryDetector = (Component, query) => props => (
  <MediaQueryDetector query={query}>
    {matchesQuery => <Component matchesQuery={matchesQuery} {...props} />}
  </MediaQueryDetector>
);

export default MediaQueryDetector;
