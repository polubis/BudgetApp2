import React, { memo } from 'react';
import moment from 'moment';

import './labels.scss';

const Labels: React.FC = memo(() => {
  return (
    <div className='labels'>
      {moment.weekdays().map(wd => (
        <div key={wd} className='label'>
          {wd}
        </div>
      ))}
    </div>
  );
});

export default Labels;
