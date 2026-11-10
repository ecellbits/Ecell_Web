import React, { useEffect, useRef, useState } from 'react';
import { stages, INSTAGRAM_POST } from './data';
import { Play, Pause } from 'lucide-react';

export default function StartupStages() {
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const tabs = useRef([]);
  const stage = stages[active];

  useEffect(() => {
    if (!playing) return;
    let previous = performance.now();
    const timer = window.setInterval(() => {
      const now = performance.now();
      const elapsed = now - previous;
      previous = now;
      setProgress((current) => Math.min(stages.length, current + elapsed / 4500));
    }, 50);
    return () => window.clearInterval(timer);
  }, [playing]);

  useEffect(() => {
    setActive(Math.min(stages.length - 1, Math.floor(progress)));
    if (progress >= stages.length) setPlaying(false);
  }, [progress]);

  function select(index, focus = false) {
    setPlaying(false);
    setActive(index);
    setProgress(index);
    if (focus) tabs.current[index]?.focus();
  }

  return (
    <section id="stages" className="content-section">
      <div className="content-section-heading">
        <h2>What are the different stages of a startup?</h2>
        <button
          type="button"
          className="content-button roadmap-play"
          onClick={() => {
            if (!playing && progress >= stages.length) setProgress(0);
            setPlaying(!playing);
          }}
          aria-label={playing ? "Pause roadmap" : "Play roadmap"}
          title={playing ? "Pause roadmap" : "Play roadmap"}
        >
          {playing ? <Pause size={18} aria-hidden="true" /> : <Play size={18} aria-hidden="true" />}
        </button>
      </div>
      <div
        className="roadmap-progress"
        role="progressbar"
        aria-label="Roadmap progress"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round((progress / stages.length) * 100)}
      >
        <span style={{ width: (progress / stages.length) * 100 + "%" }} />
      </div>
      <div className="startup-stage-tabs" role="tablist" aria-label="Startup stages">
        {stages.map((item, index) => (
          <button
            key={item.id}
            ref={(node) => {
              tabs.current[index] = node;
            }}
            type="button"
            id={`stage-tab-${index}`}
            role="tab"
            aria-selected={active === index}
            aria-controls="stage-panel"
            tabIndex={active === index ? 0 : -1}
            onClick={() => select(index)}
            onKeyDown={(event) => {
              let next = index;
              if (event.key === 'ArrowRight') next = (index + 1) % stages.length;
              else if (event.key === 'ArrowLeft') next = (index + stages.length - 1) % stages.length;
              else if (event.key === 'Home') next = 0;
              else if (event.key === 'End') next = stages.length - 1;
              else return;
              event.preventDefault();
              select(next, true);
            }}
          >
            <span className="content-number">0{index + 1}</span>{item.title}
          </button>
        ))}
      </div>
      <div
        id="stage-panel"
        role="tabpanel"
        tabIndex={0}
        aria-labelledby={`stage-tab-${active}`}
        className="startup-stage-panel"
      >
        <p className="content-meta">{stage.stageNumber} · {stage.focusArea}</p>
        <h3>{stage.title}: {stage.subtitle}</h3>
        <p>{stage.deepDive}</p>
        <ul>
          {stage.bullets.map((bullet, i) => (
            <li key={i}><strong>{bullet.highlight}</strong> — {bullet.text}</li>
          ))}
        </ul>
        <div className="content-actions">
          <a
            className="content-link"
            href={INSTAGRAM_POST}
            target="_blank"
            rel="noopener noreferrer"
          >
            View original infographic on Instagram ↗
          </a>
        </div>
      </div>
    </section>
  );
}

