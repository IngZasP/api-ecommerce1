import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './product/product.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [ProductModule, MongooseModule.forRoot('mongodb://localhost/test1')],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule {}
