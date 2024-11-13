const URL_BASE = 'http://localhost:3000';

const api = {
  async buscarFeed() {
    try {
      const response = await fetch(`${URL_BASE}/mensagem`);
      if (!response.ok) {
        throw new Error('Erro ao buscar mensagens');
      }
      return await response.json();
    } catch (error) {
      alert('Erro ao buscar mensagem');
      console.error(error);
      throw error;
    }
  },

  async salvarNoFeed(mensagem) {
    try {
      const response = await fetch(`${URL_BASE}/mensagem`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(mensagem)
      });

      if (!response.ok) {
        throw new Error('Erro ao salvar mensagem');
      }
      return await response.json();
    } catch (error) {
      alert('Erro ao enviar mensagem');
      console.error(error);
      throw error;
    }
  },

  async buscarUltimoId() {
    try {
      const response = await fetch(`${URL_BASE}/mensagem`);
      const mensagens = await response.json();
      if (mensagens.length > 0) {
        return parseInt(mensagens[mensagens.length - 1].id);
      }
      return 0;
    } catch (error) {
      alert('Erro ao buscar último ID');
      console.error(error);
      throw error;
    }
  }
};

export default api;
