import { Order } from '../../types/Order';
import {Overlay,ModalBody,OrderDetails,Actions} from './styles';
import closeIcon from '../../assets/images/close-icon.svg';
import { formatCurrency } from '../../utils/formatCurrent';
import { KeyboardEvent, useEffect, useState } from 'react';

interface orderModalProps {
  visible : boolean
  order: Order | null
  onClose: () => void
  onCancelOrder: () => Promise<void>
  onChangeOrderStatus: () => Promise<void>

  loading: boolean
}

export function OrderModal({visible, order, onClose, onCancelOrder, loading, onChangeOrderStatus} : orderModalProps) {
  useEffect(() => {
    function hanldeKeyDown(event: KeyboardEvent) {
      if(event.key === 'Escape') {
        onClose();
      }
    }

    document.addEventListener('keydown', hanldeKeyDown);

    return () => {
      document.removeEventListener('keydown', hanldeKeyDown);
    };
  }, [onClose]);



  if(!visible || !order) {
    return null;
  }
  const total = order.products.reduce((acc, {product, quantity}) => {
    return acc + product.price * quantity;
  },0);


  return (
    <Overlay>
      <ModalBody>
        <header>
          <strong>Mesa 2</strong>
          <button type="button" onClick={onClose}>
            <img src={closeIcon}/>
          </button>
        </header>

        <div className="status-container">
          <small>Status do pedido</small>
          <div>
            <span>
              {order?.status=== 'DONE' && '✅'}
              {order?.status=== 'IN_PRODUCTION' && '👩‍🍳'}
              {order?.status=== 'WAITING' && '🕑' }

            </span>
            <strong>
              {order?.status=== 'DONE' && 'Pronto'}
              {order?.status=== 'IN_PRODUCTION' && 'Em produção'}
              {order?.status=== 'WAITING' && 'Fila de espera' }

            </strong>
          </div>
        </div>

        <OrderDetails>
          <strong>Itens</strong>
          <div className='order-itens'>

            {
              order?.products.map(({_id, product, quantity} )=> (
                <div className="item" key={_id}>
                  <img src={`http://localhost:3001/uploads/${product.imagePath}`} alt={product.name} width="58" height="42"/>
                  <span className='quantity'>{quantity}x</span>
                  <div className="products-details">
                    <strong>{product.name}</strong>
                    <span>{formatCurrency(product.price)}</span>
                  </div>
                </div>
              ))
            }

            <div className='total'>
              <span>Total</span>
              <strong> {formatCurrency(total)}</strong>
            </div>
          </div>


        </OrderDetails>

        {order.status === 'DONE' ? '' :

          <Actions>
            <button
              type='button'
              className='primary'
              onClick={onChangeOrderStatus}
              disabled={loading}
            >
              <span>
                {order.status === 'WAITING' && '👩‍🍳'}
                {order.status === 'IN_PRODUCTION' && '✅'}

              </span>
              <span>
                {order.status === 'WAITING' && 'Iniciar produção'}
                {order.status === 'IN_PRODUCTION' && 'Concluir pedido'}

              </span>
            </button>

            <button
              type='button'
              className='secondary'
              onClick={onCancelOrder}
              disabled={loading}
            >
            Cancelar pedido
            </button>
          </Actions>
        }


      </ModalBody>
    </Overlay>
  );
}
