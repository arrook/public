import os
import ddd
import hhh
import json
import asyncio
import threading
from uuu import Ui_Form
from wss import Wss
from collections import OrderedDict

from PyQt5 import QtCore, QtWidgets
from PyQt5.QtCore import QTimer, QTime, Qt, pyqtSignal, QDateTime, QDate  
from PyQt5.QtWidgets import QTableWidgetItem, QHeaderView, QCheckBox, QDialog, QMessageBox, QPushButton, QHBoxLayout, \
    QComboBox, QLabel, QFileDialog, QMenu, QAction, QInputDialog

os.chdir(os.path.dirname(__file__))

class DataRow:
    def __init__(self, number, data):
        self.number = number
        self.data = data


class LoginDialog(QDialog):
    def __init__(self, main_window):
        super().__init__()

        self.main_window = main_window  # 保存主窗口的引用
        # 使用Qt Designer生成的自定义对话框类
        self.ui = ddd.Ui_Dialog()
        self.ui.setupUi(self)

        self.setWindowTitle("验证码获取")
        # 连接信号和槽
        self.ui.buttonBox.accepted.connect(self.on_ok_button_clicked)
        self.ui.buttonBox.rejected.connect(self.reject)  # 取消按钮点击后关闭对话框


    def on_ok_button_clicked(self):
        verify_code = self.ui.lineEdit_2.text()
        if verify_code.strip():
            self.main_window.verify_code = verify_code
        self.accept()

class HistoryDialog(QDialog):
    def __init__(self, main_window, users):
        super().__init__()

        self.main_window = main_window  # 保存主窗口的引用
        self.users = users  # 保存用户数据列表

        # 使用Qt Designer生成的自定义对话框类
        self.ui = hhh.Ui_Dialog()
        self.ui.setupUi(self)

        self.setWindowTitle("历史记录")
        # 连接信号和槽
        self.ui.buttonBox.accepted.connect(self.on_ok_button_clicked)
        self.ui.buttonBox.rejected.connect(self.reject)  # 取消按钮点击后关闭对话框

        # 初始化分页控件
        self.init_pagination()

    def on_ok_button_clicked(self):
        self.accept()

    def init_pagination(self):
        self.current_page = 1
        self.page_size = 5  # 每页显示5行
        self.total_pages = len(self.users) // self.page_size
        if len(self.users) % self.page_size != 0:
            self.total_pages += 1

        # 初始化分页相关控件
        self.prev_button = QPushButton("上一页")
        self.next_button = QPushButton("下一页")
        self.page_label = QLabel()
        self.page_combo_box = QComboBox()

        page_layout = QHBoxLayout()
        page_layout.addWidget(self.prev_button)
        page_layout.addWidget(self.page_label)
        page_layout.addWidget(self.page_combo_box)
        page_layout.addWidget(self.next_button)
        self.ui.verticalLayout.addLayout(page_layout)

        # 绑定按钮点击事件
        self.prev_button.clicked.connect(self.show_prev_page)
        self.next_button.clicked.connect(self.show_next_page)
        self.page_combo_box.currentIndexChanged.connect(lambda: self.change_page())
        self.update_pagination()

    def update_pagination(self):
        self.page_label.setText(f"第 {self.current_page} 页 / 共 {self.total_pages} 页")
        self.page_combo_box.clear()
        self.page_combo_box.addItems([str(i) for i in range(1, self.total_pages + 1)])
        self.page_combo_box.setCurrentIndex(self.current_page - 1)

    def show_prev_page(self):
        if self.current_page > 1:
            self.current_page -= 1
            self.update_table()

    def show_next_page(self):
        if self.current_page < self.total_pages:
            self.current_page += 1
            self.update_table()

    def change_page(self):
        new_page = self.page_combo_box.currentIndex() + 1
        if new_page != self.current_page:
            self.current_page = new_page
            self.update_table()

    def update_table(self):
        self.ui.tableWidget.clearContents()
        start_index = (self.current_page - 1) * self.page_size
        end_index = min(start_index + self.page_size, len(self.users))
        data_to_show = self.users[start_index:end_index]

        self.ui.tableWidget.setRowCount(len(data_to_show))
        for row, user in enumerate(data_to_show):
            for col, data in enumerate(user.data['rows']):
                new_data = OrderedDict([('remark', user.data['remark'])])
                new_data.update(data)
                for key, value in new_data.items():
                    item = QTableWidgetItem(str(value))
                    item.setTextAlignment(Qt.AlignCenter)
                    self.ui.tableWidget.setItem(row, col, item)
                    col += 1

        self.update_pagination()

