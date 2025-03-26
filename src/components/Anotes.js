import React, { useContext, useEffect, useState } from 'react';
import heartContext from '../context/heart/HeartNoteContext';
import '@fortawesome/fontawesome-free/css/all.min.css';

function Anotes() {
    const { hearts, getAllHearts, addComment, deleteComment } = useContext(heartContext);
    const [comments, setComments] = useState({}); // Store comments for each heart by heart ID
    const [visibleCommentId, setVisibleCommentId] = useState(null); // Tracks which note's comments are visible
    const [isLoggedIn, setIsLoggedIn] = useState(false); // Tracks if the user is logged in
    const loggedInUserId = localStorage.getItem('userId'); // Ensure the user ID is fetched correctly

    useEffect(() => {
        // Fetch all hearts
        getAllHearts();

        // Check if the user is logged in
        const token = localStorage.getItem('token');
        setIsLoggedIn(!!token); // Update the logged-in state
        // eslint-disable-next-line
    }, []);

    // Function to toggle visibility of comments for a specific note
    const toggleComments = (id) => {
        setVisibleCommentId((prev) => (prev === id ? null : id));
    };

    // Function to handle adding a comment
    const handleCommentSubmit = async (e, id) => {
        e.preventDefault();
        const commentText = comments[id]?.trim();
        if (!commentText) {
            alert('Comment cannot be empty');
            return;
        }
        await addComment(id, commentText);
        setComments((prevComments) => ({ ...prevComments, [id]: '' })); // Clear the comment field after submission
    };

    // Function to handle comment input change for each heart
    const handleCommentChange = (e, id) => {
        setComments((prevComments) => ({
            ...prevComments,
            [id]: e.target.value,
        }));
    };

    return (
        <div>
            <div className="container mt-4">
                <h2 className="text-center mb-4" style={{ color: '#86003C' }}>Beautiful Hearts</h2>
                <div className="row">
                    {hearts.length === 0 ? (
                        <div className="col-12">
                            <div className="alert alert-warning text-center">
                                No Available Hearts
                            </div>
                        </div>
                    ) : (
                        hearts.map((note) => (
                            <div className="col-md-4" key={note._id}>
                                <div className="card mb-3">
                                    <div className="card-body">
                                        <h5 className="card-title" style={{ color: '#86003C' }}>{note.title}</h5>
                                        <p className="card-text" style={{ color: '#86003C' }}>{note.heart}</p>
                                        {/* Flowers and Comment Icon on the Same Line */}
                                        <div className="d-flex justify-content-between align-items-center">
                                            <h4>🌹🌹🌹</h4>
                                            <i
                                                className="far fa-comment-alt"
                                                style={{
                                                    cursor: 'pointer',
                                                    fontSize: '1.5rem',
                                                    color: '#86003C',
                                                }}
                                                onClick={() => toggleComments(note._id)}
                                            ></i>
                                        </div>

                                        {/* Show Comments and Comment Form if visible */}
                                        {visibleCommentId === note._id && (
                                            <div className="mt-1">
                                                {/* Display Comments */}
                                                {note.comments && note.comments.length > 0 ? (
                                                    <div>
                                                        <h6 style={{ color: '#86003C' }}>Lovely Thoughts:</h6>
                                                        <ul className="list-unstyled">
                                                            {note.comments.map((comment) => (
                                                                <li key={comment._id} className="d-flex justify-content-between align-items-center">
                                                                    {/* Comment Text */}
                                                                    <div style={{ color: '#86003C', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                                                        <strong style={{ color: '#86003C' }}>{comment.user?.name}: </strong>
                                                                        {comment.text}
                                                                    </div>

                                                                    {/* Icons - Wrapped Inside a Flexbox */}
                                                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                                                        {isLoggedIn && comment.user && comment.user._id === loggedInUserId ? (
                                                                            <button
                                                                                className="btn btn-link text-danger p-0 d-flex align-items-center"
                                                                                onClick={() => deleteComment(note._id, comment._id)}
                                                                                style={{
                                                                                    textDecoration: 'none',
                                                                                    fontSize: '1rem',
                                                                                    display: 'flex',
                                                                                    alignItems: 'center',
                                                                                }}
                                                                            >
                                                                                <i className="far fa-trash-alt"></i>
                                                                            </button>
                                                                        ) : (
                                                                            <i
                                                                                className="fas fa-heart"
                                                                                style={{
                                                                                    color: '#E41F7B',
                                                                                    fontSize: '1rem',
                                                                                    display: 'flex',
                                                                                    alignItems: 'center',
                                                                                }}
                                                                            ></i>
                                                                        )}
                                                                    </div>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                ) : (
                                                    <p className="text-muted" style={{ color: '#E41F7B' }}>No thoughts yet.</p>
                                                )}

                                                {/* Comment Form */}
                                                {isLoggedIn ? (
                                                    <form
                                                        onSubmit={(e) => handleCommentSubmit(e, note._id)}
                                                        className="mt-3 d-flex align-items-center"
                                                    >
                                                        <input
                                                            type="text"
                                                            className="form-control me-2"
                                                            placeholder="Share your thoughts!!"
                                                            value={comments[note._id] || ''}
                                                            onChange={(e) => handleCommentChange(e, note._id)}
                                                        />
                                                        <button
                                                            type="submit"
                                                            className="btn btn-primary btn-sm d-flex align-items-center justify-content-center"
                                                            style={{
                                                                border: 'none',
                                                                background: 'transparent',
                                                            }}
                                                        >
                                                            <i
                                                                className="material-icons"
                                                                style={{
                                                                    fontSize: '36px',
                                                                    color: '#86003C',
                                                                }}
                                                            >
                                                                send
                                                            </i>
                                                        </button>
                                                    </form>
                                                ) : (
                                                    <p className="text-muted mt-2" style={{ color: '#E41F7B' }}>
                                                        Please login to share your thoughts.
                                                    </p>
                                                )}
                                            </div>
                                        )}
                                    </div>

                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}

export default Anotes;
