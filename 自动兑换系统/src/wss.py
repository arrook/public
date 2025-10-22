# -*- encoding:utf-8 -*-
import os
import re
import time
import copy
import base64
import pandas
import execjs

import json
import asyncio
import aiohttp
import calendar
import functools  
import urllib.parse
from aiohttp_socks import ProxyConnector
from datetime import datetime, timedelta

  
def async_error_handler(func):  
    @functools.wraps(func)  
    async def wrapper(*args, **kwargs):  
        try:  
            return await func(*args, **kwargs)  
        except Exception as e:  
            print(f"==> {func.__name__} An erro: {e}")  
            return None  
    return wrapper 

os.chdir(os.path.dirname(__file__))

class User:
    def __init__(self, user_id, cookie = [], proxy_url = "", overtime = 2000, islog = True):
        self.user_id = user_id

        # self.params 禁止修改
        self.params = {
            "cookie": "",
            "href": "",
            "invoke": {
                "message": [],
                "command": [],
                "exchangeItemId": "",
                "pageNo": "",
                "startDate": "",
                "endDate": "",
                "pageNum": "",
            }
        }
        self.copy_params = copy.deepcopy(self.params)
        self.pageNo = 0
        self.year = datetime.now().year
        self.month = datetime.now().month
        self.day = datetime.now().day

        self.pageNum = 0
        given_date = datetime(self.year, self.month, self.day)  
        seven_days_ago = given_date - timedelta(days=7)  
        self.one_week_ago = seven_days_ago.strftime("%Y%m%d")
        self.supplierOrderNo = ""

        self.ws : aiohttp.ClientWebSocketResponse
        self.islog = islog
        self.overtime = overtime
        # 为防止网络等不可抗力因素造成影响,对对方服务器造成破坏,故设置最大次数,禁止修改
        self.max_try_exchange_time = 12
        
        self.copy_data = {
            # 账号 
            "sNickName": "",
            # 备注 
            "remark": "",
            # 验证码 
            "verify_id": "",
            # cookie 
            "cookie": [],
            # cookie是否有效
            "cookieStatus" : False,
            # 登陆状态 
            "loginStatus": False,
            # 是否绑定微信 
            "bindWxStatus": "",
            # 是否实名认证
            "realNameStatus": "",

            # 今日兑换总次数 
            "dailyCntLimit": "",
            # 今日兑换剩余次数 
            "dailyCntLeft": "",
            # 今日已兑换次数
            "dailyCntProcessed": "",
            # 今日可兑换总金额 
            "dailyAmountLimit": "",
            # 今日剩余兑换金额 
            "dailyAmountLeft": "",
            # 今日已兑换金额
            "dailyAmountProcessed": "",

            # 记录过的所有金额数
            "allAmount": "",

            # 所有兑换项目[列表] 
            "exchangeItemList": [],

            # 消费共计
            "total": 0,
            # 一周内的消费所有数据
            "payAmountAll": "",
            # 一周内消费次数
            "payAmountAllTime": "",

            # 剩余总金额 
            "userBalance": "",
            # 可接受的最低兑换限度
            # 最低三元
            "lowest": "10",
            # 刷新时间 
            "refreshTime": "",
            # 重定向URL 
            "td": "",

            # 反馈
            "echo": []
        }
        self.data = copy.deepcopy(self.copy_data)
        self.data["cookie"] = cookie

        self.proxy_url = proxy_url
        self.headers = {"User-Agent": "Mozilla/5.0 (iPad; CPU OS 14_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 MicroMessenger/8.0.0(0x1800003a) NetType/WIFI Language/zh_CN Edg/122.0.0.0"} 
        # self.url = "wss://7ceffa38-ws.va.huya.com/?baseinfo=AwAAARdQOOIxFiAwYTg5NTgwOTJmMGEyNTY2NDQwMWU5Y2FlYWNhM2VjZiYYd2ViaDUmMC4wLjEmYWN0aXZpdHkmaW9zNgxIVVlBJlpIJjIwNTJGAFYJdW5kZWZpbmVkbHYAhgCWAKgM"
        self.url = "wss://7ceffa40-ws.va.huya.com/?baseinfo=AwAAARdQOOIxFiAwYTdkNWM3OWQzYzVkNTY2ZmEwMWMyNWJjMzViMGJmZiYYd2ViaDUmMC4wLjEmYWN0aXZpdHkmaW9zNgxIVVlBJlpIJjIwNTJGAFYJdW5kZWZpbmVkbHYAhgCWAKgM"
        self.tx_id = ""

        self.module = {
            "login": ["checkUserLogin", "checkHyProtocol", "checkUserStatus",],
            "getUserProfile": ["getUserProfile",],
            "ex_change_List": ["getExchangeInfo", "getExchangeItemList",],
            "ex_change": ["userExchangeItem",],
            "redirection": ["queryTransferPageRebateV2", "addUserOrderTraceV2",],
            "history": ["queryJournalList",],
            "consumption": ["queryUserOrdersV3"],
            "end":["end",]
        }

    def init_self(self):
        temp = copy.deepcopy(self.copy_data)
        for key, val in temp.items():
            if key in self.data:continue
            self.data[key] = val

    def init_data(self):
        self.data["payAmountAll"] = copy.deepcopy(self.copy_data["payAmountAll"])
        self.data["payAmountAllTime"] = copy.deepcopy(self.copy_data["payAmountAllTime"])

    def json_cookie_format(self, cookies):
        cookies_with_details = []  
        for cookie in cookies:
            cookie_dict = {  
                'domain': cookie.get("domain", ""),
                'hostOnly': cookie.get("hostOnly", ""),
                'httpOnly': False,  
                'name': cookie.get("name", ""),  
                'path': cookie.get("path", ""),  
                'sameSite': "unspecified",  
                'secure': cookie.get("secure", ""),  
                'session': cookie.get("session", ""),  
                'storeId': 0,
                'value': cookie.get("value", "")
            } 
            cookies_with_details.append(cookie_dict)  
        return cookies_with_details

    def update_self(self, data: dict):
        # 导入函数
        if not data: return 
        for key, val in data.items():
            try:
                if key not in self.data: continue
                self.data[key] = val
                if key not in ["verify_id"]: continue
                self.data["cookie"] = eval(val)
            except Exception as error:
                self.update_echo_status(f"{key}:...传入的数据格式错误")

    def update_login_status(self, loginStatus: bool):
        self.data["loginStatus"] = bool(loginStatus)

    def get_login_status(self):
        return bool(self.data["loginStatus"])
     
    def get_bindWxStatus_status(self):
        return bool(self.data["bindWxStatus"])

    def get_realNameStatus_status(self):
        return bool(str(self.data["realNameStatus"]) == "4")

    def update_echo_status(self, echo=None, ret=False):
        self.data["echo"].append(echo)
        if self.islog:
            print(f"==> {self.user_id} {echo}",end="\n\n")
            if ret: 
                self.update_login_status(False)
                self.data["echo"].append(f"关闭 {time.ctime()}")
                temp = copy.deepcopy(self.data)
                temp["cookie"] = True
                temp["exchangeItemList"] = True
                print(f"==> {self.user_id} 关闭 {time.ctime()}",end="\n\n")
                print(f"==> {self.user_id}",json.dumps(temp, ensure_ascii=False),end="\n\n")

    def get_month_boundaries(self): 
        return [datetime(self.year, self.month, 1).strftime('%Y%m%d%H%M%S'), datetime(self.year, self.month, calendar.monthrange(self.year, self.month)[1], 23, 59, 59).strftime('%Y%m%d%H%M%S')]

    def get_pageNo(self):
        self.pageNo += 1
        self.update_echo_status(f"历史记录即将拉取{self.year}.{self.month}:{self.pageNo}")
        if not int(self.data["total"]) or self.pageNo == (-(-int(self.data["total"])//10)):
            self.update_echo_status(f"时间段{self.year}.{self.month}-拉取完毕")
            self.pageNo = 1
            self.month -= 1
            if not self.month:
                self.month = 12
                self.year -= 1
            self.update_echo_status(f"即将拉取{self.year}.{self.month}:{self.pageNo}")
        return self.pageNo

    def get_pageNum(self):
        self.pageNum += 1
        self.update_echo_status(f"即将拉取消费记录 第{self.pageNum}页")
        if self.supplierOrderNo:
            self.pageNum = 0
            self.update_echo_status(f"消费记录时间超出{self.one_week_ago}")
        if self.pageNum >= (-(-int(self.data["total"])//10))+1:
            self.pageNum = 0
            self.update_echo_status(f"已拉取所有消费记录")
        return self.pageNum

    def cleanse(self, ydata):
        data = json.loads(ydata)

        self.data["sNickName"] = data.get("tUserProfile",{}).get("tUserBase",{}).get("sNickName",{}) or self.data["sNickName"]
        self.data["loginStatus"] = data.get("loginStatus",{}) or self.data["loginStatus"]
        if data.get("loginStatus",{}): 
            self.data["cookieStatus"] = True
            self.update_echo_status("账号已登录")
        
        self.data["bindWxStatus"] = data.get("bindWxStatus",{}) or self.data["bindWxStatus"]
        if data.get("bindWxStatus",{}): self.update_echo_status("微信已绑定")
        
        self.data["realNameStatus"] = data.get("realNameStatus",{}) or self.data["realNameStatus"]
        if data.get("realNameStatus",{}): self.update_echo_status("身份证已绑定")
        
        self.data["dailyCntLimit"] = data.get("dailyCntLimit",{}) or self.data["dailyCntLimit"]
        self.data["dailyCntLeft"] = data.get("dailyCntLeft",{}) or self.data["dailyCntLeft"]
        if self.data["dailyCntLimit"] and self.data["dailyCntLeft"]: 
            self.data["dailyCntProcessed"] = str(int(self.data["dailyCntLimit"]) - int(self.data["dailyCntLeft"]))

        self.data["dailyAmountLimit"] = data.get("dailyAmountLimit",{}) or self.data["dailyAmountLimit"]
        self.data["dailyAmountLeft"] = data.get("dailyAmountLeft",{}) or self.data["dailyAmountLeft"]
        if self.data["dailyAmountLimit"] and self.data["dailyAmountLeft"]: 
            self.data["dailyAmountProcessed"] = str((int(self.data["dailyAmountLimit"]) - int(self.data["dailyAmountLeft"]))/1000)
        
        self.data["exchangeItemList"] = data.get("exchangeItemList",{}).get("value",{}) or self.data["exchangeItemList"]
        
        self.data["total"] = data.get("total",{}) or self.data["total"]
        if data.get("orderList",{}).get("value",{}):
            if not self.data.get("payAmountAll",{}): self.data["payAmountAll"] = 0
            if not self.data.get("payAmountAllTime",{}): self.data["payAmountAllTime"] = 0
            self.data["payAmountAll"] += sum([int(i.get("orderInfo",{}).get("payAmount",0)) for i in data.get("orderList",{}).get("value",{}) if re.search("-(\d+)-",i.get("orderInfo",{}).get("supplierOrderNo",{})).group(1) >= self.one_week_ago])/10
            self.data["payAmountAllTime"] += len([int(i.get("orderInfo",{}).get("payAmount",0)) for i in data.get("orderList",{}).get("value",{}) if re.search("-(\d+)-",i.get("orderInfo",{}).get("supplierOrderNo",{})).group(1) >= self.one_week_ago])
            self.supplierOrderNo = not len([int(i.get("orderInfo",{}).get("payAmount",0)) for i in data.get("orderList",{}).get("value",{}) if re.search("-(\d+)-",i.get("orderInfo",{}).get("supplierOrderNo",{})).group(1) >= self.one_week_ago])
            self.update_echo_status("\n"+"\n".join([
                f'{temp}: {i.get("orderInfo",{}).get("supplierOrderNo","")}  {i.get("orderInfo",{}).get("payAmount",0)}'
                for i in data.get("orderList",{}).get("value",{}) if (temp:=re.search("-(\d+)-",i.get("orderInfo",{}).get("supplierOrderNo",{})).group(1)) >= self.one_week_ago
            ]))
        
        if data.get("userBalance",{}):
            self.data["userBalance"] = str(int(data.get("userBalance",{}))//1000) or self.data["userBalance"]
        self.data["refreshTime"] = data.get("refreshTime",{}) or self.data["refreshTime"]
        if data.get("td",{}):
            for i in self.data.get("cookie",{}):
                if i.get("name", {}) == "udb_uid": 
                    self.tx_id = i.get("value") 
                    break
            if not self.tx_id: return
            self.data["td"] = f'https://pagedoo.pay.qq.com/shop/ct1693555519_TSQRLLHX/mobile/index.html?tx_chan_type=hy&pf=huya&tx_buyer_id={self.tx_id}&tx_trace_key={data.get("td",{})}_103&sourceId=1013&hideloading=1&hideShareButton=1&_tab=tab_page_802043' or self.data["td"]

class Wss:

    def __init__(self, islog=True):
        self.islog = islog
        with open("./wss.js","r",encoding="utf-8") as f:
            js_file = f.read()
        self.ctx = execjs.compile(js_file)
        self.file_path = "../data/"
        self.file_name = "data.xlsx"
        if not os.path.exists(self.file_path): os.makedirs(self.file_path)
        self.file = os.path.join(self.file_path,self.file_name)

    def log(self, user: User, *args):
        if self.islog:
            print(f"==> {user.user_id}")
            for i in args: print(i)
            else: print()

    async def invoke_js(self, user: User):
        user.copy_params["cookie"] = "; ".join([f'{i.get("name")}={i.get("value")}' for i in user.data["cookie"]])
        js_result = self.ctx.call("js_wss", json.dumps(user.copy_params, ensure_ascii=False))
        return [
            [base64.b64decode(i) for i in js_result[0]],
            [urllib.parse.unquote(base64.b64decode(i)) for i in js_result[1]],
        ]

    async def connect(self, user: User):
        user.copy_params = copy.deepcopy(user.params)
        user.copy_params["invoke"]["command"] = copy.deepcopy([*user.module["login"], *user.module["end"],])
        if not user.data["echo"]: user.data["echo"].append(f"{int(time.time())}")
        user.data["echo"][0] = f"{int(time.time())}"
        user.update_echo_status(f"即将启动 {time.ctime()}")
        js_result = await self.invoke_js(user)
        await user.ws.send_bytes(js_result[0][0])
        await user.ws.send_bytes(js_result[0][1])
        user.init_data()
        if await self.handle(user) == False: 
            user.update_echo_status(f"阶段超时", True)
            return False

    async def handle(self, user: User):
        async for msg in user.ws:
            if int(user.data["echo"][0]) + int(user.overtime) < int(time.time()):
                user.update_echo_status("超时", True)
                return False
            if msg.type == aiohttp.WSMsgType.ERROR: 
                user.update_echo_status(f"error {user.ws.exception()}")
            if len(msg.data) == 15: continue
            if len(msg.data) == 12: 
                user.copy_params = copy.deepcopy(user.params)
                return True
            
            user.copy_params["invoke"]["message"].append(base64.b64encode(msg.data).decode())
            js_result = await self.invoke_js(user)
            if js_result[1]: user.cleanse(js_result[1][-1])
            if user.copy_params["invoke"]["command"]: await user.ws.send_bytes(js_result[0][-1])

    async def trigger(self, user: User):
        js_result = await self.invoke_js(user)
        if len(js_result[0]) < 2: user.update_echo_status("重复登陆")
        await user.ws.send_bytes(js_result[0][-1])
        if await self.handle(user) == False: 
            user.update_echo_status(f"阶段超时", True)
            return False

    @async_error_handler
    async def exchange(self, user: User):
        if not user.data.get("cookie",{}): 
            user.update_echo_status(f"无cookie", True)
            return 
        proxy_connector = None
        if user.proxy_url:
            proxy_connector = ProxyConnector.from_url(user.proxy_url or "")       
        if user.get_login_status(): 
            user.update_echo_status(f"正在执行中,请勿多次请求", True)
            return 
        async with aiohttp.ClientSession(connector=proxy_connector) as session:
            async with session.ws_connect(url=user.url, headers=user.headers) as ws:
                user.ws = ws
                if await self.connect(user) == False: 
                    user.update_echo_status(f"连接超时", True)
                    return 
                if not user.get_login_status(): 
                    user.data["cookieStatus"] = False
                    user.update_echo_status(f"cookie失效", True)
                    return 
                if not user.get_bindWxStatus_status(): 
                    user.update_echo_status(f"微信未绑定", True)
                    return 
                if not user.get_realNameStatus_status(): 
                    user.update_echo_status(f"未实名认证", True)
                    return 

                lowest = float(user.data["lowest"] or 300)
                amount_mapping = {1: 0.3, 3: 1, 5: 3, 7: 10, 9: 30, 11: 100, 13: 300}
                accept = min(key for key, value in amount_mapping.items() if value >= lowest)
                for i in range(user.max_try_exchange_time):
                    message = b'\x00\x15\x1d\x00\x0c,6\x00L\\f\x00'
                    user.copy_params = copy.deepcopy(user.params)
                    user.copy_params["invoke"]["command"] = copy.deepcopy([*user.module["ex_change_List"], *user.module["end"],])
                    user.copy_params["invoke"]["message"] = [base64.b64encode(message).decode()]
                    if await self.trigger(user) == False: 
                        user.update_echo_status(f"触发超时", True)
                        return 
                    if not user.data["dailyCntLeft"]: 
                        user.update_echo_status(f"兑换次数耗尽", True)
                        return 
                    if user.data["dailyCntProcessed"] == '300000': 
                        user.update_echo_status(f"兑换金额耗尽", True)
                        return 

                    exchangeItemId = None
                    red_packets = user.data["exchangeItemList"]
                    red_packets.sort(key=lambda x: x['rebateAmount'], reverse=True)     
                    for red_pack in red_packets:
                        if red_pack['exchangeItemId'] < accept: 
                            user.update_echo_status(f"可接受范围内-{lowest}-无兑换金额", True)
                            return                            
                        if red_pack["currentStock"] <= 0: continue
                        exchangeItemId = red_pack['exchangeItemId']
                        user.update_echo_status(f"预测兑换金额-{amount_mapping[exchangeItemId]}-元")
                        break
                    else:
                        user.update_echo_status(f"可接受范围内-{lowest}-无兑换金额", True)
                        return 
                    message = b'\x00\x15\x1d\x00\x0c,6\x00L\\f\x00'
                    user.copy_params = copy.deepcopy(user.params)
                    user.copy_params["invoke"]["command"] = copy.deepcopy([*user.module["ex_change"], *user.module["end"],])
                    user.copy_params["invoke"]["message"] = [base64.b64encode(message).decode()]
                    user.copy_params["invoke"]["exchangeItemId"] = exchangeItemId
                    if await self.trigger(user) == False: 
                        user.update_echo_status(f"触发超时", True)
                        return 
        user.update_echo_status(f"兑换操作退出", True)

    @async_error_handler
    async def refresh(self, user: User):
        if not user.data.get("cookie",{}): 
            user.update_echo_status(f"无cookie", True)
            return 
        proxy_connector = None
        if user.proxy_url:
            proxy_connector = ProxyConnector.from_url(user.proxy_url or "")
        if user.get_login_status(): 
            user.update_echo_status(f"正在执行中,请勿多次请求", True)
            return         
        async with aiohttp.ClientSession(connector=proxy_connector) as session:
            async with session.ws_connect(url=user.url, headers=user.headers) as ws:
                user.ws = ws
                if await self.connect(user) == False: 
                    user.update_echo_status(f"连接超时", True)
                    return 
                if not user.get_login_status(): 
                    user.data["cookieStatus"] = False
                    user.update_echo_status(f"cookie失效", True)
                    return 
                
                message = b'\x00\x15\x1d\x00\x0c,6\x00L\\f\x00'
                user.copy_params = copy.deepcopy(user.params)
                user.copy_params["invoke"]["command"] = copy.deepcopy([
                    *user.module["getUserProfile"], *user.module["ex_change_List"],
                    *user.module["redirection"], *user.module["history"],
                    *user.module["end"],
                ])
                user.copy_params["invoke"]["message"] = [base64.b64encode(message).decode()]
                if await self.trigger(user) == False: 
                    user.update_echo_status(f"触发超时", True)
                    return 
                
                message = b'\x00\x15\x1d\x00\x0c,6\x00L\\f\x00'
                user.copy_params = copy.deepcopy(user.params)
                user.copy_params["invoke"]["message"] = [base64.b64encode(message).decode()]
                user.copy_params["invoke"]["pageNum"] = user.get_pageNum()
                user.copy_params["invoke"]["command"] = copy.deepcopy([
                    *user.module["consumption"], *user.module["end"],
                ])
                if await self.trigger(user) == False: 
                    user.update_echo_status(f"触发超时", True)
                    return  
                
                for i in range(-(-int(user.data.get("total",0))//10) or user.max_try_exchange_time):
                    if not (pageNum:=user.get_pageNum()):
                        user.update_echo_status(f"消费订单操作退出", True)
                        return
        
                    message = b'\x00\x15\x1d\x00\x0c,6\x00L\\f\x00'
                    user.copy_params = copy.deepcopy(user.params)
                    user.copy_params["invoke"]["message"] = [base64.b64encode(message).decode()]
                    user.copy_params["invoke"]["pageNum"] = pageNum
                    user.copy_params["invoke"]["command"] = copy.deepcopy([
                        *user.module["consumption"], *user.module["end"],
                    ])
                    if await self.trigger(user) == False: 
                        user.update_echo_status(f"触发超时", True)
                        return  
        
        user.update_echo_status(f"刷新操作退出", True)

    @async_error_handler
    async def wheel(self, user: User):      
        if not user.data.get("cookie",{}): 
            user.update_echo_status(f"无cookie", True)
            return 
        proxy_connector = None
        if user.proxy_url:
            proxy_connector = ProxyConnector.from_url(user.proxy_url or "")    
        if user.get_login_status(): 
            user.update_echo_status(f"正在执行中,请勿多次请求", True)
            return   
        async with aiohttp.ClientSession(connector=proxy_connector) as session:
            async with session.ws_connect(url=user.url, headers=user.headers) as ws:
                user.ws = ws
                if await self.connect(user) == False: 
                    user.update_echo_status(f"连接超时", True)
                    return 
                if not user.get_login_status():
                    user.data["cookieStatus"] = False
                    user.update_echo_status(f"cookie失效", True)
                    return 

                message = b'\x00\x15\x1d\x00\x0c,6\x00L\\f\x00'
                user.copy_params = copy.deepcopy(user.params)
                user.copy_params["invoke"]["message"] = [base64.b64encode(message).decode()]
                user.copy_params["invoke"]["pageNo"] = 0
                [startDate, endDate] = user.get_month_boundaries()
                user.copy_params["invoke"]["startDate"] = startDate
                user.copy_params["invoke"]["endDate"] = endDate
                user.copy_params["invoke"]["command"] = copy.deepcopy([
                    *user.module["history"], *user.module["end"],
                ])
                if await self.trigger(user) == False: 
                    user.update_echo_status(f"触发超时", True)
                    return  

                message = b'\x00\x15\x1d\x00\x0c,6\x00L\\f\x00'
                user.copy_params = copy.deepcopy(user.params)
                user.copy_params["invoke"]["message"] = [base64.b64encode(message).decode()]
                user.copy_params["invoke"]["pageNo"] = user.get_pageNo()
                [startDate, endDate] = user.get_month_boundaries()
                user.copy_params["invoke"]["startDate"] = startDate
                user.copy_params["invoke"]["endDate"] = endDate
                user.copy_params["invoke"]["command"] = copy.deepcopy([
                    *user.module["history"], *user.module["end"],
                ])
                if await self.trigger(user) == False: 
                    user.update_echo_status(f"触发超时", True)
                    return 
        user.update_echo_status("历史操作退出", True)

    @async_error_handler
    async def consumption(self, user: User):      
        if not user.data.get("cookie",{}): 
            user.update_echo_status(f"无cookie", True)
            return 
        proxy_connector = None
        if user.proxy_url:
            proxy_connector = ProxyConnector.from_url(user.proxy_url or "")    
        if user.get_login_status(): 
            user.update_echo_status(f"正在执行中,请勿多次请求", True)
            return   
        async with aiohttp.ClientSession(connector=proxy_connector) as session:
            async with session.ws_connect(url=user.url, headers=user.headers) as ws:
                user.ws = ws
                if await self.connect(user) == False: 
                    user.update_echo_status(f"连接超时", True)
                    return 
                if not user.get_login_status():
                    user.data["cookieStatus"] = False
                    user.update_echo_status(f"cookie失效", True)
                    return 

                message = b'\x00\x15\x1d\x00\x0c,6\x00L\\f\x00'
                user.copy_params = copy.deepcopy(user.params)
                user.copy_params["invoke"]["message"] = [base64.b64encode(message).decode()]
                user.copy_params["invoke"]["pageNum"] = user.get_pageNum()
                user.copy_params["invoke"]["command"] = copy.deepcopy([
                    *user.module["consumption"], *user.module["end"],
                ])
                if await self.trigger(user) == False: 
                    user.update_echo_status(f"触发超时", True)
                    return  
                
                for i in range(-(-int(user.data.get("total",0))//10) or user.max_try_exchange_time):
                    if not (pageNum:=user.get_pageNum()):
                        user.update_echo_status(f"消费订单操作退出", True)
                        return
        
                    message = b'\x00\x15\x1d\x00\x0c,6\x00L\\f\x00'
                    user.copy_params = copy.deepcopy(user.params)
                    user.copy_params["invoke"]["message"] = [base64.b64encode(message).decode()]
                    user.copy_params["invoke"]["pageNum"] = pageNum
                    user.copy_params["invoke"]["command"] = copy.deepcopy([
                        *user.module["consumption"], *user.module["end"],
                    ])
                    if await self.trigger(user) == False: 
                        user.update_echo_status(f"触发超时", True)
                        return  
                
        user.update_echo_status("消费订单操作退出", True)

    def json_cookie_format(self, cookies):
        cookies_with_details = []  
        for cookie in cookies:
            cookie_dict = {  
                'domain': cookie.get("domain", ""),
                'hostOnly': cookie.get("hostOnly", ""),
                'httpOnly': False,  
                'name': cookie.get("name", ""),  
                'path': cookie.get("path", ""),  
                'sameSite': "unspecified",  
                'secure': cookie.get("secure", ""),  
                'session': cookie.get("session", ""),  
                'storeId': 0,
                'value': cookie.get("value", "")
            } 
            cookies_with_details.append(cookie_dict)  
        return cookies_with_details

    def impor(self, file_path=None):
        # 导入函数
        pd = pandas.read_excel(self.file)
        pd.fillna(0, inplace=True)
        data = pd.to_dict(orient="records")
        users = []
        for user in data:
            user["echo"] = []
            user["rows"] = []
            user["exchangeItemList"] = []
            user["cookie"] = self.json_cookie_format(json.loads(user["cookie"]))
            users.append(User(
                user_id=user.get("sNickName", "p"),
                cookie=user.get("cookie", [])
            ))
            users[-1].data = user
            users[-1].init_self()
        print(f"==> {self.file}中, 数据已读取 {len(users)}")
        return users

    def expor(self, users, file_path=None):
        data = []
        for user in users:
            temp = copy.deepcopy(user.data)
            temp["rows"] = json.dumps([])
            temp["echo"] = json.dumps([])
            temp["loginStatus"] = json.dumps(False)
            temp["exchangeItemList"] = json.dumps([])
            temp["cookie"] = json.dumps(temp.get("cookie",[]))
            data.append(temp)

        pd = pandas.DataFrame(data)
        pd.to_excel(self.file, index=False)
        print(f"==> 数据已写入 {self.file}")

    @async_error_handler
    async def test(self, user: User):
        # users = self.impor("./data.xlsx")
        # print("等待2秒")
        # await asyncio.sleep(2)
        # await manager.wheel(users[0])
        await manager.refresh(users[0])
        # manager.impor()
        # await manager.exchange(users[0])
        # await manager.consumption(users[10])

        # print("等待2秒")
        # await asyncio.sleep(2)
        # await manager.consumption(users[0])
        # for i in users:
            # await manager.exchange(i)
            # await manager.refresh(i)
            # await manager.wheel(i)

async def main():
    users.append(User(user_id="user1",cookie=[{'domain': 'mall.huya.com', 'hostOnly': False, 'httpOnly': False, 'name': 'udb_guiddata', 'path': '/', 'sameSite': 'unspecified', 'secure': False, 'session': False, 'storeId': 0, 'value': 'c2ddc2c4682d4a71bab6fc08b08f0acf'}, {'domain': 'mall.huya.com', 'hostOnly': False, 'httpOnly': False, 'name': 'udb_deviceid', 'path': '/', 'sameSite': 'unspecified', 'secure': False, 'session': False, 'storeId': 0, 'value': 'w_834461088677703680'}, {'domain': 'mall.huya.com', 'hostOnly': False, 'httpOnly': False, 'name': '__yasmid', 'path': '/', 'sameSite': 'unspecified', 'secure': False, 'session': False, 'storeId': 0, 'value': '0.20615770627367835'}, {'domain': 'mall.huya.com', 'hostOnly': False, 'httpOnly': False, 'name': '__yamid_tt1', 'path': '/', 'sameSite': 'unspecified', 'secure': False, 'session': False, 'storeId': 0, 'value': '0.20615770627367835'}, {'domain': 'mall.huya.com', 'hostOnly': False, 'httpOnly': False, 'name': '__yamid_new', 'path': '/', 'sameSite': 'unspecified', 'secure': False, 'session': False, 'storeId': 0, 'value': 'CAE01B77DFD000016F431090F4804910'}, {'domain': 'mall.huya.com', 'hostOnly': False, 'httpOnly': False, 'name': '_yasids', 'path': '/', 'sameSite': 'unspecified', 'secure': False, 'session': False, 'storeId': 0, 'value': '__rootsid%3DCAE01B77E2E00001F87413C7A34C1463'}, {'domain': 'mall.huya.com', 'hostOnly': False, 'httpOnly': False, 'name': 'sdid', 'path': '/', 'sameSite': 'unspecified', 'secure': False, 'session': False, 'storeId': 0, 'value': '0UnHUgv0_qmfD4KAKlwzhqbaXSJMgy5bGtXJKaJIyUKTLwgChyBpLk4IkizRUO8I8jTUYQ9svzR1ZS1_RBB_-itgr84esmNa3bIDrlmp2J9fWVkn9LtfFJw_Qo4kgKr8OZHDqNnuwg612sGyflFn1dkOhSrElo6XFO6wrpImJ5XY9iRzcFDr8rBu0ZRAuE6F5'}, {'domain': 'mall.huya.com', 'hostOnly': False, 'httpOnly': False, 'name': 'sdidtest', 'path': '/', 'sameSite': 'unspecified', 'secure': False, 'session': False, 'storeId': 0, 'value': '0UnHUgv0_qmfD4KAKlwzhqbaXSJMgy5bGtXJKaJIyUKTLwgChyBpLk4IkizRUO8I8jTUYQ9svzR1ZS1_RBB_-itgr84esmNa3bIDrlmp2J9fWVkn9LtfFJw_Qo4kgKr8OZHDqNnuwg612sGyflFn1dkOhSrElo6XFO6wrpImJ5XY9iRzcFDr8rBu0ZRAuE6F5'}, {'domain': 'mall.huya.com', 'hostOnly': False, 'httpOnly': False, 'name': 'rso', 'path': '/', 'sameSite': 'unspecified', 'secure': False, 'session': False, 'storeId': 0, 'value': 'hyyxgzh'}, {'domain': 'mall.huya.com', 'hostOnly': False, 'httpOnly': False, 'name': 'null_rep_cnt', 'path': '/', 'sameSite': 'unspecified', 'secure': False, 'session': False, 'storeId': 0, 'value': '6'}, {'domain': 'mall.huya.com', 'hostOnly': False, 'httpOnly': False, 'name': 'huyawap_rep_cnt', 'path': '/', 'sameSite': 'unspecified', 'secure': False, 'session': False, 'storeId': 0, 'value': '9'}, {'domain': 'mall.huya.com', 'hostOnly': False, 'httpOnly': False, 'name': 'sdidshorttest', 'path': '/', 'sameSite': 'unspecified', 'secure': False, 'session': False, 'storeId': 0, 'value': 'test'}, {'domain': 'mall.huya.com', 'hostOnly': False, 'httpOnly': False, 'name': 'webh5_playmall_rep_cnt', 'path': '/', 'sameSite': 'unspecified', 'secure': False, 'session': False, 'storeId': 0, 'value': '10'}, {'domain': '.huya.com', 'hostOnly': False, 'httpOnly': False, 'name': 'udb_biztoken', 'path': '/', 'sameSite': 'unspecified', 'secure': False, 'session': False, 'storeId': 0, 'value': 'AQC0xOX2F3HJcv_YEJBqX3XAxklj6l9LAm9NmSv4PNecFFV0yWYT3jycgN9-k76ADco48GXXfQAE6cTxuApqhVmxjW0smpPbWXIa3d577IejOrkCQP9DK5T7vYcZj-bCZAdxU90fAHErCDKLe-PwbsFBmBITywdtU1EC_Ubab3pmVlnY_LRGBLZY0yvl-jrljTU7LKXjD62VQ4wqSb6uWZm7Zcz9Rv9gKofNgNwjNllkZZFz05nHDprEJheyfiEjdyW4nVW0YMBKoKdayPKpVpLd7maTsjwcUhlX2JA3ZtmSP2FDy91K6gnhn9qvTgTwLnG0Z39pqf9WkQcGxpbzjl_7'}, {'domain': '.huya.com', 'hostOnly': False, 'httpOnly': False, 'name': 'udb_cred', 'path': '/', 'sameSite': 'unspecified', 'secure': True, 'session': False, 'storeId': 0, 'value': 'CjB5J1ZVSLnojA1TUQY1RLKCsntEkqgHgc8xqbCo9yijNYvx9GK3Hnb3-1JJtXSVL_boGBpw8JB3n40Ir3t5AIiSzMwKrwMQ3jry4dnh0muk7LKIm3q6DWA-9l2dY44IFrh30CGdsYOUm-va8DpKCZBK'}, {'domain': '.huya.com', 'hostOnly': False, 'httpOnly': False, 'name': 'udb_lgntype', 'path': '/', 'sameSite': 'unspecified', 'secure': False, 'session': False, 'storeId': 0, 'value': 'mobile'}, {'domain': '.huya.com', 'hostOnly': False, 'httpOnly': False, 'name': 'udb_origin', 'path': '/', 'sameSite': 'unspecified', 'secure': False, 'session': False, 'storeId': 0, 'value': '1'}, {'domain': '.huya.com', 'hostOnly': False, 'httpOnly': False, 'name': 'udb_other', 'path': '/', 'sameSite': 'unspecified', 'secure': False, 'session': True, 'storeId': 0, 'value': '%7B%22lt%22%3A%221724849104123%22%2C%22isRem%22%3A%220%22%7D'}, {'domain': '.huya.com', 'hostOnly': False, 'httpOnly': False, 'name': 'udb_passport', 'path': '/', 'sameSite': 'unspecified', 'secure': False, 'session': False, 'storeId': 0, 'value': 'hy_262773865'}, {'domain': '.huya.com', 'hostOnly': False, 'httpOnly': False, 'name': 'udb_status', 'path': '/', 'sameSite': 'unspecified', 'secure': False, 'session': False, 'storeId': 0, 'value': '1'}, {'domain': '.huya.com', 'hostOnly': False, 'httpOnly': False, 'name': 'udb_uid', 'path': '/', 'sameSite': 'unspecified', 'secure': False, 'session': False, 'storeId': 0, 'value': '1199641780785'}, {'domain': '.huya.com', 'hostOnly': False, 'httpOnly': False, 'name': 'udb_version', 'path': '/', 'sameSite': 'unspecified', 'secure': False, 'session': False, 'storeId': 0, 'value': '1.0'}, {'domain': '.huya.com', 'hostOnly': False, 'httpOnly': False, 'name': 'username', 'path': '/', 'sameSite': 'unspecified', 'secure': False, 'session': False, 'storeId': 0, 'value': 'hy_262773865'}, {'domain': '.huya.com', 'hostOnly': False, 'httpOnly': False, 'name': 'yyuid', 'path': '/', 'sameSite': 'unspecified', 'secure': False, 'session': False, 'storeId': 0, 'value': '1199641780785'}]))
    
    users.append([])
    tasks = [
        manager.test(users[0]),
    ]
    await asyncio.gather(*tasks)

    print(users[0])


if __name__ == "__main__":
    manager = Wss()
    users = []
    asyncio.run(main())
