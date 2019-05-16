import React from 'react';

//reusable functional component to enter some text with a label
export default function InputComponent(props) {
  return (
    <fieldset>
      <legend>{props.label}</legend>
      <input type="text"
        onChange={props.onChange}
        //eslint-disable-next-line no-unused-expressions
        ref={(elem) => { props.onRef }}
      />
      <button onClick={props.onClick}>Go</button>
    </fieldset>
  )
}