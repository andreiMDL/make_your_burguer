import Footer from "../components/Footer.vue"
import { expect, it, vi } from 'vitest'
import { mount } from '@vue/test-utils'



it('should render the footer', async () => {
    const wrapper = mount(Footer)

    expect(wrapper.find('#footer').exists()).toBe(true)
})