import { shallowMount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import CustomSelect from '@/interfaces/components/forms/CustomSelect.vue'

describe('CustomSelect component is definied', () => {
  const options = [
    {
      id: 'id-test-1',
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
  it('renders correctly with the given props', async () => {
    const select = wrapper.find('[data-test-id="select"]')
    await select.trigger('click')
    expect(wrapper.vm.isOpen).toBeTruthy()

    const option = wrapper.find('[data-test-id="option-0"]')
    expect(option.exists()).toBeTruthy()

    await option.trigger('click')
    expect(wrapper.vm.isOpen).toBeFalsy()

    const emittedEvent = wrapper.emitted('update:modelValue')
    expect(emittedEvent).toBeTruthy()
    if (emittedEvent) {
      expect(emittedEvent[0][0]).toBe('id-test-1')
    }
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
    wrapper.vm.toggleDropdown()
    expect(wrapper.vm.isOpen).toBeTruthy()
  })

  it('check selectedItem should be null if modelValue does not match any option', () => {
    const wrapper = shallowMount(CustomSelect, {
      props: {
        options,
        modelValue: 'null-id'
      }
    })
    expect(wrapper.vm.selectedItem).toBeNull()
  })
})
