"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

const Home = () => {
  const [humidityData, sethumidityData] = useState([]);
  const [tempData, settempData] = useState([]);
  const [weatherData, setweatherData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://data.bmkg.go.id/DataMKG/MEWS/DigitalForecast/DigitalForecast-JawaTimur.xml",
          {
            responseType: "text", // Ensure the response is treated as text
          }
        );

        const xmlData = response.data;
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(xmlData, "text/xml");

        // Find the <area> element with id="501294"
        const areaElement = xmlDoc.querySelector('area[id="501294"]');

        if (areaElement) {
          // Find the <parameter> element inside the <area> element
          const humidityElement =
            areaElement.querySelector('parameter[id="hu"]');

          if (humidityElement) {
            // Find all <timerange> elements inside the <parameter> element
            const timerangeHumidity =
              humidityElement.querySelectorAll("timerange");

            // Extract and store the 'datetime' and 'value' of each <timerange> element
            const humidityValues = Array.from(timerangeHumidity).map(
              (timerangeElement) => ({
                datetime: formatDate(timerangeElement.getAttribute("datetime")),
                value: timerangeElement.querySelector("value").textContent,
              })
            );

            sethumidityData(humidityValues);
          } else {
            setError(
              'No <parameter> element with id="hu" found inside the <area> element'
            );
          }

          const tempElement = areaElement.querySelector('parameter[id="t"]');

          if (tempElement) {
            // Find all <timerange> elements inside the <parameter> element
            const timerangetemp = tempElement.querySelectorAll("timerange");

            // Extract and store the 'datetime' and 'value' of each <timerange> element
            const tempValues = Array.from(timerangetemp).map(
              (timerangeElement) => ({
                datetime: formatDate(timerangeElement.getAttribute("datetime")),
                value: timerangeElement.querySelector("value").textContent,
              })
            );

            settempData(tempValues);
          } else {
            setError(
              'No <parameter> element with id="t" found inside the <area> element'
            );
          }

          const weatherElement = areaElement.querySelector(
            'parameter[id="weather"]'
          );

          if (weatherElement) {
            // Find all <timerange> elements inside the <parameter> element
            const timerangeweather =
              weatherElement.querySelectorAll("timerange");

            // Extract and store the 'datetime' and 'value' of each <timerange> element
            const weatherValues = Array.from(timerangeweather).map(
              (timerangeElement) => ({
                datetime: formatDate(timerangeElement.getAttribute("datetime")),
                value: timerangeElement.querySelector("value").textContent,
              })
            );

            setweatherData(weatherValues);
          } else {
            setError(
              'No <parameter> element with id="weather" found inside the <area> element'
            );
          }
        } else {
          setError('No <area> element with id="501294" found');
        }

        setIsLoading(false);
      } catch (error) {
        setError(error.message);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const formatDate = (datetime) => {
    const year = datetime.substring(0, 4);
    const month = datetime.substring(4, 6);
    const day = datetime.substring(6, 8);
    const hour = datetime.substring(8, 10);
    const minute = datetime.substring(10, 12);
    return `${day}-${month}-${year} ${hour}:${minute}:00`;
  };

  return (
    <div className="container-fluid">
      {/* Navbar */}
      <Navbar/>
      {/* End Navbar */}
      <h2 className="mt-3 text-center">Automatic Farming Management System</h2>
      {isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        <div>
          <h2>Prakiraan Cuaca Ngawi:</h2>

          <div className="row">
            {tempData.map((tempValue, index) => (
              <div key={index} className="col-lg-4 col-md-6 mb-4">
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">
                      Datetime: {tempValue.datetime}
                    </h5>
                    <p className="card-text">
                      Kelembapan : {humidityData[index].value}%<br />
                      Suhu: {tempValue.value}°C
                      <br />
                      Cuaca: {weatherData[index].value}
                      <br />
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <h5 className="ms-3">Informasi :</h5>
          <p className="ms-3">
            0 : Cerah / Clear Skies <br />
            1 : Cerah Berawan / Partly Cloudy <br />
            2 : Cerah Berawan / Partly Cloudy <br />
            3 : Berawan / Mostly Cloudy
            <br />
            4 : Berawan Tebal / Overcast
            <br />
            5 : Udara Kabur / Haze
            <br />
            10 : Asap / Smoke
            <br />
            45 : Kabut / Fog
            <br />
            60 : Hujan Ringan / Light Rain
            <br />
            61 : Hujan Sedang / Rain
            <br />
            63 : Hujan Lebat / Heavy Rain
            <br />
            80 : Hujan Lokal / Isolated Shower
            <br />
            95 : Hujan Petir / Severe Thunderstorm
            <br />
            97 : Hujan Petir / Severe Thunderstorm
            <br />
          </p>
        </div>
      )}
      <Footer/>
    </div>

  );
};

export default Home;
