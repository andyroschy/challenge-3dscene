import { useEffect, useState } from 'react'
import './App.css'
import { getFrame, Frame } from './getFrame';

function App() {
  const [ currentFrame, setCurrentFrame] = useState<Frame | null>(null);

  useEffect(() => {
    getFrame(0).then(setCurrentFrame);
  }, []);

  return (
    <>
      {JSON.stringify(currentFrame)}
    </>
  )
}

export default App
