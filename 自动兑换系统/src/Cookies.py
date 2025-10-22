import requests
import execjs
import time
import os
import json
import asyncio
from wss import Wss,User

os.chdir(os.path.dirname(__file__))




class fCookies:
    def __init__(self):
        self.session = requests.session()
        js_file = """
        function guid(e) {
            var d = new Date();
            if (e && e == 1) {
                return (Date.UTC(d.getFullYear(), d.getMonth(), d.getDate(), d.getHours(), d.getMinutes(), d.getSeconds(), d.getMilliseconds()) - Date.UTC(d.getFullYear(), d.getMonth(), d.getDate(), 0, 0, 0, 0))
            } else {
                if (e && e == 2) {
                    return Date.UTC(d.getFullYear(), d.getMonth(), d.getDate(), d.getHours(), d.getMinutes(), d.getSeconds(), d.getMilliseconds())
                } else {
                    return "xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx".replace(/[xy]/g, function (h) {
                        var g = Math.random() * 16 | 0
                            , f = (h == "x") ? g : (g & 3 | 8);
                        return f.toString(16)
                    })
                }
            }
        }
        function returnBase(a, b) {
            var c = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
            if (b > a)
                var d = c[a];
            else {
                var e = "" + Math.floor(a / b)
                    , f = a - e * b;
                if (e >= b)
                    var d = returnBase(e, b) + c[f];
                else
                    var d = c[e] + c[f]
            }
            return d
        }
        function generateBits(a, b, c) {
            var d = returnBase(a, 16)
                , e = new Array
                , f = ""
                , g = 0;
            for (g = 0; g < d.length; g++)
                e.push(d.substring(g, g + 1));
            for (g = Math.floor(b / 4); g <= Math.floor(c / 4); g++)
                f += e[g] && "" != e[g] ? e[g] : "0";
            return f
        }
        function rand(a) {
            return Math.floor(Math.random() * a)
        }
        function generate32() {
            var a = new Date(1582, 10, 15, 0, 0, 0, 0)
                , b = new Date
                , c = b.getTime() - a.getTime()
                , d = ""
                , e = generateBits(c, 0, 31)
                , f = generateBits(c, 32, 47)
                , g = generateBits(c, 48, 59) + "1"
                , h = generateBits(rand(4095), 0, 7)
                , i = generateBits(rand(4095), 0, 7)
                , j = generateBits(rand(8191), 0, 7) + generateBits(rand(8191), 8, 15) + generateBits(rand(8191), 0, 7) + generateBits(rand(8191), 8, 15) + generateBits(rand(8191), 0, 15);
            return e + d + f + d + g + d + h + i + d + j
        }
        """
        self.ctx = execjs.compile(js_file)
        self.v_Cookies = [
            {'domain': 'mall.huya.com', 'hostOnly': False, 'httpOnly': False, 'name': 'udb_guiddata', 'path': '/', 'sameSite': 'unspecified', 'secure': False, 'session': False, 'storeId': 0, 'value': self.ctx.call("guid")},
            {'domain': 'mall.huya.com', 'hostOnly': False, 'httpOnly': False, 'name': 'udb_deviceid', 'path': '/', 'sameSite': 'unspecified', 'secure': False, 'session': False, 'storeId': 0, 'value': 'w_834461088677703680'}, 
            {'domain': 'mall.huya.com', 'hostOnly': False, 'httpOnly': False, 'name': '__yasmid', 'path': '/', 'sameSite': 'unspecified', 'secure': False, 'session': False, 'storeId': 0, 'value': '0.20615770627367835'}, 
            {'domain': 'mall.huya.com', 'hostOnly': False, 'httpOnly': False, 'name': '__yamid_tt1', 'path': '/', 'sameSite': 'unspecified', 'secure': False, 'session': False, 'storeId': 0, 'value': '0.20615770627367835'}, 
            {'domain': 'mall.huya.com', 'hostOnly': False, 'httpOnly': False, 'name': '__yamid_new', 'path': '/', 'sameSite': 'unspecified', 'secure': False, 'session': False, 'storeId': 0, 'value': self.ctx.call("generate32")}, 
            {'domain': 'mall.huya.com', 'hostOnly': False, 'httpOnly': False, 'name': '_yasids', 'path': '/', 'sameSite': 'unspecified', 'secure': False, 'session': False, 'storeId': 0, 'value': '__rootsid%3D'+self.ctx.call("generate32")}, 
            {'domain': 'mall.huya.com', 'hostOnly': False, 'httpOnly': False, 'name': 'sdid', 'path': '/', 'sameSite': 'unspecified', 'secure': False, 'session': False, 'storeId': 0, 'value': '0UnHUgv0_qmfD4KAKlwzhqbaXSJMgy5bGtXJKaJIyUKTLwgChyBpLk4IkizRUO8I8jTUYQ9svzR1ZS1_RBB_-itgr84esmNa3bIDrlmp2J9fWVkn9LtfFJw_Qo4kgKr8OZHDqNnuwg612sGyflFn1dkOhSrElo6XFO6wrpImJ5XY9iRzcFDr8rBu0ZRAuE6F5'}, 
            {'domain': 'mall.huya.com', 'hostOnly': False, 'httpOnly': False, 'name': 'sdidtest', 'path': '/', 'sameSite': 'unspecified', 'secure': False, 'session': False, 'storeId': 0, 'value': '0UnHUgv0_qmfD4KAKlwzhqbaXSJMgy5bGtXJKaJIyUKTLwgChyBpLk4IkizRUO8I8jTUYQ9svzR1ZS1_RBB_-itgr84esmNa3bIDrlmp2J9fWVkn9LtfFJw_Qo4kgKr8OZHDqNnuwg612sGyflFn1dkOhSrElo6XFO6wrpImJ5XY9iRzcFDr8rBu0ZRAuE6F5'}, 
            {'domain': 'mall.huya.com', 'hostOnly': False, 'httpOnly': False, 'name': 'rso', 'path': '/', 'sameSite': 'unspecified', 'secure': False, 'session': False, 'storeId': 0, 'value': 'hyyxgzh'}, 
            {'domain': 'mall.huya.com', 'hostOnly': False, 'httpOnly': False, 'name': 'null_rep_cnt', 'path': '/', 'sameSite': 'unspecified', 'secure': False, 'session': False, 'storeId': 0, 'value': '6'}, 
            {'domain': 'mall.huya.com', 'hostOnly': False, 'httpOnly': False, 'name': 'huyawap_rep_cnt', 'path': '/', 'sameSite': 'unspecified', 'secure': False, 'session': False, 'storeId': 0, 'value': '9'}, 
            {'domain': 'mall.huya.com', 'hostOnly': False, 'httpOnly': False, 'name': 'sdidshorttest', 'path': '/', 'sameSite': 'unspecified', 'secure': False, 'session': False, 'storeId': 0, 'value': 'test'}, 
            {'domain': 'mall.huya.com', 'hostOnly': False, 'httpOnly': False, 'name': 'webh5_playmall_rep_cnt', 'path': '/', 'sameSite': 'unspecified', 'secure': False, 'session': False, 'storeId': 0, 'value': '10'}
        ]
        self.Cookies = {v.get("name"):v.get("value") for v in self.v_Cookies}

    def get_udb_deviceid(self):
        url = 'https://udblgn.huya.com/web/middle/2.5/84108729/https/27df76f62f8349baaf07cd8466373ff5'

        cookies = {"udb_guiddata": self.Cookies.get("udb_guiddata")}

        headers = {
            'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
            'accept-language': 'zh-CN,zh;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6',
            'cache-control': 'no-cache',
            'dnt': '1',
            'pragma': 'no-cache',
            'referer': 'https://aq.huya.com/m/login.html?third=6&rso=playmall&redirect=https%3A%2F%2Fmall.huya.com%2F%23%2Fhome',
            'sec-fetch-dest': 'iframe',
            'sec-fetch-mode': 'navigate',
            'sec-fetch-site': 'same-site',
            'upgrade-insecure-requests': '1',
            'user-agent': 'Mozilla/5.0 (iPad; CPU OS 14_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 MicroMessenger/8.0.0(0x1800003a) NetType/WIFI Language/zh_CN Edg/122.0.0.0',
        }

        response = requests.get(url=url, cookies=cookies, headers=headers)
        return response

    def get_verify_code(self, phone):
        url = 'https://udblgn.huya.com/web/v2/smsCode'

        headers = {
            'accept': '*/*',
            'accept-language': 'zh-CN,zh;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6',
            'cache-control': 'no-cache',
            'content-type': 'application/json;charset=UTF-8',
            'context': 'WB-8cd991220dc549408be64243b66f477c-CAB6867C0390000116A6122217A9BDF0-',
            'dnt': '1',
            'lcid': '2052',
            'origin': 'https://udblgn.huya.com',
            'pragma': 'no-cache',
            'referer': 'https://udblgn.huya.com/web/middle/2.5/68103655/https/8cd991220dc549408be64243b66f477c',
            'reqid': '68117067',
            'sec-fetch-dest': 'empty',
            'sec-fetch-mode': 'cors',
            'sec-fetch-site': 'same-origin',
            'uri': '60027',
            'user-agent': 'Mozilla/5.0 (iPad; CPU OS 14_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 MicroMessenger/8.0.0(0x1800003a) NetType/WIFI Language/zh_CN Edg/122.0.0.0',
        }

        json_data = {
            'uri': '60027',
            'version': '2.5',
            'context': 'WB-8cd991220dc549408be64243b66f477c-CAB6867C0390000116A6122217A9BDF0-',
            'appId': '5131',
            'appSign': '0ba67962ab9e12387648efeae2750777',
            'authId': '',
            'sdid': '0UnHUgv0_qmfD4KAKlwzhqbaXSJMgy5bGtXJKaJIyUKTLwgChyBpLk4IkizRUO8I8jTUYQ9svzR1ZS1_RBB_-itgr84esmNa3bIDrlmp2J9fWVkn9LtfFJw_Qo4kgKr8OZHDqNnuwg612sGyflFn1dkOhSrElo6XFO6wrpImJ5XY9iRzcFDr8rBu0ZRAuE6F5',
            'lcid': '2052',
            'byPass': '3',
            'requestId': '68117067',
            'data': {
                'phone': f'086{phone}',
                'behavior': '%7B%22furl%22%3A%22https%3A%2F%2Fmall.huya.com%2F%22%2C%22curl%22%3A%22https%3A%2F%2Faq.huya.com%2Fm%2Flogin.html%22%2C%22user_action%22%3A%5B%7B%22id%22%3A%2217%22%2C%22d%22%3A6605%2C%22time%22%3A1713783310192%7D%2C%7B%22id%22%3A%2217%22%2C%22d%22%3A13477%2C%22time%22%3A1713783317064%7D%2C%7B%22id%22%3A%2218%22%2C%22x%22%3A305%2C%22y%22%3A94%2C%22d%22%3A13478%2C%22time%22%3A1713783317065%7D%5D%7D',
                'page': 'https%3A%2F%2Faq.huya.com%2Fm%2Flogin.html%3Fthird%3D6%26rso%3Dplaymall%26redirect%3Dhttps%253A%252F%252Fmall.huya.com%252F%2523%252Fexchange%252Flist%253FsourceId%253Dhyyxgzh%23%2FphoneLogin',
            },
        }

        return requests.post(url=url, cookies=self.Cookies, headers=headers, json=json_data)

    def by_verify_code_get_cookie_document(self, phone, verify_code):
        url = 'https://udblgn.huya.com/web/v2/smsLogin'

        headers = {
            'accept': '*/*',
            'accept-language': 'zh-CN,zh;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6',
            'cache-control': 'no-cache',
            'content-type': 'application/json;charset=UTF-8',
            'context': 'WB-9ef72668c1634ecda7572f0c9158fe5a-CAB8214F61F00001C6B87A40C5DDC4B0-',
            'dnt': '1',
            'lcid': '2052',
            'origin': 'https://udblgn.huya.com',
            'pragma': 'no-cache',
            'referer': 'https://udblgn.huya.com/web/middle/2.5/69359107/https/9ef72668c1634ecda7572f0c9158fe5a',
            'reqid': '69410896',
            'sec-fetch-dest': 'empty',
            'sec-fetch-mode': 'cors',
            'sec-fetch-site': 'same-origin',
            'uri': '60025',
            'user-agent': 'Mozilla/5.0 (iPad; CPU OS 14_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 MicroMessenger/8.0.0(0x1800003a) NetType/WIFI Language/zh_CN Edg/122.0.0.0',
        }

        json_data = {
            "uri": "60025",
            "version": "2.5",
            "context": "WB-9ef72668c1634ecda7572f0c9158fe5a-CAB8214F61F00001C6B87A40C5DDC4B0-",
            "appId": "5131",
            "appSign": "0ba67962ab9e12387648efeae2750777",
            "authId": "",
            "sdid": "0UnHUgv0_qmfD4KAKlwzhqRo8Xe-h41IoxKIMJySfXD0FczpWyDQOJ4jExCRLmoAhohbpP-JXeFg08NN1PUhJlKXKYXMzcIZ23SgVqqducXXWVkn9LtfFJw_Qo4kgKr8OZHDqNnuwg612sGyflFn1dkOhSrElo6XFO6wrpImJ5XY9iRzcFDr8rBu0ZRAuE6F5",
            "lcid": "2052",
            "byPass": "3",
            "requestId": "75191368",
            "data": {
                "phone": f"086{phone}",
                "authId": "",
                "authcode": f"{verify_code}",
                "sessionData": "",
                "domainList": "huya.com",
                "remember": "0",
                "behavior": "%7B%22furl%22%3A%22https%3A%2F%2Fmall.huya.com%2F%22%2C%22curl%22%3A%22https%3A%2F%2Faq.huya.com%2Fm%2Flogin.html%22%2C%22user_action%22%3A%5B%7B%22id%22%3A%2217%22%2C%22d%22%3A1317%2C%22time%22%3A1714135987644%7D%2C%7B%22id%22%3A%2217%22%2C%22d%22%3A3285%2C%22time%22%3A1714135989612%7D%2C%7B%22id%22%3A%2219%22%2C%22d%22%3A3286%2C%22time%22%3A1714135989613%7D%2C%7B%22id%22%3A%2219%22%2C%22d%22%3A3957%2C%22time%22%3A1714135990284%7D%2C%7B%22id%22%3A%2224%22%2C%22x%22%3A261%2C%22y%22%3A458%2C%22d%22%3A5037%2C%22time%22%3A1714135991364%7D%2C%7B%22id%22%3A%2221%22%2C%22x%22%3A180%2C%22y%22%3A167%2C%22d%22%3A5038%2C%22time%22%3A1714135991365%7D%5D%7D",
                "page": "https%3A%2F%2Faq.huya.com%2Fm%2Flogin.html%3Fthird%3D6%26rso%3Dplaymall%26redirect%3Dhttps%253A%252F%252Fmall.huya.com%252F%2523%252Fhome%23%2FphoneLogin"
            }
        }

        response = self.session.post(url=url, cookies=self.Cookies,
                                headers=headers, json=json_data)
        return response

    def by_verify_code_get_cookies(self, url):
        headers = {
            'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
            'accept-language': 'zh-CN,zh;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6',
            'cache-control': 'no-cache',
            'dnt': '1',
            'pragma': 'no-cache',
            'referer': 'https://aq.huya.com/m/login.html?third=6&rso=playmall&redirect=https%3A%2F%2Fmall.huya.com%2F%23%2Fexchange%2Flist%3FsourceId%3Dhyyxgzh',
            'sec-fetch-dest': 'iframe',
            'sec-fetch-mode': 'navigate',
            'sec-fetch-site': 'same-site',
            'sec-fetch-user': '?1',
            'upgrade-insecure-requests': '1',
            'user-agent': 'Mozilla/5.0 (iPad; CPU OS 14_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 MicroMessenger/8.0.0(0x1800003a) NetType/WIFI Language/zh_CN Edg/122.0.0.0',
        }

        return self.session.get(url=url, cookies=self.Cookies, headers=headers)

    def document_cookie_format(self, document_cookie: str): 
        cookies_with_details = []  
        cookies = []
        for cookie in document_cookie.replace(" ", "").split(";"):
            temp = cookie.split("=")
            cookies.append({"name": temp[0], "value":temp[1]})
        for cookie in cookies:
            cookie_dict = {  
                'domain': 'mall.huya.com',
                'hostOnly': False,
                'httpOnly': False,  
                'name': cookie.get("name"),  
                'path': '/',  
                'sameSite': "unspecified",  
                'secure': False,  
                'session': False,  
                'storeId': 0,
                'value': cookie.get("value")
            } 
            cookies_with_details.append(cookie_dict)  
        return cookies_with_details

    def cookie_format(self, cookies):
        cookies_with_details = []  
        for cookie in cookies:
            cookie_dict = {  
                'domain': cookie.domain,
                'hostOnly': cookie.domain_initial_dot,
                'httpOnly': False,  
                'name': cookie.name,  
                'path': cookie.path,  
                'sameSite': "unspecified",  
                'secure': cookie.secure,  
                'session': cookie.expires is None,  
                'storeId': 0,
                'value': cookie.value
            } 
            cookies_with_details.append(cookie_dict)  
        return cookies_with_details

    def get_cookies(self, phone, verify_code):
        response = self.by_verify_code_get_cookie_document(phone, verify_code)

        if response.json().get("description", ""):
            print(response.json().get("description"))
            return
        url = response.json().get("data", "").get("domainUrlList", "")[0]
        
        response = self.by_verify_code_get_cookies(url)
        cookies = [*self.v_Cookies, *self.cookie_format(self.session.cookies)]
        return cookies

    def get_verify(self, phone):
        response = self.get_udb_deviceid()
        self.Cookies['udb_guiddata'] = response.cookies.get_dict().get("udb_deviceid")
        response = self.get_verify_code(phone)

        if response.json().get("description",""): 
            print(response.json().get("description",""))
            return response.json().get("description","")
        print("请注意查收验证码", time.ctime())
        return True

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


