import { useState } from "react";

const inputStyle = {
  width: "30px",
};

const inputContainer = {
  width: "25%",
  margin: "auto",
};

export default function CreatePin() {
  const [pin, setPin] = useState({});

  const addPin = (event) => {
    if (event.target.value) {
      const nextSibling = document.getElementById(
        `pin-${parseInt(event.target.name, 10) + 1}`
      );

      if (nextSibling !== null) {
        nextSibling.focus();
      }
    }

    setPin({ ...pin, [`pin${event.target.name}`]: event.target.value });
  };

  const handleSubmit = () => {
    const allPin =
      pin.pin1 + pin.pin2 + pin.pin3 + pin.pin4 + pin.pin5 + pin.pin6;
    console.log(allPin);
  };

  return (
    <div className="container text-center">
      <h1>Handle Create Pin</h1>
      <div className="mt-3">
        <div style={inputContainer}>
          <div className="row">
            <div className="col-2">
              <input
                style={inputStyle}
                maxLength="1"
                onChange={(event) => addPin(event)}
                name="1"
                id="pin-1"
              />
            </div>
            <div className="col-2">
              <input
                style={inputStyle}
                maxLength="1"
                onChange={(event) => addPin(event)}
                name="2"
                id="pin-2"
              />
            </div>
            <div className="col-2">
              <input
                style={inputStyle}
                maxLength="1"
                onChange={(event) => addPin(event)}
                name="3"
                id="pin-3"
              />
            </div>
            <div className="col-2">
              <input
                style={inputStyle}
                maxLength="1"
                onChange={(event) => addPin(event)}
                name="4"
                id="pin-4"
              />
            </div>
            <div className="col-2">
              <input
                style={inputStyle}
                maxLength="1"
                onChange={(event) => addPin(event)}
                name="5"
                id="pin-5"
              />
            </div>
            <div className="col-2">
              <input
                style={inputStyle}
                maxLength="1"
                onChange={(event) => addPin(event)}
                name="6"
                id="pin-6"
              />
            </div>
          </div>
        </div>
      </div>
      <button
        type="button"
        className="btn btn-primary mt-3"
        onClick={handleSubmit}
      >
        Submit
      </button>
      <hr />
      <h1>Handle Styling Image</h1>
    </div>
  );
}
