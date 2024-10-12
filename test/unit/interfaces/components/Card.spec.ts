import { mount, shallowMount } from '@vue/test-utils'
import { describe, it, expect, beforeEach, vi } from 'vitest'
import CardComponent from '@/interfaces/components/Card.vue'
import CandidateCard from '@/interfaces/components/CandidateCard.vue'
import { useCandidateStore } from '@/interfaces/stores/useCandidateStore'

vi.mock('@/interfaces/stores/useCandidateStore', () => ({
  useCandidateStore: vi.fn()
}))

describe('CardComponent.vue', () => {
  const config = {
    id: 1,
    name: 'Test Name',
    order: 1
  }

  let candidateStoreMock: any

  beforeEach(() => {
    candidateStoreMock = {
      getCandidates: [
        { id: 1, statusId: 1, name: 'Candidate 1' },
        { id: 2, statusId: 2, name: 'Candidate 2' }
      ]
    }
    useCandidateStore.mockReturnValue(candidateStoreMock)
  })

  it('renders correctly with props', () => {
    const wrapper = shallowMount(CardComponent, {
      props: { config }
    })
    const card = wrapper.find('[data-test-id="card"]')
    expect(card.exists()).toBe(true)
    expect(wrapper.exists()).toBe(true)
    expect(wrapper.find('span').text()).toBe(config.name)
    const cardImg = wrapper.find('[data-test-id="card-img"]')
    expect(cardImg.attributes('src')).toBe(
      `src/interfaces/components/icons/icon-${config.order}.svg`
    )
  })

  it('computes the correct class and icon based on the config order', () => {
    const wrapper = mount(CardComponent, {
      props: { config }
    })
    const hr = wrapper.find('hr')
    expect(hr.classes()).toContain('card__1')
    const cardImg = wrapper.find('[data-test-id="card-img"]')
    expect(cardImg.attributes('src')).toBe('src/interfaces/components/icons/icon-1.svg')
  })

  it('renders the CandidateCard component when candidates are present', () => {
    const wrapper = mount(CardComponent, {
      props: { config }
    })

    const candidateCards = wrapper.findAllComponents(CandidateCard)
    expect(candidateCards.length).toBe(1)
    expect(candidateCards[0].props('candidateData')).toEqual({
      id: 1,
      statusId: 1,
      name: 'Candidate 1'
    })
  })

  it('does not render CandidateCard component if there are no matching candidates', () => {
    candidateStoreMock.getCandidates = [{ id: 3, statusId: 3, name: 'Candidate 3' }]
    const wrapper = mount(CardComponent, {
      props: { config }
    })

    const candidateCards = wrapper.findAllComponents(CandidateCard)
    expect(candidateCards.length).toBe(0)
  })
})
