import { Injectable } from '@nestjs/common';
import { Order, Product, db } from 'src/db';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class OrdersService {
  public getOrders(): Order[] {
    return db.orders;
  }
  public getOrderById(id: Product['id']): Order | null {
    return db.orders.find((o) => o.id === id);
  }
  public deleteOrderById(id: Order['id']): void {
    db.orders = db.orders.filter((o) => o.id === id);
  }
  public createOrder(orderData: Omit<Order, 'id'>): Order {
    const newOrder = { ...orderData, id: uuidv4() };
    db.orders.push(newOrder);
    return newOrder;
  }
  public updateOrder(
    newOrderData: Omit<Order, 'id'>,
    id: Product['id'],
  ): Order {
    const updatedOrder = { ...newOrderData, id };
    const index = db.orders.findIndex((elem) => elem.id === id);
    db.orders[index] = updatedOrder;
    return updatedOrder;
  }
}
