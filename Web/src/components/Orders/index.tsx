import { useEffect, useState } from 'react';
import { Order } from '../../types/Order';
import { api } from '../../utils/api';
import { OrdersBoard } from '../OrdersBoard';
import {Content} from './styles';




export function Orders() {
  const [orders, setOrders] = useState<Order[]>([]);
  useEffect(() => {
    api.get('/orders')
      .then(({data}) => {
        setOrders(data);
      });
  },[]);

  const waitingOrders = orders.filter((order) => order.status === 'WAITING');
  const inProductionOrders = orders.filter((order) => order.status === 'IN_PRODUCTION');
  const doneOrders = orders.filter((order) => order.status === 'DONE');

  function handleUpdateOrders(orderId: string) {
    setOrders((prevState) => prevState.filter((order) => order._id !== orderId));
  }

  return (
    <Content>
      <OrdersBoard
        icon ="🕑"
        title ="Fila de espera!"
        orders={waitingOrders}
        updateOrders={handleUpdateOrders}
      />

      <OrdersBoard
        icon ="👩‍🍳"
        title ="Em produção!"
        orders={inProductionOrders}
        updateOrders={handleUpdateOrders}

      />

      <OrdersBoard
        icon ="✅"
        title ="Pronto!"
        orders={doneOrders}
        updateOrders={handleUpdateOrders}

      />
    </Content>
  );
}




