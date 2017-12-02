import React from 'react';

export default {
  props: {
    displayName: 'MyAwesomeComponent',
    description: 'This is the most awesomest component you have ever laid eyes upon',

    props: {
      foo: {
        type: { name: 'string' }
      },
      bar: {
        type: { name: 'integer' }
      }
    },

    PropInfos: [
      () => <span>Info 1</span>,
      () => <span>Info 2</span>
    ]
  }
};
