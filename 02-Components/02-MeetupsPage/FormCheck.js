const template = `
<div class="form-check">
  <div v-for="option in options" :key="option.value" class="form-check__group">
    <input
      class="form-check__input"
      type="radio"
      name="date"
      :value="option.value"
      :checked="option.value === selected"
      @input="$emit('change', option.value)"
    />
    <label class="form-check__label">{{ option.text }}</label>
  </div>
</div>
`;

export const FormCheck = {
  template,

  props: {
    options: {
      type: Array,
      required: true,

    },
    selected: {
      type: String,
    },
  },

  model: {
    prop: 'selected',
    event: 'change',
  },
}
