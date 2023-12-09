import { Injectable } from '@nestjs/common';
import { Order, Product, db } from 'src/db';

@Injectable()
export class OrdersService {
  public getOrders(): Order[] {
    return db.orders;
  }
  public getOrderById(id: Product['id']): Order | null {
    return db.orders.find((o) => o.id === id);
  }
}
