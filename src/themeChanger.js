import React from 'react';

const styles = {
  floaterStyle : {
    position: "absolute",
    top: 0,
    right:0
  }
};

class ThemeChanger extends React.Component {

  render() {
    return (
        <div style={styles.floaterStyle}>
          Theme: 
          <select onChange={ (e)=> { this.props.onChange(e.nativeEvent.target.value)} }>
            <option>Red</option><option>Blue</option>
          </select>
        </div>
    );
  }
}

export default ThemeChanger;