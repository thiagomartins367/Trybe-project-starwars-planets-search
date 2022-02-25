import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import FetchApi from '../services/FetchApi';
import Context from './Context';

const ContextProvider = ({ children }) => {
  const [planets, setPlanets] = useState([]);
  const [filteredPlanets, setFilteredPlanets] = useState([]);
  const [optionsForFilters, setOptionsForFilters] = useState({
    columnFilterOptions: [
      'population',
      'orbital_period',
      'diameter',
      'rotation_period',
      'surface_water',
    ],
    editableColumnFilterOptions: [
      'population',
      'orbital_period',
      'diameter',
      'rotation_period',
      'surface_water',
    ],
    comparisonFilterOptions: [
      'maior que',
      'menor que',
      'igual a',
    ],
  });
  const [stateFilterByName, setFilterByName] = useState({
    filterByName: {
      name: '',
    },
  });

  const [stateFilterByNumericValue, setFilterByNumericValues] = useState({
    createdFilter: {
      columnFilter: 'population',
      comparisonFilter: 'maior que',
      valueFilter: 0,
    },
    filterByNumericValues: []
  })

  useEffect(() => {
    FetchApi('https://swapi-trybe.herokuapp.com/api/planets/')
      .then((data) => {
        setPlanets(data.results);
        setFilteredPlanets(data.results);
      });
  }, []);

  useEffect(() => {
    const { filterByName } = stateFilterByName;
    if (filterByName.name !== '') {
      const planetsFilteredByName = planets.filter((planet) => {
        const planetName = planet.name.toLowerCase();
        // console.log('name-Planet: ', planetName);
        return planetName.includes(filterByName.name);
      });
      // console.log('planetsFilteredByName: ', planetsFilteredByName);
      setFilteredPlanets(planetsFilteredByName);
    } else {
      setFilteredPlanets(planets);
    }
  }, [stateFilterByName, planets]);

  useEffect(() => {
    const { filterByNumericValues } = stateFilterByNumericValue;
    if (filterByNumericValues.length > 0) {
      let filteredPlanets = planets;
      let filteredColumnFilterOptions = optionsForFilters.columnFilterOptions;
      filterByNumericValues.forEach((filters) => {
        const { columnFilter, comparisonFilter, valueFilter } = filters;
        switch (comparisonFilter) {
          case 'maior que':
            filteredPlanets = filteredPlanets.filter(
              (planet) => planet[columnFilter] > valueFilter
            );
            break;
          case 'menor que':
            filteredPlanets = filteredPlanets.filter(
              (planet) => planet[columnFilter] < valueFilter
            );
            break;
          case 'igual a':
            filteredPlanets = filteredPlanets.filter(
              (planet) => {
                // console.log(Number(planet[columnFilter]));
                return Number(planet[columnFilter]) === valueFilter
              }
            );
            break;
        }
        // console.log('comparisonFilter: ', columnFilter);
        filteredColumnFilterOptions = filteredColumnFilterOptions.filter(
          (filterParam) => filterParam !== columnFilter,
        );
        // console.log('filteredColumnFilterOptions: ', filteredColumnFilterOptions);
      });
      setOptionsForFilters((prevState) => ({
        ...prevState,
        editableColumnFilterOptions: filteredColumnFilterOptions,
      }));
      setFilteredPlanets(filteredPlanets);
    }
  }, [stateFilterByNumericValue, planets]);

  const context = {
    data: planets,
    setPlanets,
    filteredPlanets,
    setFilteredPlanets,
    stateFilterByName,
    setFilterByName,
    optionsForFilters,
    setOptionsForFilters,
    stateFilterByNumericValue,
    setFilterByNumericValues,
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
