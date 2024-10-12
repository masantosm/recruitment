import { shallowMount } from '@vue/test-utils'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import CardOptions from '../../../../src/interfaces/components/CardOptions.vue'
import { useCandidateStore } from '../../../../src/interfaces/stores/useCandidateStore'
import { createPinia, setActivePinia } from 'pinia'
import { Status } from '../../../../src/domain/models/Status'

describe('CardOptions.vue', () => {
  let wrapper: any
  const mockUpdateCandidateStatus = vi.fn()
  const mockGetCandidateStatus: Status[] = [
    {
      id: 'id-1',
      name: 'Interview',
      order: 'status-1',
      companyId: 'companyId-1',
      createdAt: 'createdAt-1',
      updatedAt: 'updatedAt-1',
      vacancyId: 'vacancyId-1'
    },
    {
      id: 'id-2',
      name: 'Interview',
      order: 'status-2',
      companyId: 'companyId-2',
      createdAt: 'createdAt-2',
      updatedAt: 'updatedAt-2',
      vacancyId: 'vacancyId-2'
    }
  ]

  beforeEach(() => {
    const pinia = createPinia()
    setActivePinia(pinia)

    const candidateStore = useCandidateStore()
    candidateStore.updateCandidateStatus = mockUpdateCandidateStatus
    candidateStore.vacancyStatus = mockGetCandidateStatus

    wrapper = shallowMount(CardOptions, {
      props: {
        userData: {
          firstName: 'test-name',
          lastName: 'test-lastname',
          vacancyId: 'test-vacancy-id',
          statusId: 'status-id',
          candidateId: 'candidate-id',
          updatedAt: 'update-at'
        }
      }
    })
  })

  it('should render the button with the correct image', async () => {
    const CardOptions = wrapper.find('[data-test-id="card-options"]')
    expect(CardOptions.exists()).toBe(true)

    const button = wrapper.find('[data-test-id="card-options-button"]')
    expect(button.exists()).toBe(true)
    const cardOptionsList = wrapper.find('[data-test-id="card-options-list"]')
    expect(cardOptionsList.exists()).toBeFalsy()
  })

  it('should change status when an option is clicked', async () => {
    const button = wrapper.find('[data-test-id="card-options-button"]')
    await button.trigger('click')
    const statusButton = wrapper.find('[data-test-id="card-options-button-Interview"]')

    await statusButton.trigger('click')

    expect(mockUpdateCandidateStatus).toHaveBeenCalledWith(
      'candidate-id',
      {
        firstName: 'test-name',
        lastName: 'test-lastname',
        vacancyId: 'test-vacancy-id',
        statusId: 'id-1',
        candidateId: 'candidate-id',
        updatedAt: 'update-at'
      },
      'test-vacancy-id'
    )
    expect(wrapper.vm.isOpen).toBe(false)
  })
})
