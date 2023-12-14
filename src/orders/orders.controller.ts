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
  async getOrderById(
    @Param('id', new ParseUUIDPipe()) id: 'string',
  ): Promise<any> {
    const ord = await this.ordersService.getOrderById(id);
    if (!ord) {
      throw new NotFoundException('Product not found');
    } else {
      return ord;
    }
  }
  @Delete('/:id')
  async deleteById(
    @Param('id', new ParseUUIDPipe()) id: 'string',
  ): Promise<any> {
    if (!(await this.ordersService.getOrderById(id)))
      throw new NotFoundException('Product not found');

    await this.ordersService.deleteOrderById(id);
    return { success: true };
  }
  @Post('/')
  createOrder(@Body() orderData: CreateOrderDTO) {
    return this.ordersService.createOrder(orderData);
  }
  @Put('/:id')
  async editOrder(
    @Param('id', new ParseUUIDPipe()) id: 'string',
    @Body() newOrderData: UpdateOrderDTO,
  ) {
    if (!(await this.ordersService.getOrderById(id)))
      throw new NotFoundException('Product not found');

    await this.ordersService.updateOrder(id, newOrderData);
    return { success: true };
  }
}
