import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import FetchApi from '../services/FetchApi';
import Context from './Context';

const ContextProvider = ({ children }) => {
  const [planets, setPlanets] = useState([]);
  const [filteredPlanets, setFilteredPlanets] = useState([]);
  const [filterStates, setFilterByName] = useState({
    filterByName: {
      name: '',
    },
  });

  useEffect(() => {
    FetchApi('https://swapi-trybe.herokuapp.com/api/planets/')
      .then((data) => {
        setPlanets(data.results);
        setFilteredPlanets(data.results);
      });
  }, []);

  useEffect(() => {
    const { filterByName } = filterStates;
    if (filterByName.name !== '') {
      const planetsFilteredByName = planets.filter((planet) => {
        const planetName = planet.name.toLowerCase();
        // console.log('name-Planet: ', planetName);
        return planetName.includes(filterByName.name);
      });
      // console.log('planetsFilteredByName: ', planetsFilteredByName);
      setFilteredPlanets(planetsFilteredByName);
    }
  }, [filterStates, planets]);

  const context = {
    data: planets,
    setPlanets,
    filteredPlanets,
    setFilteredPlanets,
    filterStates,
    setFilterByName,
  };
  return (
    <Context.Provider value={ context }>
      { children }
    </Context.Provider>
  );
};

ContextProvider.propTypes = {
  children: PropTypes.element,
};

ContextProvider.defaultProps = {
  children: <>default</>,
};

export default ContextProvider;
