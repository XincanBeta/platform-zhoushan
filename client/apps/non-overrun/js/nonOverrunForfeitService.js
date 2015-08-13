/*
  变更内容：
  1、 向上取整，公式
    if money%100 > 0 then
      money = money - money%100 + 100
    end if
  2、特别严重的计算方式变更

*/


/**
 不改动纸质标准中指定的数值：所以 超重与其他是分开设计的

 一、超重
 输入：
 总重、轴数（超重特有的参数，所以在切换超限类型要显隐）
 输出：
 1、获取范围
 2、根据公式求罚金


 单位：吨、元

 二、长宽高
 输入
 超量


 注：以线性方程为主，其中超重的最大超量有 5% 加量

 */

angular.module('app.non-overrun').service('forfeit', function () {

  /*
   暴露接口
   type: 超长/length，以此类推
   value: xx
   axles: x
   */
  this.calcOverForfeit = function (type, value, axles) {
    var result;
    type = _formatType(type);
    if (type == "weight") {
      if (!axles) {
        return;
      }
      result = _calcOverWeightForfeit(type, value, axles)
    } else {
      result = _calcOverValueForfeit(type, value);
    }
    /*
     对数字进行处理：
     字符串转数字
     负数转 0
     */
    result.overValue = convertNumber(result.overValue)
    result.overValue = (result.overValue >= 0) ? result.overValue : 0;
    result.forfeit = convertNumber(result.forfeit)
    // 去除小数点
    result.forfeit = result.forfeit >> 0;
    // 罚金向上取整；精确到 100
    result.forfeit = _ceil(result.forfeit)
    return result;
  };

  // 罚金向上取整；精确到 100
  function _ceil( value ){
    if(value % 100 > 0){
      return (value - (value % 100) + 100);
    }
    return value
  }


  function convertNumber(str) {
    if (str == "" || str == null) {
      return 0;
    } else {
      return +str; //parseFloat(str);
    }
  }

  /*
   记录违规指标，包含超量的最大边界、最大罚金、情节程度
   上下指标的罚金边界用于生成线性方程，供中间范围使用
   超量始终要计算
   */
  var overWeightRules = [
    {
      level: "轻微",
      maxForfeit: 0,
      maxOver2: 1,
      maxOver3: 1.5,
      maxOver4: 2,
      maxOver5: 2.5,
      maxOver6: 3
    },//轻微
    {
      level: "一般",
      maxForfeit: 300,
      maxOver2: 2,
      maxOver3: 3,
      maxOver4: 5,
      maxOver5: 6,
      maxOver6: 7
    },
    {
      level: "一般",
      maxForfeit: 700,
      maxOver2: 4,
      maxOver3: 7,
      maxOver4: 9,
      maxOver5: 10,
      maxOver6: 13
    },
    {
      maxOver2: 6,
      maxOver3: 10,
      maxOver4: 13,
      maxOver5: 14,
      maxOver6: 18,
      maxForfeit: 1000,
      level: "一般"
    },//一般
    {
      maxOver2: 8,
      maxOver3: 13,
      maxOver4: 17,
      maxOver5: 19,
      maxOver6: 23,
      maxForfeit: 2000,
      level: "较重"
    },
    {
      maxOver2: 10,
      maxOver3: 15,
      maxOver4: 20,
      maxOver5: 25,
      maxOver6: 28,
      maxForfeit: 2500,
      level: "较重"

    },//较重
    {
      maxOver2: 12,
      maxOver3: 18,
      maxOver4: 24,
      maxOver5: 31,
      maxOver6: 34,
      maxForfeit: 3500,
      level: "严重"

    },
    {
      maxOver2: 14,
      maxOver3: 22,
      maxOver4: 28,
      maxOver5: 37,
      maxOver6: 40,
      maxForfeit: 5000,
      level: "严重"

    },
    {
      maxOver2: 16,
      maxOver3: 25,
      maxOver4: 33,
      maxOver5: 42,
      maxOver6: 46,
      maxForfeit: 7000,
      level: "严重"

    },//严重
    {
      maxOver2: 18,
      maxOver3: 27,
      maxOver4: 37,
      maxOver5: 47,
      maxOver6: 51,
      maxForfeit: 9000,
      level: "特别严重"

    },
    {
      maxOver2: 20,
      maxOver3: 30,
      maxOver4: 40,
      maxOver5: 50,
      maxOver6: 55,
      maxForfeit: 11000,
      level: "特别严重"

    },
    {
      maxOver2: 20,
      maxOver3: 30,
      maxOver4: 40,
      maxOver5: 50,
      maxOver6: 55,
      level: "特别严重",
      maxForfeit: 30000
    }//特别严重
  ];

  // 长宽高规则
  var overValueRules = [{
    level: '轻微',
    lengthRange: [18, 20],
    widthRange: [2.5, 2.7],
    heightRange: [4, 4.1],
    containerHeightRange: [4.2, 4.3],
    forfeitRange: [0, 0]
  }, {
    level: '一般',
    lengthRange: [20, 22],
    widthRange: [2.7, 2.9],
    heightRange: [4.1, 4.3],
    containerHeightRange: [4.3, 4.5],
    forfeitRange: [200, 300]
  }, {
    level: '较重',
    lengthRange: [22, 26],
    widthRange: [2.9, 3.2],
    heightRange: [4.3, 4.5],
    containerHeightRange: [4.5, 4.7],
    forfeitRange: [300, 800]
  }, {
    level: '严重',
    lengthRange: [26, 28],
    widthRange: [3.2, 3.5],
    heightRange: [4.5, 4.7],
    containerHeightRange: [4.7, 4.9],
    forfeitRange: [800, 1500]
  }, {
    level: '特别严重',
    lengthRange: [28],
    widthRange: [3.5],
    heightRange: [4.7],
    containerHeightRange: [4.9],
    forfeitRange: [1500, 30000]
  }];

  //获取特别严重（长宽高）的斜率
  function _getGravelyK(type){
    if (type == "length") {
      return 700
    } else if (type == "width") {
      return 5000
    } else if (type == "height") {
      return 4000
    } else if (type == "containerHeight") {
      return 4000
    }
  }

  function _getMaxLegalValue(type, axles) {
    if (type == "weight") {
      var maxWeight = [20, 30, 40, 50, 55]; //依次对应2,3,4,5,6轴数的最大吨数
      if (axles < 2 || axles > 7) {
        return console.error("轴数超出范围");
      }
      return maxWeight[axles - 2];
    } else if (type == "length") {
      return 18
    } else if (type == "width") {
      return 2.5
    } else if (type == "height") {
      return 4
    } else if (type == "containerHeight") {
      return 4.2
    }
  }

  /*
   把超重转为Weight等

   */
  function _formatType(type) {
    if (type == "weight" || type == "length" || type == "width"
      || type == "height" || type == "containerHeight") {
      return type;
    }
    if (type == "超重") {
      return "weight"
    } else if (type == "超长") {
      return "length"
    } else if (type == "超宽") {
      return "width"
    } else if (type == "超高") {
      return "height"
    } else if (type == "集装箱超高") {
      return "containerHeight"
    } else {
      throw "超限类型输入有误！";
    }
  }

  /*
   1、生成线性方程
   2、带入 x ，求出 y(y=罚金)
   */
  function _linearEquation(xRange, yRange, xValue) {
    var k, b, yValue;
    k = (yRange[1] - yRange[0]) / (xRange[1] - xRange[0]);
    b = yRange[0] - k * xRange[0];
    yValue = k * xValue + b;
    return yValue;
  }

  // 确保都初始化过，实际有值再赋值
  function _initResult() {
    return {overValue: null, forfeit: null, forfeitRange: null};
  }

  /*
   依次获取：
   overValue
   level
   forfeit
   */
  function _calcOverValueForfeit(type, value) {
    var result = _initResult();
    var precision = 2;
    var maxLegalValue = _getMaxLegalValue(type)
    var overValue = value - maxLegalValue; // 下面主要都是用 value 去比较，这更符合纸质参考资料
    var rule, ruleValueRange;
    result.overValue = math.format(overValue, {notation: 'fixed', precision: precision});
    /*
     1）根据超量找到自己的范围
     2）计算罚金
     3）加入罚金范围
     */
    for (var i = 0; i < overValueRules.length; i++) {
      rule = overValueRules[i];
      result.level = rule.level;
      ruleValueRange = rule[type + "Range"];
      // 先处理首尾两端
      if (overValue <= 0 || (i == 0 && value > ruleValueRange[0] && value <= ruleValueRange[1])) {
        // 未超 或 轻微
        result.forfeit = 0;
        return result;
      }
      if (i == (overValueRules.length - 1) && value > ruleValueRange[0]) {
        var k = _getGravelyK(type)
        var b = 1500 - k * ruleValueRange[0];
        var forfeit = b + k * value;
        //var forfeit = 1500 + Math.floor([(value - ruleValueRange[0]) / maxLegalValue] / 0.05) * 1000;
        forfeit = forfeit > 30000 ? 30000 : forfeit;
        result.forfeit = forfeit;
        result.forfeitRange = [1500, 30000];
        return result;
      }
      if (value > ruleValueRange[0] && value <= ruleValueRange[1]) {
        /*
         用数组表示范围，是两个线性方程坐标
         再根据坐标求出罚金
         xRange: ruleValueRange
         yRange: rule.forfeitRange
         */
        result.forfeit = _linearEquation(ruleValueRange, rule.forfeitRange, value);
        result.forfeit = math.format(result.forfeit, {notation: 'fixed'});
        result.forfeitRange = rule.forfeitRange;
        return result;
      }
    }
  }

  /*
   依次获取：
   overWeight
   level
   forfeit
   */
  function _calcOverWeightForfeit(type, weight, axles) {
    var result = _initResult();
    if (!axles) {
      return result;
    }
    var precision = 3;
    var maxLegalValue = _getMaxLegalValue(type, axles)
    var overWeight = weight - maxLegalValue;
    result.overValue = math.format(overWeight, {notation: 'fixed', precision: precision});
    var rule, ruleAxlesMaxOverWeight;
    // 1）根据轴数和超量找到自己的范围
    // 2）计算罚金
    for (var i = 0; i < overWeightRules.length; i++) {
      rule = overWeightRules[i];
      result.level = rule.level;
      ruleAxlesMaxOverWeight = rule["maxOver" + axles];
      if (overWeight <= 0 || (i == 0 && overWeight <= ruleAxlesMaxOverWeight)) {
        // 未超重 或 轻微
        result.forfeit = 0;
        return result;
      }
      // 中间
      else if (overWeight <= ruleAxlesMaxOverWeight && overWeight > overWeightRules[i - 1]["maxOver" + axles]) {
        // 用数组表示范围，是两个线性方程坐标
        // xRange
        var overWeightRange = [overWeightRules[i - 1]["maxOver" + axles], ruleAxlesMaxOverWeight];
        // yRange
        var forfeitRange = [overWeightRules[i - 1].maxForfeit, rule.maxForfeit];
        // 根据坐标求出罚金
        result.forfeit = _linearEquation(overWeightRange, forfeitRange, overWeight);
        result.forfeit = math.format(result.forfeit, {notation: 'fixed'});
        result.forfeitRange = forfeitRange;
        return result;
      }
      else if (overWeight > overWeightRules[overWeightRules.length - 1]["maxOver" + axles]) {
        var forfeit = 11000 + Math.floor([(overWeight - overWeightRules[overWeightRules.length - 1]["maxOver" + axles]) / maxLegalValue] / 0.05) * 1000;
        forfeit = forfeit > 30000 ? 30000 : forfeit;
        result.forfeit = forfeit;
        result.forfeitRange = [11000, 30000];
        return result;
      }
    }
  }


});


