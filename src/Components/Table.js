import React, { useContext } from 'react';
import Context from '../Context/Context';
import LabelAndInput from './LabelAndInput';
import LabelAndSelect from './LabelAndSelect';

const Table = () => {
  const {
    filteredPlanets,
    setFilterByName,
    optionsForFilters,
    setFilterByNumericValues,
    stateFilterByNumericValue: { createdFilter },
    stateFilterByName: { filterByName },
  } = useContext(Context);
  // console.log('dataPlanets in Tabale: ', filteredPlanets);
  // console.log(' stateFilterByName: ',  stateFilterByName);
  // console.log('createdFilter: ', createdFilter);
  let trColor = false;
  const alternatingColors = () => {
    trColor = !trColor;
    return trColor;
  };
  return (
    <section>
      <section className="section-filters">
        <LabelAndInput
          labelContent="Nome Planeta"
          inputType="text"
          inputId="name-filter"
          inputValue={ filterByName.name }
          classNameComponent="component-name-filter"
          onChangeEvent={
            ({ target: { value } }) => setFilterByName((prevState) => ({
              ...prevState,
              filterByName: { name: value.toLowerCase() },
            }))
          }
          dataTestId="name-filter"
        />
        <LabelAndSelect
          labelContent="Ordenar"
          selectId="column-filter"
          classNameComponent="component-column-filter"
          onChangeEvent={
            ({ target: { value } }) => setFilterByNumericValues((prevState) => ({
              ...prevState,
              createdFilter: {
                ...prevState.createdFilter,
                columnFilter: value,
              }
            }))
          }
          optionsContent={ optionsForFilters.editableColumnFilterOptions }
          dataTestId="column-filter"
        />
        <LabelAndSelect
          labelContent="Operador"
          selectId="comparison-filter"
          classNameComponent="component-comparison-filter"
          onChangeEvent={
            ({ target: { value } }) => setFilterByNumericValues((prevState) => ({
              ...prevState,
              createdFilter: {
                ...prevState.createdFilter,
                comparisonFilter: value,
              }
            }))
          }
          optionsContent={ optionsForFilters.comparisonFilterOptions }
          dataTestId="comparison-filter"
        />
        <LabelAndInput
          labelContent="Valor para o Operador"
          inputType="number"
          inputId="value-filter"
          inputValue={ createdFilter.valueFilter }
          classNameComponent="component-value-filter"
          onChangeEvent={
            ({ target: { value } }) => setFilterByNumericValues((prevState) => ({
              ...prevState,
              createdFilter: {
                ...prevState.createdFilter,
                valueFilter: Number(value),
              }
            }))
          }
          dataTestId="value-filter"
        />
        <button type="button" onClick={ () => {
          setFilterByNumericValues((prevState) => ({
            ...prevState,
            filterByNumericValues: [
              ...prevState.filterByNumericValues,
              createdFilter,
            ]
          }));
        }} data-testid='button-filter'>Filtrar</button>
      </section>
      <br />
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Rotation Period</th>
            <th>Orbital Period</th>
            <th>Diameter</th>
            <th>Climate</th>
            <th>Gravity</th>
            <th>Terrain</th>
            <th>Surface Water</th>
            <th>Population</th>
            <th>Films</th>
            <th>Created</th>
            <th>Edited</th>
            <th>URL</th>
          </tr>
        </thead>
        <tbody>
          {filteredPlanets.map((planet) => (
            <tr
              key={ planet.name }
              style={ {
                backgroundColor: alternatingColors()
                  ? 'rgb(192, 192, 192)'
                  : 'wite',
              } }
            >
              <td className="td">{ planet.name }</td>
              <td className="td">{ planet.rotation_period }</td>
              <td className="td">{ planet.orbital_period }</td>
              <td className="td">{ planet.diameter }</td>
              <td className="td">{ planet.climate }</td>
              <td className="td">{ planet.gravity }</td>
              <td className="td">{ planet.terrain }</td>
              <td className="td">{ planet.surface_water }</td>
              <td className="td">{ planet.population }</td>
              <td className="td-films">
                {planet.films.map((url) => (
                  <span key={ url }>
                    <a href={ url }>{ url }</a>
                  </span>
                ))}
              </td>
              <td className="td">{ planet.created }</td>
              <td className="td">{ planet.edited }</td>
              <td className="td-planetUrl">
                <a href={ planet.url }>{ planet.url }</a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};

export default Table;
