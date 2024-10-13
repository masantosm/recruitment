import { shallowMount } from '@vue/test-utils'
import { describe, it, expect, vi } from 'vitest'
import CandidateCardComponent from '@/interfaces/components/CandidateCard.vue'

describe('CandidateCardComponent component is definied', () => {
  const candidateData: object = {
    firstName: 'test-name',
    lastName: 'test-lastname',
    vacancyId: 'test-vacancy-id',
    statusId: 'status-id',
    candidateId: 'candidate-id',
    updatedAt: '2024-10-09T10:50:54+00:00'
  }
  const wrapper = shallowMount(CandidateCardComponent, {
    global: {},
    props: {
      candidateData,
      draggable: true
    }
  })

  it('renders correctly with the given props', async () => {
    const candidateCard = wrapper.find('[data-test-id="candidate-card"]')
    expect(candidateCard.exists()).toBeTruthy()

    const candidateCardDate = wrapper.find('[data-test-id="candidate-card-name"]')
    expect(candidateCardDate.exists()).toBeTruthy()
    expect(candidateCardDate.text()).toStrictEqual('test-name test-lastname')

    const candidateCardName = wrapper.find('[data-test-id="candidate-card-date"]')
    expect(candidateCardName.exists()).toBeTruthy()
    expect(candidateCardName.text()).toStrictEqual('09/10/24')

    const candidateCardButton = wrapper.find('[data-test-id="candidate-card-edit"]')
    expect(candidateCardButton.exists()).toBeTruthy()
    candidateCardButton.trigger('click')
    expect(wrapper.vm.showModal).toBeTruthy()
  })

  it('check closes modal when "close-modal" event is emitted from ModalForm', async () => {
    wrapper.vm.setShowModal(true)
    const modal = wrapper.findComponent({ name: 'ModalForm' })
    modal.vm.$emit('close-modal')
    expect(wrapper.vm.showModal).toBeFalsy()
  })

  it('check that the component receives the event dragstart', async () => {
    const mockDragEvent = {
      dataTransfer: { setData: vi.fn() },
      preventDefault: vi.fn()
    }
    await wrapper.find('[data-test-id="candidate-card"]').trigger('dragstart', mockDragEvent)
    expect(wrapper.emitted('dragstart')).toBeTruthy()
  })
})
