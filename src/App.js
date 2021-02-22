import logo from './logo.svg';
import React, { useState, useEffect } from 'react';
import rp from "request-promise";
import cheerio from "cheerio";
import './App.css';

function App() {
  let [names, setNames] = useState([]);

  useEffect(() => {
    rp("https://pokedex.org/")
      .then(html => {
        let names = [];
        let $ = cheerio.load(html);

        $("#players-list li span").each(function (i, element) {
          let name = $(this)
            .prepend()
            .text();
          names.push(name);

        });

        setNames([names]);
      })
      .catch(function(err) {
        console.log("crawl failed");
      });
  }, []);




  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <div>
        <ul>
          {names.map((name) => {
            return <li key={names.name}>{names.name}</li>;
          })}
        </ul>
      </div>

    </div>
  );
}

export default App;
