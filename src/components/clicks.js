let sortClick = (sortState) => {
    if ([0,-1].includes(sortState)) {
        return 1
      }
    else {
        return -1
      }
    }

let favClick = (favfilterState) => {
    if ([0,-1].includes(favfilterState)) {
        return 1
      }
    else {
        return -1
      }
    }


export {sortClick, favClick}