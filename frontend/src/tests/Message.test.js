import { mount } from "@vue/test-utils";
import { expect, it, vi } from 'vitest'
import Message from '/home/leader/Make_Your_Burguer/make_your_burguer/src/components/Message.vue'
import { wrap } from "module";

it('should render the Message', async () => {
    const wrapper = mount(Message)

    expect(wrapper.find(".message-container").exists()).toBe(true)
})