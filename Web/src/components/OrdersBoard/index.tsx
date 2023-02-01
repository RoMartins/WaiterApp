import { useState } from 'react';
import { Order } from '../../types/Order';
import { api } from '../../utils/api';
import { OrderModal } from '../OrderModal';
import {Board, OrdersContainer} from './styles';


interface OrderBoardsProps {
  icon: string;
  title: string;
  orders: Order[];
  updateOrders: (orderId: string) => void
}
export function OrdersBoard({icon, title, orders, updateOrders}:OrderBoardsProps) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [orderSelected, setOrderSelected] = useState<null | Order>(null);
  const [isLoading, setIsLoading] = useState(false);


  function handleOpenOrderModal(order : Order) {
    setOrderSelected(order);
    setIsModalVisible(true);
  }

  function handleCloseOrderModal() {
    setOrderSelected(null);
    setIsModalVisible(false);
  }

  async function handleCancelOrder() {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    await api.delete(`/orders/${orderSelected?._id}`);

    updateOrders(orderSelected!._id);
    setIsLoading(false);
    setIsModalVisible(false);
  }
  return (
    <Board>

      <OrderModal
        visible={isModalVisible}
        order={orderSelected}
        onClose={handleCloseOrderModal}
        onCancelOrder={handleCancelOrder}
        loading={isLoading}
      />

      <header>
        <span>{icon}</span>
        <strong>{title}</strong>
        <span>({orders.length})</span>
      </header>

      {orders.length > 0 && (
        <OrdersContainer>
          {
            orders.map((order) => (
              <button key={order._id} type='button' onClick={() => handleOpenOrderModal(order)}>
                <strong>{order.table}</strong>
                <span>{order.products.length} itens</span>
              </button>
            ) )
          }
        </OrdersContainer>

      ) }
    </Board>

  );
}
