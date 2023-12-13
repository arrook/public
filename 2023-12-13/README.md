# public
 Riddle.py 中,
 """
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
 """
 data是题型储存格式
    --question: 题目文本
    --answer:   答案序号,从1开始,取决于options总数,
    --options:  选项文本