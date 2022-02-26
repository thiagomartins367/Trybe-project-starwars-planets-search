import React from 'react';
import PropTypes from 'prop-types';

const ActiveFilters = ({
  filters,
  filtersDataTestIds,
  classNameFilter,
  setIdFilterToBeDeleted,
}) => (
  <section className="section-active-filters">
    {filters.map((filter, index) => {
      const { id, columnFilter, comparisonFilter, valueFilter } = filter;
      const nameFilter = `${columnFilter} ${comparisonFilter} ${valueFilter}`;
      return (
        <div
          key={ `${nameFilter}-${id}` }
          className={
            classNameFilter.length === filters.length
              ? classNameFilter[index]
              : classNameFilter[0]
          }
          data-testid={
            filtersDataTestIds.length === filters.length
              ? filtersDataTestIds[index]
              : filtersDataTestIds[0]
          }
        >
          <span>{ nameFilter }</span>
          <button type="button" onClick={ () => setIdFilterToBeDeleted(id) }>x</button>
        </div>
      );
    })}
  </section>
);

ActiveFilters.propTypes = {
  filters: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    columnFilter: PropTypes.string,
    comparisonFilter: PropTypes.string,
    valueFilter: PropTypes.number,
  })).isRequired,
  filtersDataTestIds: PropTypes.arrayOf(PropTypes.string),
  classNameFilter: PropTypes.arrayOf(PropTypes.string),
  setIdFilterToBeDeleted: PropTypes.func.isRequired,
};

ActiveFilters.defaultProps = {
  filtersDataTestIds: [],
  classNameFilter: [],
};

export default ActiveFilters;
