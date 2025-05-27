const { createApp } = Vue

createApp({
  data() {
    return {
      usuario: '',
      senha: '',
      senha2: '',
      mensagem: ''
    }
  },
  methods: {
    fazerLogin() {
      if (!this.usuario || !this.senha || !this.senha2) {
        this.mensagem = 'Por favor, preencha todos os campos.'
        return
      }

      if (this.senha !== this.senha2) {
        this.mensagem = 'As senhas não coincidem.'
        return
      }

      alert(`Bem-vindo, ${this.usuario}! Login realizado com sucesso.`)

      this.usuario = ''
      this.senha = ''
      this.senha2 = ''
      this.mensagem = ''
    }
  }
}).mount('#app')
