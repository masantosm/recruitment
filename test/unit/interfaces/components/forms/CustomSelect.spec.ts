import { shallowMount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import CustomSelect from '../../../../../src/interfaces/components/forms/CustomSelect.vue'

describe('CustomSelect component is definied', () => {
  const options = [
    {
      id: '1',
      name: 'test1',
      order: '1',
      companyId: 'companyId',
      createdAt: 'createdAt',
      updatedAt: 'updatedAt',
      vacancyId: 'vacancyId'
    }
  ]
  const wrapper = shallowMount(CustomSelect, {
    global: {},
    props: {
      options,
      modelValue: '1'
    }
  })
  it('renders correctly with the given props', () => {
    const inputComponent = wrapper.find('[data-test-id="custom-select"]')
    expect(inputComponent.exists()).toBeTruthy()
    const select = wrapper.find('[data-test-id="select"]')
    select.trigger('click')
    expect(wrapper.vm.isOpen).toBeTruthy()
    // wrapper.vm.isOpen = true
    // const option = wrapper.find('[data-test-id="option-0"]')
    // expect(option.exists()).toBeTruthy()
    // option.trigger('click')
    // expect(wrapper.emitted('update:modelValue')).toBeTruthy()
  })

  it('check that const selectedItem has value', () => {
    const expectedValue = options[0].name
    expect(wrapper.vm.selectedItem).toStrictEqual(expectedValue)
  })

  it('check that const selectedItem has value', () => {
    const wrapper = shallowMount(CustomSelect, {
      global: {},
      props: {
        options
      }
    })
    expect(wrapper.vm.selectedItem).toBeNull()
  })

  it('check that func toggleDropdown works correctly', () => {
    expect(wrapper.vm.isOpen).toBeTruthy()
    wrapper.vm.toggleDropdown()
    expect(wrapper.vm.isOpen).toBeFalsy()
  })

  it('check that func selectItem works correctly and emit event', () => {
    wrapper.vm.selectItem(options[0])
    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
    expect(wrapper.emitted('update:modelValue')?.length).toBe(1)
    expect(wrapper.emitted('update:modelValue')[0][0]).toStrictEqual('1')
  })
})
