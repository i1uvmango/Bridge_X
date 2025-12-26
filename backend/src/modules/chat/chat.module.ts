import { Module, forwardRef } from '@nestjs/common';
import { ChatController } from './chat.controller';
import { ChatService } from './chat.service';
import { WebexModule } from '../webex/webex.module';

@Module({
    imports: [forwardRef(() => WebexModule)],
    controllers: [ChatController],
    providers: [ChatService],
    exports: [ChatService],
})
export class ChatModule { }
