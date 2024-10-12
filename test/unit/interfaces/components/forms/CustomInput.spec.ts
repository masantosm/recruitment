import { shallowMount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import CustomSelect from '../../../../../src/interfaces/components/forms/CustomInput.vue'

describe('CustomInput component is definied', () => {
  it('renders correctly with the given props', () => {
    const wrapper = shallowMount(CustomSelect, {
      global: {},
      props: {
        label: 'name',
        modelValue: 'Test'
      }
    })
    const inputComponent = wrapper.find('[data-test-id="custom-input-name"]')
    expect(inputComponent.exists()).toBeTruthy()
    const inputLabel = wrapper.find('[data-test-id="input-label"]')
    expect(inputLabel.text()).toContain('name')
    const input = wrapper.find('[data-test-id=input]')
    expect(input.attributes('value')).toBe('Test')
    input.trigger('input')
    const emittedEvent = wrapper.emitted('update:modelValue')
    expect(emittedEvent).toBeTruthy()
    if (emittedEvent) {
      expect(emittedEvent[0][0]).toBe('Test')
    }
  })
})
