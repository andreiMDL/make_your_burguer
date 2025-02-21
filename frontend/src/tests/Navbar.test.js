import Navbar from '/home/leader/Make_Your_Burguer/make_your_burguer/src/components/Navbar.vue'
import { expect, it, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { createRouter, createWebHistory } from 'vue-router'

// Criando as rotas simuladas para o teste
const routes = [
  { path: '/', name: 'Home' },
  { path: '/pedidos', name: 'Pedidos' },
]

// Criando a instância do router antes de cada teste
let router

beforeEach(() => {
  router = createRouter({
    history: createWebHistory(),
    routes,
  })
})

it('should render the navbar', async () => {
  const wrapper = mount(Navbar, {
    global: {
      plugins: [router],
    },
  })

  expect(wrapper.find("#nav").exists()).toBe(true)
  expect(wrapper.find("#logo-text").exists()).toBe(true)
  expect(wrapper.find("#divRoutes").exists()).toBe(true)
})

it("should redirect to home", async () => {
  await router.push('/') // Navegue para a rota Home
  await router.isReady() // Aguarde o router estar pronto

  const wrapper = mount(Navbar, {
    global: {
      plugins: [router],
    },
  })

  const homeLink = wrapper.find('a[href="/"]')
  expect(homeLink.exists()).toBe(true)
  expect(homeLink.text()).toBe('Make Your Burger') // Confirme o texto, pode ser "Home" em vez de ''
})

it("should redirect to pedidos", async () => {
  await router.push('/pedidos') // Navegue para a rota Pedidos
  await router.isReady() // Aguarde o router estar pronto

  const wrapper = mount(Navbar, {
    global: {
      plugins: [router],
    },
  })

  const pedidosLink = wrapper.find("a[href='/pedidos']")
  expect(pedidosLink.exists()).toBe(true)
  expect(pedidosLink.text()).toBe("Pedidos")
})
