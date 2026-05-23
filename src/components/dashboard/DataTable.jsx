import React, { useState, useMemo } from 'react';

const DataTable = ({ columns, data, searchField, filterField }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [currentPage, setCurrentPage] = useState(1);
  const [filterValue, setFilterValue] = useState('All');
  
  const itemsPerPage = 5;

  // Sorting logic
  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  // Process data (Filter -> Search -> Sort -> Paginate)
  const processedData = useMemo(() => {
    let filtered = [...data];

    // Filter
    if (filterField && filterValue !== 'All') {
      filtered = filtered.filter((item) => item[filterField] === filterValue);
    }

    // Search
    if (searchField && searchTerm) {
      filtered = filtered.filter((item) =>
        String(item[searchField]).toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Sort
    if (sortConfig.key) {
      filtered.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === 'asc' ? -1 : 1;
        if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
      });
    }

    return filtered;
  }, [data, searchTerm, sortConfig, filterValue, filterField, searchField]);

  // Pagination logic
  const totalPages = Math.ceil(processedData.length / itemsPerPage);
  const paginatedData = processedData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Extract unique filter options
  const filterOptions = useMemo(() => {
    if (!filterField) return [];
    const options = new Set(data.map((item) => item[filterField]));
    return ['All', ...Array.from(options)];
  }, [data, filterField]);

  return (
    <div className="data-table-container">
      <div className="data-table-controls">
        {searchField && (
          <input
            type="text"
            className="table-search"
            placeholder={`Search by ${searchField}...`}
            value={searchTerm}
            onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
          />
        )}
        
        {filterField && filterOptions.length > 1 && (
          <select 
            className="table-filter" 
            value={filterValue} 
            onChange={(e) => { setFilterValue(e.target.value); setCurrentPage(1); }}
          >
            {filterOptions.map((opt) => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
        )}
      </div>

      <table className="analytics-table">
        <thead>
          <tr>
            {columns.map((col) => (
              <th 
                key={col.key} 
                onClick={() => col.sortable !== false && handleSort(col.key)}
                style={{ cursor: col.sortable !== false ? 'pointer' : 'default' }}
              >
                {col.label} {sortConfig.key === col.key ? (sortConfig.direction === 'asc' ? '↑' : '↓') : ''}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {paginatedData.length > 0 ? (
            paginatedData.map((row, idx) => (
              <tr key={idx}>
                {columns.map((col) => (
                  <td key={col.key}>{row[col.key]}</td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={columns.length} style={{ textAlign: 'center', padding: '20px' }}>
                No records found.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {totalPages > 1 && (
        <div className="pagination-controls">
          <button 
            disabled={currentPage === 1} 
            onClick={() => setCurrentPage((prev) => prev - 1)}
          >
            Prev
          </button>
          <span>Page {currentPage} of {totalPages}</span>
          <button 
            disabled={currentPage === totalPages} 
            onClick={() => setCurrentPage((prev) => prev + 1)}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default DataTable;
