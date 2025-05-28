const { createApp } = Vue

createApp({
  data() {
    return {
      usuario: '',
      email: '',
      senha: '',
      cidade: 'sim',
      mensagem: '',
      mensagemTipo: '', 
      successModalTitle: '',
      successModalBody: '',
      successModalInstance: null 
    }
  },
 
  mounted() {
    
    if (this.$refs.successModalRef) { 
      this.successModalInstance = new bootstrap.Modal(this.$refs.successModalRef);
    }
  },
  methods: {
    registrar() {
      this.mensagem = ''; 
      this.mensagemTipo = '';

      if (this.usuario.trim() === '' || this.email.trim() === '' || this.senha.trim() === '') {
        this.mensagem = 'Por favor, preencha todos os campos obrigatórios!';
        this.mensagemTipo = 'danger'; 
        return;
      }
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(this.email)) {
        this.mensagem = 'Por favor, insira um endereço de e-mail válido.';
        this.mensagemTipo = 'danger'; 
        return;
      }
      
     
      setTimeout(() => {
        
        this.successModalTitle = 'Cadastro Realizado!';
        this.successModalBody = `O usuário "${this.usuario}" foi cadastrado com sucesso! Você será redirecionado para a página de login.`;
        
        
        if (this.successModalInstance) {
          this.successModalInstance.show();
        }
        this.usuario = '';
        this.email = '';
        this.senha = '';
        this.cidade = 'sim';
        this.mensagem = ''; 

        setTimeout(() => {
          if (this.successModalInstance) {
            this.successModalInstance.hide();
          }
          window.location.href = 'login.html'; 
        }, 3000);

      }, 1500); 
    }
  }
}).mount('#app')