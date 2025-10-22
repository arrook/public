function js_wss(params){
    var params = JSON.parse(params);
    var document = {
        "cookie": "",
        "getCookie": function (c) {
            if (!c) return this.cookie;
            for (var f = c + "=", p = this.cookie.split(";"), w = 0, T = p.length; w < T; w++) {
                var B = p[w].trim();
                if (B.indexOf(f) == 0)
                    return B.substr(f.length)
            }
            return ""
        },
    },
    location = {
        "ancestorOrigins":{},
        "href":"https://mall.huya.com/#/exchange/list",
        "origin":"https://mall.huya.com",
        "protocol":"https:",
        "host":"mall.huya.com",
        "hostname":"mall.huya.com",
        "port":"","pathname":"/",
        "search":"",
        "hash":"#/exchange/list",
    },
    navigator = {
        "vendorSub": "",
        "productSub": "20030107",
        "vendor": "Google Inc.",
        "maxTouchPoints": 0,
        "scheduling": {},
        "userActivation": {
            "hasBeenActive": false,
            "isActive": false
        },
        "doNotTrack": "1",
        "geolocation": {},
        "connection": {
            "onchange": null,
            "effectiveType": "4g",
            "rtt": 200,
            "downlink": 10,
            "saveData": false
        },
        "plugins": {
            "length": 0
        },
        "mimeTypes": {
            "length": 0
        },
        "pdfViewerEnabled": false,
        "webkitTemporaryStorage": {},
        "webkitPersistentStorage": {},
        "windowControlsOverlay": {
            "visible": false,
            "ongeometrychange": null
        },
        "hardwareConcurrency": 16,
        "cookieEnabled": true,
        "appCodeName": "Mozilla",
        "appName": "Netscape",
        "appVersion": "5.0 (iPad; CPU OS 14_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 MicroMessenger/8.0.0(0x1800003a) NetType/WIFI Language/zh_CN Edg/122.0.0.0",
        "platform": "Win32",
        "product": "Gecko",
        "userAgent": "Mozilla/5.0 (iPad; CPU OS 14_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 MicroMessenger/8.0.0(0x1800003a) NetType/WIFI Language/zh_CN Edg/122.0.0.0",
        "language": "zh-CN",
        "languages": {
            "0": "zh-CN",
            "1": "en",
            "2": "en-GB",
            "3": "en-US"
        },
        "onLine": true,
        "webdriver": false,
        "bluetooth": {},
        "storageBuckets": {},
        "clipboard": {},
        "credentials": {},
        "keyboard": {},
        "managed": {},
        "mediaDevices": {},
        "storage": {},
        "serviceWorker": {},
        "virtualKeyboard": {},
        "wakeLock": {},
        "deviceMemory": 8,
        "userAgentData": {},
        "cookieDeprecationLabel": {},
        "login": {},
        "ink": {},
        "mediaCapabilities": {},
        "hid": {},
        "locks": {},
        "gpu": {},
        "mediaSession": {},
        "permissions": {},
        "presentation": {},
        "usb": {},
        "xr": {},
        "serial": {}
    },
    localStorage = {
        "wssdns0": "mdPd#VpWL8v<9E<xkhE<}AR2m}K@@o6E*8vf5ofxk+EfdARX=dP@Qo?G*,)<5ofxk+of}AZ2T}Pd#6M6*8)<5E<xk+o<dAR",
        "fp_timestamp": (new Date).getTime(),
        "getItem": ""
    },
    performanceInfo = {
        "pageview": "hy-game-mall",
        "_hmt": [],
    },
    window = {
        "document": document,
        "location": location,
        "navigator": navigator,
        "history":{},
        "screen":{},
        "localStorage": localStorage,
        "sessionStorage": {},
        "performanceInfo": performanceInfo,
    };
    if(params.cookie) document.cookie = params.cookie;
    if(params.href) location.href = params.href;
    var zip = (a) => { return a.toString().replaceAll(/\n|\r| /g, "") };
    var log = ()=>{};
    var error = ()=>{};
    var function_log = (...a) => { }
    var setTimeout = function (...a) { function_log("==>设置延时器: ", zip(a)) }
    var clearTimeout = function (...a) { function_log("==>清除延时器: ", zip(a)) }
    var setInterval = function (...a) { function_log("==>设置计时器: ", zip(a)) }
    var clearInterval = function (...a) { function_log("==>清除计时器: ", zip(a)) }

    var Webcosket_log = 0, XMLHttpRequest_log = 0,
    FileReader_log = 0, newArrayBuffer_log = 0;

    class WebSocket {
        constructor(url) {
            this.url = url;
            this.ip;
            this.onopen;
            this.onclose;
            this.onerror;
            this.log(this)
        }

        log(...data) {
            if(Webcosket_log)
                console.log("==>webSocket_log: ", data, "\n");
        }

        onerror(...error) {
            this.log('WebSocket error:', error);
        }

        onopen(...data) {
            this.log('Opening WebSocket connection to:', data);
        }

        onsend(...data) {
            this.log('Sending message:', data);
        }

        onmessage(...data) {
            this.log('Receiving message:', data);
        }

        onclose() {
            this.log('Closing WebSocket connection');
        }
    }
    class XMLHttpRequest {
        constructor(...a) {
            this.result;
            this.status = 200;
            this.readyState = 4;
            this.readystatechange;
            this.log('Created new XHR instance', a);
        }

        log(...data) {
            if(XMLHttpRequest_log)
                console.log('==>xhr_log: ', data, "\n");
        }

        error(...error) {
            this.log('xhr error:', error);
        }

        overrideMimeType(...data) {
            this.log('overrideMimeType XHR request', data);
        }

        addEventListener(...data) {
            this.log('addEventListener XHR request', data);
        }

        removeEventListener(...data) {
            this.log('removeEventListener XHR request', data);
        }

        open(...data) {
            this.log('Opening XHR request',data);
        }

        send(...data) {
            this.log('Sending XHR request',data);
        }

        etRequestHeader(...data) {
            this.log('etRequestHeader XHR request',data);
        }

        abort(...data) {
            this.log('abort XHR request',data);
        }

        getResponseHeader(...data) {
            this.log('getResponseHeader XHR request',data);
        }

        getAllResponseHeaders(...data) {
            this.log('getAllResponseHeaders XHR request',data);
        }
    }
    class FileReader {
        constructor() {
            this.result = null;
            this.readyState = 0;

            this.onload = null;
        }

        log(...data) {
            if(FileReader_log)
                console.log("==>FileReader_log: ", data, "\n");
        }

        error(...data) {
            this.log("==>FileReader_error: ", data);
        }

        readAsArrayBuffer(data) {
            let buffer = Buffer.from(data, 'base64');
            this.result = buffer.buffer.slice(buffer.byteOffset, buffer.byteOffset + buffer.byteLength);
            this.readyState = 2;
            
            typeof this.onload == "function" ? this.onload() : null;
        };

        readFromFile(filePath) {
            try {
                this.result = fs.readFileSync(filePath, 'utf-8');
                this.onload();
            } catch (error) {
                this.error("==>readFromFile error", error);
            }
        }
    }
    var k2 = (function () {
        function r(c) {
            return (r = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function (f) {
                return typeof f
            }
                : function (f) {
                    return f && typeof Symbol == "function" && f.constructor === Symbol && f !== Symbol.prototype ? "symbol" : typeof f
                }
            )(c)
        }
        function n(c, f) {
            if (!(c instanceof f))
                throw new TypeError("Cannot call a class as a function")
        }
        function i(c, f) {
            for (var p = 0; p < f.length; p++) {
                var w = f[p];
                w.enumerable = w.enumerable || !1,
                    w.configurable = !0,
                    "value" in w && (w.writable = !0),
                    Object.defineProperty(c, w.key, w)
            }
        }
        function o(c, f, p) {
            return f && i(c.prototype, f),
                p && i(c, p),
                c
        }
        function a(c, f) {
            var p = Object.keys(c);
            if (Object.getOwnPropertySymbols) {
                var w = Object.getOwnPropertySymbols(c);
                f && (w = w.filter(function (T) {
                    return Object.getOwnPropertyDescriptor(c, T).enumerable
                })),
                    p.push.apply(p, w)
            }
            return p
        }
        function s(c) {
            for (var f = 1; f < arguments.length; f++) {
                var p = arguments[f] != null ? arguments[f] : {};
                f % 2 ? a(p, !0).forEach(function (w) {
                    var T, B, J;
                    T = c,
                        J = p[B = w],
                        B in T ? Object.defineProperty(T, B, {
                            value: J,
                            enumerable: !0,
                            configurable: !0,
                            writable: !0
                        }) : T[B] = J
                }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(c, Object.getOwnPropertyDescriptors(p)) : a(p).forEach(function (w) {
                    Object.defineProperty(c, w, Object.getOwnPropertyDescriptor(p, w))
                })
            }
            return c
        }
        function u(c) {
            return (u = Object.setPrototypeOf ? Object.getPrototypeOf : function (f) {
                return f.__proto__ || Object.getPrototypeOf(f)
            }
            )(c)
        }
        function l(c, f) {
            return (l = Object.setPrototypeOf || function (p, w) {
                return p.__proto__ = w,
                    p
            }
            )(c, f)
        }
        function v(c, f) {
            return !f || typeof f != "object" && typeof f != "function" ? function (p) {
                if (p === void 0)
                    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                return p
            }(c) : f
        }
        function m(c) {
            return function (f) {
                if (Array.isArray(f)) {
                    for (var p = 0, w = new Array(f.length); p < f.length; p++)
                        w[p] = f[p];
                    return w
                }
            }(c) || function (f) {
                if (Symbol.iterator in Object(f) || Object.prototype.toString.call(f) === "[object Arguments]")
                    return Array.from(f)
            }(c) || function () {
                throw new TypeError("Invalid attempt to spread non-iterable instance")
            }()
        }
        var g = "1.3.5",
            S = {
                iRequestId: 0
            };
        S.ver = g,
            S.enableTrace = 0,
            S.setEnableTrace = function (c) {
                if (c.hasOwnProperty("enableTrace"))
                    S.enableTrace = c.enableTrace;
                else {
                    var f = Math.random() < .1;
                    S.enableTrace = f ? 1 : 0
                }
            },
            S.getRequestId = function () {
                return ++S.iRequestId
            },
            S.getTraceId = function () {
                return "xxxxxxxxxxxxxxxx".replace(/[xy]/g, function (c) {
                    var f = 16 * Math.random() | 0;
                    return (c == "x" ? f : 3 & f | 8).toString(16)
                })
            };
        var d = {
            Wup: function () {
                this.iVersion = 3,
                    this.cPacketType = 0,
                    this.iMessageType = 0,
                    this.iRequestId = 0,
                    this.sServantName = "",
                    this.sFuncName = "",
                    this.sBuffer = new d.BinBuffer,
                    this.iTimeout = 0,
                    this.context = new d.Map(new d.STRING, new d.STRING),
                    this.status = new d.Map(new d.STRING, new d.STRING),
                    this.data = new d.Map(new d.STRING, new d.Map(new d.STRING, new d.BinBuffer)),
                    this.newdata = new d.Map(new d.STRING, new d.BinBuffer)
            }
        }; 
        d.Wup.prototype.setVersion = function (c) {
            this.iVersion = c
        },
            d.Wup.prototype.getVersion = function (c) {
                return this.iVersion
            },
            d.Wup.prototype.setServant = function (c) {
                this.sServantName = c
            },
            d.Wup.prototype.setFunc = function (c) {
                this.sFuncName = c
            },
            d.Wup.prototype.setRequestId = function (c) {
                this.iRequestId = c || ++this.iRequestId
            },
            d.Wup.prototype.getRequestId = function () {
                return this.iRequestId
            },
            d.Wup.prototype.setTimeOut = function (c) {
                this.iTimeout = c
            },
            d.Wup.prototype.getTimeOut = function () {
                return this.iTimeout
            },
            d.Wup.prototype.writeTo = function () {
                var c = new d.JceOutputStream;
                return c.writeInt16(1, this.iVersion),
                    c.writeInt8(2, this.cPacketType),
                    c.writeInt32(3, this.iMessageType),
                    c.writeInt32(4, this.iRequestId),
                    c.writeString(5, this.sServantName),
                    c.writeString(6, this.sFuncName),
                    c.writeBytes(7, this.sBuffer),
                    c.writeInt32(8, this.iTimeout),
                    c.writeMap(9, this.context),
                    c.writeMap(10, this.status),
                    new d.BinBuffer(c.getBuffer())
            },
            d.Wup.prototype.encode = function () {
                var c = new d.JceOutputStream;
                this.iVersion == 3 ? c.writeMap(0, this.newdata) : c.writeMap(0, this.data),
                    this.sBuffer = c.getBinBuffer();
                var f = new d.BinBuffer;
                f = this.writeTo();
                var p = new d.BinBuffer;
                return p.writeInt32(4 + f.len),
                    p.writeBytes(f),
                    p
            },
            d.Wup.prototype.writeBoolean = function (c, f) {
                var p = new d.JceOutputStream;
                if (p.writeBoolean(0, f),
                    this.iVersion == 3)
                    this.newdata.put(c, new d.BinBuffer(p.getBuffer()));
                else {
                    var w = this.data.get(c),
                        T = d.TypeHelp.BOOLEAN;
                    w == null && (w = new d.Map(d.STRING, d.STRING)),
                        w.put(T, new d.BinBuffer(p.getBuffer())),
                        this.data.put(c, w)
                }
            },
            d.Wup.prototype.writeInt8 = function (c, f) {
                var p = new d.JceOutputStream;
                if (p.writeInt8(0, f),
                    this.iVersion == 3)
                    this.newdata.put(c, new d.BinBuffer(p.getBuffer()));
                else {
                    var w = this.data.get(c),
                        T = d.TypeHelp.CHAR;
                    w == null && (w = new d.Map(d.STRING, d.STRING)),
                        w.put(T, new d.BinBuffer(p.getBuffer())),
                        this.data.put(c, w)
                }
            },
            d.Wup.prototype.writeInt16 = function (c, f) {
                var p = new d.JceOutputStream;
                if (p.writeInt16(0, f),
                    this.iVersion == 3)
                    this.newdata.put(c, new d.BinBuffer(p.getBuffer()));
                else {
                    var w = this.data.get(c),
                        T = d.TypeHelp.SHORT;
                    w == null && (w = new d.Map(d.STRING, d.STRING)),
                        w.put(T, new Uint8Array(p.getBuffer())),
                        this.data.put(c, w)
                }
            },
            d.Wup.prototype.writeInt32 = function (c, f) {
                var p = new d.JceOutputStream;
                if (p.writeInt32(0, f),
                    this.iVersion == 3)
                    this.newdata.put(c, new d.BinBuffer(p.getBuffer()));
                else {
                    var w = this.data.get(c),
                        T = d.TypeHelp.INT32;
                    w == null && (w = new d.Map(d.STRING, d.STRING)),
                        w.put(T, new Uint8Array(p.getBuffer())),
                        this.data.put(c, w)
                }
            },
            d.Wup.prototype.writeInt64 = function (c, f) {
                var p = new d.JceOutputStream;
                if (p.writeInt64(0, f),
                    this.iVersion == 3)
                    this.newdata.put(c, new d.BinBuffer(p.getBuffer()));
                else {
                    var w = this.data.get(c),
                        T = d.TypeHelp.INT64;
                    w == null && (w = new d.Map(d.STRING, d.STRING)),
                        w.put(T, new Uint8Array(p.getBuffer())),
                        this.data.put(c, w)
                }
            },
            d.Wup.prototype.writeFloat = function (c, f) {
                var p = new d.JceOutputStream;
                if (p.writeFloat(0, f),
                    this.iVersion == 3)
                    this.newdata.put(c, new d.BinBuffer(p.getBuffer()));
                else {
                    var w = this.data.get(c),
                        T = d.TypeHelp.FLOAT;
                    w == null && (w = new d.Map(d.STRING, d.STRING)),
                        w.put(T, new Uint8Array(p.getBuffer())),
                        this.data.put(c, w)
                }
            },
            d.Wup.prototype.writeDouble = function (c, f) {
                var p = new d.JceOutputStream;
                if (p.writeDouble(0, f),
                    this.iVersion == 3)
                    this.newdata.put(c, new d.BinBuffer(p.getBuffer()));
                else {
                    var w = this.data.get(c),
                        T = d.TypeHelp.DOUBLE;
                    w == null && (w = new d.Map(d.STRING, d.STRING)),
                        w.put(T, new Uint8Array(p.getBuffer())),
                        this.data.put(c, w)
                }
            },
            d.Wup.prototype.writeString = function (c, f) {
                var p = new d.JceOutputStream;
                if (p.writeString(0, f),
                    this.iVersion == 3)
                    this.newdata.put(c, new d.BinBuffer(p.getBuffer()));
                else {
                    var w = this.data.get(c),
                        T = d.TypeHelp.STRING;
                    w == null && (w = new d.Map(d.STRING, d.STRING)),
                        w.put(T, new Uint8Array(p.getBuffer())),
                        this.data.put(c, w)
                }
            },
            d.Wup.prototype.writeVector = function (c, f) {
                var p = new d.JceOutputStream;
                if (p.writeVector(0, f),
                    this.iVersion == 3)
                    this.newdata.put(c, new d.BinBuffer(p.getBinBuffer()));
                else {
                    var w = this.data.get(c),
                        T = f._className();
                    w == null && (w = new d.Map(d.STRING, d.STRING)),
                        w.put(T, new Uint8Array(p.getBuffer())),
                        this.data.put(c, w)
                }
            },
            d.Wup.prototype.writeStruct = function (c, f) {
                var p = new d.JceOutputStream;
                if (p.writeStruct(0, f),
                    this.iVersion == 3)
                    this.newdata.put(c, new d.BinBuffer(p.getBuffer()));
                else {
                    var w = this.data.get(c);
                    w == null && (w = new d.Map(d.STRING, d.STRING)),
                        w.put(" ", new Uint8Array(p.getBuffer())),
                        this.data.put(c, w)
                }
            },
            d.Wup.prototype.writeBytes = function (c, f) {
                var p = new d.JceOutputStream;
                if (p.writeBytes(0, f),
                    this.iVersion == 3)
                    this.newdata.put(c, new d.BinBuffer(p.getBuffer()));
                else {
                    var w = this.data.get(c);
                    w == null && (w = new d.Map(d.STRING, d.STRING)),
                        w.put("vec", new Uint8Array(p.getBuffer())),
                        this.data.put(c, w)
                }
            },
            d.Wup.prototype.writeMap = function (c, f) {
                var p = new d.JceOutputStream;
                if (p.writeMap(0, f),
                    this.iVersion == 3)
                    this.newdata.put(c, new d.BinBuffer(p.getBuffer()));
                else {
                    var w = this.data.get(c),
                        T = d.Util.getClassType(f);
                    w == null && (w = new d.Map(d.STRING, d.STRING)),
                        w.put(T, new Uint8Array(p.getBuffer())),
                        this.data.put(c, w)
                }
            },
            d.Wup.prototype.readFrom = function (c) {
                this.iVersion = c.readInt16(1, !0),
                    this.cPacketType = c.readInt8(2, !0),
                    this.iMessageType = c.readInt32(3, !0),
                    this.iRequestId = c.readInt32(4, !0),
                    this.sServantName = c.readString(5, !0),
                    this.sFuncName = c.readString(6, !0);
                try {
                    localStorage.__wup && console.info("%c@@@ " + this.sServantName + "." + this.sFuncName, "color:white;background:black;", this)
                } catch (f) { error(f); }
                this.sBuffer = c.readBytes(7, !0),
                    this.iTimeout = c.readInt32(8, !0),
                    this.context = c.readMap(9, !0, new d.Map(new d.STRING, new d.STRING)),
                    this.status = c.readMap(10, !0, new d.Map(new d.STRING, new d.STRING))
            },
            d.Wup.prototype.decode = function (c) {
                var f = new d.JceInputStream(c);
                if (f.buf.vew.getInt32(f.buf.position) < 4)
                    throw Error("packet length too short");
                f.buf.position += 4,
                    this.readFrom(f),
                    f = new d.JceInputStream(this.sBuffer.getBuffer()),
                    this.iVersion == 3 ? (this.newdata.clear(),
                        f.readMap(0, !0, this.newdata)) : (this.data.clear(),
                            f.readMap(0, !0, this.data))
            },
            d.Wup.prototype.readBoolean = function (c) {
                var f, p;
                if (this.iVersion == 3) {
                    if ((f = this.newdata.get(c)) == null)
                        throw Error("UniAttribute not found key:" + c);
                    p = new d.JceInputStream(f.buffer).readBoolean(0, !0, p)
                } else {
                    if ((f = this.data.get(c)) == null)
                        throw Error("UniAttribute not found key:" + c);
                    var w = d.TypeHelp.BOOLEAN,
                        T = f.get(w);
                    if (T == null)
                        throw Error("UniAttribute not found type:" + w);
                    p = new d.JceInputStream(T).readBoolean(0, !0, p)
                }
                return p
            },
            d.Wup.prototype.readInt8 = function (c) {
                var f, p;
                if (this.iVersion == 3) {
                    if ((f = this.newdata.get(c)) == null)
                        throw Error("UniAttribute not found key:" + c);
                    p = new d.JceInputStream(f.buffer).readInt8(0, !0, p)
                } else {
                    if ((f = this.data.get(c)) == null)
                        throw Error("UniAttribute not found key:" + c);
                    var w = d.TypeHelp.CHAR,
                        T = f.get(w);
                    if (T == null)
                        throw Error("UniAttribute not found type:" + w);
                    p = new d.JceInputStream(T).readInt8(0, !0, p)
                }
                return p
            },
            d.Wup.prototype.readInt16 = function (c) {
                var f, p;
                if (this.iVersion == 3) {
                    if ((f = this.newdata.get(c)) == null)
                        throw Error("UniAttribute not found key:" + c);
                    p = (B = new d.JceInputStream(f.buffer)).readInt16(0, !0, p)
                } else {
                    if ((f = this.data.get(c)) == null)
                        throw Error("UniAttribute not found key:" + c);
                    var w = d.TypeHelp.SHORT,
                        T = f.get(w),
                        B = new d.JceInputStream(T);
                    if (T == null)
                        throw Error("UniAttribute not found type:" + w);
                    p = B.readInt16(0, !0, p)
                }
                return p
            },
            d.Wup.prototype.readInt32 = function (c) {
                var f, p;
                if (this.iVersion == 3) {
                    if ((f = this.newdata.get(c)) == null)
                        throw Error("UniAttribute not found key:" + c);
                    p = new d.JceInputStream(f.buffer).readInt32(0, !0, p)
                } else {
                    if ((f = this.data.get(c)) == null)
                        throw Error("UniAttribute not found key:" + c);
                    var w = d.TypeHelp.INT32,
                        T = f.get(w);
                    if (T == null)
                        throw Error("UniAttribute not found type:" + w);
                    p = new d.JceInputStream(T).readInt32(0, !0, p)
                }
                return p
            },
            d.Wup.prototype.readInt64 = function (c) {
                var f, p;
                if (this.iVersion == 3) {
                    if ((f = this.newdata.get(c)) == null)
                        throw Error("UniAttribute not found key:" + c);
                    p = new d.JceInputStream(f.buffer).readInt64(0, !0, p)
                } else {
                    if ((f = this.data.get(c)) == null)
                        throw Error("UniAttribute not found key:" + c);
                    var w = d.TypeHelp.INT64,
                        T = f.get(w);
                    if (T == null)
                        throw Error("UniAttribute not found type:" + w);
                    p = new d.JceInputStream(T).readInt64(0, !0, p)
                }
                return p
            },
            d.Wup.prototype.readFloat = function (c) {
                var f, p;
                if (this.iVersion == 3) {
                    if ((f = this.newdata.get(c)) == null)
                        throw Error("UniAttribute not found key:" + c);
                    p = new d.JceInputStream(f.buffer).readFloat(0, !0, p)
                } else {
                    if ((f = this.data.get(c)) == null)
                        throw Error("UniAttribute not found key:" + c);
                    var w = d.TypeHelp.FLOAT,
                        T = f.get(w);
                    if (T == null)
                        throw Error("UniAttribute not found type:" + w);
                    p = new d.JceInputStream(T).readFloat(0, !0, p)
                }
                return p
            },
            d.Wup.prototype.readDouble = function (c) {
                var f;
                if (this.iVersion == 3) {
                    if ((f = this.newdata.get(c)) == null)
                        throw Error("UniAttribute not found key:" + c);
                    var p = new d.JceInputStream(f.buffer);
                    def = p.readDouble(0, !0, def)
                } else {
                    if ((f = this.data.get(c)) == null)
                        throw Error("UniAttribute not found key:" + c);
                    var w = d.TypeHelp.DOUBLE,
                        T = f.get(w);
                    if (T == null)
                        throw Error("UniAttribute not found type:" + w);
                    p = new d.JceInputStream(T),
                        def = p.readDouble(0, !0, def)
                }
                return def
            },
            d.Wup.prototype.readVector = function (c, f, p) {
                var w;
                if (this.iVersion == 3) {
                    if ((w = this.newdata.get(c)) == null)
                        throw Error("UniAttribute not found key:" + c);
                    f = new d.JceInputStream(w.buffer).readVector(0, !0, f)
                } else {
                    if ((w = this.data.get(c)) == null)
                        throw Error("UniAttribute not found key:" + c);
                    var T = w.get(p);
                    if (T == null)
                        throw Error("UniAttribute not found type:" + p);
                    f = new d.JceInputStream(T).readVector(0, !0, f)
                }
                return f
            },
            d.Wup.prototype.readStruct = function (c, f, p) {
                var w;
                if (this.iVersion == 3) {
                    if ((w = this.newdata.get(c)) == null)
                        throw Error("UniAttribute not found key:" + c);
                    f = new d.JceInputStream(w.buffer).readStruct(0, !0, f)
                } else {
                    if ((w = this.data.get(c)) == null)
                        throw Error("UniAttribute not found key:" + c);
                    var T = w.get(p);
                    if (T == null)
                        throw Error("UniAttribute not found type:" + p);
                    f = new d.JceInputStream(T).readStruct(0, !0, f)
                }
                return f
            },
            d.Wup.prototype.readMap = function (c, f, p) {
                var w;
                if (this.iVersion == 3) {
                    if ((w = this.newdata.get(c)) == null)
                        throw Error("UniAttribute not found key:" + c);
                    f = new d.JceInputStream(w.buffer).readMap(0, !0, f)
                } else {
                    if ((w = this.data.get(c)) == null)
                        throw Error("UniAttribute not found key:" + c);
                    var T = w.get(p);
                    if (T == null)
                        throw Error("UniAttribute not found type:" + p);
                    f = new d.JceInputStream(T).readMap(0, !0, f)
                }
                return f
            },
            d.Wup.prototype.readBytes = function (c, f, p) {
                var w;
                if (this.iVersion == 3) {
                    if ((w = this.newdata.get(c)) == null)
                        throw Error("UniAttribute not found key:" + c);
                    f = new d.JceInputStream(w.buffer).readBytes(0, !0, f)
                } else {
                    if ((w = this.data.get(c)) == null)
                        throw Error("UniAttribute not found key:" + c);
                    var T = w.get(p);
                    if (T == null)
                        throw Error("UniAttribute not found type:" + p);
                    f = new d.JceInputStream(T).readBytes(0, !0, f)
                }
                return f
            },
            d.DataHelp = {
                EN_INT8: 0,
                EN_INT16: 1,
                EN_INT32: 2,
                EN_INT64: 3,
                EN_FLOAT: 4,
                EN_DOUBLE: 5,
                EN_STRING1: 6,
                EN_STRING4: 7,
                EN_MAP: 8,
                EN_LIST: 9,
                EN_STRUCTBEGIN: 10,
                EN_STRUCTEND: 11,
                EN_ZERO: 12,
                EN_SIMPLELIST: 13
            },
            d.TypeHelp = {
                BOOLEAN: "bool",
                CHAR: "char",
                SHORT: "short",
                INT32: "int32",
                INT64: "int64",
                FLOAT: "float",
                DOUBLE: "double",
                STRING: "string",
                VECTOR: "list<$t>",
                MAP: "map<$k, $v>"
            },
            d.BinBuffer = function (c) {
                this.buf = null;
                    this.vew = null;
                    this.len = 0;
                    this.position = 0;
                    c != null && c != null && c instanceof d.BinBuffer && (this.buf = c.buf,
                        this.vew = new DataView(this.buf),
                        this.len = c.length,
                        this.position = c.position);
                    c != null && c != null && c instanceof ArrayBuffer && (this.buf = c,
                        this.vew = new DataView(this.buf),
                        this.len = this.vew.byteLength,
                        this.position = 0);
                    this.__defineGetter__("length", function () {
                        return this.len
                    }),
                    this.__defineGetter__("buffer", function () {
                        return this.buf
                    })
            },
            d.BinBuffer.prototype._write = function (c, f, p) {
                return c.writeBytes(f, p)
            },
            d.BinBuffer.prototype._read = function (c, f, p) {
                return c.readBytes(f, !0, p)
            },
            d.BinBuffer.prototype._clone = function () {
                return new d.BinBuffer
            },
            d.BinBuffer.prototype.allocate = function (c) {
                if (c = this.position + c,
                    !(this.buf != null && this.buf.length > c)) {
                    var f = new ArrayBuffer(Math.max(256, 2 * c));
                    this.buf != null && (new Uint8Array(f).set(new Uint8Array(this.buf)),
                        this.buf = void 0),
                        this.buf = f,
                        this.vew = void 0,
                        this.vew = new DataView(this.buf)
                }
            },
            d.BinBuffer.prototype.getBuffer = function () {
                var c = new ArrayBuffer(this.len);
                return new Uint8Array(c).set(new Uint8Array(this.buf, 0, this.len)),
                    c
            },
            d.BinBuffer.prototype.memset = function (c, f, p) {
                this.allocate(p),
                    new Uint8Array(this.buf).set(new Uint8Array(c, f, p), this.position)
            },
            d.BinBuffer.prototype.writeInt8 = function (c) {
                this.allocate(1),
                    this.vew.setInt8(this.position, c),
                    this.position += 1,
                    this.len = this.position
            },
            d.BinBuffer.prototype.writeUInt8 = function (c) {
                this.allocate(1),
                    this.vew.setUint8(this.position++, c),
                    this.len = this.position
            },
            d.BinBuffer.prototype.writeInt16 = function (c) {
                this.allocate(2),
                    this.vew.setInt16(this.position, c),
                    this.position += 2,
                    this.len = this.position
            },
            d.BinBuffer.prototype.writeUInt16 = function (c) {
                this.allocate(2),
                    this.vew.setUint16(this.position, c),
                    this.position += 2,
                    this.len = this.position
            },
            d.BinBuffer.prototype.writeInt32 = function (c) {
                this.allocate(4),
                    this.vew.setInt32(this.position, c),
                    this.position += 4,
                    this.len = this.position
            },
            d.BinBuffer.prototype.writeUInt32 = function (c) {
                this.allocate(4),
                    this.vew.setUint32(this.position, c),
                    this.position += 4,
                    this.len = this.position
            },
            d.BinBuffer.prototype.writeInt64 = function (c) {
                if (typeof c == "string") {
                    this.allocate(8);
                    for (var f = 4294967296, p = 0, w = 0, T = (c = c.toLowerCase()).length, B = 0; B < T; B++) {
                        var J = c.charCodeAt(B) - 48;
                        9 < J && (J -= 39),
                            p = 10 * p + J,
                            w = 10 * w + Math.floor(p / f),
                            p %= f
                    }
                    return this.vew.setUint32(this.position, w),
                        this.vew.setUint32(this.position + 4, p),
                        this.position += 8,
                        void (this.len = this.position)
                }
                this.allocate(8),
                    this.vew.setUint32(this.position, parseInt(c / 4294967296)),
                    this.vew.setUint32(this.position + 4, c % 4294967296),
                    this.position += 8,
                    this.len = this.position
            },
            d.BinBuffer.prototype.writeFloat = function (c) {
                this.allocate(4),
                    this.vew.setFloat32(this.position, c),
                    this.position += 4,
                    this.len = this.position
            },
            d.BinBuffer.prototype.writeDouble = function (c) {
                this.allocate(8),
                    this.vew.setFloat64(this.position, c),
                    this.position += 8,
                    this.len = this.position
            },
            d.BinBuffer.prototype.writeString = function (c) {
                for (var f = [], p = 0; p < c.length; p++)
                    f.push(255 & c.charCodeAt(p));
                this.allocate(f.length),
                    new Uint8Array(this.buf).set(new Uint8Array(f), this.position),
                    this.position += f.length,
                    this.len = this.position
            },
            d.BinBuffer.prototype.writeBytes = function (c) {
                c.length != 0 && c.buf != null && (this.allocate(c.length),
                    new Uint8Array(this.buf).set(new Uint8Array(c.buf, 0, c.length), this.position),
                    this.position += c.length,
                    this.len = this.position)
            },
            d.BinBuffer.prototype.readInt8 = function () {
                return this.vew.getInt8(this.position++)
            },
            d.BinBuffer.prototype.readInt16 = function () {
                return this.position += 2,
                    this.vew.getInt16(this.position - 2)
            },
            d.BinBuffer.prototype.readInt32 = function () {
                return this.position += 4,
                    this.vew.getInt32(this.position - 4)
            },
            d.BinBuffer.prototype.readUInt8 = function () {
                return this.position += 1,
                    this.vew.getUint8(this.position - 1)
            },
            d.BinBuffer.prototype.readUInt16 = function () {
                return this.position += 2,
                    this.vew.getUint16(this.position - 2)
            },
            d.BinBuffer.prototype.readUInt32 = function () {
                return this.position += 4,
                    this.vew.getUint32(this.position - 4)
            };
        var k = Math.pow(2, 53);
        function I(c) {
            var f = "";
            return typeof c == "function" ? f = new c()._className() : f = c._className(),
                f
        }
        d.BinBuffer.prototype.readInt64 = function () {
            var c = this.vew.getUint32(this.position),
                f = this.vew.getUint32(this.position + 4);
            this.position += 8;
            var p = 4294967296 * c + f;
            if (p < k)
                return p;
            for (var w, T, B, J = "", G = Math.pow(2, 32); c != 0 || f != 0;)
                J = (T = (B = (w = c % 10) * G + f) % 10).toString(10) + J,
                    c = (c - w) / 10,
                    f = (B - T) / 10;
            return J
        },
            d.BinBuffer.prototype.readFloat = function () {
                var c = this.vew.getFloat32(this.position);
                return this.position += 4,
                    c
            },
            d.BinBuffer.prototype.readDouble = function () {
                var c = this.vew.getFloat64(this.position);
                return this.position += 8,
                    c
            },
            d.BinBuffer.prototype.readString = function (c) {
                for (var f = [], p = 0; p < c; p++)
                    f.push(String.fromCharCode(this.vew.getUint8(this.position++)));
                var w = f.join("");
                try {
                    w = decodeURIComponent(escape(w))
                } catch (T) { error(T); }
                return w
            },
            d.BinBuffer.prototype.readBytes = function (c) {
                var f = new d.BinBuffer;
                return f.allocate(c),
                    f.memset(this.buf, this.position, c),
                    f.position = 0,
                    f.len = c,
                    this.position = this.position + c,
                    f
            },
            d.JceOutputStream = function () {
                this.buf = new d.BinBuffer,
                    this.getBinBuffer = function () {
                        return this.buf
                    },
                    this.getBuffer = function () {
                        return this.buf.getBuffer()
                    }
            },
            d.JceOutputStream.prototype.writeTo = function (c, f) {
                c < 15 ? this.buf.writeUInt8(c << 4 & 240 | f) : this.buf.writeUInt16((240 | f) << 8 | c)
            },
            d.JceOutputStream.prototype.writeBoolean = function (c, f) {
                this.writeInt8(c, f == 1 ? 1 : 0)
            },
            d.JceOutputStream.prototype.writeInt8 = function (c, f) {
                f == 0 ? this.writeTo(c, d.DataHelp.EN_ZERO) : (this.writeTo(c, d.DataHelp.EN_INT8),
                    this.buf.writeInt8(f))
            },
            d.JceOutputStream.prototype.writeInt16 = function (c, f) {
                -128 <= f && f <= 127 ? this.writeInt8(c, f) : (this.writeTo(c, d.DataHelp.EN_INT16),
                    this.buf.writeInt16(f))
            },
            d.JceOutputStream.prototype.writeInt32 = function (c, f) {
                -32768 <= f && f <= 32767 ? this.writeInt16(c, f) : (this.writeTo(c, d.DataHelp.EN_INT32),
                    this.buf.writeInt32(f))
            },
            d.JceOutputStream.prototype.writeInt64 = function (c, f) {
                -2147483648 <= f && f <= 2147483647 ? this.writeInt32(c, f) : (this.writeTo(c, d.DataHelp.EN_INT64),
                    this.buf.writeInt64(f))
            },
            d.JceOutputStream.prototype.writeUInt8 = function (c, f) {
                this.writeInt16(c, f)
            },
            d.JceOutputStream.prototype.writeUInt16 = function (c, f) {
                this.writeInt32(c, f)
            },
            d.JceOutputStream.prototype.writeUInt32 = function (c, f) {
                this.writeInt64(c, f)
            },
            d.JceOutputStream.prototype.writeFloat = function (c, f) {
                f == 0 ? this.writeTo(c, d.DataHelp.EN_ZERO) : (this.writeTo(c, d.DataHelp.EN_FLOAT),
                    this.buf.writeFloat(f))
            },
            d.JceOutputStream.prototype.writeDouble = function (c, f) {
                f == 0 ? this.writeTo(c, d.DataHelp.EN_ZERO) : (this.writeTo(c, d.DataHelp.EN_DOUBLE),
                    this.buf.writeDouble(f))
            },
            d.JceOutputStream.prototype.writeStruct = function (c, f) {
                if (f.writeTo == null)
                    throw Error("not defined writeTo Function");
                this.writeTo(c, d.DataHelp.EN_STRUCTBEGIN);
                    f.writeTo(this);
                    this.writeTo(0, d.DataHelp.EN_STRUCTEND);
            },
            d.JceOutputStream.prototype.writeString = function (c, f) {
                var p = Array.isArray(f) ? f.slice(0,2) : f;
                try {
                    p = unescape(encodeURIComponent(p))
                } catch (w) { error(w); }
                255 < p.length ? (this.writeTo(c, d.DataHelp.EN_STRING4),
                    this.buf.writeUInt32(p.length)) : (this.writeTo(c, d.DataHelp.EN_STRING1),
                        this.buf.writeUInt8(p.length)),
                    this.buf.writeString(p)
            },
            d.JceOutputStream.prototype.writeBytes = function (c, f) {
                this.writeTo(c, d.DataHelp.EN_SIMPLELIST),
                    this.writeTo(0, d.DataHelp.EN_INT8),
                    this.writeInt32(0, f.length),
                    this.buf.writeBytes(f)
            },
            d.JceOutputStream.prototype.writeVector = function (c, f) {
                var p = f.value.length;
                this.writeTo(c, d.DataHelp.EN_LIST),
                    this.writeInt32(0, p);
                for (var w = 0; w < p; w++)
                    (typeof f.proto == "function" ? new f.proto : f.proto)._write(this, 0, f.value[w])
            },
            d.JceOutputStream.prototype.writeMap = function (c, f) {
                for (var p in this.writeTo(c, d.DataHelp.EN_MAP),
                    this.writeInt32(0, f.size()),
                    f.value) {
                    var w = typeof f.kproto == "function" ? new f.kproto : f.kproto,
                        T = typeof f.vproto == "function" ? new f.vproto : f.vproto;
                    w._write(this, 0, p),
                        T._write(this, 1, f.value[p])
                }
            },
            d.JceInputStream = function (c) {
                this.buf = new d.BinBuffer(c)
            },
            d.JceInputStream.prototype.readFrom = function () {
                var c = this.buf.readUInt8(),
                    f = (240 & c) >> 4,
                    p = 15 & c;
                return 15 <= f && (f = this.buf.readUInt8()),
                {
                    tag: f,
                    type: p
                }
            },
            d.JceInputStream.prototype.peekFrom = function () {
                var c = this.buf.position,
                    f = this.readFrom();
                return this.buf.position = c,
                {
                    tag: f.tag,
                    type: f.type,
                    size: 15 <= f.tag ? 2 : 1
                }
            },
            d.JceInputStream.prototype.skipField = function (c) {
                switch (c) {
                    case d.DataHelp.EN_INT8:
                        this.buf.position += 1;
                        break;
                    case d.DataHelp.EN_INT16:
                        this.buf.position += 2;
                        break;
                    case d.DataHelp.EN_INT32:
                        this.buf.position += 4;
                        break;
                    case d.DataHelp.EN_INT64:
                        this.buf.position += 8;
                        break;
                    case d.DataHelp.EN_STRING1:
                        var f = this.buf.readUInt8();
                        this.buf.position += f;
                        break;
                    case d.DataHelp.EN_STRING4:
                        var p = this.buf.readInt32();
                        this.buf.position += p;
                        break;
                    case d.DataHelp.EN_STRUCTBEGIN:
                        this.skipToStructEnd();
                        break;
                    case d.DataHelp.EN_STRUCTEND:
                    case d.DataHelp.EN_ZERO:
                        break;
                    case d.DataHelp.EN_MAP:
                        for (var w = this.readInt32(0, !0), T = 0; T < 2 * w; ++T) {
                            var B = this.readFrom();
                            this.skipField(B.type)
                        }
                        break;
                    case d.DataHelp.EN_SIMPLELIST:
                        if ((B = this.readFrom()).type != d.DataHelp.EN_INT8)
                            throw Error("skipField with invalid type, type value: " + c + "," + B.type);
                        f = this.readInt32(0, !0),
                            this.buf.position += f;
                        break;
                    case d.DataHelp.EN_LIST:
                        for (w = this.readInt32(0, !0),
                            T = 0; T < w; ++T)
                            B = this.readFrom(),
                                this.skipField(B.type);
                        break;
                    case d.DataHelp.EN_FLOAT:
                        this.buf.position += 4;
                        break;
                    case d.DataHelp.EN_DOUBLE:
                        this.buf.position += 8;
                        break;
                    default:
                        throw new Error("skipField with invalid type, type value: " + c)
                }
            },
            d.JceInputStream.prototype.skipToStructEnd = function () {
                for (; ;) {
                    var c = this.readFrom();
                    if (this.skipField(c.type),
                        c.type == d.DataHelp.EN_STRUCTEND)
                        return
                }
            },
            d.JceInputStream.prototype.skipToTag = function (c, f) {
                for (; this.buf.position < this.buf.length;) {
                    var p = this.peekFrom();
                    if (c <= p.tag || p.type == d.DataHelp.EN_STRUCTEND)
                        return p.type != d.DataHelp.EN_STRUCTEND && c == p.tag;
                    this.buf.position += p.size,
                        this.skipField(p.type);
                }
                if (f)
                    throw Error("require field not exist, tag:" + c);
                return !1
            },
            d.JceInputStream.prototype.readBoolean = function (c, f, p) {
                return this.readInt8(c, f, p) == 1
            },
            d.JceInputStream.prototype.readInt8 = function (c, f, p) {
                if (this.skipToTag(c, f) == 0)
                    return p;
                var w = this.readFrom();
                switch (w.type) {
                    case d.DataHelp.EN_ZERO:
                        return 0;
                    case d.DataHelp.EN_INT8:
                        return this.buf.readInt8()
                }
                throw Error("read int8 type mismatch, tag:" + c + ", get type:" + w.type)
            },
            d.JceInputStream.prototype.readInt16 = function (c, f, p) {
                if (this.skipToTag(c, f) == 0)
                    return p;
                var w = this.readFrom();
                switch (w.type) {
                    case d.DataHelp.EN_ZERO:
                        return 0;
                    case d.DataHelp.EN_INT8:
                        return this.buf.readInt8();
                    case d.DataHelp.EN_INT16:
                        return this.buf.readInt16()
                }
                throw Error("read int8 type mismatch, tag:" + c + ", get type:" + w.type)
            },
            d.JceInputStream.prototype.readInt32 = function (c, f, p) {
                if (this.skipToTag(c, f) == 0)
                    return p;
                var w = this.readFrom();
                switch (w.type) {
                    case d.DataHelp.EN_ZERO:
                        return 0;
                    case d.DataHelp.EN_INT8:
                        return this.buf.readInt8();
                    case d.DataHelp.EN_INT16:
                        return this.buf.readInt16();
                    case d.DataHelp.EN_INT32:
                        return this.buf.readInt32()
                }
                throw Error("read int8 type mismatch, tag:" + c + ", get type:" + w.type)
            },
            d.JceInputStream.prototype.readInt64 = function (c, f, p) {
                if (this.skipToTag(c, f) == 0)
                    return p;
                switch (this.readFrom().type) {
                    case d.DataHelp.EN_ZERO:
                        return 0;
                    case d.DataHelp.EN_INT8:
                        return this.buf.readInt8();
                    case d.DataHelp.EN_INT16:
                        return this.buf.readInt16();
                    case d.DataHelp.EN_INT32:
                        return this.buf.readInt32();
                    case d.DataHelp.EN_INT64:
                        return this.buf.readInt64()
                }
                throw Error("read int64 type mismatch, tag:" + c + ", get type:" + h.type)
            },
            d.JceInputStream.prototype.readFloat = function (c, f, p) {
                if (this.skipToTag(c, f) == 0)
                    return p;
                switch (this.readFrom().type) {
                    case d.DataHelp.EN_ZERO:
                        return 0;
                    case d.DataHelp.EN_FLOAT:
                        return this.buf.readFloat()
                }
                throw Error("read float type mismatch, tag:" + c + ", get type:" + h.type)
            },
            d.JceInputStream.prototype.readDouble = function (c, f, p) {
                if (this.skipToTag(c, f) == 0)
                    return p;
                switch (this.readFrom().type) {
                    case d.DataHelp.EN_ZERO:
                        return 0;
                    case d.DataHelp.EN_DOUBLE:
                        return this.buf.readDouble()
                }
                throw Error("read double type mismatch, tag:" + c + ", get type:" + h.type)
            },
            d.JceInputStream.prototype.readUInt8 = function (c, f, p) {
                return this.readInt16(c, f, p)
            },
            d.JceInputStream.prototype.readUInt16 = function (c, f, p) {
                return this.readInt32(c, f, p)
            },
            d.JceInputStream.prototype.readUInt32 = function (c, f, p) {
                return this.readInt64(c, f, p)
            },
            d.JceInputStream.prototype.readStruct = function (c, f, p) {
                if (this.skipToTag(c, f) == 0)
                    return p;
                var w = this.readFrom();
                if (w.type != d.DataHelp.EN_STRUCTBEGIN)
                    throw Error("read struct type mismatch, tag: " + c + ", get type:" + w.type);
                return p.readFrom(this),
                    this.skipToStructEnd(),
                    p;
            },
            d.JceInputStream.prototype.readString = function (c, f, p) {
                if (this.skipToTag(c, f) == 0)
                    return p;
                var w = this.readFrom();
                if (w.type == d.DataHelp.EN_STRING1)
                    return this.buf.readString(this.buf.readUInt8());
                if (w.type == d.DataHelp.EN_STRING4)
                    return this.buf.readString(this.buf.readUInt32());
                throw Error("read 'string' type mismatch, tag: " + c + ", get type: " + w.type + ".")
            },
            d.JceInputStream.prototype.readString2 = function (c, f, p) {
                if (this.skipToTag(c, f) == 0)
                    return p;
                var w = this.readFrom();
                if (w.type == d.DataHelp.EN_STRING1)
                    return this.buf.readBytes(this.buf.readUInt8());
                if (w.type == d.DataHelp.EN_STRING4)
                    return this.buf.readBytes(this.buf.readUInt32());
                throw Error("read 'string' type mismatch, tag: " + c + ", get type: " + w.type + ".")
            },
            d.JceInputStream.prototype.readBytes = function (c, f, p) {
                if (this.skipToTag(c, f) == 0)
                    return p;
                var w = this.readFrom();
                if (w.type == d.DataHelp.EN_SIMPLELIST) {
                    var T = this.readFrom();
                    if (T.type != d.DataHelp.EN_INT8)
                        throw Error("type mismatch, tag:" + c + ",type:" + w.type + "," + T.type);
                    if ((B = this.readInt32(0, !0)) < 0)
                        throw Error("invalid size, tag:" + c + ",type:" + w.type + "," + T.type);
                    return this.buf.readBytes(B)
                }
                if (w.type != d.DataHelp.EN_LIST)
                    throw Error("type mismatch, tag:" + c + ",type:" + w.type);
                var B = this.readInt32(0, !0);
                return this.buf.readBytes(B)
            },
            d.JceInputStream.prototype.readVector = function (c, f, p) {
                if (this.skipToTag(c, f) == 0)
                    return p;
                var w = this.readFrom();
                if (w.type != d.DataHelp.EN_LIST)
                    throw Error("read 'vector' type mismatch, tag: " + c + ", get type: " + w.type);
                var T = this.readInt32(0, !0);
                if (T < 0)
                    throw Error("invalid size, tag: " + c + ", type: " + w.type + ", size: " + T);
                for (var B = 0; B < T; ++B) {
                    var J = typeof p.proto == "function" ? new p.proto : p.proto;
                    p.value.push(J._read(this, 0, J._clone()))
                }
                return p
            },
            d.JceInputStream.prototype.readMap = function (c, f, p) {
                if (this.skipToTag(c, f) == 0)
                    return p;
                var w = this.readFrom();
                if (w.type != d.DataHelp.EN_MAP)
                    throw Error("read 'map' type mismatch, tag: " + c + ", get type: " + w.type);
                var T = this.readInt32(0, !0);
                if (T < 0)
                    throw Error("invalid map, tag: " + c + ", size: " + T);
                for (var B = 0; B < T; B++) {
                    var J = typeof p.kproto == "function" ? new p.kproto : p.kproto,
                        G = typeof p.vproto == "function" ? new p.vproto : p.vproto,
                        ne = J._read(this, 0, J._clone()),
                        ue = G._read(this, 1, G._clone());
                    p.put(ne, ue)
                }
                return p
            },
            d.Util = d.Util || {},
            d.Util.jcestream = function (c, f) {
                if (c != null && c != null) {
                    if (c instanceof ArrayBuffer) {
                        for (var p = new Uint8Array(c), w = "", T = 0; T < p.length; T++)
                            w += (15 < p[T] ? "" : "0") + p[T].toString(16);
                        var B = w.toUpperCase();
                        return console.log(B),
                            B
                    }
                    console.log("Taf.Util.jcestream::value is not ArrayBuffer")
                } else
                    console.log("Taf.Util.jcestream::value is null or undefined")
            },
            d.Util.str2ab = function (c) {
                var f, p = c.length, w = new Array(p);
                for (f = 0; f < p; ++f)
                    w[f] = c.charCodeAt(f);
                return new Uint8Array(w).buffer
            },
            d.Util.ajax = function (c, f, p, w) {
                var T = new XMLHttpRequest;
                T.overrideMimeType("text/plain; charset=x-user-defined"),
                    T.addEventListener("readystatechange", function B() {
                        T.readyState === 4 && (T.status === 200 || T.status === 304 ? p(d.Util.str2ab(T.response)) : w(T.status),
                            T.removeEventListener("readystatechange", B),
                            T = void 0)
                    }),
                    T.open("post", c),
                    T.send(f)
            },
            d.INT8 = function () {
                this._clone = function () {
                    return 0
                },
                    this._write = function (c, f, p) {
                        return c.writeInt8(f, p)
                    },
                    this._read = function (c, f, p) {
                        return c.readInt8(f, !0, p)
                    },
                    this._className = function () {
                        return d.CHAR
                    }
            },
            d.INT16 = function () {
                this._clone = function () {
                    return 0
                },
                    this._write = function (c, f, p) {
                        return c.writeInt16(f, p)
                    },
                    this._read = function (c, f, p) {
                        return c.readInt16(f, !0, p)
                    },
                    this._className = function () {
                        return d.SHORT
                    }
            },
            d.INT32 = function () {
                this._clone = function () {
                    return 0
                },
                    this._write = function (c, f, p) {
                        return c.writeInt32(f, p)
                    },
                    this._read = function (c, f, p) {
                        return c.readInt32(f, !0, p)
                    },
                    this._className = function () {
                        return d.INT32
                    }
            },
            d.INT64 = function () {
                this._clone = function () {
                    return 0
                },
                    this._write = function (c, f, p) {
                        return c.writeInt64(f, p)
                    },
                    this._read = function (c, f, p) {
                        return c.readInt64(f, !0, p)
                    },
                    this._className = function () {
                        return d.INT64
                    }
            },
            d.UINT8 = function () {
                this._clone = function () {
                    return 0
                },
                    this._write = function (c, f, p) {
                        return c.writeInt16(f, p)
                    },
                    this._read = function (c, f, p) {
                        return c.readInt16(f, !0, p)
                    },
                    this._className = function () {
                        return d.SHORT
                    }
            },
            d.UInt16 = function () {
                this._clone = function () {
                    return 0
                },
                    this._write = function (c, f, p) {
                        return c.writeInt32(f, p)
                    },
                    this._read = function (c, f, p) {
                        return c.readInt32(f, !0, p)
                    },
                    this._className = function () {
                        return d.INT32
                    }
            },
            d.UInt32 = function () {
                this._clone = function () {
                    return 0
                },
                    this._write = function (c, f, p) {
                        return c.writeInt64(f, p)
                    },
                    this._read = function (c, f, p) {
                        return c.readInt64(f, !0, p)
                    },
                    this._className = function () {
                        return d.INT64
                    }
            },
            d.Float = function () {
                this._clone = function () {
                    return 0
                },
                    this._write = function (c, f, p) {
                        return c.writeFloat(f, p)
                    },
                    this._read = function (c, f, p) {
                        return c.readFloat(f, !0, p)
                    },
                    this._className = function () {
                        return d.FLOAT
                    }
            },
            d.Double = function () {
                this._clone = function () {
                    return 0
                },
                    this._write = function (c, f, p) {
                        return c.writeDouble(f, p)
                    },
                    this._read = function (c, f, p) {
                        return c.readDouble(f, !0, p)
                    },
                    this._className = function () {
                        return d.DOUBLE
                    }
            },
            d.STRING = function () {
                this._clone = function () {
                    return 0
                },
                    this._write = function (c, f, p) {
                        return c.writeString(f, p)
                    },
                    this._read = function (c, f, p) {
                        return c.readString(f, !0, p)
                    },
                    this._className = function () {
                        return d.STRING
                    }
            },
            d.BOOLEAN = function () {
                this._clone = function () {
                    return !1
                },
                    this._write = function (c, f, p) {
                        return c.writeBoolean(f, p)
                    },
                    this._read = function (c, f, p) {
                        return c.readBoolean(f, !0, p)
                    },
                    this._className = function () {
                        return d.BOOLEAN
                    }
            },
            d.ENUM = function () {
                this._clone = function () {
                    return 0
                },
                    this._write = function (c, f, p) {
                        return c.writeInt32(f, p)
                    },
                    this._read = function (c, f, p) {
                        return c.readInt32(f, !0, p)
                    }
            },
            d.Vector = function (c) {
                this.proto = c,
                    this.value = []
            },
            d.Vector.prototype._clone = function () {
                return new d.Vector(typeof this.proto == "function" ? new this.proto : this.proto)
            },
            d.Vector.prototype._write = function (c, f, p) {
                return c.writeVector(f, p)
            },
            d.Vector.prototype._read = function (c, f, p) {
                return c.readVector(f, !0, p)
            },
            d.Vector.prototype._className = function () {
                var c = I(this.proto);
                return d.TypeHelp.VECTOR.replace("$t", c)
            },
            d.Map = function (c, f) {
                this.kproto = c,
                    this.vproto = f,
                    this.value = new Object
            },
            d.Map.prototype._clone = function () {
                var c = typeof this.kproto == "function" ? new this.kproto : this.kproto,
                    f = typeof this.vproto == "function" ? new this.vproto : this.vproto;
                return new d.Map(c, f)
            },
            d.Map.prototype._write = function (c, f, p) {
                return c.writeMap(f, p)
            },
            d.Map.prototype._read = function (c, f, p) {
                return c.readMap(f, !0, p)
            },
            d.Map.prototype.put = function (c, f) {
                this.value[c] = f
            },
            d.Map.prototype.get = function (c) {
                return this.value[c]
            },
            d.Map.prototype.remove = function (c) {
                delete this.value[c]
            },
            d.Map.prototype.clear = function () {
                this.value = new Object
            },
            d.Map.prototype.size = function () {
                var c = 0;
                for (var f in this.value)
                    c++;
                return c
            },
            d.Map.prototype._className = function () {
                var c = I(this.kproto),
                    f = I(this.vproto);
                return d.TypeHelp.Map.replace("$k", c).replace("$v", f)
            };
        var y = {
            EWebSocketCommandType: {
                EWSCmd_NULL: 0,
                EWSCmd_RegisterReq: 1,
                EWSCmd_RegisterRsp: 2,
                EWSCmd_WupReq: 3,
                EWSCmd_WupRsp: 4,
                EWSCmdC2S_HeartBeat: 5,
                EWSCmdS2C_HeartBeatAck: 6,
                EWSCmdS2C_MsgPushReq: 7,
                EWSCmdC2S_DeregisterReq: 8,
                EWSCmdS2C_DeRegisterRsp: 9,
                EWSCmdC2S_VerifyCookieReq: 10,
                EWSCmdS2C_VerifyCookieRsp: 11,
                EWSCmdC2S_VerifyHuyaTokenReq: 12,
                EWSCmdS2C_VerifyHuyaTokenRsp: 13,
                EWSCmdC2S_UNVerifyReq: 14,
                EWSCmdS2C_UNVerifyRsp: 15,
                EWSCmdC2S_RegisterGroupReq: 16,
                EWSCmdS2C_RegisterGroupRsp: 17,
                EWSCmdC2S_UnRegisterGroupReq: 18,
                EWSCmdS2C_UnRegisterGroupRsp: 19,
                EWSCmdC2S_HeartBeatReq: 20,
                EWSCmdS2C_HeartBeatRsp: 21,
                EWSCmdS2C_MsgPushReq_V2: 22,
                EWSCmdC2S_UpdateUserExpsReq: 23,
                EWSCmdS2C_UpdateUserExpsRsp: 24,
                EWSCmdC2S_WSHistoryMsgReq: 25,
                EWSCmdS2C_WSHistoryMsgRsp: 26,
                EWSCmdS2C_EnterP2P: 27,
                EWSCmdS2C_EnterP2PAck: 28,
                EWSCmdS2C_ExitP2P: 29,
                EWSCmdS2C_ExitP2PAck: 30,
                EWSCmdC2S_SyncGroupReq: 31,
                EWSCmdS2C_SyncGroupRsp: 32,
                EWSCmdC2S_UpdateUserInfoReq: 33,
                EWSCmdS2C_UpdateUserInfoRsp: 34,
                EWSCmdC2S_MsgAckReq: 35,
                EWSCmdS2C_MsgAckRsp: 36,
                EWSCmdC2S_CloudGameReq: 37,
                EWSCmdS2C_CloudGamePush: 38,
                EWSCmdS2C_CloudGameRsp: 39,
                EWSCmdS2C_RpcReq: 40,
                EWSCmdC2S_RpcRsp: 41,
                EWSCmdS2C_RpcRspRsp: 42,
                EWSCmdC2S_GetStunPortReq: 101,
                EWSCmdS2C_GetStunPortRsp: 102,
                EWSCmdC2S_WebRTCOfferReq: 103,
                EWSCmdS2C_WebRTCOfferRsp: 104,
                EWSCmdC2S_SignalUpgradeReq: 105,
                EWSCmdS2C_SignalUpgradeRsp: 106
            },
            ELiveSource: {
                PC_YY: 0,
                PC_HUYA: 1,
                MOBILE_HUYA: 2,
                WEB_HUYA: 3
            },
            EGender: {
                MALE: 0,
                FEMALE: 1
            },
            TemplateType: {
                PRIMARY: 1,
                RECEPTION: 2
            },
            EStreamLineType: {
                STREAM_LINE_OLD_YY: 0,
                STREAM_LINE_WS: 1,
                STREAM_LINE_NEW_YY: 2,
                STREAM_LINE_AL: 3,
                STREAM_LINE_HUYA: 4,
                STREAM_LINE_TX: 5,
                STREAM_LINE_CDN: 8,
                STREAM_LINE_HW: 6,
                STREAM_LINE_BD: 7,
                STREAM_LINE_GG: 9,
                STREAM_LINE_CF: 10,
                STREAM_LINE_QUICK_HUYA: 99
            },
            eUserOperation: {
                USER_IN: 1,
                USER_OUT: 2,
                USER_MOVE: 3
            },
            WebSocketCommand: function () {
                this.iCmdType = 0,
                    this.vData = new d.BinBuffer,
                    this.lRequestId = 0,
                    this.traceId = "",
                    this.iEncryptType = 0,
                    this.lTime = 0,
                    this.sMD5 = ""
            }
        };
        y.WebSocketCommand.prototype._clone = function () {
            return new y.WebSocketCommand
        },
            y.WebSocketCommand.prototype._write = function (c, f, p) {
                c.writeStruct(f, p)
            },
            y.WebSocketCommand.prototype._read = function (c, f, p) {
                return c.readStruct(f, !0, p)
            },
            y.WebSocketCommand.prototype.writeTo = function (c) {
                c.writeInt32(0, this.iCmdType),
                    c.writeBytes(1, this.vData),
                    c.writeInt64(2, this.lRequestId),
                    c.writeString(3, this.traceId),
                    c.writeInt32(4, this.iEncryptType),
                    c.writeInt64(5, this.lTime),
                    c.writeString(6, this.sMD5)
            },
            y.WebSocketCommand.prototype.readFrom = function (c) {
                this.iCmdType = c.readInt32(0, !1, this.iCmdType),
                    this.vData = c.readBytes(1, !1, this.vData),
                    this.lRequestId = c.readInt64(2, !1, this.lRequestId),
                    this.traceId = c.readString(3, !1, this.traceId),
                    this.iEncryptType = c.readInt32(4, !1, this.iEncryptType),
                    this.lTime = c.readInt64(5, !1, this.lTime),
                    this.sMD5 = c.readString(6, !1, this.sMD5)
            },
            y.WSRegisterRsp = function () {
                this.iResCode = 0,
                    this.lRequestId = 0,
                    this.sMessage = "",
                    this.sBCConnHost = ""
            },
            y.WSRegisterRsp.prototype._clone = function () {
                return new y.WSRegisterRsp
            },
            y.WSRegisterRsp.prototype._write = function (c, f, p) {
                c.writeStruct(f, p)
            },
            y.WSRegisterRsp.prototype._read = function (c, f, p) {
                return c.readStruct(f, !0, p)
            },
            y.WSRegisterRsp.prototype.readFrom = function (c) {
                this.iResCode = c.readInt32(0, !1, this.iResCode),
                    this.lRequestId = c.readInt64(1, !1, this.lRequestId),
                    this.sMessage = c.readString(2, !1, this.sMessage),
                    this.sBCConnHost = c.readString(3, !1, this.sBCConnHost)
            },
            y.WSPushMessage = function () {
                this.ePushType = 0,
                    this.iUri = 0,
                    this.sMsg = new d.BinBuffer,
                    this.iProtocolType = 0,
                    this.sGroupId = "",
                    this.lMsgId = 0,
                    this.iMsgTag = 0
            },
            y.WSPushMessage.prototype._clone = function () {
                return new y.WSPushMessage
            },
            y.WSPushMessage.prototype._write = function (c, f, p) {
                c.writeStruct(f, p)
            },
            y.WSPushMessage.prototype._read = function (c, f, p) {
                return c.readStruct(f, !0, p)
            },
            y.WSPushMessage.prototype.writeTo = function (c) {
                c.writeInt32(0, this.ePushType),
                    c.writeInt64(1, this.iUri),
                    c.writeBytes(2, this.sMsg),
                    c.writeInt32(3, this.iProtocolType),
                    c.writeString(4, this.sGroupId),
                    c.writeInt64(5, this.lMsgId),
                    c.writeInt32(6, this.iMsgTag)
            },
            y.WSPushMessage.prototype.readFrom = function (c) {
                this.ePushType = c.readInt32(0, !1, this.ePushType),
                    this.iUri = c.readInt64(1, !1, this.iUri),
                    this.sMsg = c.readBytes(2, !1, this.sMsg),
                    this.iProtocolType = c.readInt32(3, !1, this.iProtocolType),
                    this.sGroupId = c.readString(4, !1, this.sGroupId),
                    this.lMsgId = c.readInt64(5, !1, this.lMsgId),
                    this.iMsgTag = c.readInt32(6, !1, this.iMsgTag)
            },
            y.WSUserInfo = function () {
                this.lUid = 0,
                    this.bAnonymous = !0,
                    this.sGuid = "",
                    this.sToken = "",
                    this.lTid = 0,
                    this.lSid = 0,
                    this.lGroupId = 0,
                    this.lGroupType = 0,
                    this.sAppId = "",
                    this.sUA = ""
            },
            y.WSUserInfo.prototype._clone = function () {
                return new y.WSUserInfo
            },
            y.WSUserInfo.prototype._write = function (c, f, p) {
                c.writeStruct(f, p)
            },
            y.WSUserInfo.prototype._read = function (c, f, p) {
                return c.readStruct(f, !0, p)
            },
            y.WSUserInfo.prototype.writeTo = function (c) {
                c.writeInt64(0, this.lUid),
                    c.writeBoolean(1, this.bAnonymous),
                    c.writeString(2, this.sGuid),
                    c.writeString(3, this.sToken),
                    c.writeInt64(4, this.lTid),
                    c.writeInt64(5, this.lSid),
                    c.writeInt64(6, this.lGroupId),
                    c.writeInt64(7, this.lGroupType),
                    c.writeString(8, this.sAppId),
                    c.writeString(9, this.sUA)
            },
            y.WSUserInfo.prototype.readFrom = function (c) {
                this.lUid = c.readInt64(0, !1, this.lUid),
                    this.bAnonymous = c.readBoolean(1, !1, this.bAnonymous),
                    this.sGuid = c.readString(2, !1, this.sGuid),
                    this.sToken = c.readString(3, !1, this.sToken),
                    this.lTid = c.readInt64(4, !1, this.lTid),
                    this.lSid = c.readInt64(5, !1, this.lSid),
                    this.lGroupId = c.readInt64(6, !1, this.lGroupId),
                    this.lGroupType = c.readInt64(7, !1, this.lGroupType),
                    this.sAppId = c.readString(8, !1, this.sAppId),
                    this.sUA = c.readString(9, !1, this.sUA)
            },
            y.WSVerifyCookieReq = function () {
                this.lUid = 0,
                    this.sUA = "",
                    this.sCookie = "",
                    this.sGuid = "",
                    this.bAutoRegisterUid = 0,
                    this.sAppSrc = ""
            },
            y.WSVerifyCookieReq.prototype._clone = function () {
                return new y.WSVerifyCookieReq
            },
            y.WSVerifyCookieReq.prototype._write = function (c, f, p) {
                c.writeStruct(f, p)
            },
            y.WSVerifyCookieReq.prototype._read = function (c, f, p) {
                return c.readStruct(f, !0, p)
            },
            y.WSVerifyCookieReq.prototype.writeTo = function (c) {
                c.writeInt64(0, this.lUid),
                    c.writeString(1, this.sUA),
                    c.writeString(2, this.sCookie),
                    c.writeString(3, this.sGuid),
                    c.writeInt32(4, this.bAutoRegisterUid),
                    c.writeString(5, this.sAppSrc)
            },
            y.WSVerifyCookieRsp = function () {
                this.iValidate = 0
            },
            y.WSVerifyCookieRsp.prototype._clone = function () {
                return new y.WSVerifyCookieRsp
            },
            y.WSVerifyCookieRsp.prototype._write = function (c, f, p) {
                c.writeStruct(f, p)
            },
            y.WSVerifyCookieRsp.prototype._read = function (c, f, p) {
                return c.readStruct(f, !0, p)
            },
            y.WSVerifyCookieRsp.prototype.readFrom = function (c) {
                this.iValidate = c.readInt32(0, !1, this.iValidate)
            },
            y.WSVerifyHuyaTokenReq = function () {
                this.tId = new y.UserId,
                    this.bAutoRegisterUid = 0,
                    this.sAppSrc = ""
            },
            y.WSVerifyHuyaTokenReq.prototype._clone = function () {
                return new y.WSVerifyHuyaTokenReq
            },
            y.WSVerifyHuyaTokenReq.prototype._write = function (c, f, p) {
                c.writeStruct(f, p)
            },
            y.WSVerifyHuyaTokenReq.prototype._read = function (c, f, p) {
                return c.readStruct(f, !0, p)
            },
            y.WSVerifyHuyaTokenReq.prototype.writeTo = function (c) {
                c.writeStruct(0, this.tId),
                    c.writeInt32(1, this.bAutoRegisterUid),
                    c.writeString(2, this.sAppSrc)
            },
            y.WSVerifyHuyaTokenRsp = function () {
                this.iValidate = 0
            },
            y.WSVerifyHuyaTokenRsp.prototype._clone = function () {
                return new y.WSVerifyHuyaTokenRsp
            },
            y.WSVerifyHuyaTokenRsp.prototype._write = function (c, f, p) {
                c.writeStruct(f, p)
            },
            y.WSVerifyHuyaTokenRsp.prototype._read = function (c, f, p) {
                return c.readStruct(f, !0, p)
            },
            y.WSVerifyHuyaTokenRsp.prototype.readFrom = function (c) {
                this.iValidate = c.readInt32(0, !1, this.iValidate)
            },
            y.UserId = function () {
                this.lUid = 0,
                    this.sGuid = "",
                    this.sToken = "",
                    this.sHuYaUA = "",
                    this.sCookie = "",
                    this.iTokenType = 0,
                    this.sDeviceInfo = ""
            },
            y.UserId.prototype._clone = function () {
                return new y.UserId
            },
            y.UserId.prototype._write = function (c, f, p) {
                c.writeStruct(f, p)
            },
            y.UserId.prototype._read = function (c, f, p) {
                return c.readStruct(f, !0, p)
            },
            y.UserId.prototype.writeTo = function (c) {
                c.writeInt64(0, this.lUid),
                    c.writeString(1, this.sGuid),
                    c.writeString(2, this.sToken),
                    c.writeString(3, this.sHuYaUA),
                    c.writeString(4, this.sCookie),
                    c.writeInt32(5, this.iTokenType),
                    c.writeString(6, this.sDeviceInfo)
            },
            y.UserId.prototype.readFrom = function (c) {
                this.lUid = c.readInt64(0, !1, this.lUid),
                    this.sGuid = c.readString(1, !1, this.sGuid),
                    this.sToken = c.readString(2, !1, this.sToken),
                    this.sHuYaUA = c.readString(3, !1, this.sHuYaUA),
                    this.sCookie = c.readString(4, !1, this.sCookie),
                    this.iTokenType = c.readInt32(5, !1, this.iTokenType),
                    this.sDeviceInfo = c.readString(6, !1, this.sDeviceInfo)
            },
            y.WSRegisterGroupReq = function () {
                this.vGroupId = new d.Vector(new d.STRING),
                    this.sToken = ""
            },
            y.WSRegisterGroupReq.prototype._clone = function () {
                return new y.WSRegisterGroupReq
            },
            y.WSRegisterGroupReq.prototype._write = function (c, f, p) {
                c.writeStruct(f, p)
            },
            y.WSRegisterGroupReq.prototype._read = function (c, f, p) {
                return c.readStruct(f, !0, p)
            },
            y.WSRegisterGroupReq.prototype.writeTo = function (c) {
                c.writeVector(0, this.vGroupId),
                    c.writeString(1, this.sToken)
            },
            y.WSRegisterGroupRsp = function () {
                this.iResCode = 0,
                    this.vSupportP2PGroupId = new d.Vector(new d.STRING)
            },
            y.WSRegisterGroupRsp.prototype._clone = function () {
                return new y.WSRegisterGroupRsp
            },
            y.WSRegisterGroupRsp.prototype._write = function (c, f, p) {
                c.writeStruct(f, p)
            },
            y.WSRegisterGroupRsp.prototype._read = function (c, f, p) {
                return c.readStruct(f, !0, p)
            },
            y.WSRegisterGroupRsp.prototype.readFrom = function (c) {
                this.iResCode = c.readInt32(0, !1, this.iResCode),
                    this.vSupportP2PGroupId = c.readVector(1, !1, this.vSupportP2PGroupId)
            },
            y.WSUpdateUserInfoReq = function () {
                this.sAppSrc = "",
                    this.sGuid = "",
                    this.iReportMsgIdRatio = 0,
                    this.iSupportAck = 0,
                    this.tWSMsgStatInfo = new y.WSMsgStatInfo
            },
            y.WSUpdateUserInfoReq.prototype._clone = function () {
                return new y.WSUpdateUserInfoReq
            },
            y.WSUpdateUserInfoReq.prototype._write = function (c, f, p) {
                c.writeStruct(f, p)
            },
            y.WSUpdateUserInfoReq.prototype._read = function (c, f, p) {
                return c.readStruct(f, !0, p)
            },
            y.WSUpdateUserInfoReq.prototype.writeTo = function (c) {
                c.writeString(0, this.sAppSrc),
                    c.writeString(1, this.sGuid),
                    c.writeInt32(2, this.iReportMsgIdRatio),
                    c.writeInt32(3, this.iSupportAck),
                    c.writeStruct(6, this.tWSMsgStatInfo)
            },
            y.WSUpdateUserInfoRsp = function () {
                this.iResCode = 0,
                    this.iSupportAckMsgStat = 0
            },
            y.WSUpdateUserInfoRsp.prototype._clone = function () {
                return new y.WSUpdateUserInfoRsp
            },
            y.WSUpdateUserInfoRsp.prototype._write = function (c, f, p) {
                c.writeStruct(f, p)
            },
            y.WSUpdateUserInfoRsp.prototype._read = function (c, f, p) {
                return c.readStruct(f, !0, p)
            },
            y.WSUpdateUserInfoRsp.prototype.readFrom = function (c) {
                this.iResCode = c.readInt32(0, !1, this.iResCode),
                    this.iSupportAckMsgStat = c.readInt32(1, !1, this.iSupportAckMsgStat)
            },
            y.WSMsgStatInfo = function () {
                this.mSignalPushUriCount = new d.Map(new d.STRING, new d.Map(new d.INT64, new d.INT32)),
                    this.mP2pPushUriCount = new d.Map(new d.STRING, new d.Map(new d.INT64, new d.INT32)),
                    this.iSupportAckMsgStat = 0
            },
            y.WSMsgStatInfo.prototype._clone = function () {
                return new y.WSMsgStatInfo
            },
            y.WSMsgStatInfo.prototype._write = function (c, f, p) {
                c.writeStruct(f, p)
            },
            y.WSMsgStatInfo.prototype._read = function (c, f, p) {
                return c.readStruct(f, !0, p)
            },
            y.WSMsgStatInfo.prototype.writeTo = function (c) {
                c.writeMap(0, this.mSignalPushUriCount),
                    c.writeMap(1, this.mP2pPushUriCount),
                    c.writeInt32(3, this.iSupportAckMsgStat)
            },
            y.WSMsgStatInfo.prototype.readFrom = function (c) {
                this.mSignalPushUriCount = c.readMap(0, !1, this.mSignalPushUriCount),
                    this.mP2pPushUriCount = c.readMap(1, !1, this.mP2pPushUriCount),
                    this.iSupportAckMsgStat = c.readInt32(3, !1, this.iSupportAckMsgStat)
            },
            y.WSRedirect = function () {
                this.vRemoveIps = new d.Vector(new d.STRING),
                    this.sRedirectIp = ""
            },
            y.WSRedirect.prototype._clone = function () {
                return new y.WSRedirect
            },
            y.WSRedirect.prototype._write = function (c, f, p) {
                c.writeStruct(f, p)
            },
            y.WSRedirect.prototype._read = function (c, f, p) {
                return c.readStruct(f, !0, p)
            },
            y.WSRedirect.prototype.writeTo = function (c) {
                c.writeVector(0, this.vRemoveIps),
                    c.writeString(1, this.sRedirectIp)
            },
            y.WSRedirect.prototype.readFrom = function (c) {
                this.vRemoveIps = c.readVector(0, !1, this.vRemoveIps),
                    this.sRedirectIp = c.readString(1, !1, this.sRedirectIp)
            },
            y.WSPushMessage_V2 = function () {
                this.sGroupId = "",
                    this.vMsgItem = new d.Vector(new y.WSMsgItem)
            },
            y.WSPushMessage_V2.prototype._clone = function () {
                return new y.WSPushMessage_V2
            },
            y.WSPushMessage_V2.prototype._write = function (c, f, p) {
                c.writeStruct(f, p)
            },
            y.WSPushMessage_V2.prototype._read = function (c, f, p) {
                return c.readStruct(f, !0, p)
            },
            y.WSPushMessage_V2.prototype.writeTo = function (c) {
                c.writeString(0, this.sGroupId),
                    c.writeVector(1, this.vMsgItem)
            },
            y.WSPushMessage_V2.prototype.readFrom = function (c) {
                this.sGroupId = c.readString(0, !1, this.sGroupId),
                    this.vMsgItem = c.readVector(1, !1, this.vMsgItem)
            },
            y.WSMsgItem = function () {
                this.iUri = 0,
                    this.sMsg = new d.BinBuffer,
                    this.lMsgId = 0
            },
            y.WSMsgItem.prototype._clone = function () {
                return new y.WSMsgItem
            },
            y.WSMsgItem.prototype._write = function (c, f, p) {
                c.writeStruct(f, p)
            },
            y.WSMsgItem.prototype._read = function (c, f, p) {
                return c.readStruct(f, !0, p)
            },
            y.WSMsgItem.prototype.writeTo = function (c) {
                c.writeInt64(0, this.iUri),
                    c.writeBytes(1, this.sMsg),
                    c.writeInt64(2, this.lMsgId)
            },
            y.WSMsgItem.prototype.readFrom = function (c) {
                this.iUri = c.readInt64(0, !1, this.iUri),
                    this.sMsg = c.readBytes(1, !1, this.sMsg),
                    this.lMsgId = c.readInt64(2, !1, this.lMsgId)
            },
            y.LiveLaunchReq = function () {
                this.tId = new y.UserId,
                    this.tLiveUB = new y.LiveUserbase,
                    this.bSupportDomain = 0
            },
            y.LiveLaunchReq.prototype._clone = function () {
                return new y.LiveLaunchReq
            },
            y.LiveLaunchReq.prototype._write = function (c, f, p) {
                c.writeStruct(f, p)
            },
            y.LiveLaunchReq.prototype._read = function (c, f, p) {
                return c.readStruct(f, !0, p)
            },
            y.LiveLaunchReq.prototype.writeTo = function (c) {
                c.writeStruct(0, this.tId),
                    c.writeStruct(1, this.tLiveUB),
                    c.writeInt32(2, this.bSupportDomain)
            },
            y.LiveLaunchRsp = function () {
                this.sGuid = "",
                    this.iTime = 0,
                    this.vProxyList = new d.Vector(new y.LiveProxyValue),
                    this.eAccess = 0,
                    this.sClientIp = ""
            },
            y.LiveLaunchRsp.prototype._clone = function () {
                return new y.LiveLaunchRsp
            },
            y.LiveLaunchRsp.prototype._write = function (c, f, p) {
                c.writeStruct(f, p)
            },
            y.LiveLaunchRsp.prototype._read = function (c, f, p) {
                return c.readStruct(f, !0, p)
            },
            y.LiveLaunchRsp.prototype.readFrom = function (c) {
                this.sGuid = c.readString(0, !1, this.sGuid),
                    this.iTime = c.readInt32(1, !1, this.iTime),
                    this.vProxyList = c.readVector(2, !1, this.vProxyList),
                    this.eAccess = c.readInt32(3, !1, this.eAccess),
                    this.sClientIp = c.readString(4, !1, this.sClientIp)
            },
            y.LiveProxyValue = function () {
                this.eProxyType = 0,
                    this.sProxy = new d.Vector(new d.STRING)
            },
            y.LiveProxyValue.prototype._clone = function () {
                return new y.LiveProxyValue
            },
            y.LiveProxyValue.prototype._write = function (c, f, p) {
                c.writeStruct(f, p)
            },
            y.LiveProxyValue.prototype._read = function (c, f, p) {
                return c.readStruct(f, !0, p)
            },
            y.LiveProxyValue.prototype.writeTo = function (c) {
                c.writeInt32(0, this.eProxyType),
                    c.writeVector(1, this.sProxy)
            },
            y.LiveProxyValue.prototype.readFrom = function (c) {
                this.eProxyType = c.readInt32(0, !1, this.eProxyType),
                    this.sProxy = c.readVector(1, !1, this.sProxy)
            },
            y.WSLaunchReq = function () {
                this.lUid = 0,
                    this.sGuid = "",
                    this.sUA = "",
                    this.sAppSrc = "",
                    this.tDeviceInfo = new y.WSDeviceInfo
            },
            y.WSLaunchReq.prototype._clone = function () {
                return new y.WSLaunchReq
            },
            y.WSLaunchReq.prototype._write = function (c, f, p) {
                c.writeStruct(f, p)
            },
            y.WSLaunchReq.prototype._read = function (c, f, p) {
                return c.readStruct(f, !0, p)
            },
            y.WSLaunchReq.prototype.writeTo = function (c) {
                c.writeInt64(0, this.lUid),
                    c.writeString(1, this.sGuid),
                    c.writeString(2, this.sUA),
                    c.writeString(3, this.sAppSrc),
                    c.writeStruct(4, this.tDeviceInfo)
            },
            y.WSLaunchRsp = function () {
                this.sGuid = "",
                    this.sClientIp = ""
            },
            y.WSLaunchRsp.prototype._clone = function () {
                return new y.WSLaunchRsp
            },
            y.WSLaunchRsp.prototype._write = function (c, f, p) {
                c.writeStruct(f, p)
            },
            y.WSLaunchRsp.prototype._read = function (c, f, p) {
                return c.readStruct(f, !0, p)
            },
            y.WSLaunchRsp.prototype.readFrom = function (c) {
                this.sGuid = c.readString(0, !1, this.sGuid),
                    this.sClientIp = c.readString(1, !1, this.sClientIp)
            },
            y.WSDeviceInfo = function () {
                this.sIMEI = "",
                    this.sAPN = "",
                    this.sNetType = "",
                    this.sDeviceId = "",
                    this.sMId = ""
            },
            y.WSDeviceInfo.prototype._clone = function () {
                return new y.WSDeviceInfo
            },
            y.WSDeviceInfo.prototype._write = function (c, f, p) {
                c.writeStruct(f, p)
            },
            y.WSDeviceInfo.prototype._read = function (c, f, p) {
                return c.readStruct(f, !0, p)
            },
            y.WSDeviceInfo.prototype.writeTo = function (c) {
                c.writeString(0, this.sIMEI),
                    c.writeString(1, this.sAPN),
                    c.writeString(2, this.sNetType),
                    c.writeString(3, this.sDeviceId),
                    c.writeString(4, this.sMId)
            },
            y.WSDeviceInfo.prototype.readFrom = function (c) {
                this.sIMEI = c.readString(0, !1, this.sIMEI),
                    this.sAPN = c.readString(1, !1, this.sAPN),
                    this.sNetType = c.readString(2, !1, this.sNetType),
                    this.sDeviceId = c.readString(3, !1, this.sDeviceId),
                    this.sMId = c.readString(4, !1, this.sMId)
            },
            y.QueryHttpDnsReq = function () {
                this.lUid = 0,
                    this.sUA = "",
                    this.vDomain = new d.Vector(new d.STRING),
                    this.sAppSrc = "",
                    this.sClientIp = "",
                    this.iIpStack = 0,
                    this.iIpType = 0
            },
            y.QueryHttpDnsReq.prototype._clone = function () {
                return new y.QueryHttpDnsReq
            },
            y.QueryHttpDnsReq.prototype._write = function (c, f, p) {
                c.writeStruct(f, p)
            },
            y.QueryHttpDnsReq.prototype._read = function (c, f, p) {
                return c.readStruct(f, !0, p)
            },
            y.QueryHttpDnsReq.prototype.writeTo = function (c) {
                c.writeInt64(0, this.lUid),
                    c.writeString(1, this.sUA),
                    c.writeVector(2, this.vDomain),
                    c.writeString(3, this.sAppSrc),
                    c.writeString(4, this.sClientIp),
                    c.writeInt32(5, this.iIpStack),
                    c.writeInt32(6, this.iIpType)
            },
            y.QueryHttpDnsRsp = function () {
                this.mDomain2Ip = new d.Map(new d.STRING, new y.HttpDnsItem),
                    this.iEnvType = 0
            },
            y.QueryHttpDnsRsp.prototype._clone = function () {
                return new y.QueryHttpDnsRsp
            },
            y.QueryHttpDnsRsp.prototype._write = function (c, f, p) {
                c.writeStruct(f, p)
            },
            y.QueryHttpDnsRsp.prototype._read = function (c, f, p) {
                return c.readStruct(f, !0, p)
            },
            y.QueryHttpDnsRsp.prototype.readFrom = function (c) {
                this.mDomain2Ip = c.readMap(0, !1, this.mDomain2Ip),
                    this.iEnvType = c.readInt32(1, !1, this.iEnvType)
            },
            y.HttpDnsItem = function () {
                this.vIp = new d.Vector(new d.STRING),
                    this.iExpireTime = 0,
                    this.vIpv6 = new d.Vector(new d.STRING)
            },
            y.HttpDnsItem.prototype._clone = function () {
                return new y.HttpDnsItem
            },
            y.HttpDnsItem.prototype._write = function (c, f, p) {
                c.writeStruct(f, p)
            },
            y.HttpDnsItem.prototype._read = function (c, f, p) {
                return c.readStruct(f, !0, p)
            },
            y.HttpDnsItem.prototype.writeTo = function (c) {
                c.writeVector(0, this.vIp),
                    c.writeInt64(1, this.iExpireTime),
                    c.writeVector(2, this.vIpv6)
            },
            y.HttpDnsItem.prototype.readFrom = function (c) {
                this.vIp = c.readVector(0, !1, this.vIp),
                    this.iExpireTime = c.readInt64(1, !1, this.iExpireTime),
                    this.vIpv6 = c.readVector(2, !1, this.vIpv6)
            },
            y.MetricDetailSet = function () {
                this.tId = new y.UserId,
                    this.vMetricDetail = new d.Vector(new y.MetricDetail)
            },
            y.MetricDetailSet.prototype._clone = function () {
                return new y.MetricDetailSet
            },
            y.MetricDetailSet.prototype._write = function (c, f, p) {
                c.writeStruct(f, p)
            },
            y.MetricDetailSet.prototype._read = function (c, f, p) {
                return c.readStruct(f, !0, p)
            },
            y.MetricDetailSet.prototype.writeTo = function (c) {
                c.writeStruct(0, this.tId),
                    c.writeVector(1, this.vMetricDetail)
            },
            y.MetricDetailSet.prototype.readFrom = function (c) {
                this.tId = c.readStruct(0, !0, this.tId),
                    this.vMetricDetail = c.readVector(1, !0, this.vMetricDetail)
            },
            y.MetricDetail = function () {
                this.sMetricName = "",
                    this.iTS = 0,
                    this.vDimension = new d.Vector(new y.Dimension),
                    this.vFiled = new d.Vector(new y.Field),
                    this.vExLog = new d.Vector(new y.Dimension)
            },
            y.MetricDetail.prototype._clone = function () {
                return new y.MetricDetail
            },
            y.MetricDetail.prototype._write = function (c, f, p) {
                c.writeStruct(f, p)
            },
            y.MetricDetail.prototype._read = function (c, f, p) {
                return c.readStruct(f, !0, p)
            },
            y.MetricDetail.prototype.writeTo = function (c) {
                c.writeString(0, this.sMetricName),
                    c.writeInt64(1, this.iTS),
                    c.writeVector(2, this.vDimension),
                    c.writeVector(3, this.vFiled),
                    c.writeVector(4, this.vExLog)
            },
            y.MetricDetail.prototype.readFrom = function (c) {
                this.sMetricName = c.readString(0, !0, this.sMetricName),
                    this.iTS = c.readInt64(1, !1, this.iTS),
                    this.vDimension = c.readVector(2, !1, this.vDimension),
                    this.vFiled = c.readVector(3, !1, this.vFiled),
                    this.vExLog = c.readVector(4, !1, this.vExLog)
            },
            y.Field = function () {
                this.sName = "",
                    this.fValue = 0
            },
            y.Field.prototype._clone = function () {
                return new y.Field
            },
            y.Field.prototype._write = function (c, f, p) {
                c.writeStruct(f, p)
            },
            y.Field.prototype._read = function (c, f, p) {
                return c.readStruct(f, !0, p)
            },
            y.Field.prototype.writeTo = function (c) {
                c.writeString(0, this.sName),
                    c.writeDouble(1, this.fValue)
            },
            y.Field.prototype.readFrom = function (c) {
                this.sName = c.readString(0, !1, this.sName),
                    this.fValue = c.readDouble(1, !1, this.fValue)
            },
            y.Dimension = function () {
                this.sName = "",
                    this.sValue = ""
            },
            y.Dimension.prototype._clone = function () {
                return new y.Dimension
            },
            y.Dimension.prototype._write = function (c, f, p) {
                c.writeStruct(f, p)
            },
            y.Dimension.prototype._read = function (c, f, p) {
                return c.readStruct(f, !0, p)
            },
            y.Dimension.prototype.writeTo = function (c) {
                c.writeString(0, this.sName),
                    c.writeString(1, this.sValue)
            },
            y.Dimension.prototype.readFrom = function (c) {
                this.sName = c.readString(0, !1, this.sName),
                    this.sValue = c.readString(1, !1, this.sValue)
            },
            y.WSUnRegisterGroupReq = function () {
                this.vGroupId = new d.Vector(new d.STRING)
            },
            y.WSUnRegisterGroupReq.prototype._clone = function () {
                return new y.WSUnRegisterGroupReq
            },
            y.WSUnRegisterGroupReq.prototype._write = function (c, f, p) {
                c.writeStruct(f, p)
            },
            y.WSUnRegisterGroupReq.prototype._read = function (c, f, p) {
                return c.readStruct(f, !0, p)
            },
            y.WSUnRegisterGroupReq.prototype.writeTo = function (c) {
                c.writeVector(0, this.vGroupId)
            },
            y.WSUnRegisterGroupRsp = function () {
                this.iResCode = 0
            },
            y.WSUnRegisterGroupRsp.prototype._clone = function () {
                return new y.WSUnRegisterGroupRsp
            },
            y.WSUnRegisterGroupRsp.prototype._write = function (c, f, p) {
                c.writeStruct(f, p)
            },
            y.WSUnRegisterGroupRsp.prototype._read = function (c, f, p) {
                return c.readStruct(f, !0, p)
            },
            y.WSUnRegisterGroupRsp.prototype.readFrom = function (c) {
                this.iResCode = c.readInt32(0, !1, this.iResCode)
            },
            y.WSConnectParaInfo = function () {
                this.lUid = 0,
                    this.sGuid = "",
                    this.sUA = "",
                    this.sAppSrc = "",
                    this.sMid = "",
                    this.sExp = "",
                    this.iTokenType = 0,
                    this.sToken = "",
                    this.sCookie = "",
                    this.sTraceId = "",
                    this.mCustomHeaders = new d.Map(new d.STRING, new d.STRING)
            },
            y.WSConnectParaInfo.prototype._clone = function () {
                return new y.WSConnectParaInfo
            },
            y.WSConnectParaInfo.prototype._write = function (c, f, p) {
                c.writeStruct(f, p)
            },
            y.WSConnectParaInfo.prototype._read = function (c, f, p) {
                return c.readStruct(f, !0, p)
            },
            y.WSConnectParaInfo.prototype.writeTo = function (c) {
                c.writeInt64(0, this.lUid),
                    c.writeString(1, this.sGuid),
                    c.writeString(2, this.sUA),
                    c.writeString(3, this.sAppSrc),
                    c.writeString(4, this.sMid),
                    c.writeString(5, this.sExp),
                    c.writeInt32(6, this.iTokenType),
                    c.writeString(7, this.sToken),
                    c.writeString(8, this.sCookie),
                    c.writeString(9, this.sTraceId),
                    c.writeMap(10, this.mCustomHeaders)
            },
            y.WSConnectParaInfo.prototype.readFrom = function (c) {
                this.lUid = c.readInt64(0, !1, this.lUid),
                    this.sGuid = c.readString(1, !1, this.sGuid),
                    this.sUA = c.readString(2, !1, this.sUA),
                    this.sAppSrc = c.readString(3, !1, this.sAppSrc),
                    this.sMid = c.readString(4, !1, this.sMid),
                    this.sExp = c.readString(5, !1, this.sExp),
                    this.iTokenType = c.readInt32(6, !1, this.iTokenType),
                    this.sToken = c.readString(7, !1, this.sToken),
                    this.sCookie = c.readString(8, !1, this.sCookie),
                    this.sTraceId = c.readString(9, !1, this.sTraceId),
                    this.mCustomHeaders = c.readMap(10, !1, this.mCustomHeaders)
            },
            y.CloudGamePacket = function () {
                this.sToken = "",
                    this.sCommand = "",
                    this.packetBytes = new d.BinBuffer,
                    this.sRequestId = ""
            },
            y.CloudGamePacket.prototype._clone = function () {
                return new y.CloudGamePacket
            },
            y.CloudGamePacket.prototype._write = function (c, f, p) {
                c.writeStruct(f, p)
            },
            y.CloudGamePacket.prototype._read = function (c, f, p) {
                return c.readStruct(f, !0, p)
            },
            y.CloudGamePacket.prototype.writeTo = function (c) {
                c.writeString(0, this.sToken),
                    c.writeString(1, this.sCommand),
                    c.writeBytes(2, this.packetBytes),
                    c.writeString(3, this.sRequestId)
            },
            y.CloudGamePacket.prototype.readFrom = function (c) {
                this.sToken = c.readString(0, !1, this.sToken),
                    this.sCommand = c.readString(1, !1, this.sCommand),
                    this.packetBytes = c.readBytes(2, !1, this.packetBytes),
                    this.sRequestId = c.readString(3, !1, this.sRequestId)
            },
            y.WSUpdateUserExpsReq = function () {
                this.mExps = new d.Map(new d.STRING, new d.STRING)
            },
            y.WSUpdateUserExpsReq.prototype._clone = function () {
                return new y.WSUpdateUserExpsReq
            },
            y.WSUpdateUserExpsReq.prototype._write = function (c, f, p) {
                c.writeStruct(f, p)
            },
            y.WSUpdateUserExpsReq.prototype._read = function (c, f, p) {
                return c.readStruct(f, !0, p)
            },
            y.WSUpdateUserExpsReq.prototype.writeTo = function (c) {
                c.writeMap(0, this.mExps)
            },
            y.WSUpdateUserExpsRsp = function () {
                this.iResCode = 0
            },
            y.WSUpdateUserExpsRsp.prototype._clone = function () {
                return new y.WSUpdateUserExpsRsp
            },
            y.WSUpdateUserExpsRsp.prototype._write = function (c, f, p) {
                c.writeStruct(f, p)
            },
            y.WSUpdateUserExpsRsp.prototype._read = function (c, f, p) {
                return c.readStruct(f, !0, p)
            },
            y.WSUpdateUserExpsRsp.prototype.readFrom = function (c) {
                this.iResCode = c.readInt32(0, !1, this.iResCode)
            };
        var b = 0,
            E = 1,
            C = 2,
            O = -1,
            M = -3,
            $ = -10,
            R = -500,
            A = -10092,
            x = -10504,
            F = -20001,
            P = -20002,
            N = -20003,
            L = {
                storeDns: function (c, f) {
                    for (var p = "", w = this.getIpsKey(!0), T = c.join("|").toLocaleLowerCase(), B = 0, J = T.length; B < J; B++) {
                        var G = w[T.charAt(B)],
                            ne = Math.random() * G.length >> 0;
                        p += G.charAt(ne)
                    }
                    try {
                        localStorage["wssdns".concat(f)] = p
                    } catch (ue) { error(ue); }
                },
                getDns: function (c) {
                    var f = "";
                    try {
                        f = localStorage["wssdns".concat(c)]
                    } catch (J) { error(J); }
                    if (!f)
                        return [];
                    for (var p = "", w = this.getIpsKey(!1), T = 0, B = f.length; T < B; T++)
                        p += w[f.charAt(T)];
                    return p.split("|")
                },
                storeIps: function (c, f) {
                    for (var p = "", w = this.getIpsKey(!0), T = c.join("|").toLocaleLowerCase(), B = 0, J = T.length; B < J; B++) {
                        var G = w[T.charAt(B)],
                            ne = Math.random() * G.length >> 0;
                        p += G.charAt(ne)
                    }
                    try {
                        localStorage["wssips".concat(f)] = p
                    } catch (ue) { error(ue); }
                },
                getIps: function (c) {
                    var f = "";
                    try {
                        f = localStorage["wssips".concat(c)]
                    } catch (J) { error(J); }
                    if (!f)
                        return [];
                    for (var p = "", w = this.getIpsKey(!1), T = 0, B = f.length; T < B; T++)
                        p += w[f.charAt(T)];
                    return p.split("|")
                },
                getIpsKey: function (c) {
                    for (var f = ["-", ".", ":", "|"], p = "_N1Y%/ny^6?Mi7|wCe#$VmT=.GBut]3L*f<acX2Eop>d}WqKPQ@r;zx!s`(:IHFRZ~[A{Jb-O&D)v0Ukj95,8lg+h4S", w = {}, T = 0; T < 40; T++) {
                        var B = T < 11 ? 3 : 2,
                            J = p.substr(0, B);
                        p = p.substr(B);
                        var G = T + "";
                        if (13 < T ? G = String.fromCharCode(T + 83) : 9 < T && (G = f[T - 10]),
                            c)
                            w[G] = J;
                        else
                            for (var ne = 0; ne < J.length; ne++)
                                w[J.charAt(ne)] = G
                    }
                    return w
                },
                getQueryString: function (c) {
                    var f = new RegExp("(^|&)" + c + "=([^&]*)(&|$)"),
                        p = window.location.search.substr(1).match(f);
                    return p != null ? unescape(p[2]) : null
                },
                parseQueryString: function (c) {
                    for (var f = /([^\?\=\&]+)\=([^\?\=\&]*)/g, p = {}; f.exec(c);)
                        p[RegExp.$1] = RegExp.$2;
                    return p
                },
                ab2str: function (c, f) {
                    for (var p = new DataView(c), w = p.byteLength, T = 0, B = [], J = 0; J < w; J++)
                        B.push(String.fromCharCode(p.getUint8(T++)));
                    var G = B.join("");
                    if (f)
                        try {
                            G = decodeURIComponent(escape(G))
                        } catch (ne) { error(ne); }
                    return G
                },
                copy: function (c, f) {
                    for (var p in f)
                        c[p] = f[p];
                    return c
                },
                getTime: function () {
                    return performance && performance.now() || Date.now()
                }
            };
            var To$ = {
                ne : {
                    CommonResponse : function() {
                        this.code = 0,this.msg = "",this.data = "";
                        this.readFrom = function(e) {this.code = e.readInt32(0, !1, this.code),this.msg = e.readString(1, !1, this.msg),this.data = e.readString(2, !1, this.data)};
                        this.writeTo = function(e) {e.writeInt32(0, this.code),e.writeString(1, this.msg),e.writeString(2, this.data)};
                        this._clone = function() {return new To$.ne.CommonResponse};
                        this._write = function(e, t, r) {e.writeStruct(t, r)};
                        this._read = function(e, t, r) {return e.readStruct(t, !0, r)};
                    }
                },
                Map : function(c, f) {
                    this.kproto = c,this.vproto = f,this.value = new Object;
                    this._clone = function() {var c = typeof this.kproto == "function" ? new this.kproto : this.kproto, f = typeof this.vproto == "function" ? new this.vproto : this.vproto;return new To$.Map(c,f)},
                    this._write = function(c, f, p) {return c.writeMap(f, p)},
                    this._read = function(c, f, p) {return c.readMap(f, !0, p)},
                    this.put = function(c, f) {this.value[c] = f},
                    this.get = function(c) {return this.value[c]},
                    this.remove = function(c) {delete this.value[c]},
                    this.clear = function() {this.value = new Object},
                    this.size = function() {var c = 0;for (var f in this.value)c++;return c},
                    this._className = function() {var c = I(this.kproto), f = I(this.vproto);
                        return To$.TypeHelp.Map.replace("$k", c).replace("$v", f)};
                },
                STRING : function(){
                    this._clone = function() {return 0},
                    this._write = function(c, f, p) {return c.writeString(f, p)},
                    this._read = function(c, f, p) {return c.readString(f, !0, p)},
                    this._className = function() {return To$.STRING}
                },
                EGender : {
                    MALE: 0,
                    FEMALE: 1
                },

                UserBase : function() {
                    this.lUid = 0,this.sNickName = "",this.sAvatarUrl = "",this.iGender = 0,this.lYYId = 0,this.iCertified = 0,this.iSubscribedCount = 0,this.iSubscribeToCount = 0,this.iUserLevel = 0,this.lUserExp = 0,this.iBirthday = 0,this.sSign = "",this.sArea = "",this.sLocation = "",this.sRegisterTime = "",this.iFreezeTime = 0,this.iBindPhone = 0,this.sHuyaId = "",this.iModifyNickChannel = 0,this.iLogoutStatus = 0,this.lUserType = 0;
                    this.readFrom = function(e) {this.lUid = e.readInt64(0, !1, this.lUid),this.sNickName = e.readString(1, !1, this.sNickName),this.sAvatarUrl = e.readString(2, !1, this.sAvatarUrl),this.iGender = e.readInt32(3, !1, this.iGender),this.lYYId = e.readInt64(4, !1, this.lYYId),this.iCertified = e.readInt32(5, !1, this.iCertified),this.iSubscribedCount = e.readInt32(6, !1, this.iSubscribedCount),this.iSubscribeToCount = e.readInt32(7, !1, this.iSubscribeToCount),this.iUserLevel = e.readInt32(8, !1, this.iUserLevel),this.lUserExp = e.readInt64(9, !1, this.lUserExp),this.iBirthday = e.readInt32(10, !1, this.iBirthday),this.sSign = e.readString(11, !1, this.sSign),this.sArea = e.readString(12, !1, this.sArea),this.sLocation = e.readString(13, !1, this.sLocation),this.sRegisterTime = e.readString(14, !1, this.sRegisterTime),this.iFreezeTime = e.readInt32(15, !1, this.iFreezeTime),this.iBindPhone = e.readInt32(16, !1, this.iBindPhone),this.sHuyaId = e.readString(17, !1, this.sHuyaId),this.iModifyNickChannel = e.readInt32(18, !1, this.iModifyNickChannel),this.iLogoutStatus = e.readInt32(20, !1, this.iLogoutStatus),this.lUserType = e.readInt64(21, !1, this.lUserType)};
                    this.writeTo = function(e) {e.writeInt64(0, this.lUid),e.writeString(1, this.sNickName),e.writeString(2, this.sAvatarUrl),e.writeInt32(3, this.iGender),e.writeInt64(4, this.lYYId),e.writeInt32(5, this.iCertified),e.writeInt32(6, this.iSubscribedCount),e.writeInt32(7, this.iSubscribeToCount),e.writeInt32(8, this.iUserLevel),e.writeInt64(9, this.lUserExp),e.writeInt32(10, this.iBirthday),e.writeString(11, this.sSign),e.writeString(12, this.sArea),e.writeString(13, this.sLocation),e.writeString(14, this.sRegisterTime),e.writeInt32(15, this.iFreezeTime),e.writeInt32(16, this.iBindPhone),e.writeString(17, this.sHuyaId),e.writeInt32(18, this.iModifyNickChannel),e.writeInt32(20, this.iLogoutStatus),e.writeInt64(21, this.lUserType)};
                    this._clone = function() {return new To$.UserBase};
                    this._write = function(e, t, i) {e.writeStruct(t, i)};
                    this._read = function(e, t, i) {return e.readStruct(t, !0, i)}
                },
                TypeHelp : {BOOLEAN: "bool",CHAR: "char",SHORT: "short",INT32: "int32",INT64: "int64",FLOAT: "float",DOUBLE: "double",STRING: "string",VECTOR: "list<$t>",MAP: "map<$k, $v>"},
                Vector : function(c) {
                    this.proto = c,this.value = [];
                    this._clone = function() {return new To$.Vector(typeof this.proto == "function" ? new this.proto : this.proto)},
                    this._write = function(c, f, p) {return c.writeVector(f, p)},
                    this._read = function(c, f, p) {return c.readVector(f, !0, p)},
                    this._className = function() {var c = I(this.proto);return To$.TypeHelp.VECTOR.replace("$t", c)}
                },
                HttpDnsItem : function() {
                    this.vIp = new To$.Vector(new To$.STRING),this.iExpireTime = 0,this.vIpv6 = new To$.Vector(new To$.STRING);
                    this._clone = function() {return new To$.HttpDnsItem},
                    this._write = function(c, f, p) {c.writeStruct(f, p)},
                    this._read = function(c, f, p) {return c.readStruct(f, !0, p)},
                    this.writeTo = function(c) {c.writeVector(0, this.vIp),c.writeInt64(1, this.iExpireTime),c.writeVector(2, this.vIpv6)},
                    this.readFrom = function(c) {this.vIp = c.readVector(0, !1, this.vIp),this.iExpireTime = c.readInt64(1, !1, this.iExpireTime),this.vIpv6 = c.readVector(2, !1, this.vIpv6)};
                },
                WSLaunchRsp : function() {
                    this.sGuid = "",this.sClientIp = "";
                    this._clone = function() {return new To$.WSLaunchRsp};
                    this._write = function(c, f, p) {c.writeStruct(f, p)};
                    this._read = function(c, f, p) {return c.readStruct(f, !0, p)};
                    this.readFrom = function(c) {this.sGuid = c.readString(0, !1, this.sGuid),this.sClientIp = c.readString(1, !1, this.sClientIp)};
                },
                QueryHttpDnsRsp : function() {
                    this.mDomain2Ip = new To$.Map(new To$.STRING,new To$.HttpDnsItem),this.iEnvType = 0;
                    this._clone = function() {return new To$.QueryHttpDnsRsp};
                    this._write = function(c, f, p) {c.writeStruct(f, p)};
                    this._read = function(c, f, p) {return c.readStruct(f, !0, p)};
                    this.readFrom = function(c) {this.mDomain2Ip = c.readMap(0, !1, this.mDomain2Ip),this.iEnvType = c.readInt32(1, !1, this.iEnvType)};
                },
                QueryIosSwitchRsp : function() {
                    this.resp = new To$.ne.CommonResponse,this.iosSwitch = 2;
                    this.readFrom = function(e) {this.resp = e.readStruct(0, !1, this.resp),this.iosSwitch = e.readInt32(1, !1, this.iosSwitch)};
                    this.writeTo = function(e) {e.writeStruct(0, this.resp),e.writeInt32(1, this.iosSwitch)};
                    this._clone = function() {return new To$.QueryIosSwitchRsp};
                    this._write = function(e, t, r) {e.writeStruct(t, r)};
                    this._read = function(e, t, r) {return e.readStruct(t, !0, r)};
                },
                GetUserProfileRsp : function() {
                    this.tUserProfile = new To$.UserProfile;
                    this.readFrom = function(e) {this.tUserProfile = e.readStruct(0, !1, this.tUserProfile)};
                    this.writeTo = function(e) {e.writeStruct(0, this.tUserProfile)};
                    this._clone = function() {return new To$.GetUserProfileRsp};
                    this._write = function(e, t, i) {e.writeStruct(t, i)};
                    this._read = function(e, t, i) {return e.readStruct(t, !0, i)}; 
                },
                CheckUserLoginRsp : function() {
                    this.resp = new To$.ne.CommonResponse,this.loginStatus = 0;
                    this.readFrom = function(e) {this.resp = e.readStruct(0, !1, this.resp),this.loginStatus = e.readInt32(1, !1, this.loginStatus)};
                    this.writeTo = function(e) {e.writeStruct(0, this.resp),e.writeInt32(1, this.loginStatus)};
                    this._clone = function() {return new To$.CheckUserLoginRsp};
                    this._write = function(e, t, r) {e.writeStruct(t, r)};
                    this._read = function(e, t, r) {return e.readStruct(t, !0, r)};
                },
                CheckUserStatusRsp : function() {
                    this.resp = new To$.ne.CommonResponse,this.subscribedStatus = 0,this.bindWxStatus = 0,this.realNameStatus = 0;
                    this.readFrom = function(e) {this.resp = e.readStruct(0, !1, this.resp),this.subscribedStatus = e.readInt32(1, !1, this.subscribedStatus),this.bindWxStatus = e.readInt32(2, !1, this.bindWxStatus),this.realNameStatus = e.readInt32(3, !1, this.realNameStatus)};
                    this.writeTo = function(e) {e.writeStruct(0, this.resp),e.writeInt32(1, this.subscribedStatus),e.writeInt32(2, this.bindWxStatus),e.writeInt32(3, this.realNameStatus)};
                    this._clone = function() {return new To$.CheckUserStatusRsp};
                    this._write = function(e, t, r) {e.writeStruct(t, r)};
                    this._read = function(e, t, r) {return e.readStruct(t, !0, r)};
                },
                GetExchangeInfoRsp : function() {
                    this.resp = new To$.ne.CommonResponse,this.rebateExchangeRate = 0,this.userBalance = "",this.exchangeItemTypes = "",this.extInfo = new To$.Map(new To$.STRING,new To$.STRING);
                    this.readFrom = function(e) {this.resp = e.readStruct(0, !1, this.resp),this.rebateExchangeRate = e.readInt32(1, !1, this.rebateExchangeRate),this.userBalance = e.readString(2, !1, this.userBalance),this.exchangeItemTypes = e.readString(3, !1, this.exchangeItemTypes),this.extInfo = e.readMap(4, !1, this.extInfo)};
                    this.writeTo = function(e) {e.writeStruct(0, this.resp),e.writeInt32(1, this.rebateExchangeRate),e.writeString(2, this.userBalance),e.writeString(3, this.exchangeItemTypes),e.writeMap(4, this.extInfo)};
                    this._clone = function() {return new To$.GetExchangeInfoRsp};
                    this._write = function(e, t, r) {e.writeStruct(t, r)};
                    this._read = function(e, t, r) {return e.readStruct(t, !0, r)};
                },
                CheckHyProtocolRsp : function() {
                    this.resp = new To$.ne.CommonResponse,this.acceptStatus = 0,this.acceptTime = 0;
                    this.readFrom = function(e) {this.resp = e.readStruct(0, !1, this.resp),this.acceptStatus = e.readInt32(1, !1, this.acceptStatus),this.acceptTime = e.readInt64(2, !1, this.acceptTime)};
                    this.writeTo = function(e) {e.writeStruct(0, this.resp),e.writeInt32(1, this.acceptStatus),e.writeInt64(2, this.acceptTime)};
                    this._clone = function() {return new To$.CheckHyProtocolRsp};
                    this._write = function(e, t, r) {e.writeStruct(t, r)};
                    this._read = function(e, t, r) {return e.readStruct(t, !0, r)};
                },
                ExchangeItem : function() {
                    this.exchangeItemId = 0,this.exchangeItemType = "",this.rebateAmount = 0,this.exchangeAmount = 0,this.currentStock = 0,this.dailyExchangeCntLeft = 0,this.itemInfoExt = "";
                    this.readFrom = function(e) {this.exchangeItemId = e.readInt64(0, !1, this.exchangeItemId),this.exchangeItemType = e.readString(1, !1, this.exchangeItemType),this.rebateAmount = e.readInt64(2, !1, this.rebateAmount),this.exchangeAmount = e.readInt64(3, !1, this.exchangeAmount),this.currentStock = e.readInt64(4, !1, this.currentStock),this.dailyExchangeCntLeft = e.readInt64(5, !1, this.dailyExchangeCntLeft),this.itemInfoExt = e.readString(6, !1, this.itemInfoExt)};
                    this.writeTo = function(e) {e.writeInt64(0, this.exchangeItemId),e.writeString(1, this.exchangeItemType),e.writeInt64(2, this.rebateAmount),e.writeInt64(3, this.exchangeAmount),e.writeInt64(4, this.currentStock),e.writeInt64(5, this.dailyExchangeCntLeft),e.writeString(6, this.itemInfoExt)};
                    this._clone = function() {return new To$.ExchangeItem};
                    this._write = function(e, t, r) {e.writeStruct(t, r)};
                    this._read = function(e, t, r) {return e.readStruct(t, !0, r)};
                },
                ResourceSlot : function() {
                    this.name = "",this.btnText = "",this.url = "",this.icon = "",this.labelName = "",this.labelFontColour = "",this.labelBubbleColour = "",this.nameVb = "",this.btnTextVb = "",this.iconVb = "";
                    this.readFrom = function(e) {this.name = e.readString(0, !1, this.name),this.btnText = e.readString(1, !1, this.btnText),this.url = e.readString(2, !1, this.url),this.icon = e.readString(3, !1, this.icon),this.labelName = e.readString(4, !1, this.labelName),this.labelFontColour = e.readString(5, !1, this.labelFontColour),this.labelBubbleColour = e.readString(6, !1, this.labelBubbleColour),this.nameVb = e.readString(7, !1, this.nameVb),this.btnTextVb = e.readString(8, !1, this.btnTextVb),this.iconVb = e.readString(9, !1, this.iconVb)};
                    this.writeTo = function(e) {e.writeString(0, this.name),e.writeString(1, this.btnText),e.writeString(2, this.url),e.writeString(3, this.icon),e.writeString(4, this.labelName),e.writeString(5, this.labelFontColour),e.writeString(6, this.labelBubbleColour),e.writeString(7, this.nameVb),e.writeString(8, this.btnTextVb),e.writeString(9, this.iconVb)};
                    this._clone = function() {return new To$.ResourceSlot};
                    this._write = function(e, t, r) {e.writeStruct(t, r)};
                    this._read = function(e, t, r) {return e.readStruct(t, !0, r)};
                },
                GetExchangeItemListRsp : function() {
                    this.resp = new To$.ne.CommonResponse,this.exchangeInvalidCode = 0,this.dailyAmountLimit = 0,this.dailyAmountLeft = 0,this.dailyCntLimit = 0,this.dailyCntLeft = 0,this.refreshTime = "",this.total = 0,this.exchangeItemList = new To$.Vector(new To$.ExchangeItem),this.resourceSlotList = new To$.Vector(new To$.ResourceSlot),this.dailyAllAmountLeft = 0,this.channelAmountLeft = 0;
                    this.readFrom = function(e) {this.resp = e.readStruct(0, !1, this.resp);this.exchangeInvalidCode = e.readInt32(1, !1, this.exchangeInvalidCode);this.dailyAmountLimit = e.readInt64(2, !1, this.dailyAmountLimit);this.dailyAmountLeft = e.readInt64(3, !1, this.dailyAmountLeft);this.dailyCntLimit = e.readInt64(4, !1, this.dailyCntLimit);this.dailyCntLeft = e.readInt64(5, !1, this.dailyCntLeft);this.refreshTime = e.readString(6, !1, this.refreshTime);this.total = e.readInt64(7, !1, this.total);this.exchangeItemList = e.readVector(8, !1, this.exchangeItemList);this.resourceSlotList = e.readVector(9, !1, this.resourceSlotList);this.dailyAllAmountLeft = e.readInt64(10, !1, this.dailyAllAmountLeft);this.channelAmountLeft = e.readInt64(11, !1, this.channelAmountLeft)};
                    this.writeTo = function(e) {e.writeStruct(0, this.resp),e.writeInt32(1, this.exchangeInvalidCode),e.writeInt64(2, this.dailyAmountLimit),e.writeInt64(3, this.dailyAmountLeft),e.writeInt64(4, this.dailyCntLimit),e.writeInt64(5, this.dailyCntLeft),e.writeString(6, this.refreshTime),e.writeInt64(7, this.total),e.writeVector(8, this.exchangeItemList),e.writeVector(9, this.resourceSlotList),e.writeInt64(10, this.dailyAllAmountLeft),e.writeInt64(11, this.channelAmountLeft)};
                    this._clone = function() {return new To$.GetExchangeItemListRsp};
                    this._write = function(e, t, r) {e.writeStruct(t, r)};
                    this._read = function(e, t, r) {return e.readStruct(t, !0, r)};
                },
                GameLiveTag : function() {
                    this.iTagId = 0,this.sTagName = "",this.bIsShow = !0,this.iBindingGameId = 0,this.iShowType = 0;
                    this.readFrom = function(e) {this.iTagId = e.readInt32(0, !1, this.iTagId),this.sTagName = e.readString(1, !1, this.sTagName),this.bIsShow = e.readBoolean(2, !1, this.bIsShow),this.iBindingGameId = e.readInt32(3, !1, this.iBindingGameId),this.iShowType = e.readInt32(4, !1, this.iShowType)};
                    this.writeTo = function(e) {e.writeInt32(0, this.iTagId),e.writeString(1, this.sTagName),e.writeBoolean(2, this.bIsShow),e.writeInt32(3, this.iBindingGameId),e.writeInt32(4, this.iShowType)};
                    this._clone = function() {return new To$.GameLiveTag};
                    this._write = function(e, t, i) {e.writeStruct(t, i)};
                    this._read = function(e, t, i) {return e.readStruct(t, !0, i)};
                },
                GameLiveInfo : function() {
                    this.lLiveId = 0,this.lUid = 0,this.lChannelId = 0,this.iShortChannel = 0,this.lSubchannel = 0,this.sSubchannelName = "",this.iGameId = 0,this.sGameName = "",this.iAttendeeCount = 0,this.eGender = To$.EGender.MALE,this.iAid = 0,this.sNick = "",this.sAvatarUrl = "",this.iStartTime = 0,this.iEndTime = 0,this.iSourceType = 0,this.bIsCameraOpen = !1,this.bIsRoomSecret = !1,this.sVideoCaptureUrl = "",this.iCdnAttendee = 0,this.lYYId = 0,this.bCertified = !1,this.iRecType = 0,this.lSignChannel = 0,this.sLiveDesc = "",this.iLevel = 0,this.sGameShortName = "",this.iGameType = 0,this.sPrivateHost = "",this.iActivityCount = 0,this.iStreamType = 0,this.iBitRate = 0,this.iResolution = 0,this.iFrameRate = 0,this.iIsMultiStream = 0,this.iExeGameId = 0,this.lExp = 0,this.sReplayHls = "",this.lMultiStreamFlag = 0,this.iScreenType = 0,this.iChannelType = 0,this.sLocation = "",this.iCodecType = 0,this.vPresenterTags = new To$.Vector(new To$.GameLiveTag),this.vGameTags = new To$.Vector(new To$.GameLiveTag),this.lLiveCompatibleFlag = 0,this.sTraceId = "",this.iRoomId = 0,this.mpExtInfo = new To$.Map(new To$.STRING,new To$.STRING);
                    this.readFrom = function(e) {this.lLiveId = e.readInt64(0, !1, this.lLiveId),this.lUid = e.readInt64(1, !1, this.lUid),this.lChannelId = e.readInt64(2, !1, this.lChannelId),this.iShortChannel = e.readInt32(3, !1, this.iShortChannel),this.lSubchannel = e.readInt64(4, !1, this.lSubchannel),this.sSubchannelName = e.readString(5, !1, this.sSubchannelName),this.iGameId = e.readInt32(6, !1, this.iGameId),this.sGameName = e.readString(7, !1, this.sGameName),this.iAttendeeCount = e.readInt32(8, !1, this.iAttendeeCount),this.eGender = e.readInt32(9, !1, this.eGender),this.iAid = e.readInt32(10, !1, this.iAid),this.sNick = e.readString(11, !1, this.sNick),this.sAvatarUrl = e.readString(12, !1, this.sAvatarUrl),this.iStartTime = e.readInt32(13, !1, this.iStartTime),this.iEndTime = e.readInt32(14, !1, this.iEndTime),this.iSourceType = e.readInt32(15, !1, this.iSourceType),this.bIsCameraOpen = e.readBoolean(16, !1, this.bIsCameraOpen),this.bIsRoomSecret = e.readBoolean(17, !1, this.bIsRoomSecret),this.sVideoCaptureUrl = e.readString(18, !1, this.sVideoCaptureUrl),this.iCdnAttendee = e.readInt32(19, !1, this.iCdnAttendee),this.lYYId = e.readInt64(20, !1, this.lYYId),this.bCertified = e.readBoolean(21, !1, this.bCertified),this.iRecType = e.readInt32(22, !1, this.iRecType),this.lSignChannel = e.readInt64(23, !1, this.lSignChannel),this.sLiveDesc = e.readString(24, !1, this.sLiveDesc),this.iLevel = e.readInt32(25, !1, this.iLevel),this.sGameShortName = e.readString(26, !1, this.sGameShortName),this.iGameType = e.readInt32(27, !1, this.iGameType),this.sPrivateHost = e.readString(28, !1, this.sPrivateHost),this.iActivityCount = e.readInt32(29, !1, this.iActivityCount),this.iStreamType = e.readInt32(30, !1, this.iStreamType),this.iBitRate = e.readInt32(31, !1, this.iBitRate),this.iResolution = e.readInt32(32, !1, this.iResolution),this.iFrameRate = e.readInt32(33, !1, this.iFrameRate),this.iIsMultiStream = e.readInt32(34, !1, this.iIsMultiStream),this.iExeGameId = e.readInt32(35, !1, this.iExeGameId),this.lExp = e.readInt64(36, !1, this.lExp),this.sReplayHls = e.readString(37, !1, this.sReplayHls),this.lMultiStreamFlag = e.readInt64(38, !1, this.lMultiStreamFlag),this.iScreenType = e.readInt32(39, !1, this.iScreenType),this.iChannelType = e.readInt32(40, !1, this.iChannelType),this.sLocation = e.readString(41, !1, this.sLocation),this.iCodecType = e.readInt32(42, !1, this.iCodecType),this.vPresenterTags = e.readVector(43, !1, this.vPresenterTags),this.vGameTags = e.readVector(44, !1, this.vGameTags),this.lLiveCompatibleFlag = e.readInt64(45, !1, this.lLiveCompatibleFlag),this.sTraceId = e.readString(46, !1, this.sTraceId),this.iRoomId = e.readInt32(47, !1, this.iRoomId),this.mpExtInfo = e.readMap(48, !1, this.mpExtInfo)};
                    this.writeTo = function(e) {e.writeInt64(0, this.lLiveId),e.writeInt64(1, this.lUid),e.writeInt64(2, this.lChannelId),e.writeInt32(3, this.iShortChannel),e.writeInt64(4, this.lSubchannel),e.writeString(5, this.sSubchannelName),e.writeInt32(6, this.iGameId),e.writeString(7, this.sGameName),e.writeInt32(8, this.iAttendeeCount),e.writeInt32(9, this.eGender),e.writeInt32(10, this.iAid),e.writeString(11, this.sNick),e.writeString(12, this.sAvatarUrl),e.writeInt32(13, this.iStartTime),e.writeInt32(14, this.iEndTime),e.writeInt32(15, this.iSourceType),e.writeBoolean(16, this.bIsCameraOpen),e.writeBoolean(17, this.bIsRoomSecret),e.writeString(18, this.sVideoCaptureUrl),e.writeInt32(19, this.iCdnAttendee),e.writeInt64(20, this.lYYId),e.writeBoolean(21, this.bCertified),e.writeInt32(22, this.iRecType),e.writeInt64(23, this.lSignChannel),e.writeString(24, this.sLiveDesc),e.writeInt32(25, this.iLevel),e.writeString(26, this.sGameShortName),e.writeInt32(27, this.iGameType),e.writeString(28, this.sPrivateHost),e.writeInt32(29, this.iActivityCount),e.writeInt32(30, this.iStreamType),e.writeInt32(31, this.iBitRate),e.writeInt32(32, this.iResolution),e.writeInt32(33, this.iFrameRate),e.writeInt32(34, this.iIsMultiStream),e.writeInt32(35, this.iExeGameId),e.writeInt64(36, this.lExp),e.writeString(37, this.sReplayHls),e.writeInt64(38, this.lMultiStreamFlag),e.writeInt32(39, this.iScreenType),e.writeInt32(40, this.iChannelType),e.writeString(41, this.sLocation),e.writeInt32(42, this.iCodecType),e.writeVector(43, this.vPresenterTags),e.writeVector(44, this.vGameTags),e.writeInt64(45, this.lLiveCompatibleFlag),e.writeString(46, this.sTraceId),e.writeInt32(47, this.iRoomId),e.writeMap(48, this.mpExtInfo)};
                    this._clone = function() {return new To$.GameLiveInfo};
                    this._write = function(e, t, i) {e.writeStruct(t, i)};
                    this._read = function(e, t, i) {return e.readStruct(t, !0, i)};
                },
                GameBaseInfo : function(){
                    this.iId = 0,this.sFullName = "",this.sShortName = "",this.sIcon = "",this.iCategory = 0,this.sCategoryName = "",this.iExeId = 0;
                    this.readFrom = function(e) {this.iId = e.readInt32(0, !1, this.iId),this.sFullName = e.readString(1, !1, this.sFullName),this.sShortName = e.readString(2, !1, this.sShortName),this.sIcon = e.readString(3, !1, this.sIcon),this.iCategory = e.readInt32(4, !1, this.iCategory),this.sCategoryName = e.readString(5, !1, this.sCategoryName),this.iExeId = e.readInt32(6, !1, this.iExeId)};
                    this.writeTo = function(e) {e.writeInt32(0, this.iId),e.writeString(1, this.sFullName),e.writeString(2, this.sShortName),e.writeString(3, this.sIcon),e.writeInt32(4, this.iCategory),e.writeString(5, this.sCategoryName),e.writeInt32(6, this.iExeId)};
                    this._clone = function() {return new To$.GameBaseInfo};
                    this._write = function(e, t, i) {e.writeStruct(t, i)};
                    this._read = function(e, t, i) {return e.readStruct(t, !0, i)};
                },
                PresenterBase : function(){
                    this.iIsPresenter = 0,this.sPresenterName = "",this.lSignedChannel = 0,this.sPrivateHost = "",this.iRecType = 0,this.iFreeze = 0,this.iPresenterLevel = 0,this.lPresenterExp = 0,this.vPresentedGames = new To$.Vector(new To$.GameBaseInfo),this.iCertified = 0,this.iRoomId = 0;
                    this.readFrom = function(e) {this.iIsPresenter = e.readInt32(0, !1, this.iIsPresenter),this.sPresenterName = e.readString(1, !1, this.sPresenterName),this.lSignedChannel = e.readInt64(2, !1, this.lSignedChannel),this.sPrivateHost = e.readString(3, !1, this.sPrivateHost),this.iRecType = e.readInt32(4, !1, this.iRecType),this.iFreeze = e.readInt32(5, !1, this.iFreeze),this.iPresenterLevel = e.readInt32(6, !1, this.iPresenterLevel),this.lPresenterExp = e.readInt64(7, !1, this.lPresenterExp),this.vPresentedGames = e.readVector(8, !1, this.vPresentedGames),this.iCertified = e.readInt32(9, !1, this.iCertified),this.iRoomId = e.readInt32(10, !1, this.iRoomId)};
                    this.writeTo = function(e) {e.writeInt32(0, this.iIsPresenter),e.writeString(1, this.sPresenterName),e.writeInt64(2, this.lSignedChannel),e.writeString(3, this.sPrivateHost),e.writeInt32(4, this.iRecType),e.writeInt32(5, this.iFreeze),e.writeInt32(6, this.iPresenterLevel),e.writeInt64(7, this.lPresenterExp),e.writeVector(8, this.vPresentedGames),e.writeInt32(9, this.iCertified),e.writeInt32(10, this.iRoomId)};
                    this._clone = function() {return new To$.PresenterBase};
                    this._write = function(e, t, i) {e.writeStruct(t, i)};
                    this._read = function(e, t, i) {return e.readStruct(t, !0, i)};
                },
                UserProfile : function() {
                    this.tUserBase = new To$.UserBase,this.tPresenterBase = new To$.PresenterBase,this.tRecentLive = new To$.GameLiveInfo;
                    this.readFrom = function(e) {this.tUserBase = e.readStruct(0, !1, this.tUserBase),this.tPresenterBase = e.readStruct(1, !1, this.tPresenterBase),this.tRecentLive = e.readStruct(2, !1, this.tRecentLive)};
                    this.writeTo = function(e) {e.writeStruct(0, this.tUserBase),e.writeStruct(1, this.tPresenterBase),e.writeStruct(2, this.tRecentLive)};
                    this._clone = function() {return new To$.UserProfile};
                    this._write = function(e, t, i) {e.writeStruct(t, i)};
                    this._read = function(e, t, i) {return e.readStruct(t, !0, i)};
                },
                CommonResponse : function() {
                    this.status = "",this.message = "",this.context = "";
                    this.readFrom = function(e) {this.status = e.readString(0, !1, this.status),this.message = e.readString(1, !1, this.message),this.context = e.readString(2, !1, this.context)};
                    this.writeTo = function(e) {e.writeString(0, this.status),e.writeString(1, this.message),e.writeString(2, this.context)};
                    this._clone = function() {return new To$.CommonResponse};
                    this._write = function(e, t, r) {e.writeStruct(t, r)};
                    this._read = function(e, t, r) {return e.readStruct(t, !0, r)};
                },
                JournalDetail : function() {
                    this.uid = "",this.accountType = "",this.changeType = "",this.bizOrderId = "",this.dealId = "",this.dealTime = "",this.debit = "",this.credit = "",this.useableBalance = "",this.amount = "",this.prodId = "",this.prodName = "",this.description = "",this.extInfo = "",this.realChangeType = "";
                    this.readFrom = function(e) {this.uid = e.readString(0, !1, this.uid),this.accountType = e.readString(1, !1, this.accountType),this.changeType = e.readString(2, !1, this.changeType),this.bizOrderId = e.readString(3, !1, this.bizOrderId),this.dealId = e.readString(4, !1, this.dealId),this.dealTime = e.readString(5, !1, this.dealTime),this.debit = e.readString(6, !1, this.debit),this.credit = e.readString(7, !1, this.credit),this.useableBalance = e.readString(8, !1, this.useableBalance),this.amount = e.readString(9, !1, this.amount),this.prodId = e.readString(10, !1, this.prodId),this.prodName = e.readString(11, !1, this.prodName),this.description = e.readString(12, !1, this.description),this.extInfo = e.readString(13, !1, this.extInfo),this.realChangeType = e.readString(14, !1, this.realChangeType)};
                    this.writeTo = function(e) {e.writeString(0, this.uid),e.writeString(1, this.accountType),e.writeString(2, this.changeType),e.writeString(3, this.bizOrderId),e.writeString(4, this.dealId),e.writeString(5, this.dealTime),e.writeString(6, this.debit),e.writeString(7, this.credit),e.writeString(8, this.useableBalance),e.writeString(9, this.amount),e.writeString(10, this.prodId),e.writeString(11, this.prodName),e.writeString(12, this.description),e.writeString(13, this.extInfo),e.writeString(14, this.realChangeType)};
                    this._clone = function() {return new To$.JournalDetail};
                    this._write = function(e, t, r) {e.writeStruct(t, r)};
                    this._read = function(e, t, r) {return e.readStruct(t, !0, r)};
                },
                QueryJournalListRspData : function() {
                    this.pageNo = "",this.pageSize = "",this.total = "",this.rows = new To$.Vector(new To$.JournalDetail);
                    this.readFrom = function(e) {this.pageNo = e.readString(0, !1, this.pageNo),this.pageSize = e.readString(1, !1, this.pageSize),this.total = e.readString(2, !1, this.total),this.rows = e.readVector(3, !1, this.rows)};
                    this.writeTo = function(e) {e.writeString(0, this.pageNo),e.writeString(1, this.pageSize),e.writeString(2, this.total),e.writeVector(3, this.rows)};
                    this._clone = function() {return new To$.QueryJournalListRspData};
                    this._write = function(e, t, r) {e.writeStruct(t, r)};
                    this._read = function(e, t, r) {return e.readStruct(t, !0, r)};
                },
                QueryJournalListRsp : function() {
                    this.rsp = new To$.CommonResponse,this.rspData = new To$.QueryJournalListRspData;
                    this.readFrom = function(e) {this.rsp = e.readStruct(0, !1, this.rsp),this.rspData = e.readStruct(1, !1, this.rspData)};
                    this.writeTo = function(e) {e.writeStruct(0, this.rsp),e.writeStruct(1, this.rspData)};
                    this._clone = function() {return new To$.QueryJournalListRsp};
                    this._write = function(e, t, r) {e.writeStruct(t, r)};
                    this._read = function(e, t, r) {return e.readStruct(t, !0, r)};
                },
                UserExchangeItemRsp : function() {
                    this.resp = new To$.ne.CommonResponse,this.riskUrl = "",this.wxNickname = "",this.wxHeaderUrl = "";
                    this.readFrom = function(e) {this.resp = e.readStruct(0, !1, this.resp),this.riskUrl = e.readString(1, !1, this.riskUrl),this.wxNickname = e.readString(2, !1, this.wxNickname),this.wxHeaderUrl = e.readString(3, !1, this.wxHeaderUrl)};
                    this.writeTo = function(e) {e.writeStruct(0, this.resp),e.writeString(1, this.riskUrl),e.writeString(2, this.wxNickname),e.writeString(3, this.wxHeaderUrl)};
                    this._clone = function() {return new To$.UserExchangeItemRsp};
                    this._write = function(e, t, r) {e.writeStruct(t, r)};
                    this._read = function(e, t, r) {return e.readStruct(t, !0, r)};
                },
                RebateObtainActivityConfigInfo : function() {
                    this.effectStartTime = 0,this.effectEndTime = 0,this.ruleRemark = "",this.useType = "",this.rebateAmountLimit = 0,this.orderAmountLimit = 0;
                    this.readFrom = function(e) {this.effectStartTime = e.readInt64(0, !1, this.effectStartTime),this.effectEndTime = e.readInt64(1, !1, this.effectEndTime),this.ruleRemark = e.readString(2, !1, this.ruleRemark),this.useType = e.readString(3, !1, this.useType),this.rebateAmountLimit = e.readInt64(4, !1, this.rebateAmountLimit),this.orderAmountLimit = e.readInt64(5, !1, this.orderAmountLimit)};
                    this.writeTo = function(e) {e.writeInt64(0, this.effectStartTime),e.writeInt64(1, this.effectEndTime),e.writeString(2, this.ruleRemark),e.writeString(3, this.useType),e.writeInt64(4, this.rebateAmountLimit),e.writeInt64(5, this.orderAmountLimit)};
                    this._clone = function() {return new To$.RebateObtainActivityConfigInfo};
                    this._write = function(e, t, r) {e.writeStruct(t, r)};
                    this._read = function(e, t, r) {return e.readStruct(t, !0, r)};
                },
                UserLabelInfo : function() {
                    this.uid = 0,this.labelName = "";
                    this.readFrom = function(e) {this.uid = e.readInt64(0, !1, this.uid),this.labelName = e.readString(1, !1, this.labelName)};
                    this.writeTo = function(e) {e.writeInt64(0, this.uid),e.writeString(1, this.labelName)};
                    this._clone = function() {return new To$.UserLabelInfo};
                    this._write = function(e, t, r) {e.writeStruct(t, r)};
                    this._read = function(e, t, r) {return e.readStruct(t, !0, r)};
                },
                GameShopInfo : function() {
                    this.shopId = 0,this.shopName = "",this.gameIcon = "",this.supplierOfferId = "",this.yjOfferId = "",this.gameDesc = "",this.feedWeight = 0,this.showDeviceType = "",this.loadUrl = "",this.goodsList = new d.Vector(new To$.ShopGoodsInfo),this.userLabelList = new d.Vector(new To$.UserLabelInfo),this.pf = "",this.obtainInfo = new To$.UserRebateObtainInfo,this.showHuyaApp = 0,this.showH5 = 0,this.env = "",this.txChanType = "",this.shopPinyin = "",this.accessUrlDevice = 0,this.yjTabId = "",this.showTerminalSwitch = "",this.showShopSwitch = "";
                    this.readFrom = function(e) {this.shopId = e.readInt64(0, !1, this.shopId),this.shopName = e.readString(1, !1, this.shopName),this.gameIcon = e.readString(2, !1, this.gameIcon),this.supplierOfferId = e.readString(3, !1, this.supplierOfferId),this.yjOfferId = e.readString(4, !1, this.yjOfferId),this.gameDesc = e.readString(5, !1, this.gameDesc),this.feedWeight = e.readInt32(6, !1, this.feedWeight),this.showDeviceType = e.readString(7, !1, this.showDeviceType),this.loadUrl = e.readString(9, !1, this.loadUrl),this.goodsList = e.readVector(10, !1, this.goodsList),this.userLabelList = e.readVector(11, !1, this.userLabelList),this.pf = e.readString(12, !1, this.pf),this.obtainInfo = e.readStruct(13, !1, this.obtainInfo),this.showHuyaApp = e.readInt32(14, !1, this.showHuyaApp),this.showH5 = e.readInt32(15, !1, this.showH5),this.env = e.readString(16, !1, this.env),this.txChanType = e.readString(17, !1, this.txChanType),this.shopPinyin = e.readString(18, !1, this.shopPinyin),this.accessUrlDevice = e.readInt32(19, !1, this.accessUrlDevice),this.yjTabId = e.readString(20, !1, this.yjTabId),this.showTerminalSwitch = e.readString(21, !1, this.showTerminalSwitch),this.showShopSwitch = e.readString(22, !1, this.showShopSwitch)};
                    this.writeTo = function(e) {e.writeInt64(0, this.shopId),e.writeString(1, this.shopName),e.writeString(2, this.gameIcon),e.writeString(3, this.supplierOfferId),e.writeString(4, this.yjOfferId),e.writeString(5, this.gameDesc),e.writeInt32(6, this.feedWeight),e.writeString(7, this.showDeviceType),e.writeString(9, this.loadUrl),e.writeVector(10, this.goodsList),e.writeVector(11, this.userLabelList),e.writeString(12, this.pf),e.writeStruct(13, this.obtainInfo),e.writeInt32(14, this.showHuyaApp),e.writeInt32(15, this.showH5),e.writeString(16, this.env),e.writeString(17, this.txChanType),e.writeString(18, this.shopPinyin),e.writeInt32(19, this.accessUrlDevice),e.writeString(20, this.yjTabId),e.writeString(21, this.showTerminalSwitch),e.writeString(22, this.showShopSwitch)};
                    this._clone = function() {return new To$.GameShopInfo};
                    this._write = function(e, t, r) {e.writeStruct(t, r)};
                    this._read = function(e, t, r) {return e.readStruct(t, !0, r)};
                },
                ShopGoodsInfo : function() {
                    this.goodsId = 0,this.shopId = 0,this.supplierProductId = "",this.goodsName = "",this.goodsImage = "",this.goodsPrice = 0,this.labelName = "",this.labelBottomColour = "",this.loadUrl = "",this.showDeviceType = "",this.pf = "",this.resOfferId = "",this.pageId = "",this.obtainInfo = new To$.UserRebateObtainInfo,this.gameIcon = "",this.env = "",this.txChanType = "",this.shopName = "",this.shopPinyin = "",this.gameCoinName = "",this.accessUrlDevice = 0,this.showShopSwitch = "",this.showTerminalSwitch = "";
                    this.readFrom = function(e) {this.goodsId = e.readInt64(0, !1, this.goodsId),this.shopId = e.readInt64(1, !1, this.shopId),this.supplierProductId = e.readString(2, !1, this.supplierProductId),this.goodsName = e.readString(3, !1, this.goodsName),this.goodsImage = e.readString(4, !1, this.goodsImage),this.goodsPrice = e.readInt64(5, !1, this.goodsPrice),this.labelName = e.readString(6, !1, this.labelName),this.labelBottomColour = e.readString(7, !1, this.labelBottomColour),this.loadUrl = e.readString(9, !1, this.loadUrl),this.showDeviceType = e.readString(10, !1, this.showDeviceType),this.pf = e.readString(11, !1, this.pf),this.resOfferId = e.readString(12, !1, this.resOfferId),this.pageId = e.readString(13, !1, this.pageId),this.obtainInfo = e.readStruct(14, !1, this.obtainInfo),this.gameIcon = e.readString(15, !1, this.gameIcon),this.env = e.readString(16, !1, this.env),this.txChanType = e.readString(17, !1, this.txChanType),this.shopName = e.readString(18, !1, this.shopName),this.shopPinyin = e.readString(19, !1, this.shopPinyin),this.gameCoinName = e.readString(20, !1, this.gameCoinName),this.accessUrlDevice = e.readInt32(21, !1, this.accessUrlDevice),this.showShopSwitch = e.readString(22, !1, this.showShopSwitch),this.showTerminalSwitch = e.readString(23, !1, this.showTerminalSwitch)};
                    this.writeTo = function(e) {e.writeInt64(0, this.goodsId),e.writeInt64(1, this.shopId),e.writeString(2, this.supplierProductId),e.writeString(3, this.goodsName),e.writeString(4, this.goodsImage),e.writeInt64(5, this.goodsPrice),e.writeString(6, this.labelName),e.writeString(7, this.labelBottomColour),e.writeString(9, this.loadUrl),e.writeString(10, this.showDeviceType),e.writeString(11, this.pf),e.writeString(12, this.resOfferId),e.writeString(13, this.pageId),e.writeStruct(14, this.obtainInfo),e.writeString(15, this.gameIcon),e.writeString(16, this.env),e.writeString(17, this.txChanType),e.writeString(18, this.shopName),e.writeString(19, this.shopPinyin),e.writeString(20, this.gameCoinName),e.writeInt32(21, this.accessUrlDevice),e.writeString(22, this.showShopSwitch),e.writeString(23, this.showTerminalSwitch)};
                    this._clone = function() {return new To$.ShopGoodsInfo};
                    this._write = function(e, t, r) {e.writeStruct(t, r)};
                    this._read = function(e, t, r) {return e.readStruct(t, !0, r)};
                }, 
                RebateObtainBaseConfigInfo : function() {
                    this.totalAmountLimit = 0,this.totalOrderAmountLimit = 0;
                    this.readFrom = function(e) {this.totalAmountLimit = e.readInt64(0, !1, this.totalAmountLimit),this.totalOrderAmountLimit = e.readInt64(1, !1, this.totalOrderAmountLimit)};
                    this.writeTo = function(e) {e.writeInt64(0, this.totalAmountLimit),e.writeInt64(1, this.totalOrderAmountLimit)};
                    this._clone = function() {return new To$.RebateObtainBaseConfigInfo};
                    this._write = function(e, t, r) {e.writeStruct(t, r)};
                    this._read = function(e, t, r) {return e.readStruct(t, !0, r)};
                }, 
                RebateCalculateInfo : function() {
                    this.calculateId = "",this.userUid = 0,this.profileUid = 0,this.sourceId = "",this.mobile = "",this.shopId = 0,this.identity = "",this.amount = 0,this.supplierProductId = "",this.goodsType = 0;
                    this.readFrom = function(e) {this.calculateId = e.readString(0, !1, this.calculateId),this.userUid = e.readInt64(1, !1, this.userUid),this.profileUid = e.readInt64(2, !1, this.profileUid),this.sourceId = e.readString(3, !1, this.sourceId),this.mobile = e.readString(4, !1, this.mobile),this.shopId = e.readInt64(5, !1, this.shopId),this.identity = e.readString(7, !1, this.identity),this.amount = e.readInt64(8, !1, this.amount),this.supplierProductId = e.readString(9, !1, this.supplierProductId),this.goodsType = e.readInt32(10, !1, this.goodsType)};
                    this.writeTo = function(e) {e.writeString(0, this.calculateId),e.writeInt64(1, this.userUid),e.writeInt64(2, this.profileUid),e.writeString(3, this.sourceId),e.writeString(4, this.mobile),e.writeInt64(5, this.shopId),e.writeString(7, this.identity),e.writeInt64(8, this.amount),e.writeString(9, this.supplierProductId),e.writeInt32(10, this.goodsType)};
                    this._clone = function() {return new To$.RebateCalculateInfo};
                    this._write = function(e, t, r) {e.writeStruct(t, r)};
                    this._read = function(e, t, r) {return e.readStruct(t, !0, r)};
                },
                UserRebateObtainInfo : function() {
                    this.calculateInfo = new To$.RebateCalculateInfo,this.isRebate = 0,this.maxRebateNum = 0,this.maxRebateRate = 0,this.maxRebateAmount = 0,this.reason = "";
                    this.readFrom = function(e) {this.calculateInfo = e.readStruct(0, !1, this.calculateInfo),this.isRebate = e.readInt32(1, !1, this.isRebate),this.maxRebateNum = e.readInt64(2, !1, this.maxRebateNum),this.maxRebateRate = e.readDouble(3, !1, this.maxRebateRate),this.maxRebateAmount = e.readInt64(4, !1, this.maxRebateAmount),this.reason = e.readString(5, !1, this.reason)};
                    this.writeTo = function(e) {e.writeStruct(0, this.calculateInfo),e.writeInt32(1, this.isRebate),e.writeInt64(2, this.maxRebateNum),e.writeDouble(3, this.maxRebateRate),e.writeInt64(4, this.maxRebateAmount),e.writeString(5, this.reason)};
                    this._clone = function() {return new To$.UserRebateObtainInfo};
                    this._write = function(e, t, r) {e.writeStruct(t, r)};
                    this._read = function(e, t, r) {return e.readStruct(t, !0, r)};
                }, 
                RebateObtainActivityConfigInfo : function() {
                    this.effectStartTime = 0,this.effectEndTime = 0,this.ruleRemark = "",this.useType = "",this.rebateAmountLimit = 0,this.orderAmountLimit = 0;
                    this.readFrom = function(e) {this.effectStartTime = e.readInt64(0, !1, this.effectStartTime),this.effectEndTime = e.readInt64(1, !1, this.effectEndTime),this.ruleRemark = e.readString(2, !1, this.ruleRemark),this.useType = e.readString(3, !1, this.useType),this.rebateAmountLimit = e.readInt64(4, !1, this.rebateAmountLimit),this.orderAmountLimit = e.readInt64(5, !1, this.orderAmountLimit)};
                    this.writeTo = function(e) {e.writeInt64(0, this.effectStartTime),e.writeInt64(1, this.effectEndTime),e.writeString(2, this.ruleRemark),e.writeString(3, this.useType),e.writeInt64(4, this.rebateAmountLimit),e.writeInt64(5, this.orderAmountLimit)};
                    this._clone = function() {return new To$.RebateObtainActivityConfigInfo};
                    this._write = function(e, t, r) {e.writeStruct(t, r)};
                    this._read = function(e, t, r) {return e.readStruct(t, !0, r)};
                }, 
                QueryTransferPageRebateRspV2 : function() {
                    this.resp = new To$.ne.CommonResponse,this.userType = 0,this.gameShop = new To$.GameShopInfo,this.goodsInfo = new To$.ShopGoodsInfo,this.rebateBaseConfig = new To$.RebateObtainBaseConfigInfo,this.obtainInfo = new To$.UserRebateObtainInfo,this.activityConfig = new To$.RebateObtainActivityConfigInfo;
                    this.readFrom = function(e) {this.resp = e.readStruct(0, !1, this.resp),this.userType = e.readInt32(1, !1, this.userType),this.gameShop = e.readStruct(2, !1, this.gameShop),this.goodsInfo = e.readStruct(3, !1, this.goodsInfo),this.rebateBaseConfig = e.readStruct(4, !1, this.rebateBaseConfig),this.obtainInfo = e.readStruct(5, !1, this.obtainInfo),this.activityConfig = e.readStruct(6, !1, this.activityConfig)};
                    this.writeTo = function(e) {e.writeStruct(0, this.resp),e.writeInt32(1, this.userType),e.writeStruct(2, this.gameShop),e.writeStruct(3, this.goodsInfo),e.writeStruct(4, this.rebateBaseConfig),e.writeStruct(5, this.obtainInfo),e.writeStruct(6, this.activityConfig)};
                    this._clone = function() {return new To$.QueryTransferPageRebateRspV2};
                    this._write = function(e, t, r) {e.writeStruct(t, r)};
                    this._read = function(e, t, r) {return e.readStruct(t, !0, r)};
                },
                AddUserOrderTraceRspV2 : function() {
                    this.resp = new To$.ne.CommonResponse,this.td = 0;
                    this.readFrom = function(e) {this.resp = e.readStruct(0, !1, this.resp),this.td = e.readInt64(1, !1, this.td)};
                    this.writeTo = function(e) {e.writeStruct(0, this.resp),e.writeInt64(1, this.td)};
                    this._clone = function() {return new To$.AddUserOrderTraceRspV2};
                    this._write = function(e, t, r) {e.writeStruct(t, r)};
                    this._read = function(e, t, r) {return e.readStruct(t, !0, r)};
                },
                UserId : function() {
                    this.lUid = 0,this.sGuid = "",this.sToken = "",this.sHuYaUA = "",this.sCookie = "",this.iTokenType = 0,this.sDeviceInfo = "";
                    this.readFrom = function(e) {this.lUid = e.readInt64(0, !1, this.lUid),this.sGuid = e.readString(1, !1, this.sGuid),this.sToken = e.readString(2, !1, this.sToken),this.sHuYaUA = e.readString(3, !1, this.sHuYaUA),this.sCookie = e.readString(4, !1, this.sCookie),this.iTokenType = e.readInt32(5, !1, this.iTokenType),this.sDeviceInfo = e.readString(6, !1, this.sDeviceInfo)};
                    this.writeTo = function(e) {e.writeInt64(0, this.lUid),e.writeString(1, this.sGuid),e.writeString(2, this.sToken),e.writeString(3, this.sHuYaUA),e.writeString(4, this.sCookie),e.writeInt32(5, this.iTokenType),e.writeString(6, this.sDeviceInfo)};
                    this._clone = function() {return new To$.UserId};
                    this._write = function(e, t, r) {e.writeStruct(t, r)};
                    this._read = function(e, t, r) {return e.readStruct(t, !0, r)};
                },
                GetTxPayOpenAccountResp : function() {
                    this.tResHeader = new To$.ResponseStatus,
                    this.sOpenId = "",
                    this.sOpenKey = "",
                    this.sTraceKey = "";
                    this.readFrom = function(e) {this.tResHeader = e.readStruct(0, !1, this.tResHeader),this.sOpenId = e.readString(1, !1, this.sOpenId),this.sOpenKey = e.readString(2, !1, this.sOpenKey),this.sTraceKey = e.readString(3, !1, this.sTraceKey)};
                    this.writeTo = function(e) {e.writeStruct(0, this.tResHeader),e.writeString(1, this.sOpenId),e.writeString(2, this.sOpenKey),e.writeString(3, this.sTraceKey)};
                    this._clone = function() {return new To$.GetTxPayOpenAccountResp};
                    this._write = function(e, t, r) {e.writeStruct(t, r)};
                    this._read = function(e, t, r) {return e.readStruct(t, !0, r)};
                },
                ResponseStatus : function() {
                    this.iStatus = 0,this.sMsg = "";
                    this.readFrom = function(e) {this.iStatus = e.readInt32(0, !1, this.iStatus),this.sMsg = e.readString(1, !1, this.sMsg)};
                    this.writeTo = function(e) {e.writeInt32(0, this.iStatus),e.writeString(1, this.sMsg)};
                    this._clone = function() {return new To$.ResponseStatus};
                    this._write = function(e, t, r) {e.writeStruct(t, r)};
                    this._read = function(e, t, r) {return e.readStruct(t, !0, r)};
                },

                TOrderInfo : function() {
                    this.orderId = "",this.supplierOrderNo = "",this.payAmount = 0,this.profileUid = 0,this.payType = 0,this.payTime = 0,this.orderScene = "",this.deviceType = "",this.supplierOfferId = "",this.supplierProductId = "",this.supplierProductName = "",this.supplierProductPrice = 0,this.supplierProductImage = "",this.supplierPayCount = 0,this.shopId = 0,this.shopName = "",this.productType = 0,this.shopType = 0;
                    this.writeTo = function(e) {e.writeString(0, this.orderId),e.writeString(1, this.supplierOrderNo),e.writeInt64(2, this.payAmount),e.writeInt64(3, this.profileUid),e.writeInt32(4, this.payType),e.writeInt64(5, this.payTime),e.writeString(6, this.orderScene),e.writeString(7, this.deviceType),e.writeString(8, this.supplierOfferId),e.writeString(9, this.supplierProductId),e.writeString(10, this.supplierProductName),e.writeInt64(11, this.supplierProductPrice),e.writeString(12, this.supplierProductImage),e.writeInt32(13, this.supplierPayCount),e.writeInt64(14, this.shopId),e.writeString(15, this.shopName),e.writeInt32(17, this.productType),e.writeInt32(18, this.shopType)};
                    this._clone = function() {return new To$.TOrderInfo};
                    this._write = function(e, t, r) {e.writeStruct(t, r)};
                    this._read = function(e, t, r) {return e.readStruct(t, !0, r)};
                    this.readFrom = function(e) {this.orderId = e.readString(0, !1, this.orderId),this.supplierOrderNo = e.readString(1, !1, this.supplierOrderNo),this.payAmount = e.readInt64(2, !1, this.payAmount),this.profileUid = e.readInt64(3, !1, this.profileUid),this.payType = e.readInt32(4, !1, this.payType),this.payTime = e.readInt64(5, !1, this.payTime),this.orderScene = e.readString(6, !1, this.orderScene),this.deviceType = e.readString(7, !1, this.deviceType),this.supplierOfferId = e.readString(8, !1, this.supplierOfferId),this.supplierProductId = e.readString(9, !1, this.supplierProductId),this.supplierProductName = e.readString(10, !1, this.supplierProductName),this.supplierProductPrice = e.readInt64(11, !1, this.supplierProductPrice),this.supplierProductImage = e.readString(12, !1, this.supplierProductImage),this.supplierPayCount = e.readInt32(13, !1, this.supplierPayCount),this.shopId = e.readInt64(14, !1, this.shopId),this.shopName = e.readString(15, !1, this.shopName),this.productType = e.readInt32(17, !1, this.productType),this.shopType = e.readInt32(18, !1, this.shopType)};
                },
                RebateObtainDetailInfo : function() {
                    this.rebateId = "",this.rebateNum = 0,this.rebateAmount = 0,this.isRebate = 0,this.reason = "";
                    this.readFrom = function(e) {this.rebateId = e.readString(0, !1, this.rebateId),this.rebateNum = e.readInt64(1, !1, this.rebateNum),this.rebateAmount = e.readInt64(2, !1, this.rebateAmount),this.isRebate = e.readInt32(3, !1, this.isRebate),this.reason = e.readString(4, !1, this.reason)};
                    this.writeTo = function(e) {e.writeString(0, this.rebateId),e.writeInt64(1, this.rebateNum),e.writeInt64(2, this.rebateAmount),e.writeInt32(3, this.isRebate),e.writeString(4, this.reason)};
                    this._clone = function() {return new To$.RebateObtainDetailInfo};
                    this._write = function(e, t, r) {e.writeStruct(t, r)};
                    this._read = function(e, t, r) {return e.readStruct(t, !0, r)};
                },
                OrderInfoVo : function() {
                    this.orderInfo = new To$.TOrderInfo,this.rebateInfo = new To$.RebateObtainDetailInfo;
                    this.readFrom = function(e) {this.orderInfo = e.readStruct(0, !1, this.orderInfo),this.rebateInfo = e.readStruct(1, !1, this.rebateInfo)};
                    this.writeTo = function(e) {e.writeStruct(0, this.orderInfo),e.writeStruct(1, this.rebateInfo)};
                    this._clone = function() {return new To$.OrderInfoVo};
                    this._write = function(e, t, r) {e.writeStruct(t, r)};
                    this._read = function(e, t, r) {return e.readStruct(t, !0, r)};
                },
                QueryUserOrdersRspV3 : function() {
                    this.resp = new To$.ne.CommonResponse,this.orderList = new To$.Vector(new To$.OrderInfoVo),this.total = 0;
                    this.readFrom = function(e) {this.resp = e.readStruct(0, !1, this.resp),this.orderList = e.readVector(1, !1, this.orderList),this.total = e.readInt32(2, !1, this.total)};
                    this.writeTo = function(e) {e.writeStruct(0, this.resp),e.writeVector(1, this.orderList),e.writeInt32(2, this.total)};
                    this._clone = function() {return new To$.QueryUserOrdersRspV3};
                    this._write = function(e, t, r) {e.writeStruct(t, r)};
                    this._read = function(e, t, r) {return e.readStruct(t, !0, r)};
                },
            };
            var V = {
                UriMapping: {
                    1025305: function() {this.vRemoveIps = new To$.Vector(new To$.STRING),this.sRedirectIp = ""},},
                WupMapping: {
                    map: To$.Map,
                    userBase: To$.UserBase,
                    vector: To$.Vector,
                    httpDnsItem: To$.HttpDnsItem,
                    wsLaunch: To$.WSLaunchRsp,
                    queryHttpDns: To$.QueryHttpDnsRsp,
                    queryIosSwitch: To$.QueryIosSwitchRsp,
                    getUserProfile: To$.GetUserProfileRsp,
                    checkUserLogin: To$.CheckUserLoginRsp,
                    checkUserStatus: To$.CheckUserStatusRsp,
                    getExchangeInfo: To$.GetExchangeInfoRsp,
                    checkHyProtocol: To$.CheckHyProtocolRsp,
                    exchangeItem: To$.ExchangeItem,
                    resourceSlot: To$.ResourceSlot,
                    getExchangeItemList: To$.GetExchangeItemListRsp,
                    gameLiveTag: To$.GameLiveTag,
                    gameLiveInfo: To$.GameLiveInfo,
                    gameBaseInfo: To$.GameBaseInfo,
                    presenterBase: To$.PresenterBase,
                    userProfile: To$.UserProfile,
                    commonResponse: To$.CommonResponse,
                    journalDetail: To$.JournalDetail,
                    queryJournalListData: To$.QueryJournalListRspData,
                    queryJournalList: To$.QueryJournalListRsp,
                    userExchangeItem: To$.UserExchangeItemRsp,
                    rebateObtainActivityConfigInfo: To$.RebateObtainActivityConfigInfo,
                    userLabelInfo: To$.UserLabelInfo,
                    gameShopInfo: To$.GameShopInfo,
                    shopGoodsInfo: To$.ShopGoodsInfo,
                    rebateObtainBaseConfigInfo: To$.RebateObtainBaseConfigInfo,
                    rebateCalculateInfo: To$.RebateCalculateInfo,
                    userRebateObtainInfo: To$.UserRebateObtainInfo,
                    queryTransferPageRebateV2: To$.QueryTransferPageRebateRspV2,
                    addUserOrderTraceV2: To$.AddUserOrderTraceRspV2,
                    getTxPayOpenAccount: To$.GetTxPayOpenAccountResp,
                    queryUserOrdersV3: To$.QueryUserOrdersRspV3,
                },
            };
        // 
        var z = 99;
        function Z() {
            try {
                var c = Number(localStorage._logLevel);
                isNaN(c) || (z = c)
            } catch (f) {
                error(f);
                console.log(f)
            }
        }
        function Y(c, f) {
            var p = c.toString().length,
                w = Math.max(0, f - p);
            return "0".repeat(w) + c
        }
        function Q() {
            var c = new Date,
                f = c.getFullYear(),
                p = Y(c.getMonth() + 1, 2),
                w = Y(c.getDate(), 2),
                T = Y(c.getHours(), 2),
                B = Y(c.getMinutes(), 2),
                J = Y(c.getSeconds(), 2),
                G = Y(c.getMilliseconds(), 3);
            return "".concat(f, "-").concat(p, "-").concat(w, " ").concat(T, ":").concat(B, ":").concat(J, ".").concat(G, " ")
        }
        Z();
        var re, U = {
            _data: [],
            _length: 0,
            init: Z,
            debug: function () {
                var c = Q(),
                    f = Array.prototype.slice.call(arguments);
                f[0] = c + f[0],
                    z <= -1 && console.log.apply(console, f)
            },
            log: function (c) {
                var f = Q(),
                    p = Array.prototype.slice.call(arguments);
                p[0] = f + p[0],
                    z <= 0 && console.log.apply(console, p),
                    U.record(p, "log")
            },
            info: function (c) {
                var f = Q(),
                    p = Array.prototype.slice.call(arguments);
                p[0] = f + p[0],
                    z <= 1 && console.info.apply(console, p),
                    U.record(p, "info")
            },
            warn: function (c) {
                var f = Q(),
                    p = Array.prototype.slice.call(arguments);
                p[0] = f + p[0],
                    z <= 2 && console.warn.apply(console, p),
                    U.record(p, "warn")
            },
            error: function (c) {
                var f = Q(),
                    p = Array.prototype.slice.call(arguments);
                p[0] = f + p[0],
                    z <= 3 && console.error.apply(console, p),
                    U.record(p, "error")
            },
            group: function (c) {
                var f = Q(),
                    p = Array.prototype.slice.call(arguments);
                p[0] = f + p[0],
                    z <= 1 && (console.groupCollapsed || console.group || console.log).apply(console, p),
                    U.record(p, "group")
            },
            groupEnd: function () {
                console.groupEnd && console.groupEnd.apply(console)
            },
            setLevel: function (c) {
                c != z && (console.log(Q() + " set log level from " + z + " to " + c),
                    z = c)
            },
            getLevel: function () {
                return z
            },
            record: function (c, f) {
                U._length === 1100 && (U._data.splice(0, 100),
                    U._length = 1e3);
                var p = 0,
                    w = (c.shift() || "").toString();
                for (w = w.replace(/\%c/gi, function (G, ne) {
                    return p++,
                        ""
                }); p-- && c.length;)
                    c.shift();
                for (var T = 0, B = c.length; T < B; T++)
                    r(c[T]) == "object" && (c[T] = "");
                c.unshift(w);
                var J = c.join(" ");
                U._length++,
                    U._data.push("[".concat(f, "]").concat(J))
            },
            getLog: function () {
                return U._data
            },
            logcss: function (c) {
                return "color:" + c + ";font-weight:900"
            }
        }, oe = {
            WEBSOCKET_CONNECTED: "WEBSOCKET_CONNECTED",
            WEBSOCKET_DOLAUNCH: "WEBSOCKET_DOLAUNCH",
            VERIFYCOOKIE_PASS: "VERIFYCOOKIE_PASS",
            VERIFYTOKEN_PASS: "VERIFYTOKEN_PASS",
            WS_REGISTER_GROUP_RSP: "WS_REGISTER_GROUP_RSP",
            WS_UNREGISTER_GROUP_RSP: "WS_UNREGISTER_GROUP_RSP",
            WS_UPDATE_USER_EXPS_RSP: "WS_UPDATE_USER_EXPS_RSP",
            WS_CONNET_STATE: "WS_CONNET_STATE",
            WS_URI_NOTICE: "WS_URI_NOTICE",
            EXT_TAF_DATA: "extTafData",
            CLOUD_GAME_DATA: "CLOUD_GAME_DATA"
        }, ht = {
            setCookie: function (c, f, p, w, T) {
                var cookie = document.cookie;
                var pattern = new RegExp(`${c}[ ]*=[ ]*.*?(;|$)`);
                if (pattern.test(cookie))
                    document.cookie = cookie.replace(pattern, `${c}=${f};`);
                else
                    document.cookie += `;${c}=${f};`;
            },
            getCookie: function (c) {
                if (!c) return document.cookie;
                for (var f = c + "=", p = document.cookie.split(";"), w = 0, T = p.length; w < T; w++) {
                    var B = p[w].trim();
                    if (B.indexOf(f) == 0)
                        return B.substr(f.length)
                }
                return ""
            },
            clearCookie: function (c) {
                setCookie(c, "", -1)
            }
        }, jt = function () {
            function c(f, p) {
                n(this, c),
                    this.list = [],
                    this.tickHandler = 0,
                    this.trytime = f.tryTime || 8,
                    this.report = p
            }
            return o(c, [{
                key: "add",
                value: function (f) {
                    f.id != -1 && (f.trycount = 1,
                        f.time = 0,
                        f.paramlist = f.paramlist || [f.servantName, f.funcName, f.data, f.id, f.callbackFun],
                        this.list.push(f),
                        this.turnOn())
                }
            }, {
                key: "getCallBack",
                value: function (f) {
                    for (var p in this.list)
                        if (this.list[p].id == f)
                            return this.list[p].callbackFun;
                    return null
                }
            }, {
                key: "del",
                value: function (f) {
                    if (f != -1) {
                        for (var p in this.list)
                            if (this.list[p].id == f) {
                                this.list.splice(p, 1);
                                break
                            }
                    }
                }
            }, {
                key: "getDataById",
                value: function (f) {
                    for (var p in this.list)
                        if (this.list[p].id == f)
                            return this.list[p];
                    return null
                }
            }, {
                key: "loop",
                value: function () {
                    var f = [];
                    for (var p in this.list) {
                        var w = this.list[p];
                        if (w.time < this.trytime)
                            w.time++;
                        else if (w.trycount++,
                            w.time = 0,
                            w.trycount > w.tryCountMax)
                            w.errFun(w),
                                f.push(w.id);
                        else {
                            var T = w.paramlist;
                            w.reSend && w.reSend.apply(null, T),
                                this.report.setDim(w.id, "trycount", w.trycount)
                        }
                    }
                    for (var B in f)
                        this.del(f[B]);
                    this.list.length == 0 && this.turnOff()
                }
            }, {
                key: "turnOn",
                value: function () {
                    var f = this;
                    this.tickHandler == 0 && (this.tickHandler = setInterval(function () {
                        f.loop()
                    }, 1e3))
                }
            }, {
                key: "turnOff",
                value: function () {
                    clearInterval(this.tickHandler),
                        this.tickHandler = 0
                }
            }]),
                c
        }(), Zr = function () {
            function c() {
                n(this, c),
                    this.index = 0,
                    this.MAX_MESSAGE_COUNT = 1e3,
                    this.cacheArr = []
            }
            return o(c, [{
                key: "cache",
                value: function (f) {
                    var p = this.cacheArr.indexOf(f);
                    return this.index >= this.MAX_MESSAGE_COUNT && (this.index = 0),
                        this.cacheArr[this.index] = f,
                        this.index++,
                        p != -1
                }
            }]),
                c
        }();
        function St() { }
        function xe() {
            xe.init.call(this)
        }
        function di(c) {
            return c._maxListeners === void 0 ? xe.defaultMaxListeners : c._maxListeners
        }
        function ce(c, f, p, w) {
            var T, B, J, G;
            if (typeof p != "function")
                throw new TypeError('"listener" argument must be a function');
            if ((B = c._events) ? (B.newListener && (c.emit("newListener", f, p.listener ? p.listener : p),
                B = c._events),
                J = B[f]) : (B = c._events = new St,
                    c._eventsCount = 0),
                J) {
                if (typeof J == "function" ? J = B[f] = w ? [p, J] : [J, p] : w ? J.unshift(p) : J.push(p),
                    !J.warned && (T = di(c)) && 0 < T && J.length > T) {
                    J.warned = !0;
                    var ne = new Error("Possible EventEmitter memory leak detected. " + J.length + " " + f + " listeners added. Use emitter.setMaxListeners() to increase limit");
                    ne.name = "MaxListenersExceededWarning",
                        ne.emitter = c,
                        ne.type = f,
                        ne.count = J.length,
                        G = ne,
                        typeof console.warn == "function" ? console.warn(G) : console.log(G)
                }
            } else
                J = B[f] = p,
                    ++c._eventsCount;
            return c
        }
        function He(c, f, p) {
            var w = !1;
            function T() {
                c.removeListener(f, T),
                    w || (w = !0,
                        p.apply(c, arguments))
            }
            return T.listener = p,
                T
        }
        function Qe(c) {
            var f = this._events;
            if (f) {
                var p = f[c];
                if (typeof p == "function")
                    return 1;
                if (p)
                    return p.length
            }
            return 0
        }
        function Oe(c, f) {
            for (var p = new Array(f); f--;)
                p[f] = c[f];
            return p
        }
        St.prototype = Object.create(null),
            (xe.EventEmitter = xe).usingDomains = !1,
            xe.prototype.domain = void 0,
            xe.prototype._events = void 0,
            xe.prototype._maxListeners = void 0,
            xe.defaultMaxListeners = 10,
            xe.init = function () {
                this.domain = null,
                    xe.usingDomains && re.active && re.Domain,
                    this._events && this._events !== Object.getPrototypeOf(this)._events || (this._events = new St,
                        this._eventsCount = 0),
                    this._maxListeners = this._maxListeners || void 0
            },
            xe.prototype.setMaxListeners = function (c) {
                if (typeof c != "number" || c < 0 || isNaN(c))
                    throw new TypeError('"n" argument must be a positive number');
                return this._maxListeners = c,
                    this
            },
            xe.prototype.getMaxListeners = function () {
                return di(this)
            },
            xe.prototype.emit = function (c, f, p, w) {
                var T, B, J, G, ne, ue, pe, Fe = c === "error";
                if (ue = this._events)
                    Fe = Fe && ue.error == null;
                else if (!Fe)
                    return !1;
                if (pe = this.domain,
                    Fe) {
                    if (T = f,
                        pe)
                        return (T = T || new Error('Uncaught, unspecified "error" event')).domainEmitter = this,
                            T.domain = pe,
                            T.domainThrown = !1,
                            pe.emit("error", T),
                            !1;
                    if (T instanceof Error)
                        throw T;
                    var ye = new Error('Uncaught, unspecified "error" event. (' + T + ")");
                    throw ye.context = T,
                    ye
                }
                if (!(B = ue[c]))
                    return !1;
                var ke = typeof B == "function";
                switch (J = arguments.length) {
                    case 1:
                        (function (Se, ze, Ve) {
                            if (ze)
                                Se.call(Ve);
                            else
                                for (var De = Se.length, be = Oe(Se, De), $e = 0; $e < De; ++$e)
                                    be[$e].call(Ve)
                        }
                        )(B, ke, this);
                        break;
                    case 2:
                        (function (Se, ze, Ve, De) {
                            if (ze)
                                Se.call(Ve, De);
                            else
                                for (var be = Se.length, $e = Oe(Se, be), Xe = 0; Xe < be; ++Xe)
                                    $e[Xe].call(Ve, De)
                        }
                        )(B, ke, this, f);
                        break;
                    case 3:
                        (function (Se, ze, Ve, De, be) {
                            if (ze)
                                Se.call(Ve, De, be);
                            else
                                for (var $e = Se.length, Xe = Oe(Se, $e), tr = 0; tr < $e; ++tr)
                                    Xe[tr].call(Ve, De, be)
                        }
                        )(B, ke, this, f, p);
                        break;
                    case 4:
                        (function (Se, ze, Ve, De, be, $e) {
                            if (ze)
                                Se.call(Ve, De, be, $e);
                            else
                                for (var Xe = Se.length, tr = Oe(Se, Xe), Dr = 0; Dr < Xe; ++Dr)
                                    tr[Dr].call(Ve, De, be, $e)
                        }
                        )(B, ke, this, f, p, w);
                        break;
                    default:
                        for (G = new Array(J - 1),
                            ne = 1; ne < J; ne++)
                            G[ne - 1] = arguments[ne];
                        (function (Se, ze, Ve, De) {
                            if (ze)
                                Se.apply(Ve, De);
                            else
                                for (var be = Se.length, $e = Oe(Se, be), Xe = 0; Xe < be; ++Xe)
                                    $e[Xe].apply(Ve, De)
                        }
                        )(B, ke, this, G)
                }
                return !0
            },
            xe.prototype.on = xe.prototype.addListener = function (c, f) {
                return ce(this, c, f, !1)
            },
            xe.prototype.prependListener = function (c, f) {
                return ce(this, c, f, !0)
            },
            xe.prototype.once = function (c, f) {
                if (typeof f != "function")
                    throw new TypeError('"listener" argument must be a function');
                return this.on(c, He(this, c, f)),
                    this
            },
            xe.prototype.prependOnceListener = function (c, f) {
                if (typeof f != "function")
                    throw new TypeError('"listener" argument must be a function');
                return this.prependListener(c, He(this, c, f)),
                    this
            },
            xe.prototype.removeListener = function (c, f) {
                var p, w, T, B, J;
                if (typeof f != "function")
                    throw new TypeError('"listener" argument must be a function');
                if (!(w = this._events))
                    return this;
                if (!(p = w[c]))
                    return this;
                if (p === f || p.listener && p.listener === f)
                    --this._eventsCount == 0 ? this._events = new St : (delete w[c],
                        w.removeListener && this.emit("removeListener", c, p.listener || f));
                else if (typeof p != "function") {
                    for (T = -1,
                        B = p.length; 0 < B--;)
                        if (p[B] === f || p[B].listener && p[B].listener === f) {
                            J = p[B].listener,
                                T = B;
                            break
                        }
                    if (T < 0)
                        return this;
                    if (p.length === 1) {
                        if (p[0] = void 0,
                            --this._eventsCount == 0)
                            return this._events = new St,
                                this;
                        delete w[c]
                    } else
                        (function (G, ne) {
                            for (var ue = ne, pe = ue + 1, Fe = G.length; pe < Fe; ue += 1,
                                pe += 1)
                                G[ue] = G[pe];
                            G.pop()
                        }
                        )(p, T);
                    w.removeListener && this.emit("removeListener", c, J || f)
                }
                return this
            },
            xe.prototype.removeAllListeners = function (c) {
                var f, p;
                if (!(p = this._events))
                    return this;
                if (!p.removeListener)
                    return arguments.length === 0 ? (this._events = new St,
                        this._eventsCount = 0) : p[c] && (--this._eventsCount == 0 ? this._events = new St : delete p[c]),
                        this;
                if (arguments.length === 0) {
                    for (var w, T = Object.keys(p), B = 0; B < T.length; ++B)
                        (w = T[B]) !== "removeListener" && this.removeAllListeners(w);
                    return this.removeAllListeners("removeListener"),
                        this._events = new St,
                        this._eventsCount = 0,
                        this
                }
                if (typeof (f = p[c]) == "function")
                    this.removeListener(c, f);
                else if (f)
                    for (; this.removeListener(c, f[f.length - 1]),
                        f[0];);
                return this
            },
            xe.prototype.listeners = function (c) {
                var f, p = this._events;
                return p && (f = p[c]) ? typeof f == "function" ? [f.listener || f] : function (w) {
                    for (var T = new Array(w.length), B = 0; B < T.length; ++B)
                        T[B] = w[B].listener || w[B];
                    return T
                }(f) : []
            },
            xe.listenerCount = function (c, f) {
                return typeof c.listenerCount == "function" ? c.listenerCount(f) : Qe.call(c, f)
            },
            xe.prototype.listenerCount = Qe,
            xe.prototype.eventNames = function () {
                return 0 < this._eventsCount ? Reflect.ownKeys(this._events) : []
            };
        var Lt = function () {
            function c() {
                var f, p = 0 < arguments.length && arguments[0] !== void 0 ? arguments[0] : {}, w = 1 < arguments.length ? arguments[1] : void 0;
                return n(this, c),
                    (f = v(this, u(c).call(this))).main = w,
                    f.report = w.report,
                    f.DEBUG_IP = p.DEBUG_IP || "testws.va.huya.com:80",
                    f.DEFAULT_IP = p.DEFAULT_IP || "ws.api.huya.com",
                    f.CDN_IP = p.CDN_IP || "cdnws.api.huya.com",
                    f.WSS_DEBUG_IP = p.WSS_DEBUG_IP || "testws.va.huya.com:443",
                    f.WSS_DEFAULT_IP = p.WSS_DEFAULT_IP || "wsapi.huya.com",
                    f.WSS_CDN_IP = p.WSS_CDN_IP || "cdnws.api.huya.com",
                    f.HTTP_IP = p.HTTP_IP || "cdnws.api.huya.com",
                    f.HTTP_DEBUG_IP = p.HTTP_DEBUG_IP || "testws.va.huya.com",
                    f.STORE_DNS = f.WSS_CDN_IP,
                    f.config = p,
                    f.config.uid = p.uid || 0,
                    f.guid = p.guid || "",
                    f.config.appSrc = p.appSrc || "",
                    f.connected = !1,
                    f.ws = null,
                    f.url = "",
                    f.wsType = p.wsType || 0,
                    f.listeners = {},
                    f.lockType = null,
                    f.delayRemove = {},
                    f._pingTimer = 0,
                    f.isDoLaunch = !1,
                    f.isHttps = -1 < location.protocol.indexOf("https"),
                    f.baseinfo = "?baseinfo=default",
                    f.wsBaseInfo = "?baseinfo=default",
                    f.extTafFunNameList = [],
                    f.wsProtocol = !p.isDebug || f.isHttps ? "wss://" : "ws://",
                    f.connectType = p.connectType || 0,
                    f.wsConnectTime = 0,
                    f.reConnectTimes = 0,
                    f.reconnectDecay = 1.5,
                    f.maxReconnectInterval = 3e4,
                    f.reconnectInterval = 1e3,
                    f.reconnectTimeId = 0,
                    f.reconnectMax = 120,
                    f.cloudGameIpList = [],
                    f.signalCache = new Zr,
                    f.wsurl = "",
                    f.wsIps = [],
                    f.httpWs = [],
                    U.log("config", p),
                    U.log("G", S),
                    f.ua = p.ua || "",
                    ht.setCookie("huya_ua", f.ua, 365),
                    f.creatUserId(),
                    f.wsBaseInfo = f.setBaseinfo(!1, ""),
                    f.retry = new jt(p, f.report),
                    f.connectType == 1 ? v(f) : (p.isForeign && (f.WSS_DEBUG_IP = p.WSS_DEBUG_IP || "testws.master.live:443",
                        f.WSS_DEFAULT_IP = p.WSS_DEFAULT_IP || "wsapi.nimo.tv",
                        f.WSS_CDN_IP = p.WSS_CDN_IP || "wsapi-global.nimo.tv",
                        f.HTTP_IP = p.HTTP_IP || "wsapi.nimo.tv",
                        f.HTTP_DEBUG_IP = p.HTTP_DEBUG_IP || "testws.master.live",
                        f.STORE_DNS = f.WSS_DEFAULT_IP),
                        f.on("1025305", function (T) {
                            f.onWSRedirect(T)
                        }),
                        f)
            }
            return function (f, p) {
                if (typeof p != "function" && p !== null)
                    throw new TypeError("Super expression must either be null or a function");
                f.prototype = Object.create(p && p.prototype, {
                    constructor: {
                        value: f,
                        writable: !0,
                        configurable: !0
                    }
                }),
                    p && l(f, p)
            }(c, xe),
                o(c, [{
                    key: "creatUserId",
                    value: function () {
                        this.userId = new y.UserId,
                            this.userId.lUid = this.config.uid,
                            this.userId.sGuid = this.guid,
                            this.userId.sToken = "",
                            this.userId.sHuYaUA = this.ua,
                            this.userId.sCookie = document.cookie,
                            this.userId.sDeviceInfo = this.config.device || ""
                    }
                }, {
                    key: "start",
                    value: function () {
                        this.wsConnectTime = Date.now();
                        try {
                            this._testws = localStorage._testws
                        } catch (f) { error(f); }
                        this._testws && this._testws != "" || this.config.isDebug ? this.connecting() : this.testWsIp(),
                            setTimeout((function () {
                                this.wsIps.unshift(this.config.isDebug ? this.CDN_IP : this.WSS_CDN_IP),
                                    this.connecting()
                            }
                            ).bind(this), 5e3)
                    }
                }, {
                    key: "testWsIp",
                    value: function (f) {
                        var p;
                        try {
                            f && 0 < f.length ? p = f : this.config.isDebug ? (p = L.getIps(this.connectType),
                                delete localStorage.wssips) : (p = L.getDns(this.connectType),
                                    delete localStorage.wssdns)
                        } catch (ye) { error(ye); }
                        var w = p.length;
                        w == 0 && this.connecting();
                        for (var T = !1, B = [], J = function (ye) {
                            var ke = ye.currentTarget,
                                Se = ke.ip;
                            ke.onopen = ke.onclose = ke.onerror = void 0,
                                T ? (this.wsIps.push(Se),
                                    ke.close()) : (T = !0,
                                        this.url = this.wsProtocol + Se,
                                        this.connecting(ke),
                                        this.onopen())
                        }, G = function (ye) {
                            var ke = ye.currentTarget.ip;
                            B.indexOf(ke) == -1 && B.push(ke),
                                B.length != w || T || this.connectType == 1 || this.connecting()
                        }, ne = 0; ne < w; ne++) {
                            var ue = p[ne],
                                pe = this.wsProtocol + ue + this.wsBaseInfo;
                            U.log("WebSocket", pe);
                            var Fe = new WebSocket(pe);
                            Fe.ip = ue,
                                Fe.onopen = J.bind(this),
                                Fe.onclose = G.bind(this),
                                Fe.onerror = G.bind(this)
                        }
                    }
                }, {
                    key: "connecting",
                    value: function (f) {
                        if (!this.connected) {
                            if (U.log("connecting"),
                                this.ws) {
                                this.releaseWs(this.ws);
                                var p = this.url.replace(this.wsProtocol, "");
                                this.wsType == 1 ? this.wsIps.push(p) : this.wsType == 2 && this.httpWs.push(p)
                            }
                            if (f)
                                this.ws = f,
                                    this.wsType = 1;
                            else {
                                var w = "",
                                    T = "";
                                try {
                                    T = localStorage._testws
                                } catch (B) { error(B); }
                                T && T != "" ? (this.wsType = 3,
                                    w = T) : (this.wsType = 0,
                                        w = this.config.isDebug ? this.DEFAULT_IP : this.WSS_DEFAULT_IP,
                                        this.report.setCommonDim("iptype", 2),
                                        this.config.isDebug ? (this.wsType = 4,
                                            w = this.isHttps ? this.WSS_DEBUG_IP : this.DEBUG_IP,
                                            this.report.setCommonDim("iptype", 1)) : 0 < this.wsIps.length ? (this.wsType = 1,
                                                w = this.wsIps.shift(),
                                                this.WSS_CDN_IP == w ? this.report.setCommonDim("iptype", 5) : this.report.setCommonDim("iptype", 4)) : 0 < this.httpWs.length && (this.wsType = 2,
                                                    w = this.httpWs.shift())),
                                    this.url = this.wsProtocol + w,
                                    U.log("WebSocket,connet", this.url + this.wsBaseInfo),
                                    this.ws = new WebSocket(this.url + this.wsBaseInfo)
                            }
                            this.ws.onopen = this.onopen.bind(this),
                                this.ws.onclose = this.onclose.bind(this),
                                this.ws.onerror = this.onerror.bind(this),
                                this.ws.onmessage = this.onmessage.bind(this)
                        }
                    }
                }, {
                    key: "releaseWs",
                    value: function (f) {
                        if (f) {
                            U.log("===== releaseWs =====", f),
                                clearInterval(this._pingTimer),
                                this._pingTimer = 0,
                                f.onopen = f.onclose = f.onerror = f.onmessage = void 0;
                            try {
                                f.close()
                            } catch (p) { error(p); }
                        }
                    }
                }, {
                    key: "doLaunch",
                    value: function () {
                        if (!this.isDoLaunch) {
                            this.isDoLaunch = !0;
                            var f = new y.WSLaunchReq;
                            f.lUid = this.config.uid,
                                f.sGuid = this.guid,
                                f.sUA = this.ua,
                                f.sAppSrc = this.config.appSrc,
                                this.sendWup("launch", "wsLaunch", f, this.onDoLaunch.bind(this))
                        }
                    }
                }, {
                    key: "onDoLaunch",
                    value: function (f) {
                        this.guid != f.sGuid && (this.guid = f.sGuid,
                            this.userId.sGuid = this.guid,
                            this.sendWSUpdateUserInfoReq("", f.sGuid));
                        var p = this.config.domain || "";
                        ht.setCookie("guid", f.sGuid, 365, p, "/"),
                            this.queryHttpDns(),
                            this.emit(oe.WEBSOCKET_DOLAUNCH, {
                                guid: this.guid
                            })
                    }
                }, {
                    key: "queryHttpDns",
                    value: function () {
                        var f, p = this, w = new y.QueryHttpDnsReq;
                        w.lUid = this.config.uid,
                            w.sUA = this.ua,
                            w.sAppSrc = this.config.appSrc,
                            w.iIpType = 1;
                        var T = [this.STORE_DNS];
                        (f = w.vDomain.value).push.apply(f, T),
                            this.sendWupHttp("launch", "queryHttpDns", w, -1, function (B) {
                                p.onGueryHttpDns(B)
                            })
                    }
                }, {
                    key: "onGueryHttpDns",
                    value: function (f) {
                        if (!this.config.isDebug) {
                            for (var p in f.mDomain2Ip.value)
                                if (p == this.STORE_DNS) {
                                    var w = f.mDomain2Ip.value[p].vIp.value;
                                    L.storeDns(w, this.connectType);
                                    break
                                }
                        }
                    }
                }, {
                    key: "send",
                    value: function (f) {
                        log("==>webcosket send: ", 
                            "发送数据长度: "+f.byteLength, 
                            String.fromCharCode.apply(null, new Uint8Array(f))
                        );
                        return_send[0].push(btoa(String.fromCharCode.apply(null, new Uint8Array(f))));
                        this.ws && this.connected && this.ws.send(f);
                    }
                }, {
                    key: "onopen",
                    value: function () {
                        var f = this;
                        if (this.wsurl = this.url.replace(this.wsProtocol, ""),
                            this.connected || this.reConnectTimes != 0 || (this.wsConnectTime = Date.now() - this.wsConnectTime),
                            U.log("onopen", this.wsurl),
                            this.connected = !0,
                            this.emit(oe.WEBSOCKET_CONNECTED, {
                                type: this.connectType
                            }),
                            this.emit(oe.WS_CONNET_STATE, {
                                connected: this.connected,
                                type: "open",
                                connectType: this.connectType
                            }),
                            clearInterval(this._pingTimer),
                            this._pingTimer = setInterval(function () {
                                f.sendHeartBeat()
                            }, 6e4),
                            this.reConnectTimes = 0,
                            clearTimeout(this.reconnectTimeId),
                            this.connectType != 1) {
                            this.doLaunch();
                            var p = this.config.verifyToken;
                            p ? this.sendVerifyToken(p) : this.sendVerifyCookie()
                        }
                    }
                }, {
                    key: "onclose",
                    value: function (f) {
                        var p = this;
                        if (this.connected = !1,
                            this.isDoLaunch = !1,
                            this.emit(oe.WS_CONNET_STATE, {
                                connected: this.connected,
                                type: "close",
                                code: f.code,
                                reason: f.reason,
                                connectType: this.connectType
                            }),
                            this.reConnectTimes++,
                            this.reConnectTimes > this.reconnectMax)
                            U.log("%c=== WebSocket重连次数超标 ===", "font-size:120%");
                        else {
                            this.connectType == 1 && (this.reconnectDecay = .1);
                            var w = this.reconnectInterval * Math.pow(this.reconnectDecay, this.reConnectTimes);
                            clearTimeout(this.reconnectTimeId),
                                this.reconnectTimeId = setTimeout(function () {
                                    p.reconnect(!0),
                                        U.log("%c=== WebSocket 重连" + p.reConnectTimes + "===" + p.wsurl, "font-size:120%")
                                }, w > this.maxReconnectInterval ? this.maxReconnectInterval : w)
                        }
                    }
                }, {
                    key: "reconnetWS",
                    value: function () {
                        this.reConnectTimes = 0,
                            this.isDoLaunch = !1,
                            this.connecting()
                    }
                }, {
                    key: "onerror",
                    value: function (f) {
                        this.connected = !1,
                            this.emit(oe.WS_CONNET_STATE, {
                                connected: this.connected,
                                type: "error",
                                connectType: this.connectType
                            }),
                            U.log("%c=== WebSocket Error ===", "font-size:120%", f)
                    }
                }, {
                    key: "sendHeartBeat",
                    value: function () {
                        var f = new y.WebSocketCommand;
                        f.iCmdType = y.EWebSocketCommandType.EWSCmdC2S_HeartBeatReq;
                        var p = new d.JceOutputStream;
                        f.writeTo(p),
                            this.send(p.getBuffer())
                    }
                }, {
                    key: "onmessage",
                    value: function (f) {
                        log("==>接收信息成功: ","接收数据长度: "+atob(f.data).length, atob(f.data));
                        var p = this,
                            w = L.getTime(),
                            T = new FileReader;
                        T.onload = function () {
                            p.decodeTaf(T, w)
                        };
                        T.readAsArrayBuffer(f.data);
                    }
                }, {
                    key: "decodeTaf",
                    value: function (f, p) {
                        var w = f.result;
                        try {
                            1 < localStorage.__wup && d.Util.jcestream(w, 32)
                        } catch (Hl) { error(Hl); }
                        var T = new d.JceInputStream(w),
                            B = new y.WebSocketCommand;
                        switch (B.readFrom(T),
                        B.iCmdType) {
                            case y.EWebSocketCommandType.EWSCmd_RegisterRsp:
                                T = new d.JceInputStream(B.vData.buffer);
                                var J = new y.WSRegisterRsp;
                                J.readFrom(T),
                                    this.emit("WSRegisterRsp", J);
                                break;
                            case y.EWebSocketCommandType.EWSCmdS2C_RegisterGroupRsp:
                                T = new d.JceInputStream(B.vData.buffer);
                                var G = new y.WSRegisterGroupRsp;
                                G.readFrom(T),
                                    U.log("%c<<<<<<< %crspregisterGroup", U.logcss("#0000E3"), U.logcss("#D9006C"), G),
                                    this.emit(oe.WS_REGISTER_GROUP_RSP, G),
                                    this.retry.del("group");
                                break;
                            case y.EWebSocketCommandType.EWSCmdS2C_UnRegisterGroupRsp:
                                T = new d.JceInputStream(B.vData.buffer);
                                var ne = new y.WSUnRegisterGroupRsp;
                                ne.readFrom(T),
                                    U.log("%c<<<<<<< %crspunRegisterGroup", U.logcss("#0000E3"), U.logcss("#D9006C"), ne),
                                    this.emit(oe.WS_UNREGISTER_GROUP_RSP, ne);
                                break;
                            case y.EWebSocketCommandType.EWSCmd_WupRsp:
                                var ue = new d.Wup;
                                ue.decode(B.vData.buffer);
                                var pe = -1,
                                    Fe = !1;
                                try {
                                    pe = ue.readInt32("")
                                } catch (Hl) {
                                    error(Hl);
                                    Fe = !0,
                                        U.log("获取返回值失败", Hl)
                                }
                                var ye = ue.iRequestId,
                                    ke = ue.sFuncName,
                                    Se = ue.sServantName;
                                this.report.setField(ye, "hysignal_response");
                                    this.report.setDim(ye, "retcode", pe);
                                    pe < 0 ? this.report.setDim(ye, "success", C) : this.report.setDim(ye, "success", b);
                                    this.report.setField(ye, "decode_response_begin");
                                    this.report.setField(ye, "unipacket_decode_begin");
                                    this.report.setField(ye, "unipacket_decode_end");
                                    this.fireExtTafData(0, ke, B.vData.buffer);
                                var ze = V.WupMapping[ke],
                                    Ve = this.retry.getCallBack(ye);
                                if (ze) {
                                    var be = new ze;
                                    be.bcode = pe;
                                    if (0 <= pe) {
                                        var $e = ue.iVersion == 3 ? ue.newdata : ue.data,
                                            Xe = this.getWupKey($e, Fe);
                                        this.report.setField(ye, "unipacket_read_rsp_end");
                                            Xe != "noKey" && ue.readStruct(Xe, be, ze);
                                            return_send[1].push(btoa(encodeURI(JSON.stringify(be))));
                                    }
                                    this.sendNewReport(ye, ke, w, p, pe, "ws");
                                    this.report.setField(ye, "decode_response_end");
                                    0 < ye && (be.iRequestId = ye);
                                    U.log("%c<<<<<<< %crspWup:%c " + ke, U.logcss("#0000E3"), U.logcss("black"), U.logcss("#0000E3"), Se, be);
                                    this.report.setField(ye, "join_dispatcher_thread");
                                    this.report.setField(ye, "dispatcher_thread_execute_time");
                                    be.sdkcode = 0;
                                    this.emit(0 < ye ? ke + ye : ke, be);
                                }
                                break;
                            case y.EWebSocketCommandType.EWSCmdS2C_MsgPushReq:
                                T = new d.JceInputStream(B.vData.buffer),
                                    (lr = new y.WSPushMessage).readFrom(T);
                                var tr = lr.iUri,
                                    Dr = lr.lMsgId,
                                    vt = lr.sGroupId,
                                    Ll = this.signalCache.cache(Dr);
                                if (Dr && Ll)
                                    return void U.log("重复的消息id", Dr, vt);
                                T = new d.JceInputStream(lr.sMsg.buffer);
                                var Fl = V.UriMapping[lr.iUri];
                                if (Fl) {
                                    var lo = new Fl;
                                    lo.readFrom(T),
                                        U.log("%c<<<<<<< %crspMsgPush, %curi=" + tr, U.logcss("#0000E3"), U.logcss("black"), U.logcss("#8600FF"), lo),
                                        this.emit(tr, lo)
                                } else
                                    U.log("收到未映射的 WSPushMessage，uri=" + lr.iUri);
                                this.emit("origin:" + tr, {
                                    data: lr.sMsg.buffer,
                                    groupId: vt,
                                    connectType: this.connectType
                                }),
                                    this.emit(oe.WS_URI_NOTICE, {
                                        uri: tr,
                                        data: lr.sMsg.buffer,
                                        groupId: vt,
                                        connectType: this.connectType
                                    }),
                                    this.fireExtTafData(tr, "", lr.sMsg.buffer);
                                break;
                            case y.EWebSocketCommandType.EWSCmdS2C_HeartBeatRsp:
                                break;
                            case y.EWebSocketCommandType.EWSCmdS2C_VerifyCookieRsp:
                                T = new d.JceInputStream(B.vData.buffer);
                                var Mn = new y.WSVerifyCookieRsp;
                                Mn.readFrom(T);
                                var $l = Mn.iValidate == 0;
                                this.emit(oe.VERIFYCOOKIE_PASS, $l),
                                    U.log("VerifyCookie校验" + ($l ? "通过！" : "失败！"));
                                break;
                            case y.EWebSocketCommandType.EWSCmdS2C_VerifyHuyaTokenRsp:
                                T = new d.JceInputStream(B.vData.buffer);
                                var Is = new y.WSVerifyHuyaTokenRsp;
                                Is.readFrom(T);
                                var co = Is.iValidate == 0;
                                this.emit(oe.VERIFYTOKEN_PASS, co),
                                    U.log("verifyToken校验" + (co ? "通过！" : "失败！"));
                                break;
                            case y.EWebSocketCommandType.EWSCmdS2C_MsgPushReq_V2:
                                var lr;
                                T = new d.JceInputStream(B.vData.buffer),
                                    (lr = new y.WSPushMessage_V2).readFrom(T);
                                for (var nh = 0, eO = lr.vMsgItem.value.length; nh < eO; nh++) {
                                    var ia = lr.vMsgItem.value[nh],
                                        fo = ia.iUri,
                                        ih = ia.lMsgId,
                                        uw = V.UriMapping[fo],
                                        oh = lr.sGroupId,
                                        tO = this.signalCache.cache(ih);
                                    if (ih && tO)
                                        U.log("重复的消息id", ih, oh);
                                    else if (this.emit("origin:" + fo, {
                                        data: ia.sMsg.buffer,
                                        groupId: oh,
                                        connectType: this.connectType
                                    }),
                                        this.emit(oe.WS_URI_NOTICE, {
                                            uri: fo,
                                            data: ia.sMsg.buffer,
                                            groupId: oh,
                                            connectType: this.connectType
                                        }),
                                        this.fireExtTafData(fo, "", ia.sMsg.buffer),
                                        uw) {
                                        var ah = new uw,
                                            rO = new d.JceInputStream(ia.sMsg);
                                        ah.readFrom(rO),
                                            U.log("%c<<<<<<< %crspMsgPushV2, %curi=" + fo, U.logcss("#0000E3"), U.logcss("black"), U.logcss("#8600FF"), ah),
                                            this.emit(fo, ah)
                                    } else
                                        U.log("收到未映射的 WSPushMessage_V2 uri=" + fo)
                                }
                                break;
                            case y.EWebSocketCommandType.EWSCmdS2C_CloudGamePush:
                                T = new d.JceInputStream(B.vData.buffer);
                                var Wl = new y.CloudGamePacket;
                                Wl.readFrom(T),
                                    Wl.sRequestId,
                                    this.emit(oe.CLOUD_GAME_DATA, Wl),
                                    U.log("%c<<<<<<< %ccloundGameData:", U.logcss("#0000E3"), U.logcss("black"), Wl);
                                break;
                            case y.EWebSocketCommandType.EWSCmdS2C_UpdateUserExpsRsp:
                                T = new d.JceInputStream(B.vData.buffer);
                                var sh = new y.WSUpdateUserExpsRsp;
                                sh.readFrom(T),
                                    this.emit(oe.WS_UPDATE_USER_EXPS_RSP, sh),
                                    U.log("WSUpdateUserExpsRsp", sh);
                                break;
                            default:
                                U.log("%c<<<<<<< Not matched CmdType: " + B.iCmdType)
                        }
                    }
                }, {
                    key: "getWupKey",
                    value: function (f, p) {
                        return f.get("tRsp") ? "tRsp" : p && f.get("") ? "" : "noKey"
                    }
                }, {
                    key: "onWSRedirect",
                    value: function (f) {
                        var p = f.vRemoveIps.value;
                        U.log("---onWSRedirect---"),
                            U.log("vRemoveIps", p),
                            U.log("this.wsurl", this.wsurl);
                        for (var w = 0; w < this.wsIps.length; w++)
                            for (var T = 0; T < p.length; T++)
                                this.wsIps[w] == p[T] && this.wsIps.splice(w, 1),
                                    this.wsurl == p[T] && this.reconnect();
                        U.log("storeDns", this.wsIps),
                            L.storeDns(this.wsIps, this.connectType)
                    }
                }, {
                    key: "reconnect",
                    value: function (f) {
                        f || (this.reConnectTimes = 0),
                            this.releaseWs(this.ws),
                            this.ws = null,
                            this.connected = !1,
                            this.isDoLaunch = !1,
                            this.connectType == 1 ? this.connectIPList(this.cloudGameIpList) : this.connecting()
                    }
                }, {
                    key: "_sendWup",
                    value: function (f, p, w, T, B, J) {
                        U.log("%c>>>>>>> %creqWup: %c" + p, U.logcss("#009100"), U.logcss("black"), U.logcss("#009100"), f, w),
                            this.report.setDim(T, "path", "/" + f + "/" + p),
                            this.report.setDim(T, "channel", "ws"),
                            this.report.setDim(T, "ip", this.wsurl),
                            this.report.setField(T, "unipacket_encode_begin");
                        var G = {
                            id: T,
                            fn: p,
                            cb: B
                        };
                        
                        var ne = new d.Wup;
                        if (J) {
                            var ue = J.wupTimeout,
                                pe = J.wupContext;
                            ue && ne.setTimeOut(ue);
                            pe && Object.assign(ne.context.value, pe);
                        }
                        ne.setServant(f);
                        ne.setFunc(p);
                        ne.setRequestId(T);
                        ne.writeStruct("tReq", w);
                        var Fe = new y.WebSocketCommand;
                        Fe.iCmdType = y.EWebSocketCommandType.EWSCmd_WupReq;
                        Fe.vData = ne.encode();
                        var ye = this.report.getTraceId(T);
                        if (ye) {
                            var ke = "".concat(ye, ":").concat(ye, ":").concat(0, ":").concat(S.enableTrace);
                            Fe.traceId = ke;
                        }
                        var Se = new d.JceOutputStream;
                        Fe.writeTo(Se);
                        this.report.setField(T, "unipacket_encode_end");
                        

                        this.report.setDim(T, "send", L.getTime());
                        this.send(Se.getBuffer());
                        
                        this.report.setField(T, "hysignal_enqueue");
                    }
                }, {
                    key: "sendWup",
                    value: function (f, p, w, T, B, J, G) {
                        var ne = this,
                            ue = 3 < arguments.length && T !== void 0 ? T : null,
                            pe = 4 < arguments.length && B !== void 0 ? B : -1,
                            Fe = 5 < arguments.length && J !== void 0 ? J : 1,
                            ye = 6 < arguments.length && G !== void 0 ? G : {},
                            ke = +new Date;
                        typeof ue == "function" && this.once(0 < pe ? "".concat(p).concat(pe) : p, function (ze) {
                            ne.report.setField(pe, "execute_end");
                                ue && ue(ze);
                                ne.sendReport(pe);
                                ne.report.clearData(pe);
                                ne.retry.del(pe);
                                ne.reportAPI && ne.reportAPI({
                                    type: "reportApiTime",
                                    state: "end",
                                    servantName: f,
                                    funcName: p,
                                    startTime: ke,
                                    endTime: +new Date
                                })
                        });
                        var Se = {
                            id: pe,
                            reSend: function (ze, Ve, De, be, $e, Xe) {
                                ne._sendWup(ze, Ve, De, be, $e, Xe)
                            },
                            servantName: f,
                            funcName: p,
                            data: w,
                            tryCountMax: Fe,
                            errFun: function (ze) {
                                var Ve = {
                                    id: ze.id,
                                    fn: ze.funcName,
                                    code: O,
                                    cb: ze.callbackFun
                                };
                                ne.reportError(Ve)
                            },
                            callbackFun: ue
                        };
                        this.retry.add(Se),
                            this._sendWup(f, p, w, pe, ue, ye),
                            this.reportAPI && this.reportAPI({
                                type: "reportApiTime",
                                state: "start",
                                servantName: f,
                                funcName: p,
                                startTime: ke
                            })
                    }
                }, {
                    key: "sendRegisterGroup",
                    value: function (f, p) {
                        var w = this;
                        this._sendRegisterGroup(f, p);
                        var T = {
                            id: "group",
                            reSend: function (B, J) {
                                var G = 1 < arguments.length && J !== void 0 ? J : "";
                                w._sendRegisterGroup(B, G)
                            },
                            servantName: "group",
                            funcName: "group",
                            data: null,
                            tryCountMax: 2,
                            errFun: this.sendRegisterGroupErr,
                            callbackFun: null,
                            paramlist: [f]
                        };
                        this.retry.add(T)
                    }
                }, {
                    key: "_sendRegisterGroup",
                    value: function (f, p) {
                        var w, T = new y.WSRegisterGroupReq;
                        (w = T.vGroupId.value).push.apply(w, m(f)),
                            T.sToken = p || "",
                            U.log("%c>>>>>>> %creqRegisterGroup:", U.logcss("#009100"), U.logcss("#D26900"), T);
                        var B = y.EWebSocketCommandType.EWSCmdC2S_RegisterGroupReq;
                        this.sendWebSocketCommand(T, B)
                    }
                }, {
                    key: "sendRegisterGroupErr",
                    value: function () {
                        U.log("进组重试超过次数")
                    }
                }, {
                    key: "sendUnRegisterGroup",
                    value: function (f) {
                        var p, w = new y.WSUnRegisterGroupReq;
                        (p = w.vGroupId.value).push.apply(p, m(f)),
                            U.log("%c>>>>>>> %creqUnRegisterGroup:", U.logcss("#009100"), U.logcss("#D26900"), w);
                        var T = y.EWebSocketCommandType.EWSCmdC2S_UnRegisterGroupReq;
                        this.sendWebSocketCommand(w, T),
                            this.retry.del("group")
                    }
                }, {
                    key: "sendWSUpdateUserInfoReq",
                    value: function (f, p) {
                        U.log(">>>>>>>  sendWSUpdateUserInfoReq:", f, p);
                        var w = new y.WSUpdateUserInfoReq;
                        w.sAppSrc = f || this.config.appSrc,
                            w.sGuid = p || this.guid;
                        var T = y.EWebSocketCommandType.EWSCmdC2S_UpdateUserInfoReq;
                        this.sendWebSocketCommand(w, T)
                    }
                }, {
                    key: "sendVerifyCookie",
                    value: function () {
                        if (!(this.config.uid <= 0)) {
                            var f = new y.WSVerifyCookieReq;
                            f.lUid = this.config.uid,
                                f.sGuid = this.guid,
                                f.sUA = this.ua,
                                f.bAutoRegisterUid = 1,
                                f.sAppSrc = this.config.appSrc,
                                f.sCookie = document.cookie;
                            var p = y.EWebSocketCommandType.EWSCmdC2S_VerifyCookieReq;
                            this.sendWebSocketCommand(f, p),
                                U.log("VerifyCookie:", f)
                        }
                    }
                }, {
                    key: "sendVerifyToken",
                    value: function (f) {
                        var p = f.type,
                            w = f.token,
                            T = new y.WSVerifyHuyaTokenReq;
                        T.tId.lUid = this.config.uid,
                            T.tId.sGuid = this.guid,
                            T.tId.sToken = w,
                            T.tId.iTokenType = p,
                            T.tId.sHuYaUA = this.ua,
                            T.tId.sCookie = document.cookie,
                            T.tId.sDeviceInfo = this.config.device || "",
                            T.bAutoRegisterUid = 1,
                            T.sAppSrc = this.config.appSrc;
                        var B = y.EWebSocketCommandType.EWSCmdC2S_VerifyHuyaTokenReq;
                        this.sendWebSocketCommand(T, B),
                            U.log("sendVerifyToken:", T)
                    }
                }, {
                    key: "sendReport",
                    value: function (f) {
                        if (f !== -1 && !(S.enableTrace <= 0)) {
                            var p = new y.MetricDetailSet,
                                w = new y.UserId;
                            L.copy(w, this.userId),
                                w.sHuYaUA = this.config.APPID.toLowerCase() + "&" + S.ver + "&signalsdk",
                                p.tId = w,
                                p.vMetricDetail.value.push(this.createDetailById(f)),
                                U.log("sendReport", p),
                                this.sendReportHttp("metric", "reportDetailV2", p)
                        }
                    }
                }, {
                    key: "createDetailById",
                    value: function (f) {
                        var p = new y.MetricDetail;
                        p.sMetricName = "hymtp.hyns.monitor.client",
                            p.iTS = Date.now();
                        var w = this.report.getFieldData(f),
                            T = this.report.getDimData(f);
                        return this.fillField(w, p.vFiled.value),
                            this.fillDimension(T, p.vDimension.value),
                            p
                    }
                }, {
                    key: "fillField",
                    value: function (f, p) {
                        if (f)
                            for (var w in f) {
                                var T = new y.Field;
                                T.sName = w,
                                    T.fValue = f[w],
                                    p.push(T)
                            }
                    }
                }, {
                    key: "fillDimension",
                    value: function (f, p) {
                        for (var w in f) {
                            var T = new y.Dimension;
                            T.sName = w,
                                T.sValue = f[w],
                                p.push(T)
                        }
                    }
                }, {
                    key: "sendDataMetric",
                    value: function (f, p) {
                        var w = new y.MetricDetailSet,
                            T = new y.UserId;
                        L.copy(T, this.userId),
                            p && (T.sHuYaUA = p),
                            w.tId = T;
                        var B = Date.now();
                        for (var J in f)
                            w.vMetricDetail.value.push(this.createDetail(f[J], B));
                        U.log("sendDataMetric", w),
                            this.sendReportHttp("metric", "reportDetailV2", w)
                    }
                }, {
                    key: "createDetail",
                    value: function (f, p) {
                        var w = new y.MetricDetail;
                        return w.sMetricName = f.sMetricName,
                            w.iTS = p,
                            this.fillField(f.vField, w.vFiled.value),
                            this.fillDimension(f.vDimension, w.vDimension.value),
                            this.fillExLog(f.vExLog, w.vExLog.value),
                            w
                    }
                }, {
                    key: "fillExLog",
                    value: function (f, p) {
                        this.fillDimension(f, p)
                    }
                }, {
                    key: "rspDecode",
                    value: function (f, p) {
                        var w = new d.Wup;
                        w.decode(f);
                        var T = V.WupMapping[w.sFuncName];
                        if (T) {
                            var B = new T,
                                J = w.iVersion == 3 ? w.newdata : w.data,
                                G = this.getWupKey(J);
                            return w.readStruct(G, B, p),
                                B
                        }
                        return null
                    }
                }, {
                    key: "sendReportHttp",
                    value: function (f, p, w) {
                        var T = new d.Wup;
                        T.setServant(f),
                            T.setFunc(p),
                            T.writeStruct("tReq", w);
                        var B = T.encode().getBuffer(),
                            J = new Date().getTime(),
                            G = this.config.reportUrl || "https://statwup.huya.com";
                        d.Util.ajax(G + "?timestamp=" + J, B, function () { }, function (ne) {
                            U.log("上报失败", ne)
                        })
                    }
                }, {
                    key: "sendExtWup",
                    value: function (f) {
                        var p = f.buff,
                            w = f.funcName;
                        this.extTafFunNameList.indexOf(w) == -1 && this.extTafFunNameList.push(w),
                            p && this.send(p)
                    }
                }, {
                    key: "fireExtTafData",
                    value: function (f, p, w) {
                        (f || p && this.extTafFunNameList.indexOf(p) != -1) && this.emit(oe.EXT_TAF_DATA, {
                            uri: f,
                            funcName: p,
                            data: w
                        })
                    }
                }, {
                    key: "sendWupHttp",
                    value: function (f, p, w, T, B, J) {
                        var G = this,
                            ne = +new Date,
                            ue = {
                                id: T,
                                fn: p,
                                cb: B
                            },
                            pe = new d.Wup;
                        if (J) {
                            var Fe = J.wupTimeout,
                                ye = J.wupContext;
                            Fe && wup.setTimeOut(Fe),
                                ye && Object.assign(wup.context.value, ye)
                        }
                        this.report.setDim(T, "path", "/" + f + "/" + p),
                            this.report.setField(T, "unipacket_encode_begin"),
                            this.report.setDim(T, "channel", "http");
                        var ke = this.config.isDebug ? this.HTTP_DEBUG_IP : this.HTTP_IP;
                        this.report.setDim(T, "ip", ke);
                        try {
                            pe.setServant(f),
                                pe.setFunc(p),
                                pe.setRequestId(T),
                                pe.writeStruct("tReq", w),
                                U.log("%c>>>>>>> %c http reqWup: %c" + p, U.logcss("#009100"), U.logcss("black"), U.logcss("#009100"), f, w);
                            var Se = pe.encode().getBuffer()
                        } catch (be) {
                            error(be);
                            return U.log("writeStruct错误", be),
                                ue.code = F,
                                void this.reportError(ue)
                        }
                        var ze = new Date().getTime(),
                            Ve = this.report.getTraceId(T);
                        Ve && (Ve = "".concat(Ve, ":").concat(Ve, ":").concat(0, ":").concat(S.enableTrace)),
                            this.baseinfo = this.setBaseinfo(!0, Ve);
                        var De = "https://".concat(ke).concat(this.baseinfo);
                        this.report.setField(T, "unipacket_encode_end"),
                            this.report.setField(T, "hysignal_enqueue"),
                            this.report.setDim(T, "send", L.getTime());
                        try {
                            d.Util.ajax(De + "&timestamp=" + ze, Se, function (be) {
                                var $e, Xe;
                                try {
                                    var tr = L.getTime();
                                    ($e = new d.Wup).decode(be)
                                } catch (co) {
                                    error(co);
                                    return U.log("decodewup错误", co),
                                        ue.code = R,
                                        void G.reportError(ue)
                                }
                                var Dr = !1;
                                try {
                                    Xe = $e.readInt32("")
                                } catch (co) {
                                    error(co);
                                    Dr = !0
                                }
                                var vt = $e.iRequestId,
                                    Ll = $e.sFuncName,
                                    Fl = $e.sServantName;
                                G.report.setField(vt, "hysignal_response"),
                                    G.report.setDim(vt, "retcode", Xe),
                                    Xe < 0 ? G.report.setDim(vt, "success", C) : G.report.setDim(vt, "success", b),
                                    G.report.setField(vt, "decode_response_begin"),
                                    G.report.setField(vt, "unipacket_decode_begin"),
                                    G.report.setField(vt, "unipacket_decode_end");
                                var lo = V.WupMapping[Ll];
                                if (lo) {
                                    var Mn = new lo;
                                    Mn.bcode = Xe;
                                    try {
                                        if (0 <= Xe) {
                                            var $l = $e.iVersion == 3 ? $e.newdata : $e.data,
                                                Is = G.getWupKey($l, Dr);
                                            G.report.setField(vt, "unipacket_read_rsp_end"),
                                                Is != "noKey" && $e.readStruct(Is, Mn, lo)
                                        }
                                    } catch (co) {
                                        error(co);
                                        return U.log("readStruct错误", co),
                                            ue.code = x,
                                            void G.reportError(ue)
                                    }
                                    G.report.setField(vt, "decode_response_end"),
                                        0 < vt && (Mn.iRequestId = vt),
                                        U.log("%c<<<<<<< %chttp rspWup:%c" + p, U.logcss("#0000E3"), U.logcss("black"), U.logcss("#0000E3"), Fl, Mn),
                                        G.report.setField(vt, "join_dispatcher_thread"),
                                        G.report.setField(vt, "dispatcher_thread_execute_time"),
                                        G.report.setField(vt, "execute_end"),
                                        G.sendReport(vt),
                                        Mn.sdkcode = 0,
                                        G.sendNewReport(vt, Ll, be, tr, Xe, "http"),
                                        B && B(Mn),
                                        G.reportAPI && G.reportAPI({
                                            type: "reportApiTime",
                                            state: "end",
                                            servantName: f,
                                            funcName: p,
                                            startTime: ne,
                                            endTime: +new Date
                                        })
                                } else
                                    B && B({
                                        sdkcode: P,
                                        bcode: Xe
                                    }),
                                        G.report.clearData(vt),
                                        G.retry.del(vt)
                            }, function (be) {
                                ue.code = N,
                                    G.reportError(ue, be),
                                    U.log("http请求失败", f, p, be)
                            }),
                                this.reportAPI && this.reportAPI({
                                    type: "reportApiTime",
                                    state: "start",
                                    servantName: f,
                                    funcName: p,
                                    startTime: ne
                                })
                        } catch (be) {
                            error(be);
                            U.log("http请求error", be),
                                ue.code = A,
                                this.reportError(ue)
                        }
                    }
                }, {
                    key: "reportError",
                    value: function (f, p) {
                        var w = f.fn,
                            T = f.id,
                            B = f.code;
                        this.report.setDim(T, "retcode", B),
                            this.report.setDim(T, "success", E),
                            this.report.setField(T, "execute_end"),
                            this.sendReport(T),
                            this.report.clearData(T),
                            this.retry.del(T);
                        var J = V.WupMapping[w],
                            G = {};
                        J && (G = new J),
                            G.bcode = p === void 0 ? 0 : p,
                            G.sdkcode = B,
                            f.cb && (f.cb(G),
                                this.removeListener(w + T, f.cb))
                    }
                }, {
                    key: "setBaseinfo",
                    value: function (f, p) {
                        try {
                            var w = this.makeBaseInfo(f, p);
                            return U.log("baseinfo", w),
                                w
                        } catch (T) {
                            error(T);
                            return U.log("setBaseinfo", T),
                                "?baseinfo=default"
                        }
                    }
                }, {
                    key: "makeBaseInfo",
                    value: function (f, p) {
                        var w = new y.WSConnectParaInfo;
                        w.lUid = this.config.uid,
                            w.sGuid = this.guid,
                            w.sUA = this.ua,
                            w.sAppSrc = this.config.appSrc,
                            w.sExp = this.config.exp,
                            f && 0 < this.config.uid && (w.sCookie = document.cookie),
                            f && p && (w.sTraceId = p);
                        var T = this.config.customHeaders;
                        T && r(T) === "object" && L.copy(w.mCustomHeaders.value, T);
                        var B = new d.JceOutputStream;
                        w.writeTo(B);
                        var J = B.getBuffer(),
                            G = L.ab2str(J, !1),
                            ne = btoa(G);
                        return "?baseinfo=".concat(encodeURIComponent(ne))
                    }
                }, {
                    key: "connectIPList",
                    value: function (f) {
                        for (var p = [], w = 0, T = (this.cloudGameIpList = f).length; w < T; w++) {
                            var B = f[w],
                                J = B.host,
                                G = B.ip,
                                ne = this.isHttps ? "".concat(J) : "".concat(G || J);
                            p.push(ne)
                        }
                        this.testWsIp(p)
                    }
                }, {
                    key: "sendCloudGameReq",
                    value: function (f) {
                        var p = y.EWebSocketCommandType.EWSCmdC2S_CloudGameReq;
                        this.sendWebSocketCommand(f, p),
                            U.log("%c>>>>>>> %csendCloudGameReq:", U.logcss("#009100"), U.logcss("black"), f)
                    }
                }, {
                    key: "sendWebSocketCommand",
                    value: function (f, p) {
                        var w = new d.JceOutputStream;
                        f.writeTo(w);
                        var T = new y.WebSocketCommand;
                        T.iCmdType = p,
                            T.vData = w.getBinBuffer(),
                            w = new d.JceOutputStream,
                            T.writeTo(w),
                            this.send(w.getBuffer())
                    }
                }, {
                    key: "clear",
                    value: function () {
                        this.releaseWs(this.ws),
                            this.ws = null
                    }
                }, {
                    key: "getCurrentWSUrl",
                    value: function () {
                        return this.wsurl
                    }
                }, {
                    key: "setReportAPI",
                    value: function (f) {
                        this.reportAPI = f
                    }
                }, {
                    key: "sendWupNew",
                    value: function (f, p, w, T, B, J) {
                        var G = this,
                            ne = 4 < arguments.length && B !== void 0 ? B : 1,
                            ue = 5 < arguments.length && J !== void 0 ? J : {};
                        return new Promise(function (pe, Fe) {
                            var ye = +new Date;
                            V.WupMapping[p] = T;
                            function ke(De) {
                                var be = De.bcode,
                                    $e = De.sdkcode;
                                (be < 0 || $e < 0 && $e !== P ? Fe : pe)(De)
                            }
                            var Se = S.getRequestId(),
                                ze = "".concat(p).concat(Se);
                            G.once(ze, function (De) {
                                G.report.setField(Se, "execute_end"),
                                    G.sendReport(Se),
                                    G.report.clearData(Se),
                                    G.retry.del(Se),
                                    G.reportAPI && G.reportAPI({
                                        type: "reportApiTime",
                                        state: "end",
                                        servantName: f,
                                        funcName: p,
                                        startTime: ye,
                                        endTime: +new Date
                                    }),
                                    ke(De)
                            });
                            var Ve = {
                                id: Se,
                                reSend: function (De, be, $e, Xe, tr, Dr) {
                                    G._sendWup(De, be, $e, Xe, tr, Dr)
                                },
                                servantName: f,
                                funcName: p,
                                data: w,
                                tryCountMax: ne,
                                errFun: function (De) {
                                    var be = {
                                        id: De.id,
                                        fn: De.funcName,
                                        code: O,
                                        cb: De.callbackFun
                                    };
                                    G.reportError(be)
                                },
                                callbackFun: ke
                            };
                            G.retry.add(Ve),
                                G.connected ? G._sendWup(f, p, w, Se, ke, ue) : G.sendWupHttp(f, p, w, Se, ke, ue),
                                G.reportAPI && G.reportAPI({
                                    type: "reportApiTime",
                                    state: "start",
                                    servantName: f,
                                    funcName: p,
                                    startTime: ye
                                })
                        }
                        )
                    }
                }, {
                    key: "updateUserExps",
                    value: function (f) {
                        var p = this,
                            w = new y.WSUpdateUserExpsReq;
                        Object.assign(w.mExps.value, f);
                        var T = y.EWebSocketCommandType.EWSCmdC2S_UpdateUserExpsReq;
                        return this.sendWebSocketCommand(w, T),
                            new Promise(function (B, J) {
                                p.once(oe.WS_UPDATE_USER_EXPS_RSP, function (G) {
                                    (G.iResCode === 0 ? B : J)(G)
                                })
                            }
                            )
                    }
                }, {
                    key: "sendNewReport",
                    value: function (f, p, w, T, B, J) {
                        try {
                            if (0 < f) {
                                var G = this.report.getDimData(f),
                                    ne = Math.max(0, T - G.send);
                                ne = ne.toFixed(2);
                                var ue = w.byteLength,
                                    pe = "funcName:".concat(p, ",time:").concat(ne, ",bytelen:").concat(ue, ",bcode:").concat(B, ",type:").concat(J);
                                U.log("reportApiMess", pe),
                                    performanceInfo && performanceInfo._hmt.push(["reportApiMess", "ws-res-time", pe, "1005"])
                            }
                        } catch (Fe) { error(Fe); }
                    }
                }]),
                c
        }(),
            na = function () {
                function c(f) {
                    n(this, c),
                        this.fieldsList = {},
                        this.dimsList = {},
                        this.dims = {};
                    var p = window.navigator && window.navigator.connection && window.navigator.connection.effectiveType;
                    this.dims.appid = f.APPID.toLowerCase(),
                        this.dims.platform = "web",
                        this.dims.schema = "hysignal",
                        this.dims.nettype = p || "",
                        this.dims.osver = f.osver || "",
                        this.dims.iptype = "0",
                        this.dims.device = f.device || "",
                        this.dims.sguid = f.guid,
                        this.dims.ns_version = S.ver,
                        this.dims.ns_compat = "0",
                        this.dims.trycount = 1,
                        this.dims.prodenv = f.isDebug ? "test" : "prod"
                }
                return o(c, [{
                    key: "setField",
                    value: function (f, p) {
                        this.fieldsList[f] = this.fieldsList[f] || {};
                        var w = this.fieldsList[f];
                        w.ctime = w.ctime || L.getTime(),
                            w.data = w.data || {};
                        var T = L.getTime();
                        w.data[p] = T - w.ctime,
                            p == "execute" && (w.begintime = T),
                            p == "execute_end" && (w.data.response_time = T - w.begintime),
                            w.ctime = T
                    }
                }, {
                    key: "getFieldData",
                    value: function (f) {
                        return this.fieldsList[f] ? s({}, this.fieldsList[f].data) : {}
                    }
                }, {
                    key: "setDim",
                    value: function (f, p, w) {
                        this.dimsList[f] = this.dimsList[f] || s({}, this.dims),
                            this.dimsList[f][p] = w
                    }
                }, {
                    key: "getTraceId",
                    value: function (f) {
                        return this.dimsList[f] ? this.dimsList[f].traceid : ""
                    }
                }, {
                    key: "getDimData",
                    value: function (f) {
                        return this.dimsList[f] ? s({}, this.dimsList[f]) : {}
                    }
                }, {
                    key: "clearData",
                    value: function (f) {
                        delete this.fieldsList[f],
                            delete this.dimsList[f]
                    }
                }, {
                    key: "setCommonDim",
                    value: function (f, p) {
                        this.dims[f] = p
                    }
                }]),
                    c
            }(),
            uo = function () {
                function c(f) {
                    var p = this;
                    n(this, c);
                    var w = s({}, f) || {};
                    U.log("初始化", w),
                        w.guid = w.guid || ht.getCookie("guid"),
                        this.config = w,
                        S.setEnableTrace(w),
                        this.report = new na(w),
                        this.tafHandlerList = [],
                        this.tafHandler = new Lt(w, this),
                        w.noConnect || this.tafHandler.start(),
                        this.tafHandlerList.push(this.tafHandler),
                        this.wsLaunch = !1,
                        this.queue = [],
                        this.on(oe.WEBSOCKET_DOLAUNCH, function () {
                            U.log("sendWup 缓存队列"),
                                p.wsLaunch = !0,
                                p.queue.forEach(function (T) {
                                    return T()
                                }),
                                p.queue = []
                        }),
                        this.inited = !0
                }
                return o(c, [{
                    key: "bindWup",
                    value: function (f) {
                        var p = this;
                        return function (w) {
                            var T = w.funcName,
                                B = w.resStruct;
                            return p.registerWup(T, B),
                                function (J) {
                                    var G = J.data,
                                        ne = J.callback,
                                        ue = J.iRequestId;
                                    p.sendWup(f, T, G, ne, ue)
                                }
                        }
                    }
                }, {
                    key: "sendWup",
                    value: function (f, p, w, T, B, J) {
                        var G = 4 < arguments.length && B !== void 0 ? B : 1,
                            ne = 5 < arguments.length && J !== void 0 ? J : {},
                            ue = S.getRequestId(),
                            pe = S.getTraceId();
                        this.report.setDim(ue, "traceid", pe),
                            this.report.setDim(ue, "spanid", pe),
                            this.report.setField(ue, "execute");
                        var Fe = {
                            id: ue,
                            fn: p,
                            cb: T
                        };
                        if (!this.inited)
                            return Fe.code = $,
                                void this.tafHandler.reportError(Fe);
                        try {
                            this.tafHandler.connected ? (U.log("sendWup", p),
                                this.tafHandler.sendWup(f, p, w, T, ue, G, ne)) : (U.log("sendWupHttp", p),
                                    this.tafHandler.sendWupHttp(f, p, w, ue, T, ne))
                        } catch (ye) {
                            error(ye);
                            Fe.code = M,
                                this.tafHandler.reportError(Fe)
                        }
                    }
                }, {
                    key: "sendWupNew",
                    value: function (f, p, w, T, B, J) {
                        var G = 4 < arguments.length && B !== void 0 ? B : 1,
                            ne = 5 < arguments.length && J !== void 0 ? J : {};
                        return this.tafHandler.sendWupNew(f, p, w, T, G, ne)
                    }
                }, {
                    key: "sendWupHttp",
                    value: function (f, p, w, T) {
                        var B = S.getRequestId(),
                            J = S.getTraceId();
                        this.report.setDim(B, "traceid", J),
                            this.report.setDim(B, "spanid", J),
                            this.report.setField(B, "execute");
                        var G = {
                            id: B,
                            fn: p,
                            cb: T
                        };
                        if (!this.inited)
                            return G.code = $,
                                void this.tafHandler.reportError(G);
                        this.tafHandler.sendWupHttp(f, p, w, S.iRequestId, T)
                    }
                }, {
                    key: "registerUri",
                    value: function (f, p) {
                        V.UriMapping[f + ""] = p
                    }
                }, {
                    key: "registerUriMap",
                    value: function (f) {
                        for (var p in f) {
                            var w = f[p];
                            V.UriMapping[p + ""] = w
                        }
                    }
                }, {
                    key: "registerWup",
                    value: function (f, p) {
                        V.WupMapping[f] = p
                    }
                }, {
                    key: "registerWupMap",
                    value: function (f) {
                        for (var p in f) {
                            var w = f[p];
                            V.WupMapping[p] = w
                        }
                    }
                }, {
                    key: "on",
                    value: function (f, p) {
                        this.tafHandlerList.forEach(function (w) {
                            w.on(f, p)
                        })
                    }
                }, {
                    key: "off",
                    value: function (f, p) {
                        this.tafHandlerList.forEach(function (w) {
                            w.hasOwnProperty("removeListener") ? w.removeListener(f, p) : w.hasOwnProperty("off") && w.off(f, p)
                        })
                    }
                }, {
                    key: "has",
                    value: function (f) {
                        return 0 < this.tafHandler.listenerCount(f)
                    }
                }, {
                    key: "sendRegisterGroup",
                    value: function (f, p) {
                        var w = 1 < arguments.length && p !== void 0 ? p : "";
                        this.tafHandler.sendRegisterGroup(f, w)
                    }
                }, {
                    key: "sendUnRegisterGroup",
                    value: function (f) {
                        this.tafHandler.sendUnRegisterGroup(f)
                    }
                }, {
                    key: "sendVerifyCookie",
                    value: function (f, p, w) {
                        var T = 2 < arguments.length && w !== void 0 ? w : "webh5&0.0.1&huya";
                        this.tafHandler.sendVerifyCookie(f, p, T)
                    }
                }, {
                    key: "reconnetWS",
                    value: function (f) {
                        var p = 0 < arguments.length && f !== void 0 ? f : 0,
                            w = this.tafHandlerList.find(function (T) {
                                return T.connectType === p
                            });
                        if (w)
                            return w.reconnetWS()
                    }
                }, {
                    key: "isWSConnected",
                    value: function (f) {
                        var p = 0 < arguments.length && f !== void 0 ? f : 0,
                            w = this.tafHandlerList.find(function (T) {
                                return T.connectType === p
                            });
                        return !!w && w.connected
                    }
                }, {
                    key: "isWSLaunch",
                    value: function () {
                        return this.wsLaunch
                    }
                }, {
                    key: "sendWSUpdateUserInfoReq",
                    value: function (f) {
                        this.tafHandler.sendWSUpdateUserInfoReq(f)
                    }
                }, {
                    key: "getTaf",
                    value: function () {
                        return d
                    }
                }, {
                    key: "getUserId",
                    value: function () {
                        return this.tafHandler.userId
                    }
                }, {
                    key: "getTafProtocol",
                    value: function () {
                        return {
                            HUYA: y,
                            TafMx: V,
                            Taf: d
                        }
                    }
                }, {
                    key: "rspDecode",
                    value: function (f, p) {
                        return this.tafHandler.rspDecode(f, p)
                    }
                }, {
                    key: "sendDataMetric",
                    value: function (f, p) {
                        this.tafHandler.sendDataMetric(f, p)
                    }
                }, {
                    key: "sendExtWup",
                    value: function (f) {
                        this.tafHandler.sendExtWup(f)
                    }
                }, {
                    key: "connectCloudGameWS",
                    value: function (f) {
                        U.log("云游戏建连", f),
                            this.cloudTaf && this.clearCloudTaf();
                        var p = s({}, this.config, {
                            connectType: 1
                        });
                        return this.cloudTaf = new Lt(p, this),
                            this.cloudTaf.connectIPList(f),
                            this.tafHandlerList.push(this.cloudTaf),
                            this.cloudTaf
                    }
                }, {
                    key: "clearCloudTaf",
                    value: function () {
                        var f = this.tafHandlerList.indexOf(this.cloudTaf);
                        -1 < f && this.tafHandlerList.splice(f, 1),
                            this.cloudTaf.clear(),
                            this.cloudTaf = null
                    }
                }, {
                    key: "sendCloudGameReq",
                    value: function (f) {
                        this.cloudTaf ? this.cloudTaf.sendCloudGameReq(f) : U.log("云游戏连接未创建")
                    }
                }, {
                    key: "getCurrentWSUrl",
                    value: function (f) {
                        var p = 0 < arguments.length && f !== void 0 ? f : 0,
                            w = this.tafHandlerList.find(function (T) {
                                return T.connectType === p
                            });
                        return w ? w.getCurrentWSUrl() : ""
                    }
                }, {
                    key: "setReportAPI",
                    value: function (f) {
                        this.tafHandler.setReportAPI(f)
                    }
                }, {
                    key: "updateUserExps",
                    value: function (f) {
                        return this.tafHandler.updateUserExps(f)
                    }
                }]),
                    c
            }();
        return {
            HUYA: y,
            Taf: d,
            init: new uo({
                    "appSrc": "HUYA&ZH&2052",
                    "APPID": "HUYA",
                    "uid": document.cookie,
                    "ua": "webh5&0.0.1&activity&ios",
                    "isDebug": false,
                    "tryTime": 1.5,
                    "enableTrace": 3
                }),
            events: oe,
            utils: L,
            store: ht,
            version: g
        }
    })()

    function I(c){
        var f = "";
        return typeof c == "function" ? f = new c()._className() : f = c._className(),
            f
    }
    var Req$ = {
        UserId : function() {
            this.lUid = document.getCookie("udb_uid") || 0,this.sGuid = "",this.sToken = "",this.sHuYaUA = "ios&1.0.0&huya&gamemall",this.sCookie = document.getCookie(),this.iTokenType = 0,this.sDeviceInfo = "",this.sQIMEI = "";
            this.readFrom = function(e) {this.lUid = e.readInt64(0, !1, this.lUid),this.sGuid = e.readString(1, !1, this.sGuid),this.sToken = e.readString(2, !1, this.sToken),this.sHuYaUA = e.readString(3, !1, this.sHuYaUA),this.sCookie = e.readString(4, !1, this.sCookie),this.iTokenType = e.readInt32(5, !1, this.iTokenType),this.sDeviceInfo = e.readString(6, !1, this.sDeviceInfo),this.sQIMEI = e.readString(7, !1, this.sQIMEI)};
            this.writeTo = function(e) {e.writeInt64(0, this.lUid),e.writeString(1, this.sGuid),e.writeString(2, this.sToken),e.writeString(3, this.sHuYaUA),e.writeString(4, this.sCookie),e.writeInt32(5, this.iTokenType),e.writeString(6, this.sDeviceInfo),e.writeString(7, this.sQIMEI)};
            this._clone = function() {return new Req$.UserId};
            this._write = function(e, t, r) {e.writeStruct(t, r)};
            this._read = function(e, t, r) {return e.readStruct(t, !0, r)};
        },
        PlayMallAppInfo : function() {
            this.platformId = "huya",this.appId = 1001,this.timestamp = 0,this.sign = "";
            this.readFrom = function(e) {this.platformId = e.readString(0, !1, this.platformId),this.appId = e.readInt32(1, !1, this.appId),this.timestamp = e.readInt64(2, !1, this.timestamp),this.sign = e.readString(3, !1, this.sign)};
            this.writeTo = function(e) {e.writeString(0, this.platformId),e.writeInt32(1, this.appId),e.writeInt64(2, this.timestamp),e.writeString(3, this.sign)};
            this._clone = function() {return new Req$.PlayMallAppInfo};
            this._write = function(e, t, r) {e.writeStruct(t, r)};
            this._read = function(e, t, r) {return e.readStruct(t, !0, r)};
        },
        CommonResponse : function() {
            this.code = 0,this.msg = "",this.data = "";
            this.readFrom = function(e) {this.code = e.readInt32(0, !1, this.code),this.msg = e.readString(1, !1, this.msg),this.data = e.readString(2, !1, this.data)};
            this.writeTo = function(e) {e.writeInt32(0, this.code),e.writeString(1, this.msg),e.writeString(2, this.data)};
            this._clone = function() {return new Req$.CommonResponse};
            this._write = function(e, t, r) {e.writeStruct(t, r)};
            this._read = function(e, t, r) {return e.readStruct(t, !0, r)};
        },
        d: {
            TypeHelp : {
                BOOLEAN: "bool",
                CHAR: "char",
                SHORT: "short",
                INT32: "int32",
                INT64: "int64",
                FLOAT: "float",
                DOUBLE: "double",
                STRING: "string",
                VECTOR: "list<$t>",
                MAP: "map<$k, $v>"
            },
            Vector : function (c) {
                this.proto = c,this.value = [];
                this._clone = function () {return new Req$.d.Vector(typeof this.proto == "function" ? new this.proto : this.proto)},
                this._write = function (c, f, p) {return c.writeVector(f, p)},
                this._read = function (c, f, p) {return c.readVector(f, !0, p)},
                this._className = function () {var c = I(this.proto);return Req$.d.TypeHelp.VECTOR.replace("$t", c)};
            },
            STRING : function () {
                this._clone = function () {return 0},
                this._write = function (c, f, p) {return c.writeString(f, p)},
                this._read = function (c, f, p) {return c.readString(f, !0, p)},
                this._className = function () {return Req$.d.STRING}
            },
            Map : function(c, f) {
                this.kproto = c,this.vproto = f,this.value = new Object;
                this._clone = function() {
                    var c = typeof this.kproto == "function" ? new this.kproto : this.kproto
                    , f = typeof this.vproto == "function" ? new this.vproto : this.vproto;
                    return new Req$.d.Map(c,f)
                },
                this._write = function(c, f, p) {return c.writeMap(f, p)},
                this._read = function(c, f, p) {return c.readMap(f, !0, p)},
                this.put = function(c, f) {this.value[c] = f},
                this.get = function(c) {return this.value[c]},
                this.remove = function(c) {delete this.value[c]},
                this.clear = function() {this.value = new Object},
                this.size = function() {var c = 0;for (var f in this.value)c++;return c},
                this._className = function() {
                    var c = I(this.kproto), f = I(this.vproto);
                    return Req$.d.TypeHelp.Map.replace("$k", c).replace("$v", f)}
            }
        },
        GetUserProfileReq : function() {
            this.tId = new Req$.UserId,this.lUid = document.getCookie("udb_uid") || 0;
            this.readFrom = function(e) {this.tId = e.readStruct(0, !1, this.tId),this.lUid = e.readInt64(1, !1, this.lUid)};
            this.writeTo = function(e) {e.writeStruct(0, this.tId),e.writeInt64(1, this.lUid)};
            this._clone = function() {return new Req$.GetUserProfileReq};
            this._write = function(e, t, i) {e.writeStruct(t, i)};
            this._read = function(e, t, i) {return e.readStruct(t, !0, i)};
        },
        CheckUserLoginReq : function() {
            this.userId = new Req$.UserId,this.playMallAppInfo = new Req$.PlayMallAppInfo;
            this.readFrom = function(e) {this.userId = e.readStruct(0, !1, this.userId),this.playMallAppInfo = e.readStruct(1, !1, this.playMallAppInfo)};
            this.writeTo = function(e) {e.writeStruct(0, this.userId),e.writeStruct(1, this.playMallAppInfo)};
            this._clone = function() {return new Req$.CheckUserLoginReq};
            this._write = function(e, t, r) {e.writeStruct(t, r)};
            this._read = function(e, t, r) {return e.readStruct(t, !0, r)};
        },
        CheckUserStatusReq : function() {
            this.userId = new Req$.UserId,this.playMallAppInfo = new Req$.PlayMallAppInfo;
            this.readFrom = function(e) {this.userId = e.readStruct(0, !1, this.userId),this.playMallAppInfo = e.readStruct(1, !1, this.playMallAppInfo)};
            this.writeTo = function(e) {e.writeStruct(0, this.userId),e.writeStruct(1, this.playMallAppInfo)};
            this._clone = function() {return new Req$.CheckUserStatusReq};
            this._write = function(e, t, r) {e.writeStruct(t, r)};
            this._read = function(e, t, r) {return e.readStruct(t, !0, r)};
        },
        CheckHyProtocolReq : function() {
            this.userId = new Req$.UserId,this.playMallAppInfo = new Req$.PlayMallAppInfo,this.protocolType = 1;
            this.readFrom = function(e) {this.userId = e.readStruct(0, !1, this.userId),this.playMallAppInfo = e.readStruct(1, !1, this.playMallAppInfo),this.protocolType = e.readInt32(2, !1, this.protocolType)};
            this.writeTo = function(e) {e.writeStruct(0, this.userId),e.writeStruct(1, this.playMallAppInfo),e.writeInt32(2, this.protocolType)};
            this._clone = function() {return new Req$.CheckHyProtocolReq};
            this._write = function(e, t, r) {e.writeStruct(t, r)};
            this._read = function(e, t, r) {return e.readStruct(t, !0, r)};
        },
        UserExchangeItemReq : function() {
            this.userId = new Req$.UserId,this.playMallAppInfo = new Req$.PlayMallAppInfo,this.exchangeItemId = 0;
            this.readFrom = function(e) {this.userId = e.readStruct(0, !1, this.userId),this.playMallAppInfo = e.readStruct(1, !1, this.playMallAppInfo),this.exchangeItemId = e.readInt64(2, !1, this.exchangeItemId)};
            this.writeTo = function(e) {e.writeStruct(0, this.userId),e.writeStruct(1, this.playMallAppInfo),e.writeInt64(2, this.exchangeItemId)};
            this._clone = function() {return new Req$.UserExchangeItemReq};
            this._write = function(e, t, r) {e.writeStruct(t, r)};
            this._read = function(e, t, r) {return e.readStruct(t, !0, r)};
        },
        GetExchangeInfoReq : function() {
            this.userId = new Req$.UserId,this.playMallAppInfo = new Req$.PlayMallAppInfo;
            this.readFrom = function(e) {this.userId = e.readStruct(0, !1, this.userId),this.playMallAppInfo = e.readStruct(1, !1, this.playMallAppInfo)};
            this.writeTo = function(e) {e.writeStruct(0, this.userId),e.writeStruct(1, this.playMallAppInfo)};
            this._clone = function() {return new Req$.GetExchangeInfoReq};
            this._write = function(e, t, r) {e.writeStruct(t, r)};
            this._read = function(e, t, r) {return e.readStruct(t, !0, r)};
        },
        GetExchangeItemListReq : function() {
            this.userId = new Req$.UserId,this.playMallAppInfo = new Req$.PlayMallAppInfo,this.page = 1,this.pageSize = 10,this.type = "RedPacket";
            this.readFrom = function(e) {this.userId = e.readStruct(0, !1, this.userId),this.playMallAppInfo = e.readStruct(1, !1, this.playMallAppInfo),this.page = e.readInt64(2, !1, this.page),this.pageSize = e.readInt64(3, !1, this.pageSize),this.type = e.readString(4, !1, this.type)};
            this.writeTo = function(e) {e.writeStruct(0, this.userId),e.writeStruct(1, this.playMallAppInfo),e.writeInt64(2, this.page),e.writeInt64(3, this.pageSize),e.writeString(4, this.type)};
            this._clone = function() {return new Req$.GetExchangeItemListReq};
            this._write = function(e, t, r) {e.writeStruct(t, r)};
            this._read = function(e, t, r) {return e.readStruct(t, !0, r)}
        },
        QueryTransferPageRebateReqV2 : function() {
            this.userId = new Req$.UserId,
            this.playMallAppInfo = new Req$.PlayMallAppInfo,
            this.sourceId = "1013",
            this.pid = document.getCookie("udb_uid") || 0,
            this.type = 1,
            this.shopId = "15",
            this.goodsId = "",
            this.scene = 2;
            this.readFrom = function(e) {this.userId = e.readStruct(0, !1, this.userId),this.playMallAppInfo = e.readStruct(1, !1, this.playMallAppInfo),this.sourceId = e.readString(2, !1, this.sourceId),this.pid = e.readInt64(3, !1, this.pid),this.type = e.readInt32(4, !1, this.type),this.shopId = e.readInt64(5, !1, this.shopId),this.goodsId = e.readInt64(6, !1, this.goodsId),this.scene = e.readInt32(7, !1, this.scene)},
            this.writeTo = function(e) {e.writeStruct(0, this.userId),e.writeStruct(1, this.playMallAppInfo),e.writeString(2, this.sourceId),e.writeInt64(3, this.pid),e.writeInt32(4, this.type),e.writeInt64(5, this.shopId),e.writeInt64(6, this.goodsId),e.writeInt32(7, this.scene)},
            this._clone = function() {return new Req$.QueryTransferPageRebateReqV2},
            this._write = function(e, t, r) {e.writeStruct(t, r)},
            this._read = function(e, t, r) {return e.readStruct(t, !0, r)}
        },
        GameShopInfo : function() {
            this.shopId = 0,this.shopName = "",this.gameIcon = "",this.supplierOfferId = "",this.yjOfferId = "",this.gameDesc = "",this.feedWeight = 0,this.showDeviceType = "",this.loadUrl = "",this.goodsList = new Req$.d.Vector(new Req$.ShopGoodsInfo),this.userLabelList = new Req$.d.Vector(new Req$.UserLabelInfo),this.pf = "",this.obtainInfo = new Req$.UserRebateObtainInfo,this.showHuyaApp = 0,this.showH5 = 0,this.env = "",this.txChanType = "",this.shopPinyin = "",this.accessUrlDevice = 0,this.yjTabId = "",this.showTerminalSwitch = "",this.showShopSwitch = "";
            this.readFrom = function(e) {this.shopId = e.readInt64(0, !1, this.shopId),this.shopName = e.readString(1, !1, this.shopName),this.gameIcon = e.readString(2, !1, this.gameIcon),this.supplierOfferId = e.readString(3, !1, this.supplierOfferId),this.yjOfferId = e.readString(4, !1, this.yjOfferId),this.gameDesc = e.readString(5, !1, this.gameDesc),this.feedWeight = e.readInt32(6, !1, this.feedWeight),this.showDeviceType = e.readString(7, !1, this.showDeviceType),this.loadUrl = e.readString(9, !1, this.loadUrl),this.goodsList = e.readVector(10, !1, this.goodsList),this.userLabelList = e.readVector(11, !1, this.userLabelList),this.pf = e.readString(12, !1, this.pf),this.obtainInfo = e.readStruct(13, !1, this.obtainInfo),this.showHuyaApp = e.readInt32(14, !1, this.showHuyaApp),this.showH5 = e.readInt32(15, !1, this.showH5),this.env = e.readString(16, !1, this.env),this.txChanType = e.readString(17, !1, this.txChanType),this.shopPinyin = e.readString(18, !1, this.shopPinyin),this.accessUrlDevice = e.readInt32(19, !1, this.accessUrlDevice),this.yjTabId = e.readString(20, !1, this.yjTabId),this.showTerminalSwitch = e.readString(21, !1, this.showTerminalSwitch),this.showShopSwitch = e.readString(22, !1, this.showShopSwitch)};
            this.writeTo = function(e) {e.writeInt64(0, this.shopId),e.writeString(1, this.shopName),e.writeString(2, this.gameIcon),e.writeString(3, this.supplierOfferId),e.writeString(4, this.yjOfferId),e.writeString(5, this.gameDesc),e.writeInt32(6, this.feedWeight),e.writeString(7, this.showDeviceType),e.writeString(9, this.loadUrl),e.writeVector(10, this.goodsList),e.writeVector(11, this.userLabelList),e.writeString(12, this.pf),e.writeStruct(13, this.obtainInfo),e.writeInt32(14, this.showHuyaApp),e.writeInt32(15, this.showH5),e.writeString(16, this.env),e.writeString(17, this.txChanType),e.writeString(18, this.shopPinyin),e.writeInt32(19, this.accessUrlDevice),e.writeString(20, this.yjTabId),e.writeString(21, this.showTerminalSwitch),e.writeString(22, this.showShopSwitch)};
            this._clone = function() {return new Req$.GameShopInfo};
            this._write = function(e, t, r) {e.writeStruct(t, r)};
            this._read = function(e, t, r) {return e.readStruct(t, !0, r)};
        },
        ShopGoodsInfo : function() {
            this.goodsId = 0,this.shopId = 0,this.supplierProductId = "",this.goodsName = "",this.goodsImage = "",this.goodsPrice = 0,this.labelName = "",this.labelBottomColour = "",this.loadUrl = "",this.showDeviceType = "",this.pf = "",this.resOfferId = "",this.pageId = "",this.obtainInfo = new Req$.UserRebateObtainInfo,this.gameIcon = "",this.env = "",this.txChanType = "",this.shopName = "",this.shopPinyin = "",this.gameCoinName = "",this.accessUrlDevice = 0,this.showShopSwitch = "",this.showTerminalSwitch = "";
            this.readFrom = function(e) {this.goodsId = e.readInt64(0, !1, this.goodsId),this.shopId = e.readInt64(1, !1, this.shopId),this.supplierProductId = e.readString(2, !1, this.supplierProductId),this.goodsName = e.readString(3, !1, this.goodsName),this.goodsImage = e.readString(4, !1, this.goodsImage),this.goodsPrice = e.readInt64(5, !1, this.goodsPrice),this.labelName = e.readString(6, !1, this.labelName),this.labelBottomColour = e.readString(7, !1, this.labelBottomColour),this.loadUrl = e.readString(9, !1, this.loadUrl),this.showDeviceType = e.readString(10, !1, this.showDeviceType),this.pf = e.readString(11, !1, this.pf),this.resOfferId = e.readString(12, !1, this.resOfferId),this.pageId = e.readString(13, !1, this.pageId),this.obtainInfo = e.readStruct(14, !1, this.obtainInfo),this.gameIcon = e.readString(15, !1, this.gameIcon),this.env = e.readString(16, !1, this.env),this.txChanType = e.readString(17, !1, this.txChanType),this.shopName = e.readString(18, !1, this.shopName),this.shopPinyin = e.readString(19, !1, this.shopPinyin),this.gameCoinName = e.readString(20, !1, this.gameCoinName),this.accessUrlDevice = e.readInt32(21, !1, this.accessUrlDevice),this.showShopSwitch = e.readString(22, !1, this.showShopSwitch),this.showTerminalSwitch = e.readString(23, !1, this.showTerminalSwitch)};
            this.writeTo = function(e) {e.writeInt64(0, this.goodsId),e.writeInt64(1, this.shopId),e.writeString(2, this.supplierProductId),e.writeString(3, this.goodsName),e.writeString(4, this.goodsImage),e.writeInt64(5, this.goodsPrice),e.writeString(6, this.labelName),e.writeString(7, this.labelBottomColour),e.writeString(9, this.loadUrl),e.writeString(10, this.showDeviceType),e.writeString(11, this.pf),e.writeString(12, this.resOfferId),e.writeString(13, this.pageId),e.writeStruct(14, this.obtainInfo),e.writeString(15, this.gameIcon),e.writeString(16, this.env),e.writeString(17, this.txChanType),e.writeString(18, this.shopName),e.writeString(19, this.shopPinyin),e.writeString(20, this.gameCoinName),e.writeInt32(21, this.accessUrlDevice),e.writeString(22, this.showShopSwitch),e.writeString(23, this.showTerminalSwitch)};
            this._clone = function() {return new Req$.ShopGoodsInfo};
            this._write = function(e, t, r) {e.writeStruct(t, r)};
            this._read = function(e, t, r) {return e.readStruct(t, !0, r)};
        },
        RebateObtainBaseConfigInfo : function() {
            this.totalAmountLimit = 0,this.totalOrderAmountLimit = 0;
            this.readFrom = function(e) {this.totalAmountLimit = e.readInt64(0, !1, this.totalAmountLimit),this.totalOrderAmountLimit = e.readInt64(1, !1, this.totalOrderAmountLimit)};
            this.writeTo = function(e) {e.writeInt64(0, this.totalAmountLimit),e.writeInt64(1, this.totalOrderAmountLimit)};
            this._clone = function() {return new Req$.RebateObtainBaseConfigInfo};
            this._write = function(e, t, r) {e.writeStruct(t, r)};
            this._read = function(e, t, r) {return e.readStruct(t, !0, r)};
        }, 
        UserRebateObtainInfo : function() {
            this.calculateInfo = new Req$.RebateCalculateInfo,this.isRebate = 0,this.maxRebateNum = 0,this.maxRebateRate = 0,this.maxRebateAmount = 0,this.reason = "";
            this.readFrom = function(e) {this.calculateInfo = e.readStruct(0, !1, this.calculateInfo),this.isRebate = e.readInt32(1, !1, this.isRebate),this.maxRebateNum = e.readInt64(2, !1, this.maxRebateNum),this.maxRebateRate = e.readDouble(3, !1, this.maxRebateRate),this.maxRebateAmount = e.readInt64(4, !1, this.maxRebateAmount),this.reason = e.readString(5, !1, this.reason)};
            this.writeTo = function(e) {e.writeStruct(0, this.calculateInfo),e.writeInt32(1, this.isRebate),e.writeInt64(2, this.maxRebateNum),e.writeDouble(3, this.maxRebateRate),e.writeInt64(4, this.maxRebateAmount),e.writeString(5, this.reason)};
            this._clone = function() {return new Req$.UserRebateObtainInfo};
            this._write = function(e, t, r) {e.writeStruct(t, r)};
            this._read = function(e, t, r) {return e.readStruct(t, !0, r)};
        }, 
        RebateObtainActivityConfigInfo : function() {
            this.effectStartTime = 0,this.effectEndTime = 0,this.ruleRemark = "",this.useType = "",this.rebateAmountLimit = 0,this.orderAmountLimit = 0;
            this.readFrom = function(e) {this.effectStartTime = e.readInt64(0, !1, this.effectStartTime),this.effectEndTime = e.readInt64(1, !1, this.effectEndTime),this.ruleRemark = e.readString(2, !1, this.ruleRemark),this.useType = e.readString(3, !1, this.useType),this.rebateAmountLimit = e.readInt64(4, !1, this.rebateAmountLimit),this.orderAmountLimit = e.readInt64(5, !1, this.orderAmountLimit)};
            this.writeTo = function(e) {e.writeInt64(0, this.effectStartTime),e.writeInt64(1, this.effectEndTime),e.writeString(2, this.ruleRemark),e.writeString(3, this.useType),e.writeInt64(4, this.rebateAmountLimit),e.writeInt64(5, this.orderAmountLimit)};
            this._clone = function() {return new Req$.RebateObtainActivityConfigInfo};
            this._write = function(e, t, r) {e.writeStruct(t, r)};
            this._read = function(e, t, r) {return e.readStruct(t, !0, r)};
        }, 
        AddUserOrderTraceReq : function() {
            this.userId = new Req$.UserId,
            this.playMallAppInfo = new Req$.PlayMallAppInfo,
            this.pid = document.getCookie("udb_uid") || 0,
            this.card = "",
            this.scene = 2,
            this.sourceId = "1013";
            this.readFrom = function(e) {this.userId = e.readStruct(0, !1, this.userId),this.playMallAppInfo = e.readStruct(1, !1, this.playMallAppInfo),this.pid = e.readInt64(2, !1, this.pid),this.card = e.readString(3, !1, this.card),this.scene = e.readInt32(4, !1, this.scene),this.sourceId = e.readString(5, !1, this.sourceId)};
            this.writeTo = function(e) {e.writeStruct(0, this.userId),e.writeStruct(1, this.playMallAppInfo),e.writeInt64(2, this.pid),e.writeString(3, this.card),e.writeInt32(4, this.scene),e.writeString(5, this.sourceId)};
            this._clone = function() {return new Req$.AddUserOrderTraceReq};
            this._write = function(e, t, r) {e.writeStruct(t, r)};
            this._read = function(e, t, r) {return e.readStruct(t, !0, r)};
        },
        GetTxPayOpenAccountReq : function() {
            this.tId = new Req$.UserId,
            this.iActId = 103,
            this.mBizParam = new Req$.d.Map(new Req$.d.STRING,new Req$.d.STRING),
            this.sBizParamCode = "";
            this.readFrom = function(e) {this.tId = e.readStruct(0, !1, this.tId),this.iActId = e.readInt32(1, !1, this.iActId),this.mBizParam = e.readMap(2, !1, this.mBizParam),this.sBizParamCode = e.readString(3, !1, this.sBizParamCode)};
            this.writeTo = function(e) {e.writeStruct(0, this.tId),e.writeInt32(1, this.iActId),e.writeMap(2, this.mBizParam),e.writeString(3, this.sBizParamCode)};
            this._clone = function() {return new Req$.GetTxPayOpenAccountReq};
            this._write = function(e, t, r) {e.writeStruct(t, r)};
            this._read = function(e, t, r) {return e.readStruct(t, !0, r)};
        },
        QueryJournalListReqData : function() {
            this.uid = "",
            this.accountType = "",
            this.startDate = (function(){
                let date = new Date();  
                return `${date.getFullYear().toString().padStart(4, '0')}${(date.getMonth() + 1).toString().padStart(2, '0')}01000000`;
            })(),
            this.endDate = (function(){
                let date = new Date();  
                return `${date.getFullYear().toString().padStart(4, '0')}${(date.getMonth() + 1).toString().padStart(2, '0')}${new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()}235959`;
            })(),
            this.changeType = "",
            this.pageNo = "1",
            this.pageSize = "10",
            this.bizCode = "",
            this.exOnly = "true";
            this.readFrom = function(e) {this.uid = e.readString(0, !1, this.uid),this.accountType = e.readString(1, !1, this.accountType),this.startDate = e.readString(2, !1, this.startDate),this.endDate = e.readString(3, !1, this.endDate),this.changeType = e.readString(4, !1, this.changeType),this.pageNo = e.readString(5, !1, this.pageNo),this.pageSize = e.readString(6, !1, this.pageSize),this.bizCode = e.readString(7, !1, this.bizCode),this.exOnly = e.readString(8, !1, this.exOnly)};
            this.writeTo = function(e) {e.writeString(0, this.uid),e.writeString(1, this.accountType),e.writeString(2, this.startDate),e.writeString(3, this.endDate),e.writeString(4, this.changeType),e.writeString(5, this.pageNo),e.writeString(6, this.pageSize),e.writeString(7, this.bizCode),e.writeString(8, this.exOnly)};
            this._clone = function() {return new Req$.QueryJournalListReqData};
            this._write = function(e, t, r) {e.writeStruct(t, r)};
            this._read = function(e, t, r) {return e.readStruct(t, !0, r)};
        },
        QueryJournalListReq : function() {
            this.tId = new Req$.UserId,this.reqData = new Req$.QueryJournalListReqData;
            this.readFrom = function(e) {this.tId = e.readStruct(0, !1, this.tId),this.reqData = e.readStruct(1, !1, this.reqData)};
            this.writeTo = function(e) {e.writeStruct(0, this.tId),e.writeStruct(1, this.reqData)};
            this._clone = function() {return new Req$.QueryJournalListReq};
            this._write = function(e, t, r) {e.writeStruct(t, r)};
            this._read = function(e, t, r) {return e.readStruct(t, !0, r)};
        },

        QueryUserOrdersReq : function() {
            this.userId = new Req$.UserId,this.playMallAppInfo = new Req$.PlayMallAppInfo,this.pageNum = 1,this.pageSize = 10;
            this.readFrom = function(e) {this.userId = e.readStruct(0, !1, this.userId),this.playMallAppInfo = e.readStruct(1, !1, this.playMallAppInfo),this.pageNum = e.readInt32(2, !1, this.pageNum),this.pageSize = e.readInt32(3, !1, this.pageSize)};
            this.writeTo = function(e) {e.writeStruct(0, this.userId),e.writeStruct(1, this.playMallAppInfo),e.writeInt32(2, this.pageNum),e.writeInt32(3, this.pageSize)};
            this._clone = function() {return new Req$.QueryUserOrdersReq};
            this._write = function(e, t, r) {e.writeStruct(t, r)};
            this._read = function(e, t, r) {return e.readStruct(t, !0, r)};
        },
    }
    var dict = [
        {"moduleName": "PlayMallUI", "funcName": "checkUserLogin", "ReqClass": new Req$.CheckUserLoginReq},
        {"moduleName": "PlayMallUI", "funcName": "checkHyProtocol", "ReqClass": new Req$.CheckHyProtocolReq},
        {"moduleName": "huyauserui", "funcName": "getUserProfile", "ReqClass": new Req$.GetUserProfileReq},

        {"moduleName": "PlayMallUI", "funcName": "getExchangeInfo", "ReqClass": new Req$.GetExchangeInfoReq},
        {"moduleName": "PlayMallUI", "funcName": "getExchangeItemList", "ReqClass": new Req$.GetExchangeItemListReq},

        {"moduleName": "PlayMallUI", "funcName": "checkUserStatus", "ReqClass": new Req$.CheckUserStatusReq},
        {"moduleName": "PlayMallUI", "funcName": "userExchangeItem", "ReqClass": new Req$.UserExchangeItemReq},
        {"moduleName": "PlayMallUI", "funcName": "queryTransferPageRebateV2", "ReqClass": new Req$.QueryTransferPageRebateReqV2},
        {"moduleName": "PlayMallUI", "funcName": "addUserOrderTraceV2", "ReqClass": new Req$.AddUserOrderTraceReq},
        {"moduleName": "PlayMallUI", "funcName": "getTxPayOpenAccount", "ReqClass": new Req$.GetTxPayOpenAccountReq},

        {"moduleName": "PlayMallUI", "funcName": "queryJournalList", "ReqClass": new Req$.QueryJournalListReq},
        {"moduleName": "PlayMallUI", "funcName": "queryUserOrdersV3", "ReqClass": new Req$.QueryUserOrdersReq},
    ]
    var module = {current: []};
    var return_send = [[],[]];
    function get_onmessage() {
        let B = 0;
        if(params.invoke.message) var message = params.invoke.message || [];
        if(params.invoke.command) var command = params.invoke.command || [];
        if(/^\d+$/.test(params.invoke.exchangeItemId)) var exchangeItemId = params.invoke.exchangeItemId.toString().replaceAll(" ","") || "0";
        if(/^\d+$/.test(params.invoke.pageNo)) var pageNo = params.invoke.pageNo.toString().replaceAll(" ","") || "0";
        if(/^\d+$/.test(params.invoke.startDate)) var startDate = params.invoke.startDate.toString().replaceAll(" ","") || "0";
        if(/^\d+$/.test(params.invoke.endDate)) var endDate = params.invoke.endDate.toString().replaceAll(" ","") || "0";
        if(/^\d+$/.test(params.invoke.pageNum)) var pageNum = params.invoke.pageNum.toString().replaceAll(" ","") || "0";
        k2.init.tafHandler.onopen();
        if(command) module.current = dict.filter(item => command.includes(item.funcName));
        while(message.length){
            k2.init.tafHandler.onmessage({"data": message.shift()});
            if(!module.current.length) {k2.init.tafHandler.sendHeartBeat(); break;}
            let {moduleName, funcName, ReqClass} = module.current.shift();
            if(["1","3","5","7","9","11","13"].includes(exchangeItemId) && ReqClass.constructor == Req$.UserExchangeItemReq) 
                ReqClass.exchangeItemId = exchangeItemId;
            if(/^\d+$/.test(pageNo) && Number(pageNo) >= 0 && ReqClass.constructor == Req$.QueryJournalListReq)
                ReqClass.reqData.pageNo = pageNo;
            if(/^\d{14}$/.test(startDate) && /^\d{14}$/.test(endDate) && ReqClass.constructor == Req$.QueryJournalListReq){
                ReqClass.reqData.startDate = startDate;
                ReqClass.reqData.endDate = endDate;
            }
            if(/^\d+$/.test(pageNum) && Number(pageNum) >= 0 && ReqClass.constructor == Req$.QueryUserOrdersReq)
                ReqClass.pageNum = pageNum;
            k2.init.sendWup(moduleName, funcName, ReqClass, null, ++B||1, {});
        }
        return return_send;
    }
    return get_onmessage()
}