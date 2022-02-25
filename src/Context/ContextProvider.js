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
      id: 0,
      columnFilter: 'population',
      comparisonFilter: 'maior que',
      valueFilter: 0,
    },
    filterByNumericValues: [],
  });

  const [idFilterToBeDeleted, setIdFilterToBeDeleted] = useState(0);

  const [tableSort, setTableSort] = useState({
    activeSorting: false,
    order: {
      column: 'population',
      sort: 'ASC',
    }
  });

  useEffect(() => {
    FetchApi('https://swapi-trybe.herokuapp.com/api/planets/')
      .then((data) => {
        const dataResults = data.results.concat();
        dataResults.sort((a, b) => a.name.localeCompare(b.name)); // <--- | Essa linha de código foi retirada do stack overflow.
        setPlanets(dataResults); // Link stack overflow: https://pt.stackoverflow.com/questions/46600/como-ordenar-uma-array-de-objetos-com-array-sort
        setFilteredPlanets(dataResults);
        // console.log('dataResults: ', dataResults);
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
    } else {
      setFilteredPlanets(planets);
      setOptionsForFilters((prevState) => ({
        ...prevState,
        editableColumnFilterOptions: prevState.columnFilterOptions,
      }));
    }
  }, [stateFilterByNumericValue, planets]);

  useEffect(() => {
    // console.log('idFilterToBeDeleted: ', idFilterToBeDeleted);
    const { filterByNumericValues } = stateFilterByNumericValue;
    const updatedFilterList = filterByNumericValues.filter(
      (filter) => filter.id !== idFilterToBeDeleted,
    );
    setFilterByNumericValues((prevState) => ({
      ...prevState,
      filterByNumericValues: updatedFilterList,
    }));
  }, [idFilterToBeDeleted]);

  useEffect(() => {
    const { activeSorting, order: { column, sort } } = tableSort;
    if (activeSorting) {
      const sortByTableColumn = filteredPlanets.concat();
      const tableColumnValues = [];
      sortByTableColumn.forEach((planet) => {
        if (planet[column] !== 'unknown') {
          tableColumnValues.push(Number(planet[column]));
        }
      });
      const highestValueInArray = Math.max(...tableColumnValues) + 1;
      const smallestValueInArray = Math.min(...tableColumnValues) - 1;
      // console.log('highestValueInArray: ', highestValueInArray);
      // console.log('smallestValueInArray: ', smallestValueInArray);
      switch (sort) {
        case 'ASC':
          sortByTableColumn.sort((elementA, elementB) => {
            const elementA_Value = elementA[column] !== 'unknown' ? elementA[column] : highestValueInArray;
            const elementB_Value = elementB[column] !== 'unknown' ? elementB[column] : highestValueInArray;
            return elementA_Value - elementB_Value
          });
          break;
        case 'DESC':
          // sortByTableColumn.sort((elementA, elementB) => elementB[column] - elementA[column]);
          sortByTableColumn.sort((elementA, elementB) => {
            const elementA_Value = elementA[column] !== 'unknown' ? elementA[column] : smallestValueInArray;
            const elementB_Value = elementB[column] !== 'unknown' ? elementB[column] : smallestValueInArray;
            return elementB_Value - elementA_Value;
          });
          break;
      }
      setFilteredPlanets(sortByTableColumn);
      setTableSort((prevState) => ({
        ...prevState,
        activeSorting: false,
      }));
    }
  }, [tableSort]);

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
    idFilterToBeDeleted,
    setIdFilterToBeDeleted,
    tableSort,
    setTableSort,
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
