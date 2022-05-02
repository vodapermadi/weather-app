import React, { useState } from "react";
import { Card } from "react-bootstrap";
import "../style/scripts.css";
import axios from "axios";

const CardComponent = () => {
  const [data, setData] = useState({});
  const [location, setLocation] = useState("");
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=c9d2d0fda7502ad656a8e1cadde53285`;

  const findLocation = (event) => {
    if (event.key === "Enter") {
      axios
        .get(url)
        .then((result) => {
          setData(result.data);
          console.log(result.data.name);
        })
        .catch((err) => {
          console.log(err);
        });

      setLocation("");
    }
  };

  return (
    <div className="container mt-5 primaryContainer">
      <Card border="light" className="pb-5 shadow-lg CardBody1 rounded-pill">
        <Card.Header className="header1 rounded-pill shadow px-5 py-3">
          <input
            className="form-control text-center fs-5 shadow-sm rounded-pill p-2"
            type="text"
            placeholder="Input your city"
            onKeyPress={findLocation}
            onChange={(event) => setLocation(event.target.value)}
            value={location}
          />
        </Card.Header>
        <Card.Body className="my-3 mx-5">
          <div className="container text-center text-white">
            <div className="top">
              <div className="location fs-4">
                {data.name && data.sys.country
                  ? data.name + " / " + data.sys.country
                  : "--"}
              </div>
              <div className="temprature fs-1">
                {data.main
                  ? (data.main.temp - 273.15).toFixed() + "°C"
                  : "-- °C"}
              </div>
              <div className="feels_like">
                Fells like
                <h1>
                  {data.main
                    ? (data.main.feels_like - 273.15).toFixed() + "°C"
                    : "-- °C"}
                </h1>
              </div>
              <div className="desc">
                {data.weather ? data.weather[0].main : "--"}
              </div>
            </div>
          </div>
        </Card.Body>
        <Card.Footer className="text-center shadow rounded-pill">
          created VodaPermadi
        </Card.Footer>
      </Card>
    </div>
  );
};

export default CardComponent;
