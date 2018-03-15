import Default from 'src/components/docs-table/columns/default.jsx';

export default {
  component: Default,

  props: {
    docs: {
      required: false,
      defaultValue: {
        value: 'foobar'
      }
    }
  }
};
