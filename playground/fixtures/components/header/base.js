import React from 'react';

const nullStorage = {
  get() { },
  set() { }
};

export default {
  props: {
    cache: nullStorage
  },
  children: <span>Content</span>
};
