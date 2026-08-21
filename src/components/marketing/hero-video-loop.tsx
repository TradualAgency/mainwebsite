export function HeroVideoLoop() {
  return (
    <div className="absolute inset-0 bg-primary">
      <video
        className="w-full h-full object-cover"
        src="/images/hero-loop-f1.mp4"
        autoPlay
        loop
        muted
        playsInline
      />
      <div className="absolute inset-0 bg-primary/75" />
    </div>
  );
}
