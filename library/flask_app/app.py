from flask import Flask, render_template, request
import os

app = Flask(__name__)

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/index')
def index():
    return render_template('index.html')

@app.route('/library/lending_library')
def lending_library():
    return render_template('lending_library.html')

@app.route('/upload', methods=['POST'])
def upload_file():
    file = request.files['file']
    if file:
        filename = file.filename
        target_path = os.path.join('/path/to/upload/directory', filename)
        if os.path.isfile(target_path):
            return {"status": 0, "msg": "File already exists!"}, 400
        else:
            try:
                file.save(target_path)
                return {"status": 1, "msg": "File Has Been Uploaded", "path": target_path}, 200
            except:
                return {"status": -2, "msg": "File upload failed"}, 500
    else:
        return {"status": -1, "msg": "No file received."}, 400

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)

