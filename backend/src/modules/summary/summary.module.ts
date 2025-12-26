import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AISummary } from '../../database/entities';
import { SummaryController } from './summary.controller';
import { SummaryService } from './summary.service';
import { ChatModule } from '../chat/chat.module';

import { WebexModule } from '../webex/webex.module';

@Module({
    imports: [TypeOrmModule.forFeature([AISummary]), ChatModule, WebexModule],
    controllers: [SummaryController],
    providers: [SummaryService],
    exports: [SummaryService],
})
export class SummaryModule { }
