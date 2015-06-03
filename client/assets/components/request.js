angular.module("request", []).service('requestService', function ($http) {
  var env = "remote"; // local 或 remote ，其中 remote 是通过在 grunt connect 任务中配置 proxy 代理实现的
  var localPath = "/json/";
  // doGetRequest 暂时用来调用本地数据
  var _doGetRequest = function (url) {
    return $http.get(url)
  }
  var _doPostRequest = function (url, data) {
    // 现在的后端接口一律都是 post
    if (!data) {
      data = {}
    }
    /*else{
     data = JSON.stringify(data)
     }*/
    //console.log( data);
    return $http.post(url, data);
  }
  var _parseGetRequestParams = function (params) {
    var _path = '';
    if (!angular.isObject(params)) {
      console.error("setGetRequestParams: params should be an object type !")
      return;
    }
    for (var name in params) {
      if (params.hasOwnProperty(name)) {
        if (_path == '') {
          _path = "?" + name + "=" + params[name];
        } else {
          _path += "&" + name + "=" + params[name];
        }
      }
    }
    return _path;
  }
  /*--------------------------
   $ 目录
   --------------------------*/
  /*
   登录
   通用
   overrun
   overrun-leader
   overrun-admin
   */

  /*--------------------------
   $ 登录
   --------------------------*/
  // 未用，因为保持 index.html 的简短
  this.isSignIn = function () {
    return _doPostRequest('/api/logins/isLogin.do');
  }

  /*--------------------------
   $ 通用
   --------------------------*/
  this.getNewId = function () {
    if (env == 'local') {
      //return _doGetRequest(localPath + 'home.sidebar.json');
    } else {
      return _doPostRequest('/api/commons/generatorDataid.do');
    }
  }


  // 文件（附件）接口
  this.deleteFile = function (id) {
    if (env == 'local') {
      //return _doGetRequest(localPath + 'home.sidebar.json');
    } else {
      return _doPostRequest('/api/files/' + id + '/delete.do');
    }
  }
  this.queryImages = function (data) {
    if (env == 'local') {
      //return _doGetRequest(localPath + 'home.sidebar.json');
    } else {
      return _doPostRequest('/api/files/querythumbnail.do', data);
    }
  }
  this.queryContentImages = function (data) {
    if (env == 'local') {
      //return _doGetRequest(localPath + 'home.sidebar.json');
    } else {
      return _doPostRequest('/api/files/querycontent.do', data);
    }
  }
  this.homeSidebarItems = function () {
    // 目前没有 remote 版本，所以固定用 localPath，而且是 get 请求
    return _doGetRequest(localPath + 'home.sidebar.json');
  }
  this.myappBusiItems = function () {
    return _doGetRequest(localPath + 'myapp.busi.item.json');
  }
  this.myappSaItems = function () {
    return _doGetRequest(localPath + 'myapp.sa.item.json');
  }
  /*--------------------------
   $ overrun
   --------------------------*/
  this.overrunSidebarItems = function () {
    return _doGetRequest(localPath + 'overrun.menu.json');
  }
  /*现场超限待处理接口*/
  this.overrunTodoItems = function (data) {
    if (env == 'local') {
      return _doGetRequest(localPath + 'overrun.todo.item.json');
    } else {
      return _doPostRequest('/api/cxcfs/' + data.currentPage + '/' + data.pageSize + '/queryPage.do',
        {aj_jazt: data.aj_jazt});
    }
  }
  this.overrunTodoItemDetail = function (data) {
    if (env == 'local') {
      return _doGetRequest(localPath + 'overrun.itemDetail.json');
    } else {
      return _doPostRequest('/api/cxcfs/' + data.aj_id + '/query.do');
    }
  }
  this.overrunTodoItemSave = function (data) {
    return _doPostRequest('/api/cxcfs/insert.do', data);
  }
  this.overrunTodoItemUpdate = function (data) {
    return _doPostRequest('/api/cxcfs/update.do', data);
  }
  this.overrunTodoItemDone = function (data) {
    return _doPostRequest('/api/cxcfs/jiean.do', data);
  }
  this.overrunItemsDelete = function (data) {
    return _doPostRequest('/api/cxcfs/delete.do', data);
  }
  this.overrunItemsPrint = function (data) {
    return _doPostRequest('/api/cxcfs/' + data.itemId.toString() + '/' + data.part + 'printPdf.do');
  }
  /* 
   现场超限已完结接口
   */
  this.overrunDoneItems = function (data) {
    if (env == 'local') {
      return _doGetRequest(localPath + 'overrun.done.item.json');
    } else {
      return _doPostRequest('/api/cxcfs/' + data.currentPage + '/' + data.pageSize + '/queryPage.do',
        {aj_jazt: data.aj_jazt});
    }

  }
  this.overrunDoneItemDetail = function (data) {
    if (env == 'local') {
      return _doGetRequest(localPath + 'overrun.itemDetail.json');
    } else {
      return _doPostRequest('/api/cxcfs/' + data.aj_id + '/query.do');
      // 适应 get 请求，可以局部微调
      //return doPostRequest(remotePath + '/app/xccfs/query.do' + _parseGetRequestParams(data));
    }
  }
  // 已完结的案卷用在详情和全屏
  this.overrunDoneDoc = function (data) {
    return _doPostRequest('/api/cxcfs/' + data.aj_id + '/all/-1/printPdf.do');
  }
  /*--------------------------
   $ overrun-leader
   --------------------------*/
  this.overrunLeaderSidebarItems = function () {
    return _doGetRequest(localPath + 'overrun-leader.menu.json');
  }
  this.overrunLeaderTodoItems = function (data) {
    // todo：临时
    return _doPostRequest('/api/cxcfs/' + data.currentPage + '/' + data.pageSize + '/queryPage.do');
  }

  /*--------------------------
   $ overrun-admin
   --------------------------*/
  this.overrunAdminSidebarItems = function () {
    return _doGetRequest(localPath + 'overrun-admin.menu.json');
  }
  // 单位管理
  this.overrunAdminDeptItems = function (data) {
    if (env == 'local') {
    } else {
      return _doPostRequest('/api/dws/' + data.currentPage + '/' + data.pageSize + '/queryPage.do');
    }
  }
  this.overrunAdminDeptItemSave = function (data) {
    if (env == 'local') {
    } else {
      return _doPostRequest('/api/dws/insert.do', data);
    }
  }
  this.overrunAdminDeptItemUpdate = function (data) {
    if (env == 'local') {
    } else {
      return _doPostRequest('/api/dws/update.do', data);
    }
  }
  this.overrunAdminDeptItemDetail = function (data) {
    if (env == 'local') {
    } else {
      return _doPostRequest('/api/dws/' + data.dwid + '/query.do', data);
    }
  }
  this.overrunAdminDeptItemsDelete = function (data) {
    return _doPostRequest('/api/dws/delete.do', data);
  }
  // 人员管理
  this.overrunAdminUserQuery = function (data) {
    if (env == 'local') {
    } else {
      return _doPostRequest('/api/wks/' + data.currentPage + '/' + data.pageSize + '/queryPage.do');
    }
  }
  this.overrunAdminUserInsert = function (data) {
    if (env == 'local') {
    } else {
      return _doPostRequest('/api/wks/insert.do', data);
    }
  }
  this.overrunAdminUserUpdate = function (data) {
    if (env == 'local') {
    } else {
      return _doPostRequest('/api/wks/update.do', data);
    }
  }
  this.overrunAdminUserDetail = function (data) {
    if (env == 'local') {
    } else {
      return _doPostRequest('/api/wks/' + data.wkno + '/query.do');
    }
  }

  // 以下待整理
  this.userDetail = function (userno) {
    return _doGetRequest('userDetail.json?userno=' + userno);
  }
  this.userList = function () {
    return _doGetRequest('userList.json');
  }
  this.appRoleList = function () {
    return _doGetRequest('appRoleList.json');
  }
  this.userRoleList = function (userno) {
    return _doGetRequest('userRoleList.json?userno=' + userno);
  }
  this.saveUser = function (url, data) {
    return _doPostRequest(url, data);
  }
  this.deleteUsers = function (url, data) {
    return _doPostRequest(url, data);
  }
  this.privilegeMenuList = function () {
    return _doGetRequest('privilegeMenu.json');
  }
  this.faWenMenuList = function () {
    return _doGetRequest('faWen.menu.json');
  }
  this.roleDetail = function () {

  }
  this.deptList = function () {
    return _doGetRequest('deptList.json');
  }
  this.menuList = function () {
    return _doGetRequest('voteMenuList.json');
  }
  this.faWenList = function () {
    return _doGetRequest('faWen.niGao.json');
  }

})

