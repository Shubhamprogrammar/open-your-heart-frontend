import React, { useState } from 'react'
import HeartContext from './HeartNoteContext'

function HeartState(props) {
    const host = 'http://localhost:5000'
    const heartinitial = []
    const [hearts, setHearts] = useState(heartinitial);

    // Get all notes
    const getAllHearts = async () => {
        try {
            const response = await fetch(`${host}/api/hnotes/getallnotes`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const json = await response.json();
            console.log(json); // To inspect if it's an array
            if (Array.isArray(json)) {
                setHearts(json); // Set hearts only if it's an array
            } else {
                console.error("Expected an array but received:", json);
                setHearts([]); // Set empty array if the response is not an array
            }
        } catch (error) {
            console.error('Failed to fetch hearts:', error);
            setHearts([]); // In case of an error, set hearts to an empty array
        }
    };

    // Function to add a comment to a specific heart note
    const addComment = async (id, commentText) => {
        const response = await fetch(`${host}/api/hnotes/addcomment/${id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
            body: JSON.stringify({ text: commentText })
        });
        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.error || 'Failed to add comment');
        }
        getAllHearts(); // Refresh hearts to reflect the new comment

        return data;
    };

    const deleteComment = async (noteId, commentId) => {
        let confirmation = window.confirm("Do you really want to remove your lovely thought🌿?");
        if (confirmation) {
            try {
                const response = await fetch(`${host}/api/hnotes/deletecomment/${noteId}/${commentId}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                        'auth-token': localStorage.getItem('token'),
                    },
                });

                if (!response.ok) {
                    console.error('Failed to delete comment:', await response.text());
                    return;
                }

                // Update state directly after deletion
                setHearts((prevHearts) =>
                    prevHearts.map((note) =>
                        note._id === noteId
                            ? { ...note, comments: note.comments.filter((c) => c._id !== commentId) }
                            : note
                    )
                );
            } catch (error) {
                console.error('Error deleting comment:', error);
            }
        }
    };
    const deleteOwnerComment = async (noteId, commentId) => {
        let confirmation = window.confirm("Do you want to remove the thought?");
        if (confirmation) {
            try {
                const response = await fetch(`${host}/api/hnotes/deleteallcomment/${noteId}/${commentId}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                        'auth-token': localStorage.getItem('token'),
                    },
                });

                if (!response.ok) {
                    console.error('Failed to delete comment:', await response.text());
                    return;
                }

                // Update state directly after deletion
                setHearts((prevHearts) =>
                    prevHearts.map((note) =>
                        note._id === noteId
                            ? { ...note, comments: note.comments.filter((c) => c._id !== commentId) }
                            : note
                    )
                );
            } catch (error) {
                console.error('Error deleting comment:', error);
            }
        }
    };

    // Get own notes
    const getOwnHeart = async () => {
        try {
            const response = await fetch(`${host}/api/hnotes/getallhnotes`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': localStorage.getItem('token'),
                },
            });
            const json = await response.json();
            console.log(json); // Log the result to ensure it's correct
            if (Array.isArray(json)) {
                setHearts(json); // Set hearts only if it's an array
            } else {
                console.error("Expected an array but received:", json);
                setHearts([]); // Fallback in case the response is not an array
            }
        } catch (error) {
            console.error('Failed to fetch own hearts:', error);
            setHearts([]); // Handle error case by resetting to empty array
        }
    };

    // Add a Heart
    const addHeart = async (title, heart) => {
        const response = await fetch(`${host}/api/hnotes/addhnotes`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token'),
            },
            body: JSON.stringify({ title, heart }),
        })
        const savedHnotes = await response.json();
        setHearts(hearts.concat(savedHnotes));
    }

    // Delete a heart
    const deleteHeart = async (id) => {
        let confirmation = window.confirm("Do you really want to break your heart💔?");
        if (confirmation) {
            try {
                const response = await fetch(`${host}/api/hnotes/deletehnote/${id}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                        'auth-token': localStorage.getItem('token'),
                    },
                });
                const json = await response.json();
                console.log(json);
                setHearts(hearts.filter(note => note._id !== id));
            } catch (error) {
                console.error('Failed to delete heart:', error);
            }
        }
    };


    // Edit a Heart
    const editHeart = async (id, title, heart) => {
        const response = await fetch(`${host}/api/hnotes/updatehnotes/${id}`, {
            method: "PUT",
            headers: {
                'content-type': 'application/json',
                'auth-token': localStorage.getItem('token'),
            },
            body: JSON.stringify({ title, heart }),
        });
        const json = await response.json();
        console.log(json);

        let newHeart = JSON.parse(JSON.stringify(hearts))
        for (let index = 0; index < hearts.length; index++) {
            const element = hearts[index];
            if (element._id === id) {
                newHeart[index].title = title;
                newHeart[index].heart = heart;
                break;
            }
        }
        setHearts(newHeart);
    }

    // Fedback Form
    const addFeedback = async (name, email, feedback) => {
        const response = await fetch(`${host}/api/feedback/addfeedback`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, email, feedback }),
        })
        const savedFeedback = await response.json();
        console.log(savedFeedback);
    }
    return (
        <div>
            <HeartContext.Provider value={{ hearts, setHearts, addHeart, getAllHearts, getOwnHeart, editHeart, deleteHeart, addFeedback, addComment, deleteComment, deleteOwnerComment }}>
                {props.children}
            </HeartContext.Provider>
        </div>
    )
}

export default HeartState
