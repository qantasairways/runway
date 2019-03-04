import * as React from 'react';

const pickIndex = (...arr) => arr.find(index => index !== -1);

export default class SelectOnKeyPressContainer extends React.Component {
  state = { history: [] };

  itemString = item => {
    const { itemToString } = this.props;
    return itemToString ? itemToString(item) : String(item);
  };

  find = query =>
    this.props.items.findIndex((item, index) => {
      const lowercase = this.itemString(item)
        .trim()
        .toLowerCase();
      const lowercaseQuery = query.toLowerCase();

      return lowercase.startsWith(lowercaseQuery);
    });

  keyPress = event => {
    const { focus, downshiftProps } = this.props;
    const lastHistory = this.state.history;
    const {
      isOpen,
      highlightedIndex,
      setHighlightedIndex,
      openMenu
    } = downshiftProps;

    if (!isOpen) openMenu();
    if (isOpen || focus) {
      const key = String(event.key);
      const history = [...lastHistory, key];
      const spaced = [...lastHistory, ' ', key];

      // Try finding a match. Firstly, using the key press history
      // Otherwise, try adding a space or just with the last pressed key
      const indexHistory = this.find(history.join(''));
      const indexSpaced = indexHistory !== -1 ? -1 : this.find(spaced.join(''));
      const indexKey = indexSpaced !== -1 ? -1 : this.find(key);
      const index = pickIndex(indexHistory, indexKey, indexSpaced);

      // If history search didn't find anything, reset history
      const resetHistory = indexSpaced !== -1 ? spaced : [key];
      this.setState({ history: indexHistory !== -1 ? history : resetHistory });

      if (index >= 0 && index !== highlightedIndex) {
        setHighlightedIndex(index);
        if (!isOpen) openMenu();
      }
    }
  };

  componentWillUnmount() {
    document.removeEventListener('keypress', this.keyPress, true);
  }

  componentDidMount() {
    document.addEventListener('keypress', this.keyPress, true);
  }

  render() {
    return this.props.children;
  }
}
