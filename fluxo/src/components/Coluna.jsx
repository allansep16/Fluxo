import { useState } from 'react';
import Cartao from './Cartao.jsx';

function Coluna({ coluna, cartoes, onSoltar, onArrastar, onClicarCartao, onNovoCartao, onRemoverColuna, onRenomearColuna }) {
  const [arrastandoSobre, setArrastandoSobre] = useState(false);
  const [editandoTitulo, setEditandoTitulo] = useState(false);
  const [tituloTemp, setTituloTemp] = useState(coluna.titulo);

  const confirmarTitulo = () => {
    setEditandoTitulo(false);
    if (tituloTemp.trim()) onRenomearColuna(coluna.id, tituloTemp.trim());
    else setTituloTemp(coluna.titulo);
  };

  return (
    <div
      className={`coluna ${arrastandoSobre ? 'coluna-recebendo' : ''}`}
      onDragOver={(e) => {
        e.preventDefault();
        setArrastandoSobre(true);
      }}
      onDragLeave={() => setArrastandoSobre(false)}
      onDrop={(e) => {
        e.preventDefault();
        setArrastandoSobre(false);
        const id = e.dataTransfer.getData('text/plain');
        onSoltar(id, coluna.id);
      }}
    >
      <div className="coluna-cabecalho" style={{ '--cor-acento': coluna.corAcento }}>
        <span className="coluna-marca" />
        {editandoTitulo ? (
          <input
            className="coluna-titulo-input"
            value={tituloTemp}
            autoFocus
            onChange={(e) => setTituloTemp(e.target.value)}
            onBlur={confirmarTitulo}
            onKeyDown={(e) => e.key === 'Enter' && confirmarTitulo()}
          />
        ) : (
          <h2 className="coluna-titulo" onClick={() => setEditandoTitulo(true)}>
            {coluna.titulo}
          </h2>
        )}
        <span className="coluna-contagem">{cartoes.length}</span>
        <button className="coluna-remover" onClick={() => onRemoverColuna(coluna.id)} title="Remover coluna">
          ×
        </button>
      </div>

      <div className="coluna-corpo">
        {cartoes.map((cartao) => (
          <Cartao key={cartao.id} cartao={cartao} onArrastar={onArrastar} onClicar={onClicarCartao} />
        ))}
        {cartoes.length === 0 && <p className="coluna-vazia">Arraste um cartão pra cá.</p>}
      </div>

      <button className="coluna-add-cartao" onClick={() => onNovoCartao(coluna.id)}>
        + Novo cartão
      </button>
    </div>
  );
}

export default Coluna;
