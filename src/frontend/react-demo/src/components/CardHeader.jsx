import { useState, useEffect } from 'react';
import './CardStyles.css';

export default function CardHeader({ id, title, date, authors, isRead, toggleIsRead, deletePost }) {
  const [formatedDate, setFormatedDate] = useState(date);
  useEffect(() => {
    const d = new Date(date);
    const fd = d.toLocaleString('en-DE', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
    setFormatedDate(fd);
  }, [date]);

  return (
    <div className='flex-col'>
      <div className='flex-row flex-between'>
        <h3 className='card-title' onClick={() => toggleIsRead(id)}>
          {title}
          <span
            style={{
              fontSize: '50%',
              fontWeight: 'normal',
              color: 'gray',
              marginLeft: '0.6em',
              position: 'relative',
              bottom: '0.19em',
            }}
          >
            {isRead ? '✔️' : '✖️'}
          </span>
        </h3>
        <div className='flex-col card-date'>
          <span>{formatedDate}</span>
          <a className='card-delete' onClick={() => deletePost(id)}>
            Delete
          </a>
        </div>
      </div>

      <p className='card-authors'>
        written by{' '}
        {/* place comma after each author logic
					* when 1 author: no comma
					* when 2 or more: place coma after each, but not the last...
						... instead:  "author1, author2, author3, " => do: "author1, author2, author3" */}
        {authors.length > 1 ? (
          authors.map((author, i) => (
            <a key={i}>
              {author}
              {i + 1 < authors.length ? ', ' : ''}
            </a>
          ))
        ) : (
          <a>{authors}</a>
        )}
      </p>
    </div>
  );
}
