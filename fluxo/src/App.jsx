import { useState } from 'react';
import { useBoard } from './hooks/useBoard.js';
import Coluna from './components/Coluna.jsx';
import ModalCartao from './components/ModalCartao.jsx';

function App() {
  const board = useBoard();
  const [cartaoModal, setCartaoModal] = useState(null);
  const [colunaParaNovoCartao, setColunaParaNovoCartao] = useState(null);
  const [adicionandoColuna, setAdicionandoColuna] = useState(false);
  const [tituloNovaColuna, setTituloNovaColuna] = useState('');

  const abrirNovoCartao = (colunaId) => {
    setColunaParaNovoCartao(colunaId);
    setCartaoModal({});
  };

  const fecharModal = () => {
    setCartaoModal(null);
    setColunaParaNovoCartao(null);
  };

  const salvarCartao = (dados) => {
    if (cartaoModal?.id) {
      board.atualizarCartao(cartaoModal.id, dados);
    } else {
      board.adicionarCartao(colunaParaNovoCartao, dados);
    }
    fecharModal();
  };

  const excluirCartao = (id) => {
    board.removerCartao(id);
    fecharModal();
  };

  const confirmarNovaColuna = () => {
    if (tituloNovaColuna.trim()) board.adicionarColuna(tituloNovaColuna.trim());
    setTituloNovaColuna('');
    setAdicionandoColuna(false);
  };

  return (
    <div className="app">
      <header className="app-cabecalho">
        <div className="app-marca">
          <span className="app-selo">MANIFESTO Nº 01</span>
          <h1 className="app-titulo">Fluxo</h1>
          <p className="app-subtitulo">Cada tarefa, um item rastreado do início ao fim.</p>
        </div>
      </header>

      <div className="quadro">
        {board.colunas.map((coluna) => (
          <Coluna
            key={coluna.id}
            coluna={coluna}
            cartoes={board.cartoes.filter((c) => c.colunaId === coluna.id)}
            onSoltar={board.moverCartao}
            onArrastar={() => {}}
            onClicarCartao={setCartaoModal}
            onNovoCartao={abrirNovoCartao}
            onRemoverColuna={board.removerColuna}
            onRenomearColuna={board.renomearColuna}
          />
        ))}

        <div className="coluna-nova">
          {adicionandoColuna ? (
            <div className="coluna-nova-form">
              <input
                autoFocus
                value={tituloNovaColuna}
                onChange={(e) => setTituloNovaColuna(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && confirmarNovaColuna()}
                placeholder="Nome da coluna"
              />
              <div className="coluna-nova-botoes">
                <button onClick={confirmarNovaColuna}>Adicionar</button>
                <button className="btn-secundario" onClick={() => setAdicionandoColuna(false)}>Cancelar</button>
              </div>
            </div>
          ) : (
            <button className="coluna-nova-btn" onClick={() => setAdicionandoColuna(true)}>
              + Nova coluna
            </button>
          )}
        </div>
      </div>

      {cartaoModal && (
        <ModalCartao
          cartao={cartaoModal}
          onSalvar={salvarCartao}
          onExcluir={excluirCartao}
          onFechar={fecharModal}
        />
      )}
    </div>
  );
}

export default App;
