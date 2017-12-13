import Mock from 'mockjs';


/*const navData= Mock.mock('http://g.cn',[

  {"id":1,"title":"系统管理","secondTitle":[{"id":1,"title2":"企业管理"},



    {"id":2,"title2":"用户管理"},
    {"id":3,"title2":"权限管理"}



  ]},





  {"id":2,"title":"企业管理","secondTitle":[{"id":1,"title2":"用户管理","thirdTitle":[{"id":1,"title3":"添加用户"}
  ]},



    {"id":2,"title2":"角色管理"},
    {"id":3,"title2":"店铺管理","thirdTitle":[{"id":1,"title3":"添加店铺"}
    ]}



  ]}





]);*/
/*生成user数据*/
var users=[];
for(var i=0;i<100;i++){
    users.push({
      "id":i+1,
      "mobile":Mock.Random.integer(18516511689,18599999999),
      "nickName":Mock.Random.cname(),
      "password":Mock.Random.integer(100000,999999),
      "sex":Mock.Random.boolean(),
      "province":Mock.Random.province(),
      "city":Mock.Random.city(),
      "age":Mock.Random.integer(18,50),
      "role":Mock.Random.integer(0,10)
    })
}
const userData=Mock.mock('http://user.cn',users);
//生成店铺信息
var shops=[];
for(var i=0;i<10;i++){
  shops.push({
    "id":i+1,
    "company_id":Mock.Random.integer(100000,999999),
     "name":Mock.Random.cname()+"觉客线下体验店",
    "keeper":Mock.Random.cname(),
    "address":Mock.Random.region()+Mock.Random.province()+Mock.Random.city()+Mock.Random.county()
  })
}
const shopData=Mock.mock('http://shop.cn',shops);






/*生成sysco数据*/

var syscoList=[];

for(var i=0;i<30;i++){
    syscoList.push({
      "id":i+1,
      "name":Mock.Random.integer(18516511689,18599999999),
      "intro":Mock.Random.county(true),
      "createTime":Mock.Random.integer(20100101,20171026),
      "updateTime":Mock.Random.integer(20100101,20171026)
    })
}
const syscoListDate=Mock.mock('http://sysco.cn',syscoList);





/*生成sysAuthority数据*/


var sysAuthority=[];

for(var i=0;i<30;i++){
    sysAuthority.push({
      "id":i+1,
      "name":Mock.Random.integer(18516511689,18599999999),
      "ugid":Mock.Random.integer(1,6),
      "label":Mock.Random.integer(1,6),
      "is_system":Mock.Random.integer(0,1),
      "group_label":Mock.Random.integer(1,3),
      "intro":Mock.Random.county(true),
      "create_time":Mock.Random.integer(20100101,20171026),
      "update_time":Mock.Random.integer(20100101,20171026)
    })
}
const sysAuthorityDate=Mock.mock('http://sysAuthority.cn',sysAuthority);



export {navData,userData,syscoListDate,sysAuthorityDate,shopData}


