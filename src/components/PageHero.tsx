import { HeroShaderBackground } from "./HeroShaderBackground";

type PageHeroProps = {
  title: string;
  introduction?: string;
};

export function PageHero({ title, introduction }: PageHeroProps) {
  return (
    <section className="hero hero--compact" aria-labelledby="page-title">
      <HeroShaderBackground />
      <div className="container">
        <h1 id="page-title">{title}</h1>
        {introduction ? <p className="hero__lead">{introduction}</p> : null}
      </div>
    </section>
  );
}
