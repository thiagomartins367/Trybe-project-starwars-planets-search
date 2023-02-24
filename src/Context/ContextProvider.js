import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import FetchApi from '../services/FetchApi';
import Context from './Context';

const ContextProvider = ({ children }) => {
  const [planets, setPlanets] = useState([]);
  const [filteredPlanets, setFilteredPlanets] = useState([]);
  const [columnFilterOptions, setcolumnFilterOptions] = useState([
    'population',
    'orbital_period',
    'diameter',
    'rotation_period',
    'surface_water',
  ]);
  const [optionsForFilters, setOptionsForFilters] = useState({
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
    },
  });

  useEffect(() => {
    FetchApi('https://swapi.dev/api/planets/')
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
      let editableFilteredPlanets = planets;
      let filteredColumnFilterOptions = columnFilterOptions.concat();
      filterByNumericValues.forEach((filters) => {
        const { columnFilter, comparisonFilter, valueFilter } = filters;
        switch (comparisonFilter) {
        case 'maior que':
          editableFilteredPlanets = editableFilteredPlanets.filter(
            (planet) => planet[columnFilter] > valueFilter,
          );
          break;
        case 'menor que':
          editableFilteredPlanets = editableFilteredPlanets.filter(
            (planet) => planet[columnFilter] < valueFilter,
          );
          break;
        case 'igual a':
          editableFilteredPlanets = editableFilteredPlanets.filter(
            (planet) => Number(planet[columnFilter]) === valueFilter,
          );
          break;
        default:
          break;
        }
        filteredColumnFilterOptions = filteredColumnFilterOptions.filter(
          (filterParam) => filterParam !== columnFilter,
        );
      });
      setOptionsForFilters((prevState) => ({
        ...prevState,
        editableColumnFilterOptions: filteredColumnFilterOptions,
      }));
      setFilteredPlanets(editableFilteredPlanets);
    } else {
      setFilteredPlanets(planets);
      setOptionsForFilters((prevState) => ({
        ...prevState,
        editableColumnFilterOptions: columnFilterOptions,
      }));
    }
    if (idFilterToBeDeleted !== 0) {
      setFilterByNumericValues((prevState) => ({
        ...prevState,
        filterByNumericValues: filterByNumericValues.filter(
          (filter) => filter.id !== idFilterToBeDeleted,
        ),
      }));
      setIdFilterToBeDeleted(0);
    }
  }, [stateFilterByNumericValue, planets, idFilterToBeDeleted, columnFilterOptions]);

  const searchOrdenation = ({
    sortByTableColumn,
    column,
    sort,
    highestValueInArray,
    smallestValueInArray,
  }) => {
    switch (sort) {
    case 'ASC':
      sortByTableColumn.sort((elementA, elementB) => {
        const elementAValue = elementA[column] !== 'unknown'
          ? elementA[column]
          : highestValueInArray;
        const elementBValue = elementB[column] !== 'unknown'
          ? elementB[column]
          : highestValueInArray;
        return elementAValue - elementBValue;
      });
      break;
    case 'DESC':
      sortByTableColumn.sort((elementA, elementB) => {
        const elementAValue = elementA[column] !== 'unknown'
          ? elementA[column]
          : smallestValueInArray;
        const elementBValue = elementB[column] !== 'unknown'
          ? elementB[column]
          : smallestValueInArray;
        return elementBValue - elementAValue;
      });
      break;
    default:
      break;
    }
    return sortByTableColumn;
  };

  useEffect(() => {
    const { activeSorting, order: { column, sort } } = tableSort;
    if (activeSorting) {
      let sortByTableColumn = filteredPlanets.concat();
      const tableColumnValues = [];
      sortByTableColumn.forEach((planet) => {
        if (planet[column] !== 'unknown') {
          tableColumnValues.push(Number(planet[column]));
        }
      });
      const highestValueInArray = Math.max(...tableColumnValues) + 1;
      const smallestValueInArray = Math.min(...tableColumnValues) - 1;
      const paramForSearchOrdenation = {
        sortByTableColumn,
        column,
        sort,
        highestValueInArray,
        smallestValueInArray,
      };
      sortByTableColumn = searchOrdenation(paramForSearchOrdenation);
      setFilteredPlanets(sortByTableColumn);
      setTableSort((prevState) => ({
        ...prevState,
        activeSorting: false,
      }));
    }
  }, [tableSort, filteredPlanets]);

  const context = {
    data: planets,
    setPlanets,
    filteredPlanets,
    setFilteredPlanets,
    stateFilterByName,
    setFilterByName,
    columnFilterOptions,
    setcolumnFilterOptions,
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
