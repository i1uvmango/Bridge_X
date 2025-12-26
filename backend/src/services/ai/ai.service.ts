import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GoogleGenerativeAI } from '@google/generative-ai';
import {
    EMOTION_ANALYSIS_PROMPT,
    CHAT_SYSTEM_PROMPT,
} from './prompts/emotion-analysis.prompt';

export interface ConversationMessage {
    role: 'user' | 'assistant';
    content: string;
}

export interface EmotionSummary {
    emotion_tags: string[];
    dominant_emotion: string;
    repeated_topics: string[];
    risk_flag: boolean;
    intensity_score: number;
}

@Injectable()
export class AIService {
    private genAI: GoogleGenerativeAI;
    private model: any;
    private isAvailable: boolean = false;

    constructor(private configService: ConfigService) {
        const apiKey = this.configService.get('GEMINI_API_KEY') || '';

        // API 키 검증
        if (!apiKey || apiKey === 'your-gemini-api-key-here') {
            console.error('[ERROR] GEMINI_API_KEY not configured in .env file!');
            this.isAvailable = false;
            return;
        }

        try {
            this.genAI = new GoogleGenerativeAI(apiKey);

            // 🔥 모델 이름 수정: gemini-pro -> gemini-2.5-flash
            this.model = this.genAI.getGenerativeModel({
                model: 'gemini-2.5-flash'
            });

            this.isAvailable = true;
            console.log('[OK] Gemini AI initialized successfully (using gemini-1.5-flash)');
        } catch (error) {
            console.error('[ERROR] Failed to initialize Gemini:', error);
            this.isAvailable = false;
        }
    }

    async generateChatResponse(
        messages: ConversationMessage[],
        userMessage: string,
    ): Promise<string> {
        // Gemini 사용 불가능하면 fallback
        if (!this.isAvailable) {
            console.warn('[WARNING] Gemini not available, using fallback response');
            return '죄송합니다. AI 서비스가 일시적으로 사용 불가능합니다. 잠시 후 다시 시도해 주세요.';
        }

        try {
            const conversationHistory = messages
                .map((m) => `${m.role === 'user' ? '사용자' : 'AI'}: ${m.content}`)
                .join('\n');

            const prompt = `${CHAT_SYSTEM_PROMPT}

이전 대화:
${conversationHistory}

사용자: ${userMessage}

AI 상담사로서 따뜻하고 공감적인 응답을 해주세요:`;

            console.log(`[DEBUG] Calling Gemini API for chat response...`);

            const result = await this.model.generateContent(prompt);
            const response = await result.response;
            const text = response.text() || '';

            console.log(`[DEBUG] Gemini response received (length: ${text.length})`);

            return text;
        } catch (error) {
            console.error('[ERROR] AI Chat Error:', error);

            // 상세 에러 로깅
            if (error instanceof Error) {
                console.error('[ERROR] Error message:', error.message);
                console.error('[ERROR] Error stack:', error.stack);
            }

            // 에러 타입별 처리
            if (error?.message?.includes('API key')) {
                return '죄송합니다. API 키 오류가 발생했습니다. 관리자에게 문의해주세요.';
            } else if (error?.message?.includes('quota')) {
                return '죄송합니다. API 사용량이 초과되었습니다. 잠시 후 다시 시도해주세요.';
            } else if (error?.message?.includes('404') || error?.message?.includes('not found')) {
                // Fallback mechanism could go here
                console.warn('Model not found, try switching model in code.');
                return '죄송합니다. AI 모델 설정 문제(404)가 발생했습니다.';
            }

            return '죄송합니다. 일시적인 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.';
        }
    }

    async generateEmotionSummary(
        messages: ConversationMessage[],
    ): Promise<EmotionSummary> {
        // Gemini 사용 불가능하면 기본값 반환
        if (!this.isAvailable) {
            console.warn('[WARNING] Gemini not available, returning default emotion summary');
            return {
                emotion_tags: [],
                dominant_emotion: 'unknown',
                repeated_topics: [],
                risk_flag: false,
                intensity_score: 0,
            };
        }

        try {
            const conversationText = messages
                .map((m) => `${m.role === 'user' ? '사용자' : 'AI'}: ${m.content}`)
                .join('\n');

            const prompt = `${EMOTION_ANALYSIS_PROMPT}

다음 대화를 분석하고 JSON 형식으로 요약하세요:

${conversationText}

반드시 다음 JSON 형식으로만 응답하세요:
{
    "emotion_tags": ["감정1", "감정2"],
    "dominant_emotion": "주요 감정",
    "repeated_topics": ["주제1", "주제2"],
    "risk_flag": false,
    "intensity_score": 5
}`;

            console.log(`[DEBUG] Calling Gemini API for emotion analysis...`);

            const result = await this.model.generateContent(prompt);
            const response = await result.response;
            const content = response.text() || '{}';

            console.log(`[DEBUG] Raw emotion analysis response:`, content);

            // JSON 파싱 시도
            const jsonMatch = content.match(/\{[\s\S]*\}/);
            if (jsonMatch) {
                const parsed = JSON.parse(jsonMatch[0]) as EmotionSummary;
                console.log(`[DEBUG] Parsed emotion summary:`, parsed);
                return parsed;
            }

            const parsed = JSON.parse(content) as EmotionSummary;
            console.log(`[DEBUG] Parsed emotion summary:`, parsed);
            return parsed;
        } catch (error) {
            console.error('[ERROR] AI Summary Error:', error);

            if (error instanceof Error) {
                console.error('[ERROR] Error message:', error.message);
                console.error('[ERROR] Error stack:', error.stack);
            }

            return {
                emotion_tags: [],
                dominant_emotion: 'unknown',
                repeated_topics: [],
                risk_flag: false,
                intensity_score: 0,
            };
        }
    }
}
