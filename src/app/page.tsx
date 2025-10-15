import { CambioPlusApp } from '@/components/cambio-plus-app';
import { WavyBackground } from '@/components/wavy-background';

export default function Home() {
  return (
    <main className="flex min-h-svh flex-col items-center justify-center p-4 overflow-hidden">
      <WavyBackground />
      <div className="z-10">
        <CambioPlusApp />
      </div>
    </main>
  );
}
