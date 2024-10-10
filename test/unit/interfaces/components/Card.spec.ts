// tests/unit/Card.spec.ts

import { mount } from '@vue/test-utils'
import Card from '../../../../src/interfaces/components/Card.vue'
import { describe, it, expect, vi } from 'vitest'

// Simular la tienda de candidatos
vi.mock('@/interfaces/stores/useCandidateStore', () => ({
  useCandidateStore: () => ({
    getCandidates: [
      { id: 1, statusId: 1, name: 'John Doe' },
      { id: 2, statusId: 2, name: 'Jane Smith' }
    ]
  })
}))

describe('Card.vue', () => {
  const config = { order: 1, id: 1, name: 'Test Card' }

  it('renders correctly with props', () => {
    const wrapper = mount(Card, {
      props: { config }
    })

    expect(wrapper.find('[data-test-id="card"]').exists()).toBe(true)
    expect(wrapper.find('span').text()).toBe('Test Card')
  })

  it('displays the correct icon', () => {
    const wrapper = mount(Card, {
      props: { config }
    })

    expect(wrapper.find('img').attributes('src')).toBe('src/interfaces/components/icons/icon-1.svg')
  })

  it('shows candidate cards when hasCandidates is true', () => {
    const wrapper = mount(Card, {
      props: { config }
    })

    expect(wrapper.findAllComponents({ name: 'CandidateCard' })).toHaveLength(1) // Solo se muestra el candidato con statusId 1
  })

  it('does not show candidate cards when hasCandidates is empty', () => {
    const wrapper = mount(Card, {
      props: { config: { ...config, id: 3 } } // Cambiar el ID para que no coincida con ninguno de los candidatos
    })

    expect(wrapper.findAllComponents({ name: 'CandidateCard' })).toHaveLength(0) // No debería haber candidatos
  })
})
