from flask import Flask, send_from_directory

app = Flask(__name__, static_url_path='', static_folder='web')

@app.route('/')
def root():
    return send_from_directory('web', 'index.html')

@app.route('/<path:path>')
def static_files(path):
    return send_from_directory('web', path)

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=8000)