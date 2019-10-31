const treatsAnswers = require('./halloween2019.json');
const {
  getInfo,
  createInfo,
  updateCurrentTreat,
  updateTreatStep
} = require('../database/db.js');

const TREAT_FINISHED = 3;
const TOTAL_TREATS = 5;

function handleTreat(suffix, userId) {
  const currTreat = 'treat' + suffix;

  if (!(currTreat in treatsAnswers['treats'])) {
    rej('Invalid treat specified');
  }

  const currUserRow = getInfo().get({ userId });

  if (!currUserRow) {
    return handleInactive();
  }

  return new Promise((res, rej) => {
    if (currUserRow[currTreat] === TREAT_FINISHED) {
      const currUserScore = [
        ['treat1 : FFBE', currUserRow['treat1']],
        ['treat2 : FFBE EQUIP (easy)', currUserRow['treat2']],
        ['treat3 : Final Fantasy Mascots', currUserRow['treat3']],
        ['treat4 : Lightning and Me', currUserRow['treat4']],
        [
          'treat5 : Bench Universe Discord Server (very easy)',
          currUserRow['treat5']
        ]
      ]
        .filter(treatStatus => treatStatus[1] < TREAT_FINISHED)
        .map(treat => `!2019 ${treat[0]}`);

      res(
        `Seems you've already finished that treat. Here are your available choices:\n${currUserScore.join(
          '\n'
        )}`
      );
    } else if (currUserRow['currentTreat'] !== parseInt(suffix)) {
      updateCurrentTreat().run({ currentTreat: parseInt(suffix), userId });
      const currUserHints = treatsAnswers['treats'][currTreat];
      const currUserHintStr = currUserHints[currUserRow[currTreat]].join('\n');

      res(
        `Switching to treat ${suffix}. Here is your current hint:\n${currUserHintStr}`
      );
    } else {
      rej('Treat specified is already current treat');
    }
  });
}

function handleAnswer(suffix, userId) {
  const currUserRow = getInfo().get({ userId });

  if (!currUserRow) {
    return handleInactive();
  }

  if (currUserRow['currentTreat'] === 0) {
    res(`Pick a treat first.`);
  }

  return new Promise((res, rej) => {
    const currentTreat = 'treat' + parseInt(currUserRow['currentTreat']);
    const currentTreatStep = parseInt(currUserRow[currentTreat]);
    const currAnswers =
      treatsAnswers['answers'][currentTreat][currentTreatStep];

    if (currUserRow[currentTreat] === TREAT_FINISHED) {
      rej(`Already done with treat, cannot answer again`);
    } else if (currAnswers.includes(suffix)) {
      updateTreatStep(currentTreat).run({
        stepValue: currentTreatStep + 1,
        userId
      });

      const newTreatHint = treatsAnswers['treats'][currentTreat][
        currentTreatStep + 1
      ].join('\n');

      res(newTreatHint);
    } else {
      rej('Wrong answer');
    }
  });
}

function handleInfo(userId) {
  const currUserRow = getInfo().get({ userId });

  if (!currUserRow) {
    return handleInactive();
  }

  return new Promise(res => {
    res(treatsAnswers['info'].join('\n'));
  });
}

function handleIntro(userId) {
  const currUserRow = getInfo().get({ userId });

  if (!currUserRow) {
    return new Promise(res => {
      createInfo().run({ userId });
      res(treatsAnswers['intro'].join('\n'));
    });
  }

  return handleInfo(userId);
}

function handleInactive() {
  return new Promise(res => {
    res(
      `Go send the message !halloween2019 in the #bot-spam channel of Lady's Discord, then we'll talk.`
    );
  });
}

function handleFinished(userId) {
  const currUserRow = getInfo().get({ userId });
  const currUserTreat = currUserRow['currentTreat'];
  const currTreat = 'treat' + currUserTreat;
  let done = 0;
  const currUserTreatSteps = [
    currUserRow['treat1'],
    currUserRow['treat2'],
    currUserRow['treat3'],
    currUserRow['treat4'],
    currUserRow['treat5']
  ].forEach(el => {
    if (el === TREAT_FINISHED) done++;
  });

  return new Promise((res, rej) => {
    if (done === TOTAL_TREATS) {
      res(
        `I don’t know why you bothered but yay.. You did it. Woopie. Congratulations. Do I need to say more? Go ask Lady for your pat on the back.`
      );
    } else if (done === 1) {
      res(
        `Well, you managed to get a treat. Thank you for participating. Go ask Lady for your trick-or-treater role.`
      );
    } else if (currUserRow[currTreat] === TREAT_FINISHED) {
      res();
    }

    rej(`Not yet done with treat.`);
  });
}

module.exports = {
  handleTreat,
  handleAnswer,
  handleInfo,
  handleIntro,
  handleFinished
};
