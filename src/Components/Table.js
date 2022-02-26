import React, { useContext } from 'react';
import Context from '../Context/Context';
import ActiveFilters from './ActiveFilters';
import LabelAndInput from './LabelAndInput';
import LabelAndRadioButtons from './LabelAndRadioButtons';
import LabelAndSelect from './LabelAndSelect';

const Table = () => {
  const {
    filteredPlanets,
    setFilterByName,
    columnFilterOptions,
    optionsForFilters: {
      editableColumnFilterOptions,
      comparisonFilterOptions,
    },
    setFilterByNumericValues,
    stateFilterByNumericValue: { createdFilter, filterByNumericValues },
    stateFilterByName: { filterByName },
    setIdFilterToBeDeleted,
    setTableSort,
  } = useContext(Context);
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
          onChangeEvent={ ({ target: { value } }) => {
            setFilterByName((prevState) => ({
              ...prevState,
              filterByName: { name: value.toLowerCase() },
            }));
          } }
          dataTestId="name-filter"
        />
        <LabelAndSelect
          labelContent="Coluna"
          selectId="column-filter"
          classNameComponent="component-column-filter"
          onChangeEvent={ ({ target: { value } }) => {
            setFilterByNumericValues((prevState) => ({
              ...prevState,
              createdFilter: {
                ...prevState.createdFilter,
                columnFilter: value,
              },
            }));
          } }
          optionsContent={ editableColumnFilterOptions }
          selectDataTestId="column-filter"
        />
        <LabelAndSelect
          labelContent="Operador"
          selectId="comparison-filter"
          classNameComponent="component-comparison-filter"
          onChangeEvent={ ({ target: { value } }) => {
            setFilterByNumericValues((prevState) => ({
              ...prevState,
              createdFilter: {
                ...prevState.createdFilter,
                comparisonFilter: value,
              },
            }));
          } }
          optionsContent={ comparisonFilterOptions }
          selectDataTestId="comparison-filter"
        />
        <LabelAndInput
          labelContent="Valor para o Operador"
          inputType="number"
          inputId="value-filter"
          inputValue={ createdFilter.valueFilter }
          classNameComponent="component-value-filter"
          onChangeEvent={ ({ target: { value } }) => {
            setFilterByNumericValues((prevState) => ({
              ...prevState,
              createdFilter: {
                ...prevState.createdFilter,
                valueFilter: Number(value),
              },
            }));
          } }
          dataTestId="value-filter"
        />
        <button
          type="button"
          onClick={ () => {
            setFilterByNumericValues((prevState) => ({
              ...prevState,
              createdFilter: {
                ...prevState.createdFilter,
                id: prevState.createdFilter.id + 1,
              },
            }));
            setFilterByNumericValues((prevState) => ({
              ...prevState,
              filterByNumericValues: [
                ...prevState.filterByNumericValues,
                {
                  ...createdFilter,
                  id: createdFilter.id + 1,
                },
              ],
            }));
          } }
          data-testid="button-filter"
        >
          Filtrar
        </button>
      </section>
      <br />
      <section>
        <LabelAndSelect
          labelContent="Ordenar por: "
          selectId="column-sort"
          onChangeEvent={ ({ target: { value } }) => {
            setTableSort((prevState) => ({
              ...prevState,
              order: {
                ...prevState.order,
                column: value,
              },
            }));
          } }
          optionsContent={ columnFilterOptions }
          selectDataTestId="column-sort"
        />
        <br />
        <LabelAndRadioButtons
          nameInputs="nameInput"
          inputsContents={ ['Ascendente', 'Descendente'] }
          onClickEvent={ ({ target: { value } }) => {
            // console.log('radioButtonValue: ', value);
            setTableSort((prevState) => ({
              ...prevState,
              order: {
                ...prevState.order,
                sort: value === 'Ascendente' ? 'ASC' : 'DESC',
              },
            }));
          } }
          inputsDataTestIds={ ['column-sort-input-asc', 'column-sort-input-desc'] }
        />
        <button
          type="button"
          onClick={ () => {
            setTableSort((prevState) => ({
              ...prevState,
              activeSorting: true,
            }));
          } }
          data-testid="column-sort-button"
        >
          ORDENAR
        </button>
      </section>
      <br />
      <ActiveFilters
        filters={ filterByNumericValues }
        filtersDataTestIds={ ['filter'] }
        classNameFilter={ ['filter'] }
        setIdFilterToBeDeleted={ setIdFilterToBeDeleted }
      />
      <br />
      <button
        type="button"
        onClick={ () => {
          setFilterByNumericValues((prevState) => ({
            ...prevState,
            filterByNumericValues: [],
          }));
        } }
        data-testid="button-remove-filters"
      >
        REMOVER FILTROS
      </button>
      <br />
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
              <td className="td" data-testid="planet-name">
                { planet.name }
              </td>
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
                    <a href={ url }>{url }</a>
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
