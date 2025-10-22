import sys
from PyQt5 import QtWidgets
import My_Widget


app = QtWidgets.QApplication(sys.argv)
widget = My_Widget.My_Widget()
widget.show()
sys.exit(app.exec_())
