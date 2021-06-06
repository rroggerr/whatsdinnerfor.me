import React from 'react';
import {useAsync, useGeolocation} from 'react-use';

import {getLatLong} from './api'

const App: React.FC<{}> = ({}) => {
  const location = useGeolocation();
  const dat = useAsync(getLatLong)

  console.log(dat)
  console.log(location)
  return (
    <div className="App">
      {location.toString()}
      Yes
    </div>
  );
}

export default App;
