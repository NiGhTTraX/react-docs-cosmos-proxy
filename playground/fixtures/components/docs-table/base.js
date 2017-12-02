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
      { header: 'header 1', component: () => <span>Info 1</span> },
      { header: 'header 2', component: () => <span>Info 2</span> }
    ]
  }
};
