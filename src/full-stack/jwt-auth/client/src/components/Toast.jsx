import { useEffect, useState } from 'react';
import './toast.css';

// colors
const errorBg = '#a20ebd';
const errorTxt = '#f3e5f5';
const defaultBg = '#f3e5f5';
const defaultTxt = '#450950';

// interface MessageType { text: 'string', status: 'error' | 'default' }

export default function Toast({ message }) {
  const [messageStack, setMessageStack] = useState([]);

  useEffect(() => {
    if (!Object.keys(message).length) return;
    setMessageStack((prevState) => [...prevState, message]);

    setTimeout(() => {
      setMessageStack((prevState) => prevState.slice(1));
    }, 6000);
  }, [message]);

  return (
    <>
      {!!messageStack.length && (
        <aside id='toast'>
          <h2 className='h2'>Messages</h2>
          {messageStack.map((msg, i) => (
            <p
              key={`msg-${i}`}
              style={
                msg.status === 'error'
                  ? { backgroundColor: errorBg, color: errorTxt }
                  : { backgroundColor: defaultBg, color: defaultTxt }
              }
            >
              {msg.text}
            </p>
          ))}
        </aside>
      )}
    </>
  );
}
