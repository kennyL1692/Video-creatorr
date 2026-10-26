import React from 'react';
import {AbsoluteFill, OffthreadVideo, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';

type Word = {word: string; start: number; end: number};
type Segment = {start: number; end: number; text: string; words: Word[]};

export type CaptionsProps = {
  videoSrc: string;
  transcript: {language: string; duration: number; segments: Segment[]};
};

const WORDS_PER_PAGE = 3;

// Split all words into short "pages" so only a few words show at once.
const toPages = (segments: Segment[]): Word[][] => {
  const words = segments.flatMap((s) => s.words);
  const pages: Word[][] = [];
  for (let i = 0; i < words.length; i += WORDS_PER_PAGE) {
    pages.push(words.slice(i, i + WORDS_PER_PAGE));
  }
  return pages;
};

export const Captions: React.FC<CaptionsProps> = ({videoSrc, transcript}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const t = frame / fps;

  const pages = toPages(transcript.segments);
  // Latest page that has started; it stays a moment after its last word unless the next page begins.
  const index = pages.findLastIndex((p) => t >= p[0].start);
  const current = pages[index];
  const page = current && t <= current[current.length - 1].end + 0.3 ? current : undefined;

  return (
    <AbsoluteFill style={{backgroundColor: 'black'}}>
      <OffthreadVideo src={staticFile(videoSrc)} />
      {page ? (
        // Lower-middle safe zone: clear of the Reels buttons at the bottom.
        <AbsoluteFill style={{justifyContent: 'flex-end', alignItems: 'center', paddingBottom: 520}}>
          <div
            style={{
              maxWidth: 900,
              textAlign: 'center',
              fontFamily: '"Noto Sans", "Noto Sans CJK SC", "DejaVu Sans", sans-serif',
              fontWeight: 900,
              fontSize: 88,
              lineHeight: 1.15,
              color: 'white',
              textTransform: 'uppercase',
              WebkitTextStroke: '6px black',
              paintOrder: 'stroke fill',
            }}
          >
            {page.map((w, i) => {
              const active = t >= w.start && t <= w.end;
              return (
                <span key={i} style={{color: active ? '#FFD400' : 'white'}}>
                  {w.word.trim()}{' '}
                </span>
              );
            })}
          </div>
        </AbsoluteFill>
      ) : null}
    </AbsoluteFill>
  );
};
