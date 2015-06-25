/*
  依赖 input[name] ，但是 name 不能重复
*/

angular.module('validation.rule', ['validation'])
  .config(['$validationProvider',
    function ($validationProvider) {
      var expression = {
        required: function (value) {
          if (value === undefined || value === "" || value === null  ) {
            return false;
          }
          if(value == 0){
            return true;
          }
          return true;
        },
        alphabet:/^[A-Za-z0-9_]{3,12}$/,
        url: /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/,
        email: /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/,
        isNumber: /(^\d*\.?\d*[0-9]+\d*$)|(^[0-9]+\d*\.\d*$)/,
        // 示例：numberEq=0
        numberEq: function (value, scope, element, attrs, param) {
          return parseInt(value, 10) === parseInt(param, 10);
        },
        minlength: function (value, scope, element, attrs, param) {
          return value.length >= param;
        },
        maxlength: function (value, scope, element, attrs, param) {
          return value.length <= param;
        },
        length: function (value, scope, element, attrs, param) {
          return value.length == param;
        },
        date: function (value, scope, element, attrs, param) {
          //console.log('value', value);
          //console.log(moment(value, 'YYYY-MM-DD HH:mm', true).isValid());
          return moment(value, 'YYYY-MM-DD HH:mm', true).isValid();
        }
      };
      /*
       success 属性可选
       在属性中声明自定义消息 isNumber-error-message
       */
      var defaultMsg = {
        required: {
          error: '必填'
        },
        alphabet:{
          error: '只允许字母、数字和下划线，并至少输入三个字符'
        },
        url: {
          error: 'This should be Url'
        },
        email: {
          error: 'This should be Email'
        },
        isNumber: {
          error: '请填正数'
        },
        // fixme：自定义验证无效
        numberEq: {
          error: '还处于超限状态无法结案'
        },
        minlength: {
          error: '长度错误'
        },
        maxlength: {
          error: '长度错误'
        },
        length: {
          error: '长度错误'
        },
        date: {
          error: '格式为<br> YYYY-MM-DD HH:mm'
        }
      };

      $validationProvider.setExpression(expression).setDefaultMsg(defaultMsg);


      /* 
       1）找 input 和 label 共有的父元素来设置 has-error ，使得 has-error form-control 生效
       2）对于 input 有 input-group 父元素会导致 error msg 位置走样，需要单独设置 messageId
       */
      angular.extend($validationProvider, {
        validCallback: function (element) {
          $(element).parent().removeClass('has-error');
        },
        invalidCallback: function (element) {
          $(element).parent().addClass('has-error');
        }
      });

    }
  ]);

