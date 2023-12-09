import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ProductsService } from './products.service';
import { Product } from 'src/db';
import { CreateProductDTO } from './dtos/create-product.dto';
import { ParseUUIDPipe } from '@nestjs/common';

@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Get('/')
  getAll(): any {
    return this.productsService.getAll();
  }
  @Get('/:id')
  getById(@Param('id', new ParseUUIDPipe()) id: 'string'): any {
    return this.productsService.getById(id);
  }
  @Delete('/:id')
  deleteById(@Param('id', new ParseUUIDPipe()) id: 'string'): any {
    this.productsService.deleteById(id);
    return { success: true };
  }
  @Post('/')
  create(@Body() productData: CreateProductDTO) {
    return this.productsService.create(productData);
  }
}
