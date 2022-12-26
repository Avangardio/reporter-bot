import { Module } from '@nestjs/common';
import { YPService } from './YP.service';
import { YPController } from './YP.controller';

@Module({
  imports: [],
  controllers: [YPController],
  providers: [YPService],
})
export class YPModule {}
