import Modal from 'react-modal';
import { FormEvent, useState } from 'react';
import { useTransactions } from '../../hooks/useTransactions';

import incomeImg from '../../assets/income.svg';
import outcomeImg from '../../assets/outcome.svg';
import closeImg from '../../assets/close.svg';

import { Container, TransactionTypeContainer, ButtonRadio } from './styles';

interface NewTransactionModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
}

Modal.setAppElement('#root');

export function NewTransactionModal({ isOpen, onRequestClose }: NewTransactionModalProps) {
  const { createTransaction } = useTransactions();

  const [type, setType] = useState('deposit');
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState(0);
  const [category, setCategory] = useState('');

  async function handleCreateNewTransaction(event: FormEvent) {
    event.preventDefault();

    const transaction = {
      type,
      title,
      amount,
      category,
    }

    await createTransaction(transaction);

    setType('deposit');
    setTitle('');
    setAmount(0);
    setCategory('');
    onRequestClose();
  }

  return(
    <Modal
    isOpen={isOpen}
    onRequestClose={onRequestClose}
    overlayClassName="react-modal-overlay"
    className="react-modal-content"
    >
      <button 
        type="button" 
        onClick={onRequestClose} 
        className="react-modal-close"
      >
        <img src={closeImg} alt="Fechar Modal" />
      </button>

      <Container onSubmit={handleCreateNewTransaction}>
        <h2>Cadastrar transação</h2>

        <input
          placeholder="Título"
          value={title}
          onChange={event => setTitle(event.target.value)}
        />

        <input
          type="number"
          placeholder="Valor"
          value={amount}
          onChange={event => setAmount(Number(event.target.value))}
        />

        <TransactionTypeContainer>
          <ButtonRadio
            type="button"
            onClick={() => { setType('deposit'); }}
            isActive={type === 'deposit'}
            color='green'
          >
            <img src={incomeImg} alt="Entrada" />
            <span>Entrada</span>
          </ButtonRadio>

          <ButtonRadio
            type="button"
            onClick={() => { setType('withdraw'); }}
            isActive={type === 'withdraw'}
            color='red'
          >
            <img src={outcomeImg} alt="Saída" />
            <span>Saída</span>
          </ButtonRadio>
        </TransactionTypeContainer>

        <input 
          placeholder="Categoria"
          value={category}
          onChange={event => setCategory(event.target.value)}
        />

        <button type="submit">
          Cadastrar
        </button>
      </Container>

    </Modal>
  )
};