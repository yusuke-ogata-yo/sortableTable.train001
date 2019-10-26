(function() {
  'use strict';
  
  let ths = document.getElementsByTagName('th');
  let sortOrder = 1;  //昇順=1、降順=-1;
  let tbody = document.querySelector('tbody');
  let i;

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

  function updateClassName( th ) {
    let i;

    for ( i = 0; i < ths.length; i++ ) {
      ths[i].className = '';
    }
    th.className = sortOrder === 1 ? 'asc' : 'dasc';
  }

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

  function sortRows( th ) {
    let rows = Array.prototype.slice.call(document.querySelectorAll('tbody > tr'));
    let col = th.cellIndex;
    let type = th.dataset.type;
  
    rows.sort(function(a,b) {
      return compare(a, b, col, type) * sortOrder;
    });

    return rows;
  }

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