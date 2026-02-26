import Container from "@/components/ui/Container";
import Badge from "@/components/ui/Badge";
import FadeIn from "@/components/ui/FadeIn";

type TeamMember = {
  name: string;
  role: string;
  email?: string;
};

const TEAM: TeamMember[] = [
  {
    name: "Makenzy Amartey",
    role: "Graphic and Brand Designer",
    email: "a83010659@gmail.com",
  },
  {
    name: "Daniel Adjetey",
    role: "Graphic and Brand Designer",
  },
  {
    name: "Eldwin Asante",
    role: "Full Stack Developer",
    email: "uhasihrproject@gmail.com",
  },
  {
    name: "Malcolm Elih",
    role: "Backend Developer",
  },
];

export default function AboutPage() {
  return (
    <section>
      <Container className="py-16 sm:py-20">
        <FadeIn><Badge>ABOUT</Badge></FadeIn>
        <FadeIn delay={0.05}><h1 className="mt-4 text-4xl sm:text-5xl font-semibold tracking-[-0.04em] text-slate-900">
          Design that looks human, feels thoughtful, and sells with confidence.
        </h1></FadeIn>
        <FadeIn delay={0.1}><p className="mt-4 text-slate-700 max-w-2xl leading-relaxed">
          We blend branding, graphics, and software delivery into one clear workflow. The goal is simple:
          your business should look organized, premium, and unmistakably yours across every platform.
        </p></FadeIn>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {[
            { t: "Craft", d: "Balanced layouts, clean hierarchy, and practical systems your team can actually use." },
            { t: "Consistency", d: "One visual language across social, print, web, and internal tools." },
            { t: "Delivery", d: "Clear milestones, updates, and files that are ready for production." },
          ].map((x) => (
            <div key={x.t} className="rounded-2xl border border-violet-200 bg-violet-50 p-6">
              <h3 className="text-lg font-semibold text-slate-900">{x.t}</h3>
              <p className="mt-2 text-sm text-slate-700 leading-relaxed">{x.d}</p>
            </div>
          ))}
        </div>

        <div className="mt-14">
          <Badge>TEAM</Badge>
          <h2 className="mt-4 text-2xl sm:text-3xl font-semibold tracking-[-0.03em] text-slate-900">Core team</h2>
          <p className="mt-2 text-sm text-slate-600">The people behind the work and execution.</p>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {TEAM.map((member) => (
              <article key={member.name} className="rounded-2xl border border-violet-200 bg-violet-50 p-5">
                <p className="text-base font-semibold text-slate-900">{member.name}</p>
                <p className="mt-1 text-sm text-slate-600">{member.role}</p>
                <p className="mt-3 text-sm text-slate-600">
                  {member.email ? (
                    <a className="hover:text-slate-900 transition" href={`mailto:${member.email}`}>
                      {member.email}
                    </a>
                  ) : (
                    "Email will be added soon"
                  )}
                </p>
              </article>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
