import { Controller, Delete, Get, Param } from '@nestjs/common';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Get('/')
  getAll(): any {
    return this.productsService.getAll();
  }
  @Get('/:id')
  getById(@Param('id') id: 'string'): any {
    return this.productsService.getById(id);
  }
  @Delete('/:id')
  deleteById(@Param('id') id: 'string'): any {
    this.productsService.deleteById(id);
    return { success: true };
  }
}
