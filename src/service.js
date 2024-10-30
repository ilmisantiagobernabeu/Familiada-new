const sequelize = require("../database/sequelize");
const { DataTypes } = require("sequelize");
const Answer = require("../models/answer")(sequelize, DataTypes);
const Question = require("../models/question")(sequelize, DataTypes);
const Collection = require("../models/collection")(sequelize, DataTypes);
// const gameLogic = require('./gameLogic');

// Getters
async function getCollections() {
  return await Collection.findAll();
}

async function getCollection(id) {
  return await Collection.findOne({
    where: {
      id: id,
    },
  });
}

async function getAnswer(id) {
  return await Answer.findOne({
    where: {
      id: id,
    },
  });
}

async function getAnswers(event, idQuestion) {
  return await Answer.findAll({
    where: {
      questionId: idQuestion,
    },
  });
}

async function getQuestions(idCollection) {
  return await Question.findAll({
    where: {
      collectionId: idCollection,
    },
  });
}

async function getQuestion(id) {
  return await Question.findOne({
    where: {
      id: id,
    },
  });
}

// Insertion
async function saveCollection(event, title) {
  Collection.create({ title: title })
    .then((set) => {
      console.log("Set created: ", set);
    })
    .catch((error) => console.error("Error creating set: ", error));
}

async function saveQuestion(question, collectionId) {
  const createdQuestion = await Question.create({
    content: question,
    collectionId: collectionId,
  });
  return createdQuestion.id;
}

async function saveAnswer(answer, points, questionId) {
  Answer.create({
    content: answer,
    points: points,
    questionId: questionId,
  });
}

async function saveNewQuestion(question, answers, points) {
  Question.create({
    content: question,
    collectionId: setOfQuestions.id,
  });
  Question.findOne({
    where: {
      content: question,
    },
  }).then((questionRespone) => {
    for (i = 0; i < answers.length; i++) {
      Answer.create({
        content: answers[i],
        points: points[i],
        questionId: questionRespone.id,
      });
    }
  });
}

// Deletion
async function deleteCollection(event, id) {
  await Collection.destroy({
    where: {
      id: id,
    },
  });
}

async function deleteQuestion(id) {
  await Answer.destroy({
    where: {
      questionId: id,
    },
  });
  await Question.destroy({
    where: {
      id: id,
    },
  });
}

async function deleteAnswers(idQuestion) {
  await Answer.destroy({
    where: {
      questionId: idQuestion,
    },
  });
}

// Update

async function updateQuestion(
  _event,
  id,
  questionContent,
  answersContent,
  answersPoints
) {
  console.log("Updating question: ", id);
  console.log("Question content: ", questionContent);
  console.log("Answers content: ", answersContent);
  console.log("Answers points: ", answersPoints);
  Question.findOne({
    where: {
      id: id,
    },
  }).then((question) => {
    question.content = questionContent;
    question.save();

    //Delete all of answers for this question
    deleteAnswers(id);
    //Add new answers
    answersContent.forEach((answer, index) => {
      saveAnswer(answer, answersPoints[index], id);
    });
    return;
  });
}

module.exports = {
  getCollections,
  getCollection,
  getQuestions,
  getQuestion,
  getAnswers,
  getAnswer,
  getCollection,
  saveCollection,
  saveQuestion,
  saveAnswer,
  saveNewQuestion,
  deleteCollection,
  deleteQuestion,
  updateQuestion,
};
