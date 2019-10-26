(function() {
  'use strict';
  
  let ths = document.getElementsByTagName('th');
  let sortOrder = 1;  //昇順=1、降順=-1;
  let tbody = document.querySelector('tbody');
  let i;

  /**
   * Rebuilde a talbe.
   *
   * @param {Array} rows An array of a row of 
   */
  function rebuildTbody( rows ) {
    let tbody = document.querySelector('tbody');
    let i;
    
    while ( tbody.firstChild ) {
      tbody.removeChild(tbody.firstChild);
    }
    for ( i = 0; i < rows.length; i++ ) {
      tbody.appendChild(rows[i]);
    }
  }

  /**
   * Update tabel header name class.
   *
   * @param {Array} th An array of header row of a table.
   */
  function updateClassName( th ) {
    let i;

    for ( i = 0; i < ths.length; i++ ) {
      ths[i].className = '';
    }
    th.className = sortOrder === 1 ? 'asc' : 'dasc';
  }

  /**
   * Compare funciton
   *
   * @param {string/integer} a A value of a table cell
   * @param {string/integer} b A value of a table cell
   * @param {integer} col column nubmer
   * @param {string} type "string" or "number"
   * @returns {integer} 1 is that a is bigger than b.
   */
  function compare( a, b, col, type ) {
    let _a = a.children[col].textContent;
    let _b = b.children[col].textContent;

    if ( type === "number" ) {
      _a *= 1;
      _b *= 1;  
    } else if ( type === "string" ) {
      _a = _a.toLowerCase();
      _b = _b.toLowerCase();
    }
    if ( _a < _b ) {
      return -1;
    }
    if ( _a > _b ) {
      return 1;
    }
    return 0;
  }

  /**
   * Sort rows.
   *
   * @param {Array} th An array of table rows.
  * @returns {Array} Sorted table rows.
   */
  function sortRows( th ) {
    let rows = Array.prototype.slice.call(document.querySelectorAll('tbody > tr'));
    let col = th.cellIndex;
    let type = th.dataset.type;
  
    rows.sort(function(a,b) {
      return compare(a, b, col, type) * sortOrder;
    });

    return rows;
  }

  /**
   * Sort rows.
   *
   */
  function setup() {
    for( i = 0; i < ths.length; i++ ) {
      ths[i].addEventListener('click', function() {
  
        let rows;
        rows = sortRows(this);
        rebuildTbody(rows);
        updateClassName(this);
        
        sortOrder *= -1;
      });
    }
  }

  setup();

})();