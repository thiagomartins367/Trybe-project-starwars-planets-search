import React, { useContext } from 'react';
import Context from '../Context/Context';
import LabelAndInput from './LabelAndInput';

const Table = () => {
  const { filteredPlanets, setFilterByName } = useContext(Context);
  // console.log('dataPlanets in Tabale: ', filteredPlanets);
  // console.log(' stateFilterByName: ',  filterStates);
  let trColor = false;
  const alternatingColors = () => {
    trColor = !trColor;
    return trColor;
  };
  return (
    <section>
      <section>
        <LabelAndInput
          labelContent="Nome Planeta"
          inputType="text"
          inputId="name-filter"
          onChangeEvent={
            ({ target: { value } }) => setFilterByName((prevState) => ({
              ...prevState,
              filterByName: { name: value.toLowerCase() },
            }))
          }
          dataTestId="name-filter"
        />
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
