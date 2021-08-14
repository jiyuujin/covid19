<template>
  <div class="select-wrapper">
    <select
      :id="id"
      :aria-label="label"
      :aria-labelledby="explain"
      class="atoms-select"
      @input="update"
    >
      <option
        v-for="option in options"
        :key="option.value"
        :value="option.value"
      >
        {{ option.label }}
      </option>
    </select>
  </div>
</template>

<script lang="ts">
export default {
  props: {
    id: {
      type: String,
      default: ''
    },
    label: {
      type: String,
      default: ''
    },
    explain: {
      type: String,
      default: ''
    },
    options: {
      type: Array,
      default: function () {
        return []
      }
    },
    values: {
      type: Number,
      default: 0
    }
  },
  methods: {
    update(e: any) {
      // @ts-ignore
      this.$emit('handle-select', this.options[e.target.selectedIndex].value)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/_select';
</style>
