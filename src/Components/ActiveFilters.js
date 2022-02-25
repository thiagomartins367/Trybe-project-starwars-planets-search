import React from 'react';

const ActiveFilters = ({ filters, filtersDataTestIds, classNameFilter, setIdFilterToBeDeleted }) => {
  return (
    <section className="section-active-filters">
      {
        filters.map((filter, index) => {
          const { id, columnFilter, comparisonFilter, valueFilter } = filter;
          const nameFilter = `${columnFilter} ${comparisonFilter} ${valueFilter}`;
          return (
            <div
              key={ `${nameFilter}-${id}` }
              className={ classNameFilter }
              data-testid={
                filtersDataTestIds.length > 1
                ? filtersDataTestIds[index]
                : filtersDataTestIds[0]
              }
            >
              <span>{ nameFilter }</span>
              <button onClick={ () => setIdFilterToBeDeleted(id) }>x</button>
            </div>
          )
        })
      }
    </section>
  );
}

export default ActiveFilters;