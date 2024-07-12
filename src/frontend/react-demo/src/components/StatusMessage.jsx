import React from 'react';
import './StatusMessageStyles.css';

export default function StatusMessage({ status, message, seconds }) {
  return (
    <div className='box shadow'>
      {status ? (
        <p>
          <span className='icon'>✅</span>
          <span className='success'>{message} </span>
          <span> {Math.floor(seconds)}s</span>
        </p>
      ) : (
        <p>
          <span className='icon'>❌</span>
          <span className='error'>{message} </span>
          <span> {Math.floor(seconds)}s</span>
        </p>
      )}
    </div>
  );
}
