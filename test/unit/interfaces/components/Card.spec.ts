import { mount, shallowMount } from '@vue/test-utils'
import { describe, it, expect, beforeEach, vi } from 'vitest'
import CardComponent from '../../../../src/interfaces/components/Card.vue'
import CandidateCard from '../../../../src/interfaces/components/CandidateCard.vue'
import { useCandidateStore } from '../../../../src/interfaces/stores/useCandidateStore'

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
    // Mock store implementation for each test
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
    expect(wrapper.find('img').attributes('src')).toBe(
      `src/interfaces/components/icons/icon-${config.order}.svg`
    )
  })

  it('computes the correct class and icon based on the config order', () => {
    const wrapper = mount(CardComponent, {
      props: { config }
    })
    const hr = wrapper.find('hr')
    expect(hr.classes()).toContain('card__1') // For order 1, it should have class `card__1`
    expect(wrapper.find('img').attributes('src')).toBe('src/interfaces/components/icons/icon-1.svg')
  })

  it('renders the CandidateCard component when candidates are present', () => {
    const wrapper = mount(CardComponent, {
      props: { config }
    })

    const candidateCards = wrapper.findAllComponents(CandidateCard)
    expect(candidateCards.length).toBe(1) // Only 1 candidate with statusId 1
    expect(candidateCards[0].props('candidateData')).toEqual({
      id: 1,
      statusId: 1,
      name: 'Candidate 1'
    })
  })

  it('does not render CandidateCard component if there are no matching candidates', () => {
    // Mock the store to return no matching candidates
    candidateStoreMock.getCandidates = [{ id: 3, statusId: 3, name: 'Candidate 3' }]
    const wrapper = mount(CardComponent, {
      props: { config }
    })

    const candidateCards = wrapper.findAllComponents(CandidateCard)
    expect(candidateCards.length).toBe(0) // No candidates with statusId 1
  })

  it('matches the snapshot', () => {
    const wrapper = shallowMount(CardComponent, {
      props: { config }
    })
    expect(wrapper.html()).toMatchSnapshot()
  })
})
