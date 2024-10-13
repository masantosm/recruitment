import { shallowMount } from '@vue/test-utils'
import { describe, it, expect, beforeEach, vi } from 'vitest'
import HeaderComponent from '@/interfaces/components/HeaderComponent.vue'
import { createPinia, setActivePinia } from 'pinia'
import { useCandidateStore } from '@/interfaces/stores/useCandidateStore'

describe('HeaderComponent component is definied', () => {
  let wrapper: any
  const mockfilterValue = vi.fn()

  beforeEach(() => {
    const pinia = createPinia()
    setActivePinia(pinia)

    const candidateStore = useCandidateStore()
    candidateStore.setFilterValue = mockfilterValue
    wrapper = shallowMount(HeaderComponent, {
      global: {}
    })
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
  it('check bind the input to filterValue and update the store on input', async () => {
    const input = wrapper.find('[data-test-id="input-find"]')
    await input.setValue('set filter term')
    expect(mockfilterValue).toHaveBeenCalledWith('set filter term')
  })
})
