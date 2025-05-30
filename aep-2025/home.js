const { createApp, ref, computed } = Vue;

createApp({
  setup() {
    const tipoPatrimonio = ref('');
    const localizacao = ref('');
    const descricaoProblema = ref('');
    const anonimo = ref(false);

    // Nova variável reativa para armazenar a URL da imagem selecionada para o modal
    const imagemSelecionada = ref(''); 

    const denuncias = ref([
      {
        titulo: 'Dano em Obra de Arte no Parque do Ingá',
        local: 'Parque do Ingá, próximo à entrada principal',
        descricao: 'Escultura com danos na base, possivelmente causados por vandalismo. Necessita reparo urgente.',
        data: '20/05/2025',
        status: 'Em Análise',
        imagens: ['https://1.bp.blogspot.com/-w2PwSopGNNc/Tf0r-PVfl-I/AAAAAAAAggw/lL4__vYv2Yo/s512/senhora.JPG']
      },
      {
        titulo: 'Chuva danifica pista de caminhada no Parque do Ingá',
        local: 'Parque do Ingá, pista de caminhada',
        descricao: 'Forte chuva fez com que o piso da pista de caminhada no Parque do Ingá se soltasse e fosse destruído em alguns trechos.',
        data: '18/05/2025',
        status: 'Em Andamento',
        imagens: ['https://www.maringamais.com.br/wp-content/uploads/2022/02/pista-estragada.jpeg'] 
      },
      {
        titulo: 'Pichação em Monumento Histórico',
        local: 'Catedral Basílica, fachada lateral',
        descricao: 'Pichação removida com sucesso. Monumento restaurado pela equipe de conservação municipal.',
        data: '15/05/2025',
        status: 'Resolvido',
        imagens: ['https://gmconline.com.br/wp-content/uploads/2022/10/ec78e180-0ddc-40ba-a728-9814f674c67c.jpg'] 
      }
    ]);

    const denunciasAtivasCount = computed(() => {
      return denuncias.value.filter(d => d.status === 'Em Análise' || d.status === 'Em Andamento').length;
    });

    const denunciasResolvidasMesCount = computed(() => {
      const mesAtual = new Date().getMonth(); 
      const anoAtual = new Date().getFullYear();

      return denuncias.value.filter(d => {
        const [dia, mes, ano] = d.data.split('/').map(Number);
        return d.status === 'Resolvido' && (mes - 1) === mesAtual && ano === anoAtual;
      }).length;
    });

    const localMaisDenunciado = computed(() => {
      if (denuncias.value.length === 0) {
        return 'Nenhum Local';
      }

      const localCount = {};
      denuncias.value.forEach(d => {
        localCount[d.local] = (localCount[d.local] || 0) + 1;
      });

      let maxCount = 0;
      let local = '';
      for (const key in localCount) {
        if (localCount[key] > maxCount) {
          maxCount = localCount[key];
          local = key;
        }
      }
      return local;
    });

    const getStatusClass = (status) => {
      switch (status) {
        case 'Em Análise':
          return 'status-analise';
        case 'Em Andamento':
          return 'status-andamento';
        case 'Resolvido':
          return 'status-resolvido';
        default:
          return '';
      }
    };

    const enviarDenuncia = (e) => {
      e.preventDefault();

      if (!tipoPatrimonio.value || !localizacao.value || !descricaoProblema.value) {
        alert("Por favor, preencha todos os campos obrigatórios (Tipo, Localização e Descrição do Problema).");
        return;
      }

      const novaDenuncia = {
        titulo: `Nova denúncia: ${tipoPatrimonio.value}`,
        local: localizacao.value,
        descricao: descricaoProblema.value,
        data: new Date().toLocaleDateString('pt-BR'),
        status: 'Em Análise',
        imagens: []  
      };

      // Simula o upload de imagem. Em um ambiente real, você faria um upload de arquivo e obteria a URL.
      const uploadImagensInput = document.getElementById('uploadImagens');
      if (uploadImagensInput && uploadImagensInput.files.length > 0) {
        // Por simplicidade, vamos apenas pegar a primeira imagem para exibição no modal
        // Em um cenário real, você processaria todas as imagens e as adicionaria ao array
        novaDenuncia.imagens.push(URL.createObjectURL(uploadImagensInput.files[0]));
      }

      denuncias.value.unshift(novaDenuncia); 
      
      tipoPatrimonio.value = '';
      localizacao.value = '';
      descricaoProblema.value = '';
      anonimo.value = false;

      const modalElement = document.getElementById('novaDenunciaModal');
      const modal = bootstrap.Modal.getInstance(modalElement);
      if (modal) {
        modal.hide();
      } else {
        new bootstrap.Modal(modalElement).hide();
      }
    };

    // Nova função para abrir o modal de imagem
    const abrirModalImagem = (urlImagem) => {
      imagemSelecionada.value = urlImagem;
      const modalElement = document.getElementById('imagemModal');
      const modal = new bootstrap.Modal(modalElement);
      modal.show();
    };

    return {
      tipoPatrimonio,
      localizacao,
      descricaoProblema,
      anonimo,
      denuncias,
      denunciasAtivasCount,
      denunciasResolvidasMesCount,
      localMaisDenunciado,
      getStatusClass,
      enviarDenuncia,
      // Retorna a nova variável e função
      imagemSelecionada, 
      abrirModalImagem 
    };
  }
}).mount('#app');