import { Module } from '@nestjs/common';
import { DownloadsService } from './downloads.service';
import { DownloadsController } from './downloads.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Language, Translation } from '@limble/shared/domain';

@Module({
  imports: [TypeOrmModule.forFeature([Language, Translation])],
  controllers: [DownloadsController],
  providers: [DownloadsService],
})
export class DownloadsModule {}
