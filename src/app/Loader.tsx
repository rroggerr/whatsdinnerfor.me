import React from 'react';
import ReactPlaceholder from 'react-placeholder';

import 'react-placeholder/lib/reactPlaceholder.css';

export const Loader = () => {
  return (
    <ReactPlaceholder type="text" rows={7} ready={false} showLoadingAnimation>
      <div />
    </ReactPlaceholder>
  );
};
