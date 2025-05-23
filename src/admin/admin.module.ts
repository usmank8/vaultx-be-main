import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/auth/entities/auth.entity';
import { Residence } from 'src/residence/entity/residence.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Residence])],
  controllers: [AdminController],
  providers: [AdminService],
})
export class AdminModule {}
