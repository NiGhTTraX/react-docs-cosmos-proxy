import React from 'react';
import Header from 'src/components/header.jsx';

const nullStorage = {
  get() { },
  set() { }
};

export default {
  component: Header,

  props: {
    cache: nullStorage
  },

  children: <span>Content</span>
};
