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
const animationDuration = 400;

export default function ToastProvider({ children }) {
  const [newMessage, setNewMessage] = useState({});
  const [messageStack, setMessageStack] = useState([]); // FIXME: stack needs to be useRef(). because useState() gets affected by rerender

  // handle new incoming messages: 1. create id, 2. add to stack, 3. remove after delay with animation
  useEffect(() => {
    if (!Object.keys(newMessage).length) return;

    // 1. generate unique identifier: date + message length
    const newId = Date.now() + Object.values(newMessage)[0].length;
    // add id to newMessage object to be identifiable
    newMessage.id = newId;

    // 2. add new message to the stack
    setMessageStack((prevState) => [...prevState, newMessage]);

    // 3. animate fading before removal
    const animationDelay = setTimeout(() => {
      removeAnimation(newMessage.id);
      clearTimeout(animationDelay);
    }, [duration - animationDuration]);
    // filter the stack and remove message by id
    const removeDelay = setTimeout(() => {
      removeFromStack(newMessage.id);
      clearTimeout(removeDelay);
    }, duration);
  }, [newMessage]);

  // remove from stack
  function removeFromStack(messageId) {
    setMessageStack((prevState) => {
      const filteredState = prevState.filter((msg) => msg.id !== messageId);
      return filteredState;
    });
  }

  // animation
  function removeAnimation(messageId) {
    const domMessage = document.getElementById(messageId);
    if (domMessage instanceof HTMLElement) {
      const keyframes = [
        { opacity: 1, marginRight: 0 },
        { opacity: 0, marginRight: '-50px' },
      ];
      const options = {
        duration: animationDuration,
        easing: 'ease-out',
      };
      domMessage.animate(keyframes, options);
    }
  }

  // handle dismiss on click
  function dismissMessage(messageId) {
    removeAnimation(messageId);
	const removeDelay = setTimeout( () => {
		removeFromStack(messageId);
		clearTimeout(removeDelay);
	}, 400)
  }

  return (
    <ToastContext.Provider value={{ setNewMessage }}>
      {!!messageStack.length && (
        <aside id='toast'>
          <h1 className='h1'>Notifications</h1>
          {messageStack.map((msg) => (
            <p
              key={msg.id}
              id={msg.id}
              onClick={() => dismissMessage(msg.id)}
              style={
                msg.type === 'error'
                  ? { backgroundColor: errorBg, color: errorTxt }
                  : { backgroundColor: defaultBg, color: defaultTxt }
              }
              title='Click to dismiss this message'
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
