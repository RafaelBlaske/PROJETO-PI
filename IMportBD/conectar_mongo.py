from pymongo import MongoClient
from pymongo.errors import ConnectionFailure

def conectar_banco():
    try:
        cliente = MongoClient("mongodb+srv://guilhermesoares:VmrF3xa8LYoJSeWT@bdconfeitaria.0jbkscs.mongodb.net/")
        # Testa a conexão
        cliente.admin.command('ping')
        print("Conectado ao MongoDB com sucesso!")
        return cliente
    except ConnectionFailure as e:
        print(f"Erro ao conectar: {e}")
        return None

def listar_bancos(cliente):
    print("\nBancos disponíveis:")
    for db_name in cliente.list_database_names():
        print(f" - {db_name}")

if __name__ == "__main__":
    cliente = conectar_banco()
    if cliente:
        listar_bancos(cliente)
        cliente.close()
