const LABELS_PRIORIDADE = { alta: 'Alta', media: 'Média', baixa: 'Baixa' };

function Cartao({ cartao, onArrastar, onClicar }) {
  return (
    <div
      className="cartao"
      draggable
      onDragStart={(e) => {
        e.dataTransfer.setData('text/plain', cartao.id);
        onArrastar(cartao.id);
      }}
      onClick={() => onClicar(cartao)}
    >
      <div className="cartao-topo">
        <span className="cartao-codigo">{cartao.codigo}</span>
        <span className={`etiqueta-prioridade prioridade-${cartao.prioridade}`}>
          {LABELS_PRIORIDADE[cartao.prioridade]}
        </span>
      </div>
      <h3 className="cartao-titulo">{cartao.titulo}</h3>
      {cartao.descricao && <p className="cartao-descricao">{cartao.descricao}</p>}
    </div>
  );
}

export default Cartao;