class CheckBoxHeader(QHeaderView):
    """自定义表头类"""

    # 自定义复选框全选信号
    select_all_clicked = pyqtSignal(bool)

    def __init__(self, orientation=Qt.Horizontal, parent=None):
        super(CheckBoxHeader, self).__init__(orientation, parent)
        self._checkbox = QCheckBox(self)
        self._checkbox.setChecked(False)
        self._checkbox.stateChanged.connect(self._on_state_changed)

    def paintSection(self, painter, rect, logicalIndex):
        painter.save()
        super(CheckBoxHeader, self).paintSection(painter, rect, logicalIndex)
        painter.restore()

        if logicalIndex == 0:
            option = QtWidgets.QStyleOptionButton()
            option.rect = QtCore.QRect(rect.x() + 5, rect.y() + 5, 15, 15)
            QtWidgets.QApplication.style().drawControl(QtWidgets.QStyle.CE_CheckBox, option, painter)

    def _on_state_changed(self, state):
        is_checked = state == Qt.Checked
        self.select_all_clicked.emit(is_checked)

class My_Widget(QtWidgets.QWidget, Ui_Form):
    updateData = pyqtSignal(DataRow)  # 定义一个信号用于更新数据
    finish = pyqtSignal(str)
    
    def __init__(self, parent=None):
        super(My_Widget, self).__init__(parent)
        self.manager = Wss(islog=True)
        self.init_ui()
        self.init()

    def init(self):
        self.setWindowTitle("虎牙")
        self.dateTimeEdit_2.setTime(QtCore.QTime(20, 0, 0, 0))
        self.pushButton.clicked.connect(self.change_all_checkboxes_state)
        self.pushButton_2.clicked.connect((self.action_timed_task))
        self.pushButton_4.clicked.connect(self.run_delete_task)
        self.pushButton_6.clicked.connect(self.new_create_row)
        self.pushButton_5.clicked.connect(self.update_selected_rows)
        self.pushButton_3.clicked.connect(self.stop_timed_task)
        self.updateData.connect(self.update_table_row)
        self.finish.connect(self.log)
        self.data_rows = []  # 用于存储表格数据行对象
        self.Users = []
        self.timer = QTimer()
        self.run_timer = False
        self.count = 0
        self.verify_code = ""
        self.manager_thead = None
        self.tmp_user = {'phone_id': "","remark":"","cookie":""}

        self.run_impor()

    def new_create_row(self):
        data = ["0", "0","0", "0","0", "0", "0","0", "0", "0", "0", "0", "未在运行",]
        data_row = DataRow(len(self.data_rows), data)
        self.add_table_row(data_row)

    def show_history_dialog(self):
        Users = []
        selected_row_numbers = self.get_selected_rows()
        for i in selected_row_numbers:
            Users.append(self.Users[i])
        dialog = HistoryDialog(self,Users)  # 创建代理对话框并传入主窗口引用
        dialog.exec_()  # 显示对话框

    def init_ui(self):
        super().setupUi(self)
        # 创建右键菜单
        self.context_menu = QMenu(self)
        copy_cookie_action = QAction("复制选中中第一个Cookie", self)
        copy_cookie_action.triggered.connect(self.copy_cookie)

        self.context_menu.addAction(copy_cookie_action)

        # 关联右键菜单到表格
        self.tableWidget.setContextMenuPolicy(Qt.CustomContextMenu)
        self.tableWidget.customContextMenuRequested.connect(self.show_context_menu)

        # 连接信号和槽函数
        self.tableWidget.itemDoubleClicked.connect(self.handle_item_double_clicked)

    def handle_item_double_clicked(self, item):
        row = item.row()
        column = item.column()
        original_text = item.text()
        edited_text, ok = QInputDialog.getText(self, "编辑", f"输入单元格的新值 ({row}, {column}):",
                                               text=original_text)
        if ok:
            self.tableWidget.setItem(row, column, QTableWidgetItem(edited_text))
            ordered_keys = list(self.Users[row].data)
            key_at_index_column = ordered_keys[column]
            self.Users[row].update_self({key_at_index_column:edited_text})

    def show_context_menu(self, pos):
        # 显示右键菜单
        self.context_menu.exec_(self.tableWidget.mapToGlobal(pos))

    def copy_cookie(self):
        # 获取选中行
        selected_rows = self.tableWidget.selectedItems()
        if len(selected_rows) == 0:
            return
        row = selected_rows[0].row()

        # 获取选中行对应用户的 cookie
        cookies = self.Users[row].data.get("cookie", "")
        if not cookies: return
        # 复制到剪贴板
        clipboard = QtWidgets.QApplication.clipboard()
        clipboard.setText(json.dumps(cookies))

    def add_table_row(self, data_row):
        """
        添加一行数据到表格中。
        :param data_row: DataRow对象，包含编号和数据列表
        """
        row_position = self.tableWidget.rowCount()
        self.tableWidget.insertRow(row_position)

        for i, value in enumerate(data_row.data):
            item = QTableWidgetItem(str(value))  # 确保将值转换为字符串
            if not value:item = QTableWidgetItem(str("0")) 
            item.setTextAlignment(QtCore.Qt.AlignCenter)  # 设置文本居中
            self.tableWidget.setItem(row_position, i, item)

        checkbox = QCheckBox()
        self.tableWidget.setCellWidget(row_position, 0, checkbox)
        self.data_rows.append(data_row)

    def change_all_checkboxes_state(self):
        # 检查是否有选中的复选框
        any_checked = any(self.tableWidget.cellWidget(row, 0).isChecked() for row in range(self.tableWidget.rowCount()))

        # 根据情况切换全选或全不选
        for row in range(self.tableWidget.rowCount()):
            checkbox_item = self.tableWidget.cellWidget(row, 0)
            checkbox_item.setChecked(not any_checked)

    def get_selected_rows(self):
        selected_row_numbers = []
        for row in range(self.tableWidget.rowCount()):
            checkbox_item = self.tableWidget.cellWidget(row, 0)
            if checkbox_item.isChecked():
                selected_row_numbers.append(row)
        return selected_row_numbers


    def run_delete_task(self):
        selected_row_numbers = self.get_selected_rows()
        # 逆序删除选中的行，防止索引错乱
        for row_number in reversed(selected_row_numbers):
            # 从数据列表中删除对应行
            for i, data_row in enumerate(self.data_rows):
                if data_row.number == row_number:
                    self.data_rows.pop(i)
                    # await self.manager.disconnect(self.Users[i])
                    self.Users.pop(i)
                    break
            # 更新剩余行的序号属性
            for i, data_row in enumerate(self.data_rows):
                if data_row.number > row_number:
                    data_row.number -= 1
            self.tableWidget.removeRow(row_number)

    def run_task_Thead(self):
        loop = asyncio.new_event_loop()
        asyncio.set_event_loop(loop)
        loop.run_until_complete(self.exchange())

    def task_time(self):
        if not self.run_timer:
            print("计时器已暂停")
            return

        self.count += 1
        t = threading.Thread(target=self.run_task_Thead)
        t.daemon = True
        t.start()

    def start_daily_timer(self, hour, minute, second):  
        current_time = QDateTime.currentDateTime() 
        current_date = current_time.date()  
        target_time_of_day = QTime(hour, minute, second) 
        
        if current_time.time() >= target_time_of_day:  
            target_date = current_date.addDays(1)  
        else:  
            target_date = current_date  
    
        target_time = QDateTime(target_date, target_time_of_day)  
      
        msec_to_target = target_time.msecsTo(current_time) if target_date > current_date else current_time.msecsTo(target_time)  
        if msec_to_target < 0:  
            msec_to_target += 86400000  
    
        timer = QTimer()  
        timer.timeout.connect(self.task_time)  
        timer.singleShot(msec_to_target, self.task_time)  
    
        print(f"定时器将于{target_time.toString('yyyy-MM-dd HH:mm:ss')}执行")  
        return timer

    def action_timed_task(self):
        if self.run_timer:
            print("定时器已存在")
            return
        refresh_time = self.dateTimeEdit_2.dateTime().toString("hh:mm:ss")
        r = refresh_time.split(':')
        print(r)
        timer = self.start_daily_timer(int(r[0]),int(r[1]),int(r[2]))
        self.run_timer = True
        self.update_data()
        timer.start()

    def stop_timed_task(self):
        if self.run_timer:
            self.run_timer = False
            self.update_data()
            print("定时器已停止")

    def update_selected_rows(self):
        self.get_data()

    def update_data(self):
        print("更新数据")
        selected_row_numbers = self.get_selected_rows()
        for i in selected_row_numbers:
            # print(self.Users[i].data)
            result = self.Users[i].data
            rows = result['rows']
            history = 0
            if len(rows) > 0 and type(rows) == type(list):
                for v in rows:
                    if v.get('description') == '游戏金提现':
                        history += int(v['amount'].split('.')[0])
            # 列表按照账号名 备注 手机号 登录状态 今日兑换次数 今日兑换金额 本周订单数 本周订单金额 已结算 已结算金额 重定向url 运行状态 依次对应
            data = [
                result.get("sNickName",""), 
                result.get("remark",""), 
                result.get("cookie",""), 
                result.get("cookieStatus",""),
                result.get("dailyCntProcessed",""), 
                result.get("dailyAmountProcessed",""), 
                history,
                result.get("userBalance",""), 
                result.get("payAmountAllTime",""), 
                result.get("payAmountAll",""), 
                0, 
                0, 
                result.get("td",""),"在运行" if self.run_timer else "未在运行",
            ]

            for num, data_row in enumerate(self.data_rows):
                if data_row.number == i:
                    print(f"{num} --{data[0]}")
                    self.data_rows[num].data = data
                    break
            data_row = DataRow(i, data)
            self.updateData.emit(data_row)


    def run_impor(self):
        Users = self.manager.impor()
        for u in Users:
            self.data_rows.append(DataRow(len(self.Users), u.data))
            self.Users.append(u)
        i = 0
        for u in self.Users:
            result = u.data
            rows = result['rows']
            history = 0
            if len(rows) > 0 and type(rows)== type(list):
                for v in rows:
                    if v.get('description') == '游戏金提现':
                        history += int(v['amount'].split('.')[0])
            # data = [result['sNickName'], result['remark'], result['phone_id'], result['loginStatus'], 0, 0, history, result['userBalance'], 0, 0, 0, 0, result['td'], 1]
            # 列表按照账号名 备注 手机号 登录状态 今日兑换次数 今日兑换金额 本周订单数 本周订单金额 已结算 已结算金额 重定向url 运行状态 依次对应
            data = [
                result.get("sNickName","0"), 
                result.get("remark","0"), 
                result.get("cookie","0"), 
                result.get("cookieStatus","0"),
                result.get("dailyCntProcessed","0"), 
                result.get("dailyAmountProcessed","0"), 
                history,
                result.get("userBalance","0"), 
                result.get("payAmountAllTime","0"), 
                result.get("payAmountAll","0"), 
                "0", 
                "0", 
                result.get("td",""),"在运行" if self.run_timer else "未在运行",
            ]

            data_row = DataRow(i, data)
            self.add_table_row(data_row)
            i += 1
  
    def run_expor(self):
        print("导出数据")
        Users = [self.Users[i] for i in self.get_selected_rows()]
        self.manager.expor(Users)

    async def refresh(self):
        User = []
        for i in self.get_selected_rows():
            User.append(self.Users[i])
        task = [self.manager.refresh(user) for user in User]
        await asyncio.gather(*task)
        self.manager.expor(self.Users)
        self.finish.emit("40")
        print("refresh")


    async def exchange(self):
        User = []
        for i in self.get_selected_rows():
            User.append(self.Users[i])
        task = [self.manager.exchange(user) for user in User]
        await asyncio.gather(*task)
        self.manager.expor(self.Users)
        self.finish.emit("40")
        print("exchange")

    async def wheel(self):
        User = []
        for i in self.get_selected_rows():
            User.append(self.Users[i])
        task = [self.manager.wheel(user) for user in User]
        await asyncio.gather(*task)
        print("wheel")

    async def action(self):
        await self.refresh()

    def run_Thead_refresh(self):
        loop = asyncio.new_event_loop()
        asyncio.set_event_loop(loop)
        loop.run_until_complete(self.action())

    def get_data(self):
        t = threading.Thread(target=self.run_Thead_refresh)
        t.daemon = True
        t.start()


    def log(self,arg):
        if arg == "40":
            self.update_data()
        else:
            print(arg,"不更新")


    def update_table_row(self, data_row):
        """
        更新表格中的一行数据。
        :param data_row: DataRow对象，包含编号和新数据列表
        """
        row_number = data_row.number
        new_data = data_row.data
        # print("new",new_data,row_number)
        print("new", row_number)

        for i, value in enumerate(new_data):
            item = self.tableWidget.item(row_number, i)
            if item:
                item.setText(str(value))
