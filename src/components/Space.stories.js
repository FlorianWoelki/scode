import Space from '../components/Space.vue';

export default {
  title: 'Home/Space',
  component: Space,
  argTypes: {
    isSelected: { type: 'boolean' },
    name: {
      type: { name: 'string', required: true },
      defaultValue: 'JavaScript',
      control: { type: 'text' },
    },
  },
};

const Template = (args) => ({
  components: { Space },
  setup() {
    return {
      args,
    };
  },
  template: '<Space v-bind="args" />',
});

export const Default = Template.bind({});
Default.args = {
  name: 'JavaScript',
};
