import { expect, it, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import  Banner  from '../components/Banner.vue'

// Renderiza o Banner
it('should render the button with the correct text', () => {
    const wrapper = mount(Banner)

    //Verifica se o botão existe no html renderizado
    const button = wrapper.find('a')

    //Verifica se o botão está no DOM
    expect(button.exists()).toBe(true)

    //Verifica se o texto do botão está correto
    expect(button.text()).toBe('Make Your Burger')

    

})

it('should have the correct attributes on the button', () => {
    const wrapper = mount(Banner)
    const button = wrapper.find('a')

    expect(button.attributes('href')).toBe('#div-pedido')
})

it('should call scrollToForm when the button is clicked', async () => {
    const wrapper = mount(Banner)
    const spy = vi.spyOn(wrapper.vm, 'scrollToForm') // Espiona diretamente a função do wrapper

    const button = wrapper.find('a')
    await button.trigger('click')

    expect(spy).toHaveBeenCalledOnce()
})

it('should prevent default event on button click', async () => {
    const wrapper = mount(Banner)
    const button = wrapper.find('a')

    const event = { preventDefault: vi.fn() }
    await wrapper.vm.scrollToForm(event) // Chama diretamente a função

    expect(event.preventDefault).toHaveBeenCalled()
})