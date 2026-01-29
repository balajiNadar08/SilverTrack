import { Zalando_Sans_Expanded } from 'next/font/google'

const zalando = Zalando_Sans_Expanded({
  subsets: ['latin'],
  weight: ['400', '700'],
  display: 'swap',
})

export default function Home() {
  return (
    <div>
      <h1 className={`text-2xl font-bold ${zalando.className}`}>
        SilverTrack
      </h1>
    </div>
  );
}
