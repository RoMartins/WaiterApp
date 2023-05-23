import { useState } from 'react';
import { toast } from 'react-toastify';
import { Order } from '../../types/Order';
import { api } from '../../utils/api';
import { OrderModal } from '../OrderModal';
import {Board, OrdersContainer} from './styles';


interface OrderBoardsProps {
  icon: string;
  title: string;
  orders: Order[];
  onCancelOrder: (orderId: string) => void;
  onChangeOrderStatus: (orderId: string, status: Order['status']) => void
}

export function OrdersBoard({icon, title, orders, onCancelOrder, onChangeOrderStatus}:OrderBoardsProps) {
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

  async function handleChangelOrderStatus() {
    setIsLoading(true);

    const status = orderSelected?.status === 'WAITING' ? 'IN_PRODUCTION' : 'DONE';

    await api.patch(`/orders/${orderSelected?._id}`, {status});

    toast.success(`O status do pedido da mesa ${orderSelected?.table} foi alterado!`);
    onChangeOrderStatus(orderSelected!._id, status);
    setIsLoading(false);
    setIsModalVisible(false);
  }

  async function handleCancelOrder() {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    await api.delete(`/orders/${orderSelected?._id}`);

    toast.success(`O pedido da mesa ${orderSelected?.table} foi cancelado!`);
    onCancelOrder(orderSelected!._id);
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
        onChangeOrderStatus = {handleChangelOrderStatus}
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
