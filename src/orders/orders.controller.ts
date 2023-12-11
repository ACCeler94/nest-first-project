import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDTO } from './dtos/create-order.dtos';
import { UpdateOrderDTO } from './dtos/update-order.dtos';

@Controller('orders')
export class OrdersController {
  constructor(private ordersService: OrdersService) {}

  @Get('/')
  getOrders(): any {
    this.ordersService.getOrders();
  }
  @Get('/:id')
  getOrderById(@Param('id', new ParseUUIDPipe()) id: 'string'): any {
    const ord = this.ordersService.getOrderById(id);
    if (!ord) {
      throw new NotFoundException('Product not found');
    } else {
      return ord;
    }
  }
  @Delete('/:id')
  deleteById(@Param('id', new ParseUUIDPipe()) id: 'string'): any {
    if (!this.ordersService.getOrderById(id))
      throw new NotFoundException('Product not found');

    this.ordersService.deleteOrderById(id);
    return { success: true };
  }
  @Post('/')
  createOrder(@Body() orderData: CreateOrderDTO) {
    return this.ordersService.createOrder(orderData);
  }
  @Put('/:id')
  editOrder(
    @Body() newOrderData: UpdateOrderDTO,
    @Param('id', new ParseUUIDPipe()) id: 'string',
  ) {
    if (!this.ordersService.getOrderById(id))
      throw new NotFoundException('Product not found');

    this.ordersService.updateOrder(newOrderData, id);
    return { success: true };
  }
}
