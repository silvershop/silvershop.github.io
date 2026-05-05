import { PageHero } from "../components/PageHero";
import { FULLSCREEN_URL } from "../constants";

export const supportRouteHandle = {
  documentTitle: "Support & community — SilverShop",
  metaDescription:
    "Get help with SilverShop via GitHub issues and community channels, contribute to the project, or choose commercial support and development through Fullscreen.",
};

const team = [
  {
    github: "https://github.com/anselmdk",
    img: "/img/people/anselm.jpg",
    name: "Anselm Christophersen",
    org: "http://title.dk/",
    orgLabel: "Title Web Solutions",
  },
  {
    github: "https://github.com/bummzack",
    img: "/img/people/roman.jpg",
    name: "Roman Schmid",
    org: "https://bummzack.ch/",
    orgLabel: "Bummzack",
  },
  {
    github: "https://github.com/wilr",
    img: "/img/people/will.jpg",
    name: "Will Rossiter",
    org: "http://fullscreen.io",
    orgLabel: "Fullscreen Interactive",
  },
  {
    github: "https://github.com/wernerkrauss",
    img: "/img/people/werner.jpg",
    name: "Werner Krauss",
    org: "http://netwerkstatt.at",
    orgLabel: "netwerkstatt",
  },
] as const;

export function SupportPage() {
  const row1 = team.slice(0, 3);
  const row2 = team.slice(3);
  return (
    <>
      <PageHero
        title="Support and feedback"
        introduction="SilverShop is community-driven — here is how to get help or contribute."
      />
      <section className="page-content support-intro">
        <div className="container">
          <p>
            For general questions, join the{" "}
            <a href="https://www.silverstripe.org/community/slack-signup/">Silverstripe Slack</a> and ask in{" "}
            <strong>#ecommerce</strong>.
          </p>
          <p>
            Premium support is available via{" "}
            <a href={FULLSCREEN_URL}>Fullscreen</a>.
          </p>
          <p>
            Bug reports and patches belong in GitHub: read{" "}
            <a href="https://github.com/silvershop/silvershop-core/blob/main/CONTRIBUTING.md">Contributing</a>, then open
            an issue or pull request on{" "}
            <a href="https://github.com/silvershop/silvershop-core/issues">silvershop-core</a>.
          </p>
          <p>Regular contributors are welcome on the core team — reach out if you want to help steer releases.</p>
        </div>
      </section>

      <section className="page-content">
        <div className="container team-grid">
          <h2>Core team</h2>
          <div className="team-row content-grid content-grid--3">
            {row1.map((person) => (
              <article className="person" key={person.github}>
                <a href={person.github} className="person__thumb">
                  <img src={person.img} alt={person.name} width={96} height={96} />
                </a>
                <h3>
                  <a href={person.github}>{person.name}</a>
                </h3>
                <p>
                  <a href={person.org}>{person.orgLabel}</a>
                </p>
              </article>
            ))}
          </div>
          <div className="team-row content-grid content-grid--3">
            {row2.map((person) => (
              <article className="person" key={person.github}>
                <a href={person.github} className="person__thumb">
                  <img src={person.img} alt={person.name} width={96} height={96} />
                </a>
                <h3>
                  <a href={person.github}>{person.name}</a>
                </h3>
                <p>
                  <a href={person.org}>{person.orgLabel}</a>
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
