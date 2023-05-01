/*
 * @Author: zyy 1741540959@qq.com
 * @Date: 2022-10-22 14:23:21
 * @LastEditors: zyy
 * @LastEditTime: 2022-10-22 14:34:01
 * @Description: file content
 */
import { v4 as uuidv4 } from "uuid";
//要生成一个随机字符串，且每次执行不能发生变化，游客身份持久存储
export default () => {
  let uuid_token = localStorage.getItem('UUIDTOKEN');
  if(!uuid_token){
    uuid_token = uuidv4();
    localStorage.setItem('UUIDTOKEN',uuid_token);
  }
  return uuid_token;
}
