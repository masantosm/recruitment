import { shallowMount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import NavBar from '@/interfaces/components/NavBar.vue'

describe('HeaderComponent component is definied', () => {
  const wrapper = shallowMount(NavBar, {
    global: {}
  })
  it('renders correctly with the given props', async () => {
    const header = wrapper.find('[data-test-id="nav-var"]')
    expect(header.exists()).toBeTruthy()
    const logo = wrapper.find('[data-test-id="nav-var-logo"]')
    expect(logo.exists()).toBeTruthy()
    const firstMenu = wrapper.find('[data-test-id="nav-var-menu-0"]')
    expect(firstMenu.exists()).toBeTruthy()
    const firstMenuContainer = wrapper.find('[data-test-id="nav-var-menu-0-container"]')
    expect(firstMenuContainer.exists()).toBeTruthy()
    await firstMenuContainer.trigger('click')
    expect(wrapper.vm.isFirstMenuOpen).toBeTruthy()
    const firstMenuTitle = wrapper.find('[data-test-id="nav-var-menu-0-title"]')
    expect(firstMenuTitle.text()).toMatch('ADMINISTRADOR')

    const secondMenu = wrapper.find('[data-test-id="nav-var-submenu-0"]')
    expect(secondMenu.exists()).toBeTruthy()
    const secondMenuContainer = wrapper.find('[data-test-id="nav-var-submenu-0-container"]')
    expect(secondMenuContainer.exists()).toBeTruthy()
    await secondMenuContainer.trigger('click')
    expect(wrapper.vm.isSecondMenuOpen).toBeTruthy()
    const secondMenuTitle = wrapper.find('[data-test-id="nav-var-submenu-0-title"]')
    expect(secondMenuTitle.text()).toMatch('Talento')

    const secondMenuOptionsOpen = wrapper.find('[data-test-id="nav-var-submenu-0-options"]')
    expect(secondMenuOptionsOpen.exists).toBeTruthy()
    expect(secondMenuOptionsOpen.text()).toMatch('Reclutamiento')

    await firstMenuContainer.trigger('click')
    const secondMenuOptionsClose = wrapper.find('[data-test-id="nav-var-submenu-0-options"]')
    expect(secondMenuOptionsClose.exists()).toBeFalsy()
  })

  it('check that func toggleAdmin works correctly', () => {
    wrapper.vm.toggleAdmin()
    expect(wrapper.vm.isFirstMenuOpen).toBeTruthy()
    wrapper.vm.toggleAdmin()
    expect(wrapper.vm.isFirstMenuOpen).toBeFalsy()
  })

  it('check that func toggleAdmin works correctly', () => {
    wrapper.vm.toggleTalento()
    expect(wrapper.vm.isSecondMenuOpen).toBeFalsy()
    wrapper.vm.toggleTalento()
    expect(wrapper.vm.isSecondMenuOpen).toBeTruthy()
  })
})
