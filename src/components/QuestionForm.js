import React, { useState } from "react";

function QuestionForm({ onAddQuestion }) {
  const [formData, setFormData] = useState({
    prompt: "",
    answers: ["", "", "", ""],
    correctIndex: 0,
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "correctIndex" ? parseInt(value) : value,
    });
  }

  function handleAnswerChange(index, value) {
    const updatedAnswers = [...formData.answers];
    updatedAnswers[index] = value;
    setFormData({ ...formData, answers: updatedAnswers });
  }

  function handleSubmit(e) {
    e.preventDefault();

    fetch("http://localhost:4000/questions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then((r) => r.json())
      .then((newQuestion) => {
        onAddQuestion(newQuestion);
        setFormData({
          prompt: "",
          answers: ["", "", "", ""],
          correctIndex: 0,
        });
      });
  }

  return (
    <section>
      <h1>New Question</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Prompt:
          <input
            type="text"
            name="prompt"
            value={formData.prompt}
            onChange={handleChange}
          />
        </label>

        {formData.answers.map((answer, index) => (
          <label key={index}>
            Answer {index + 1}:
            <input
              type="text"
              value={answer}
              onChange={(e) => handleAnswerChange(index, e.target.value)}
            />
          </label>
        ))}

        <label>
          Correct Answer:
          <select
            name="correctIndex"
            value={formData.correctIndex}
            onChange={handleChange}
            aria-label="Correct Answer"
          >
            {formData.answers.map((_, index) => (
              <option key={index} value={index}>
                Answer {index + 1}
              </option>
            ))}
          </select>
        </label>

        <button type="submit">Add Question</button>
      </form>
    </section>
  );
}

export default QuestionForm;








