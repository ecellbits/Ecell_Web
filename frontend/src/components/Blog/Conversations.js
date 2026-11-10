import React, { useState } from 'react';
import { VIDEO_ID } from './data';

const takeaways = [
  ['Execution > Ideas', 'Ideas hold zero equity value. Iteration velocity and shipping speed are the sole defensible moats.'],
  ['90% Grunt Work', 'Early building is firefighting, cold calls, and obscurity—not glamorous seed funding announcements.'],
  ['Premature Scaling', 'Spending capital on marketing before proving real user retention kills early startups fastest.'],
  ['Complementary DNA', 'Winning founding teams pair deep technical craftsmanship with relentless commercial grit.'],
  ['Founder Stamina', 'Ventures die when founder emotional energy depletes, not when competitors launch features.'],
];

export default function Conversations() {
  const [playing, setPlaying] = useState(false);

  return (
    <section id="ecell-conversations" className="content-section">
      <h2>E-Cell Conversations: the reality of building</h2>
      <p>E-Cell Conversations is our intellectual dialogue series bringing candid, behind-the-scenes founder lessons to student builders. In Episode 01, we unpack what it takes to navigate from zero to one.</p>
      <h3>Five operational takeaways</h3>
      <ol className="content-takeaways">
        {takeaways.map(([title, fact]) => (
          <li key={title}>
            <h4>{title}</h4>
            <p>{fact}</p>
          </li>
        ))}
      </ol>
      <div id="video-box" className="content-section">
        <div className="content-section-heading">
          <h3>What does it really take to build a startup?</h3>
          <a
            className="content-link"
            href={`https://www.youtube.com/watch?v=${VIDEO_ID}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            Open on YouTube ↗
          </a>
        </div>
        <div className="content-video">
          {playing ? (
            <iframe
              title="E-Cell Conversations Episode 01"
              src={`https://www.youtube-nocookie.com/embed/${VIDEO_ID}?autoplay=1&rel=0`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          ) : (
            <button
              type="button"
              onClick={() => setPlaying(true)}
              aria-label="Play E-Cell Conversations Episode 01"
            >
              <img
                src={`https://i.ytimg.com/vi/${VIDEO_ID}/hqdefault.jpg`}
                alt="E-Cell Conversations Episode 01"
                width="480"
                height="360"
                loading="lazy"
              />
              <span>Play Episode 01 →</span>
            </button>
          )}
        </div>
      </div>
    </section>
  );
}

