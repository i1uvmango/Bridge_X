import Link from 'next/link';

export default function Home() {
  const features = [
    {
      icon: '💬',
      title: 'AI 감정 상담',
      description: '따뜻한 AI와 대화하며 마음속 이야기를 나눌 수 있어요',
    },
    {
      icon: '🔒',
      title: '프라이버시 보호',
      description: '대화 원문은 저장되지 않아요. 요약 데이터만 안전하게 보관됩니다',
    },
    {
      icon: '👩‍⚕️',
      title: '전문 상담사 연결',
      description: 'AI와 대화 후 원하시면 전문 상담사와 화상 상담을 받을 수 있어요',
    },
    {
      icon: '🌍',
      title: '분쟁지역 청소년 지원',
      description: '어려운 환경에 있는 청소년들에게 심리적 안정을 제공합니다',
    },
  ];

  return (
    <div style={{ minHeight: '100vh' }}>
      {/* Hero Section */}
      <section style={{ position: 'relative', padding: '5rem 1.5rem', overflow: 'hidden' }}>
        {/* Background decorations */}
        <div style={{ position: 'absolute', top: '5rem', left: '2.5rem', width: '18rem', height: '18rem', backgroundColor: 'rgba(107, 155, 210, 0.2)', borderRadius: '9999px', filter: 'blur(48px)' }}></div>
        <div style={{ position: 'absolute', bottom: '5rem', right: '2.5rem', width: '24rem', height: '24rem', backgroundColor: 'rgba(168, 213, 186, 0.2)', borderRadius: '9999px', filter: 'blur(48px)' }}></div>

        <div style={{ maxWidth: '72rem', margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 10 }}>
          <div className="glass" style={{ display: 'inline-block', marginBottom: '1.5rem', padding: '0.5rem 1rem', borderRadius: '9999px', fontSize: '0.875rem', color: '#5A8BC2' }}>
            🌟 분쟁지역 청소년을 위한 심리 지원 서비스
          </div>

          <h1 style={{ fontSize: 'clamp(2.5rem, 8vw, 4.5rem)', fontWeight: 'bold', marginBottom: '1.5rem', lineHeight: '1.1' }}>
            <span className="gradient-text">마음쉼터</span>에서
            <br />
            <span style={{ color: '#374151' }}>편안하게 쉬어가세요</span>
          </h1>

          <p style={{ fontSize: '1.25rem', color: '#6b7280', maxWidth: '42rem', margin: '0 auto 2.5rem' }}>
            AI와 대화하며 감정을 정리하고, 필요하면 전문 상담사와 연결됩니다.
            <br />
            당신의 이야기는 소중하게 보호됩니다.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', justifyContent: 'center', alignItems: 'center' }}>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
              <Link href="/chat" className="btn-primary" style={{ fontSize: '1.125rem', padding: '1rem 2rem' }}>
                🌿 상담 시작하기
              </Link>
              <Link href="#features" className="btn-secondary" style={{ fontSize: '1.125rem', padding: '1rem 2rem' }}>
                서비스 알아보기
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" style={{ padding: '5rem 1.5rem' }}>
        <div style={{ maxWidth: '72rem', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <h2 style={{ fontSize: 'clamp(1.875rem, 5vw, 2.25rem)', fontWeight: 'bold', marginBottom: '1rem', color: '#374151' }}>
              안전하고 <span className="gradient-text">따뜻한</span> 공간
            </h2>
            <p style={{ color: '#6b7280', maxWidth: '32rem', margin: '0 auto' }}>
              마음쉼터는 청소년의 심리적 안정을 위해 설계되었습니다
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
            {features.map((feature, idx) => (
              <div
                key={idx}
                className="card animate-fadeIn"
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>
                  {feature.icon}
                </div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '0.5rem', color: '#374151' }}>{feature.title}</h3>
                <p style={{ color: '#6b7280' }}>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section style={{ padding: '5rem 1.5rem' }}>
        <div style={{ maxWidth: '72rem', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <h2 style={{ fontSize: 'clamp(1.875rem, 5vw, 2.25rem)', fontWeight: 'bold', marginBottom: '1rem', color: '#374151' }}>
              어떻게 <span className="gradient-text">이용하나요?</span>
            </h2>
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem', alignItems: 'center', justifyContent: 'center' }}>
            {[
              { step: '1', title: 'AI와 대화', desc: '편안하게 마음속 이야기를 나눠요' },
              { step: '2', title: '감정 요약', desc: 'AI가 대화를 분석하여 감정을 정리해요' },
              { step: '3', title: '상담 연결', desc: '필요시 전문 상담사와 화상 상담을 받아요' },
            ].map((item, idx) => (
              <div key={idx} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', minWidth: '200px' }}>
                <div style={{ width: '4rem', height: '4rem', borderRadius: '9999px', background: 'linear-gradient(135deg, #6B9BD2, #A8D5BA)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', fontWeight: 'bold', color: 'white', marginBottom: '1rem' }}>
                  {item.step}
                </div>
                <h3 style={{ fontSize: '1.125rem', fontWeight: 'bold', marginBottom: '0.5rem', color: '#374151' }}>{item.title}</h3>
                <p style={{ color: '#6b7280', fontSize: '0.875rem' }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section style={{ padding: '5rem 1.5rem' }}>
        <div style={{ maxWidth: '56rem', margin: '0 auto' }}>
          <div className="card" style={{ background: 'linear-gradient(135deg, rgba(107, 155, 210, 0.1), rgba(168, 213, 186, 0.1))', textAlign: 'center', padding: '3rem' }}>
            <h2 style={{ fontSize: '1.875rem', fontWeight: 'bold', marginBottom: '1rem', color: '#374151' }}>
              지금 바로 시작해보세요
            </h2>
            <p style={{ color: '#6b7280', marginBottom: '2rem' }}>
              어려운 감정, 혼자 안고 있지 마세요. 마음쉼터가 함께합니다.
            </p>
            <Link href="/chat" className="btn-primary" style={{ fontSize: '1.125rem', padding: '1rem 2rem', display: 'inline-block' }}>
              🌿 무료로 상담 시작하기
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ padding: '2rem 1.5rem', borderTop: '1px solid #e5e7eb' }}>
        <div style={{ maxWidth: '72rem', margin: '0 auto', textAlign: 'center', color: '#9ca3af', fontSize: '0.875rem' }}>
          <p>© 2025 마음쉼터. All rights reserved.</p>
          <p style={{ marginTop: '0.5rem' }}>분쟁지역 청소년 심리 지원 프로젝트</p>
        </div>
      </footer>
    </div>
  );
}
