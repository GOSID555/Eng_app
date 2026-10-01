import { useEffect, useState } from 'react';
import Home from './components/Home.jsx';
import ConversationPlayer from './components/ConversationPlayer.jsx';
import ResultScreen from './components/ResultScreen.jsx';
import { LESSONS } from './data/lessons.js';
import { loadProgress, loadSettings, saveResult, saveSettings } from './utils/storage.js';

export default function App() {
  const [screen, setScreen] = useState({ name: 'home' });
  const [settings, setSettings] = useState(loadSettings);
  const [progress, setProgress] = useState(loadProgress);
  const [playKey, setPlayKey] = useState(0);

  useEffect(() => saveSettings(settings), [settings]);

  const lesson = LESSONS.find((l) => l.id === screen.lessonId);
  const nextLesson = lesson && LESSONS[LESSONS.indexOf(lesson) + 1];

  const start = (id) => {
    setPlayKey((k) => k + 1);
    setScreen({ name: 'play', lessonId: id });
  };

  const finish = (result) => {
    setProgress(saveResult(lesson.id, result));
    setScreen({ name: 'result', lessonId: lesson.id, result });
  };

  return (
    <div className="app">
      {screen.name === 'home' && (
        <Home settings={settings} onSettings={setSettings} progress={progress} onStart={start} />
      )}
      {screen.name === 'play' && lesson && (
        <ConversationPlayer
          key={playKey}
          lesson={lesson}
          settings={settings}
          onSettings={setSettings}
          onFinish={finish}
          onExit={() => setScreen({ name: 'home' })}
        />
      )}
      {screen.name === 'result' && lesson && (
        <ResultScreen
          lesson={lesson}
          result={screen.result}
          settings={settings}
          onReplay={() => start(lesson.id)}
          onNext={nextLesson ? () => start(nextLesson.id) : null}
          onHome={() => setScreen({ name: 'home' })}
        />
      )}
    </div>
  );
}
