import logo from './logo.svg';
import React, { useState, useEffect } from 'react';
import rp from "request-promise";
import cheerio from "cheerio";
import './App.css';

function App() {
  // instead of class App extends Component import useState
  let [names, setNames] = useState([]);

  // instead of componentDidMount import useEffect
  useEffect(() => {
    rp("https://pokedex.org/")
      .then(html => {
        let names = []; // set names to empty array
        let $ = cheerio.load(html); // not sure but it's cheerio

        // find what element ids, classes, or tags you want from opening console in the browser
        // cheerio library lets you select elements similar to querySelector
        $("#monsters-list li span").each(function (i, element) {
          let name = $(this)
            .prepend()
            .text();
          names.push(name); // pushes names to array

        });
        // had to add ...(spread operator) to render individual list items
        setNames([...names]);
      })
      .catch(function (err) {
        console.log("crawl failed");
      });
  }, []);




  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          <code>This is a web scraper demo built with React, Cheerio.js (jQuery for node.js), and Request-Promise.
          The monsters listed below are from https://pokedex.org/.
          </code>
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
      <div className="container">
        <ul>
          {names.map(name => {
            return (
              <li key={name}>{name}</li>
            )
          })}
        </ul>
      </div>

    </div>
  );
}

export default App;

// based on a tutorial from Robert Chen 
// at https://dev.to/robghchen/how-to-scrape-a-static-website-2jbh

// Add to README: 
// https://www.npmjs.com/package/request-promise
// https://cheerio.js.org/
// 
