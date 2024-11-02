from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///livros.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

class Livro(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    capa = db.Column(db.String(255), nullable=False)
    titulo = db.Column(db.String(255), nullable=False)
    paginas = db.Column(db.Integer, nullable=False)
    progresso = db.Column(db.Integer, default=0)

@app.route('/livros', methods=['POST'])
def listar_livros():
    data = request.get_json()



    novo_livro = Livro(capa=data['capa'], titulo=data['titulo'], autor=data['autor'], paginas=data['paginas'], progresso=data.get('progresso', 0))
    db.session.add(novo_livro)
    db.session.commit()
    return jsonify(novo_livro), 201

@app.route('/livros', methods=['GET'])
def listar_livros():
    livros = Livro.query.all()
    return jsonify([livro.to_dict() for livro in livros])

@app.route('/livros/<int:id>', methods=['GET'])
def obter_livro(id):
    livro = Livro.query.get_or_404(id)
    return jsonify(livro.to_dict())

@app.route('/livros/<int:id>', methods=['PUT'])
def atualizar_livro(id):
    data = request.get_json()
    livro = Livro.query.get_or_404(id)
    livro.progresso = data.get('progresso', livro.progresso)
    db.session.commit()
    return jsonify(livro.to_dict())

def to_dict(self):
    return {
        'id': self.id,
        'capa': self.capa,
        'titulo': self.titulo,
        'autor': self.autor,
        'paginas': self.paginas,
        'progresso': self.progresso
    }

Livro.to_dict = to_dict

if __name__ == '__main__':
    db.create_all()
    app.run(debug=True)
