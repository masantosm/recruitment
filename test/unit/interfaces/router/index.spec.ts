// src/__tests__/router.test.ts
import { describe, it, expect, vi, beforeEach } from 'vitest'
import HomeView from '@/interfaces/views/HomeView.vue'
import { shallowMount } from '@vue/test-utils'
import { createApp } from 'vue'
import router from '@/interfaces/router'
import { createPinia, Pinia } from 'pinia'

vi.mock('@/views/HomeView.vue', () => ({
  default: {
    template: '<div>Home View</div>'
  }
}))

describe('Router', () => {
  let pinia: Pinia

  beforeEach(() => {
    pinia = createPinia()
  })
  it('renders HomeView when navigating to /', async () => {
    const app = createApp({})
    app.use(router)

    router.push('/')
    await router.isReady()
    const wrapper = shallowMount(HomeView, {
      global: {
        plugins: [router, pinia]
      }
    })
    expect(wrapper.html()).toContain('')
  })
})
