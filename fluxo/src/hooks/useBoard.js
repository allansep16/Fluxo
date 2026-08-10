import { useState, useEffect, useCallback, useRef } from 'react';

const CHAVE_STORAGE = '@fluxo_board';

const ESTADO_INICIAL = {
  colunas: [
    { id: 'col-1', titulo: 'A Fazer', corAcento: '#8C6B4A' },
    { id: 'col-2', titulo: 'Em Andamento', corAcento: '#253B54' },
    { id: 'col-3', titulo: 'Concluído', corAcento: '#3D6B4A' }
  ],
  cartoes: [
    {
      id: 'card-1',
      codigo: 'FLX-1001',
      colunaId: 'col-1',
      titulo: 'Revisar currículo pra vaga X',
      descricao: 'Ajustar resumo e conferir os links dos projetos antes de enviar.',
      prioridade: 'alta'
    },
    {
      id: 'card-2',
      codigo: 'FLX-1002',
      colunaId: 'col-2',
      titulo: 'Estudar SQL avançado',
      descricao: 'Joins, subqueries e índices — 1h por dia.',
      prioridade: 'media'
    },
    {
      id: 'card-3',
      codigo: 'FLX-1003',
      colunaId: 'col-3',
      titulo: 'Publicar projeto no GitHub',
      descricao: '',
      prioridade: 'baixa'
    }
  ]
};

function carregarEstado() {
  try {
    const salvo = localStorage.getItem(CHAVE_STORAGE);
    return salvo ? JSON.parse(salvo) : ESTADO_INICIAL;
  } catch {
    return ESTADO_INICIAL;
  }
}

export function useBoard() {
  const [colunas, setColunas] = useState(() => carregarEstado().colunas);
  const [cartoes, setCartoes] = useState(() => carregarEstado().cartoes);
  const proximoCodigo = useRef(
    1000 +
      carregarEstado().cartoes.reduce((max, c) => {
        const n = parseInt(c.codigo.split('-')[1], 10);
        return Number.isFinite(n) && n > max ? n : max;
      }, 0) +
      1
  );

  useEffect(() => {
    localStorage.setItem(CHAVE_STORAGE, JSON.stringify({ colunas, cartoes }));
  }, [colunas, cartoes]);

  const gerarCodigo = useCallback(() => {
    const codigo = `FLX-${proximoCodigo.current}`;
    proximoCodigo.current += 1;
    return codigo;
  }, []);

  const adicionarCartao = useCallback(
    (colunaId, { titulo, descricao, prioridade }) => {
      const novo = {
        id: `card-${Date.now()}`,
        codigo: gerarCodigo(),
        colunaId,
        titulo,
        descricao: descricao || '',
        prioridade: prioridade || 'media'
      };
      setCartoes((atual) => [...atual, novo]);
    },
    [gerarCodigo]
  );

  const atualizarCartao = useCallback((id, dados) => {
    setCartoes((atual) => atual.map((c) => (c.id === id ? { ...c, ...dados } : c)));
  }, []);

  const removerCartao = useCallback((id) => {
    setCartoes((atual) => atual.filter((c) => c.id !== id));
  }, []);

  const moverCartao = useCallback((id, novaColunaId) => {
    setCartoes((atual) => atual.map((c) => (c.id === id ? { ...c, colunaId: novaColunaId } : c)));
  }, []);

  const adicionarColuna = useCallback((titulo) => {
    const cores = ['#8C6B4A', '#253B54', '#3D6B4A', '#B0432B', '#5B4B8A'];
    setColunas((atual) => [
      ...atual,
      { id: `col-${Date.now()}`, titulo, corAcento: cores[atual.length % cores.length] }
    ]);
  }, []);

  const removerColuna = useCallback((id) => {
    setColunas((atual) => atual.filter((c) => c.id !== id));
    setCartoes((atual) => atual.filter((c) => c.colunaId !== id));
  }, []);

  const renomearColuna = useCallback((id, titulo) => {
    setColunas((atual) => atual.map((c) => (c.id === id ? { ...c, titulo } : c)));
  }, []);

  return {
    colunas,
    cartoes,
    adicionarCartao,
    atualizarCartao,
    removerCartao,
    moverCartao,
    adicionarColuna,
    removerColuna,
    renomearColuna
  };
}
