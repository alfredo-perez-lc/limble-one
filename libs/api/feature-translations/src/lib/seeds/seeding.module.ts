import { Module } from '@nestjs/common';
import { SeedingService } from './seeding.service';

@Module({
  imports: [],
  providers: [SeedingService],
})
export class SeedingModule {}
