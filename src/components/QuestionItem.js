import React, { useState, useEffect } from "react";

function QuestionItem({ question, onDelete, onUpdate }) {
  const { id, prompt, answers } = question;
  const [localCorrectIndex, setLocalCorrectIndex] = useState(question.correctIndex);

  // Sync with props when question changes
  useEffect(() => {
    setLocalCorrectIndex(question.correctIndex);
  }, [question.correctIndex]);

  function handleDeleteClick() {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "DELETE",
    }).then(() => onDelete(id));
  }

  function handleCorrectAnswerChange(event) {
    const newCorrectIndex = parseInt(event.target.value);
    setLocalCorrectIndex(newCorrectIndex); // update immediately

    fetch(`http://localhost:4000/questions/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ correctIndex: newCorrectIndex }),
    })
      .then((r) => r.json())
      .then((updatedQuestion) => onUpdate(updatedQuestion));
  }

  return (
    <li>
      <h4>Question {id}</h4>
      <h5>Prompt: {prompt}</h5>
      <label>
        Answers:
        <ul>
          {answers.map((answer, index) => (
            <li key={index}>{answer}</li>
          ))}
        </ul>
      </label>
      <label>
        Correct Answer:
        <select
          value={localCorrectIndex}
          onChange={handleCorrectAnswerChange}
          aria-label="Correct Answer"
        >
          {answers.map((answer, index) => (
            <option key={index} value={index}>
              {answer}
            </option>
          ))}
        </select>
      </label>
      <button onClick={handleDeleteClick}>Delete Question</button>
    </li>
  );
}

export default QuestionItem;








