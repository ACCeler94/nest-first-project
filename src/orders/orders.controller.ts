import { Controller, Get, Param } from '@nestjs/common';
import { OrdersService } from './orders.service';

@Controller('orders')
export class OrdersController {
  constructor(private ordersService: OrdersService) {}

  @Get('/')
  getOrders(): any {
    this.ordersService.getOrders();
  }
  @Get('/:id')
  getOrderById(@Param('id') id: 'string'): any {
    return this.ordersService.getOrderById(id);
  }
}
