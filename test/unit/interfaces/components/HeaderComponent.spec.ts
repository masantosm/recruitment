import { shallowMount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import HeaderComponent from '@/interfaces/components/HeaderComponent.vue'

describe('HeaderComponent component is definied', () => {
  const wrapper = shallowMount(HeaderComponent, {
    global: {}
  })
  it('renders correctly with the given props', () => {
    const header = wrapper.find('[data-test-id="header-component"]')
    expect(header.exists()).toBeTruthy()
  })

  it('check that func setShowModal works correctly', () => {
    wrapper.vm.setShowModal(true)
    expect(wrapper.vm.showModal).toBeTruthy()
    wrapper.vm.setShowModal(false)
    expect(wrapper.vm.showModal).toBeFalsy()
  })
  it('check opens modal when "Añadir candidato" button is clicked', async () => {
    const button = wrapper.find('[data-test-id="header-component-add-button"]')
    await button.trigger('click')
    expect(wrapper.vm.showModal).toBeTruthy()
  })
  it('check closes modal when "close-modal" event is emitted from ModalForm', async () => {
    wrapper.vm.setShowModal(true)
    const modal = wrapper.findComponent({ name: 'ModalForm' })
    modal.vm.$emit('close-modal')
    expect(wrapper.vm.showModal).toBeFalsy()
  })
})
