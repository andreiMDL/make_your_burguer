import { expect, it, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { flushPromises } from '@vue/test-utils';
import { nextTick } from 'vue';
import BurgerForm from '/home/leader/Make_Your_Burguer/make_your_burguer/src/components/BurgerForm.vue'
import { json } from 'stream/consumers';
import { vi } from 'vitest';

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
    expect(paoOptions.length).toBeGreaterThan(0);
})

it('should show the options for carne', async () => {
    const wrapper = mount(BurgerForm)

    await flushPromises()

    expect(wrapper.findAll('#carne option'))
    const carneOptions = wrapper.findAll('#carne option')
    expect(carneOptions.length).toBeGreaterThan(0)
})


//CONFERIR ESSE TESTE
it('should show the options for opcionais', async () => {
    const wrapper = mount(BurgerForm)

    // Simulando os dados que viriam do fetch
    await wrapper.setData({
        opcionaisData: [
            { id: 1, tipo: "Queijo" },
            { id: 2, tipo: "Bacon" }
        ]
    });

    await flushPromises(); // Aguarda atualização do DOM

    const checkboxes = wrapper.findAll('.checkbox-container input[type="checkbox"]');
    
    expect(checkboxes.length).toBeGreaterThan(0);
});

it('should update the name when user types', async () => {
    const wrapper = mount(BurgerForm)

    const input = wrapper.find('#nome') // busca o campo de nome no formulário
    await input.setValue('João') //simula o usuário digitando "João"

    expect(wrapper.vm.nome).toBe('João')//verifica se o v-model="nome" foi atualizado

    //se esse teste falhar, significa que o campo v-model="nome" não está funcionando corretamente
})

it('should update the bread type when selected', async () => {
    const wrapper = mount(BurgerForm)

    await wrapper.setData({ // preenche a lista de pães artificialmente para simular a resposta do servidor
        paes: [{ id: 1, tipo: "Italiano Branco"}, { id: 2, tipo: "Integral"}]
    });

    const select = wrapper.find("#pao")// busca o campo de pão no formulário
    await select.setValue("Italiano Branco")// simula o usuário escolhendo o pão italiano branco no <select>

    expect(wrapper.vm.pao).toBe("Italiano Branco") // verifica se o v-model"pao" foi atualizado corretamente
})

it('should update the meat type when selected', async() => {
    const wrapper = mount(BurgerForm)

    await wrapper.setData({// preenche a lista de carnes artificialmente para simular a resposta do servidor
        carnes: [{id: 1, tipo: "Picanha"}, {id: 2, tipo: "Maminha"}]
    });

    const select = wrapper.find("#carne")// busca o campo de carne no formulário
    await select.setValue("Picanha")// simula o usuário escolhendo picanha no <select>

    expect(wrapper.vm.carne).toBe("Picanha")// verifica se o v-model"carne" foi atualizado corretamente
})

it('should update opcionais when checkboxes are clicked', async() => {
    const wrapper = mount(BurgerForm)

    await wrapper.setData({//Preenche a lista de opcionais artificialmente
        opcionaisData: [
            {id: 1, tipo: "Bacon"},
            {id: 2, tipo: "Cheddar"}
        ]
    });

    const checkboxes = wrapper.findAll('input[type="checkbox"]')//busca todos os checkboxes

    await checkboxes[0].setChecked();//simula o click nos checkboxes
    await checkboxes[1].setChecked();

    expect(wrapper.vm.opcionais).toEqual(["Bacon", "Cheddar"])//verifica se os opcionais foram adicionados corretamente

    await checkboxes[0].setChecked(false);
    expect(wrapper.vm.opcionais).toEqual(['Cheddar'])//verifica se os opcionais foram removidos corretamente
    
})

 
it('should show an error message when name is empty', async () => {
    // Montando o componente
    const wrapper = mount(BurgerForm)
    
    // Simulando o envio do formulário com o nome vazio
    await wrapper.find('form').trigger('submit.prevent')  // Usando "submit.prevent" para disparar o evento de submit no Vue
    
    // Espera a próxima atualização do DOM
    await wrapper.vm.$nextTick()
    
    // Verificar se a propriedade 'nome' é inválida
    expect(wrapper.vm.errors.nome).toBe(true)

   // Verificar se a mensagem de erro está visível
    expect(wrapper.find('.error-message').exists()).toBe(true)

    // Verificar se a classe de erro foi adicionada ao campo "nome"
    expect(wrapper.find('#nome').classes()).toContain('input-error')
  })

it('should show an error message when bread is not selected', async() => {
    const wrapper = mount(BurgerForm)

    await wrapper.find('form').trigger('submit.prevent')
    await wrapper.vm.$nextTick()

    expect(wrapper.vm.errors.pao).toBe(true)
    expect(wrapper.find('.error-message').exists()).toBe(true)
    expect(wrapper.find('#pao').classes()).toContain('input-error')
})

it('should show an error message when bread is not selected', async() => {
    const wrapper = mount(BurgerForm)

    await wrapper.find('form').trigger('submit.prevent')
    await wrapper.vm.$nextTick()

    expect(wrapper.vm.errors.carne).toBe(true)
    expect(wrapper.find('.error-message').exists()).toBe(true)
    expect(wrapper.find('#carne').classes()).toContain('input-error')
})



it('should submit the form correctly when all fields are filled', async() => {
    const wrapper = mount(BurgerForm)

    global.fetch = vi.fn().mockResolvedValue({
        json: () => Promise.resolve({ success:true })
    })

    await wrapper.setData({
        nome: "Andrei",
        carne: "Picanha",
        pao: "Italiano Branco",
        opcionais: ["Cheddar"]
    })

    await wrapper.find('form').trigger('submit.prevent')

    expect(global.fetch).toHaveBeenCalledWith('http://localhost:3000/burgers', expect.objectContaining({
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({
            nome: "Andrei",
            carne: "Picanha",
            pao: "Italiano Branco",
            opcionais: ["Cheddar"],
            status: "Solicitado"
        })
    }))

   expect(wrapper.vm.nome).toBe("")
   expect(wrapper.vm.carne).toBe("")
   expect(wrapper.vm.pao).toBe("")
})


