import React from 'react';
import DocsTable from 'src/components/docs-table/docs-table.jsx';

export default {
  component: DocsTable,

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

    Columns: [
      { header: 'header 1', component: () => <span>Info 1</span> },
      { header: 'header 2', component: () => <span>Info 2</span> }
    ]
  }
};
