import { useEffect } from "react";
import { api } from "../../services/api";
import { Container } from "./styles";

export function TransactionsTable() {
  useEffect(() => {
    api.get('transactions')
    .then(response => console.log(response.data))
  }, []);

  return(
    <Container>
      <table>
        <thead>
          <tr>
            <th>Título</th>
            <th>Valor</th>
            <th>Categoria</th>
            <th>Data</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>Desenvolvimento de website</td>
            <td className="deposit">R$12.000</td>
            <td>Desenvolvimento</td>
            <td>20/06/2021</td>
          </tr>
          <tr>
            <td>Salário</td>
            <td className="deposit">R$4.500</td>
            <td>Trabalho</td>
            <td>05/07/2021</td>
          </tr>
          <tr>
            <td>Aluguel</td>
            <td className="withdraw">- R$1.120</td>
            <td>Casa</td>
            <td>07/07/2021</td>
          </tr>
        </tbody>
      </table>
    </Container>
  );
};