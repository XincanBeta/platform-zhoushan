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
   登录接口
   消息接口
   通用接口
   超限常用信息（字典）接口
   现场超限 业务员版
   现场超限 集体讨论版
   现场超限 管理员
   通讯录接口
   单位接口

   */

  /*--------------------------
   $ 登录接口
   --------------------------*/
  /*
   是否登陆
   */
  this.isSignIn = function () {
    return _doPostRequest('/api/logins/isLogin.do');
  }

  /*--------------------------
   $ 消息接口
   --------------------------*/
  this.getNotilist = function (data) {
    return _doPostRequest('/api/notis/' + data.currentPage + '/' + data.pageSize + '/queryPage.do');
  }
  this.notiInsert = function (data) {
    return _doPostRequest('/api/notis/insert.do', data);
  }
  this.notiUpdate = function (data) {
    return _doPostRequest('/api/notis/update.do', data);
  }

  /*--------------------------
   $ 通用接口
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
    return _doPostRequest('/api/files/' + data.fileid + '/content.do');
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
   $ 超限常用信息（字典）接口
   --------------------------*/
  this.getCommonOverrunDict = function () {
    return _doPostRequest('/api/dicts/queryCommonData.do', {appname: 'cxcf'});
  }
  this.overrunDictQueryPage = function (data) {
    return _doPostRequest('/api/dicts/' + data.currentPage + '/' + data.pageSize + '/queryPage.do');
  }
  this.overrunDictInsert = function (data) {
    return _doPostRequest('/api/dicts/insert.do', data);
  }
  this.overrunDictDelete = function (data) {
    return _doPostRequest('/api/dicts/delete.do', data);
  }


  // 车牌
  this.getCommonOverrunCpInfo = function (data) {
    return _doPostRequest('/api/dicts/queryCp.do', data);
  }

  /*--------------------------
   $ 现场超限 业务员版
   --------------------------*/
  this.overrunSidebarItems = function () {
    return _doGetRequest(localPath + 'overrun.menu.json');
  }
  /*待处理接口*/
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
   已完结接口
   */
  this.overrunDoneLastItem = function () {
    return _doPostRequest('/api/cxcfs/getLatestJa.do');
  }
  this.overrunDoneItems = function (data) {
    if (env == 'local') {
      return _doGetRequest(localPath + 'overrun.done.item.json');
    } else {
      return _doPostRequest('/api/cxcfs/' + data.currentPage + '/' + data.pageSize + '/queryPage.do',
        {aj_jazt: data.aj_jazt, searchText: data.searchText});
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
  this.overrunDoneDoc = function (data) {
    return _doPostRequest('/api/cxcfs/' + data.aj_id + '/all/-1/printPdf.do');
  }

  this.overrunDoneItemExport = function (data) {
    return _doPostRequest('/api/cxcfs/' + data.type + '/packZip.do', data.itemlist);
  }
  /*
   报送配置
   */
  this.overrunReportSettingQuery = function () {
    return _doPostRequest('/api/bspzs/queryByDwid.do');
  }
  this.overrunReportSettingUpdate = function (data) {
    return _doPostRequest('/api/bspzs/update.do', data);
  }
  this.overrunReportQueryPage = function (data) {
    return _doPostRequest('/api/cxcfs/' + data.exportDate + '/' + data.currentPage + '/' + data.pageSize + '/querySjbs.do');
  }


  /*--------------------------
   $ 现场超限 集体讨论版
   --------------------------*/
  this.overrunItemsDiscussInsert = function (data) {
    return _doPostRequest('/api/jttls/' + data.aj_id + '/insert.do', {jt_bh: data.jt_bh});
  }

  this.overrunGroupSidebarItems = function () {
    return _doGetRequest(localPath + 'overrun-group.menu.json');
  }

  this.overrunGroupTodoItems = function (data) {
    return _doPostRequest('/api/cxcfs/' + data.currentPage + '/' + data.pageSize + '/queryPageForJTZT.do');
  }

  this.overrunGroupItemUpdate = function (data) {
    return _doPostRequest('/api/jttls/update.do', data);
  }


  /*--------------------------
   $ 现场超限 管理员
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
  this.overrunAdminDeptQuery = function () {
    return _doPostRequest('/api/dws/query.do');
  }
  this.overrunAdminDeptItemSave = function (data) {
    return _doPostRequest('/api/dws/insert.do', data);
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

  this.overrunAdminWknoExist = function (data) {
    return _doPostRequest('/api/wks/' + data.wkno + '/isWkExist.do');
  }
  this.overrunAdminUserQuery = function (data) {
    return _doPostRequest('/api/wks/' + data.currentPage + '/' + data.pageSize + '/queryPage.do');
  }
  this.overrunAdminUserInsert = function (data) {
    return _doPostRequest('/api/wks/insert.do', data);
  }
  this.overrunAdminUserUpdate = function (data) {
    return _doPostRequest('/api/wks/update.do', data);
  }
  this.overrunAdminUserDetail = function (data) {
    return _doPostRequest('/api/wks/' + data.wkno + '/query.do');
  }
  // 案件管理
  this.overrunAdminItemUpdate = function (data) {
    return _doPostRequest('/api/cxcfs/updateForJiean.do', data);
  }

  /*--------------------------
   $ 通讯录接口
   --------------------------*/
  this.contactDeptList = function () {
    return _doPostRequest('/api/dws/queryByTier.do');
  }

  /*--------------------------
   $ 单位接口
   --------------------------*/
  // 根据权限
  /*
   1、没有data：返回当前登陆用户单位和下属单位
   2、有 data，data 应只包含 dwid ，返回该单位和其下属单位
   */
  this.getDeptlistWithPermission = function (data) {
    return _doPostRequest('/api/dws/query.do', data);
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

