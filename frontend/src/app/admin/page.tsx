'use client';

import { useState, useEffect } from 'react';
import { getAdminSessions, AdminSession } from '@/lib/api';

export default function AdminPage() {
    const [sessions, setSessions] = useState<AdminSession[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetchSessions();
    }, []);

    const fetchSessions = async () => {
        setIsLoading(true);
        try {
            const data = await getAdminSessions();
            setSessions(data.sessions);
        } catch (error) {
            console.error('Failed to fetch sessions:', error);
            setSessions([
                {
                    session_id: 'demo-1',
                    user: { nickname: '희망이', region: '분쟁지역A' },
                    summary: {
                        dominant_emotion: '불안',
                        emotion_tags: ['불안', '외로움', '희망'],
                        risk_flag: false,
                        intensity_score: 0.65,
                    },
                    status: 'scheduled',
                    meeting_url: 'https://webex.com/meet/demo1',
                    created_at: new Date().toISOString(),
                },
                {
                    session_id: 'demo-2',
                    user: { nickname: '용기', region: '분쟁지역B' },
                    summary: {
                        dominant_emotion: '슬픔',
                        emotion_tags: ['슬픔', '그리움', '분노'],
                        risk_flag: true,
                        intensity_score: 0.85,
                    },
                    status: 'in_progress',
                    meeting_url: 'https://webex.com/meet/demo2',
                    created_at: new Date().toISOString(),
                },
            ]);
        } finally {
            setIsLoading(false);
        }
    };

    const getStatusBadge = (status: string) => {
        const styles: Record<string, { bg: string; color: string; border: string }> = {
            scheduled: { bg: '#fef3c7', color: '#92400e', border: '#fcd34d' },
            in_progress: { bg: '#dbeafe', color: '#1e40af', border: '#93c5fd' },
            completed: { bg: '#d1fae5', color: '#065f46', border: '#6ee7b7' },
            cancelled: { bg: '#f3f4f6', color: '#4b5563', border: '#d1d5db' },
        };
        const labels: Record<string, string> = {
            scheduled: '예약됨',
            in_progress: '진행 중',
            completed: '완료',
            cancelled: '취소됨',
        };
        const style = styles[status] || styles.scheduled;
        return (
            <span style={{ padding: '0.25rem 0.75rem', borderRadius: '9999px', fontSize: '0.75rem', background: style.bg, color: style.color, border: `1px solid ${style.border}` }}>
                {labels[status] || status}
            </span>
        );
    };

    return (
        <div style={{ minHeight: '100vh', padding: '1.5rem' }}>
            <div style={{ maxWidth: '80rem', margin: '0 auto' }}>
                {/* Header */}
                <div style={{ marginBottom: '2rem' }}>
                    <h1 className="gradient-text" style={{ fontSize: '1.875rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
                        관리자 대시보드
                    </h1>
                    <p style={{ color: '#6b7280' }}>
                        상담 세션을 관리하고 청소년들의 감정 상태를 모니터링합니다
                    </p>
                </div>

                {/* Stats */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
                    {[
                        { label: '전체 세션', value: sessions.length, icon: '📊', bgFrom: 'rgba(107, 155, 210, 0.2)', bgTo: 'rgba(107, 155, 210, 0.05)' },
                        { label: '예약됨', value: sessions.filter(s => s.status === 'scheduled').length, icon: '📅', bgFrom: '#fef3c7', bgTo: '#fffbeb' },
                        { label: '진행 중', value: sessions.filter(s => s.status === 'in_progress').length, icon: '🎥', bgFrom: '#dbeafe', bgTo: '#eff6ff' },
                        { label: '주의 필요', value: sessions.filter(s => s.summary?.risk_flag).length, icon: '⚠️', bgFrom: '#fee2e2', bgTo: '#fef2f2' },
                    ].map((stat, idx) => (
                        <div key={idx} className="card" style={{ background: `linear-gradient(135deg, ${stat.bgFrom}, ${stat.bgTo})` }}>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                <div>
                                    <p style={{ color: '#6b7280', fontSize: '0.875rem' }}>{stat.label}</p>
                                    <p style={{ fontSize: '1.875rem', fontWeight: 'bold', color: '#374151' }}>{stat.value}</p>
                                </div>
                                <div style={{ fontSize: '1.875rem' }}>{stat.icon}</div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Sessions Table */}
                <div className="card" style={{ overflow: 'hidden' }}>
                    <div style={{ padding: '1rem', borderBottom: '1px solid #e5e7eb', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#374151' }}>상담 세션 목록</h2>
                        <button onClick={fetchSessions} className="btn-secondary" style={{ fontSize: '0.875rem' }}>
                            🔄 새로고침
                        </button>
                    </div>

                    {isLoading ? (
                        <div style={{ padding: '3rem', textAlign: 'center' }}>
                            <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }} className="animate-pulse-slow">⏳</div>
                            <p style={{ color: '#6b7280' }}>데이터를 불러오는 중...</p>
                        </div>
                    ) : sessions.length === 0 ? (
                        <div style={{ padding: '3rem', textAlign: 'center' }}>
                            <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>📭</div>
                            <p style={{ color: '#6b7280' }}>아직 상담 세션이 없습니다</p>
                        </div>
                    ) : (
                        <div style={{ overflowX: 'auto' }}>
                            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                                <thead style={{ background: '#f9fafb' }}>
                                    <tr>
                                        <th style={{ textAlign: 'left', padding: '1rem', color: '#6b7280', fontWeight: 500 }}>사용자</th>
                                        <th style={{ textAlign: 'left', padding: '1rem', color: '#6b7280', fontWeight: 500 }}>주요 감정</th>
                                        <th style={{ textAlign: 'left', padding: '1rem', color: '#6b7280', fontWeight: 500 }}>감정 태그</th>
                                        <th style={{ textAlign: 'left', padding: '1rem', color: '#6b7280', fontWeight: 500 }}>강도</th>
                                        <th style={{ textAlign: 'left', padding: '1rem', color: '#6b7280', fontWeight: 500 }}>위험</th>
                                        <th style={{ textAlign: 'left', padding: '1rem', color: '#6b7280', fontWeight: 500 }}>상태</th>
                                        <th style={{ textAlign: 'left', padding: '1rem', color: '#6b7280', fontWeight: 500 }}>액션</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {sessions.map((session) => (
                                        <tr key={session.session_id} style={{ borderTop: '1px solid #f3f4f6' }}>
                                            <td style={{ padding: '1rem' }}>
                                                <div>
                                                    <p style={{ fontWeight: 500, color: '#374151' }}>{session.user?.nickname || '익명'}</p>
                                                    <p style={{ fontSize: '0.875rem', color: '#9ca3af' }}>{session.user?.region || '-'}</p>
                                                </div>
                                            </td>
                                            <td style={{ padding: '1rem' }}>
                                                <span style={{ color: '#5A8BC2', fontWeight: 500 }}>
                                                    {session.summary?.dominant_emotion || '-'}
                                                </span>
                                            </td>
                                            <td style={{ padding: '1rem' }}>
                                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.25rem' }}>
                                                    {session.summary?.emotion_tags?.slice(0, 3).map((tag, idx) => (
                                                        <span key={idx} style={{ padding: '0.125rem 0.5rem', background: '#f3f4f6', color: '#4b5563', borderRadius: '0.25rem', fontSize: '0.75rem' }}>
                                                            {tag}
                                                        </span>
                                                    ))}
                                                </div>
                                            </td>
                                            <td style={{ padding: '1rem' }}>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                                    <div style={{ width: '4rem', height: '0.5rem', background: '#e5e7eb', borderRadius: '9999px', overflow: 'hidden' }}>
                                                        <div
                                                            style={{ height: '100%', background: 'linear-gradient(90deg, #6B9BD2, #A8D5BA)', width: `${(session.summary?.intensity_score || 0) * 100}%` }}
                                                        />
                                                    </div>
                                                    <span style={{ fontSize: '0.875rem', color: '#6b7280' }}>
                                                        {Math.round((session.summary?.intensity_score || 0) * 100)}%
                                                    </span>
                                                </div>
                                            </td>
                                            <td style={{ padding: '1rem' }}>
                                                <span className={session.summary?.risk_flag ? 'badge-risk' : 'badge-safe'}>
                                                    {session.summary?.risk_flag ? '주의' : '안정'}
                                                </span>
                                            </td>
                                            <td style={{ padding: '1rem' }}>
                                                {getStatusBadge(session.status)}
                                            </td>
                                            <td style={{ padding: '1rem' }}>
                                                {session.meeting_url && (
                                                    <a
                                                        href={session.meeting_url}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        style={{ color: '#5A8BC2', fontSize: '0.875rem', fontWeight: 500 }}
                                                    >
                                                        🎥 참여
                                                    </a>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
