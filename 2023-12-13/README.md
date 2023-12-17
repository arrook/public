# 选择组件使用说明

</br></br>

## 组件及组件属性数据结构统一储存，如下所示

```json
[{
    "question": "questiontext",
    "answer": "4",
    "scores": "2",
    "options":
    [
        "Optionstext",
        "Optionstext",
        "Optionstext",
        "Optionstext"
    ]
}]
```
<!--  注释  -->
</br></br>

## 题目数据数据格式储存，如下所示

```json
data = 
    [{
        "question": "questiontext", # 题目文本
        "answer": 3,                # 答案序号,从1开始,取决于options总数
        "options":                  # 选项文本
        [
            "Optionstext", "Optionstext",
            "Optionstext", "Optionstext"
        ]
    },
    {
        "question": "questiontext", 
        "answer": 1, 
        "options":
        [
            "Optionstext", "Optionstext", 
            "Optionstext", "Optionstext"
        ]
    }
]
```
