const { createApp } = Vue

createApp({
  data() {
    return {
      usuario: '',
      senha: '',
      mensagem: '', 
      successModalTitle: '',
      successModalBody: '',
      loginModalInstance: null 
    }
  },
  
  mounted() {
    
    if (this.$refs.loginModalRef) { 
      this.loginModalInstance = new bootstrap.Modal(this.$refs.loginModalRef);
    }
  },
  methods: {
    fazerLogin() {
      this.mensagem = ''; 

      if (this.usuario.trim() === '' || this.senha.trim() === '') {
        this.mensagem = 'Por favor, preencha todos os campos.';
        return;
      }

      this.successModalTitle = 'Login Bem-sucedido!';
      this.successModalBody = 'Você será redirecionado para a página Home.';
      
      if (this.loginModalInstance) {
        this.loginModalInstance.show();
      }
    
      this.usuario = '';
      this.senha = '';
      this.mensagem = '';

      setTimeout(() => {
        if (this.loginModalInstance) {
          this.loginModalInstance.hide(); 
        }
        window.location.href = 'home.html';
      }, 3000); 
    }
  }
}).mount('#app')