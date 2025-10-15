import { CambioPlusApp } from '@/components/cambio-plus-app';
import { WaveBackground } from '@/components/wavy-background';

export default function Home() {
  return (
    <main className="flex min-h-svh flex-col items-center justify-center p-4 overflow-hidden">
      <WaveBackground />
      <div className="z-10">
        <CambioPlusApp />
      </div>
    </main>
  );
}
