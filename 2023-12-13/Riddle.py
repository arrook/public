import tkinter as tk

# Data类: 数据结构
# [{
#     "question": "questiontext",
#     "answer": int(4),
#     "scores": int()
#     "options":
#     [
#        "Optionstext",
#        "Optionstext",
#        "Optionstext",
#        "Optionstext"
#     ]
# }]

# 数据以1开始索引
data = [
    {"question": "questiontext", "answer": 3, "options": [
        "Optionstext", "Optionstext", "Optionstext", "Optionstext"]},
    {"question": "questiontext", "answer": 1, "options": [
        "Optionstext", "Optionstext", "Optionstext", "Optionstext"]},
    {"question": "questiontext", "answer": 2, "options": [
        "Optionstext", "Optionstext", "Optionstext", "Optionstext"]},
    {"question": "questiontext", "answer": 4, "options": [
        "Optionstext", "Optionstext", "Optionstext", "Optionstext"]}
]

def iter_data():
    """初始化迭代器数据,返回列表-<<索引>>-迭代器对象"""
    global data
    for i in range(len(data)):
        yield i
    else:
        return len(data)-1

def show(data_index=None):
    """更新组件"""
    if data_index is None:
        try:
            data_index = next(data_iter_index)
        except StopIteration:
            # 题目遍历结束,准备退出
            data_index = len(data)-1
            frame.grid_forget()
            echo_label["text"] = "结束"
            return
    # 问题
    question["text"] = f"{data_index+1}. " + \
        data[data_index]["question"][data_index]
    # 选项
    option1["text"] = f"{1}. "+data[data_index]["options"][0]
    option2["text"] = f"{2}. "+data[data_index]["options"][1]
    option3["text"] = f"{3}. "+data[data_index]["options"][2]
    option4["text"] = f"{4}. "+data[data_index]["options"][3]
    button["command"] = lambda: toggle(data_index=data_index)

    def toggle(data_index):
        """1、保持原题2、初始化下一题,显示下一题"""
        if intvar.get() == -1:
            return
        if intvar.get() == data[data_index]["answer"]-1:
            echo_label["text"] = "正确"
            show()
        else:
            echo_label["text"] = "憨憨,这个不对呦"
        echo_label.grid(column=1, row=5)
        echo_label.after(1000, lambda: echo_label.grid_forget())

if __name__ == "__main__":

    root = tk.Tk()

    win_width, win_height = root.winfo_screenwidth(), root.winfo_screenheight()
    root.geometry(str(1000)+"x"+str(648)+"+" +
                  str(int(win_width/2-500))+"+"+str(int(win_height/2-324)))

    data_iter_index = iter_data()
    # tk int 变量
    intvar = tk.IntVar()
    intvar.set(-1)
    # frame组件
    frame = tk.Frame(master=root, bg="green")
    frame.grid()
    # 题目显示框
    question = tk.Label(master=frame)
    question.grid(column=0, row=0)
    # 单选
    option1 = tk.Radiobutton(master=frame, value=0, variable=intvar)
    option1.grid(column=0, row=1)
    option2 = tk.Radiobutton(master=frame, value=1, variable=intvar)
    option2.grid(column=0, row=2)
    option3 = tk.Radiobutton(master=frame, value=2, variable=intvar)
    option3.grid(column=0, row=3)
    option4 = tk.Radiobutton(master=frame, value=3, variable=intvar)
    option4.grid(column=0, row=4)
    # 切换按钮
    button = tk.Button(master=frame, text="下一题")
    button.grid(column=0, row=5)
    # 正确反馈
    echo_label = tk.Label(master=root)
    echo_label.grid(column=0, row=6)


    show()

    # 倒计时组件,单独放置,方便修改
    # 
    countdown = 10 # 倒计时秒数
    clock = tk.Frame(root)
    clock.place(relx=0.5, rely=0.5)
    clock_label = tk.Label(master=clock, font=("微软黑体", 25))
    clock_label.grid()

    def counter(countdown):
        def decreasing():
            nonlocal countdown
            countdown -= 1
            return countdown
        return decreasing
    get_count = counter(countdown=countdown)
    clock.after(1000, lambda: clock_change(get_count()))

    def clock_change(count):
        clock_label["text"] = "倒计时: "+str(count)
        if count >= 0: frame.after(1000, lambda: clock_change(get_count()))
        else:
            # 结束后的函数
            clock_label["text"] = "倒计时结束！！！"

    root.mainloop()