import { mount, shallowMount } from '@vue/test-utils'
import { describe, it, expect, beforeEach, vi } from 'vitest'
import CardComponent from '@/interfaces/components/Card.vue'
import { useCandidateStore } from '@/interfaces/stores/useCandidateStore'
import { CandidateDTO } from '@/application/dtos/CandidateDTO'
import { createPinia, setActivePinia } from 'pinia'

describe('CardComponent.vue', () => {
  let wrapper: any
  const config = {
    id: 'status-id',
    name: 'test-name',
    order: 1
  }

  const mockVacancyId = 'vacancy-123'
  const mockUpdateCandidate = vi.fn()
  const mockCandidates = [
    {
      firstName: 'test-name',
      lastName: 'test-last-name',
      vacancyId: 'test-vacancy-id',
      statusId: 'status-id',
      candidateId: 'candidate-id',
      updatedAt: 'update-at',
      id: 'id'
    }
  ]
  beforeEach(() => {
    const pinia = createPinia()
    setActivePinia(pinia)

    const candidateStore = useCandidateStore()
    candidateStore.updateCandidateStatus = mockUpdateCandidate
    candidateStore.candidates = mockCandidates
    candidateStore.vacancyId = mockVacancyId
    wrapper = shallowMount(CardComponent, {
      props: { config }
    })
  })

  it('renders correctly with the given props', () => {
    const card = wrapper.find('[data-test-id="card"]')
    expect(card.exists()).toBeTruthy()
    expect(wrapper.exists()).toBeTruthy()
    expect(wrapper.find('span').text()).toBe(config.name)
    const cardImg = wrapper.find('[data-test-id="card-img"]')
    expect(cardImg.attributes('src')).toBe(
      `src/interfaces/components/icons/icon-${config.order}.svg`
    )
  })

  it('computes the correct class and icon based on the config order', () => {
    const hr = wrapper.find('hr')
    expect(hr.classes()).toContain('card__1')
    const cardImg = wrapper.find('[data-test-id="card-img"]')
    expect(cardImg.attributes('src')).toBe('src/interfaces/components/icons/icon-1.svg')
  })

  it('renders the CandidateCard component when has candidates', () => {
    const candidateCards = wrapper.findAllComponents({ name: 'CandidateCard' })
    expect(candidateCards.length).toBe(1)
    expect(candidateCards[0].props('candidateData')).toEqual(mockCandidates[0])
  })

  it('does not render CandidateCard component if there are no matching candidates', () => {
    const configAux = {
      id: 'status-id-aux',
      name: 'test-name',
      order: 1
    }
    const wrapper = mount(CardComponent, {
      props: { config: configAux }
    })
    const candidateCards = wrapper.findAllComponents({ name: 'CandidateCard' })
    expect(candidateCards.length).toBe(0)
  })
  it('check that the component receives the event dragover', async () => {
    const candidate = { id: 1, name: 'test-first-name' }

    const mockDragEvent = {
      dataTransfer: {
        setData: vi.fn()
      },
      preventDefault: vi.fn()
    }
    await wrapper.vm.dragStart(candidate, mockDragEvent)

    expect(mockDragEvent.dataTransfer.setData).toHaveBeenCalledWith(
      'candidate',
      JSON.stringify(candidate)
    )
  })
  it('check that the component receives the event drop', async () => {
    const mockDragEvent = {
      preventDefault: vi.fn(),
      dataTransfer: {
        getData: vi.fn().mockReturnValue(JSON.stringify({ id: 1, name: 'test-first-name' }))
      }
    }

    await wrapper.vm.allowDrop(mockDragEvent)

    expect(mockDragEvent.preventDefault).toHaveBeenCalled()
  })

  it('check must update candidate status when releasing', async () => {
    const candidate: CandidateDTO = {
      firstName: 'test-name',
      lastName: 'test-last-name',
      vacancyId: 'vacancy-123',
      statusId: 'status-id',
      candidateId: '1',
      updatedAt: '-',
      id: '1'
    }

    const wrapper = mount(CardComponent, {
      props: {
        hasCandidates: [candidate],
        config: { id: 3 }
      }
    })

    const mockDragEvent = {
      preventDefault: vi.fn(),
      dataTransfer: {
        getData: vi.fn().mockReturnValue(JSON.stringify(candidate))
      }
    }

    await wrapper.vm.dropCandidate(mockDragEvent)

    expect(mockDragEvent.preventDefault).toHaveBeenCalled()

    expect(mockUpdateCandidate).toHaveBeenCalledWith(
      candidate.candidateId,
      {
        firstName: candidate.firstName,
        lastName: candidate.lastName,
        vacancyId: candidate.vacancyId,
        statusId: 3,
        candidateId: candidate.candidateId,
        updatedAt: candidate.updatedAt
      },
      'vacancy-123'
    )
  })

  it('check must not update candidate status on release because there is no candidate', async () => {
    const candidate: CandidateDTO = {
      firstName: 'test-name',
      lastName: 'test-last-name',
      vacancyId: 'vacancy-123',
      statusId: 'status-id',
      candidateId: '1',
      updatedAt: '-',
      id: '1'
    }

    const wrapper = mount(CardComponent, {
      props: {
        hasCandidates: [candidate],
        config: { id: 3 }
      }
    })

    const mockDragEvent = {
      preventDefault: vi.fn(),
      dataTransfer: {
        getData: vi.fn().mockReturnValue(null)
      }
    }

    await wrapper.vm.dropCandidate(mockDragEvent)

    expect(mockDragEvent.preventDefault).toHaveBeenCalled()

    expect(mockUpdateCandidate).not.toHaveBeenCalledWith(
      candidate.candidateId,
      {
        firstName: candidate.firstName,
        lastName: candidate.lastName,
        vacancyId: candidate.vacancyId,
        statusId: 3,
        candidateId: candidate.candidateId,
        updatedAt: candidate.updatedAt
      },
      'vacancy-123'
    )
  })

  it('handles drag start correctly', async () => {
    const candidate = wrapper.vm.hasCandidates[0]
    const dragEvent = {
      dataTransfer: {
        setData: vi.fn()
      }
    }

    await wrapper.vm.dragStart(candidate, dragEvent as unknown as DragEvent)

    expect(dragEvent.dataTransfer.setData).toHaveBeenCalledWith(
      'candidate',
      JSON.stringify(candidate)
    )
  })

  it('Card recieves event dragstart', async () => {
    const mockDragEvent = {
      dataTransfer: { setData: vi.fn() },
      preventDefault: vi.fn()
    }
    await wrapper.findComponent({ name: 'CandidateCard' }).trigger('dragstart', mockDragEvent)
    expect(wrapper.emitted('dragstart')).toBeTruthy()
  })

  it('Card recieves event dragover', async () => {
    const mockDragEvent = {
      dataTransfer: { setData: vi.fn() },
      preventDefault: vi.fn()
    }
    await wrapper.find('[data-test-id="card"]').trigger('dragover', mockDragEvent)
    expect(wrapper.emitted('dragover')).toBeTruthy()
  })

  it(' Card recieves event drop', async () => {
    wrapper.vm.dropCandidate = vi.fn()
    const mockDragEvent = {
      dataTransfer: { setData: vi.fn() },
      preventDefault: vi.fn()
    }
    await wrapper.find('[data-test-id="card"]').trigger('drop', mockDragEvent)
    expect(wrapper.emitted('drop')).toBeTruthy()
  })
})
