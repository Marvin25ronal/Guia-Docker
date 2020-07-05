from flask import Flask,jsonify
from users import users
app=Flask(__name__)

@app.route('/ping',methods=['GET'])
def ping():
    return jsonify({"response":"hola mundo"})

@app.route('/users')
def userhandler():
    return jsonify({"users":users})

if __name__=='__main__':
    app.run(host="0.0.0.0",port=4000,debug=True)