// 接受代码字符串input
function tokenizer(input) {
  // 剩余待处理字符
  let rest = input;
  // 输出结果集合，存放词法单元
  let tokens = [];
  // 词素相关配置
  const lexemes = [
    {
      regex: /^\(|^\)/,
      type: 'paren',
      value: 0,
      span: 0
    }, {
      regex: /^\d+/,
      type: 'number',
      value: 0,
      span: 0
    }, {
      regex: /^"([^"]+)?"/,
      type: 'string',
      value: 1,
      span: 0
    }, {
      regex: /^[a-z]+/i,
      type: 'name',
      value: 0,
      span: 0
    }
  ];

  // 遍历字符串，挑出词法单元
  while (rest.length > 0) {
    let type, value;
    // 匹配结果，本次匹配消费掉的串长度
    let matched, span;

    // 跳过空白字符
    if (matched = rest.match(/^\s+/)) {
      rest = rest.slice(matched[0].length);
      continue;
    }

    lexemes.forEach(({regex, type : t, value: v, span: s}) => {
      if (matched) return;
      if (matched = rest.match(regex)) {
        type = t;
        value = matched[v];
        span = matched[s].length;
      }
    });

    if (matched) {
      tokens.push({type, value});
      rest = rest.slice(span);
    }
    else {
      // 无法识别的字符，报错
      throw new TypeError('Unexpected character: ' + rest);
    }
  }

  return tokens;
}