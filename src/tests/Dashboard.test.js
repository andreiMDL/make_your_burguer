import { expect, it} from 'vitest'
import { mount } from '@vue/test-utils'
import { flushPromises } from '@vue/test-utils';
import Dashboard from '/home/leader/Make_Your_Burguer/make_your_burguer/src/components/Dashboard.vue';

it('should render the dashboard', async () => {
    const wrapper = mount(Dashboard)

    expect(wrapper.find('.order-id').exists()).toBe(true)  
    expect(wrapper.find('#burger-table').exists()).toBe(true)
    expect(wrapper.find('#burger-table-heading').exists()).toBe(true)
    expect(wrapper.find('#burger-table-rows').exists()).toBe(true)
})

it('should show pedidos', async () => {
    const wrapper = mount(Dashboard)

    await flushPromises()
    await wrapper.vm.$nextTick()

    expect(wrapper.findAll('#burger-table-rows').length).toBeGreaterThan(0)

})


it('should update the status', async () => {
    const wrapper = mount(Dashboard)

    await wrapper.setData({ // preenche a lista de pães artificialmente para simular a resposta do servidor
        status: [{ id: 1, tipo: "Solicitado"}, { id: 2, tipo: "Em produção"}]
    })
})

const mockPedidos = [
    {
      id: 1,
      nome: 'Burger Especial',
      status: 'Pendente'
    },
    {
      id: 2,
      nome: 'X-Bacon',
      status: 'Preparando'
    }
  ];
  
  // Mock da API
  global.fetch = vi.fn((url, options) => {
    if (options && options.method === 'DELETE') {
      return Promise.resolve({ ok: true, json: () => Promise.resolve({}) });
    }
    return Promise.resolve({
      json: () => Promise.resolve(mockPedidos)
    });
  });
  
