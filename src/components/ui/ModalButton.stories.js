import ModalButton from './ModalButton.vue';

export default {
  title: 'Components/ModalButton',
  component: ModalButton,
  argTypes: {
    button: {
      control: {
        type: 'text',
      },
      defaultValue: 'Modal Button',
      description: 'Slot content for the button content',
      table: {
        type: {
          summary: null,
        },
      },
    },
    default: {
      control: {
        type: 'text',
      },
      defaultValue: 'Modal Content',
      description: 'Slot content for the modal window',
      table: {
        type: {
          summary: null,
        },
      },
    },
  },
};

const Template = (args) => ({
  components: { ModalButton },
  setup() {
    return { args };
  },
  template: `<ModalButton :class="args.buttonClasses ? args.buttonClasses : ''">
  <template #button>{{ args.button }}</template>
  {{ args.default }}
</ModalButton>`,
});

export const Default = Template.bind({});

export const Styled = Template.bind({});
Styled.args = {
  buttonClasses: 'text-white bg-indigo-700 rounded-lg px-4 py-2 cursor-pointer hover:bg-indigo-800 focus:outline-none',
};
