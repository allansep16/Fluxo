import { useState, useEffect } from 'react';

function ModalCartao({ cartao, onSalvar, onExcluir, onFechar }) {
  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [prioridade, setPrioridade] = useState('media');

  useEffect(() => {
    if (cartao?.id) {
      setTitulo(cartao.titulo || '');
      setDescricao(cartao.descricao || '');
      setPrioridade(cartao.prioridade || 'media');
    } else {
      setTitulo('');
      setDescricao('');
      setPrioridade('media');
    }
  }, [cartao]);

  const salvar = () => {
    if (!titulo.trim()) return;
    onSalvar({ titulo: titulo.trim(), descricao: descricao.trim(), prioridade });
  };

  return (
    <div className="modal-fundo" onClick={onFechar}>
      <div className="modal-caixa" onClick={(e) => e.stopPropagation()}>
        {cartao?.codigo && <span className="modal-codigo">{cartao.codigo}</span>}
        <h2 className="modal-titulo">{cartao?.id ? 'Editar cartão' : 'Novo cartão'}</h2>

        <label className="modal-label">Título</label>
        <input
          className="modal-input"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          placeholder="O que precisa ser feito?"
          autoFocus
        />

        <label className="modal-label">Descrição</label>
        <textarea
          className="modal-textarea"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
          placeholder="Detalhes (opcional)"
        />

        <label className="modal-label">Prioridade</label>
        <div className="modal-prioridades">
          {['baixa', 'media', 'alta'].map((p) => (
            <button
              key={p}
              type="button"
              className={`chip-prioridade prioridade-${p} ${prioridade === p ? 'chip-ativo' : ''}`}
              onClick={() => setPrioridade(p)}
            >
              {p === 'media' ? 'Média' : p === 'alta' ? 'Alta' : 'Baixa'}
            </button>
          ))}
        </div>

        <div className="modal-acoes">
          {cartao?.id && (
            <button className="modal-btn-excluir" onClick={() => onExcluir(cartao.id)}>
              Excluir
            </button>
          )}
          <div className="modal-acoes-direita">
            <button className="modal-btn-cancelar" onClick={onFechar}>Cancelar</button>
            <button className="modal-btn-salvar" onClick={salvar}>Salvar</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ModalCartao;
