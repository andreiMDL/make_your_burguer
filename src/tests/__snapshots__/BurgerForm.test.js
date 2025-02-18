import { expect, it, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { flushPromises } from '@vue/test-utils';
import { nextTick } from 'vue';
import BurgerForm from '/home/leader/Make_Your_Burguer/make_your_burguer/src/components/BurgerForm.vue'

it('should render the burger form', () => {
    const wrapper = mount(BurgerForm)
    
    expect(wrapper.find('.burger-form').exists()).toBe(true)
    expect(wrapper.find('#nome').exists()).toBe(true)
    expect(wrapper.find('#pao').exists()).toBe(true)
    expect(wrapper.find('#carne').exists()).toBe(true)
    expect(wrapper.find('#opcionais-container').exists()).toBe(true)
    expect(wrapper.find('.submit-btn').exists()).toBe(true)
})

it('should show the options for pao', async () => {
    const wrapper = mount(BurgerForm)

    await flushPromises()

    expect(wrapper.findAll('#pao option'))
    const paoOptions = wrapper.findAll('#pao option');
    expect(paoOptions.length).toBeGreaterThan(1);
})

it('should show the options for carne', async () => {
    const wrapper = mount(BurgerForm)

    await flushPromises()

    expect(wrapper.findAll('#carne option'))
    const carneOptions = wrapper.findAll('#carne option')
    expect(carneOptions.length).toBeGreaterThan(1)
})


//CONFERIR ESSE TESTE
it('should show the options for opcionais', async () => {
    const wrapper = mount(BurgerForm)

    
    const opcionaisOptions = wrapper.findAll()
    expect(opcionaisOptions.length).toBeGreaterThan(0)
    console.log(wrapper.html())
})

