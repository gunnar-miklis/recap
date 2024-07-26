import { createContext, useContext, useEffect, useState } from 'react';
import '../styles/toast.css';

const ToastContext = createContext();

export function useToastContext() {
  return useContext(ToastContext);
}

// interface MessageType {
//	 text: 'string',
//	 type: 'error' | 'default'
// }

// colors
const errorBg = '#a20ebd';
const errorTxt = '#f3e5f5';
const defaultBg = '#f3e5f5';
const defaultTxt = '#450950';

// show duration
const duration = 10000;

// TODO: animation, opacity + slight to the right

export default function ToastProvider({ children }) {
  const [newMessage, setNewMessage] = useState({});
  const [messageStack, setMessageStack] = useState([]);

  useEffect(() => {
    if (!Object.keys(newMessage).length) return;
    setMessageStack((prevState) => [...prevState, newMessage]);

    setTimeout(() => {
      setMessageStack((prevState) => prevState.slice(1));
    }, duration);
  }, [newMessage]);

  return (
    <ToastContext.Provider value={{ setNewMessage }}>
      {!!messageStack.length && (
        <aside id='toast'>
          <h1 className='h1'>Messages</h1>
          {messageStack.map((msg, i) => (
            <p
              key={`msg-${i}`}
              style={
                msg.type === 'error'
                  ? { backgroundColor: errorBg, color: errorTxt }
                  : { backgroundColor: defaultBg, color: defaultTxt }
              }
            >
              {msg.text}
            </p>
          ))}
        </aside>
      )}
      {children}
    </ToastContext.Provider>
  );
}
