import Link from 'next/link';

export default function Home() {
  return (
    <div style={{ minHeight: '100vh' }}>
      {/* Hero Section - Full Screen with Single CTA */}
      <section style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
        background: 'linear-gradient(180deg, #e8f4fc 0%, #d4e8f5 50%, #c0dced 100%)'
      }}>
        {/* Background decorations */}
        <div style={{
          position: 'absolute',
          top: '10%',
          left: '10%',
          width: '300px',
          height: '300px',
          backgroundColor: 'rgba(107, 155, 210, 0.15)',
          borderRadius: '50%',
          filter: 'blur(80px)'
        }}></div>
        <div style={{
          position: 'absolute',
          bottom: '10%',
          right: '10%',
          width: '400px',
          height: '400px',
          backgroundColor: 'rgba(168, 213, 186, 0.15)',
          borderRadius: '50%',
          filter: 'blur(80px)'
        }}></div>

        <div style={{ textAlign: 'center', position: 'relative', zIndex: 10, padding: '0 1.5rem' }}>
          <h1 style={{
            fontSize: 'clamp(2.5rem, 8vw, 4rem)',
            fontWeight: 'bold',
            marginBottom: '1.5rem',
            lineHeight: '1.2',
            color: '#2d4a5e'
          }}>
            <span className="gradient-text">마음쉼터</span>에서
            <br />
            편안하게 쉬어가세요
          </h1>

          <p style={{
            fontSize: '1.25rem',
            color: '#5a7a8a',
            maxWidth: '400px',
            margin: '0 auto 3rem',
            lineHeight: '1.8',
            fontWeight: '500'
          }}>
            Always here to listen and talk.
            <br />
            Always on your side.
          </p>

          <Link
            href="/chat"
            style={{
              display: 'inline-block',
              background: 'white',
              color: '#5a8bc2',
              padding: '1rem 2.5rem',
              borderRadius: '50px',
              fontSize: '1.125rem',
              fontWeight: '600',
              textDecoration: 'none',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
              transition: 'all 0.3s ease'
            }}
          >
            🌿 상담 시작하기
          </Link>
        </div>
      </section>

      {/* Meet 마음쉼터 Section */}
      <section style={{ padding: '5rem 1.5rem', background: 'linear-gradient(180deg, #f0f9ff 0%, #ffffff 100%)' }}>
        <div style={{ maxWidth: '72rem', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h2 style={{ fontSize: 'clamp(1.875rem, 5vw, 2.5rem)', fontWeight: 'bold', marginBottom: '1.5rem', color: '#374151' }}>
              Meet <span className="gradient-text">마음쉼터</span>
            </h2>
            <p style={{
              fontSize: '1.125rem',
              color: '#6b7280',
              maxWidth: '600px',
              margin: '0 auto',
              lineHeight: '1.8'
            }}>
              분쟁 지역 청소년들에게 심리적 안정을 제공하는 AI 상담 플랫폼입니다.
              <br />
              언제 어디서나 따뜻한 대화를 나누고, 위기 상황에는 전문 상담사와 즉시 연결됩니다.
            </p>
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem', alignItems: 'center', justifyContent: 'center', marginTop: '3rem' }}>
            {[
              { step: '1', title: 'AI와 대화', desc: '편안하게 마음속 이야기를 나눠요' },
              { step: '2', title: '감정 요약', desc: 'AI가 대화를 분석하여 감정을 정리해요' },
              { step: '3', title: '상담 연결', desc: '필요시 전문 상담사와 화상 상담을 받아요' },
            ].map((item, idx) => (
              <div key={idx} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', minWidth: '200px' }}>
                <div style={{
                  width: '4rem',
                  height: '4rem',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #6B9BD2, #A8D5BA)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.5rem',
                  fontWeight: 'bold',
                  color: 'white',
                  marginBottom: '1rem'
                }}>
                  {item.step}
                </div>
                <h3 style={{ fontSize: '1.125rem', fontWeight: 'bold', marginBottom: '0.5rem', color: '#374151' }}>{item.title}</h3>
                <p style={{ color: '#6b7280', fontSize: '0.875rem' }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ padding: '2rem 1.5rem', borderTop: '1px solid #e5e7eb', background: '#ffffff' }}>
        <div style={{ maxWidth: '72rem', margin: '0 auto', textAlign: 'center', color: '#9ca3af', fontSize: '0.875rem' }}>
          <p>© 2025 마음쉼터. All rights reserved.</p>
          <p style={{ marginTop: '0.5rem' }}>분쟁지역 청소년 심리 지원 프로젝트</p>
        </div>
      </footer>
    </div>
  );
}
