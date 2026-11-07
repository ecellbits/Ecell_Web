import React from 'react';
import { Link } from 'react-router-dom';
import SEO from '../common/SEO';
import '../common/content-pages.css';

export default function UdyamaVolume1() {
  return (
    <main className="content-page" data-theme="light">
      <SEO
        title="Udyama Volume 01: A year of ideas in motion | E-Cell BITS Hyderabad"
        description="A look back at the people, ideas and events that shaped E-Cell's 2025–26 year."
        url="https://www.ecellbits.com/udyama-volume-1"
        keywords={["Udyama", "E-Cell Magazine", "Volume 1", "Launchpad 26", "BITS Pilani Hyderabad"]}
      />
      <div className="content-container">
        <div className="content-toolbar">
          <Link to="/magazine" className="content-link">← Back to Udyama</Link>
        </div>

        <header className="content-hero">
          <p className="content-meta">Udyama · Volume 01 · 2025–26</p>
          <h1>A year of ideas in motion</h1>
          <p className="content-lead">
            The people, conversations and experiments that brought E-Cell’s community together.
          </p>
          <p className="content-muted">E-Cell, BITS Pilani Hyderabad Campus</p>
        </header>

        <div className="content-editorial-grid">
          <aside className="content-toc">
            <nav aria-label="On this page">
              <p className="font-bold text-sm mb-3">In this volume</p>
              <a href="#community">01. The community</a>
              <a href="#launchpad">02. Launchpad ’26</a>
              <a href="#stage">03. Ideas from the stage</a>
              <a href="#learning">04. Learning by doing</a>
              <a href="#beyond">05. Beyond the venue</a>
            </nav>
          </aside>

          <article className="content-article">
            <section className="content-section">
              <h2>From the editorial desk</h2>
              <p>
                Every venture begins with a question. Sometimes it is about a problem that has gone unsolved.
                Sometimes it is about whether an idea can survive its first conversation with a customer,
                an investor or a room full of sceptics.
              </p>
              <p>
                This year, E-Cell created spaces for those questions to be asked. Students met founders and
                learned about incubation. School teams built business models and pitched their ideas.
                Startups showcased their work, while mentors and investors shared their perspectives with the people building them.
              </p>
              <p>
                At the centre of the year was Launchpad ’26, our annual entrepreneurship summit, held from 3 to 5 April.
                This first volume of Udyama looks back at the community that came together, the work that went into
                the summit and the ideas we carry forward.
              </p>
            </section>

            <section id="community" className="content-section">
              <h2>01 / Where the conversation begins</h2>
              <h3>A community built around possibility</h3>
              <p>
                The E-Cell Community Meet 2025 brought entrepreneurship closer to campus. Organised with the
                BITS Pilani Hyderabad Campus TBI Society (TBIS), it brought students, aspiring entrepreneurs and
                ecosystem members together to talk about building ventures.
              </p>
              <p>
                Vikas Katragadda of Naandi Ventures and Mir Ali of TBI BITS Hyderabad shared perspectives on venture
                capital, incubation and the Student Entrepreneurship Encouragement Program. Campus founders also spoke
                about their journeys: Apollyon Dynamics described its path from an initial idea to its first Indian Army
                order, while Slowcialize shared its experience of building as student founders.
              </p>

              <h3>Management in practice</h3>
              <p>
                Management Temptations put participants in situations that called for coordination, leadership and adaptability.
                Working with crowds, vendors and an outlet of their choice, students navigated practical challenges and made
                decisions in real time.
              </p>

              <h3>Founders and investors in Bengaluru</h3>
              <p>
                Launchpad’s Bengaluru edition co-organised Founder’s Investor Connect with CEDAT in 2025. The gathering brought
                founders, investors and ecosystem members together for conversations about ideas and collaboration, including
                a talk by Thinkerbell co-founder Aman Srivastav and networking at Draper House.
              </p>
            </section>

            <section id="launchpad" className="content-section">
              <h2>02 / Launchpad ’26</h2>
              <p>
                From 3 to 5 April 2026, Launchpad brought founders, investors, mentors and students together at BITS Pilani
                Hyderabad Campus. Its decennial edition made room for many entrepreneurial experiences: pitching a business plan,
                meeting a potential employer, learning a technical skill or listening to someone who had faced a difficult decision.
              </p>
              <p>
                Meraj Faheem, CEO of Telangana Innovation Cell, delivered the inaugural address. At the closing ceremony,
                Dr Jaya Prakash Narayana shared perspectives on leadership, governance and meaningful impact.
              </p>

              <h3>Startup Expo: ideas in the open</h3>
              <p>
                Startup Expo gave 25 ventures a platform to present their work and meet students, mentors, investors and
                industry professionals. From a ₹75,000 prize pool, MakerMasti was recognised for Most Impactful Innovation,
                Keepmon for Most Visionary Venture and Mehak for Most Scalable Startup.
              </p>

              <h3>Ground Reality: from a canvas to a pitch</h3>
              <p>
                Approximately 65 teams participated across areas including AI, technology, environment, healthcare and open
                innovation. The competition began with an online Business Model Canvas round, followed by sector-specific
                mentorship with TiE Hyderabad and Draper Startup House Hyderabad. Teams progressed through elevator pitches
                and a grand finale. QwikPrint, Sterilysense and XADS emerged as winners.
              </p>

              <h3>Teen Tycoons: making room for younger founders</h3>
              <p>
                More than 800 school students participated in Teen Tycoons and Teen Tycoons Junior, exploring entrepreneurship,
                creativity and scientific innovation. The programme included a business model round, an entrepreneurship
                bootcamp with IIDE and NSRCEL Bangalore, and final presentations before founders, investors and ecosystem professionals.
              </p>

              <h3>SEED: building across campuses</h3>
              <p>
                Introduced at Launchpad ’26, the Summit for Entrepreneurial Ecosystem Development brought nine E-Cells together
                for three days of expert sessions, panels, roundtables and mentorship. Conceived as a pilot, SEED aimed to
                strengthen relationships between student entrepreneurship communities beyond campus.
              </p>

              <h3>The Internship Drive: opening doors</h3>
              <p>
                Around 650 students connected with approximately 50 startups and emerging companies across technology,
                marketing, operations, finance and other domains. More than 80 students secured internships, with stipends reaching
                ₹60,000 per month.
              </p>

              <h3>Pitchers’ Pilot: the case for clarity</h3>
              <p>
                Pitchers’ Pilot brought 50 participants into conversation with five investors and 15 mentors. Founders presented
                their visions, business models and growth potential, gaining feedback and opportunities to connect.
              </p>

              <h3>The DP World Hackathon</h3>
              <p>
                More than 2,500 students registered from 27 institutions to tackle challenges in logistics, trade and technology.
                Sixty teams were shortlisted and 15 reached the grand finale. Dhad Dhad Dhad from IIIT Bangalore took first place,
                followed by Spam Bytes from GITAM Hyderabad and InnovativeOrbits from MS Ramaiah University. Markov Chained of
                BITS Pilani Hyderabad and CoreCoders of Cummins College of Engineering, Pune, placed fourth and fifth.
              </p>

              <h3>Networking Arena</h3>
              <p>
                On 4 and 5 April, founders, investors, venture capitalists and mentors gathered at the Library Lawns and
                Auditorium Foyer for introductions, shared learning and conversations about collaboration.
              </p>
            </section>

            <section id="stage" className="content-section">
              <h2>03 / Ideas from the stage</h2>
              <h3>Leadership under pressure</h3>
              <p>
                In From Cockpit to Command, Air Chief Marshal RKS Bhadauria and retired Wing Commander Anish Anthony discussed
                leadership, air power and the future of warfare. Their experiences raised questions that travel beyond defence:
                how do leaders prepare, make decisions and guide others under pressure?
              </p>

              <h3>Creating value and reaching a market</h3>
              <p>
                Nidhi Saxena, Shanthala Veigas and Shaily Mehrotra discussed innovation, storytelling and social impact,
                drawing from their professional journeys. Meraj Faheem’s GTM Canvas session explored another part of the journey:
                product positioning, market entry and scaling an idea into a venture.
              </p>

              <h3>Building ecosystems and backing founders</h3>
              <p>
                In Creating Startup Cities, Sahil Raj Suman, MV Reddy and Vikas Katragadda explored the infrastructure,
                collaboration and community support that help innovation hubs grow. Capital and Conviction brought together
                Sahil Makkar, Rajeev Suri, Vikas Katragadda and Shyam Penumaka, moderated by CA Akhilesh Sharma, to discuss
                founder evaluation, investment and startup growth.
              </p>

              <h3>Learning and care in the age of AI</h3>
              <p>
                Swati Ganeti spoke about education, exposure and learning as technology changes. Anant Anand explored AI and
                analytics in healthcare, including how data-driven approaches can support decisions and improve care.
              </p>
            </section>

            <section id="learning" className="content-section">
              <h2>04 / Learning by doing</h2>
              <p>
                TechGyan hosted 12 workshops with more than 570 registrations. Topics ranged from full-stack development and
                Python to AI, data analytics, ethical hacking, UI/UX, blockchain and digital marketing. Featured sessions
                explored entrepreneurship through design thinking, visual communication and large language models.
              </p>
              <p>
                Impactus ’26 challenged teams to respond to evolving crises as policymakers and business leaders. Participants
                developed strategies and made decisions under time constraints, combining governance, business strategy and crisis management.
              </p>
              <p>
                Launchpad also made space for play. GeoGuessr, the IPL Mock Auction and Corporate Crusades brought participants
                together around observation, bidding and business problems. An open mic and jamming session welcomed music,
                poetry and storytelling. An interactive session with Nidhi Bhanushali and Siddharth Nigam, alongside a live
                Free Fire tournament, added to the campus atmosphere.
              </p>
            </section>

            <section id="beyond" className="content-section">
              <h2>05 / Beyond the venue</h2>
              <p>
                The work of bringing a community together extended beyond the summit grounds. The Launchpad team connected with
                founders, students and ecosystem members through gatherings at Draper Startup House, CoKarma, Startup Party and
                Global Startups Club. Outreach also included TiE Nizamabad and the kick-off of WE Hub’s Social Impact Awards.
              </p>
              <p>
                At BVRIT Summit and Malla Reddy E-Summit, the team met student innovators and entrepreneurship communities from
                other campuses. These conversations invited more people into the ecosystem around Launchpad.
              </p>

              <h3>Looking ahead</h3>
              <p>
                This volume captures people showing up with ideas at different stages. Some came to find an internship.
                Some came to pitch, test a technical solution or meet another founder. Others came to share what they had learned.
                What connected them was a willingness to take the next step: ask a question, present unfinished work, listen to
                feedback or start a conversation.
              </p>
              <p>
                As E-Cell looks ahead, Udyama will continue to make room for those stories—and for the people writing the next chapters.
              </p>
              <p><strong>Until the next volume.</strong></p>
              <Link to="/magazine" className="content-link">← Back to the magazine</Link>
            </section>
          </article>
        </div>
      </div>
    </main>
  );
}

