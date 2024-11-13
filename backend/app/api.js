import axios from 'axios';

const URL_BASE = 'http://localhost:3000';

const api = {
  async buscarFeed() {
    try {
      const response = await axios.get(`${URL_BASE}/mensagem`);
      return response.data
    } catch (error) {
      alert('Erro ao buscar mensagem');
      console.error(error);
      throw error;
    }
  },

  async salvarNoFeed(mensagem) {
    try {
      const response = await axios.post(`${URL_BASE}/mensagem`, mensagem, )
      return response.data;
    } catch (error) {
      alert('Erro ao enviar mensagem');
      console.error(error);
      throw error;
    }
  },

  async buscarUltimoId() {
    try {
      const response = await axios.get(`${URL_BASE}/mensagem`);
      const mensagens = response.data;
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
