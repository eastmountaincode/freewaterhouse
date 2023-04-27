from flask import Flask, render_template, request, send_from_directory, redirect, url_for
import os
import shutil

app = Flask(__name__)

UPLOAD_FOLDER = "uploaded_files"
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

def remove_file(filename):
    filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
    if os.path.exists(filepath):
        os.remove(filepath)

@app.route('/lending_library', methods=['GET', 'POST'])
def lending_library():
    if request.method == 'POST':
        for i in range(1, 7):
            file = request.files.get(f'file{i}')
            if file:
                filename = f'file{i}'
                file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
                return redirect(request.url)

    files = []
    for i in range(1, 7):
        filename = f'file{i}'
        filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        if os.path.exists(filepath):
            files.append(filename)
        else:
            files.append(None)

    return render_template('lending_library.html', files=files)

@app.route('/download/<path:filename>', methods=['GET', 'POST'])
def download_file(filename):
    if request.method == 'POST':
        remove_file(filename)
        return redirect(url_for('lending_library'))

    return send_from_directory(app.config['UPLOAD_FOLDER'], filename, as_attachment=True)

if __name__ == '__main__':
    app.run(host='0.0.0.0')