if __name__ == "__main__":
    phone = "15120424107"
    verify_code = "803447"
    cookie = fCookies()

    # session改一下
    # 你运行以下程序获取验证码
    # cookie.get_verify(phone)


    # 好了
    # 获取到验证码后执行
    # 上边的程序就不能运行了，一个验证码，使用一次后边的函数就会失效
    # cookies = cookie.get_cookies(phone, verify_code)
    # print(cookies)

    # 这个格式需要转换，你可以放着我来
    # 权当获取到的cookie就是传递到User的cookie就像，写完我来补充
    # 就这样了，先获取验证码，之后填写验证码
    cookies = [{'domain': 'mall.huya.com', 'hostOnly': False, 'httpOnly': False, 'name': 'udb_guiddata', 'path': '/', 'sameSite': 'unspecified', 'secure': False, 'session': False, 'storeId': 0, 'value': 'c2ddc2c4682d4a71bab6fc08b08f0acf'}, {'domain': 'mall.huya.com', 'hostOnly': False, 'httpOnly': False, 'name': 'udb_deviceid', 'path': '/', 'sameSite': 'unspecified', 'secure': False, 'session': False, 'storeId': 0, 'value': 'w_834461088677703680'}, {'domain': 'mall.huya.com', 'hostOnly': False, 'httpOnly': False, 'name': '__yasmid', 'path': '/', 'sameSite': 'unspecified', 'secure': False, 'session': False, 'storeId': 0, 'value': '0.20615770627367835'}, {'domain': 'mall.huya.com', 'hostOnly': False, 'httpOnly': False, 'name': '__yamid_tt1', 'path': '/', 'sameSite': 'unspecified', 'secure': False, 'session': False, 'storeId': 0, 'value': '0.20615770627367835'}, {'domain': 'mall.huya.com', 'hostOnly': False, 'httpOnly': False, 'name': '__yamid_new', 'path': '/', 'sameSite': 'unspecified', 'secure': False, 'session': False, 'storeId': 0, 'value': 'CAE01B77DFD000016F431090F4804910'}, {'domain': 'mall.huya.com', 'hostOnly': False, 'httpOnly': False, 'name': '_yasids', 'path': '/', 'sameSite': 'unspecified', 'secure': False, 'session': False, 'storeId': 0, 'value': '__rootsid%3DCAE01B77E2E00001F87413C7A34C1463'}, {'domain': 'mall.huya.com', 'hostOnly': False, 'httpOnly': False, 'name': 'sdid', 'path': '/', 'sameSite': 'unspecified', 'secure': False, 'session': False, 'storeId': 0, 'value': '0UnHUgv0_qmfD4KAKlwzhqbaXSJMgy5bGtXJKaJIyUKTLwgChyBpLk4IkizRUO8I8jTUYQ9svzR1ZS1_RBB_-itgr84esmNa3bIDrlmp2J9fWVkn9LtfFJw_Qo4kgKr8OZHDqNnuwg612sGyflFn1dkOhSrElo6XFO6wrpImJ5XY9iRzcFDr8rBu0ZRAuE6F5'}, {'domain': 'mall.huya.com', 'hostOnly': False, 'httpOnly': False, 'name': 'sdidtest', 'path': '/', 'sameSite': 'unspecified', 'secure': False, 'session': False, 'storeId': 0, 'value': '0UnHUgv0_qmfD4KAKlwzhqbaXSJMgy5bGtXJKaJIyUKTLwgChyBpLk4IkizRUO8I8jTUYQ9svzR1ZS1_RBB_-itgr84esmNa3bIDrlmp2J9fWVkn9LtfFJw_Qo4kgKr8OZHDqNnuwg612sGyflFn1dkOhSrElo6XFO6wrpImJ5XY9iRzcFDr8rBu0ZRAuE6F5'}, {'domain': 'mall.huya.com', 'hostOnly': False, 'httpOnly': False, 'name': 'rso', 'path': '/', 'sameSite': 'unspecified', 'secure': False, 'session': False, 'storeId': 0, 'value': 'hyyxgzh'}, {'domain': 'mall.huya.com', 'hostOnly': False, 'httpOnly': False, 'name': 'null_rep_cnt', 'path': '/', 'sameSite': 'unspecified', 'secure': False, 'session': False, 'storeId': 0, 'value': '6'}, {'domain': 'mall.huya.com', 'hostOnly': False, 'httpOnly': False, 'name': 'huyawap_rep_cnt', 'path': '/', 'sameSite': 'unspecified', 'secure': False, 'session': False, 'storeId': 0, 'value': '9'}, {'domain': 'mall.huya.com', 'hostOnly': False, 'httpOnly': False, 'name': 'sdidshorttest', 'path': '/', 'sameSite': 'unspecified', 'secure': False, 'session': False, 'storeId': 0, 'value': 'test'}, {'domain': 'mall.huya.com', 'hostOnly': False, 'httpOnly': False, 'name': 'webh5_playmall_rep_cnt', 'path': '/', 'sameSite': 'unspecified', 'secure': False, 'session': False, 'storeId': 0, 'value': '10'}, {'domain': '.huya.com', 'hostOnly': False, 'httpOnly': False, 'name': 'udb_biztoken', 'path': '/', 'sameSite': 'unspecified', 'secure': False, 'session': False, 'storeId': 0, 'value': 'AQC0xOX2F3HJcv_YEJBqX3XAxklj6l9LAm9NmSv4PNecFFV0yWYT3jycgN9-k76ADco48GXXfQAE6cTxuApqhVmxjW0smpPbWXIa3d577IejOrkCQP9DK5T7vYcZj-bCZAdxU90fAHErCDKLe-PwbsFBmBITywdtU1EC_Ubab3pmVlnY_LRGBLZY0yvl-jrljTU7LKXjD62VQ4wqSb6uWZm7Zcz9Rv9gKofNgNwjNllkZZFz05nHDprEJheyfiEjdyW4nVW0YMBKoKdayPKpVpLd7maTsjwcUhlX2JA3ZtmSP2FDy91K6gnhn9qvTgTwLnG0Z39pqf9WkQcGxpbzjl_7'}, {'domain': '.huya.com', 'hostOnly': False, 'httpOnly': False, 'name': 'udb_cred', 'path': '/', 'sameSite': 'unspecified', 'secure': True, 'session': False, 'storeId': 0, 'value': 'CjB5J1ZVSLnojA1TUQY1RLKCsntEkqgHgc8xqbCo9yijNYvx9GK3Hnb3-1JJtXSVL_boGBpw8JB3n40Ir3t5AIiSzMwKrwMQ3jry4dnh0muk7LKIm3q6DWA-9l2dY44IFrh30CGdsYOUm-va8DpKCZBK'}, {'domain': '.huya.com', 'hostOnly': False, 'httpOnly': False, 'name': 'udb_lgntype', 'path': '/', 'sameSite': 'unspecified', 'secure': False, 'session': False, 'storeId': 0, 'value': 'mobile'}, {'domain': '.huya.com', 'hostOnly': False, 'httpOnly': False, 'name': 'udb_origin', 'path': '/', 'sameSite': 'unspecified', 'secure': False, 'session': False, 'storeId': 0, 'value': '1'}, {'domain': '.huya.com', 'hostOnly': False, 'httpOnly': False, 'name': 'udb_other', 'path': '/', 'sameSite': 'unspecified', 'secure': False, 'session': True, 'storeId': 0, 'value': '%7B%22lt%22%3A%221724849104123%22%2C%22isRem%22%3A%220%22%7D'}, {'domain': '.huya.com', 'hostOnly': False, 'httpOnly': False, 'name': 'udb_passport', 'path': '/', 'sameSite': 'unspecified', 'secure': False, 'session': False, 'storeId': 0, 'value': 'hy_262773865'}, {'domain': '.huya.com', 'hostOnly': False, 'httpOnly': False, 'name': 'udb_status', 'path': '/', 'sameSite': 'unspecified', 'secure': False, 'session': False, 'storeId': 0, 'value': '1'}, {'domain': '.huya.com', 'hostOnly': False, 'httpOnly': False, 'name': 'udb_uid', 'path': '/', 'sameSite': 'unspecified', 'secure': False, 'session': False, 'storeId': 0, 'value': '1199641780785'}, {'domain': '.huya.com', 'hostOnly': False, 'httpOnly': False, 'name': 'udb_version', 'path': '/', 'sameSite': 'unspecified', 'secure': False, 'session': False, 'storeId': 0, 'value': '1.0'}, {'domain': '.huya.com', 'hostOnly': False, 'httpOnly': False, 'name': 'username', 'path': '/', 'sameSite': 'unspecified', 'secure': False, 'session': False, 'storeId': 0, 'value': 'hy_262773865'}, {'domain': '.huya.com', 'hostOnly': False, 'httpOnly': False, 'name': 'yyuid', 'path': '/', 'sameSite': 'unspecified', 'secure': False, 'session': False, 'storeId': 0, 'value': '1199641780785'}]
    # cookie格式化到User需要的样式
    # print(cookies)

    data = cookie.json_cookie_format(cookies)
    print(cookie.json_cookie_format(data))