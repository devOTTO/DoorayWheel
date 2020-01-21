const MSG = require('./constant');
const logger = require('./logger');
// 지정된 범위의 정수 1개를 랜덤하게 반환하는 함수
// n1 은 "하한값", n2 는 "상한값"
function randomRange(n1, n2) {
  return Math.floor( (Math.random() * (n2 - n1 + 1)) + n1 );
}

function getText (type, param) {
  return MSG.MSG_TEXT[type].replace('${param}', param);
};
function WinnerList (num, range) {
  let winners = [];
  for(var i=0; i<num; i++) {
    let n = randomRange(1, range);
    if (! sameNum(n)) {
      winners.push(n);
    } else {
    i--;
    }
  }
    function sameNum (n) {
    return winners.find((e) => (e === n));
    }
  return winners;
  }

// Request URL
exports.call = (req, res) => {
  const params = req.body.text.split(' ');
  let winner = [];

  if (params.length < MSG.MINIMUM_PARAMS_LENGTH || params[0] === 'help') {
    logger.access({ type: logger.ACCESS_TYPE.HELP, body: req.body });
    return res.status(200).send({
        text: getText(MSG.MSG_TYPE.HELP)
    });
  }
  if(params.length - 1 < params[0]){
    logger.access({ type: logger.error, body: req.body });
    return res.status(200).send({
        text: getText(MSG.MSG_TYPE.HELP)
    });
  }
  logger.access({ type: logger.ACCESS_TYPE.CALL, body: req.body });
  //아닌 경우 wheel
  let winnerNum = params.length - 1;
  winner = WinnerList(Number(params[0]), winnerNum);

  let text = "돌려 돌려 돌림판~ 행운의 당첨자는!";
  winner.forEach(cur => {
    text += "\n🌸" + params[cur] + "🌸 ";
  });
  text += "입니다!";
  let title = "오늘의 당첨자 수 : "+ params[0];
  let value = "참여자 : ";
  for(let i = 1; i<params.length; ++i)
  {
    value += params[i] + ' ';
  }

  return res.status(200).send({
    responseType: 'inChannel',
    text,
    attachments : [
      {
      fields : [
        {
        title,
        value,
        }
      ]
    }
    ]
});
};

