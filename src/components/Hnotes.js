import React, { useContext, useEffect, useState, useRef } from 'react';
import heartContext from '../context/heart/HeartNoteContext';
import '@fortawesome/fontawesome-free/css/all.min.css';

function Hnotes() {
  const { hearts, getOwnHeart, deleteHeart, editHeart, deleteOwnerComment } = useContext(heartContext);
  const [note, setNote] = useState({ id: "", etitle: "", eheart: "" });
  const ref = useRef(null);  // Ref for opening the modal
  const refClose = useRef(null);  // Ref for closing the modal
  const [visibleCommentId, setVisibleCommentId] = useState(null); // Tracks which note's comments are visible

  useEffect(() => {
    getOwnHeart();
    // eslint-disable-next-line
  }, []);

  const updateHeart = (currentHeart) => {
    ref.current.click();  // Open the modal
    setNote({
      id: currentHeart._id,
      etitle: currentHeart.title,
      eheart: currentHeart.heart,
    });
  };

  const toggleComments = (id) => {
    setVisibleCommentId((prev) => (prev === id ? null : id));
  };

  const handleClick = () => {
    editHeart(note.id, note.etitle, note.eheart);
    refClose.current.click();  // Close the modal after updating
  };

  const onchange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  return (
    <div>
      {/* Hidden button to trigger modal */}
      <button type="button" ref={ref} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Launch Modal for Editing Heart
      </button>

      {/* Modal for editing a heart note */}
      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Heart</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form className='my-3'>
                <div className="mb-3">
                  <label htmlFor="etitle" className="form-label">Title</label>
                  <input type="text" className="form-control" id="etitle" name="etitle" value={note.etitle} onChange={onchange} required />
                </div>
                <div className="mb-3">
                  <label htmlFor="eheart" className="form-label">Description</label>
                  <textarea
                    className="form-control"
                    id="eheart"
                    name="eheart"
                    value={note.eheart}
                    onChange={onchange}
                    rows="4"
                    required
                  ></textarea>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" ref={refClose}>Close</button>
              <button type="button" onClick={handleClick} className="btn btn-success">Update Heart</button>
            </div>
          </div>
        </div>
      </div>

      {/* Hearts list */}
      <div className="container mt-4">
        <h2 className="text-center mb-4" >Your Hearts</h2>
        <div className="row">
          {hearts.length === 0 ? (
            <div className="col-12">
              <div className="alert alert-warning text-center">No Heart is surrendered</div>
            </div>
          ) : (
            hearts.map(heart => (
              <div className="col-md-4" key={heart._id}>
                <div className="card mb-3">
                  <div className="card-body">
                    <div className="d-flex justify-content-end position-absolute" style={{ right: '10px', top: '10px' }}>
                      <i className="far fa-trash-alt mx-2" onClick={() => deleteHeart(heart._id)} style={{ cursor: 'pointer', color: '#86003C' }}></i>
                      <i className="far fa-edit mx-2" onClick={() => updateHeart(heart)} style={{ cursor: 'pointer', color: '#86003C' }}></i>
                    </div>
                    <h5 className="card-title" style={{ color: '#86003C' }}>{heart.title}</h5>
                    <p className="card-text" style={{ color: '#86003C' }}>{heart.heart}</p>


                    {/* Toggle Comments */}

                    <div className="d-flex justify-content-between align-items-center">
                      <h4>❤️❤️❤️</h4>
                      <i
                        className="fa-regular fa-comment"
                        style={{
                          cursor: 'pointer',
                          fontSize: '1.5rem',
                          color: '#86003C',
                        }}
                        onClick={() => toggleComments(heart._id)}
                      ></i>
                    </div>
                    {/* Show Comments if visible */}
                    {visibleCommentId === heart._id && (
                      <div className="mt-1">
                        {heart.comments && heart.comments.length > 0 ? (
                          <div>
                            <h6 style={{ color: '#86003C' }}>Lovely Thoughts:</h6>
                            <ul className="list-unstyled">
                              {heart.comments.map((comment) => (
                                <li key={comment._id} className="d-flex justify-content-between align-items-center">
                                  <div style={{ color: '#86003C' }}>
                                    <strong style={{ color: '#86003C' }}>{comment.user?.name || "Anonymous"}: </strong>
                                    {comment.text}
                                  </div>
                                  <button
                                    className="btn btn-link text-danger"
                                    onClick={() => deleteOwnerComment(heart._id, comment._id)}
                                    style={{ textDecoration: 'none', fontSize: '1rem' }}
                                  >
                                    <i className="far fa-trash-alt"></i>
                                  </button>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ) : (
                          <p className="text-muted" style={{ color: '#86003C' }}>No thoughts yet.</p>
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

export default Hnotes;
