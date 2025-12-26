import { Controller, Post, Body, Get } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatMessageDto, ChatResponseDto, GreetingResponseDto } from './dto/chat.dto';

@Controller('api/chat')
export class ChatController {
    constructor(private readonly chatService: ChatService) { }

    @Get('greeting')
    async getGreeting(): Promise<GreetingResponseDto> {
        const result = await this.chatService.startSession();
        return {
            greeting: result.greeting,
            session_id: result.sessionId,
        };
    }

    @Post()
    async sendMessage(@Body() chatDto: ChatMessageDto): Promise<ChatResponseDto> {
        const result = await this.chatService.processMessage(
            chatDto.message,
            chatDto.session_id,
        );

        return {
            response: result.response,
            session_id: result.sessionId,
            meeting_url: result.meeting_url,
        };
    }
}
