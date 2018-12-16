import {TIME} from './constants.js';
import {LIVES} from './constants.js';

export default {
  lives: LIVES,
  time: TIME,
  level: 0,

  userAnswers: [],

  questions: [
    {
      "type": "genre",
      "question": "Выберите все песни в жанре R'n'B",
      "genre": "rnb",
      "answers": [
        {
          "src": "/path/to/file.mp3",
          "genre": "rnb"
        },
        {
          "src": "/path/to/file.mp3",
          "genre": "blues"
        },
        {
          "src": "/path/to/file.mp3",
          "genre": "rock"
        },
        {
          "src": "/path/to/file.mp3",
          "genre": "rnb"
        }
      ]
    },
    {
      "type": "genre",
      "question": "Выберите все блюзовые песни",
      "genre": "blues",
      "answers": [
        {
          "src": "/path/to/file.mp3",
          "genre": "blues"
        },
        {
          "src": "/path/to/file.mp3",
          "genre": "pop"
        },
        {
          "src": "/path/to/file.mp3",
          "genre": "rock"
        },
        {
          "src": "/path/to/file.mp3",
          "genre": "rnb"
        }
      ]
    },
    {
      "type": "artist",
      "question": "Кто исполняет эту песню?",
      "src": "path/to/file.mp3",
      "answers": [
        {
          "image": {
            "url": "http://placehold.it/705x455",
            "width": 300,
            "height": 300
          },
          "title": "Пелагея",
          "isCorrect": false
        },
        {
          "image": {
            "url": "http://placehold.it/705x455",
            "width": 300,
            "height": 300
          },
          "title": "Краснознамённая дивизия имени моей Бабушки",
          "isCorrect": false
        },
        {
          "image": {
            "url": "http://placehold.it/705x455",
            "width": 300,
            "height": 300
          },
          "title": "Кровосток",
          "isCorrect": true
        }
      ]
    }
  ],

};


