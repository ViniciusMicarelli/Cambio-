import { CambioPlusApp } from '@/components/cambio-plus-app';
import { WaveBackground } from '@/components/wavy-background';
import SiteFooter from '@/components/footer';

export default function Home() {
  return (
    <main className="relative flex min-h-svh flex-col items-center justify-center p-4 pb-24 overflow-hidden">
      <WaveBackground />
      <div className="z-10 w-full max-w-7xl">
        <CambioPlusApp />
      </div>
      <SiteFooter/>
    </main>
  );
}