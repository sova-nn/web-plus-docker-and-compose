import { Module } from '@nestjs/common';
import { OffersService } from './offers.service';
import { OffersController } from './offers.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OffersEntity } from './entities/offers.entity';
import { WishesModule } from 'src/wishes/wishes.module';

@Module({
  imports: [TypeOrmModule.forFeature([OffersEntity]), WishesModule],
  controllers: [OffersController],
  providers: [OffersService],
})
export class OffersModule {}
